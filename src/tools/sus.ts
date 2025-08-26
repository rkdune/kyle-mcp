import { Tool, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { SusifyArgs } from '../types.js';

/**
 * Tool definition for susify
 */
export const susifyToolDefinition: Tool = {
    name: "susify",
    description: "Add 'sus' to the beginning of every word and 'ayo???' at the end",
    inputSchema: {
        type: "object",
        properties: {
            sentence: {
                type: "string",
                description: "The input sentence to transform"
            }
        },
        required: ["sentence"],
    },
};

/**
 * Type guard for susify arguments
 */
function isSusifyArgs(args: unknown): args is SusifyArgs {
    return (
        typeof args === "object" &&
        args !== null &&
        "sentence" in args &&
        typeof (args as { sentence: unknown }).sentence === "string"
    );
}

/**
 * Transform text by prepending 'sus' to every word and adding 'ayo???' at the end
 */
function susifyText(sentence: string): string {
    const words = sentence.trim().split(/\s+/);
    const susWords = words.map(word => `sus${word}`);
    return `${susWords.join(' ')} ayo???`;
}

/**
 * Handles susify tool calls
 */
export async function handleSusifyTool(args: unknown): Promise<CallToolResult> {
    try {
        if (!args) {
            throw new Error("No arguments provided");
        }

        if (!isSusifyArgs(args)) {
            throw new Error("Invalid arguments for susify");
        }

        const result = susifyText(args.sentence);
        
        return {
            content: [{ type: "text", text: result }],
            isError: false,
        };
    } catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                },
            ],
            isError: true,
        };
    }
}