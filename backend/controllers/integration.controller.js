import { oauth2Client } from "../config/googleOauth";
import jwt from "jsonwebtoken"

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
