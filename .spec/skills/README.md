# 技能

用到时读对应的 `SKILL.md`，需要时再读同目录的配套文件。Claude Code 经 `.claude/skills`、Codex 经 `.agents/skills` 两条软链自动发现本目录里的技能。

| 技能 | 作用 |
| --- | --- |
| writing-plans、subagent-driven-development、test-driven-development、systematic-debugging、spec-steward、lumio-update | 框架技能：写计划或拆卡 → 派子 Agent 实现 → 测试先行 → 排障 → 沉淀进 `.spec/` → 更新框架 |
| design-director、design-review | 策划技能：定玩法并写进策划案 → 审查 |
| art-director、art-prompt、art-review | 美术技能：定美术方向并写进美术规范 → 出图提示词 → 审查 |
| lumio-init | 一次性技能：把模板初始化成用户自己的项目。只在模板和还没初始化完的项目里有，初始化结束时整个删除 |

除 lumio-init 外都是框架文件：项目不改，以后随模板更新整份覆盖（更新用 lumio-update，框架文件清单以它为准）。项目自己的技能另建文件夹，名字不要和这些重名。

## 落点

- 策划案：`.spec/knowledge/features/`；美术规范：`.spec/knowledge/standards/art-direction.md`；新文档在 `.spec/knowledge/README.md` 加一行导航。
- 实现计划：`.spec/plans/YYYY-MM-DD-<name>.md`（格式见 `.spec/plans/README.md`）。
- 决策：`.spec/decisions/NNNN-<slug>.md`（格式见 `.spec/decisions/README.md`）。
- subagent-driven-development 的配套脚本需要 Bash 和 Git，Windows 上用 Git Bash。

## 来源与许可

LumioTemplate 的许可条款在它的 `LICENSE` 里：模板仓库放在根目录，用模板初始化的项目放在 `.spec/LICENSE`。条款覆盖 LumioTemplate 的文件和它们的副本（包括初始化后的项目里保留的那些），不覆盖用户在自己项目里新加的文件。下面这些部分另有许可，其余都按 PolyForm Shield 1.0.0 加 LumioGames 的附加许可：

- **取自 [LumioGames/LumioAgentSpec](https://github.com/LumioGames/LumioAgentSpec) 1.1.1（提交 `8f93f82`）的文件**：MIT，Copyright (c) 2026 Lumio，全文见 [LICENSE-agentspec](LICENSE-agentspec)。包括 `.spec/rules/system.md`、`.spec/agents/reviewer.md`、`.spec/tools/` 里的 spec-lint，以及 5 个框架技能 writing-plans、subagent-driven-development、test-driven-development、systematic-debugging、spec-steward。为放进仓库使用，把插件路径和插件命令改成了仓库内的写法，spec-steward 改成按「框架文件和项目文件」划分。其中 writing-plans、subagent-driven-development 同时改编自 [obra/superpowers](https://github.com/obra/superpowers)，也是 MIT，Copyright (c) 2025 Jesse Vincent，全文见 [LICENSE-superpowers](LICENSE-superpowers)。
- **策划和美术技能**（design-director、design-review、art-director、art-prompt、art-review）：来自 LumioGames/LumioGame 仓库的 `.spec/skills`（固定提交 `f7bef4624fb555013e59f64eed0302055d454000`），Apache-2.0，全文见 [LICENSE](LICENSE)。收入本仓库时去掉了只适用于原项目的内容（如写死的平台约束、开源定位）。每个技能开头注明了来源。
- **按 PolyForm Shield 加附加许可的部分**包括 lumio-init、lumio-update 两个技能，`.spec/knowledge/lumio-platform/`，以及 `lumio-pack.mjs`、`lgui-build-web.mjs` 两个 Lumio 工具。

框架文件是 LumioAgentSpec 1.1.1 的快照。LumioAgentSpec 仍独立维护（通用，不限于游戏）。模板的框架版本记在模板仓库的 `CHANGELOG.md`，用户项目通过 lumio-update 从模板更新。
