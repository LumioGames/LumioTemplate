---
name: lumio-update
description: 当用户说「更新框架」「升级框架」「看看模板有没有新版本」，或想知道项目用的是哪个版本的 LumioTemplate 框架时使用。
---

# lumio-update（更新框架）

把项目里的 LumioTemplate 框架文件更新到最新版本，顺带看看 LGUI 和 Lumio SDK 有没有新版。本技能本身也是框架文件：每次更新都会被新版覆盖，所以下面写的版本号就是项目当前装的框架版本，不另外记录状态。

## 当前框架版本

`v1.0.0`

## 框架文件清单

只有下面这些路径随框架更新。以 `/` 结尾的是整个文件夹（更新时整个换掉，新版里删掉的文件也会跟着删掉）；其余是单个文件。

```
.spec/rules/system.md
.spec/agents/reviewer.md
.spec/tools/spec-lint.mjs
.spec/knowledge/lumio-platform/
.spec/skills/README.md
.spec/skills/LICENSE
.spec/skills/LICENSE-agentspec
.spec/skills/LICENSE-superpowers
.spec/skills/writing-plans/
.spec/skills/subagent-driven-development/
.spec/skills/test-driven-development/
.spec/skills/systematic-debugging/
.spec/skills/spec-steward/
.spec/skills/design-director/
.spec/skills/design-review/
.spec/skills/art-director/
.spec/skills/art-prompt/
.spec/skills/art-review/
.spec/skills/lumio-update/
```

不在清单里的都不动：项目文件（`.spec/AGENTS.md`、`rules/project.md`、`knowledge/` 里除 `lumio-platform/` 以外的部分、`decisions/`、`plans/`）、用户自己加的技能和子 Agent、各模块目录、根目录的 `AGENTS.md` / `CLAUDE.md` / `README.md` / `LICENSE` 和三条软链。初始化用的 `lumio-init` 不随更新分发。

## 步骤

任何一步失败就停下，把错误原文告诉用户；不跳过、不编造成功。命令按 bash 写，Windows 上在 Git Bash 里跑。临时目录放在项目外面，做完删掉。

### 1. 准备

- `git status` 要干净。有没提交的改动，先请用户提交或决定怎么处理，这样更新的改动能单独成一次提交。
- 查最新版本：`git ls-remote --tags --refs https://github.com/LumioGames/LumioTemplate 'v*'`，按版本号取最大的那个。和上面「当前框架版本」一样：告诉用户框架已是最新，直接跳到第 6 步。
- 比当前新：`git clone -q --depth 1 --branch <最新版本> https://github.com/LumioGames/LumioTemplate <临时目录>`。

### 2. 给用户看改了什么

读 `<临时目录>/CHANGELOG.md`，把当前版本之后、到最新版本为止的每一节给用户看，特别标出「需要手动处理」的事项。用户同意了再往下。

### 3. 按清单覆盖或删除

新清单是 `<临时目录>/.spec/skills/lumio-update/SKILL.md` 里的「框架文件清单」，旧清单是本文件里的那份。

- 新清单里的每个路径都从临时目录覆盖过来。单个文件：`cp <临时目录>/<路径> <路径>`（父目录不存在时先 `mkdir -p`）。文件夹：先删再按内容复制，源路径末尾写 `/.`，例如 `rm -rf .spec/skills/writing-plans && mkdir -p .spec/skills/writing-plans && cp -R <临时目录>/.spec/skills/writing-plans/. .spec/skills/writing-plans/`（不要写成 `…/writing-plans/ .spec/skills/`：macOS 上会把文件撒进 `.spec/skills/`）。
- 只在旧清单里的路径是新版去掉的框架文件：删掉。

### 4. 给用户看 diff

`git status` 和 `git diff` 给用户看：改动只应出现在清单里的路径下。框架文件按规则不在本地改；如果 diff 里冲掉了项目自己的内容，请用户决定把它挪进项目文件（红线进 `rules/project.md`、做法进 `knowledge/standards/`、自己的方法另建项目技能），旧内容在 git 历史里找得回来。

### 5. 登记、检查、提交

1. 新版在 `.spec/rules/` 下多了文件：在根目录 `CLAUDE.md` 加一行 `@.spec/rules/<文件名>`，在根目录 `AGENTS.md` 的必读清单加一行；去掉的规则文件，两处都删掉那一行。
2. CHANGELOG 里「需要手动处理」的事项，逐项给用户看，用户同意后照做。
3. **Lumio 工具**：项目里有 `Tools/lumio-pack.mjs` 或 `Tools/lgui-build-web.mjs` 时，和 `<临时目录>/.spec/tools/` 里的同名文件比；不一样就给用户看差异，问要不要换成新版。它们在 `Tools/` 里，属于项目，不自动覆盖。
4. `node .spec/tools/spec-lint.mjs`，报出的问题告诉用户。
5. 本地提交一次，例如 `git commit -m "chore: 框架更新到 <最新版本>"`。**推送前先问用户。** 删掉临时目录。

### 6. 看看 LGUI 和 SDK 有没有新版（只提示，不自动升）

- **LGUI**：装着的插件版本看插件缓存目录名（Claude Code 是 `~/.claude/plugins/cache/lumio-lgui/lgui/<版本>/`，Codex 是 `~/.codex/plugins/cache/lumio-lgui/lgui/<版本>/`）；最新版本看 LGUI 仓库根目录 `CHANGELOG.md` 最上面一节（仓库打了 tag 时，也可以 `git ls-remote --tags --refs https://github.com/LumioGames/LGUI`）。有新版就告诉用户，怎么升见 `.spec/knowledge/lumio-platform/lgui.md`「更新 LGUI」。
- **Lumio SDK**：项目里用到 SDK 时（比如 `Client/app/package.json` 里有 `@lumiogames/sdk`），用 `npm view @lumiogames/sdk version` 和 `package.json` 里的版本比。有新版就告诉用户，怎么升见 `.spec/knowledge/lumio-platform/sdk.md`「升级 SDK」。
- 用户说要升，再按那两节做；本技能不替用户升级。

最后用一两句话告诉用户：框架现在是哪个版本、改了哪些文件、有没有没更新的项、LGUI 和 SDK 的情况。
