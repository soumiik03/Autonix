import chatGraph from "../utils/chatGraph.js";
import { HumanMessage } from "langchain/schema";

export const chat=async (req, res)=>{
    try{
        const { messages } = req.body;
        if(!messages || !threadId){
            return res.status(400).json({error:"Missing required fields"})
        }
        const threadId=req.user._id;
        const data=await chatGraph.invoke({
            messages:[
                new HumanMessage(messages),
            ]
        },{configurable:{threadId}})

        const lastMessage=data.messages[data.messages.length-1].content;
        return res.status(200).json(lastMessage);

    }catch(err){
        console.error(err);
        return res.status(500).json({error:"Internal server error"})
    }    
}
