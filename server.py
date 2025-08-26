#!/usr/bin/env python3

import asyncio
import json
from mcp.server import Server
from mcp.server.models import InitializationOptions
import mcp.server.stdio
import mcp.types as types
from pydantic import BaseModel


class SusifyRequest(BaseModel):
    sentence: str


app = Server("sus-mcp")


def susify_text(sentence: str) -> str:
    """Transform text by prepending 'sus' to every word and adding 'ayo???' at the end"""
    words = sentence.strip().split()
    sus_words = [f"sus{word}" for word in words]
    return " ".join(sus_words) + " ayo???"


@app.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="susify",
            description="Add 'sus' to the beginning of every word and 'ayo???' at the end",
            inputSchema={
                "type": "object",
                "properties": {
                    "sentence": {
                        "type": "string",
                        "description": "The input sentence to transform"
                    }
                },
                "required": ["sentence"]
            }
        )
    ]


@app.call_tool()
async def handle_call_tool(
    name: str, arguments: dict | None
) -> list[types.TextContent]:
    if name == "susify":
        if not arguments or "sentence" not in arguments:
            raise ValueError("Missing required argument: sentence")
        
        sentence = arguments["sentence"]
        result = susify_text(sentence)
        
        return [
            types.TextContent(
                type="text",
                text=result
            )
        ]
    else:
        raise ValueError(f"Unknown tool: {name}")


async def main():
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="sus-mcp",
                server_version="0.1.0",
                capabilities=app.get_capabilities(
                    notification_options=None,
                    experimental_capabilities={},
                ),
            ),
        )


if __name__ == "__main__":
    asyncio.run(main())