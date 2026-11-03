# Lumio Game Starter

[中文](README.md)

An empty repository for starting a web game on [Lumio](https://lumiogames.cn). It holds no game code: only rules for AI agents, Lumio platform knowledge, game design and art skills, and a packaging tool. Hand it to an agent (Claude Code, Codex, …). The agent asks what game you want to make, turns the repository into your project, installs dependencies, creates the game project, connects the Lumio SDK, and produces a ZIP you can upload as is.

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

- [Lumio SDK](https://github.com/LumioGames/lumio-sdk): docs and types for `@lumiogames/sdk`.
- [LGUI](https://github.com/LumioGames/LGUI): a game UI framework for agents.
- [Lumio DevKit](https://github.com/LumioGames/Lumio-DevKit): agent plugin for the Lumio engine (multiplayer, voxels, servers); not needed for web games.

## Community

Developer QQ group: 972220164
