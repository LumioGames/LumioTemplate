---
name: lumio-init
description: 当 `.spec/AGENTS.md` 写着「状态：未初始化」，或用户在本仓库里说「开始」「帮我初始化这个项目」「继续初始化」时使用。一次性技能，初始化结束时连同文件夹一起删除。
---

# lumio-init（一次性初始化）

带用户把 LumioTemplate 变成用户自己的游戏项目：一次整理好**目录结构和规范**。分两段：生成骨架、收尾。生成完问一句要不要接着聊玩法 / 美术。

- **不写游戏代码、不建工程、不装依赖、不构建打包、不定 MVP。** 这些是初始化之后的下一步，收尾时告诉用户。
- 用户可能不写代码：用用户的语言说明每一步在做什么、为什么。
- 任何一步失败就停下，把错误原文告诉用户；不跳过、不编造成功。
- 只把用户拍板（或明确交给你定）的内容写成结论；没聊到的地方标「待完善（什么时候补）」，例如「待完善（建工程时）」「待完善（定玩法时）」「待完善（首批资产时）」，让用户看得懂哪些现在补不了。

本文件夹里的其他文件：

- [questions.md](questions.md)：第一段的 5 个立项问题，每题的例子、默认值和复述模板。
- `skeleton/`：第一段的生成模板（见下面「模板写法」）。

## 三种开场

- **客户端自动载入了**：用户在项目文件夹里开对话说「开始」，Claude Code 已经经 `CLAUDE.md` 载入核心文档、经软链发现了技能。直接往下做。Codex 等客户端：先读根目录 `AGENTS.md` 列的文件，再往下做。
- **你主动读文件开始的**：你刚在这次对话里把模板克隆进当前文件夹（README「给 Agent」那一节的第 2 步），客户端没有载入 `CLAUDE.md`，也没有发现技能。这不是错误，不用开新对话：先读根目录 `AGENTS.md` 和它列出的文件，再往下做；要用到别的技能（design-director、art-director 等）时，直接读 `.spec/skills/<技能名>/SKILL.md`。
- **文件夹已经是模板的 clone，用户直接说「开始」**：客户端可能载入了 `CLAUDE.md`、也可能没有。不管哪种，都先读根目录 `AGENTS.md` 和它列出的文件，再往下做。

## 先判断做到哪了

用第一段**最后写**的那个文件 `.spec/decisions/0001-project-structure.md`（ADR 0001，见第 3 步）判断：

- ADR 0001 不在：第一段没做完，从第 0 步重来，已经生成的文件按模板直接覆盖。
- ADR 0001 在、`.spec/AGENTS.md` 仍写「未初始化」：跑完第 0 步，先补问一句「要不要现在聊玩法 / 美术」，再进第二段（收尾）。
- `.spec/AGENTS.md` 已是「已初始化」、但本技能还在：收尾最后一步没做完，告诉用户，只把「删掉本技能」这一步做掉。

## 第 0 步：检查环境

1. **三条软链。** `.claude/skills`、`.claude/agents`、`.agents/skills` 必须是指向 `.spec/` 下对应目录的链接，客户端靠它们找到技能和审查子 Agent。这一步只检查磁盘上的链接对不对；这次对话里客户端有没有列出这些技能不影响结果（见上面「三种开场」）。
   - macOS / Linux / Git Bash：`ls -la .claude .agents` 应看到 `skills -> ../.spec/skills`、`agents -> ../.spec/agents`；`ls .claude/skills/ .agents/skills/` 能列出技能文件夹。
   - Windows PowerShell：`Get-Item .claude\skills, .claude\agents, .agents\skills | Format-List FullName, LinkType, Target`，`LinkType` 应是 `SymbolicLink`。
   - 如果它们是普通文件（打开只有一行 `../.spec/skills` 这样的文字），不要修复，停下，对用户说这段原话：

     「这个文件夹里的三条软链（`.claude/skills`、`.claude/agents`、`.agents/skills`）被检出成了普通文件，Claude Code 和 Codex 会找不到技能和审查子 Agent，初始化先停在这里。请在 Windows 设置里打开开发者模式（设置 → 系统 → 开发者选项），然后换一个空文件夹，用 `git clone -c core.symlinks=true https://github.com/LumioGames/LumioTemplate <文件夹名>` 重新克隆，在新文件夹里开一个新对话，说「开始」。」
