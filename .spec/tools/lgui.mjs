#!/usr/bin/env node
// lgui 的短入口：找到已装的 LGUI 插件，把参数原样转给 <插件目录>/tools/lgui.mjs，退出码照传。
// 用法：在 LGUI 工程目录里跑 node <到仓库根的相对路径>/.spec/tools/lgui.mjs <命令> [参数]，例如在 Client/app 里 node ../../.spec/tools/lgui.mjs check。
// 工程的 package.json 里把常用命令写成 npm 脚本，见 .spec/knowledge/lumio-platform/lgui.md「建工程」。
// 插件目录：环境变量 LGUI_PLUGIN；不设就在 Claude Code / Codex 的插件缓存里找版本号最大的那份。lgui-build-web.mjs 也用这里的 findLguiPlugin。框架文件，随框架更新。
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** 返回 LGUI 插件目录。required：插件 tools/ 下必须都在的文件（缓存里没装完整的版本跳过）。找不到就报错退出。 */
export function findLguiPlugin(required = ['lgui.mjs']) {
  if (process.env.LGUI_PLUGIN) return path.resolve(process.env.LGUI_PLUGIN);
  const candidates = [];
  for (const base of ['.claude', '.codex'].map((dir) => path.join(os.homedir(), dir, 'plugins', 'cache', 'lumio-lgui', 'lgui'))) {
    if (!fs.existsSync(base)) continue;
    for (const version of fs.readdirSync(base)) {
      const dir = path.join(base, version);
      if (required.every((file) => fs.existsSync(path.join(dir, 'tools', file)))) candidates.push({ version, dir });
    }
  }
  candidates.sort((a, b) => a.version.localeCompare(b.version, undefined, { numeric: true }));
  if (candidates.length) return candidates.at(-1).dir;
  console.error('找不到 LGUI 插件目录。先装 LGUI 插件（见 .spec/knowledge/lumio-platform/lgui.md「装 LGUI」），或设置环境变量 LGUI_PLUGIN=<插件目录>（里面有 tools/lgui.mjs）。');
  process.exit(1);
}

// 被 import 时只提供 findLguiPlugin；直接运行时才转发命令。两边都取真实路径比较（macOS 的 /tmp 是 /private/tmp 的软链）。
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))) {
  const result = spawnSync(process.execPath, [path.join(findLguiPlugin(), 'tools', 'lgui.mjs'), ...process.argv.slice(2)], { stdio: 'inherit' });
  if (result.error) throw result.error;
  process.exit(result.status ?? 1);
}
