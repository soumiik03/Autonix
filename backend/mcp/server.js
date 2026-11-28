import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";
import { TavilySearch } from "@langchain/tavily";
import jwt from "jsonwebtoken"


 const server = new McpServer({
    name: "autonix",
    version: "1.0.0",
  });


const verifyAuthToken=(token)=>{
    const payload=jwt.verify(token,process.env.MCP_AUTH_SECRET,{
        algorithms:["HS256"],
        issuer:"Autonix-backend",
        audience:"autonix-mcp"
    })
    return payload.sub
}

server.registerTool(
    "web_search",
    {
        description:"Search the web for current information and news",
        inputSchema:z.object(
            {
                query:z.string()
            }
        )
    },
    async({query})=>{
        try {
            const tavilySearch = new TavilySearch({
                maxResults: 5,
                topic: "general",
            });
            const result=await tavilySearch.invoke({query})
            return{
                content:[
                    {
                        type:"text",
                        text:JSON.stringify(result)
                    }
                ]
            }
        } catch (error) {
            console.error(error)
            return{
                content:[
                    {
                        type:"text",
                        text:"web search failed"
                    }
                ]
            }
        }
    }

)

server.registerTool(
    "send_email",
    {
        description:"Send an email through the authenticated user's connected Gmail accout.Only execute after explicit user approval ",
        inputSchema:z.object(
            {   
                authToken:z.string().min(1),
                to:z.string().email(),
                subject:z.string().trim().min(1).max(200),
                body:z.string().trim().min(1).max(2000)
            }
        )
    },
    async({authToken,to,subject,body})=>{
        try {
            const userId=verifyAuthToken(authToken)
        } catch (error) {
            console.error(error)
            return{
                content:[
                    {
                        type:"text",
                        text:"web search failed"
                    }
                ]
            }
        }
    }

)

const main=async()=>{
    const transport=new StdioServerTransport()
    await server.connect(transport)
    console.error("Mcp Server started successfully")
}  

main().catch((error)=>{
    console.error("mcp server error",error)
    process.exit(1)
})
