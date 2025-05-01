import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../../outline.js";

const toolSchema = {
  name: "search_documents",
  description: "Search for documents in Outline",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "The query to search for" },
      limit: { type: "number", description: "The number of results to return" },
    },
    required: ["query"],
  },
}

const handler = async ({ query, limit = 10 }) => {
  try {
    const response = await outlineClient.post("/documents.search", {
      query,
      limit,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new McpError(ErrorCode.InvalidRequest, `Error searching documents: ${process.env.API_URL}`);
  }
}

export { toolSchema, handler };
