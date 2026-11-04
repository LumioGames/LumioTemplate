# Client（客户端）

{{暂定名}}的客户端。技术路线：Unreal Engine（UE）。

## 放什么

- `unreal/`：UE 工程。游戏逻辑、关卡、UE 资源都在这里。
- `app/`（可选）：网页原型。UE 没有 LGUI 后端，界面不能从 LGUI 导出到 UE；但可以先用 LGUI 在网页里做一个原型，验证玩法和界面流程。
- 工程**现在都还没建**，见下面「怎么建工程」。

## 怎么建工程

初始化只建了这个目录和本文件。建工程是初始化之后的第一步：

1. 装 UE（版本建工程时和用户一起定，定下来写进 `.spec/decisions/`），在 `Client/unreal/` 建工程。UE 生成的 `Binaries/`、`Intermediate/`、`Saved/`、`DerivedDataCache/` 等目录要加进 `.gitignore`；大文件考虑用 Git LFS。
2. 想先做网页原型：装 LGUI（按 `.spec/knowledge/lumio-platform/lgui.md`「装 LGUI」），在仓库根目录跑 `lgui init Client/app --name {{英文短名}}`。原型只用来验证玩法，不是正式客户端。
<!-- 如果：发布到 Lumio -->
3. 发布到 Lumio：Lumio 收的是网页包（见 `.spec/knowledge/lumio-platform/publishing.md`）。UE 工程能不能导出成那样的网页包，建工程时先确认；确认不了时，可以先把网页原型发到 Lumio，ZIP 用 `node .spec/tools/lumio-pack.mjs` 打，输出到 `Builds/lumio/`。
<!-- 结束 -->
4. 把构建和测试命令补进 `.spec/AGENTS.md`「收口门槛」和 `.spec/knowledge/standards/testing.md`。

## 依赖

- 可以读 `Config/` 的配表和配置。
<!-- 如果：有 Server -->
- 和 `Server/` 只通过 `Config/` 里的协议对齐，不引用 `Server/` 的代码。
<!-- 结束 -->
- 不引用 `Tools/`。

## 不准做什么

- 数值不写死在代码里，放 `Config/`。
- 构建产物不放在这里，放 `Builds/`。
