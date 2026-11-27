import "dotenv/config";
import express from "express"
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import agentRouter from "./routes/agent.routes.js";
import chatRouter from "./routes/chat.routes.js";

const app=express()

const port=process.env.PORT

app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL || "http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/agent",agentRouter)
app.use("/api/chat",chatRouter)

app.listen(port,()=>{
    connectDb()
    console.log(`Sever running on PORT ${port}`)
})

