import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const protect=async(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({messgae:"Unauthorized"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded.userId)
        if(!user){
            return res.status(404).json({messgae:"User not Found"})
        }
        req.user=user
        next()

    } catch (error) {
        return res.status(500).json({messgae:`Protect Error ${error}`})
    }
}
export default protect