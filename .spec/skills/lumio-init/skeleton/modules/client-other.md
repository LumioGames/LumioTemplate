# Client（客户端）

{{暂定名}}的客户端。技术路线：{{技术路线}}。

## 放什么

- `<工程目录>/`：客户端工程，目录名建工程时和用户一起定，定下来补进本文件。游戏代码、界面、客户端资源都放在工程里。**现在还没建**，见下面「怎么建工程」。
- 界面推荐用 LGUI：能导出到目标引擎时直接用；不能时，可以在 `app/` 用 LGUI 做网页原型，先验证玩法和界面流程。

## 怎么建工程

初始化只建了这个目录和本文件。建工程是初始化之后的第一步：

- 和用户一起定引擎版本和工程目录名，写进 `.spec/decisions/`，再建工程；引擎生成的缓存和临时目录加进 `.gitignore`。
- 要用 LGUI 时：按 `.spec/knowledge/lumio-platform/lgui.md`「装 LGUI」安装，在仓库根目录跑 `lgui init Client/app --name {{英文短名}}`。
<!-- 如果：发布到 Lumio -->
- 发布到 Lumio：Lumio 收的是网页包（见 `.spec/knowledge/lumio-platform/publishing.md`），先确认工程能导出成那样的网页包，再按 `sdk.md` 接 SDK、用 `node .spec/tools/lumio-pack.mjs` 打包，ZIP 输出到 `Builds/lumio/`。
<!-- 结束 -->
- 把构建和测试命令补进 `.spec/AGENTS.md`「收口门槛」和 `.spec/knowledge/standards/testing.md`。

## 依赖

- 可以读 `Config/` 的配表和配置。
<!-- 如果：有 Server -->
- 和 `Server/` 只通过 `Config/` 里的协议对齐，不引用 `Server/` 的代码。
<!-- 结束 -->
- 不引用 `Tools/`。

## 不准做什么

- 数值不写死在代码里，放 `Config/`。
- 构建产物不放在这里，放 `Builds/`。
