#!/usr/bin/env node
// 在本机建三条技能链接：.claude/skills、.claude/agents 指向 .spec/ 下同名目录，.agents/skills 指向 .spec/skills。
// Claude Code 经 .claude/、Codex 经 .agents/ 自动发现技能和审查子 Agent。链接不进 git（见 .gitignore），每次克隆后跑一次；重复跑没关系。
// Mac / Linux 建相对软链；Windows 建目录联接（junction），不需要开发者模式，也不需要管理员。联接记的是绝对路径，项目文件夹挪了位置要再跑一次。
// 用法：node .spec/tools/link-skills.mjs [项目根目录]（省略时取本脚本所在仓库的根目录）。框架文件，随框架更新。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..'));
const links = [
  ['.claude/skills', '.spec/skills'],
  ['.claude/agents', '.spec/agents'],
  ['.agents/skills', '.spec/skills'],
];
const failures = [];

// 坏链接（指向的地方不存在）realpath 会抛错，这时就是「没指到」。
function pointsTo(link, target) {
  try { return fs.realpathSync(link) === fs.realpathSync(target); } catch { return false; }
}

for (const [linkRel, targetRel] of links) {
  const link = path.join(root, linkRel);
  const target = path.join(root, targetRel);
  if (!fs.statSync(target, { throwIfNoEntry: false })?.isDirectory()) {
    failures.push(`${targetRel} 不存在，建不了 ${linkRel}。`);
    continue;
  }
  const existing = fs.lstatSync(link, { throwIfNoEntry: false });
  let action = '已建';
  if (existing) {
    if (!existing.isSymbolicLink()) {
      failures.push(`${linkRel} 已经存在，但它是普通的${existing.isDirectory() ? '文件夹' : '文件'}、不是链接，没有动它。先看看里面是什么、挪走后再跑一次。`);
      continue;
    }
    if (pointsTo(link, target)) {
      console.log(`${linkRel} → ${targetRel}：已存在`);
      continue;
    }
    fs.unlinkSync(link); // 是链接但指到别处（多半是项目挪过位置），换成新的
    action = '已改正';
  }
  fs.mkdirSync(path.dirname(link), { recursive: true });
  if (process.platform === 'win32') fs.symlinkSync(target, link, 'junction');
  else fs.symlinkSync(path.relative(path.dirname(link), target), link, 'dir');
  if (!pointsTo(link, target)) {
    failures.push(`${linkRel} 建好了，但没有指到 ${targetRel}。`);
    continue;
  }
  console.log(`${linkRel} → ${targetRel}：${action}`);
}

if (failures.length) {
  for (const message of failures) console.error(message);
  process.exit(1);
}
