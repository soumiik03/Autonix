import { SystemMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq"
import {  StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { MongoClient } from "mongodb";
import { getMcpTools } from "../mcp/langGraph-mcp.js";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

const llm = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
})

const client = new MongoClient(process.env.MONGODB_URI);
const checkpointer = new MongoDBSaver({ client, dbName: "langgraph" });

const findTools=(tools,names)=>{
    return tools.find((tool)=>names?.includes(tool.name))
}

export const createAgentGraph=async(agent,userId)=>{

    const mcptools=await getMcpTools()
    console.log(mcptools.map((tool)=>tool.name))

    const webSerachMCPTool=findTools(mcptools,["web_search","autonix_web_search"])

    const finalTools=[]
    if(webSerachMCPTool){
        finalTools.push(
            new DynamicStructuredTool(
                {
                    name:"web_search",
                    description:`Search the web for cuurent information ,news,tutorials,documentation,and factual questions`,
                    schema:z.object({
                        query:z.string().describe("The Search query")
                    }),
                    func:async({query})=>{
                        try {
                           const result= await webSerachMCPTool.invoke({query}) 
                           return JSON.stringify(result)
                        } catch (error) {
                            console.error("Mcp search error",error)
                            return JSON.stringify({error:"web search failed"})
                        }
                    }
                }
            )
        )
    }

    const llmWithTools=llm.bindTools(finalTools);

    const currentDateTime=new Intl.DateTimeFormat("en-IN",{
    timeZone:"Asia/Kolkata",
    dateStyle:"full",
    timeStyle:"long"
    }).format(new Date())

    const systemPrompt=`You are ${agent.name}. Follow these instructions: ${agent.instructions}
Use web_search for current weather, latest news, and any information that may have changed. Do not guess current information.`
    const approvalTools=new Set([
        "set_email",
        "create_calender_event",
        "publish instagram image"
    ])

    const chatNode = async (state) => {
        const recentMessages=state.messages.slice(-4)
        const response = await llmWithTools.invoke([
            new SystemMessage(systemPrompt),
            ...recentMessages
        ])
        return{
            messages:[response]
        }
    }

    const toolNode=new ToolNode(finalTools)

    const actionApprovalNode=()=>{

    }

    const routeAfterChat=(state)=>{
        const messages=state.messages || []
        console.log(messages)
        const lastMessage=messages[messages.length-1]
        if(!lastMessage?.tool_calls?.length){
            return "__end__"
        }
        const requiresApproval=lastMessage?.tool_calls?.some((call)=>{
            approvalTools.has(call.name)
        })
        return requiresApproval?"actionApprovalNode":"tools"
    }   

    const routeFromChat=(state)=>routeAfterChat(state)
    const routeAfterApproval=()=>"tools"

    const workflow=new StateGraph(MessagesAnnotation)
    .addNode("chatNode",chatNode)
    .addNode("tools",toolNode)
    .addNode("actionApprovalNode",actionApprovalNode)
    .addEdge("__start__","chatNode")
    .addConditionalEdges("chatNode", routeFromChat)
    .addEdge("tools","chatNode")
    .addConditionalEdges("actionApprovalNode",routeAfterApproval)

    const chatAgentGraph=workflow.compile({checkpointer})
    return  chatAgentGraph

}

