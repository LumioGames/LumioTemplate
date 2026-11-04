#!/usr/bin/env node
// 过渡脚本：LGUI 插件还没有「网页正式构建」命令，这里用已装插件里的同一套生成与打包代码，把 LGUI 工程打成静态网页。
// LGUI 提供 `lgui build` 之后删掉本文件，改用它。逻辑同 LGUI 仓库的 scripts/build-demo.mjs。
// 用法：node Tools/lgui-build-web.mjs [工程目录=Client/app] [输出目录=<工程>/dist]（模板里先放在 .spec/tools/，初始化时，网页加 LGUI 路线把它移到 Tools/）
// 插件目录：环境变量 LGUI_PLUGIN；不设就在 Claude Code / Codex 的插件缓存里找最新版本。
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function findPlugin() {
  if (process.env.LGUI_PLUGIN) return path.resolve(process.env.LGUI_PLUGIN);
  for (const base of ['.claude', '.codex'].map((dir) => path.join(os.homedir(), dir, 'plugins', 'cache', 'lumio-lgui', 'lgui'))) {
    if (!fs.existsSync(base)) continue;
    const versions = fs.readdirSync(base).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (versions.length > 0) return path.join(base, versions.at(-1));
  }
  console.error('找不到 LGUI 插件目录。先装 LGUI 插件，或设置环境变量 LGUI_PLUGIN=<插件目录>（里面有 tools/lgui.mjs）。');
  process.exit(1);
}

const plugin = findPlugin();
const lib = (rel) => import(pathToFileURL(path.join(plugin, 'tools', 'lib', rel)).href);
const root = path.resolve(process.argv[2] ?? 'Client/app');
const out = path.resolve(process.argv[3] ?? path.join(root, 'dist'));

const { toErrors } = await lib('output.mjs');
const { readProject } = await lib('project.mjs');
const { esbuild } = await lib('vendor.mjs');
const { generateProjectTypes, generateWeb, uiProjectPath } = await lib('generate/index.mjs');
const { readUiModel } = await lib('generate/model.mjs');
const { generateTranslations } = await lib('generate/i18n.mjs');
const { bundleErrors, webBuildOptions, writeWebBootstrap } = await lib('dev/bundle.mjs');

try {
  if (!fs.existsSync(path.join(root, 'lumio.json'))) throw new Error(`${root} 里没有 lumio.json。`);
  const project = readProject(root);
  fs.rmSync(out, { recursive: true, force: true });
  await generateWeb(uiProjectPath(root), path.join(out, 'ui'));
  await generateProjectTypes(root, { validated: true });
  generateTranslations(root, readUiModel(uiProjectPath(root)), project.languages, path.join(out, 'i18n'), project.defaultLanguage);
  const entry = writeWebBootstrap(root, project);
  try {
    await esbuild().build({ ...webBuildOptions(root, entry, { dev: false }), outfile: path.join(out, 'app.js'), sourcemap: false });
  } catch (error) {
    throw bundleErrors(error, root);
  }
  // app.js 带内容哈希：换了版本要让浏览器重新取脚本。平台启动脚本由平台注入包根，这里只引用、不放文件。
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(out, 'app.js'))).digest('hex').slice(0, 12);
  const shell = fs.readFileSync(path.join(plugin, 'tools', 'lib', 'dev', 'shell.html'), 'utf8');
  if (!shell.includes('src="./app.js"') || !shell.includes('</head>')) throw new Error('LGUI 的 shell.html 结构变了，本脚本需要更新。');
  const title = project.name.replace(/[<&>]/g, '');
  const html = shell
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace('</head>', '<script src="./lumio-bootstrap.js"></script>\n</head>')
    .replace('src="./app.js"', `src="./app.js?v=${hash}"`);
  fs.writeFileSync(path.join(out, 'index.html'), html);
  fs.copyFileSync(path.join(root, 'lumio.json'), path.join(out, 'lumio.json'));
  console.log(`已生成 ${out}（index.html、app.js、ui/、i18n/、lumio.json），LGUI 插件 ${plugin}`);
} catch (error) {
  for (const e of toErrors(error)) console.error(`${e.file ? `${e.file}${e.line ? `:${e.line}` : ''}  ` : ''}${e.code ?? ''}  ${e.message}${e.fix ? `  → ${e.fix}` : ''}`);
  process.exit(1);
}
