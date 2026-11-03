# Lumio 游戏起步仓库：给 Agent 的说明

这个仓库是 Lumio（https://lumiogames.cn ）网页游戏的起步仓库。里面没有游戏代码，只有规则、平台知识、技能和两个小工具。**由你（Agent）带着用户把它初始化成用户自己的游戏项目**：改名、装依赖、建工程、接通 Lumio SDK、打出能上传的 ZIP。用户可能不写代码，所以你来做事，并用用户的语言说明每一步。

开工前先读：

1. [`.spec/AGENTS.md`](.spec/AGENTS.md)：项目中心文档（项目是什么、目录、命令、技能名册）。
2. [`.spec/rules/system.md`](.spec/rules/system.md)：硬规则，必须遵守。
3. [`.spec/knowledge/README.md`](.spec/knowledge/README.md)：知识导航；Lumio 平台、SDK、LGUI 的事实都在 `.spec/knowledge/lumio/`。

`.spec/AGENTS.md` 写着「状态：未初始化」时，先按下面的流程初始化，再做别的。

## 首次初始化

按顺序做。任何一步失败都停下，把错误原文告诉用户，不要跳过、不要编造成功。

### 1. 了解用户要做什么

一次问完，用户没想好的给默认值：

- 游戏名：显示名（如「星跳」）和英文短名（小写字母、数字、连字符，如 `star-hop`，用作目录名和包名）。
- 一句话玩法，横屏、竖屏还是都要。
- 界面怎么做：
  - **LGUI**（推荐给菜单、背包、商店这类界面多的游戏）：Lumio 的 UI 框架，Agent 能直接拼界面、写逻辑、跑测试。见 [lgui.md](.spec/knowledge/lumio/lgui.md)。
  - **自己画**：Canvas 或其他网页引擎（Phaser、PixiJS 等），用 Vite + TypeScript 建工程。见 [web-project.md](.spec/knowledge/lumio/web-project.md)。
- 要用哪些平台能力：默认云存档 + 排行榜。可选范围见 [sdk.md](.spec/knowledge/lumio/sdk.md)。

### 2. 检查环境

- `node -v` 要求 24.18 或更高（Lumio SDK 和 LGUI 都要求 Node 24）。没有或太旧，请用户自己去 https://nodejs.org 装，不要替用户装。
- `git --version`。

### 3. 把仓库变成用户自己的

- `git remote -v`：
  - 用户在 GitHub 上点了「Use this template」建的仓库：已经是用户自己的，不用动。
  - 直接 clone 的本仓库（远程指向 `LumioGames/lumio-game-starter`）：问用户要不要建自己的远程仓库。要就让用户给地址，或在用户同意后用 `gh repo create` 建；然后 `git remote set-url origin <新地址>`。不要就 `git remote remove origin`。
- 把 `README.md` 改成这个游戏的说明（游戏名、一句话玩法、怎么本地运行、怎么打包上传），删掉 `README.en.md`（用户要英文版就改写它）。
- 填 `.spec/AGENTS.md` 的「项目是什么」，状态改成「已初始化」。

### 4. 建工程

游戏代码都放在 `game/` 目录里（仓库根目录放 `.spec/` 和工具，`lgui init` 也要求空目录）。

- 选了 LGUI：按 [lgui.md](.spec/knowledge/lumio/lgui.md) 装插件、`lgui init game --name <短名>`、加 Lumio 服务。
- 选了自己画：按 [web-project.md](.spec/knowledge/lumio/web-project.md) 建 Vite + TypeScript 工程。

两种都要：

- 在 `game/` 里 `npm i --save-exact @lumiogames/sdk@<版本>`，版本以 [sdk.md](.spec/knowledge/lumio/sdk.md) 为准。
- 本地开发构建用 SDK 模拟器，正式构建只用 `connectLumioFromLaunch()` 连平台。**连接失败时不能自动换成模拟器。**
- 写 `game/lumio.json`，按用户要的能力声明存档槽和排行榜字段（[publishing.md](.spec/knowledge/lumio/publishing.md)）。
- 放一个按钮：点一下就存档、提交分数，并显示结果。用它确认 SDK 已接通，之后用户可以删掉。
- 在 `game/package.json` 加脚本：`build`（正式构建到 `game/dist/`，里面要有 `lumio.json`）、`pack`（`node ../tools/lumio-pack.mjs dist ../<短名>.zip`）；Vite 工程再加 `dev`。LGUI 工程本地预览直接用 `lgui dev`。

### 5. 验收

- 打开本地预览，点按钮，页面显示存档和提交成功。模拟器的结果带 `simulated: true`。
- 能写测试就跑测试（LGUI 用 `lgui test`）。
- `npm run build && npm run pack` 生成 ZIP，`lumio-pack.mjs` 没有报错。
- 检查正式构建里没有模拟器：`dist/` 的脚本里搜不到 `simulated_friend`（只有模拟器模块里有这个字符串）。

### 6. 收尾

- 在 `.spec/decisions/` 写第一条决策 `ADR-001-<主题>.md`：选了哪种界面方案、SDK 版本、为什么。
- 填 `.spec/AGENTS.md` 的目录分工和常用命令。
- 删掉本文件的「首次初始化」一节，留下开头那段说明和「平时开发」。
- 本地提交一次。推送前先问用户。
- 告诉用户下一步：
  1. 本地怎么运行、怎么打包。
  2. 上传：登录 https://lumiogames.cn/studio/games/new 创建作品，在「版本」页上传 ZIP 并提交审核。上传和提交审核由用户自己点，你不替用户上传。
  3. 想好玩法就说「我们来定玩法」（design-director 技能），想定美术风格就说「我们来定美术方向」（art-director 技能）。

## 平时开发

- 每次开工先读 `.spec/AGENTS.md` 和 `.spec/rules/system.md`；改到平台能力、打包、发布时，先读 `.spec/knowledge/lumio/` 里对应那篇。
- 用户拍板的玩法、美术、技术决定，写进 `.spec/`（技能里写了放哪里）。
- 用到 Lumio 引擎（联机、体素、服务端）的大型游戏不在本仓库范围，见 [resources.md](.spec/knowledge/lumio/resources.md) 里的 Lumio-DevKit。
