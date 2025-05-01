import { outlineClient } from "../../outline.js";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

const toolSchema = {
  name: "list_documents",
  description: "List documents in a collection",
  inputSchema: {
    type: "object",
    properties: {
      collectionId: { type: "string", description: "The ID of the collection to list documents from" },
      offset: { type: "number", description: "The offset to start listing documents from" },
      limit: { type: "number", description: "The number of documents to return" },
    },
    required: ["collectionId"],
  },
};
// Get a list of documents
const handler = async ({ collectionId, offset = 0, limit = 10 }) => {
  try {
    const response = await outlineClient.post("/documents.list", {
      params: {
          collectionId,
          offset,
          limit,
        },
      });
      return response.data.data;
    } catch (error) {
    console.error(error);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

export { toolSchema, handler };
