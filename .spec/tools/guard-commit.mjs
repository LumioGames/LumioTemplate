#!/usr/bin/env node
/**
 * PreToolUse(Bash) hook —— git commit 前跑 `.spec/tools/spec-lint.mjs`,只提示、不阻断。
 * LumioTemplate 的框架文件,取自 LumioAgentSpec 1.1.1,改成「lint 只报告不阻断,红是待办」
 * (见 .spec/rules/system.md「工程」)。由 .claude/settings.json 调用。
 *
 * lint 不过时把问题清单交给 Agent 看,提交照常进行;本脚本任何情况下都不返回阻断退出码(2)。
 *
 * 判定要点:先剥掉引号与 heredoc 正文再匹配。旧版内联脚本直接在原始命令文本上
 * 跑正则,导致「写一个正文含 git commit 字样的文件」这类操作被误判。
 * 已知取舍:`bash -c "git commit"` 这类把真命令藏在引号里的写法会漏判——
 * 相比每天都会踩到的误报,这个边角更可接受。
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const LINT_REL = join('.spec', 'tools', 'spec-lint.mjs')

/**
 * 要检查的仓库:从钩子输入的 cwd 往上找第一个带 .spec/tools/spec-lint.mjs 的目录
 * (在 git worktree 里提交时检查的是该 worktree),找不到就用本脚本所在的仓库。
 */
export function resolveRoot(cwd) {
  if (typeof cwd === 'string' && cwd) {
    let dir = resolve(cwd)
    for (;;) {
      if (existsSync(join(dir, LINT_REL))) return dir
      const parent = dirname(dir)
      if (parent === dir) break
      dir = parent
    }
  }
  return resolve(HERE, '..', '..')
}

/** 命令里是否存在一段真正要执行的 git commit。 */
export function isGitCommit(command) {
  if (typeof command !== 'string' || !command.trim()) return false
  const stripped = command
    .replace(/<<-?\s*(['"]?)(\w+)\1[\s\S]*?^\s*\2\s*$/gm, ' ') // heredoc 正文
    .replace(/'[^']*'/g, ' ')
    .replace(/"[^"]*"/g, ' ')
  return stripped
    .split(/[;&|\n]+/)
    .some((segment) =>
      // 允许 env 前缀与 git 自身的选项(如 -C <path>),但 commit 必须是独立的子命令词,
      // 以免 commit-tree 之类被误判。
      /^\s*(?:\w+=\S+\s+)*git\b(?:\s+-C\s+\S+|\s+-[-\w]+(?:=\S+)?)*\s+commit(?![\w-])/.test(segment),
    )
}

/** 把 lint 报告交给 Agent:作为 PreToolUse 的附加上下文输出,不做放行 / 拒绝决定。 */
export function lintReport(output) {
  const text =
    'spec-lint 报告了以下问题(只提示,提交照常进行;按 .spec/rules/system.md,红是待办,记下来尽快修):\n' +
    output.trim()
  return JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: text },
    systemMessage: text,
  })
}

function main() {
  let raw = ''
  process.stdin.on('data', (chunk) => (raw += chunk))
  process.stdin.on('end', () => {
    let input = {}
    try {
      input = JSON.parse(raw) ?? {}
    } catch {
      process.exit(0) // 读不懂输入就放行,守卫不该反过来卡住正常工作
    }
    const command = (input.tool_input ?? {}).command ?? ''
    if (!isGitCommit(command)) process.exit(0)
    const root = resolveRoot(input.cwd)
    const lint = join(root, LINT_REL)
    if (!existsSync(lint)) process.exit(0)

    try {
      execFileSync(process.execPath, [lint, root], { stdio: 'pipe' })
    } catch (error) {
      process.stdout.write(lintReport(String(error.stdout ?? '') + String(error.stderr ?? '')))
    }
    process.exit(0)
  })
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main()
