# 给 Agent 的入口

本仓库的规范都在 `.spec/` 里。本文件只负责指路，不定义规则。

开工前按顺序读下面几份。Claude Code 经 `CLAUDE.md` 的 `@import` 自动载入它们；Codex 和其他客户端请在这里主动读：

1. [`.spec/AGENTS.md`](.spec/AGENTS.md)：项目中心文档（项目是什么、模块、收口命令）。
2. [`.spec/knowledge/README.md`](.spec/knowledge/README.md)：知识导航。
3. [`.spec/rules/system.md`](.spec/rules/system.md)：工作方式与通用红线。
4. [`.spec/rules/project.md`](.spec/rules/project.md)：本项目的红线。

技能在 `.spec/skills/`（Claude Code 经 `.claude/skills`、Codex 经 `.agents/skills` 自动发现；其他客户端用到时读对应的 `SKILL.md`），审查子 Agent 在 `.spec/agents/`。

**克隆或下载之后、`.claude/skills` 不存在时**，先跑 `node .spec/tools/link-skills.mjs`：这三条链接（`.claude/skills`、`.claude/agents`、`.agents/skills`）不进 git，每台电脑在本地建；Windows 上建的是目录联接，不需要开发者模式。这是 Agent 自己的准备工作，用户不用管，也不用跟用户提。电脑上缺 Node 或 Git、或 Node 版本不对（要求见 `.node-version`）：问用户一次，同意后按 [`.spec/knowledge/lumio-platform/environment.md`](.spec/knowledge/lumio-platform/environment.md) 从官方渠道装。

`.spec/AGENTS.md` 写着「状态：未初始化」时，先按 [`.spec/skills/lumio-init/SKILL.md`](.spec/skills/lumio-init/SKILL.md) 初始化，再做别的。

本文件只指路：不在这里加项目规则，规则写进 `.spec/`；各客户端的入口文件都指向 `.spec/`，不另立第二套规则。
