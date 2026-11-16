import mongoose from "mongoose"

export const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB Connected")
    } catch (err) {
        console.log("Error",err)
    }
}