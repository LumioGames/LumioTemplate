# Client（客户端）

{{暂定名}}的客户端。发布目标：{{发布目标}}。技术路线：网页，界面用 LGUI。

## 放什么

- `app/`：网页工程（LGUI 工程）。客户端代码、界面、客户端用到的资源都放在工程里。**现在还没建**，见下面「怎么建工程」。

## 怎么建工程

初始化只建了这个目录和本文件。建工程是初始化之后的第一步：

- 装 LGUI：按 `.spec/knowledge/lumio-platform/lgui.md`「装 LGUI」，Claude Code 和 Codex 各有安装命令；装完先跑 `lgui doctor`。
- 在仓库根目录跑 `lgui init Client/app --name {{英文短名}}`（`lgui init` 只接受不存在或空的目录）。工程里会带 LGUI 自己的 `AGENTS.md` / `CLAUDE.md`，在 `Client/app/` 里干活时也要遵守它们。
- 把常用命令写进 `Client/app/package.json` 的 `scripts`（照 `lgui.md`「建工程」那一段），以后在 `Client/app/` 里用 `npm run check`、`npm test`、`npm run verify`、`npm run dev`，其他命令用 `npm run lgui -- <命令>`，不用每次手写插件目录的长路径。它们经 `.spec/tools/lgui.mjs` 找到已装的 LGUI 插件；Node 刚装好、还不在 PATH 上时的跑法见 `.spec/knowledge/lumio-platform/environment.md`。
<!-- 如果：发布到 Lumio -->
- 接 Lumio：在 `Client/app/` 里装 SDK、加 Lumio Service、写 `lumio.json`，按 `lgui.md`「接 Lumio」和 `.spec/knowledge/lumio-platform/sdk.md`、`publishing.md`。正式构建和打包用 `node .spec/tools/lgui-build-web.mjs` 和 `node .spec/tools/lumio-pack.mjs`，ZIP 输出到 `Builds/lumio-platform/`。
<!-- 结束 -->
<!-- 如果：发布到网页 -->
- 网页正式构建（发到自己的网站等）：`node .spec/tools/lgui-build-web.mjs <工程目录> <输出目录>` 能指定输出目录，但它出的是 Lumio 用的网页包——工程里要有 `lumio.json`，入口页会引用 `./lumio-bootstrap.js`。发到 Lumio 以外的网站用的包，这个脚本现在做不到；建工程时和用户一起定做法（例如等 LGUI 出正式构建命令），定下来写进本文件，产物放 `Builds/web/`。
<!-- 结束 -->
- 把构建和测试命令（`lgui test`、`lgui verify` 等）补进 `.spec/AGENTS.md`「收口门槛」和 `.spec/knowledge/standards/testing.md`。

以后更新 LGUI：先更新插件，再在 `Client/app/` 里跑 `lgui upgrade`，见 `.spec/knowledge/lumio-platform/lgui.md`「更新 LGUI」。

不用 LGUI、自己画界面（Canvas、Phaser、PixiJS 等）时，按 `.spec/knowledge/lumio-platform/web-project.md` 建 Vite + TypeScript 工程，同样放在 `Client/app/`。

## 依赖

- 可以读 `Config/` 的配表和配置。
<!-- 如果：有 Server -->
- 和 `Server/` 只通过 `Config/` 里的协议对齐，不引用 `Server/` 的代码。
<!-- 结束 -->
- 不引用 `Tools/`。

## 不准做什么

- 数值不写死在代码里，放 `Config/`。
- 构建产物不放在这里，放 `Builds/`。
- 不手改 LGUI 生成的文件，改生成源再重新生成（哪些是生成物见 `.spec/knowledge/standards/code-style.md`「生成物」）。
- 不改工程里的 LGUI 框架副本（`Client/app/.lgui/framework/`）。框架有问题就报给 LGUI（https://github.com/LumioGames/LGUI/issues ），记进 bug 墙（归因「框架」），工程里先用不改框架的写法绕开；框架副本只由 `lgui init` / `lgui upgrade` 更新。
