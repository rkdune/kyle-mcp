#!/usr/bin/env python3

import os
from server import main

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    
    print(f"🚀 Starting MCP server on {host}:{port}")
    print(f"📡 Server will be accessible at http://{host}:{port}")
    
    main(host=host, port=port)