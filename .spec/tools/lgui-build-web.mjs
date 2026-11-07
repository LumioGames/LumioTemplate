#!/usr/bin/env node
// 过渡脚本：LGUI 插件还没有「网页正式构建」命令，这里用已装插件里的同一套生成与打包代码，把 LGUI 工程打成静态网页。
// LGUI 提供 `lgui build` 之后删掉本文件，改用它。逻辑同 LGUI 仓库的 scripts/build-demo.mjs。
// 用法：node .spec/tools/lgui-build-web.mjs [工程目录=Client/app] [输出目录=<工程>/dist]（框架文件，随框架更新）
// 插件目录：环境变量 LGUI_PLUGIN；不设就在 Claude Code / Codex 的插件缓存里找最新版本（findLguiPlugin，在 lgui.mjs）。
// 要求 LGUI 带项目字体（tools/lib/generate/fonts.mjs）的版本；更早的插件会被当成没装完整，先更新 LGUI。
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { findLguiPlugin } from './lgui.mjs';

const plugin = findLguiPlugin(['lib/output.mjs', 'lib/paths.mjs', 'lib/project.mjs', 'lib/vendor.mjs', 'lib/generate/index.mjs', 'lib/generate/model.mjs', 'lib/generate/i18n.mjs', 'lib/generate/fonts.mjs', 'lib/dev/bundle.mjs', 'lib/dev/shell.html']);
const lib = (rel) => import(pathToFileURL(path.join(plugin, 'tools', 'lib', rel)).href);
const root = path.resolve(process.argv[2] ?? 'Client/app');
const out = path.resolve(process.argv[3] ?? path.join(root, 'dist'));

const { toErrors } = await lib('output.mjs');
const { buildDir } = await lib('paths.mjs');
const { readProject } = await lib('project.mjs');
const { esbuild } = await lib('vendor.mjs');
const { generateProjectTypes, generateWeb, uiProjectPath } = await lib('generate/index.mjs');
const { readUiModel } = await lib('generate/model.mjs');
const { generateTranslations } = await lib('generate/i18n.mjs');
const { generateFonts } = await lib('generate/fonts.mjs');
const { bundleErrors, webBuildOptions, writeWebBootstrap } = await lib('dev/bundle.mjs');

if (!fs.existsSync(path.join(root, 'lumio.json'))) {
  console.error(`${root} 里没有 lumio.json。`);
  process.exit(1);
}

try {
  const project = readProject(root);
  fs.rmSync(out, { recursive: true, force: true });
  await generateWeb(uiProjectPath(root), path.join(out, 'ui'));
  await generateProjectTypes(root, { validated: true });
  const model = readUiModel(uiProjectPath(root));
  generateTranslations(root, model, project.languages, path.join(out, 'i18n'), project.defaultLanguage);
  // 项目字体（ui/fonts/）按用到的字做子集、压成 WOFF2；不生成的话，用了项目字体的网页启动时报 LGUI-RT-180。
  await generateFonts(root, project, model, path.join(out, 'ui', 'fonts'), 'woff2');
  const entry = writeWebBootstrap(root, project, { dir: buildDir(root, 'lumio-build') }); // 启动入口放工程的生成目录，不进输出目录
  try {
    await esbuild().build({ ...webBuildOptions(root, entry, { dev: false, outfile: path.join(out, 'app.js') }), sourcemap: false });
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
  console.log(`已生成 ${out}（index.html、app.js、ui/（有项目字体时含 ui/fonts/）、i18n/、lumio.json），LGUI 插件 ${plugin}`);
} catch (error) {
  for (const e of toErrors(error)) console.error(`${e.file ? `${e.file}${e.line ? `:${e.line}` : ''}  ` : ''}${e.code ?? ''}  ${e.message}${e.fix ? `  → ${e.fix}` : ''}`);
  process.exit(1);
}
