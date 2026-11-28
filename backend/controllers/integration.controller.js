import { google } from "googleapis";
import { encrypt } from "../config/encrypt-decrypt.js";
import { oauth2Client, scopes } from "../config/googleOauth.js";
import Integration from "../models/Integration.model.js";
import jwt from "jsonwebtoken";

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
      state,
      prompt:"consent"
    });

    return res.status(200).json({success:true,url})
  } catch (error) {
     return res.status(500).json({success:false,message:`Connect Google ${error}`})
  }
};

export const googleCallback = async (req, res) => {
    try {
        const {code,state,error}=req.query
        if(error){
            return res.status(400).json({message:"Google Authorization failed"})
        }
        if (typeof code !== "string" || typeof state !== "string") {
            return res.status(400).json({ message: "Missing Google authorization code or state" });
        }
        const decoded=jwt.verify(state,process.env.JWT_SECRET)
        if(decoded.purpose !== "google-oauth" || !decoded.userId){
            return res.status(400).json({message:"Invalid OAuth State"})
        }
        const {tokens} = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens);

        const oauth2=google.oauth2({
            version:"v2",
            auth:oauth2Client
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
        .select("+token.accessToken +token.refreshToken")

        if(!connection){
            connection=new Integration({
                ...filter,
                services:[],
                token:{}
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
            connection.token.accessToken=encrypt(tokens.access_token)
        }
        if(tokens.refresh_token){
            connection.token.refreshToken=encrypt(tokens.refresh_token)
        }
        if(tokens.expiry_date){
            connection.token.expiresAt=new Date(tokens.expiry_date)
        }
        connection.status="connected"
        connection.connectedAt=new Date()
        await connection.save()

        return res.redirect(`${process.env.FRONTEND_URL}/integration?google=connected`)
        
    } catch (error) {
        return res.status(500).json({message:`Google callback ${error}`})
    }
}

export const getIntegrations = async (req, res) => {
  try {
    const userId = req.user._id;
    const integrations = await Integration.find({
      userId,
      status: "connected",
    }).select("-token");
    const googleConnection = integrations.find(
      (item) => item.provider === "google"
    );

    return res.status(200).json({
      success: true,
      integrations: {
        gmail: {
          connected: googleConnection?.services?.includes("gmail") || false,
          email: googleConnection?.account?.email || null,
        },
        google_calender: {
          connected:
            googleConnection?.services?.includes("google_calender") || false,
          email: googleConnection?.account?.email || null,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Get integrations failed: ${error.message}`,
    });
  }
};

export const disconnectGoogle = async (req, res) => {
  try {
    const userId = req.user._id;
    const connection = await Integration.findOne({
      userId,
      provider: "google",
    });

    if (!connection) {
      return res.status(400).json({ message: "Google connection not found" });
    }

    await Integration.deleteOne({ userId, _id: connection._id });

    return res.status(200).json({ message: "Google disconnected" });
  } 
  catch (error) {
    return res.status(500).json({
      message: `Google disconnection failed: ${error.message}`,
    });
  }
};
