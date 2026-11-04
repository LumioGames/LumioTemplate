# LumioTemplate

[![LumioGames 出品](https://img.shields.io/badge/LumioGames-%E5%87%BA%E5%93%81-6659DB?style=flat-square&labelColor=171C34&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iOTYiIGhlaWdodD0iOTYiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzY2NTlkYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzlhYTZmZiIvPjwvbGluZWFyR3JhZGllbnQ%2BPC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMjkiIGZpbGw9InVybCgjZykiLz48cmVjdCB4PSIyNSIgeT0iMjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIyNSIgeT0iNDIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIyNSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSI0NSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjYiLz48cmVjdCB4PSI2NSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiM1ZGUyYzYiLz48cGF0aCBkPSJNNzAgMTlDNzEuNTYgMjguMSA3My45IDMwLjQ0IDgzIDMyQzczLjkgMzMuNTYgNzEuNTYgMzUuOSA3MCA0NUM2OC40NCAzNS45IDY2LjEgMzMuNTYgNTcgMzJDNjYuMSAzMC40NCA2OC40NCAyOC4xIDcwIDE5WiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPgo%3D)](https://lumiogames.cn/)
[![Use this template](https://img.shields.io/badge/Use%20this%20template-%E4%B8%80%E9%94%AE%E5%A4%8D%E5%88%B6-6659DB?style=flat-square&labelColor=171C34)](https://github.com/LumioGames/LumioTemplate/generate)
[![node](https://img.shields.io/badge/node-%E2%89%A524.18-5DE2C6?style=flat-square&labelColor=171C34)](https://nodejs.org/)
[![license](https://img.shields.io/badge/license-PolyForm%20Shield%20%2B%20%E9%99%84%E5%8A%A0%E8%AE%B8%E5%8F%AF-AEB5D6?style=flat-square&labelColor=171C34)](#许可)

[English](README.en.md)

Lumio 游戏模板：帮你把一个游戏项目的**目录结构和规范**一次整理好。你把它交给 AI Agent（Claude Code、Codex 等），说一句「开始」，Agent 会问你几个问题，然后生成按你的项目裁剪好的模块目录（每个目录一份 README，写明放什么、依赖谁、不准做什么）和一整套规范：项目结构、开发流程、代码风格、测试、项目红线，以及 Agent 的调度和审查规程。

不限引擎：网页、Unity、UE 都行，默认发布到 [Lumio](https://lumiogames.cn)。模板不写游戏代码、不建工程、不装依赖，这些是初始化之后的下一步，Agent 会告诉你怎么做。

## 两种开始方式

1. **用模板建仓库**：在 GitHub 上点 **Use this template** → **Create a new repository**，把新仓库 clone 到电脑上，用 Claude Code 或 Codex 打开这个文件夹，说：

   > 开始

   直接 clone 本仓库也行，收尾时 Agent 会问你要不要去掉模板的远程地址和提交历史。
2. **让 Agent 帮你克隆**：在任意对话里把本仓库的地址发给 Agent，说「用 LumioTemplate 帮我建个游戏」。Agent 按下面「给 Agent」一节做：当前文件夹是空的，就直接克隆进来，在同一个对话里开始初始化；不是空的，就问好文件夹名克隆进去，再请你到那个文件夹里开一个新对话说「开始」。

初始化分两段：

1. **生成骨架**：问 5 个问题（暂定名和一句话想法、有没有自己写的服务端、用网页还是 Unity / UE、发不发布到 Lumio、几个人做和文档语言），每题都有例子和默认值，没想好就说「你定」。先把目录树画给你确认，再一次生成。到这一步项目就完整能用了。
   生成完 Agent 只问一句：要不要现在聊玩法 / 美术。不聊也行，以后随时说「我们来定玩法」「我们来定美术方向」。
2. **收尾**：删掉一次性的初始化技能，把 README 改写成你的游戏说明，本地提交一次。推不推送到 GitHub，先问你。

需要：Git、Node.js 24.18 或更高、一个 AI 编程 Agent。

## 给 Agent

这一节写给从仓库外面读到这份 README 的 AI Agent（比如用户只发了一个链接）。用户可能不写代码：用用户的语言说明每一步在做什么。

> **给 AI Agent：用 LumioTemplate 开始一个游戏项目**
>
> 按顺序做。任何一步失败都停下，把错误原文告诉用户，不要跳过。
>
> 1. 运行 `git --version` 和 `node -v`：要有 Git，Node 要 24.18 或更高。缺哪个就告诉用户装什么、去哪下载（Git：https://git-scm.com/downloads ；Node：https://nodejs.org ，选 24 LTS），请用户自己装，装好后再检查一遍。不要替用户装。
> 2. **当前文件夹是空的**（`ls -A` 没有输出；PowerShell 用 `Get-ChildItem -Force`）：运行 `git clone -c core.symlinks=true https://github.com/LumioGames/LumioTemplate .`。然后就在**这次对话里**接着做：先读 `AGENTS.md` 和它列出的几份文件，再按 `.spec/skills/lumio-init/SKILL.md` 开始初始化。不用开新对话——这次对话不会自动载入这些文件，你主动去读就行。
> 3. **当前文件夹不是空的**：问用户项目文件夹叫什么（小写字母、数字和连字符，例如 `star-hop`），运行 `git clone -c core.symlinks=true https://github.com/LumioGames/LumioTemplate <文件夹名>`，然后请用户在那个文件夹里开一个新对话，说「开始」。不要在当前文件夹里初始化。
> 4. **用户想要一个自己的 GitHub 仓库**：在第 2 或第 3 步克隆之前，先问用户仓库名、公开还是私有。用户同意后运行 `gh repo create <仓库名> --template LumioGames/LumioTemplate --private`（公开就用 `--public`），等几秒让 GitHub 生成好，再按第 2 或第 3 步克隆**这个新仓库**的地址，而不是模板的地址。没装或没登录 `gh` 时，请用户在 GitHub 上点 Use this template 建好仓库，把地址发给你。推送、建远程仓库、发布这类对外操作，每一次都先问用户。

## 你会得到什么

以「单机、网页、发布到 Lumio」为例，初始化后的项目是这样：

```
my-game/
├─ Client/        客户端。网页路线以后在 Client/app 建 LGUI 工程（Unity 路线还有 Client/unity）
├─ Config/        配表和通用配置；有自己的服务端时还放协议
├─ Art/           美术源文件：风格探索、参考图、出图提示词
├─ Tools/         开发工具，包括 Lumio 打包工具
├─ Builds/        构建产物，只有 README 进 git
├─ .spec/
│  ├─ AGENTS.md   项目中心文档：项目是什么、模块、收口命令
│  ├─ LICENSE     LumioTemplate 的许可条款（初始化时从根目录移进来，根目录留给你的游戏）
│  ├─ rules/      工作方式与通用红线、本项目的红线
│  ├─ knowledge/  规范（项目结构、工作流、代码风格、测试、美术）、玩法方向、Lumio 平台知识
│  ├─ decisions/  决策记录（ADR），第一条是项目结构与技术路线
│  ├─ skills/     技能：写计划、派子 Agent、测试先行、排障、沉淀、更新框架，以及策划和美术
│  ├─ agents/     审查子 Agent
│  └─ tools/      结构检查
├─ AGENTS.md      给 Agent 的入口（指路）
├─ CLAUDE.md      Claude Code 的入口（自动载入核心文档）
└─ README.md      你的游戏说明
```

有自己写的服务端代码时多一个 `Server/`。每个模块一份 README；还没跟你确认的地方标着「待完善」，以后随时补。

## 模板仓库里有什么

| 路径 | 内容 |
| --- | --- |
| `AGENTS.md` / `CLAUDE.md` | Agent 的入口：先读哪几份文档；Claude Code 经 `CLAUDE.md` 自动载入 |
| `.spec/AGENTS.md` | 项目中心文档，初始状态是「未初始化」 |
| `.spec/rules/` | `system.md` 工作方式与通用红线、`project.md` 项目红线（初始化时生成） |
| `.spec/knowledge/` | 规范骨架、功能文档模板、bug 墙，以及 `lumio-platform/`：SDK、`lumio.json` 与打包、LGUI、网页工程、资源地址 |
| `.spec/decisions/`、`plans/` | 决策记录、实现计划的格式（任务卡就是计划里的 `### Task N`） |
| `.spec/skills/` | 11 个常驻技能（含更新框架用的 `lumio-update`），加上一次性的 `lumio-init`（初始化流程和生成模板，收尾时删除） |
| `.spec/agents/reviewer.md` | 审查子 Agent |
| `.spec/tools/` | `spec-lint.mjs` 结构检查；`lumio-pack.mjs` 和 `lgui-build-web.mjs` 初始化时按路线移到 `Tools/` 或删除 |
| `.claude/`、`.agents/` | 指向 `.spec/` 的软链（让客户端找到技能和子 Agent） |
| `CHANGELOG.md` | 框架的版本记录（每个版本一个 tag），初始化收尾时删除 |

## 更新框架

`.spec/` 里的工作方式与通用红线、技能、检查工具和 Lumio 平台知识是**框架文件**，项目不改；你自己的规则、规范、玩法和决策是**项目文件**，归你所有。模板以后出了新版，在项目里对 Agent 说：

> 更新框架

Agent 会用 `lumio-update` 技能：拉取 LumioTemplate 最新的版本 tag，把这之间的更新记录给你看，只覆盖框架文件，覆盖后把改动（`git diff`）给你看，跑一遍结构检查，本地提交一次，推送前先问你。顺带看看 LGUI 和 Lumio SDK 有没有新版，只提示、不自动升级。当前框架版本写在 `.spec/skills/lumio-update/SKILL.md` 里。

## 支持哪些 Agent

`.spec/` 是唯一来源，各客户端看到的是同一套文件，不需要装任何框架插件。

| 能力 | Claude Code | Codex | 其他读 `AGENTS.md` 的 Agent |
| --- | --- | --- | --- |
| 核心文档 | `CLAUDE.md` 的 `@import`，每次会话自动载入 | 按 `AGENTS.md` 主动读 | 按 `AGENTS.md` 主动读 |
| 技能 | `.claude/skills` 软链，自动发现 | `.agents/skills` 软链，自动发现 | 按 `AGENTS.md` 去 `.spec/skills/` 读 |
| 审查子 Agent | `.claude/agents` 软链 | 没有，主 Agent 读 `reviewer.md` 自审 | 同 Codex |

Windows 上要先打开开发者模式，再用上面带 `-c core.symlinks=true` 的命令克隆，否则三条软链会变成普通文件，技能找不到。

## 相关仓库

- [LumioAgentSpec](https://github.com/LumioGames/LumioAgentSpec)：框架文件（通用红线、框架技能、检查工具）的来源。它是一个不限于游戏的通用 Agent 项目管理框架，仍在独立维护；本模板里是它 1.1.1 的快照，按游戏项目改成了仓库内加软链的形态。
- [LGUI](https://github.com/LumioGames/LGUI)：给 Agent 用的游戏 UI 框架，每条路线都推荐用它做界面。
- [Lumio SDK](https://github.com/LumioGames/LumioSDK)：`@lumiogames/sdk` 的说明与类型。

## 社群

开发者 QQ 群：[972220164](https://qm.qq.com/q/PGkXh4tCyQ)

## 许可

LumioTemplate 源码公开，采用 [PolyForm Shield 1.0.0](https://polyformproject.org/licenses/shield/1.0.0) 许可，另加 LumioGames 的附加许可和商标说明，全文都在 [LICENSE](LICENSE) 里。简单说：

| 可以 | 不可以 |
| :-- | :-- |
| 用模板做你自己的游戏：游戏归你所有，可以收费商用，可以发到 Lumio 以外的平台 | 拿模板或改过的版本去做游戏模板、游戏开发工具、游戏平台这类竞品，收费、免费都不行 |
| 点 Use this template、fork、修改、提 PR，用来学习、教学、研究 | 换个名字、换层皮把模板本身重新发布 |
| 在你的游戏里写「用 LumioTemplate 制作」「在 Lumio 发布」 | 把 Lumio、LumioGames 的名字和图标当成自己的品牌 |

许可覆盖模板的文件和它们的副本，包括你用模板初始化的项目里保留的那些（初始化后条款放在 `.spec/LICENSE`）；你在自己项目里新加的文件不在其中。其中几部分另有许可：取自 LumioAgentSpec 的规则、子 Agent、检查工具和 6 个框架技能是 MIT（writing-plans 和 subagent-driven-development 同时改编自 obra/superpowers，也是 MIT）；7 个策划、美术技能是 Apache-2.0（见 [.spec/skills/README.md](.spec/skills/README.md)）。有其他用法，请先通过[开发者中心](https://lumiogames.cn/studio/)或上面的社群联系我们，单独授权。以 LICENSE 里的英文原文为准，这里的中文只是帮助理解。
