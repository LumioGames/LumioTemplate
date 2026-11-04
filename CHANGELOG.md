# 更新记录

LumioTemplate 框架的版本记录。每个版本对应一个 tag（`vX.Y.Z`）。项目里说「更新框架」时，Agent 用 `lumio-update` 技能拉取最新 tag，把你当前版本之后的各节给你看；「需要手动处理」里的事项要按说明做。

本文件只属于模板：用模板初始化项目时，收尾会删掉它。

## v1.0.0（2026-11-04）

首个版本。

**框架内容**（框架文件清单见 `.spec/skills/lumio-update/SKILL.md`）

- 规则：`rules/system.md` 通用红线、`rules/dispatch.md` 调度与编码规程。结构检查只报告、不阻断。
- 子 Agent：`agents/reviewer.md`。
- 14 个常驻技能：框架技能 writing-plans、subagent-driven-development、test-driven-development、systematic-debugging、spec-steward、lumio-update；策划技能 design-director、design-doc、design-review；美术技能 art-director、art-bible、art-prompt、art-review。
- 工具：`tools/spec-lint.mjs` 结构检查（含「`rules/` 下每个文件都要在 `CLAUDE.md` 有 `@import`」）、`tools/closeout-gate.mjs` 收口定级、`tools/guard-commit.mjs` 提交前检查（只提示，不拦截）。
- Lumio 平台知识：`knowledge/lumio-platform/`（SDK 2.11.1、`lumio.json` 与打包、LGUI、网页工程、资源地址）。
- 客户端发现方式：`CLAUDE.md` 的 `@import`、根目录 `AGENTS.md` 指路、三条软链（`.claude/skills`、`.claude/agents`、`.agents/skills`）、`.claude/settings.json` 的提交前检查钩子。
- 一次性的 `lumio-init` 初始化技能（只在模板里，不随更新分发）。
- 许可：`LICENSE` 覆盖 LumioTemplate 的文件和它们在项目里的副本，逐项写明 MIT、Apache-2.0 的例外。初始化后它在 `.spec/LICENSE`，也是框架文件；根目录留给游戏自己的许可。

**来源**

- 框架取自 LumioAgentSpec 1.1.1（提交 `8f93f82`），放进仓库使用：插件路径和命令改成仓库内写法，软链布局沿用 LumioAgentSpec 0.x。LumioAgentSpec 仍独立维护；模板里是它 1.1.1 的快照，之后由模板维护者按需要同步新版。
- 策划和美术技能来自 LumioGame（Apache-2.0），去掉了只适用于原项目的内容。

**需要手动处理**

- 无（首个版本）。
