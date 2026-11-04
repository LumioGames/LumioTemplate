# 更新记录

LumioTemplate 框架的版本记录。每个版本对应一个 tag（`vX.Y.Z`）。项目里说「更新框架」时，Agent 用 `lumio-update` 技能拉取最新 tag，把你当前版本之后的各节给你看；「需要手动处理」里的事项要按说明做。

本文件只属于模板：用模板初始化项目时，收尾会删掉它。

## v1.0.0（2026-11-04）

首个版本。

**框架内容**（框架文件清单见 `.spec/skills/lumio-update/SKILL.md`）

- 规则：`rules/system.md` 一份，四节——第一性原理、工作方式（SDD / TDD 两种模式，默认 SDD）、工程红线、安全 / 外发。结构检查只报告、不阻断，随计划合完在收口门槛里跑。
- 子 Agent：`agents/reviewer.md`，能读能跑命令、不改文件（`tools: Read, Grep, Glob, Bash`，不给 Edit / Write）。
- 11 个常驻技能：框架技能 writing-plans、subagent-driven-development、test-driven-development、systematic-debugging、spec-steward、lumio-update；策划技能 design-director、design-review；美术技能 art-director、art-prompt、art-review。
- 工具：`tools/spec-lint.mjs` 结构检查；`tools/lumio-pack.mjs` Lumio 打包；`tools/lgui-build-web.mjs` LGUI 网页构建（过渡脚本）。
- Lumio 平台知识：`knowledge/lumio-platform/`（SDK 2.11.1、`lumio.json` 与打包、LGUI、网页工程、资源地址）。
- 客户端发现方式：`CLAUDE.md` 的 `@import`、根目录 `AGENTS.md` 指路、三条软链（`.claude/skills`、`.claude/agents`、`.agents/skills`）。
- 一次性的 `lumio-init` 初始化技能（只在模板里，不随更新分发）。
- 许可：`LICENSE` 覆盖 LumioTemplate 的文件和它们在项目里的副本，逐项写明 MIT、Apache-2.0 的例外。初始化后它在 `.spec/LICENSE`，不随框架更新覆盖；根目录留给游戏自己的许可。

**发布前审查后的调整**（相对 PR #2 合入的初版）

删了：

- 常驻的 `rules/dispatch.md`（调度规程）。核心原则并进 `system.md`「工作方式」，并行、合入、交回、退回的细则压进 SDD 技能，宿主差异表删掉；每次会话常驻载入从约 23 KB 降到约 11.6 KB。
- 提交前钩子（`.claude/settings.json` + `guard-commit.mjs`）、按行数定审查级别的 `closeout-gate.mjs`、离线任务卡目录 `.spec/tasks/`（任务卡就是计划里的 `### Task N`）。
- 技能 brainstorming、design-doc、art-bible；SDD 里另两份审查合同，审查只派 `reviewer`；排障和 TDD 技能里的配套长文件（含层层兜底的 defense-in-depth）。
- `lumio-init` 的第二段「引导完善」；`lumio-update` 的「拉旧版逐个比对」。
- `.spec/AGENTS.md` 的技能名册和文件划分表、知识导航和 `CLAUDE.md` 里的维护说明。

改了：

- **SDD / TDD 两种开发模式**：写计划时先定走哪种，拿不准问用户。SDD 契约先行、并行、写完就合，合并前不跑测试，一个计划合完统一跑一次测试、审一次；TDD 测试先行，开发中只跑新写的测试。规则在 `system.md` 一句，测试政策和什么时候跑只写在 `standards/testing.md`，其余地方一句指过去。
- SDD、TDD、排障、writing-plans、spec-steward 重写成中文、站在做游戏的角度；策划和美术总监改成不预设品类和引擎的通用方法。
- 出图（art-prompt）以风格一致为核心：风格锚带版本、基准图库 `Art/baseline/`、每张图一份出图记录。
- Windows 软链不再自动修复：检出成普通文件就停下，请用户开开发者模式后用 `git clone -c core.symlinks=true` 重新克隆。
- Node 要求统一成「Node 24（24.18 以上的 24.x；Lumio SDK 不支持 25 及以上）」。
- 立项问题改成：名字和一句话、有没有服务端、发布到哪（可多选）、用什么引擎（按发布目标推荐，默认先用网页 + LGUI 做原型）、几个人做；文档语言默认跟用户说话的语言一致。`Builds/` 按发布目标分子目录，发到 Lumio 的叫 `lumio-platform/`。
- 两个 Lumio 工具留在 `.spec/tools/` 当框架文件，初始化不再移动或删除；初始化遇到中断按三种情况接着做，收尾每步做过就跳过；「待完善」都写明什么时候补。

新增了：

- `system.md`「第一性原理」（先删后加、宁可报错不要兜底、先找成熟方案）和「工作方式」。
- bug 墙 `knowledge/bug-wall.md`（替代 lessons），spec-steward 加「复盘」流程。
- 两份一页纸：项目一页纸 `knowledge/project.md`、美术一页纸 `knowledge/art/README.md`，细节按需跳转。
- `standards/project-structure.md`「工程内部按模块组织」；Unity 路线读不到仓根 `Config/` 时的默认做法；功能文档模板的「待验证项」「验收」两节。

**来源**

- 框架取自 LumioAgentSpec 1.1.1（提交 `8f93f82`），放进仓库使用：插件路径和命令改成仓库内写法，软链布局沿用 LumioAgentSpec 0.x。LumioAgentSpec 仍独立维护；模板里是它 1.1.1 的快照，之后由模板维护者按需要同步新版。
- 策划和美术技能来自 LumioGame（Apache-2.0），去掉了只适用于原项目的内容。

**需要手动处理**

- 无（首个版本）。
