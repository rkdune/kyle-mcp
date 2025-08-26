
#!/usr/bin/env python3

from mcp.server import FastMCP


def susify_text(sentence: str) -> str:
    """Transform text by prepending 'sus' to every word and adding 'ayo???' at the end"""
    words = sentence.strip().split()
    sus_words = [f"sus{word}" for word in words]
    return " ".join(sus_words) + " ayo???"


def main(host: str = "0.0.0.0", port: int = 8000):
    # Configure FastMCP for HTTP SSE transport
    app = FastMCP("sus-mcp", host=host, port=port)
    
    @app.tool()
    async def susify(sentence: str) -> str:
        """Add 'sus' to the beginning of every word and 'ayo???' at the end"""
        return susify_text(sentence)
    
    # Run using SSE transport (HTTP streaming compatible)
    app.run(transport="sse")


