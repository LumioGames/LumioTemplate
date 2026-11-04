# Client（客户端）

{{暂定名}}的客户端。技术路线：Unity，界面推荐用 LGUI 做好再导出到 Unity。

## 放什么

- `unity/`：Unity 工程。游戏逻辑、场景、Unity 资源都在这里，也接收 LGUI 导出的界面（`lgui unity export`）。
- `app/`：LGUI 工程，用来做界面、在浏览器里预览和测试界面逻辑，做好后导出到 `unity/`。
- 两个工程**现在都还没建**，见下面「怎么建工程」。

## 怎么建工程

初始化只建了这个目录和本文件。建工程是初始化之后的第一步：

1. 装 Unity（版本建工程时和用户一起定，定下来写进 `.spec/decisions/`），在 `Client/unity/` 建工程。Unity 生成的 `Library/`、`Temp/`、`Logs/` 等目录要加进 `.gitignore`。
2. 装 LGUI：按 `.spec/knowledge/lumio-platform/lgui.md`「装 LGUI」，然后在仓库根目录跑 `lgui init Client/app --name {{英文短名}}`。导出到 Unity 的做法以 LGUI 仓库 README 为准。
<!-- 如果：发布到 Lumio -->
3. 发布到 Lumio：Lumio 收的是网页包（见 `.spec/knowledge/lumio-platform/publishing.md`），先确认这个 Unity 工程能导出成那样的网页包，再按 `sdk.md` 接 SDK、用 `Tools/lumio-pack.mjs` 打包，ZIP 输出到 `Builds/lumio/`。
<!-- 结束 -->
4. 把构建和测试命令补进 `.spec/AGENTS.md`「收口门槛」和 `.spec/knowledge/standards/testing.md`。

以后更新 LGUI：先更新插件，再在 `Client/app/` 里跑 `lgui upgrade`，然后重新 `lgui unity export` 到 `Client/unity/`，见 `.spec/knowledge/lumio-platform/lgui.md`「更新 LGUI」。

## 依赖

- 可以读 `Config/` 的配表和配置。
<!-- 如果：有 Server -->
- 和 `Server/` 只通过 `Config/` 里的协议对齐，不引用 `Server/` 的代码。
<!-- 结束 -->
- 不引用 `Tools/`。

## 不准做什么

- 数值不写死在代码里，放 `Config/`。
- 构建产物不放在这里，放 `Builds/`。
- 不手改 LGUI 导出到 Unity 的文件，改 `app/` 里的界面再重新导出。
