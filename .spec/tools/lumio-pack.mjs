#!/usr/bin/env node
// 把构建好的网页目录打成能直接在 Lumio 创作中心上传的 ZIP。零依赖，Node 26 LTS（Lumio SDK 支持 24.18 到 26.x，27 及以上不支持）。
// 用法：node .spec/tools/lumio-pack.mjs <构建目录> [输出.zip]（框架文件，随框架更新）
// 先按平台的上传规则检查（见 .spec/knowledge/lumio-platform/publishing.md），有问题就报错退出，不会打出一个注定被拒的包。
// 平台上传时还会再做完整校验，以创作中心的结果为准。
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const RESERVED = 'lumio-bootstrap.js';
const JUNK = new Set(['.DS_Store', 'Thumbs.db', 'desktop.ini']);

function fail(message) {
  console.error(`打包失败：${message}`);
  process.exit(1);
}

const [dirArg, outArg] = process.argv.slice(2);
if (!dirArg) fail('缺少构建目录。用法：node .spec/tools/lumio-pack.mjs <构建目录> [输出.zip]');
const root = path.resolve(dirArg);
if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) fail(`构建目录不存在：${root}`);

function walk(dir, prefix = '') {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix + entry.name;
    if (JUNK.has(entry.name) || entry.name === '__MACOSX') continue;
    if (entry.isSymbolicLink()) fail(`${rel} 是符号链接，平台不接受。换成真实文件。`);
    if (entry.isDirectory()) files.push(...walk(path.join(dir, entry.name), rel + '/'));
    else if (entry.isFile()) files.push(rel);
  }
  return files;
}
const files = walk(root).sort();

// 与平台的路径规则一致：允许的字符、不以 . 开头的段（隐藏文件）、大小写不同的同名文件。
const SAFE_PATH = /^(?:[\p{L}\p{N}!_.'()@/ ,…、。-]|（|）)+$/u;
const seen = new Set();
for (const rel of files) {
  if (rel.split('/').some((part) => part.startsWith('.'))) fail(`${rel} 是隐藏文件（或在隐藏目录里），平台不接受。从构建目录里去掉它。`);
  if (!SAFE_PATH.test(rel)) fail(`${rel} 的文件名有平台不接受的字符。只用字母、数字、中文和 _ . - ( ) @ , ' 及空格。`);
  if (seen.has(rel.toLowerCase())) fail(`${rel} 和另一个文件只差大小写，平台算重复。改名。`);
  seen.add(rel.toLowerCase());
}

if (!files.includes('lumio.json')) fail('构建目录根部没有 lumio.json。把它放进构建产物的根目录（不要再套一层文件夹）。');
let declaration;
try {
  declaration = JSON.parse(fs.readFileSync(path.join(root, 'lumio.json'), 'utf8'));
} catch (error) {
  fail(`lumio.json 不是合法的 JSON：${error.message}`);
}
if (typeof declaration.entry !== 'string' || !/\.html?$/.test(declaration.entry)) fail('lumio.json 的 entry 必须是包内 .html 文件的相对路径，例如 "index.html"。');
if (typeof declaration.engine !== 'boolean') fail('lumio.json 必须写 "engine": false（网页游戏）。');
if (!files.includes(declaration.entry)) fail(`lumio.json 的 entry 是 ${declaration.entry}，但构建目录里没有这个文件。`);
if (files.includes(RESERVED)) fail(`构建目录里有 ${RESERVED}。它由平台在上线时注入，ZIP 里不能放，删掉它（入口页里的 <script src="./${RESERVED}"> 引用可以保留）。`);

const entryHtml = fs.readFileSync(path.join(root, declaration.entry), 'utf8');
const absolute = [...entryHtml.matchAll(/\b(?:src|href)\s*=\s*["'](\/[^/"'][^"']*)["']/g)].map((match) => match[1]);
if (absolute.length > 0)
  fail(`${declaration.entry} 里有以 / 开头的资源路径（${absolute.slice(0, 3).join('、')}）。游戏在平台上不在域名根目录，改成相对路径（Vite 设 base: './'）。`);

// ZIP：UTF-8 文件名、deflate 压缩、不写目录条目和权限位。
const toDos = (date) => ({
  time: (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1),
  day: ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
});
const { time, day } = toDos(new Date());
const locals = [];
const centrals = [];
let offset = 0;
let totalBytes = 0;
for (const rel of files) {
  const data = fs.readFileSync(path.join(root, rel));
  const packed = zlib.deflateRawSync(data, { level: 9 });
  const stored = packed.length >= data.length;
  const body = stored ? data : packed;
  const name = Buffer.from(rel, 'utf8');
  const crc = zlib.crc32(data);
  const header = (signature, size) => {
    const buffer = Buffer.alloc(size);
    buffer.writeUInt32LE(signature, 0);
    return buffer;
  };
  const local = header(0x04034b50, 30);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0x800, 6);
  local.writeUInt16LE(stored ? 0 : 8, 8);
  local.writeUInt16LE(time, 10);
  local.writeUInt16LE(day, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(name.length, 26);
  const central = header(0x02014b50, 46);
  central.writeUInt16LE(20, 4);
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0x800, 8);
  central.writeUInt16LE(stored ? 0 : 8, 10);
  central.writeUInt16LE(time, 12);
  central.writeUInt16LE(day, 14);
  central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(body.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(name.length, 28);
  central.writeUInt32LE(offset, 42);
  locals.push(local, name, body);
  centrals.push(central, name);
  offset += local.length + name.length + body.length;
  totalBytes += data.length;
}
const centralBytes = Buffer.concat(centrals);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralBytes.length, 12);
end.writeUInt32LE(offset, 16);

const out = path.resolve(outArg ?? 'lumio-package.zip');
if (out.startsWith(root + path.sep)) fail('输出 ZIP 不能放在构建目录里面。');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, Buffer.concat([...locals, centralBytes, end]));
const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2) + ' MB';
console.log(`已生成 ${out}`);
console.log(`${files.length} 个文件，解压后 ${mb(totalBytes)}，ZIP ${mb(fs.statSync(out).size)}；入口 ${declaration.entry}`);
console.log('上传：https://lumiogames.cn/studio/games/new');
