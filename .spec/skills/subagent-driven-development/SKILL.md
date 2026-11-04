---
name: subagent-driven-development
description: 按计划派子 Agent 并行实现时使用（SDD 模式，或 TDD 模式需要并行时）——契约卡先做，实现卡按 wave 并行，写完就合，计划合完审一次。
---

> 来源：改编自 [obra/superpowers](https://github.com/obra/superpowers)（MIT，Copyright (c) 2025 Jesse Vincent，见 [LICENSE-superpowers](../LICENSE-superpowers)），经 LumioAgentSpec 1.1.1（MIT，见 [LICENSE-agentspec](../LICENSE-agentspec)）收入 LumioTemplate。

# SDD（按计划并行开发）

开发有两种模式：**SDD**（快速模式，默认）和 **TDD**（测试先行）。写计划时已经定了走哪种（判据见 `knowledge/standards/testing.md`）。本技能管「按计划派子 Agent 并行做」：SDD 计划都用它，TDD 计划需要并行时也用它。

主 Agent 只调度：派活、合入、记台账，不替 worker 写代码。卡与卡之间、wave 与 wave 之间不停下来问用户「要不要继续」；只在卡住、计划有矛盾、或全部做完时停。

## 流程

1. **读计划一次。** 记下计划开头的**约束**，计划 frontmatter 改成 `status: in_progress`。先看台账（见下面「台账」）：标了完成的卡不再派；台账还没有，就新建，第一行写 `BASE <当前提交的 sha>`。
2. **开工前查计划矛盾。** 卡与卡、卡与计划的**约束**互相打架，同一 wave 里有两张卡改同一个文件或有依赖——全部找出来，**一次**问完用户；没有就直接开工。
3. **Wave 0：契约卡。** 先做各部分共用、要先约定好的东西，例如：`Config/` 里客户端和服务端之间的协议、配表格式、存档格式、公共模块的接口。契约卡合入后才开下一 wave；契约不够用时改契约卡、再重派依赖它的卡，不在实现卡里自己扩接口。
4. **Wave 1+：实现卡并行。** 例如：客户端某个界面、服务端某段逻辑、一张配表、一批美术资源接入。文件集不重叠的卡才放进同一 wave。每张卡：记下 BASE 提交，跑 `scripts/task-brief PLAN_FILE N` 生成任务简报，按 [implementer-prompt.md](implementer-prompt.md) 派 worker，各在自己的 worktree 里做。
5. **收 wave。** 按 worker 返回的状态处理（见下面），写完就合进主工作区，台账记一行，进下一 wave。
6. **收尾。** 计划全部合完以后：主 Agent 跑收口门槛（命令见 `.spec/AGENTS.md`，何时跑见 `testing.md`）；用 `scripts/review-package <BASE> HEAD`（BASE 取台账第一行，计划开工时的提交；一个人直接在 main 上提交时 `git merge-base` 会等于 HEAD，所以不用它）生成审查包，派 `reviewer`（`agents/reviewer.md`）审一次，给它计划路径、审查包路径、台账，以及刚跑的收口门槛命令和输出（这就是它要的带验证证据的交付报告）。审出的问题交给**一个**修复子 Agent 带完整清单一次改完，改完直接合，不审第二轮。最后计划改成 `status: completed`，按下面「合入」收分支。

**测试**：worker 什么时候跑测试见 `knowledge/standards/testing.md`「什么时候跑」（派活时按 `implementer-prompt.md` 写清）。**不做每卡审查**，审查只在收尾做一次。

**bug**：顺手能修的当场修；修不了的记进 bug 墙（`.spec/knowledge/bug-wall.md`），继续往前做。

## 处理 worker 的四种状态

- **DONE**：看 diff 和回复里的说明，合入，记台账。
- **DONE_WITH_CONCERNS**：先读疑虑。涉及正确性、范围或契约的，合入前处理；只是观察（如「这个文件越来越大」），记进台账的 `note:` 行留给 reviewer，照常合入。
- **NEEDS_CONTEXT**：补上缺的信息，重派。
- **BLOCKED**：缺上下文就补了重派；需要更强的推理就换更强的模型重派；卡太大就拆小；契约错了先改契约卡；计划本身错了交给用户。不要原样让同一个模型再试一次。

## 模型分档

每次派活都写明用哪个模型；不写会继承会话里最贵的那个。拿不准就继承，不往低猜。

| 工作 | 档位 |
| --- | --- |
| 计划里已写好完整代码的照抄、单文件机械修改 | 最便宜 |
| 按文字说明实现、契约卡 | 中档（这两类的下限） |
| 多文件集成、排障 | 标准 |
| 架构和设计、收尾审查 | 最强 |

## 交接靠文件，报告写在回复里

- **任务简报**：派活前跑 `scripts/task-brief PLAN_FILE N`，把这张卡的全文抽到一个文件，派活提示里只给路径。提示里写：这张卡在项目里是什么位置、第几 wave；计划开头的约束原文；简报路径；它要用的契约产物路径（不贴内容）；【文件集边界】和【环境】两行；你对简报里含糊处的决定。不贴之前各 wave 的历史。
- **worker 报告**写在回复里，不写报告文件；只回状态、提交号、改了哪些文件、证据（没跑写「未执行」）和疑虑。
- **审查包**用 `scripts/review-package` 生成文件，把路径交给 reviewer，内容不进主 Agent 的上下文。

## 台账

上下文被压缩后，主 Agent 可能忘了做到哪，重派已经完成的 wave 是最贵的失误，所以进度记在台账文件里。

- 开工时先看 `cat "$(git rev-parse --show-toplevel)/.sdd/progress.md"`：第一行 `BASE <sha>` 是计划开工时的提交，收尾审查包从它算起；列为完成的卡就是做完了，从第一张没完成的卡所在的 wave 接着做。
- 每合入一张卡，追加一行：`Task N (wave W): complete (commits <base7>..<head7>, merged)`；worker 的疑虑和观察写在下面，以 `note:` 开头。
- 压缩之后以台账和 `git log` 为准，不信自己的记忆。`.sdd/` 不进 git（`git clean -fdx` 会删掉它，删了就从 `git log` 恢复）。

## 并行、合入、交回与退回

- **并行边界**：文件集互不重叠才并行，重叠就串行；文件不重叠但共用同一份数据（存档、配表、同一份状态）的，写明一条共同的验收方式。并行时每个 worker 用一个 git worktree（Claude Code 用 Agent 工具的 `isolation: "worktree"`，其他客户端 `git worktree add`；仓库内的 `.worktrees/` 先确认已写进 `.gitignore`）；Unity 这类每份都要重新导入、很慢的工程，开多份之前先问用户，或者直接串行。
- **合入**：收回交付先看有没有冲突，不复跑 worker 的测试，合进主工作区；冲突退回实现方。审查范围是台账第一行的 `BASE` 到合完后的 HEAD。全部合完按 `knowledge/standards/workflow.md` 的分支策略收尾，没写就问用户；只清理本流程建的 worktree，删分支或 worktree 前列出会丢的内容，问过用户。
- **交回物**：① 改了什么；② 证据——跑了什么命令、关键输出，没跑的写「未执行」，不写「通过」；worker 说成功不作数，以 diff 为准；③ 已知没做完的；④ 沉淀到了哪，或说明不用沉淀。reviewer 交审查报告（格式见 `agents/reviewer.md`）。
- **退回**：reviewer 报 P0 / P1，就把完整清单交给一个修复子 Agent 一次改完。处理意见先对照代码核实再改，不盲改、不表演性认同；不清楚的先全部问清再动手；和用户已定的决定冲突的，交用户裁决。同一问题三次不过就质疑方案、重新拆；方向问题交给用户。
- **派 reviewer 时不预判**：不写「这条别报」「最多 P2」，有误报让它报出来再裁决。

## 没有子 Agent 时（Inline Fallback）

客户端不支持子 Agent 时，在当前会话里串行执行同一份计划：先查计划矛盾，有就先问用户 → 契约卡先做，其余按 wave 顺序一张张做（测试按 `testing.md`）→ 遇到缺依赖、指令不清就停下来问，不猜 → 全部做完跑收口门槛，再对照 `agents/reviewer.md` 把整个 diff 对抗地自审一遍，计划改成 `status: completed`，按「合入」收分支。

这样做没有每卡的干净上下文，也没有独立审查，是已知的降级，自审时要格外挑剔。
