import { SystemMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq"
import {  StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { MongoClient } from "mongodb";
import { getMcpTools } from "../mcp/langGraph-mcp.js";

const llm = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: 1024,
    maxRetries: 2,
})

const client = new MongoClient(process.env.MONGODB_URI);
const checkpointer = new MongoDBSaver({ client, dbName: "langgraph" });

const mcpTools = await getMcpTools();
const webSearchTool = mcpTools.find((tool) =>
    ["web_search", "autonix_web_search"].includes(tool.name)
);
const tools = webSearchTool ? [webSearchTool] : [];
const llmWithTools = llm.bindTools(tools);

const limitMessageContext=(message,maxChar=4000)=>{
    if(typeof message.content !== "string" || message.content.length<=maxChar){
        return message
    }
    return{
        ...message,
        content:message.content.slice(0,maxChar)+`\n[Content Truncated]`
    }
}

const chatNode = async (state) => {
    const recentMessages=state.messages.slice(-4).map((message)=>limitMessageContext(message))
    const response = await llmWithTools.invoke([
        new SystemMessage(
            "Use the web search tool for current weather, latest news, prices, schedules, or any information that may have changed. Do not guess current information."
        ),
        ...recentMessages,
    ])
    return{
        messages:[response]
    }
}

const routeAfterChat = (state) => {
    const lastMessage = state.messages.at(-1);
    return lastMessage?.tool_calls?.length ? "tools" : "__end__";
};

const workflow=new StateGraph(MessagesAnnotation)
.addNode("chatNode",chatNode)
.addNode("tools",new ToolNode(tools))
.addEdge("__start__","chatNode")
.addConditionalEdges("chatNode",routeAfterChat)
.addEdge("tools","chatNode")

const chatGraph=workflow.compile({checkpointer})
export default chatGraph
