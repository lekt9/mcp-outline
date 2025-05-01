import { outlineClient } from "../../outline.js";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

const toolSchema = {
  name: "create_document",
  description: "Create a new document",
  inputSchema: {
    type: "object",
    properties: {
      title: { type: "string", description: "The title of the document" },
      text: { type: "string", description: "The text of the document" },
      collectionId: { type: "string", description: "The ID of the collection to create the document in" },
      parentDocumentId: { type: "string", description: "The ID of the parent document" },
    },
    required: ["title", "text", "collectionId"],
  },
};

const handler = async ({ title = "", text = "", collectionId = "", parentDocumentId = null }) => {
    try {
      const response = await outlineClient.post("/documents.create", {
        title,
        text,
        collectionId,
        parentDocumentId,
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }

  export { toolSchema, handler };