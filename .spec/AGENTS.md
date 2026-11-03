# 项目中心文档

状态：未初始化

> 未初始化时，Agent 先按仓库根目录 [AGENTS.md](../AGENTS.md) 的「首次初始化」把仓库变成用户自己的游戏项目，并改写本文件。初始化后把上面的状态改成「已初始化」，删掉这段提示。

本文件记录项目现状、文档入口和项目专属说明。硬规则在 [rules/system.md](rules/system.md)，知识导航在 [knowledge/README.md](knowledge/README.md)，决策在 [decisions/README.md](decisions/README.md)。

## 项目是什么

（初始化时填写：游戏名、英文短名、一句话玩法、横竖屏、界面方案、用到的 Lumio 能力。）

## 目录

| 目录 | 放什么 |
| --- | --- |
| `game/` | 游戏工程：代码、界面、资源、`lumio.json`。初始化时建立 |
| `tools/` | 打包工具：`lumio-pack.mjs` 把构建目录打成可上传的 ZIP；`lgui-build-web.mjs` 是 LGUI 工程的过渡构建脚本 |
| `.spec/knowledge/` | 现行知识：Lumio 平台事实（`lumio/`）、玩法设计（`features/`）、规范（`standards/`） |
| `.spec/decisions/` | 决策记录（ADR） |
| `.spec/plans/` | 多步开发计划（writing-plans 技能写入） |
| `.spec/skills/` | 项目技能，用到时读对应的 `SKILL.md` |

（初始化后补上 `game/` 里面的目录分工。）

## 常用命令

（初始化时填写，例：）

```bash
cd game
npm run dev     # 本地预览，用 SDK 模拟器
npm run build   # 正式构建到 game/dist/
npm run pack    # 打成可上传的 ZIP
```

## 技能名册

处理对应任务时先读该技能的 `SKILL.md`，需要时再读配套文件；不要一次把全部技能读进来。

| 技能 | 适用任务 |
| --- | --- |
| [design-director](skills/design-director/SKILL.md) | 讨论并定下玩法、系统、数值、关卡、商业化方向 |
| [design-doc](skills/design-doc/SKILL.md) | 把定下的玩法写成策划案（`.spec/knowledge/features/`） |
| [design-review](skills/design-review/SKILL.md) | 审查策划案和开发计划 |
| [art-director](skills/art-director/SKILL.md) | 讨论并定下美术风格：UI、原画、特效、场景 |
| [art-bible](skills/art-bible/SKILL.md) | 把定下的美术方向写成美术规范（`.spec/knowledge/standards/`） |
| [art-prompt](skills/art-prompt/SKILL.md) | 把美术方向写成 AI 出图提示词 |
| [art-review](skills/art-review/SKILL.md) | 按美术规范审查美术资产和设计稿 |
| [writing-plans](skills/writing-plans/SKILL.md) | 动手写多步功能前，先写实现计划 |
| [subagent-driven-development](skills/subagent-driven-development/SKILL.md) | 按计划一项项派子 Agent 实现并审查 |

技能的来源与许可见 [skills/README.md](skills/README.md)。
