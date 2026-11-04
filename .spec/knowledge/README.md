---
name: knowledge
description: 项目知识库导航——查"某事怎么做"(standards)、"某功能怎么设计的"(features)或 Lumio 平台事实时,从这里找到对应 .md
metadata:
  type: index
---

# Knowledge(项目知识库 · 导航)

本文件是 `knowledge/` 下所有 .md 的导航 meta:一行描述 + 路径,按需下钻。

## standards/(开发规范 · 要遵守的「怎么做」)

| 文档 | 一句话 |
|------|--------|
| [`standards/project-structure.md`](standards/project-structure.md) | 项目结构:有哪些模块、依赖方向、命名规则、新东西放哪——建目录、加文件、跨模块引用前查 |
| [`standards/workflow.md`](standards/workflow.md) | 开发工作流:分支/提交/合并·PR 与知识同步义务——动手改代码、开 PR 前查 |
| [`standards/code-style.md`](standards/code-style.md) | 代码与文档风格:语言约定、命名、注释原则、生成物纪律——写代码/建文档时查 |
| [`standards/testing.md`](standards/testing.md) | 测试与验收:SDD 和 TDD 两种模式的判据、测什么不测什么、什么时候跑、回归用例与验收——写计划、实现功能、修 bug 时查 |

## features/(功能设计与记录 · 供了解)

| 文档 | 一句话 |
|------|--------|
| [`features/_TEMPLATE.md`](features/_TEMPLATE.md) | 新功能文档模板——新增功能记录时照此建,放对 领域 / 模块 |

> 暂无正式功能文档。

## bug-wall(bug 墙)

| 文档 | 一句话 |
|------|--------|
| [`bug-wall.md`](bug-wall.md) | bug 墙:值得记的 bug 一条一行(现象、状态、归因)——记 bug 前用关键词 grep 查重,满 200 行或用户说时整理 |

## lumio-platform/(Lumio 平台事实 · 框架文件)

Lumio 平台的事实在 `lumio-platform/`：sdk（接 SDK）、publishing（打包发布）、lgui（用 LGUI 做界面）、web-project（不用 LGUI 的网页工程）、resources（官方链接）。
