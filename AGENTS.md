# 给 Agent 的入口

本仓库的规范都在 `.spec/` 里。本文件只负责指路，不定义规则。

开工前按顺序读下面几份。Claude Code 经 `CLAUDE.md` 的 `@import` 自动载入它们；Codex 和其他客户端请在这里主动读：

1. [`.spec/AGENTS.md`](.spec/AGENTS.md)：项目中心文档（项目是什么、模块、收口命令、技能名册）。
2. [`.spec/knowledge/README.md`](.spec/knowledge/README.md)：知识导航。
3. [`.spec/rules/system.md`](.spec/rules/system.md)：通用红线。
4. [`.spec/rules/dispatch.md`](.spec/rules/dispatch.md)：调度与编码规程。
5. [`.spec/rules/project.md`](.spec/rules/project.md)：本项目的红线。

技能在 `.spec/skills/`（Claude Code 经 `.claude/skills`、Codex 经 `.agents/skills` 自动发现；其他客户端用到时读对应的 `SKILL.md`），审查子 Agent 在 `.spec/agents/`。

`.spec/AGENTS.md` 写着「状态：未初始化」时，先按 [`.spec/skills/lumio-init/SKILL.md`](.spec/skills/lumio-init/SKILL.md) 初始化，再做别的。

本文件只指路：不在这里加项目规则，规则写进 `.spec/`；各客户端的入口文件都指向 `.spec/`，不另立第二套规则。
