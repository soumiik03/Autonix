import { auth } from "googleapis/build/src/apis/abusiveexperiencereport";
import { oauth2Client } from "../config/googleOauth";
import jwt from "jsonwebtoken"
import { version } from "react";

export const connectGoogle = (req, res) => {
  try {
    const userId = req.user._id;

    const state=jwt.sign({
        userId,
        purpose:"google-oauth",

    },process.env.JWT_SECRET,{expiresIn:"10m"})

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });

    return res.status(200).json({success:true,url})
  } catch (error) {
     return res.status(500).json({success:false,message:`Connect Google ${error}`})
  }
};

export const googleCallback=async()=>{
    try {
        const {code,state,error}=req.query
        if(error){
            return res.status(400).json({message:"Google Authorization failed"})
        }
        const decoded=jwt.verify(state,process.env.JWT_SECRET)
        if(decoded.purpose !== "google-oauth" || !decoded.userId){
            return res.status(200).json({message:"Invalid OAuth State"})
        }
        const {tokens} = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens);

        const oauth2=google.oauth2({
            version:"v2",
            auth:googleOAuthClient
        })
        const {data:profile}=await oauth2.userinfo.get()
        if(!profile.id || !profile.email){
            return res.status(400).json({message:"Unavailable to identify google account"})
        }

        const filter={
            userId:decoded.userId,
            provider:"google",
            providerAccountId:profile.id
        }

        let connection=await Integration.findOne(filter)
        .select("+tokens.accessToken +tokens.refreshToken")

        if(!connection){
            connection=new Integration({
                ...filter,
                services:[],
                tokens:{}
            })
        }

        connection.services=[
            ...new Set([
                ...connection.services || [],
                "gmail",
                "google_calender"
            ])
        ]
        connection.account={
            ...connection.account?.toObject?.(),
            email:profile.email,
            displayName:profile.name || ""
        }
        connection.scopes=tokens.scope?.split(" ") || scopes

        if(tokens.access_token){
            connection.tokens.access_token=tokens.access_token
        }
        if(tokens.refresh_token){
            connection.tokens.refreshToken=tokens.refresh_token
        }
        
    } catch (error) {
        
    }
}