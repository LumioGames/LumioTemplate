# CLAUDE.md

Claude Code 的入口。下面的 `@` 行在每次会话开始时把对应文件强制载入上下文。规范以 `.spec/` 为准，本文件只负责载入，不定义规则。

项目中心文档：

@.spec/AGENTS.md

知识导航：

@.spec/knowledge/README.md

规则（工作方式与通用红线、项目红线）：

@.spec/rules/system.md

@.spec/rules/project.md

> 维护：`.spec/rules/` 下每个文件都要在上面有一行 `@` 导入，漏了 Claude Code 就不会载入；`node .spec/tools/spec-lint.mjs` 会检查。

- 技能和子 Agent 经软链被发现：`.claude/skills → ../.spec/skills`、`.claude/agents → ../.spec/agents`。规则经上面的 `@` 行载入，不走软链。
- 不在这里写只给 Claude 的规则；要改行为就改 `.spec/`。
