---
name: code-style
description: 代码与文档风格——语言约定、命名、注释原则、生成物纪律;写代码/建文档时查
metadata:
  type: doc
  status: 已交付
---

# 代码与文档风格

> 能交给工具（formatter / linter）强制的，优先交给工具；本文只写工具管不了、需要人 / Agent 判断的部分。

## 文档与注释的语言

> 待完善：初始化时按立项答案填写（中文或英文）。默认：`.spec/` 下的项目文件、各模块 README 和代码注释都用中文。

- 框架文件（`rules/system.md`、`rules/dispatch.md`、`skills/` 里模板自带的技能等）保持原样，不跟着改语言；其中部分技能文档是英文。
- knowledge 文档的 `metadata.status` 只能取 `设计中` / `实施中` / `已交付` / `历史归档`——这是 `spec-lint` 内置的枚举，用英文写文档时也保持这四个中文值。

## 文件命名（通用）

- `.spec/` 下的文档与目录命名一律 **kebab-case**；ADR 用 `NNNN-<slug>.md`；agent 与 skill 的命名约定见 `spec-steward` 技能。
- 顶层模块目录用大写开头（`Client/`、`Config/`……），见 [`project-structure.md`](./project-structure.md)；模块里面的文件按该模块所用引擎或语言的惯例命名，写在各模块 README 里。

## 注释原则（通用）

- 注释只写**代码表达不了的约束**（为什么这样做、边界条件、外部依赖的坑）。
- 不写「改动说明」式注释（改了什么、为什么正确）——那是给评审人的话，进交回物或提交信息，不进代码。
- 注释密度、命名、习语向**周边既有代码**看齐。

## 生成物纪律（通用）

- 生成物不得手改，只能经生成源与生成命令更新，并与生成源一起提交（红线见 `.spec/rules/system.md`）。

## 语言 / 框架特定风格

> 待完善：初始化时按技术路线写默认值，建工程时补上 formatter / linter 的配置位置。例：网页路线用 TypeScript 严格模式（`strict: true`），界面用 LGUI 时遵守 LGUI 工程自带的 `AGENTS.md`；Unity 路线用 C#，遵守 Unity 官方命名惯例。
