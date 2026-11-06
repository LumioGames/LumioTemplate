import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, realpathSync, lstatSync, symlinkSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const tools = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(tools, '..', '..');
const links = [['.claude/skills', '.spec/skills'], ['.claude/agents', '.spec/agents'], ['.agents/skills', '.spec/skills']];
function put(root, name, text) { const p = path.join(root, name); mkdirSync(path.dirname(p), { recursive: true }); writeFileSync(p, text); }
function run(script, args, opts = {}) { return spawnSync(process.execPath, [path.join(tools, script), ...args], { encoding: 'utf8', ...opts }); }
function project() {
  const root = mkdtempSync(path.join(tmpdir(), 'lumio-links-'));
  put(root, '.spec/skills/demo/SKILL.md', '---\nname: demo\n---\n');
  put(root, '.spec/agents/reviewer.md', '---\nname: reviewer\n---\n');
  return root;
}
function assertLinked(root) {
  for (const [link, target] of links) {
    assert.ok(lstatSync(path.join(root, link)).isSymbolicLink(), `${link} 应该是链接`);
    assert.equal(realpathSync(path.join(root, link)), realpathSync(path.join(root, target)));
  }
}

test('link-skills creates the three links, and a second run leaves them as they are', () => {
  const root = project();
  try {
    let result = run('link-skills.mjs', [root]);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.match(/已建/g)?.length, 3, result.stdout);
    assertLinked(root);
    result = run('link-skills.mjs', [root]);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.match(/已存在/g)?.length, 3, result.stdout);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('link-skills replaces a link that points somewhere else', () => {
  const root = project();
  try {
    mkdirSync(path.join(root, 'elsewhere'));
    mkdirSync(path.join(root, '.claude'));
    symlinkSync(path.join(root, 'elsewhere'), path.join(root, '.claude/skills'), process.platform === 'win32' ? 'junction' : 'dir');
    const result = run('link-skills.mjs', [root]);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /\.claude\/skills → \.spec\/skills：已改正/);
    assertLinked(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('link-skills refuses to touch a real folder and says why', () => {
  const root = project();
  try {
    put(root, '.claude/skills/mine/SKILL.md', 'user content');
    const result = run('link-skills.mjs', [root]);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /\.claude\/skills 已经存在，但它是普通的文件夹/);
    assert.ok(lstatSync(path.join(root, '.claude/skills/mine/SKILL.md')).isFile());
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('the links stay out of git: status is clean with the template .gitignore', () => {
  const root = project();
  const git = (...args) => spawnSync('git', ['-C', root, ...args], { encoding: 'utf8' });
  try {
    copyFileSync(path.join(repoRoot, '.gitignore'), path.join(root, '.gitignore'));
    assert.equal(git('init', '-q').status, 0);
    git('add', '-A');
    assert.equal(git('-c', 'user.name=t', '-c', 'user.email=t@example.com', 'commit', '-q', '-m', 'init').status, 0);
    assert.equal(run('link-skills.mjs', [root]).status, 0);
    mkdirSync(path.join(root, '.claude/worktrees/task-1'), { recursive: true });
    writeFileSync(path.join(root, '.claude/worktrees/task-1/file.txt'), 'x');
    assert.equal(git('status', '--porcelain').stdout, '');
    assert.equal(git('ls-files', '.claude', '.agents').stdout, '');
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('lgui.mjs forwards arguments and exit code to the newest complete plugin in the cache', () => {
  const home = mkdtempSync(path.join(tmpdir(), 'lumio-lgui-'));
  try {
    const cli = 'console.log(JSON.stringify({version: VERSION, args: process.argv.slice(2), cwd: process.cwd()})); process.exitCode = 3;';
    put(home, '.claude/plugins/cache/lumio-lgui/lgui/0.2.0/tools/lgui.mjs', cli.replace('VERSION', '"0.2.0"'));
    put(home, '.codex/plugins/cache/lumio-lgui/lgui/0.10.0/tools/lgui.mjs', cli.replace('VERSION', '"0.10.0"'));
    mkdirSync(path.join(home, '.claude/plugins/cache/lumio-lgui/lgui/0.11.0'), { recursive: true }); // 没装完整，跳过
    const app = path.join(home, 'app');
    mkdirSync(app);
    const env = { ...process.env, HOME: home, USERPROFILE: home }; delete env.LGUI_PLUGIN;
    const result = run('lgui.mjs', ['verify', '--size', 'phone-portrait'], { env, cwd: app });
    assert.equal(result.status, 3, result.stderr);
    const seen = JSON.parse(result.stdout);
    assert.equal(seen.version, '0.10.0');
    assert.deepEqual(seen.args, ['verify', '--size', 'phone-portrait']);
    assert.equal(realpathSync(seen.cwd), realpathSync(app));
  } finally { rmSync(home, { recursive: true, force: true }); }
});

test('lgui.mjs says how to install LGUI when no plugin is found', () => {
  const home = mkdtempSync(path.join(tmpdir(), 'lumio-lgui-'));
  try {
    const env = { ...process.env, HOME: home, USERPROFILE: home }; delete env.LGUI_PLUGIN;
    const result = run('lgui.mjs', ['check'], { env, cwd: home });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /找不到 LGUI 插件目录/);
  } finally { rmSync(home, { recursive: true, force: true }); }
});
