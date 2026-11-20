import express from "express"
import protect from "../middleware/protected.js"
import { createAgent, getAllAgents, getAgentById, deleteAgent } from "../controllers/agent.controller.js";

const agentRouter=express.Router()

agentRouter.post("/create",protect,createAgent)
agentRouter.get("/all",protect,getAllAgents)
agentRouter.get("/:id",protect,getAgentById)
agentRouter.delete("/:id",protect,deleteAgent)


export default agentRouter
