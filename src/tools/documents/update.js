import { outlineClient } from "../../outline.js";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

const toolSchema = {
  name: "update_document",
  description: "Update an existing document",
  inputSchema: {
    type: "object",
    properties: {
      id: { type: "string", description: "The ID of the document to update" },
      title: { type: "string", description: "The title of the document" },
      text: { type: "string", description: "The text of the document" },
    },
    required: ["id", "title", "text"],
  },
};

// Update an existing document
const handler = async ({ id, title, text }) => {
    try {
      const response = await outlineClient.post("/documents.update", {
        id,
        title,
        text,
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }

  export { toolSchema, handler };