2. **Git 和 Node。** `git --version`；`node -v` 要是 Node 26 LTS（Lumio SDK 支持 24.18 到 26.x，27 及以上不支持）。结构检查用 Node，以后建网页工程、用 LGUI 和 Lumio SDK 也要它。缺哪个就告诉用户装什么、去哪下载（Git：https://git-scm.com/downloads ；Node：https://nodejs.org ，选 26 LTS），用户装好后再检查一遍。**不替用户安装系统软件。**
3. **Git 身份。** `git config user.name` 和 `git config user.email` 都要有输出（收尾时要提交一次）。没设就告诉用户这两条命令，请用户填上自己的名字和邮箱后跑，然后停下，等用户设好再继续：

   ```bash
   git config --global user.name "你的名字"
   git config --global user.email "你的邮箱"
   ```

## 第一段：立项问答与生成骨架

### 1. 问

按 [questions.md](questions.md) 一轮问完 5 个问题，每题带例子和默认值。用户说「你定」，就按默认值替他选，并在生成的文件里那一处标上「Agent 代定，可以改」。问完按 questions.md 的复述模板复述一遍，用户确认后再往下。

### 2. 画目录树，用户确认后再生成

按答案把要生成的目录树画给用户看，只列顶层模块和会新建或改写的文件。例如「单机、发布到 Lumio、网页 + LGUI」：

```
<项目>/
├─ Client/README.md          客户端：网页，以后在 Client/app 建 LGUI 工程
├─ Config/README.md          配表和通用配置
├─ Art/README.md             美术源文件
├─ Tools/README.md           开发工具（Lumio 打包和 LGUI 网页构建工具在 .spec/tools/）
├─ Builds/README.md          构建产物，按发布目标分子目录（这里是 lumio-platform/），只有 README 进 git
└─ .spec/                    补全：项目中心文档、项目红线、3 份规范（项目结构、工作流、代码风格）、ADR 0001、项目一页纸、美术一页纸
```

有自己的服务端时多一行 `Server/README.md`。用户要改（比如加一个模块），先改树，再生成。

### 3. 生成

一次生成下表全部内容，再就地补全下面第二张表里的已有文件；**ADR 0001 最后写**（中断后靠它判断第一段做没做完）。所有文件都写好默认内容；还没跟用户确认的地方，保留或写上「待完善（什么时候补）」。

| 生成到 | 来源 | 什么时候 |
| --- | --- | --- |
| `Client/README.md` | `skeleton/modules/client-web.md`、`client-unity.md`、`client-ue.md`、`client-other.md` 按技术路线选一份 | 一直 |
| `Config/README.md` | `skeleton/modules/config.md` | 一直 |
| `Server/README.md` | `skeleton/modules/server.md` | 只在有自己的服务端代码时 |
| `Art/README.md` | `skeleton/modules/art.md` | 一直 |
| `Tools/README.md` | `skeleton/modules/tools.md` | 一直 |
| `Builds/README.md` | `skeleton/modules/builds.md` | 一直 |
| `.spec/rules/project.md` | `skeleton/project-rules.md`（整份覆盖占位文件） | 一直 |
| `.spec/knowledge/project.md` | `skeleton/project.md`（项目一页纸） | 一直 |
| `.spec/knowledge/art/README.md` | `skeleton/art-readme.md`（美术一页纸） | 一直 |
| `.spec/decisions/0001-project-structure.md` | `skeleton/adr-001.md` | 一直，**最后写**（就地补全也做完之后）；在 `.spec/decisions/README.md` 的索引表里把「空」那一行换成这一条 |

还要就地补全这些已有文件：

| 文件 | 怎么补 |
| --- | --- |
| `.spec/AGENTS.md` | 「项目是什么」写四行摘要（一句话、发布目标、引擎和界面、有没有自己的服务端），末尾一句「以 `knowledge/project.md` 为准」；填「模块」（每个模块一行：放什么 + 指向它的 README）。「收口门槛」保持只有 spec-lint。状态这时不改，第二段才改 |
| `.spec/knowledge/standards/project-structure.md` | 「模块」一节只把那条「待完善（初始化时）」换成本项目的模块表，下面「可选的模块」那张表保留；没有 `Server/` 时，依赖方向和「新东西放哪」里删掉 Server 和协议相关的内容 |
| `.spec/knowledge/standards/workflow.md` | 按人数填「分支策略」「合并 / PR 流程」，删掉这两节的「待完善」 |
| `.spec/knowledge/standards/code-style.md` | 「文档与注释的语言」写成 `{{语言}}`（跟用户说话的语言一致；用户要文档和注释用不同语言就分开写），删掉这一节的「待完善」；「语言 / 框架特定风格」写上本路线的默认值，保留「待完善」 |
| `.spec/knowledge/standards/testing.md` | 不改，「项目测试栈与命令」的「待完善（建工程时）」留到建工程时 |
| `.spec/knowledge/README.md` | 在 standards 一节前加一节「一页纸（先看这里）」，两行：`[project.md](project.md)` 项目一页纸——是什么、技术、美术一句话、范围，开工和讨论玩法前先看；`[art/README.md](art/README.md)` 美术一页纸——风格、色板、UI 基调和各块细节，出图、做资产、审美术稿前先看。「暂无正式功能文档」那行保留（还没有功能文档） |

