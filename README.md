# LumioTemplate

[![LumioGames 出品](https://img.shields.io/badge/LumioGames-%E5%87%BA%E5%93%81-6659DB?style=flat-square&labelColor=171C34&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iOTYiIGhlaWdodD0iOTYiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzY2NTlkYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzlhYTZmZiIvPjwvbGluZWFyR3JhZGllbnQ%2BPC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMjkiIGZpbGw9InVybCgjZykiLz48cmVjdCB4PSIyNSIgeT0iMjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIyNSIgeT0iNDIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIyNSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSI0NSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjYiLz48cmVjdCB4PSI2NSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiM1ZGUyYzYiLz48cGF0aCBkPSJNNzAgMTlDNzEuNTYgMjguMSA3My45IDMwLjQ0IDgzIDMyQzczLjkgMzMuNTYgNzEuNTYgMzUuOSA3MCA0NUM2OC40NCAzNS45IDY2LjEgMzMuNTYgNTcgMzJDNjYuMSAzMC40NCA2OC40NCAyOC4xIDcwIDE5WiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPgo%3D)](https://lumiogames.cn/)
[![Use this template](https://img.shields.io/badge/Use%20this%20template-%E4%B8%80%E9%94%AE%E5%A4%8D%E5%88%B6-6659DB?style=flat-square&labelColor=171C34)](https://github.com/LumioGames/LumioTemplate/generate)
[![node](https://img.shields.io/badge/node-%E2%89%A524.18-5DE2C6?style=flat-square&labelColor=171C34)](https://nodejs.org/)
[![license](https://img.shields.io/badge/license-PolyForm%20Shield%20%2B%20%E9%99%84%E5%8A%A0%E8%AE%B8%E5%8F%AF-AEB5D6?style=flat-square&labelColor=171C34)](#许可)

[English](README.en.md)

Lumio 游戏模板：用来开始做一个 [Lumio](https://lumiogames.cn) 网页游戏的空仓库。里面没有游戏代码，只有给 AI Agent 的规则、Lumio 平台知识、策划和美术技能，以及打包工具。你把它交给 Agent（Claude Code、Codex 等），Agent 会问你想做什么游戏，然后把仓库改成你的项目，装好依赖、建好工程、接通 Lumio SDK，最后打出能直接上传的 ZIP。

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

- [Lumio SDK](https://github.com/LumioGames/LumioSDK)：`@lumiogames/sdk` 的说明与类型。
- [LGUI](https://github.com/LumioGames/LGUI)：给 Agent 用的游戏 UI 框架。
- [Lumio DevKit](https://github.com/LumioGames/Lumio-DevKit)：Lumio 引擎（联机、体素、服务端）的 Agent 插件；做网页游戏用不到。

## 社群

开发者 QQ 群：[972220164](https://qm.qq.com/q/PGkXh4tCyQ)

## 许可

LumioTemplate 源码公开，采用 [PolyForm Shield 1.0.0](https://polyformproject.org/licenses/shield/1.0.0) 许可，另加 LumioGames 的附加许可和商标说明，全文都在 [LICENSE](LICENSE) 里。简单说：

| 可以 | 不可以 |
| :-- | :-- |
| 用模板做你自己的游戏：游戏归你所有，可以收费商用，可以发到 Lumio 以外的平台 | 拿模板或改过的版本去做游戏模板、游戏开发工具、游戏平台这类竞品，收费、免费都不行 |
| 点 Use this template、fork、修改、提 PR，用来学习、教学、研究 | 换个名字、换层皮把模板本身重新发布 |
| 在你的游戏里写「用 LumioTemplate 制作」「在 Lumio 发布」 | 把 Lumio、LumioGames 的名字和图标当成自己的品牌 |

`.spec/skills/` 里的技能保留各自的许可：策划、美术技能是 Apache-2.0，writing-plans 和 subagent-driven-development 改编自 obra/superpowers，是 MIT（见 [.spec/skills/README.md](.spec/skills/README.md)）。有其他用法，请先通过[开发者中心](https://lumiogames.cn/studio/)或上面的社群联系我们，单独授权。以 LICENSE 里的英文原文为准，这里的中文只是帮助理解。
