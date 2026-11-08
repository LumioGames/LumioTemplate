---
name: lumio-platform-environment
description: 开发环境——要哪个版本的 Node 和 Git、缺了怎么征得同意后从官方渠道装、技能链接怎么建；准备环境或命令找不到 node 时查
metadata:
  type: standard
  status: 已交付
---

# 开发环境

做游戏要两样系统软件：**Node**（结构检查、技能链接脚本、LGUI、Lumio SDK 都靠它）和 **Git**（自动存档、回到之前的存档、对比改动、多个 Agent 并行开发都靠它）。不需要 GitHub 账号。

## 要哪个版本

- **Node**：仓库根目录 `.node-version` 写的大版本，现在是 `26`（Node 26 LTS）。Lumio SDK 支持 24.18 到 26.x，27 及以上不支持；LGUI 要 24 或更高。用 fnm、nodenv 这类版本管理器的，它会自动读 `.node-version`。
- **Git**：近几年的版本都行。

检查：`node -v`、`git --version`。

## 缺了或版本不对

Agent 先问用户**一次**，一次同意覆盖这次要装的 Node 和 Git，例如：

> 做游戏要用到 Node（和 Git），你的电脑上还没有（或者版本太旧）。我可以从官方渠道帮你装好，要装吗？中途系统可能弹出确认框，或者要你输入开机密码，点同意就行。

- 用户同意：按下面对应系统装。装完在这次对话里用**绝对路径**继续（每节最后写了路径），不要求用户重开终端；以后新开的终端和对话会自己找到。
- 用户不同意：告诉用户下载地址（Node：https://nodejs.org ，选 26 LTS；Git：https://git-scm.com/downloads ），等用户装好再检查一遍。
- 电脑上已经有 Node 版本管理器（`fnm`、`nvm`、`volta` 等能找到）：用它装 26（如 `fnm install 26`、`nvm install 26`），不另装一份。
- 安装失败：把输出原文告诉用户，停下，不换别的来源、不反复重试。
- 只走下面这些官方渠道；不改系统设置，不替用户输入密码。

### Windows

用 winget（Windows 10 / 11 自带的「应用安装程序」）。会弹出「是否允许此应用更改你的设备」，请用户点「是」。

- **Node**：先 `winget show --id OpenJS.NodeJS.LTS --versions` 找最大的 `26.x.y`（没有就看 `OpenJS.NodeJS`），再：

  ```powershell
  winget install --id OpenJS.NodeJS.LTS --exact --version 26.x.y --source winget --accept-package-agreements --accept-source-agreements
  ```

  装好后：`C:\Program Files\nodejs\node.exe`、`C:\Program Files\nodejs\npm.cmd`（Git Bash 里写 `/c/Program Files/nodejs/node.exe`）。
- **Git**：`winget install --id Git.Git --exact --source winget --accept-package-agreements --accept-source-agreements`。装好后：`C:\Program Files\Git\cmd\git.exe`。
- 找不到 `winget`：告诉用户从 Microsoft Store 装「应用安装程序」，或者去上面的官网下载安装包。

### macOS

- **Node**：用 nodejs.org 的官方安装包。从 `https://nodejs.org/dist/latest-v26.x/SHASUMS256.txt` 找到 `node-v26.x.y.pkg` 那一行，下载同目录下的这个文件，用 `shasum -a 256` 核对和那一行一致（不一致就停下），然后 `open node-v26.x.y.pkg`。安装界面由用户点「继续」、输入开机密码；用户说装完了再往下。装好后：`/usr/local/bin/node`、`/usr/local/bin/npm`。
- **Git**：`xcode-select --install`，会弹出苹果的「命令行开发者工具」安装框，请用户点「安装」。装好后：`/usr/bin/git`。

### Linux

- **Node**：用 nodejs.org 的官方预编译包，装在用户目录里，不用 root。从 `https://nodejs.org/dist/latest-v26.x/SHASUMS256.txt` 找到 `node-v26.x.y-linux-x64.tar.xz`（ARM 机器是 `linux-arm64`）那一行，下载后用 `sha256sum` 核对，解压到 `~/.local/lib/nodejs/`，再把里面 `bin/` 下的 `node`、`npm`、`npx` 链到 `~/.local/bin/`。装好后：`~/.local/bin/node`。`~/.local/bin` 不在 PATH 里时告诉用户，下次登录前也是用绝对路径。
- **Git**：用发行版的包管理器（如 `sudo apt install git`、`sudo dnf install git`）。要输密码，请用户自己在终端里跑。

### 装完、还没重开终端时

这次对话里 `node`、`npm`、`git` 都写上面的绝对路径。npm 脚本里的 `node` 是从 PATH 找的（npm 不会替脚本找到自己所在的 Node），跑脚本前把 Node 的目录放到 PATH 前面：

```bash
PATH="/c/Program Files/nodejs:$PATH" npm run check   # Git Bash；macOS 写 /usr/local/bin，Linux 写 ~/.local/bin
```

PowerShell：`$env:Path = "C:\Program Files\nodejs;" + $env:Path; npm run check`。

## 技能链接

`.claude/skills`、`.claude/agents`、`.agents/skills` 三条链接让 Claude Code 和 Codex 自动发现 `.spec/skills/` 里的技能和 `.spec/agents/` 里的审查子 Agent。它们**不进 git**（写在 `.gitignore` 里），每台电脑在本地建：

```bash
node .spec/tools/link-skills.mjs
```

- Mac / Linux 建软链；Windows 建目录联接（junction），**不需要开发者模式，也不需要管理员**。
- 什么时候跑：克隆或下载项目之后、`.claude/skills` 不存在时、项目文件夹挪了位置之后（Windows 的联接记的是绝对路径）。重复跑没关系，已经对的会显示「已存在」。
- 它报「已经存在，但它是普通的文件夹」时不动那个文件夹，把原文告诉用户，问里面的东西怎么处理。
- 链接这次才建好的，当前对话里客户端不一定已经列出这些技能；要用时直接读 `.spec/skills/<技能名>/SKILL.md`，下次新开对话就会自动发现。
- 这是 Agent 自己的准备工作，不用跟用户提。
