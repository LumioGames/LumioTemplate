---
name: workflow
description: 开发工作流——分支/提交/合并·PR 与知识同步义务;动手改代码、开 PR 前查
metadata:
  type: doc
  status: 已交付
---

# 开发工作流（分支 / 提交 / 合并）

> Agent 怎么协作看 `.spec/rules/system.md`「工作方式」，禁止项看 `.spec/rules/`；本文只讲分支、提交、合并。

## 分支策略

> 待完善（初始化时）：按「几个人做」填写（默认一个人）。一个人做：直接在 `main` 上提交，不开分支；多人做：每个需求从 `main` 拉一个分支，拆出来的子任务写完就合进这个需求的分支；这个分支往 `main` 的 PR 就是最后那一次统一审查（见 `.spec/rules/system.md`「工作方式」）。

## 存档（通用）

git 是必须的：存档、回到之前的存档、对比改动、多个 Agent 并行开发都靠它。跟用户只说结果（「存档了」「回到之前的存档」「看看改了什么」），不说提交、分支这些词（见 `.spec/rules/system.md`「工作方式」）。

- **什么时候存档**：每做完一件能单独回退的事就本地提交一次——一张卡合入、一处修复、一次框架更新、一次初始化。不用每次问用户；对外的同步（推送）才要问，见下面「备份到云端」。
- **缺署名**：不提前检查 `user.name` / `user.email`。提交真的因为缺署名失败（报错里有 `Please tell me who you are` 或 `user.email`）时，才请用户给一个名字和邮箱，例如：「第一次存档要一个署名，会记在每次存档里：给我一个名字和邮箱就行，用昵称也可以；以后备份到云端时别人能看到它。」用 `git config --local user.name "<名字>"`、`git config --local user.email "<邮箱>"` 写进本项目（不改全局配置），再提交一次。

## 提交规范（通用）

- 格式：`type(scope): subject`，例如 `feat(client): 新增主菜单`、`fix(config): 修正关卡表字段`。
- 常用 type：`feat` / `fix` / `refactor` / `chore` / `docs` / `ci`。scope 可省略，常用模块名（`client` / `config` / `server` / `art` / `tools`）或 `spec`。
- **一次提交只做一类事**；文档、脚手架、功能、测试修复不混在一起。
- 提交前跑不跑测试、什么时候跑，见 `testing.md`「什么时候跑」。
- 提交前自检：无调试残留、知识已同步（见下节）。

## 合并 / PR 流程

> 待完善（初始化时）：按「几个人做」填写。一个人做：不走 PR，提交前自检即可；多人做：子任务直接合进需求分支，不单独开 PR；需求分支往 `main` 的 PR 就是统一跑测试、审一次的那一次，PR 写清改动、验证证据和没测的部分，至少一人看过再合并，合并方式默认 squash。对外发布动作（推送、公开 PR）先问用户，见 `rules/system.md`。

## 备份到云端（可选）

默认只在本地，不需要 GitHub；发布到 Lumio 也不需要。用户说想备份到云端、或者要和别人一起做时再建：

- 用户有 GitHub 账号时，在用户同意后用 `gh repo create <名字> --private --source . --remote origin` 建仓库（公开还是私有问用户，默认私有），或者请用户给一个已经建好的仓库地址再 `git remote add origin <地址>`；没有账号就请用户先注册。
- 每次推送（`git push`）前都先问用户，跟用户说「同步到云端」。
- 要和别人一起做：按多人改写上面的「分支策略」「合并 / PR 流程」。

## 改动完成 = 知识已同步

一处改动只有在**知识沉淀完成**后才算 Done：用 `spec-steward` 技能更新对应 `knowledge/` 文档、`status` 与 `knowledge/README.md` 导航（交付历史在 git，不进文档）。豁免口径与 `.spec/rules/system.md`「工作方式·改完沉淀」一致：纯修复 / 机械套用既有模式可豁免，但**豁免必须在交回物里声明**，不得静默跳过。

## 相关

- 验收与测试：[`testing.md`](./testing.md)
- 注释与命名：[`code-style.md`](./code-style.md)
- 目录与模块：[`project-structure.md`](./project-structure.md)
- 护栏（禁止项）：`.spec/rules/system.md`、`.spec/rules/project.md`
- 沉淀方法：`spec-steward` 技能
