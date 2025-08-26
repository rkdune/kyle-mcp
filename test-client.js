import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

async function testSusifyTool() {
    console.log('🔧 Testing Sus MCP Server...');
    
    const transport = new StreamableHTTPClientTransport('http://localhost:8080/mcp');
    const client = new Client({
        name: "test-client",
        version: "1.0.0"
    }, {
        capabilities: {}
    });

    try {
        await client.connect(transport);
        console.log('✅ Connected to Sus MCP Server');
        
        // List available tools
        const tools = await client.listTools();
        console.log('📋 Available tools:', tools.tools.map(t => t.name));
        
        // Test susify tool
        const result = await client.callTool({
            name: 'susify',
            arguments: {
                sentence: 'hello world this is awesome'
            }
        });
        
        console.log('🎯 Susify result:', result.content[0].text);
        
        await client.close();
        console.log('✅ Test completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

testSusifyTool();