`.spec/tools/` 里的 `lumio-pack.mjs`、`lgui-build-web.mjs` 是框架文件，不管走哪条路线都不移动、不删除；不发布到 Lumio 时，`.spec/knowledge/lumio-platform/` 也照样保留，以备以后改主意。

### 4. 检查

- `node .spec/tools/spec-lint.mjs` 输出 `spec-lint: OK`。不 OK 就按报出的问题修完再往下。
- 生成的文件里没有残留的模板标记：在 `Client`、`Config`、`Server`（有的话）、`Art`、`Tools`、`Builds`、`.spec` 里（不含 `.spec/skills/lumio-init/`）搜不到 `{{`、`<!-- 如果`、`<!-- 结束`、`<!-- 生成时` 和「初始化时填写」。
- 目录树和第 2 步给用户看的一致。

做完告诉用户：项目现在已经是完整、能用的了。然后只问一句：要不要现在聊玩法 / 美术？要聊就直接用 design-director（玩法）或 art-director（美术），聊完进第二段收尾；不聊就直接收尾。

### 模板写法

`skeleton/` 里的文件用两种标记，生成时全部替换或删掉，不留在生成的文件里：

- `{{名字}}`：占位，换成立项答案。用到的有 `{{暂定名}}`、`{{英文短名}}`、`{{一句话}}`、`{{发布目标}}`（第 3 题选的，如「Lumio、安卓」）、`{{技术路线}}`（只写引擎或平台名：网页、Unity、UE，或用户说的其他引擎）、`{{引擎理由}}`（为什么按这些发布目标选这个引擎，一两句）、`{{界面}}`（「LGUI」，或用户不接受 PuerTS 时的「Unity 自带 UI」、LGUI 还没适配的引擎写「引擎自带 UI，网页原型用 LGUI」）、`{{人数}}`（「一个人做」或「N 个人做」）、`{{语言}}`（用户说话用的语言，不用问）、`{{日期}}`（今天，YYYY-MM-DD）。
- 条件块：`<!-- 如果：<条件> -->` 开头、`<!-- 结束 -->` 结尾，可以占几整行，也可以夹在一行中间。条件成立就保留中间的内容，不成立就连内容一起删掉；条件块可以嵌套，从里往外处理；两种情况下标记本身都删掉，删完不留多余的空行。条件有：`有 Server`、`没有 Server`、`发布到 Lumio`（发布目标里有 Lumio）、`不发布到 Lumio`、`一个人`、`多人`、`网页`、`Unity`、`Unity 用 LGUI`、`Unity 不用 LGUI`、`Unity 先做原型`、`Unity 不做原型`、`发布到网页`（发布目标里有网页）、`UE`、`其他路线`（`网页`、`Unity`、`UE` 之外的引擎，如 Cocos Creator、Godot）；第二段改写 README 时还有 `选了游戏许可`、`没选游戏许可`。
- 说明注释：`<!-- 生成时：… -->`，照着做完后删掉。

模板里提到的路径都写成代码格式（不写成 Markdown 链接），因为它们是按生成后的位置写的。

## 第二段：收尾

按顺序做。每一步先看是不是已经做过，做过就跳过（例如 `LICENSE` 已经在 `.spec/` 里就不再 `git mv`；`lumio-init` 已删就不再删）。

