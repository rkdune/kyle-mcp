import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    InitializedNotificationSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
    susifyToolDefinition,
    handleSusifyTool,
} from './tools/index.js';

export function createStandaloneServer(): Server {
    const serverInstance = new Server(
        {
            name: "sus-mcp",
            version: "0.2.0",
        },
        {
            capabilities: {
                tools: {},
            },
        }
    );

    serverInstance.setNotificationHandler(InitializedNotificationSchema, async () => {
        console.log('Sus MCP client initialized');
    });

    serverInstance.setRequestHandler(ListToolsRequestSchema, async () => ({
        tools: [susifyToolDefinition],
    }));

    serverInstance.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        
        switch (name) {
            case "susify":
                return await handleSusifyTool(args);
            default:
                return {
                    content: [{ type: "text", text: `Unknown tool: ${name}` }],
                    isError: true,
                };
        }
    });

    return serverInstance;
}

export class SusServer {
    getServer(): Server {
        return createStandaloneServer();
    }
}