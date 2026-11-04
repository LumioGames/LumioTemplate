---
name: spec-steward
description: 两种情况用：新增或修改知识文档、规则、子 Agent、项目技能，或做完一处改动要沉淀进 `.spec/` 时；用户说「复盘」「体检」「整理 bug 墙」时。
---

# Spec Steward（`.spec/` 管家）

两件事：改了 `.spec/` 的结构、或做完一处改动要沉淀时，放对位置、格式合规、登记同步；用户说「复盘」「体检」时，按下面「复盘」查一遍、出报告。

框架文件清单见 `lumio-update` 技能。框架文件项目不改：项目要不同的做法，写进项目文件（红线进 `rules/project.md`，做法进 `knowledge/standards/`，新方法另建项目技能，名字不要和模板自带的技能重名）；框架文件本身有问题，记进 `knowledge/bug-wall.md`（归因「框架」）并告诉用户。

## 放哪

| 内容 | 去处 | frontmatter |
| --- | --- | --- |
| 每次都要在场的硬规则（项目红线） | `.spec/rules/project.md` | 无 |
| 怎么做（流程、规范） | `.spec/knowledge/standards/` | `name` + `description` + `metadata`（type / status） |
| 某功能的设计 | `.spec/knowledge/features/<名称>.md`，照 `_TEMPLATE.md` 建；多了再按领域分子目录 | 同上 |
| 决策：为什么这样选、为什么不选别的 | `.spec/decisions/`（ADR，不改写、只新增取代，格式见其 `README.md`） | 无 |
| bug（值得记的） | `.spec/knowledge/bug-wall.md` 追加一行（规则见文件开头） | — |
| 职能角色（隔离本身就是价值的才设，现在只有 `reviewer`） | `.spec/agents/<name>.md`，照 `reviewer` 写 | `name` + `description` + `tools`（工具白名单；正文也写清能做什么，Codex 不读 frontmatter） |
| 可复用的方法 | `.spec/skills/<name>/SKILL.md`（目录名即技能名） | `name` + `description`（只写什么时候用，不概括流程） |

命名一律 kebab-case，文件名 / 目录名和 frontmatter 的 `name` 一致。`rules/` 只放每次都要在场的「必须 / 不得」；「怎么做」写进 `standards/` 或技能。

## 登记（漏一处就等于没有）

- 加 / 删知识文档 → 改 `.spec/knowledge/README.md` 的导航：一篇一行，和 frontmatter `description` 同一句话（是什么 + 何时查，≤120 字符），不写交付历史。
- 加 / 删 `rules/` 下的文件 → 根目录 `CLAUDE.md` 加 / 删一行 `@import`（漏了 Claude Code 就不会载入，spec-lint 会查），根目录 `AGENTS.md` 的必读清单同步。
- 加 / 删子 Agent，或项目技能进了默认流程 → 在 `.spec/AGENTS.md`「项目专属约定」写明什么时候用。技能经软链自动发现，不用另外登记。

## 沉淀（改动完成后）

1. 一句话：这次改了什么、为什么。
2. 按上面「放哪」落进去：流程规范改 `standards/`；功能设计改 `features/` 并流转 `status`（`设计中` → `实施中` → `已交付`，只写设计现状）；决策记 ADR；值得记的 bug 记进 bug 墙。
3. 正文只留当前有效的内容，历史在 git。`status` 只能取 `设计中` / `实施中` / `已交付` / `历史归档`。
4. **升格**：bug 墙里同类问题第三次出现，必须升进 `standards/`（先改写已有条款，不行才新增）；只有推错了就出事的，才进常驻的 `rules/project.md`。整批整理在「复盘」里做。
5. 要执行的事写进计划（`writing-plans`），不堆进知识库。纯修复、微调可以不沉淀，交付时说一声。

## 复盘

**什么时候**：用户说「复盘」「体检」「整理 bug 墙」时做；bug 墙满 200 行时，Agent 不再往里加，告诉用户「该复盘了」，用户同意再做。不定时。

**看三样**：

1. **对话**：读本项目最近几次会话日志——Claude Code 在 `~/.claude/projects/<项目路径把 / 换成 ->/` 下，Codex 在 `~/.codex/sessions/` 下。用关键词（「不对」「不要」「我说的是」「又」「说过」等）找用户纠正的地方，不通读全文；提炼用户偏好和反复踩的坑。
2. **bug 墙**（`knowledge/bug-wall.md`）：按「归因」分组——**实现**：修完即止；**设计遗漏**：补 `features/`，必要时记 ADR；**规范**：改 `standards/` 或 `rules/project.md`；**框架**：项目里不改。同类第三次出现的必须升格（先改写已有条款，不行才新增；默认进 `standards/`，只有推错了就出事的才进 `rules/project.md`）。顺带看能提炼出什么新规范。
3. **文档**：重复或互相矛盾的规则；现在已经能补的「待完善」；没进导航的文件；`CLAUDE.md` 加上它 `@import` 的全部文件一共多少字节。

**先出报告，用户同意后再改**：报告写发现了什么、建议改哪、改到哪。改的落点：

- 稳定、简短的用户偏好 → `.spec/AGENTS.md`「项目专属约定」。
- 踩坑和规范问题 → `standards/` 或 `rules/project.md`（按上面的升格规则）。
- 框架问题 → 整理成清单给用户，用户同意后去 LumioTemplate 提 issue。

改完后，bug 墙里已经落进文档的行删掉（结论已在规范里，历史在 git），只留未修的。

**日志只用来分析**：原文不抄进任何文档（可能含密钥、个人信息）。日志找不到或格式变了，直接告诉用户，不写兼容逻辑。

## 校验

- [ ] 跑过 `node .spec/tools/spec-lint.mjs`（检查项以脚本头注释为准；只报告不阻断，报出的问题修掉或记下）。
- [ ] 位置和命名对；没改框架文件。
- [ ] 导航、`CLAUDE.md` 的 `@import`、根目录 `AGENTS.md` 必读清单都已同步。
- [ ] 同一条规则只写在一处；删除后没有悬空引用。
