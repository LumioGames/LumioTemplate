# Lumio 游戏起步仓库

[English](README.en.md)

用来开始做一个 [Lumio](https://lumiogames.cn) 网页游戏的空仓库。里面没有游戏代码，只有给 AI Agent 的规则、Lumio 平台知识、策划和美术技能，以及打包工具。你把它交给 Agent（Claude Code、Codex 等），Agent 会问你想做什么游戏，然后把仓库改成你的项目，装好依赖、建好工程、接通 Lumio SDK，最后打出能直接上传的 ZIP。

## 三步上手

1. **建自己的仓库**：在 GitHub 上点 **Use this template** → **Create a new repository**，再把新仓库 clone 到电脑上。（直接 clone 本仓库也行，Agent 会帮你改远程地址。）
2. **交给 Agent**：用 Claude Code 或 Codex 打开这个文件夹，说一句：

   > 帮我初始化这个 Lumio 游戏项目

   Agent 会问游戏名、玩法、横竖屏、界面用 [LGUI](https://github.com/LumioGames/LGUI) 还是自己画，然后完成改名、安装、建工程，并在本地用 SDK 模拟器跑起来给你看。
3. **打包上传**：让 Agent 打包（工程里是 `npm run build && npm run pack`），在 [创作中心](https://lumiogames.cn/studio/games/new) 创建作品，到「版本」页上传 ZIP 并提交审核。

需要：Node.js 24.18 或更高、Git、一个 AI 编程 Agent。

## 目录

| 路径 | 内容 |
| --- | --- |
| `AGENTS.md` / `CLAUDE.md` | Agent 的入口：首次初始化流程和平时开发的要求 |
| `.spec/AGENTS.md` | 项目中心文档：项目是什么、目录、命令、技能名册 |
| `.spec/rules/system.md` | 硬规则：连接平台、打包上传、账号数据、文档 |
| `.spec/knowledge/lumio/` | Lumio 平台知识：SDK、`lumio.json` 与打包、LGUI、Vite 工程、资源地址 |
| `.spec/decisions/` | 决策记录（ADR） |
| `.spec/skills/` | 策划、美术、写计划、子 Agent 开发等技能 |
| `tools/lumio-pack.mjs` | 把构建目录打成可上传的 ZIP，打包前先按平台规则检查 |
| `tools/lgui-build-web.mjs` | LGUI 工程的正式构建脚本（过渡用，LGUI 提供构建命令后删除） |
| `game/` | 你的游戏工程，初始化时由 Agent 建立 |

## 给 AI Agent

从 [AGENTS.md](AGENTS.md) 开始读。Lumio 平台、SDK、打包规则都在 `.spec/knowledge/lumio/`，硬规则在 `.spec/rules/system.md`。

相关仓库：

- [Lumio SDK](https://github.com/LumioGames/lumio-sdk)：`@lumiogames/sdk` 的说明与类型。
- [LGUI](https://github.com/LumioGames/LGUI)：给 Agent 用的游戏 UI 框架。
- [Lumio DevKit](https://github.com/LumioGames/Lumio-DevKit)：Lumio 引擎（联机、体素、服务端）的 Agent 插件；做网页游戏用不到。

## 社群

开发者 QQ 群：972220164
