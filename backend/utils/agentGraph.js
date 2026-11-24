import { SystemMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq"
import {  StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { MongoClient } from "mongodb";
import { getMcpTools } from "../mcp/langGraph-mcp";

const llm = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
})

const client = new MongoClient(process.env.MONGODB_URI);
const checkpointer = new MongoDBSaver({ client, dbName: "langgraph" });

const createAgentGraph=async(agent,userId)=>{

    const mcptools=getMcpTools()
    console.log(mcptools.map((tool)=>tool.name))
    const llmWithTools=llm.bindTools(mcptools);

    const currentDateTime=new Intl.DateTimeFormat("en-IN",{
    timeZone:"Asia/Kolkata",
    dateStyle:"full",
    timeStyle:"long"
    }).format(new Date())

    const systemPrompt={
        
    }


    const chatNode = async (state) => {
        const response = await llmWithTools.invoke([
            new SystemMessage()
        ])
        return{
            messages:[response]
        }
    }

    const toolNode=()=>{
        
    }

    const actionApprovalNode=()=>{

    }

    const routeFromChat=()=>{

    }

    const routeAfterApproval=()=>{

    }

    const workflow=new StateGraph(MessagesAnnotation)
    .addNode("chatNode",chatNode)
    .addNode("tools",toolNode)
    .addNode("actionApprovalNode",actionApprovalNode)
    .addEdge("__start__","chatNode")
    .addConditionalEdges("chatNode", routeFromChat)
    .addEdge("tools","chatNode")
    .addConditionalEdges("actionApprovalNode",routeAfterApproval)
    .addEdge("chatNode","__end__")

    const chatAgentGraph=workflow.compile({checkpointer})
    return  chatAgentGraph

}

