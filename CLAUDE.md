# CLAUDE.md

Claude Code 的入口。下面的 `@` 行在每次会话开始时把对应文件强制载入上下文。

项目中心文档：

@.spec/AGENTS.md

知识导航：

@.spec/knowledge/README.md

规则（工作方式与通用红线、项目红线）：

@.spec/rules/system.md

@.spec/rules/project.md

本文件只负责载入，规则写在 `.spec/`；`rules/` 下新增文件要在上面加 `@import`。
