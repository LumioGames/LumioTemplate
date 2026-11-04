# Client（客户端）

{{暂定名}}的客户端。发布目标：{{发布目标}}。技术路线：Unity<!-- 如果：Unity 用 LGUI -->，界面用 LGUI 做好再导出到 Unity<!-- 结束 --><!-- 如果：Unity 不用 LGUI -->，界面用 Unity 自带的 UI<!-- 结束 -->。

## 放什么

<!-- 如果：Unity 先做原型 -->
- `app/`：LGUI 网页工程，先在这里做原型、在浏览器里验证玩法<!-- 如果：Unity 用 LGUI -->；界面和 TypeScript 写的游戏代码以后用 `lgui unity export` 导出到 `unity/`<!-- 结束 --><!-- 如果：Unity 不用 LGUI -->；原型只用来验证玩法，正式版在 `unity/` 里用 Unity 自带的 UI 重新做<!-- 结束 -->。
<!-- 结束 -->
<!-- 如果：Unity 不做原型 -->
<!-- 如果：Unity 用 LGUI -->
- `app/`：LGUI 工程，界面和 TypeScript 写的游戏代码在这里做，用 `lgui unity export` 导出到 `unity/`。
<!-- 结束 -->
<!-- 结束 -->
- `unity/`：Unity 工程<!-- 如果：Unity 先做原型 -->，玩法验证得差不多以后再建<!-- 结束 -->。游戏逻辑、场景、Unity 资源都在这里<!-- 如果：Unity 用 LGUI -->，也接收 LGUI 导出的界面和代码<!-- 结束 -->。
- 工程**现在都还没建**，见下面「怎么建工程」。

## 怎么建工程

初始化只建了这个目录和本文件。建工程是初始化之后的第一步<!-- 如果：Unity 先做原型 -->，按这个顺序：先网页原型，验证玩法后再转 Unity<!-- 结束 -->。

<!-- 如果：Unity 先做原型 -->
- **先建网页原型**：按 `.spec/knowledge/lumio-platform/lgui.md`「装 LGUI」装好，在仓库根目录跑 `lgui init Client/app --name {{英文短名}}`，在浏览器里把玩法做出来、试玩验证。
<!-- 结束 -->
<!-- 如果：Unity 用 LGUI -->
- **建 Unity 工程**<!-- 如果：Unity 先做原型 -->（玩法验证后）<!-- 结束 -->：LGUI 目前适配的是 **Unity 6000.6.x** 加 **PuerTS 3.0.3**（Core 和 V8 两个包都放进工程的 `Packages/`），具体步骤见 `lgui.md` 和 LGUI 仓库的 `plugin/references/unity.md`，这里不复述。在 `Client/unity/` 建工程，版本写进 `.spec/decisions/`。
<!-- 如果：Unity 不做原型 -->
- **建 LGUI 工程**：按 `lgui.md`「装 LGUI」装好，在仓库根目录跑 `lgui init Client/app --name {{英文短名}}`，界面在这里做。
<!-- 结束 -->
- **导出到 Unity**：在 `Client/app/` 里跑 `lgui unity export --to ../unity`，做法以 LGUI 仓库为准。
<!-- 结束 -->
<!-- 如果：Unity 不用 LGUI -->
- **建 Unity 工程**<!-- 如果：Unity 先做原型 -->（玩法验证后）<!-- 结束 -->：版本和用户一起定，写进 `.spec/decisions/`，在 `Client/unity/` 建工程；界面用 Unity 自带的 UI 做。
<!-- 结束 -->
- Unity 生成的 `Library/`、`Temp/`、`Logs/` 等目录要加进 `.gitignore`。
- 读配表：Unity 只打包 `Assets/` 下的文件，读不到仓根的 `Config/`。在 `Tools/` 里写一个导出脚本，把 `Config/` 复制到 `Client/unity/Assets/StreamingAssets/Config/`；复制出来的是生成物，不手改，登记进 `Tools/README.md`。
<!-- 如果：发布到 Lumio -->
- 发布到 Lumio：Lumio 收的是网页包（见 `.spec/knowledge/lumio-platform/publishing.md`），先确认这个 Unity 工程能导出成那样的网页包，再按 `sdk.md` 接 SDK、用 `node .spec/tools/lumio-pack.mjs` 打包，ZIP 输出到 `Builds/lumio-platform/`。
<!-- 结束 -->
- 把构建和测试命令补进 `.spec/AGENTS.md`「收口门槛」和 `.spec/knowledge/standards/testing.md`。

<!-- 如果：Unity 用 LGUI -->
以后更新 LGUI：先更新插件，再在 `Client/app/` 里跑 `lgui upgrade`，然后重新 `lgui unity export` 到 `Client/unity/`，见 `.spec/knowledge/lumio-platform/lgui.md`「更新 LGUI」。
<!-- 结束 -->

## 依赖

- 可以读 `Config/` 的配表和配置。
<!-- 如果：有 Server -->
- 和 `Server/` 只通过 `Config/` 里的协议对齐，不引用 `Server/` 的代码。
<!-- 结束 -->
- 不引用 `Tools/`。

## 不准做什么

- 数值不写死在代码里，放 `Config/`。
- 构建产物不放在这里，放 `Builds/`。
<!-- 如果：Unity 用 LGUI -->
- 不手改 LGUI 导出到 Unity 的文件，改 `app/` 里的界面再重新导出。
<!-- 结束 -->
