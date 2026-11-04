---
name: workflow
description: 开发工作流——分支/提交/合并·PR 与知识同步义务;动手改代码、开 PR 前查
metadata:
  type: doc
  status: 已交付
---

# 开发工作流（分支 / 提交 / 合并）

> 本文是“开发这件事**怎么做**”的手册。Agent 之间**怎么协作**（拆解 → 实现 → reviewer 对抗审查 → 收口）在 `.spec/rules/dispatch.md` 的「调度核心」与「编码约定」里，不在这里。
> “禁止碰什么”的硬性护栏在 `.spec/rules/system.md`（通用）与 `.spec/rules/project.md`（本项目）；本文只描述流程，遇到护栏处**引用**它，不重复定义。

## 分支策略

> 待完善：初始化时按「几个人做」填写。一个人做：直接在 `main` 上提交；多人做：从 `main` 拉功能分支，经 PR 合入。

## 提交规范（通用）

- 格式：`type(scope): subject`，例如 `feat(client): 新增主菜单`、`fix(config): 修正关卡表字段`。
- 常用 type：`feat` / `fix` / `refactor` / `chore` / `docs` / `ci`。scope 可省略，常用模块名（`client` / `config` / `server` / `art` / `tools`）或 `spec`。
- **一次提交只做一类事**；文档、脚手架、功能、测试修复不混在一起。
- 提交前自检：验证命令跑过（见 `AGENTS.md`「收口门槛」与 `rules/system.md`）、无调试残留、知识已同步（见下节）。

## 合并 / PR 流程

> 待完善：初始化时按「几个人做」填写。一个人做：不走 PR，提交前自检即可；多人做：PR 写清改动、验证证据和没测的部分，至少一人看过再合并，合并方式默认 squash。对外发布动作（推送、公开 PR）先问用户，见 `rules/system.md`。

## 怎么派 Agent

> 待完善：默认按 `.spec/rules/dispatch.md` 走（创造性工作先出设计，多步功能用 `writing-plans` 写计划，再用 `subagent-driven-development` 派活，合入后 `reviewer` 审一次）。本项目有额外约定（例如哪些模块必须深审）时写在这里。

## 改动完成 = 知识已同步

一处改动只有在**知识沉淀完成**后才算 Done：用 `spec-steward` 技能更新对应 `knowledge/` 文档、`status` 与 `knowledge/README.md` 导航（交付历史在 git，不进文档）。豁免口径与 `.spec/rules/dispatch.md`「编码约定·改完沉淀」一致：纯修复 / 机械套用既有模式可豁免，但**豁免必须在交回物里声明**，不得静默跳过。

## 相关

- 验收与测试：[`testing.md`](./testing.md)
- 注释与命名：[`code-style.md`](./code-style.md)
- 目录与模块：[`project-structure.md`](./project-structure.md)
- 护栏（禁止项）：`.spec/rules/system.md`、`.spec/rules/project.md`
- 沉淀方法：`spec-steward` 技能
