import { z } from "zod";
import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../../outline.js";

const toolSchema = {
  name: "create_collection",
  description: "Create a new collection in Outline",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the collection",
      },
      description: {
        type: "string",
        description: "Description of the collection",
      },
      color: {
        type: "string",
        description: "Color of the collection (optional)",
      },
      permission: {
        type: "string",
        description: "Permission setting for the collection (optional)",
      },
    },
    required: ["name"],
  },
};

async function createCollection({ name, description, color, permission }) {
  try {
    const response = await outlineClient.post("/collections.create", {
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

export { toolSchema, createCollection as handler };