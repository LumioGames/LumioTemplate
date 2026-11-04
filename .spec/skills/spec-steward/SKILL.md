---
name: spec-steward
description: 维护项目 `.spec/` 的结构并把改动沉淀进知识库——放对位置（框架文件 vs 项目文件）、校验 frontmatter、同步索引与名册、更新状态。当新增或修改 Agent、Skill、知识或规则，或完成一处改动后需要沉淀时使用。
---

# Spec Steward（仓库管家）

保证任何结构改动都「放对位置、格式合规、索引与名册同步」，并在开发完成后把「改了什么、为什么」沉淀回知识库。
本技能**不复述**那些规矩（权威在 `.spec/rules/dispatch.md` 与 `.spec/knowledge/README.md`），只在改动发生时把规矩**用起来**，并指回对应处。

**先分清两类文件**——划分以 `.spec/AGENTS.md`「框架文件和项目文件」一节为准：

| 类别 | 包含 | 规则 |
|------|------|------|
| **框架文件** | `LICENSE`（模板的许可条款）、`rules/system.md`、`rules/dispatch.md`、`agents/`、`skills/` 里模板自带的技能（含 `lumio-update`）、`tools/`、`knowledge/lumio-platform/`；逐个路径的清单在 `lumio-update` 技能里 | 项目不改；以后随模板更新，按文件或按技能文件夹整份覆盖 |
| **项目文件** | `AGENTS.md`、`rules/project.md`、`knowledge/` 里除 `lumio-platform/` 以外的部分、`decisions/`、`plans/`、项目自己加的技能 | 归项目所有，初始化时生成，之后由项目维护 |

判据:**这处改动要落在框架文件里吗?** 要 → 不改框架文件，把项目自己的版本写进项目文件（红线进 `rules/project.md`，做法进 `knowledge/standards/`，新方法另建项目技能）；框架文件本身有问题，记进 `knowledge/lessons.md` 或告诉用户，等模板更新。

## 何时使用

- 新增 / 修改 / 删除一个子 Agent、Skill、知识文档或规则时。
- 完成一处代码 / 设计改动后，要把它沉淀进 `knowledge/` 时。
- 不确定某份内容该放哪（rules / standards / features / agents / skills）时。

## 前置条件

- 能随时查阅 `.spec/rules/dispatch.md`（调度核心、宿主差异）与 `.spec/knowledge/README.md`（知识导航）——本技能指回它们，不重复。
- 改动目标明确（知道要加 / 改 / 删什么）。

## 操作步骤

### 流程 A · 维护结构（新增 / 修改 / 删除能力）

1. **判类型**——这份内容属于哪一类：
   - 禁止碰什么（护栏）→ 项目红线写进 `.spec/rules/project.md`（无 frontmatter）；`rules/system.md` 是框架文件，不改。另立规则文件时，必须在根目录 `CLAUDE.md` 加一行 `@import`，否则 Claude Code 不会载入（spec-lint 检查）
   - 怎么做（流程 / 规范）→ `.spec/knowledge/standards/`
   - 某功能的设计 / 记录 → `.spec/knowledge/features/<领域>/…`
   - 一个职能角色 → `.spec/agents/`（先过 `rules/dispatch.md` 的准入门槛「隔离本身即是产出价值」，再照 `reviewer` 范例写，正文承载判断；frontmatter 见下面第 3 步，禁令见 `rules/system.md`）
   - 可复用方法 → 项目技能 `.spec/skills/<name>/SKILL.md`（目录名即 skill 名；description 只写触发条件、不概括流程——概括流程的 description 会让 agent 照描述走捷径、跳过正文）。名字不要和模板自带的技能重名，以免模板更新时被覆盖
2. **放对位置 + 命名**（agent 文件 `agents/<name>.md`、skill 目录 `skills/<name>/`；均 kebab、全局唯一，且目录 / 文件名与 frontmatter `name` 一致）。
3. **写 frontmatter**：
   - agents：仅 `name` + `description`
   - skills：必含 `name` + `description`；跨客户端可移植性所需的 Agent Skills 标准可选字段（`license` / `allowed-tools` / `metadata` / `version`）允许出现，其余键不要加
   - knowledge：`name` + `description` + `metadata`（type / status）
   - rules：**无** frontmatter
4. **同步登记**（漏一处，能力就隐身）：
   - 加 / 删子 Agent → 在 `.spec/AGENTS.md` 登记名册，并说明 Codex 等没有子 Agent 的客户端怎么降级（`rules/dispatch.md` 是框架文件，不改）
   - 加 / 删 skill → 更新 `.spec/AGENTS.md` 技能名册；若进入默认流程，在 `.spec/AGENTS.md`「项目专属约定」写明
   - 加 / 删知识文档 → 更新 `.spec/knowledge/README.md` 文件导航
   - 加 / 删 `rules/` 下的文件 → 同步根目录 `CLAUDE.md` 的 `@import` 行与根目录 `AGENTS.md` 的必读清单

