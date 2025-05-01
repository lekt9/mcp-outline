# Outline MCP Server

## Overview

This is a Model Context Protocol (MCP) server implementation that integrates with Outline. The server provides tools for AI agents (mostly Cursor) to interact with Outline's API, enabling document and collection management operations.

## Features

- Search documents by query terms
- Create, retrieve, update, and delete documents
- List documents within collections
- Move documents between collections
- Manage collections (create, update, delete, list)

## Installation

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Outline API key

### Setup

1. Clone the repository:

```bash
git clone https://github.com/fellowapp/mcp-outline.git
cd mcp-outline
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on the `.env.template` file

4. Get you Outline API token from your personal settings.

5. Connect to your MCP client (like Cursor)
   NOTE: if you are connecting to Cursor, you **_technically_** don't need to do the whole `.env` file setup, but it can be usefull for local testing.

6. For connecting to Cursor, add this server to either your global or local project MCP settings with this:

```json
"mcp-outline": {
     "command": "node",
     "args": [
       "<FULL_PATH_OF_CLONED_OUTLINE_MCP_REPO>/src/index.js"
     ],
     "env": {
       "API_URL": "https://dev.fellow.wiki/api",
       "API_KEY": "<OUTLINE_API_KEY>"
     }
   }
```

## Architecture

This project implements the Model Context Protocol (MCP) standard for tool-based interactions. The architecture consists of:

```
src/
├── index.js                 # Main server entry point
├── outline.js               # Outline API client configuration
├── tools/
│   ├── handlers.js          # Centralized tool handlers mapping
│   ├── toolSchemas.js       # Centralized tool schemas
│   ├── document/            # Document-related tools
│   │   ├── index.js         # Export all document tools
│   │   ├── create.js        # Create document tool
│   │   ├── delete.js        # Delete document tool
│   │   ├── get.js           # Get document tool
│   │   ├── list.js          # List documents tool
│   │   ├── move.js          # Move document tool
│   │   ├── search.js        # Search documents tool
│   │   └── update.js        # Update document tool
```

The server handles incoming requests through a stdio transport layer and routes them to the appropriate tool handler based on the requested tool name.

## Development

### Adding New Tools

To add a new tool:

1. Create a new file in the appropriate directory (e.g., `src/tools/document/my-tool.js`)
2. Follow this template:

```javascript
import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../../outline.js";

const toolSchema = {
  name: "my_tool_name",
  description: "Description of what this tool does",
  inputSchema: {
    type: "object",
    properties: {
      // Define your parameters here
      param1: {
        type: "string",
        description: "Description of param1",
      },
    },
    required: ["param1"],
  },
};

async function myToolHandler({ param1 }) {
  try {
    // Implement your tool logic here
    const response = await outlineClient.post("/endpoint.name", {
      params: {
        param1,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

export { toolSchema, myToolHandler as handler };
```

3. Add your tool to the appropriate `index.js` file

## Credits

This project uses:

- [Model Context Protocol TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Outline API](https://www.getoutline.com/developers)
- [Axios](https://github.com/axios/axios) for HTTP requests

This README was (mostly) generated using Cursor.
