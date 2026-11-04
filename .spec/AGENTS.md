# 项目中心文档

状态：未初始化

> 未初始化时，Agent 先按 [`skills/lumio-init/SKILL.md`](skills/lumio-init/SKILL.md) 带用户初始化：问几个立项问题，生成模块目录、README 和规范，再引导补全玩法、配表、美术等。初始化结束时删掉 `skills/lumio-init/` 和这段提示，把上面的状态改成「已初始化」。

本文件只写本项目独有的东西：项目是什么、模块、收口门槛、技能名册、文件归属。通用规程（调度核心、编码约定、交回物格式、宿主差异）在 [`rules/dispatch.md`](rules/dispatch.md)，通用红线在 [`rules/system.md`](rules/system.md)，本项目的红线在 [`rules/project.md`](rules/project.md)，这里不复述。

## 项目是什么

（初始化时填写：暂定名、一句话说明、技术路线、是否有自己的服务端、是否发布到 Lumio、几个人做、文档语言。）

## 模块

（初始化时填写：顶层模块和各自的 README。划分规则见 `knowledge/standards/project-structure.md`。）

## 收口门槛

交付前必须跑的验证命令。初始只有结构检查；建好工程后，把构建和测试命令补在这里。

```bash
node .spec/tools/spec-lint.mjs
```

## 技能名册

处理对应任务时先读该技能的 `SKILL.md`，需要时再读同目录的配套文件；不要一次把全部技能读进来。来源与许可见 [`skills/README.md`](skills/README.md)。

| 技能 | 适用任务 |
| --- | --- |
| [brainstorming](skills/brainstorming/SKILL.md) | 做新功能、改行为之前，先把需求和设计聊清楚 |
| [writing-plans](skills/writing-plans/SKILL.md) | 动手写多步功能前写实现计划，或拆成可并行的任务卡 |
| [subagent-driven-development](skills/subagent-driven-development/SKILL.md) | 按计划一波波派子 Agent 实现，合入后统一审一次 |
| [test-driven-development](skills/test-driven-development/SKILL.md) | 大任务先写失败的测试再写实现 |
| [systematic-debugging](skills/systematic-debugging/SKILL.md) | 遇到 bug、测试失败、异常行为，先找根因再动手 |
| [spec-steward](skills/spec-steward/SKILL.md) | 改了 `.spec/` 的结构，或做完一处改动要沉淀进知识库 |
| [lumio-update](skills/lumio-update/SKILL.md) | 用户说「更新框架」：把框架文件更新到 LumioTemplate 最新版本，顺带看 LGUI 和 SDK 有没有新版 |
| [design-director](skills/design-director/SKILL.md) | 讨论并定下玩法、系统、数值、关卡、商业化方向 |
| [design-doc](skills/design-doc/SKILL.md) | 把定下的玩法写成策划案（`knowledge/features/`） |
| [design-review](skills/design-review/SKILL.md) | 审查策划案和开发需求 |
| [art-director](skills/art-director/SKILL.md) | 讨论并定下美术风格：UI、原画、特效、场景 |
| [art-bible](skills/art-bible/SKILL.md) | 把定下的美术方向写成美术规范（`knowledge/standards/art-direction.md`） |
| [art-prompt](skills/art-prompt/SKILL.md) | 把美术方向写成 AI 出图提示词 |
| [art-review](skills/art-review/SKILL.md) | 按美术规范审查美术资产和设计稿 |

子 Agent 只有 `reviewer`（[`agents/reviewer.md`](agents/reviewer.md)），名册和调度时机见 `rules/dispatch.md`。

## 项目专属约定

（可选。只写与 `rules/dispatch.md` 通用规程「不同」或「更严」的部分，相同的不要复制过来。）

## 框架文件和项目文件

`.spec/` 里的文件分两类。框架文件将来随 LumioTemplate 更新时整份覆盖（对 Agent 说「更新框架」，用 [lumio-update](skills/lumio-update/SKILL.md)；逐个路径的清单和当前框架版本以它为准），所以项目自己的内容不要写进框架文件。

| 类别 | 包含 | 规则 |
| --- | --- | --- |
| 框架文件 | `rules/system.md`、`rules/dispatch.md`、`agents/`、`skills/` 里模板自带的技能（含 `lumio-update`）、`tools/`、`references/`、`knowledge/lumio-platform/` | 项目不改；以后随模板更新，按文件或按技能文件夹覆盖 |
| 项目文件 | `AGENTS.md`（本文件）、`rules/project.md`、`knowledge/` 里除 `lumio-platform/` 以外的部分、`decisions/`、`tasks/`、`plans/`、项目自己加的技能 | 归项目所有，初始化时生成，之后由项目维护 |

放哪、怎么登记，用 [spec-steward](skills/spec-steward/SKILL.md)。

## 知识与决策

- 规范与功能记录：[`knowledge/README.md`](knowledge/README.md)（导航）
- 决策唯一落点：[`decisions/`](decisions/README.md)（ADR，不改写、只新增取代）
- 实现计划：[`plans/`](plans/README.md)（历史记录，日期前缀、不设索引）
- 离线任务卡：[`tasks/`](tasks/README.md)（多客户端共享任务时用）