1. **处理远程地址（先做，免得后面的 `git mv` 白做）。** 跑 `git remote -v`：
   - 远程是用户自己的仓库（在 GitHub 上点 Use this template 建的）：不动。
   - 远程指向 `LumioGames/LumioTemplate`（直接 clone 的）：先告诉用户要做什么——去掉模板的远程地址、清空模板的提交历史、重新开始一个只属于这个项目的仓库；这只影响本地这个文件夹，模板仓库本身不受影响。用户同意后，在仓库根目录删掉 `.git` 文件夹（bash：`rm -rf .git`；PowerShell：`Remove-Item -Recurse -Force .git`），再 `git init -b main`。用户不同意就只 `git remote remove origin`。
2. **处理许可，改写 README，删掉模板专用的文件。**
   - 把根目录 `LICENSE` 移到 `.spec/LICENSE`（第 1 步清过历史的，文件还没被跟踪，用 `mv LICENSE .spec/LICENSE`；没清的用 `git mv LICENSE .spec/LICENSE`）。它是 LumioTemplate 的许可条款，跟着项目里保留的模板文件走；根目录留给用户自己的游戏。
   - 问用户要不要给游戏选一个许可，默认不放。跟用户说清楚：不放许可文件，游戏的代码和内容仍然归用户所有，只是没有对外授权；想让别人也能用（比如开源），才需要选一个。用户要选，就请用户说用哪一种（例如 MIT、Apache-2.0）和版权人写谁，按该许可的标准全文写进根目录 `LICENSE`。Agent 不替用户挑许可。
   - 按 `skeleton/game-readme.md` 把根目录 `README.md` 改写成这款游戏的说明（条件 `选了游戏许可` / `没选游戏许可` 按上一条的答案）。
   - 问用户要不要英文版 README，默认不要：删掉 `README.en.md`；要就按同样的内容改写它。删掉根目录 `CHANGELOG.md`（那是模板的版本记录，以后更新框架时读的是新版模板里的那份）。
3. **改入口文档。** `.spec/AGENTS.md`：状态改成「已初始化」，删掉状态下面那段引用块提示。根目录 `AGENTS.md`：删掉「`.spec/AGENTS.md` 写着『状态：未初始化』时……」那一段。
4. **删掉本技能。** 删除整个 `.spec/skills/lumio-init/` 文件夹（还在 git 里时用 `git rm -r -q .spec/skills/lumio-init`）。三条软链都指向 `.spec/skills/`，删一次两边客户端就都看不到它了：`ls .claude/skills/ .agents/skills/` 里不应再有 `lumio-init`。
5. **再检查一次。** `node .spec/tools/spec-lint.mjs` 输出 `spec-lint: OK`。
6. **本地提交一次。** `git add -A`，然后 `git commit -m "chore: 用 LumioTemplate 初始化项目"`。提交后跑 `git ls-files -s .claude .agents`：应该正好是 `.claude/agents`、`.claude/skills`、`.agents/skills` 三行 `120000`（符号链接）。不对时停下，告诉用户「提交里三条软链变成了普通文件，先不要推送」，不修复。
7. **推送前先问用户。** 要不要推到 GitHub、推到哪个仓库，都由用户决定；用户要新建远程仓库，就请用户给地址，或在用户同意后用 `gh repo create` 建，再 `git remote add origin <地址>` 和 `git push -u origin main`。
8. **告诉用户接下来能做什么**，第一项是建工程：
   1. **建工程**：按 `Client/README.md` 做，包括装 LGUI、装依赖、建工程。Unity 路线默认也先建网页原型（`Client/app/`），玩法验证得差不多再建 Unity 工程（用户不要原型时直接建 Unity 工程）；建好后把构建和测试命令补进 `.spec/AGENTS.md`「收口门槛」和 `.spec/knowledge/standards/testing.md`。
   2. **定玩法、定美术**：初始化时没聊完的部分，说「我们来定玩法」（design-director）或「我们来定美术方向」（art-director）。
   3. **开始做某个功能**：先用 writing-plans 写计划，再派活。
   4. **做完后打包发布**：发布到 Lumio 的项目按 `.spec/knowledge/lumio-platform/publishing.md` 做，有两种方式让用户选——A. Agent 把 ZIP 打到 `Builds/lumio-platform/`，用户自己在创作中心上传；B. 用户建好作者 API 密钥、自己设进环境变量，Agent 用 API 发布。不发布到 Lumio 的项目，构建产物放 `Builds/`，发到哪里由用户定。
   5. 以后模板出了新版框架，说「更新框架」（lumio-update）。
   6. 以后在这个文件夹里开新对话，规则和技能会自动载入，直接说想做什么就行。
