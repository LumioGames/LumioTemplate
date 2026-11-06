---
name: code-style
description: 代码与文档风格——语言约定、命名、注释原则、生成物表(哪些提交、哪些能手改);写代码/建文档时查
metadata:
  type: doc
  status: 已交付
---

# 代码与文档风格

> 能交给工具（formatter / linter）强制的，优先交给工具；本文只写工具管不了、需要人 / Agent 判断的部分。

## 文档与注释的语言

> 待完善（初始化时）：默认跟用户说话的语言一致，`.spec/` 下的项目文件、各模块 README 和代码注释都用这一种。要文档和注释用不同语言，在这里分开写明。

- 框架文件（`rules/system.md`、`skills/` 里模板自带的技能等）保持原样，不跟着改语言。
- knowledge 文档的 `metadata.status` 只能取 `设计中` / `实施中` / `已交付` / `历史归档`——这是 `spec-lint` 内置的枚举，用英文写文档时也保持这四个中文值。

## 文件命名（通用）

- `.spec/` 下的文档与目录命名一律 **kebab-case**；ADR 用 `NNNN-<slug>.md`；agent 与 skill 的命名约定见 `spec-steward` 技能。
- 顶层模块目录用大写开头（`Client/`、`Config/`……），见 [`project-structure.md`](./project-structure.md)；模块里面的文件按该模块所用引擎或语言的惯例命名，写在各模块 README 里。

## 注释原则（通用）

- 注释只写**代码表达不了的约束**（为什么这样做、边界条件、外部依赖的坑）。
- 不写「改动说明」式注释（改了什么、为什么正确）——那是给评审人的话，进交回物或提交信息，不进代码。
- 注释密度、命名、习语向**周边既有代码**看齐。

## 生成物

生成物不得手改，只能经生成源与生成命令更新（红线见 `.spec/rules/system.md`）。按提不提交分三类——不能一概提交，也不能擅自搬动或清理工具的缓存目录：

| 类 | 是什么 | 提交 |
| --- | --- | --- |
| 受版本管理的生成物 | 命令从生成源生成、工程要靠它运行或交付的文件 | 和生成源一起提交 |
| 工具缓存 | 工具自己管理的中间文件，删了能重新生成 | 不提交（在 `.gitignore` 里） |
| 构建产物 | 构建和打包的输出，用来试玩、验收、发布 | 不提交，正式产物放 `Builds/<目标>/` |

本项目的生成物如下表。建工程、加工具、加导出脚本时补一行；「权威源」就是要改时该改的地方。拿不准一个文件是不是生成物（比如界面 XML 可能是手写的，也可能是工具生成的），看它由哪条命令写出来，不按扩展名猜。

| 路径 | 类 | 权威源 | 生成命令 | 能否手改 | 是否提交 |
| --- | --- | --- | --- | --- | --- |
| `Client/app/.lgui/framework/` | 受版本管理的生成物 | 已装的 LGUI 插件 | `lgui init`、`lgui upgrade` | 不能；框架有问题报给 LGUI | 提交 |
| `Client/app/.lgui/project.json` | 不是生成物（工程配置） | 它自己 | — | 能 | 提交 |
| `Client/app/ui/assets/<包>/` 里拆出来的图，和 `package.xml` 里对应的登记 | 受版本管理的生成物 | `Client/app/ui/art-src/` 里的原图和拆图参数 | `lgui art cut`、`lgui art split` | 不能；改原图或参数重新拆，否则下次拆图会盖掉 | 提交 |
| `Client/app/.lgui/build/`（类型、预览、headless、测试、`verify/` 截图、`art/` 拆图检查图） | 工具缓存 | `ui/`、`src/`、`i18n/` | `lgui dev`、`test`、`verify`、`art cut` 自动写 | 不能；验收截图从这里看，不搬走 | 不提交 |
| `Client/app/dist/` | 构建产物 | 工程源码 | `npm run build` | 不能 | 不提交 |
| `Client/unity/` 里 LGUI 导出的界面和代码（Unity 路线） | 受版本管理的生成物 | `Client/app/` | `lgui unity export` | 不能；改 `app/` 再导出 | 提交 |
| `Client/unity/Assets/StreamingAssets/Config/`（Unity 路线） | 受版本管理的生成物 | `Config/` | `Tools/` 里的导出脚本 | 不能；改 `Config/` 再导出 | 提交 |
| `Builds/<目标>/` | 构建产物 | 工程源码 | 打包命令（如 `npm run pack`） | 不能 | 不提交，只有 `Builds/README.md` 提交 |
| `node_modules/` | 工具缓存 | `package.json` 和锁文件 | `npm install` | 不能 | 不提交 |

## 语言 / 框架特定风格

> 待完善（建工程时）：初始化时先按技术路线写默认值，建工程时补上 formatter / linter 的配置位置。例：网页路线用 TypeScript 严格模式（`strict: true`），界面用 LGUI 时遵守 LGUI 工程自带的 `AGENTS.md`；Unity 路线用 C#，遵守 Unity 官方命名惯例。
