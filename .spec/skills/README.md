# 项目技能

用到时读对应的 `SKILL.md`，需要时再读同目录的配套文件；名册和适用任务见 [项目中心文档](../AGENTS.md)。

| 技能 | 作用 |
| --- | --- |
| design-director、design-doc、design-review | 定玩法 → 写策划案 → 审查 |
| art-director、art-bible、art-prompt、art-review | 定美术方向 → 写美术规范 → 出图提示词 → 审查 |
| writing-plans、subagent-driven-development | 写实现计划 → 按计划派子 Agent 实现和审查 |

## 落点

- 策划案：`.spec/knowledge/features/`；美术规范：`.spec/knowledge/standards/`；新文档在 `.spec/knowledge/README.md` 加一行导航。
- 实现计划：`.spec/plans/<YYYYMMDD>-<主题>.md`。
- subagent-driven-development 的配套脚本需要 Bash 和 Git，Windows 上用 Git Bash。

## 来源与许可

这些技能来自 LumioGames/LumioGame 仓库的 `.spec/skills`（固定提交 `f7bef4624fb555013e59f64eed0302055d454000`，Apache-2.0，全文见 [LICENSE](LICENSE)），先经 Samsara 项目适配，再为本仓库去掉了项目专属内容和对 Workflow 插件的依赖。每个技能开头注明了来源。
