# 技能

用到时读对应的 `SKILL.md`，需要时再读同目录的配套文件；名册和适用任务见 [项目中心文档](../AGENTS.md)。Claude Code 经 `.claude/skills`、Codex 经 `.agents/skills` 两条软链自动发现本目录里的技能。

| 技能 | 作用 |
| --- | --- |
| brainstorming、writing-plans、subagent-driven-development、test-driven-development、systematic-debugging、spec-steward | 框架技能：聊清设计 → 写计划或拆卡 → 派子 Agent 实现 → 测试先行 → 排障 → 沉淀进 `.spec/` |
| design-director、design-doc、design-review | 策划技能：定玩法 → 写策划案 → 审查 |
| art-director、art-bible、art-prompt、art-review | 美术技能：定美术方向 → 写美术规范 → 出图提示词 → 审查 |
| lumio-init | 一次性技能：把模板初始化成用户自己的项目。只在模板和还没初始化完的项目里有，初始化结束时整个删除 |

除 lumio-init 外都是框架文件：项目不改，以后随模板更新整份覆盖（见 [项目中心文档](../AGENTS.md)「框架文件和项目文件」）。项目自己的技能另建文件夹，名字不要和这些重名。

## 落点

- 策划案：`.spec/knowledge/features/`；美术规范：`.spec/knowledge/standards/art-direction.md`；新文档在 `.spec/knowledge/README.md` 加一行导航。
- 实现计划：`.spec/plans/YYYY-MM-DD-<name>.md`（格式见 `.spec/plans/README.md`）。
- 决策：`.spec/decisions/NNNN-<slug>.md`（格式见 `.spec/decisions/README.md`）。
- subagent-driven-development 的配套脚本需要 Bash 和 Git，Windows 上用 Git Bash。

## 来源与许可

- **框架技能**（brainstorming、writing-plans、subagent-driven-development、test-driven-development、systematic-debugging、spec-steward）取自 [LumioGames/LumioAgentSpec](https://github.com/LumioGames/LumioAgentSpec) 1.1.1（提交 `8f93f82`），MIT，Copyright (c) 2026 Lumio，全文见 [LICENSE-agentspec](LICENSE-agentspec)。为放进仓库使用，把插件路径和插件命令改成了仓库内的写法，spec-steward 改成按「框架文件和项目文件」划分。其中 writing-plans、subagent-driven-development 改编自 [obra/superpowers](https://github.com/obra/superpowers)，MIT，Copyright (c) 2025 Jesse Vincent，全文见 [LICENSE-superpowers](LICENSE-superpowers)。`.spec/rules/system.md`、`.spec/rules/dispatch.md`、`.spec/agents/reviewer.md`、`.spec/references/`、`.spec/tools/` 里的 spec-lint、closeout-gate、guard-commit 也取自 LumioAgentSpec，同样适用 LICENSE-agentspec。
- **策划和美术技能**（7 个）来自 LumioGames/LumioGame 仓库的 `.spec/skills`（固定提交 `f7bef4624fb555013e59f64eed0302055d454000`），Apache-2.0，全文见 [LICENSE](LICENSE)。收入本仓库时去掉了只适用于原项目的内容（如写死的平台约束、开源定位）。每个技能开头注明了来源。
- **lumio-init** 是 LumioTemplate 自己的一次性技能，随模板许可。
