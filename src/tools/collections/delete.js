import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../../outline.js";

const toolSchema = {
  name: "delete_collection",
  description: "Delete a collection from Outline",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the collection to delete",
      },
    },
    required: ["id"],
  },
};

async function deleteCollection({ id }) {
  try {
    const response = await outlineClient.post("/collections.delete", {
      id,
    });
    return response.data.success;
  } catch (error) {
    console.error(error);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

export { toolSchema, deleteCollection as handler };