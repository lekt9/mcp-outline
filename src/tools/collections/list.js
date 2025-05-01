import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../../outline.js";

const toolSchema = {
  name: "list_collections",
  description: "List all collections in Outline",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Query to filter collections by name",
      },
      offset: {
        type: "number",
        description: "Pagination offset",
      },
      limit: {
        type: "number",
        description: "The number of results to return",
      },
    },
    required: [],
  },
};

async function listCollections({ query, offset = 0, limit = 10 }) {
  try {
    const response = await outlineClient.post("/collections.list", {
        query,
        offset,
        limit,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

export { toolSchema, listCollections as handler };