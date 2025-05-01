import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../../outline.js";

const toolSchema = {
  name: "get_collection",
  description: "Get a specific collection by ID from Outline",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the collection to retrieve",
      },
    },
    required: ["id"],
  },
};

async function getCollection({ id }) {
  try {
    const response = await outlineClient.post("/collections.info", {
      id,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

export { toolSchema, getCollection as handler };