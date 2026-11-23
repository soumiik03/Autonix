import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio, StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

 const server = new McpServer({
    name: "autonix",
    version: "1.0.0",
  });

const main=async()=>{
    const transport=new StdioServerTransport()
    await server.connect(transport)
    console.log("Mcp Server started successfully")
}  

main().catch((error)=>{
    console.error("mcp server error",error)
    process.exit(1)
})
