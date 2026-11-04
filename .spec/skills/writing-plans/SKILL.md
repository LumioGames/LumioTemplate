---
name: writing-plans
description: 动手做一个多步的功能或大需求之前使用——写实现计划：定 SDD 还是 TDD，先提取契约卡，再把其余工作拆成能并行的实现卡。
---

> 来源：改编自 [obra/superpowers](https://github.com/obra/superpowers)（MIT，Copyright (c) 2025 Jesse Vincent，见 [LICENSE-superpowers](../LICENSE-superpowers)），经 LumioAgentSpec 1.1.1（MIT，见 [LICENSE-agentspec](../LICENSE-agentspec)）收入 LumioTemplate。

# 写计划

**落点**：`.spec/plans/YYYY-MM-DD-<名称>.md`。frontmatter 只有 `status`，取 `pending` / `in_progress` / `completed`（spec-lint 检查）；新建时写 `pending`，执行时由 SDD 改。

## 计划开头

```markdown
---
status: pending
---

# <要做什么>

**模式**：SDD / TDD——<一句理由>（判据见 `.spec/knowledge/standards/testing.md`；拿不准先问用户）
**目标**：<一句话>
**约束**：<版本、平台、命名、文案这类全计划都要守的，一条一行，数值照原文抄>
```

## 怎么拆

1. **先列文件结构**：要新建、要改哪些文件，各自管什么。一个文件只管一件事；一起改的文件放在一起。
2. **先提取公共部分，写成 wave 0 契约卡**：两张以上的卡都要用的东西——`Config/` 里的协议、配表格式、存档格式、公共模块的接口。契约卡的产物就是这些文件本身，实现卡只通过它们对齐。
3. **其余拆成实现卡，按 wave 排**：一张卡一件事，能单独做完、单独验收。同一 wave 里的卡之间没有依赖、文件集不重叠；有依赖的放到后面的 wave。只有一步的事不要硬拆。

## 每张卡怎么写（`### Task N`）

- **Files**：新建 / 修改的文件路径（这就是这张卡的文件集）。
- **Interfaces**：用什么（上游卡产出的名字和签名）、产出什么（下游卡要用的名字和签名）。并行的 worker 看不到彼此的代码，这一块是它们唯一的对齐依据。
- **复用**：按「项目公共模块 → LGUI / Lumio SDK → 成熟开源方案」查过用什么；第二处要用的东西抽进公共模块；引入影响全项目的库，卡里写上要记一条 ADR。
- **验收**：每条都能客观判断（「375px 宽不出现横向滚动」，不写「看起来不错」）。TDD 卡先列边界清单，作为要先写的测试；SDD 卡的验收测试照写，什么时候跑见 `testing.md`。

## 例子

```markdown
### Task 1（wave 0，契约）：背包协议
**Files**：新建 `Config/protocol/inventory.schema.json`
**Interfaces**：产出 `InventoryItem { id, count, slot }`、消息 `inventory.update`
**复用**：沿用 `Config/protocol/` 已有的消息信封格式
**验收**：schema 能校验 `Config/protocol/examples/inventory-*.json` 三个样例

### Task 2（wave 1）：背包界面
**Files**：新建 `Client/app/src/inventory/InventoryPanel.ts`
**Interfaces**：用 Task 1 的 `InventoryItem`、`inventory.update`
**复用**：格子列表用 LGUI 的列表组件，不自己写
**验收**：40 格、超出可滚动；收到 `inventory.update` 后数量刷新（验收测试照写，按 testing.md 的时机跑）

### Task 3（wave 1）：道具配表
**Files**：新建 `Config/items.csv`
**Interfaces**：用 Task 1 的 `id` 规则
**复用**：沿用现有配表的列命名和导出脚本
**验收**：导出后每个 id 在协议样例里能找到；数值列标来源
```

## 禁止占位

卡里不能出现：TODO、TBD、「之后补」、「适当处理错误」、「同上」「类似上面」「类似 Task N」（执行的人可能乱序读卡，要重复写出来）、哪张卡都没定义的名字和类型。出现就是计划没写完。

## 写完自检

- 目标里的每一项都有卡对应，没有缺口、没有重叠、没有夹带。
- 每张卡拿到手不用追问就能开工。
- 前后卡用到的名字、签名、字段一致。
- 同一 wave 里没有依赖、没有重叠的文件。

有问题当场改，不另外再审一轮。

## 交出去

保存后告诉用户计划路径，然后执行：SDD 用 `subagent-driven-development`；TDD 按 `test-driven-development` 做（需要并行时也用 `subagent-driven-development`）。
