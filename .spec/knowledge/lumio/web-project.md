---
name: lumio-web-project
description: 不用 LGUI 时用 Vite + TypeScript 建网页工程并接 SDK——自己画界面或用其他网页引擎时查
metadata:
  type: standard
  status: 已交付
---

# 不用 LGUI：Vite + TypeScript 工程

适合 Canvas 小游戏，或用 Phaser、PixiJS 等网页引擎的游戏。本篇的写法在 Vite 7.3.7 + TypeScript 5.9.3 + SDK 2.10.1 上实际跑通过（2026-11-03）。

## 建工程

在仓库根目录建 `game/`，按下面写文件（不用 `npm create vite`，避免拿到不确定的模板版本）：

```bash
mkdir -p game/src game/public && cd game
# 先写好下面的 package.json，再装依赖
npm i --save-exact @lumiogames/sdk@2.10.1
npm i -D --save-exact vite@7.3.7 typescript@5.9.3
```

`game/package.json`：

```json
{
  "name": "<英文短名>",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "pack": "node ../tools/lumio-pack.mjs dist ../<英文短名>.zip"
  }
}
```

`game/vite.config.ts`：

```ts
import { defineConfig } from 'vite';

// base: './' 让构建出的资源路径都是相对的：游戏在平台上不在域名根目录。
export default defineConfig({ base: './' });
```

`game/tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM"],
    "types": ["vite/client"],
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

`game/index.html`（入口；构建时 Vite 会把 `src/main.ts` 换成打包后的脚本）：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <title>游戏名</title>
  <script src="./lumio-bootstrap.js"></script>
</head>
<body>
  <canvas id="stage"></canvas>
  <button id="record">存档并提交分数</button>
  <p id="status"></p>
  <script type="module" src="./src/main.ts"></script>
</body>
</html>
```

构建时 Vite 会提示 `<script src="./lumio-bootstrap.js"> … can't be bundled without type="module"`，这是预期的：这个脚本由平台提供，要原样留在页面里。

`game/public/lumio.json`：照 [publishing.md](publishing.md) 的写法。`public/` 里的文件构建时原样复制到 `dist/` 根部。

## 接 Lumio

`game/src/lumio.ts`：

```ts
// 本地开发（vite dev）用 SDK 模拟器，正式构建只连平台。连不上就报错，不换成模拟器。
import { connectLumioFromLaunch, type LumioSdk } from '@lumiogames/sdk';

export function connectLumio(): Promise<LumioSdk> {
  return import.meta.env.DEV
    ? import('@lumiogames/sdk/simulator').then(
        ({ createLumioSimulator }) => createLumioSimulator({ gameKey: 'g-abcdefghij', versionId: 'local' }) as unknown as Promise<LumioSdk>,
      )
    : connectLumioFromLaunch();
}
```

`game/src/main.ts`（验证按钮，之后换成真正的游戏）：

```ts
import { connectLumio } from './lumio';

const status = document.querySelector<HTMLParagraphElement>('#status')!;
const button = document.querySelector<HTMLButtonElement>('#record')!;
let clicks = 0;

try {
  const lumio = await connectLumio();
  button.addEventListener('click', async () => {
    clicks += 1;
    const saved = await lumio.save.read('progress');
    if (!saved.ok) return void (status.textContent = saved.failure.code);
    const written = await lumio.save.write('progress', { clicks }, { expectedRevision: saved.value?.revision ?? null });
    if (!written.ok) return void (status.textContent = written.failure.code);
    if ('conflict' in written.value) return void (status.textContent = '存档冲突');
    const score = await lumio.leaderboard.submit('stats.bestScore', clicks);
    status.textContent = score.ok ? `第 ${clicks} 次：已存档并提交` : score.failure.code;
  });
} catch (error) {
  status.textContent = `连接 Lumio 失败：${error instanceof Error ? error.message : String(error)}`;
  button.disabled = true;
}
```

用 Phaser 等引擎时，引擎照常装进 `game/`，把 `connectLumio()` 的结果交给游戏逻辑；SDK 的 `@lumiogames/sdk/adapters` 里还有 `connectPhaser`、`connectCocos` 等适配，用前先读它的类型声明。

## 运行、构建、打包

```bash
npm run dev     # 打开终端里显示的地址，点按钮显示「已存档并提交」
npm run build   # 输出到 dist/：index.html、assets/、lumio.json
npm run pack    # 生成 ../<英文短名>.zip
```

`grep -c simulated_friend dist/assets/*.js` 结果为 0，说明正式包里没有模拟器。
