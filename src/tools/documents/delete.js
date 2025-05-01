import { outlineClient } from "../../outline.js";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

const toolSchema = {
  name: "delete_document",
  description: "Delete a document",
  inputSchema: {
    type: "object",
    properties: {
      id: { type: "string", description: "The ID of the document to delete" },
    },
    required: ["id"],
  },
};

// Delete a document
const handler = async ({ id }) => {
    try {
      const response = await outlineClient.post("/documents.delete", {
        id,
      });
      return response.data.success;
    } catch (error) {
      console.error(error);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }

export { toolSchema, handler };