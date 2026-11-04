---
name: lumio-platform-sdk
description: Lumio SDK 的版本、安装、本地模拟器与平台连接、开放能力和调用规则——接入或使用平台能力时查
metadata:
  type: standard
  status: 已交付
---

# Lumio SDK

包名 `@lumiogames/sdk`，ESM，带类型声明，要求 Node 24.18 或更高。

## 版本

| 项 | 值 |
| --- | --- |
| 本模板验证过的版本 | `2.11.1`（npm 上的 `latest`）。项目实际用的版本以客户端工程的 `package.json` 为准 |
| 安装 | 在 `Client/app/` 里 `npm i --save-exact @lumiogames/sdk@2.11.1` |
| 查 npm 上有哪些版本 | `npm view @lumiogames/sdk versions` |

不要用 2.11.1 以前的版本：2.10.x 在 iPhone Safari 和微信内置浏览器里可能连不上平台（返回 `platform.not_granted`），2.11.1 修好了。以后升级见下面「升级 SDK」。

2.11.0 起，SDK 连上平台后自己上报加载进度和页面报错，连上就算游戏已启动。本模板的写法是第一次用到平台能力时才连接 SDK，所以入口页仍引用平台启动脚本 `./lumio-bootstrap.js`：它让游戏页一加载就开始；不引用的话，SDK 连上之前平台要等页面加载完 2 秒才开始。两者都在时，报错由启动脚本上报，进度以 SDK 为准。见 [publishing.md](publishing.md)。

## 升级 SDK

1. 查有没有新版：`npm view @lumiogames/sdk version`，和客户端工程 `package.json` 里的版本比。
2. 升级前先读 LumioSDK 的更新记录（仓库根目录的 `CHANGELOG.md`，地址见 [resources.md](resources.md)），看有没有不兼容的改动、要不要改 `lumio.json` 或调用写法。
3. 在客户端工程里（网页路线是 `Client/app/`）：`npm i --save-exact @lumiogames/sdk@<新版>`。
4. 重新跑测试、正式构建、打包，确认正式包里仍然搜不到 `simulated_friend`，再到创作中心上传新版本。
5. 版本只写在 `package.json` 里，不改本文：本文是框架文件，随框架更新。升级有取舍时记 ADR。

## 本地模拟器和平台连接

| 场景 | 用什么 |
| --- | --- |
| 本地开发、测试（不登录平台） | `createLumioSimulator({ gameKey: 'g-abcdefghij', versionId: 'local' })`，从 `@lumiogames/sdk/simulator` 导入 |
| 平台上（正式构建） | `connectLumioFromLaunch()`，从 `@lumiogames/sdk` 导入 |

- 模拟器的结果都带 `simulated: true`，数据只在内存里，刷新就没了。它不完整执行线上的声明、权限、配额和频率检查，不能代替上传验证。
- 选哪个由**构建开关**决定（LGUI 的 `LGUI_DEV`，Vite 的 `import.meta.env.DEV`），不在运行时根据连接结果决定。连接失败就报错，不能换成模拟器（发布到 Lumio 的项目，这条红线写在 [rules/project.md](../../rules/project.md)）。
- 写法要让正式构建剔除模拟器：`connectLumioFromLaunch` 用静态 `import`；模拟器只在开发分支里用动态 `import('@lumiogames/sdk/simulator')`。如果写成 `import('@lumiogames/sdk')` 动态导入整个包，模拟器会被打进正式包。
- 模拟器的 `gameKey` 只是格式合法的占位值，不需要是真的作品号；`connectLumioFromLaunch()` 从平台启动地址读取真实的作品和版本，不用写死。
- 场景卸载时调用 `lumio.dispose()`。

```ts
import { connectLumioFromLaunch, type LumioSdk } from '@lumiogames/sdk';

export function connectLumio(dev: boolean): Promise<LumioSdk> {
  return dev
    ? import('@lumiogames/sdk/simulator').then(
        ({ createLumioSimulator }) => createLumioSimulator({ gameKey: 'g-abcdefghij', versionId: 'local' }) as unknown as Promise<LumioSdk>,
      )
    : connectLumioFromLaunch();
}
```

## 开放给第三方游戏的能力

| 能力 | 接口 | `lumio.json` 的 `capabilities` |
| --- | --- | --- |
| 登录状态 | `lumio.session.signedIn`、`lumio.session.capabilities` | `identity.basic` |
| 玩家资料（昵称、头像，需玩家授权） | `players.requestProfile()`、`players.get(玩家号列表)` | `identity.profile` |
| 云存档 | `save.read(槽)`、`save.write(槽, 值, { expectedRevision })` | `save` |
| 游戏数据（字段在 `data.fields` 里声明） | `data.read(玩家号)`、`data.write(字段, { expectedRevision })` | `data` |
| 排行榜 | `leaderboard.submit('stats.<字段>', 分数)`、`leaderboard.query('stats.<字段>', { kind: 'top' 或 'around', limit })` | `leaderboard`（字段在 `data.fields` 里声明） |
| 成就 | `achievements.list()`、`achievements.unlock(名字)` | `achievement` |
| 当前游戏公屏、房间聊天 | `chat.send('global', 文字)`、`chat.history`、`chat.onMessage` | `chat.game` |

不开放：好友、私信、联机。发行包里留着这些方法不代表能用；声明 `chat.direct` 也不会授予。

## 调用规则

- 每个异步调用返回 `{ ok: true, value }` 或 `{ ok: false, failure: { code } }`。失败时按 `failure.code` 显示原因：`platform.not_granted` 是没授权，`platform.not_wired` 是没接通。不要伪造成功。
- 开局先看 `lumio.session.capabilities`：`available` 可用，`not_granted` 未授权，`not_wired` 未接通。
- 游客（未登录）可以玩，但不能写云存档、排行榜和社交。游戏要能在游客状态下正常运行。
- 游戏只拿到本游戏的玩家号（`gp_…`）和玩家同意给的资料，拿不到账号、UID、邮箱。
- 存档：先 `read`，写时带上读到的 `expectedRevision`（新槽为 `null`）。`ok: true` 时仍可能返回 `value.conflict`：保留玩家当前进度，重新读取，让玩家选，不自动覆盖。
- 排行榜：客户端提交的分数不会显示「已验证」。分数字段在 `lumio.json` 里要有范围和每分钟提交次数上限。

```ts
const saved = await lumio.save.read('progress');
if (!saved.ok) throw new Error(saved.failure.code);
const written = await lumio.save.write('progress', { level: 2 }, { expectedRevision: saved.value?.revision ?? null });
if (!written.ok) throw new Error(written.failure.code);
if ('conflict' in written.value) {
  // 保留当前进度，重新读取后让玩家选择
}
const score = await lumio.leaderboard.submit('stats.bestScore', 100);
if (!score.ok) throw new Error(score.failure.code);
const top = await lumio.leaderboard.query('stats.bestScore', { kind: 'top', limit: 10 });
```

完整说明在创作中心首页的「文档与 Lumio SDK」，SDK 仓库见 [resources.md](resources.md)。
