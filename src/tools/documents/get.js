import { outlineClient } from "../../outline.js";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

const toolSchema = {
  name: "get_document",
  description: "Get a specific document by ID",
  inputSchema: {
    type: "object",
    properties: {
      id: { type: "string", description: "The ID of the document to get" },
    },
    required: ["id"],
  },
};

// Get a specific document by ID
const handler = async ({ id }) => {
    try {
      const response = await outlineClient.post("/documents.info", {
        id,
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }

  export { toolSchema, handler };