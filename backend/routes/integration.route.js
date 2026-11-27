import express from "express"
import { agentChat, chat } from "../controllers/chat.controller.js"
import protect from "../middleware/protected.js"
import { connectGoogle, disconnectGoogle, getIntegrations, googleCallback } from "../controllers/integration.controller.js"


const IntegrationRouter=express.Router()

IntegrationRouter.get("/google/connect", protect, connectGoogle)
IntegrationRouter.get("/google/callback",googleCallback)
IntegrationRouter.get("/google/disconnect", protect, disconnectGoogle)
IntegrationRouter.get("/all", protect, getIntegrations)

export default IntegrationRouter
