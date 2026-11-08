import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const tools = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function put(root, name, text) { const p = path.join(root, name); mkdirSync(path.dirname(p), {recursive:true}); writeFileSync(p, text); }
function run(script, args, opts={}) { return spawnSync(process.execPath, [path.join(tools, script), ...args], {encoding:'utf8', ...opts}); }
for (const [label, nl] of [['LF','\n'], ['CRLF','\r\n']]) {
  test(`spec-lint accepts ${label} frontmatter and still rejects missing frontmatter`, () => {
    const root=mkdtempSync(path.join(tmpdir(),'lumio-lint-'));
    try {
      const fm=['---','name: sample','description: sample','metadata:','  type: doc','  status: 已交付','---','# Sample',''].join(nl);
      put(root,'.spec/knowledge/features/sample.md',fm);
      put(root,'.spec/knowledge/README.md','[sample](features/sample.md)\n');
      put(root,'CLAUDE.md','@.spec/AGENTS.md\n@.spec/knowledge/README.md\n');
      let result=run('spec-lint.mjs',[root]);
      assert.equal(result.status,0,result.stderr);
      put(root,'.spec/knowledge/features/sample.md','# No frontmatter\n');
      result=run('spec-lint.mjs',[root]);
      assert.notEqual(result.status,0);
      assert.match(result.stderr,/缺少 frontmatter/);
    } finally { rmSync(root,{recursive:true,force:true}); }
  });
}
test('web build skips an incomplete Claude cache and finds the installed Codex plugin', () => {
  const home=mkdtempSync(path.join(tmpdir(),'lumio-plugin-'));
  try {
    mkdirSync(path.join(home,'.claude/plugins/cache/lumio-lgui/lgui/0.2.0'),{recursive:true});
    const base='.codex/plugins/cache/lumio-lgui/lgui/0.3.0/tools/lib/';
    const files={
      'output.mjs':'export const toErrors = e => [{code:"LGUI-CLI-999",message:e.message}];',
      'paths.mjs':'export const buildDir = () => "";',
      'generate/fonts.mjs':'export const generateFonts = async () => [];',
      'project.mjs':'export const readProject = () => ({});',
      'vendor.mjs':'export const esbuild = () => ({});',
      'generate/index.mjs':'export const generateProjectTypes=()=>{}; export const generateWeb=()=>{}; export const uiProjectPath=()=>{};',
      'generate/model.mjs':'export const readUiModel=()=>{};',
      'generate/i18n.mjs':'export const generateTranslations=()=>{};',
      'dev/shell.html':'<html></html>',
      'dev/bundle.mjs':'export const bundleErrors=()=>{}; export const webBuildOptions=()=>{}; export const writeWebBootstrap=()=>{};',
    };
    for(const [name,content] of Object.entries(files)) put(home,base+name,content);
    const env={...process.env,HOME:home,USERPROFILE:home}; delete env.LGUI_PLUGIN;
    const result=run('lgui-build-web.mjs',[path.join(home,'missing-project')],{env,cwd:home});
    assert.notEqual(result.status,0);
    assert.match(result.stderr,/没有 lumio\.json/);
    assert.doesNotMatch(result.stderr,/ERR_MODULE_NOT_FOUND|LGUI-CLI-999/);
  } finally {rmSync(home,{recursive:true,force:true});}
});
