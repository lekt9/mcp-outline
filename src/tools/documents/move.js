import { outlineClient } from "../../outline.js";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

const toolSchema = {
  name: "move_document",
  description: "Move a document to a new collection",
  inputSchema: {
    type: "object",
    properties: {
      id: { type: "string", description: "The ID of the document to move" },
      collectionId: { type: "string", description: "The ID of the new collection" },
    },
    required: ["id", "collectionId"],
  },
};

const handler = async ({ id, collectionId }) => {
    try {
      const response = await outlineClient.post("/documents.move", {
        id,
        collectionId,
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }

  export { toolSchema, handler };