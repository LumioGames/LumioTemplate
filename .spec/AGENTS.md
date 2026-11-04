# 项目中心文档

状态：未初始化

> 未初始化时，Agent 先按 [`skills/lumio-init/SKILL.md`](skills/lumio-init/SKILL.md) 带用户初始化：问几个立项问题，生成模块目录、README 和规范，再问要不要接着聊玩法、美术。初始化结束时删掉 `skills/lumio-init/` 和这段提示，把上面的状态改成「已初始化」。

本文件只写本项目独有的东西：项目是什么、模块、收口门槛。工作方式和通用红线在 [`rules/system.md`](rules/system.md)，本项目的红线在 [`rules/project.md`](rules/project.md)，这里不复述。框架文件清单见 [`skills/lumio-update/SKILL.md`](skills/lumio-update/SKILL.md)。

## 项目是什么

（初始化时填写：暂定名、一句话说明、技术路线、是否有自己的服务端、是否发布到 Lumio、几个人做、文档语言。）

## 模块

（初始化时填写：顶层模块和各自的 README。划分规则见 `knowledge/standards/project-structure.md`。）

## 收口门槛

一个计划全部合完以后统一跑的命令（spec-lint 只提示、不挡交付，规则见 `rules/system.md`「工程红线」）。初始只有结构检查；建好工程后，把构建和测试命令补在这里。

```bash
node .spec/tools/spec-lint.mjs
```

## 项目专属约定

（可选。只写与 `rules/system.md`「工作方式」「不同」或「更严」的部分，相同的不要复制过来。）
