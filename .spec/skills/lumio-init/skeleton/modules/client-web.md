# Client（客户端）

{{暂定名}}的客户端。技术路线：网页，界面用 LGUI。

## 放什么

- `app/`：网页工程（LGUI 工程）。客户端代码、界面、客户端用到的资源都放在工程里。**现在还没建**，见下面「怎么建工程」。

## 怎么建工程

初始化只建了这个目录和本文件。建工程是初始化之后的第一步：

1. 装 LGUI：按 `.spec/knowledge/lumio-platform/lgui.md`「装 LGUI」，Claude Code 和 Codex 各有安装命令；装完先跑 `lgui doctor`。
2. 在仓库根目录跑 `lgui init Client/app --name {{英文短名}}`（`lgui init` 只接受不存在或空的目录）。工程里会带 LGUI 自己的 `AGENTS.md` / `CLAUDE.md`，在 `Client/app/` 里干活时也要遵守它们。
<!-- 如果：发布到 Lumio -->
3. 接 Lumio：在 `Client/app/` 里装 SDK、加 Lumio Service、写 `lumio.json`，按 `lgui.md`「接 Lumio」和 `.spec/knowledge/lumio-platform/sdk.md`、`publishing.md`。正式构建和打包用 `Tools/lgui-build-web.mjs` 和 `Tools/lumio-pack.mjs`，ZIP 输出到 `Builds/lumio/`。
<!-- 结束 -->
<!-- 如果：不发布到 Lumio -->
3. 正式构建用 `Tools/lgui-build-web.mjs`，输出到 `Builds/web/`。
<!-- 结束 -->
4. 把构建和测试命令（`lgui test`、`lgui verify` 等）补进 `.spec/AGENTS.md`「收口门槛」和 `.spec/knowledge/standards/testing.md`。

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
- 不手改 LGUI 生成的文件，改生成源再重新生成。
