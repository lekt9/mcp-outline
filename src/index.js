
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { toolSchemas } from "./tools/toolSchemas.js";
import { toolHandlers } from "./tools/handlers.js";

import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

import dotenv from 'dotenv'
dotenv.config()

// Create a new MCP server with stdio transport
const server = new Server(
  {
    name: "outline-server",
    version: "1.0.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: toolSchemas,
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const handler = toolHandlers.get(request.params.name);

  if (!handler) {
    throw new McpError(ErrorCode.ToolNotFound, "Tool not found");
  }

  if (typeof handler === "function") {
    const results = await handler(request.params.arguments);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  }
});

// Connect to the transport and start the server
const transport = new StdioServerTransport();
await server.connect(transport);
