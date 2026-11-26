import { createAgentGraph } from "../utils/agentGraph.js";
import chatGraph from "../utils/chatGraph.js";
import { HumanMessage } from "@langchain/core/messages";
import Agent from "../models/agent.model.js";

export const chat=async (req, res)=>{
    try{
        const { messages } = req.body;
        if(!messages){
            return res.status(400).json({error:"Missing required fields"})
        }
        const conversationId = req.body.threadId || "default";
        const threadId = `${req.user._id.toString()}:${conversationId}`;
        const data=await chatGraph.invoke({
            messages:[
                new HumanMessage(messages),
            ]
        },{configurable:{thread_id:threadId},recursionLimit:5});

        const lastMessage=data.messages[data.messages.length-1].content;
        return res.status(200).json({ aiResponse: lastMessage });

    }catch(err){
        console.error(err);
        return res.status(500).json({error:"Internal server error"})
    }    
}

export const agentChat=async (req, res)=>{
    try{
        const { messages,agent } = req.body;
        if(!messages){
            return res.status(400).json({error:"Missing required fields"})
        }
        const conversationId = req.body.threadId || "default";
        const existingAgent=await Agent.findOne({name:agent})

        if(!existingAgent){
            return res.status(400).json({messages:"Agent not found"})
        }

        const threadId = `${req.user._id.toString()}:${existingAgent._id}`;
        const graph=await createAgentGraph(existingAgent,req.user._id.toString())
        const result=await graph.invoke({
            messages:[
                    new HumanMessage(messages),
            ]
            },{configurable:{thread_id:threadId},recursionLimit:5
        })

        const lastMessage=result.messages[result.messages.length-1].content;
        return res.status(200).json({ aiResponse: lastMessage });

    }catch(err){
        console.error(err);
        return res.status(500).json({error:"Internal server error"})
    }    
}
