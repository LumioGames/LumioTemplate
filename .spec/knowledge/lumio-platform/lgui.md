---
name: lumio-platform-lgui
description: 用 LGUI 做界面的游戏怎么建工程、接 SDK、正式构建——选了 LGUI 时查
metadata:
  type: standard
  status: 已交付
---

# 用 LGUI 做界面

LGUI 是 Lumio 给 AI Agent 用的游戏 UI 框架：界面放在 `ui/`（FairyGUI 格式），功能用 TypeScript 按 MVC 写，在浏览器里预览和测试，以后还能导出到 Unity。仓库 https://github.com/LumioGames/LGUI ，许可是 PolyForm Shield 加 LumioGames 附加许可：做自己的游戏（含商业）可以用，详见它的 LICENSE。

本篇写的流程在 LGUI 0.3.0 + SDK 2.11.1 上实际跑通过（2026-11-03）。

## 1. 装 LGUI

照 LGUI README 里「给 AI Agent：安装与第一次使用」做，要点：

- Claude Code：`claude plugin marketplace add LumioGames/LGUI`，然后 `claude plugin install lgui@lumio-lgui`。
- Codex：`codex plugin marketplace add LumioGames/LGUI`，然后 `codex plugin add lgui@lumio-lgui`。
- 其他客户端：`git clone --depth 1 https://github.com/LumioGames/LGUI`，把里面的 `plugin/` 当插件目录。
- 下文的 `lgui` 指 `node <插件目录>/tools/lgui.mjs`。Claude Code 的插件目录在 `~/.claude/plugins/cache/lumio-lgui/lgui/<版本>/`，Codex 在 `~/.codex/plugins/cache/lumio-lgui/lgui/<版本>/`。
- 先跑 `lgui doctor`，要求 Node 24，电脑上有 Chrome 或 Edge。
- LGUI 的技能要新开一个会话才生效。建工程只用命令行，装完就能用；建完告诉用户新开会话再做界面。

## 2. 建工程

在仓库根目录：

```bash
lgui init Client/app --name <英文短名>
cd Client/app
npm i --save-exact @lumiogames/sdk@2.11.1
```

`lgui init` 只接受不存在或空的目录。它会在 `Client/app/` 里放 `ui/`、`src/`、`tests/`、`i18n/`、`.lgui/`（框架副本和配置），以及 LGUI 自己的 `AGENTS.md` / `CLAUDE.md`（在 `Client/app/` 里干活时也要遵守它们）。横竖屏在 `Client/app/.lgui/project.json` 的 `orientation` 里改。

## 3. 接 Lumio：放在一个 Service 里

按 LGUI 的 MVC 规范，跟平台打交道的代码放在 Service，Controller 通过 `lgui.service` 拿它，测试里换成假实现。`LGUI_DEV` 是 LGUI 构建时定义的开关：`lgui dev`、`lgui test`、`lgui verify` 为 `true`，正式构建为 `false`。

`Client/app/src/modules/lumio/LumioService.ts`：

```ts
// 跟 Lumio 平台打交道：本地开发（lgui dev / test / verify）用 SDK 模拟器，正式构建只连平台。连不上就报错，不换成模拟器。
import { connectLumioFromLaunch, type LumioSdk } from '@lumiogames/sdk';

declare const LGUI_DEV: boolean;

export interface LumioService {
  /** 存进度并提交分数；返回 'saved' 或平台的失败码。 */
  record(clicks: number): Promise<string>;
}

export class RealLumioService implements LumioService {
  #sdk: Promise<LumioSdk> | undefined;

  #connect(): Promise<LumioSdk> {
    this.#sdk ??= LGUI_DEV
      ? import('@lumiogames/sdk/simulator').then(
          ({ createLumioSimulator }) => createLumioSimulator({ gameKey: 'g-abcdefghij', versionId: 'local' }) as unknown as Promise<LumioSdk>,
        )
      : connectLumioFromLaunch();
    return this.#sdk;
  }

  async record(clicks: number): Promise<string> {
    const sdk = await this.#connect();
    const saved = await sdk.save.read('progress');
    if (!saved.ok) return saved.failure.code;
    const written = await sdk.save.write('progress', { clicks }, { expectedRevision: saved.value?.revision ?? null });
    if (!written.ok) return written.failure.code;
    if ('conflict' in written.value) return 'save.conflict';
    const score = await sdk.leaderboard.submit('stats.bestScore', clicks);
    return score.ok ? 'saved' : score.failure.code;
  }
}

/** 测试用的假实现。 */
export class FakeLumioService implements LumioService {
  async record(): Promise<string> { return 'saved'; }
}
```

- `src/main.ts` 的 `lgui.app({ … })` 里加 `services: { lumio: () => new RealLumioService() }`。
- Controller：`const lumioService = lgui.service<LumioService>('lumio');`，用 `lgui.request((n: number) => lumioService.record(n))` 包一层，`run` 的结果写进 Model，View 用 `pick` 显示。`lgui init` 生成的主界面已经有一个按钮和一行状态文字，把按钮接到这里就是「存档 + 提交分数」的验证按钮。
- 测试：`lgui.testing.start(app, { services: { lumio: () => new FakeLumioService() } })`，点按钮后 `await t.advance(16)` 再读界面。
- `record` 只是验证用的例子，真正的游戏按玩法拆成多个方法。

**已知冲突：** `lgui check` 规定游戏代码只能 import `lgui`、`lgui/ui` 和相对路径，所以会对 `LumioService.ts` 里的 `@lumiogames/sdk` 报 `LGUI-MVC-001`。在 LGUI 支持 Lumio SDK 之前，这一条是已知的、只允许出现在这个文件里；`lgui check` 的其他报错照常修。不要把 SDK 的 import 散到别的文件里。

## 4. 本地预览和测试

```bash
lgui dev     # 打开 http://127.0.0.1:4173/ （用 127.0.0.1，localhost 会被拒绝）
lgui test
lgui verify  # 横竖屏标准尺寸截图
```

点验证按钮后状态文字显示 `saved`，说明模拟器的存档和排行榜都通了。

## 5. 正式构建和打包

LGUI 插件还没有网页正式构建命令。在它提供之前，用过渡脚本 `Tools/lgui-build-web.mjs`（初始化时，网页加 LGUI 路线把它从 `.spec/tools/` 移到 `Tools/`）：它调用已装插件里的生成和打包代码，输出 `index.html`、`app.js`、`ui/`、`i18n/`，在入口页引用 `./lumio-bootstrap.js`，并把 `lumio.json` 复制进去。插件目录自动从 Claude Code / Codex 的插件缓存里找，找不到时设环境变量 `LGUI_PLUGIN=<插件目录>`。

`Client/app/package.json` 里加：

```json
"scripts": {
  "build": "node ../../Tools/lgui-build-web.mjs . dist",
  "pack": "node ../../Tools/lumio-pack.mjs dist ../../Builds/lumio/<英文短名>.zip"
}
```

`npm run build && npm run pack` 在 `Builds/lumio/` 生成 ZIP。正式构建里 `LGUI_DEV` 为 `false`，模拟器分支和它的动态 import 会被剔除；可以 `grep -c simulated_friend dist/app.js` 确认结果是 0（这个字符串只在模拟器模块里；正式包里残留一段走不到的 `createLumioSimulator(` 分支没关系）。

LGUI 出了正式构建命令后，把 `build` 换成它，删掉 `Tools/lgui-build-web.mjs`。