### 流程 B · 沉淀知识（改动完成后）

1. 一句话总结：这次改了什么、为什么。
2. 判断文档归属：
   - 影响**开发流程 / 规范**（workflow / 测试策略 / 代码风格等）→ 更新 `knowledge/standards/` 对应文件。
   - 影响**功能设计**（新功能、行为变更）→ 更新 `knowledge/features/` 对应文档并流转 `status`（feature 文档在设计期直接建立、`设计中` 起步，交付时改 `已交付`；确无文档才从 `_TEMPLATE.md` 补建）——只写设计现状，不留决策记录，无二次搬运。
   - **决策**（功能内与框架级都算：为什么这样调度 / 选型 / 划边界）→ `.spec/decisions/` 新增 ADR（**唯一落点**，见其 `README.md`）。
   - **复发问题 / 踩坑经验**（reviewer 退回报告、known gaps 中第二次出现的同类问题）→ 追加进 `.spec/knowledge/lessons.md`（收录准入与条目格式见该文档）。
3. 更新正文——**只保留当前有效内容**，交付历史不入库（git 提交即历史）。
4. frontmatter `status` 只能取枚举：`设计中` / `实施中` / `已交付` / `历史归档`；`description` 保持一句话（是什么 + 何时查，≤120 字符，spec-lint 检查），**不得**把交付历史写进 description / status。
5. `.spec/knowledge/README.md` 导航行**来源于** frontmatter `description`：同一句话口径，允许排版差异，但不得出现 description 没有的事实、不含交付历史（行文一致性靠本步骤自觉，spec-lint 只机械校验长度 / 枚举 / 覆盖 / 链接）——导航行是 Agent 决定「要不要翻开这份文档」的唯一依据，含糊或膨胀都会让判断失准。
6. 待执行的事走任务卡（拆解用 `writing-plans` 浅拆模式），**别堆进知识库**。

### 流程 D · 框架文件更新（模板 → 项目）

- 用户说「更新框架」时用 `lumio-update` 技能：它写着当前框架版本和框架文件清单，按 LumioTemplate 最新 tag 只覆盖清单里的路径，本地改过的先给用户看差异再问。本技能不另写一套更新流程。
- 项目文件不随模板覆盖。新版模板新增的项目文件骨架（例如新的规范模板），对照着手工补进项目。

## 快速参考

| 内容 | 去处 | frontmatter |
|------|------|-------------|
| 禁止碰 / 改 / 提交某物（项目红线） | `.spec/rules/project.md` | 无 |
| 怎么开发（流程 / 规范） | `.spec/knowledge/standards/` | 有 |
| 某功能的设计 / 记录 | `.spec/knowledge/features/…` | 有 |
| 决策（功能内 / 框架级，唯一落点） | `.spec/decisions/`（ADR） | 无（见其 README 模板） |
| 复发问题 / 踩坑经验 | `.spec/knowledge/lessons.md` | 有 |
| 职能角色 | `.spec/agents/` | 仅 name+description |
| 可复用方法 | `.spec/skills/<name>/SKILL.md` | name+description（+ 标准可选字段）|

## 注意事项（Pitfalls）

- **不抄 SPEC，只指回它**——同一规则只在一处定义（单一权威）。
- **索引漂移 = 知识隐身**：新增 / 删除文档必须同步更新 `.spec/knowledge/README.md`，否则 Agent 发现不了。
- **导航行要精简**：Claude Code 每次会话经 `CLAUDE.md` 强制载入 `.spec/AGENTS.md`、`knowledge/README.md` 和 `rules/` 下各文件，其余文档靠导航按需下钻。导航行是 Agent 判断「该不该翻这份文档」的唯一依据；历史在 git，不进正文 / 导航行 / description / status。
- **rules 管禁止，standards 管怎么做**，别混。
- **框架文件不改**：项目内容写进框架文件，下次模板更新覆盖时就会丢；项目要不同的做法，写进项目文件。
- 本技能是**被拉取**的：「每次改完都更新知识」这条**义务**靠 `workflow.md` 与 `rules/dispatch.md`「编码约定」的交付标准保证，不靠本技能自觉。

## 验证

- [ ] `node .spec/tools/spec-lint.mjs` 已跑（完整校验项清单以脚本头部注释为准；只报告不阻断，报出的问题要修或记下）。
- [ ] 内容在正确目录、命名合规；没有改框架文件。
- [ ] `.spec/AGENTS.md` 的技能名册、子 Agent 名册与实际一致；`CLAUDE.md` 的 `@import` 覆盖 `rules/` 下全部文件。
- [ ] knowledge 文档 `status` 与现状一致；正文只含当前有效内容，无历史堆积。
- [ ] 没有把任何规矩复制进多处。
- [ ] 删除操作：无悬空引用残留。
