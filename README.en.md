# LumioTemplate

[![Made by LumioGames](https://img.shields.io/badge/made%20by-LumioGames-6659DB?style=flat-square&labelColor=171C34&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iOTYiIGhlaWdodD0iOTYiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzY2NTlkYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzlhYTZmZiIvPjwvbGluZWFyR3JhZGllbnQ%2BPC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMjkiIGZpbGw9InVybCgjZykiLz48cmVjdCB4PSIyNSIgeT0iMjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIyNSIgeT0iNDIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIyNSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSI0NSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjYiLz48cmVjdCB4PSI2NSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiM1ZGUyYzYiLz48cGF0aCBkPSJNNzAgMTlDNzEuNTYgMjguMSA3My45IDMwLjQ0IDgzIDMyQzczLjkgMzMuNTYgNzEuNTYgMzUuOSA3MCA0NUM2OC40NCAzNS45IDY2LjEgMzMuNTYgNTcgMzJDNjYuMSAzMC40NCA2OC40NCAyOC4xIDcwIDE5WiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPgo%3D)](https://lumiogames.cn/)
[![Use this template](https://img.shields.io/badge/Use%20this%20template-one%20click-6659DB?style=flat-square&labelColor=171C34)](https://github.com/LumioGames/LumioTemplate/generate)
[![node](https://img.shields.io/badge/node-%E2%89%A524.18-5DE2C6?style=flat-square&labelColor=171C34)](https://nodejs.org/)
[![license](https://img.shields.io/badge/license-PolyForm%20Shield%20%2B%20extra%20grant-AEB5D6?style=flat-square&labelColor=171C34)](#license)

[中文](README.md)

The Lumio game template sets up the **layout and conventions** of a game project in one go. Hand it to an AI agent (Claude Code, Codex, …) and say "start". The agent asks a few questions, then generates module folders cut to fit your project (each with a README that says what goes in it, what it depends on and what it must not do) and a full set of conventions: project structure, workflow, code style, testing, project red lines, and the rules agents follow when they dispatch and review work.

Any engine works: web, Unity, UE and others. Publishing to [Lumio](https://lumiogames.cn) is the default. The template writes no game code, creates no engine project and installs no dependencies. Those come after setup, and the agent tells you how.

## Two ways to start

1. **Make a repository from the template**: on GitHub, click **Use this template** → **Create a new repository**, clone it, open the folder in Claude Code or Codex, and say:

   > start

   Cloning this repository directly also works; at the end of setup the agent asks whether to drop the template's remote and history.
2. **Let your agent clone it**: in any conversation, send the agent this repository's address and say "use LumioTemplate to start a game for me". The agent follows the "For AI agents" section below. If the current folder is empty, it clones the template right there and starts setup in the same conversation. Otherwise it asks for a folder name, clones into it, and asks you to open a new conversation in that folder and say "start".

Setup has two parts:

1. **Skeleton**: five questions (working title and a one-line idea, whether you write your own server code, web or Unity / UE, whether you publish to Lumio, team size and documentation language). Each comes with an example and a default; say "you decide" to take the default. The agent shows you the folder tree first and generates everything after you confirm. At this point the project is complete and usable.
   After generating, the agent asks one question: do you want to talk about gameplay or art now? You can also skip it and later say "let's decide the gameplay" or "let's decide the art direction".
2. **Wrap up**: delete the one-time setup skill, rewrite the README for your game, and make one local commit. The agent asks before pushing anywhere.

You need Git, Node.js 24.18 or later, and an AI coding agent.

## For AI agents

This section is for an AI agent that reads this README from outside the repository (for example, the user only sent a link). The user may not write code: explain each step in the user's language.

> **For AI agents: starting a game project with LumioTemplate**
>
> Do these in order. If any step fails, stop and show the user the exact error. Do not skip steps.
>
> 1. Run `git --version` and `node -v`: Git must be installed, and Node must be 24.18 or later. If either is missing, tell the user what to install and where to get it (Git: https://git-scm.com/downloads ; Node: https://nodejs.org , pick 24 LTS), ask the user to install it, and check again afterwards. Do not install it for the user.
> 2. **The current folder is empty** (`ls -A` prints nothing; in PowerShell, `Get-ChildItem -Force`): run `git clone https://github.com/LumioGames/LumioTemplate .`. Then carry on **in this same conversation**: read `AGENTS.md` and the files it lists, then start setup by following `.spec/skills/lumio-init/SKILL.md`. There is no need for a new conversation. This conversation does not load those files automatically, so read them yourself.
> 3. **The current folder is not empty**: ask the user what to call the project folder (lowercase letters, digits and hyphens, e.g. `star-hop`), run `git clone https://github.com/LumioGames/LumioTemplate <folder>`, then ask the user to open a new conversation in that folder and say "start". Do not set up the project in the current folder.
> 4. **The user wants their own GitHub repository**: before cloning in step 2 or 3, ask for the repository name and whether it should be public or private. With the user's consent, run `gh repo create <name> --template LumioGames/LumioTemplate --private` (or `--public`), wait a few seconds for GitHub to generate it, then clone **that new repository** in step 2 or 3 instead of the template. If `gh` is not installed or not signed in, ask the user to click Use this template on GitHub and send you the new repository's address. Ask the user before every outward action, such as pushing, creating a remote repository or publishing.

## What you get

For "single-player, web, published on Lumio", the project looks like this after setup:

```
my-game/
├─ Client/        Client. The web route later creates an LGUI project in Client/app (Unity also adds Client/unity)
├─ Config/        Data tables and shared config; protocols too if you write your own server
├─ Art/           Art sources: style exploration, references, image prompts
├─ Tools/         Dev tools, including the Lumio packaging tool
├─ Builds/        Build output; only its README is in git
├─ .spec/
│  ├─ AGENTS.md   Project hub: what it is, modules, closeout commands, skill list
│  ├─ LICENSE     LumioTemplate's license terms (moved here from the root during setup; the root is left for your game)
│  ├─ rules/      General red lines, dispatch and coding rules, this project's red lines
│  ├─ knowledge/  Conventions (structure, workflow, code style, testing, art), gameplay direction, Lumio platform facts
│  ├─ decisions/  Decision records (ADRs); the first one covers structure and tech route
│  ├─ skills/     Skills for design, planning, subagent dispatch, test-first, debugging, upkeep, framework updates, game design and art
│  ├─ agents/     Review subagent
│  └─ tools/      Structure lint, closeout grading, pre-commit check
├─ AGENTS.md      Agent entry point (points to the docs)
├─ CLAUDE.md      Claude Code entry point (auto-loads the core docs)
└─ README.md      Your game's README
```

You also get `Server/` if you write your own server code. Every module has a README; anything not yet confirmed with you is marked 「待完善」 (to be filled in).

## What's in the template

| Path | Contents |
| --- | --- |
| `AGENTS.md` / `CLAUDE.md` | Agent entry points: which docs to read first; Claude Code loads them through `CLAUDE.md` |
| `.spec/AGENTS.md` | Project hub, initially marked 「未初始化」 (not set up) |
| `.spec/rules/` | `system.md` general red lines, `dispatch.md` dispatch and coding rules, `project.md` project red lines (generated during setup) |
| `.spec/knowledge/` | Convention skeletons, a feature doc template, lessons, and `lumio-platform/`: SDK, `lumio.json` and packaging, LGUI, web projects, links |
| `.spec/decisions/`, `tasks/`, `plans/` | Formats for decision records, task cards and implementation plans |
| `.spec/skills/` | 14 standing skills (including `lumio-update` for framework updates), plus the one-time `lumio-init` (setup flow and templates, deleted at the end of setup) |
| `.spec/agents/reviewer.md` | Review subagent |
| `.spec/tools/` | `spec-lint.mjs` structure lint, `closeout-gate.mjs` closeout grading, `guard-commit.mjs` pre-commit check; `lumio-pack.mjs` and `lgui-build-web.mjs` move to `Tools/` or are deleted during setup, depending on your route |
| `.claude/`, `.agents/` | Symlinks into `.spec/` (so clients find the skills and the subagent), and Claude Code's pre-commit hook |
| `CHANGELOG.md` | Framework release notes (one tag per version); deleted at the end of setup |

The rules and knowledge files are written in Chinese; agents read them fine and reply in your language.

## Updating the framework

The general red lines, dispatch rules, skills, lint tools and Lumio platform facts in `.spec/` are **framework files**: your project does not edit them. Your own rules, conventions, gameplay docs and decisions are **project files** and belong to you. When the template ships a new version, say this to the agent in your project:

> update the framework

The agent uses the `lumio-update` skill. It fetches LumioTemplate's latest version tag and shows you the release notes since your version. It then replaces only the framework files, showing you a diff first for any you changed locally, runs the structure lint, and makes one local commit; it asks before pushing. It also checks whether LGUI or the Lumio SDK has a newer version, and only tells you. The current framework version is written in `.spec/skills/lumio-update/SKILL.md`.

## Supported agents

`.spec/` is the single source. Every client sees the same files, and no framework plugin needs to be installed.

| Capability | Claude Code | Codex | Other agents that read `AGENTS.md` |
| --- | --- | --- | --- |
| Core docs | `@import` in `CLAUDE.md`, loaded every session | Read on demand via `AGENTS.md` | Read on demand via `AGENTS.md` |
| Skills | `.claude/skills` symlink, discovered automatically | `.agents/skills` symlink, discovered automatically | Read from `.spec/skills/` as `AGENTS.md` says |
| Review subagent | `.claude/agents` symlink | None; the main agent reviews with `reviewer.md` itself | Same as Codex |
| Pre-commit check (reports only, never blocks) | `.claude/settings.json` hook | None; run it by hand as the rules say | None |

On Windows, if the symlinks come out as plain files, the first setup step rebuilds them with `mklink /J` (no administrator rights needed) and asks you to reopen the conversation.

## Related repositories

- [LumioAgentSpec](https://github.com/LumioGames/LumioAgentSpec): the source of the framework files (general red lines, dispatch rules, framework skills, lint tools). It is a general-purpose agent project management framework, not limited to games, and is still maintained on its own. This template holds a snapshot of its 1.1.1 release, adapted to live inside the repository with symlinks.
- [LGUI](https://github.com/LumioGames/LGUI): a game UI framework for agents, recommended for the UI on every route.
- [Lumio SDK](https://github.com/LumioGames/LumioSDK): docs and types for `@lumiogames/sdk`.

## Community

Developer QQ group: [972220164](https://qm.qq.com/q/PGkXh4tCyQ)

## License

LumioTemplate is source-available under the [PolyForm Shield License 1.0.0](https://polyformproject.org/licenses/shield/1.0.0), with an Additional Permission and a Trademarks notice from LumioGames. The full text is in [LICENSE](LICENSE). In short:

| You may | You may not |
| :-- | :-- |
| Make your own game with the template: the game is yours, you may sell it, and you may publish it on platforms other than Lumio | Use the template or a changed version to build a competing game template, game development tool or game platform, paid or free |
| Use this template, fork, change and send pull requests; use it for learning, teaching and research | Republish the template itself under another name or skin |
| Say "made with LumioTemplate" or "published on Lumio" in your game | Use the Lumio or LumioGames names and logos as your own brand |

The license covers the template's files and their copies, including the copies that remain in a project you set up from it (after setup the terms live in `.spec/LICENSE`); files you add to your own project are not covered. A few parts have their own licenses: the rules, subagent, lint tools and six framework skills taken from LumioAgentSpec are MIT (writing-plans and subagent-driven-development are also adapted from obra/superpowers, MIT as well); the seven design and art skills are Apache-2.0 (see [.spec/skills/README.md](.spec/skills/README.md)). For any other use, contact us through the [Developer Center](https://lumiogames.cn/studio/) or the community group above for a separate license. The English text in LICENSE is what counts.
