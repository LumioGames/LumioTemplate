# LumioTemplate

[![Made by LumioGames](https://img.shields.io/badge/made%20by-LumioGames-6659DB?style=flat-square&labelColor=171C34&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iOTYiIGhlaWdodD0iOTYiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzY2NTlkYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzlhYTZmZiIvPjwvbGluZWFyR3JhZGllbnQ%2BPC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMjkiIGZpbGw9InVybCgjZykiLz48cmVjdCB4PSIyNSIgeT0iMjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIyNSIgeT0iNDIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIyNSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSI0NSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjYiLz48cmVjdCB4PSI2NSIgeT0iNjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjQiIGZpbGw9IiM1ZGUyYzYiLz48cGF0aCBkPSJNNzAgMTlDNzEuNTYgMjguMSA3My45IDMwLjQ0IDgzIDMyQzczLjkgMzMuNTYgNzEuNTYgMzUuOSA3MCA0NUM2OC40NCAzNS45IDY2LjEgMzMuNTYgNTcgMzJDNjYuMSAzMC40NCA2OC40NCAyOC4xIDcwIDE5WiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPgo%3D)](https://lumiogames.cn/)
[![Use this template](https://img.shields.io/badge/Use%20this%20template-one%20click-6659DB?style=flat-square&labelColor=171C34)](https://github.com/LumioGames/LumioTemplate/generate)
[![node](https://img.shields.io/badge/node-%E2%89%A524.18-5DE2C6?style=flat-square&labelColor=171C34)](https://nodejs.org/)
[![license](https://img.shields.io/badge/license-PolyForm%20Shield%20%2B%20extra%20grant-AEB5D6?style=flat-square&labelColor=171C34)](#license)

[中文](README.md)

The Lumio game template: an empty repository for starting a web game on [Lumio](https://lumiogames.cn). It holds no game code: only rules for AI agents, Lumio platform knowledge, game design and art skills, and a packaging tool. Hand it to an agent (Claude Code, Codex, …). The agent asks what game you want to make, turns the repository into your project, installs dependencies, creates the game project, connects the Lumio SDK, and produces a ZIP you can upload as is.

## Three steps

1. **Make it your repository**: on GitHub, click **Use this template** → **Create a new repository**, then clone the new repository. (Cloning this one directly also works; the agent will help you change the remote.)
2. **Hand it to your agent**: open the folder in Claude Code or Codex and say:

   > Set up this Lumio game project for me

   The agent asks for the game's name, gameplay, orientation, and whether to build the UI with [LGUI](https://github.com/LumioGames/LGUI) or draw it yourself. It then renames, installs, creates the project, and runs it locally with the SDK simulator.
3. **Pack and upload**: ask the agent to pack the game (`npm run build && npm run pack` in the project), create the game in [Lumio Studio](https://lumiogames.cn/studio/games/new), upload the ZIP on the Versions page, and submit it for review.

You need Node.js 24.18 or later, Git, and an AI coding agent.

## Layout

| Path | Contents |
| --- | --- |
| `AGENTS.md` / `CLAUDE.md` | Agent entry point: first-time setup and everyday rules |
| `.spec/AGENTS.md` | Project hub: what the project is, layout, commands, skill list |
| `.spec/rules/system.md` | Hard rules: platform connection, packaging, accounts and data, docs |
| `.spec/knowledge/lumio/` | Lumio facts: SDK, `lumio.json` and packaging, LGUI, Vite projects, links |
| `.spec/decisions/` | Decision records (ADRs) |
| `.spec/skills/` | Skills for game design, art direction, planning, and subagent development |
| `tools/lumio-pack.mjs` | Packs a build folder into an uploadable ZIP after checking it against the platform's rules |
| `tools/lgui-build-web.mjs` | Production web build for LGUI projects (temporary, until LGUI ships a build command) |
| `game/` | Your game project, created by the agent during setup |

The rules and knowledge files are written in Chinese; agents read them fine and reply in your language.

## For AI agents

Start with [AGENTS.md](AGENTS.md). Lumio platform, SDK, and packaging facts are in `.spec/knowledge/lumio/`; hard rules are in `.spec/rules/system.md`.

Related repositories:

- [Lumio SDK](https://github.com/LumioGames/LumioSDK): docs and types for `@lumiogames/sdk`.
- [LGUI](https://github.com/LumioGames/LGUI): a game UI framework for agents.
- [Lumio DevKit](https://github.com/LumioGames/Lumio-DevKit): agent plugin for the Lumio engine (multiplayer, voxels, servers); not needed for web games.

## Community

Developer QQ group: [972220164](https://qm.qq.com/q/PGkXh4tCyQ)

## License

LumioTemplate is source-available under the [PolyForm Shield License 1.0.0](https://polyformproject.org/licenses/shield/1.0.0), with an Additional Permission and a Trademarks notice from LumioGames. The full text is in [LICENSE](LICENSE). In short:

| You may | You may not |
| :-- | :-- |
| Make your own game with the template: the game is yours, you may sell it, and you may publish it on platforms other than Lumio | Use the template or a changed version to build a competing game template, game development tool or game platform, paid or free |
| Use this template, fork, change and send pull requests; use it for learning, teaching and research | Republish the template itself under another name or skin |
| Say "made with LumioTemplate" or "published on Lumio" in your game | Use the Lumio or LumioGames names and logos as your own brand |

The skills in `.spec/skills/` keep their own licenses: the design and art skills are Apache-2.0, and writing-plans and subagent-driven-development, adapted from obra/superpowers, are MIT (see [.spec/skills/README.md](.spec/skills/README.md)). For any other use, contact us through the [Developer Center](https://lumiogames.cn/studio/) or the community group above for a separate license. The English text in LICENSE is what counts.
