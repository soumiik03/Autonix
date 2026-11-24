import express from "express"
import { agentChat, chat } from "../controllers/chat.controller.js"
import protect from "../middleware/protected.js"


const chatRouter=express.Router()

chatRouter.post("/", protect, chat)
chatRouter.post("/agent",protect,agentChat)

export default chatRouter
