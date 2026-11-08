# {{暂定名}}

{{一句话}}

<!-- 生成时：一句话还标着「待完善」就先写「玩法还在设计中。」 -->

## 现在做到哪了

项目的目录结构和规范已经整理好，游戏工程还没建。下一步是按 `Client/README.md` 建工程。

## 目录

| 路径 | 内容 |
| --- | --- |
| `Client/` | 客户端（{{技术路线}}），怎么建工程见它的 README |
| `Config/` | 配表和通用配置<!-- 如果：有 Server -->，以及客户端和服务端之间的协议<!-- 结束 --> |
<!-- 如果：有 Server -->
| `Server/` | 自己写的服务端代码 |
<!-- 结束 -->
| `Art/` | 美术源文件 |
| `Tools/` | 开发工具 |
| `Builds/` | 构建产物，不进 git |
| `.spec/` | 项目规范：中心文档、红线、知识、决策、技能 |
| `AGENTS.md` / `CLAUDE.md` | 给 AI Agent 的入口 |

## 怎么开发

用 Claude Code 或 Codex 打开这个文件夹，直接说想做什么。Agent 会先读 `.spec/` 里的规范、准备好环境再动手，每做完一件事自动存档。常用的说法：

- 「我们来定玩法」：讨论并定下玩法方向。
- 「我们来定美术方向」：讨论并定下美术风格。
- 「帮我建工程」：按 `Client/README.md` 建客户端工程。
- 「做某某功能」：先写计划，再派 Agent 实现。

需要：一个 AI 编程 Agent。Node（版本见根目录 `.node-version`，现在是 26 LTS）和 Git 电脑上没有的话，Agent 会问你一次，同意后从官方渠道装好。不需要 GitHub 账号；想备份到云端、或者和别人一起做时，跟 Agent 说一声。

## 本地运行和打包

（建工程后补：怎么在本地运行、怎么构建<!-- 如果：发布到 Lumio -->、怎么打包成能上传到 Lumio 的 ZIP<!-- 结束 -->。）
<!-- 如果：发布到 Lumio -->

## 发布到 Lumio

游戏做好后对 Agent 说「打包发布」。规则和步骤见 `.spec/knowledge/lumio-platform/publishing.md`，有两种方式：

- **自己上传**：Agent 把 ZIP 打到 `Builds/lumio-platform/`，你登录 https://lumiogames.cn/studio/games/new 创建作品，在「版本」页上传 ZIP 并提交审核。
- **用作者 API 密钥发布**：你在创作中心建一把作者 API 密钥，自己设进环境变量 `LUMIO_API_KEY`（不要贴进对话），Agent 用它完成上传、填资料和提交审核，每一步对外操作前都会先问你。
<!-- 结束 -->

## 许可

<!-- 如果：选了游戏许可 -->
游戏本身的许可见根目录 `LICENSE`。
<!-- 结束 -->
<!-- 如果：没选游戏许可 -->
游戏本身的代码和内容归作者所有，还没有对外授权。
<!-- 结束 -->

本项目用 [LumioTemplate](https://github.com/LumioGames/LumioTemplate) 初始化。项目里保留的 LumioTemplate 文件（主要在 `.spec/`）按 LumioTemplate 的许可使用，条款在 `.spec/LICENSE`；其中一部分规则、检查工具和技能另有 MIT 或 Apache-2.0 许可，见 `.spec/skills/README.md`。你在项目里新加的文件不受这些条款约束。
