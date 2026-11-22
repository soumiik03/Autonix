import express from "express"
import { chat } from "../controllers/chat.controller.js"
import protect from "../middleware/protected.js"


const chatRouter=express.Router()

chatRouter.post("/", protect, chat)


export default chatRouter
