## DFCode

### 配置MCP

#### 通过配置文件配置

全局配置：~/.config/dfcode/dfcode.jsonc

#### 命令行方式

dfcode mcp add
dfcode mcp list
dfcode mcp auth <name>
dfcode mcp logout <name>
dfcode mcp debug <name>

### Arthas MCP配置示例

```json
{
  "$schema": "https://dfcode.ai/config.json",
  "mcp": {
    "arthas-linux-server-mcp": {
      "type": "remote",
      "url": "http://10.20.51.38:8563/mcp",
      "headers": {
        "Authorization": "Bearer 1"
      }
    },
    "arthas-local-mcp": {
      "type": "remote",
      "url": "http://localhost:8563/mcp"
    }
  }
}

```

