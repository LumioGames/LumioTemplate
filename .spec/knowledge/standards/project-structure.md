---
name: project-structure
description: 项目结构——有哪些模块、依赖方向、命名规则、新东西放哪;建目录、加文件、跨模块引用前查
metadata:
  type: doc
  status: 已交付
---

# 项目结构

仓库根目录放顶层模块、`.spec/`（规范）和入口文件（`AGENTS.md`、`CLAUDE.md`、`README.md`）。顶层模块目录用大写开头，每个模块一份 `README.md`，写明职责、放什么、依赖谁、不准做什么。模块内部的规则写在该模块的 README 里；跨模块的规则写在本文和 `.spec/rules/project.md`，同一条规则只写一处。

## 模块

> 待完善：初始化时按立项答案生成本项目的模块表（每个模块一行：放什么、README 链接）。

可选的模块：

| 模块 | 放什么 | 什么时候有 |
| --- | --- | --- |
| `Client/` | 客户端工程，里面建什么由技术路线决定 | 一直有 |
| `Config/` | 通用配表（策划数值、道具、关卡）、通用配置；有 `Server/` 时还放客户端和服务端之间的协议、存档格式、错误码。各个工程自己的工具配置（vite、tsconfig 等）不放这里 | 一直有 |
| `Server/` | 项目自己写的服务端代码：联机对战逻辑、自建后台。只用平台的存档、排行榜不算 | 只在有自己的服务端代码时有 |
| `Art/` | 美术源文件：风格探索、参考图、出图提示词、可编辑源文件、资产清单 | 一直有 |
| `Tools/` | 开发工具：打包、检查、数据转换 | 一直有 |
| `Builds/` | 构建产物，按目标分子目录（`web/`、`lumio/`、`playtest/`）；只有 `README.md` 进 git | 一直有 |

## 依赖方向

```
Config  ←  Client
Config  ←  Server
Tools   →  （读写各模块的文件，但产品代码不引用它）
```

- `Config` 不依赖任何模块。
- `Client` 和 `Server` 可以读 `Config`，反过来不行；`Client` 和 `Server` 之间只通过 `Config` 里的协议对齐，不互相引用代码。
- 产品代码（`Client`、`Server`）不引用 `Tools`。
- 对应的红线见 `.spec/rules/project.md`。

## 命名规则

- 顶层模块目录大写开头（`Client/`、`Config/`……）；模块下的子目录和文件按该模块所用引擎或语言的惯例命名，写在模块 README 里。
- `.spec/` 下的命名见 [`code-style.md`](./code-style.md)。

## 新东西放哪

| 要放的东西 | 去哪 |
| --- | --- |
| 客户端代码、界面、客户端资源 | `Client/` 下的工程里 |
| 数值表、道具表、关卡表 | `Config/` |
| 客户端和服务端共用的消息格式、存档格式、错误码 | `Config/`（有 `Server/` 时） |
| 美术源文件、参考图、出图提示词 | `Art/` |
| 打包脚本、检查脚本、数据转换脚本 | `Tools/` |
| 构建出来的东西 | `Builds/<目标>/`，不进 git |
| 玩法和功能设计 | `.spec/knowledge/features/` |
| 规范、约定 | `.spec/knowledge/standards/` |
| 为什么这样定 | `.spec/decisions/`（ADR） |

不确定时先问用户，定下来后补进本表。
