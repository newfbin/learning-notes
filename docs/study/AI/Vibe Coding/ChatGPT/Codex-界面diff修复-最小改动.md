# 解决 Codex 界面不显示 diff 问题的最小改动

> 场景：使用 deepseek-v4-flash（自定义 ark-AgentPlan provider）改文件时，Codex 桌面版界面看不到文件 diff。

## 根因

1. 模型目录里 `deepseek-v4-flash` 缺少 `apply_patch_tool_type`，CLI 不会把 `apply_patch` 工具暴露给模型，模型只能用 shell 写文件，界面自然没有 diff。
2. 早期调试把 deepseek 条目照抄了 `gpt-5.6-sol`（含 `tool_mode = code_mode_only`、`multi_agent_version = v2`），在第三方模型上会导致工具初始化失败、模型完全不调工具。

## 最小改动（只需 2 个文件）

### 1. `C:\Users\1\.codex\model_catalog.json`

在 `models` 数组中加入 deepseek 条目，关键字段：

- `apply_patch_tool_type = "freeform"`：让 CLI 向模型暴露 apply_patch 工具
- `tool_mode`、`multi_agent_version` 留空（null）：避免第三方模型工具初始化失败
- 模板基于 gpt-5.5，不要照抄 gpt-5.6-sol

```json
{
  "models": [
    {
      "slug": "deepseek-v4-flash",
      "display_name": "DeepSeek V4 Flash",
      "apply_patch_tool_type": "freeform"
    }
  ]
}
```

（实际条目还含 instructions / reasoning 等字段，按 gpt-5.5 模板补充即可；最小触发条件就是上面两个点。）

### 2. `C:\Users\1\.codex\config.toml`

顶部加一行，指向模型目录文件：

```toml
model_catalog_json = "C:\\Users\\1\\.codex\\model_catalog.json"
```

可选（冗余但无害）：`[model_providers.ark-AgentPlan]` 下加 `apply_patch_tool_type = "freeform"`。

## 可选优化（[features]）

```toml
[features]
apply_patch_streaming_events = true
cwd_relative_turn_diffs = true
apply_patch_preserve_line_endings = true
```

这些开关让 diff 事件更快、路径相对当前目录。

## 验证

1. 完全退出 Codex，重启后开新对话（新目录）。
2. 让模型"改一个文件"并指定用 apply_patch。
3. 界面应出现文件改动 diff；日志里应出现 `patch_apply_begin/end`、`turn_diff` 事件。

## 排查提示

- 若新会话只有文本回复、完全没有工具调用：检查 deepseek 条目里 `tool_mode` / `multi_agent_version` 是否被误抄为 code_mode_only / v2，应置空。
- 若想隔离问题：临时切到标准 OpenAI 模型看是否有 diff，可判断是"模型工具暴露"还是"应用渲染"。
