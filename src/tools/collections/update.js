import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../../outline.js";

const toolSchema = {
  name: "update_collection",
  description: "Update an existing collection in Outline",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the collection to update",
      },
      name: {
        type: "string",
        description: "New name of the collection",
      },
      description: {
        type: "string",
        description: "New description of the collection",
      },
      color: {
        type: "string",
        description: "New color of the collection",
      },
      permission: {
        type: "string",
        description: "New permission setting for the collection",
      },
    },
    required: ["id"],
  },
};

async function updateCollection({ id, name, description, color, permission }) {
  try {
    const response = await outlineClient.post("/collections.update", {
      id,
      name,
      description,
      color,
      permission,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

export { toolSchema, updateCollection as handler };