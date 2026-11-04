# Tools（开发工具）

{{暂定名}}的开发工具：打包、检查、数据转换等脚本。工具只在开发时用，产品代码不引用这里。

## 现有工具

| 工具 | 做什么 | 用法 |
| --- | --- | --- |
<!-- 如果：发布到 Lumio -->
| `lumio-pack.mjs` | 把构建好的网页目录打成能直接在 Lumio 创作中心上传的 ZIP，打包前先按平台规则检查 | `node Tools/lumio-pack.mjs <构建目录> Builds/lumio/{{英文短名}}.zip`，规则见 `.spec/knowledge/lumio-platform/publishing.md` |
<!-- 结束 -->
<!-- 如果：网页 -->
| `lgui-build-web.mjs` | 过渡脚本：LGUI 还没有网页正式构建命令，用它把 LGUI 工程打成静态网页 | `node Tools/lgui-build-web.mjs Client/app <输出目录>`，见 `.spec/knowledge/lumio-platform/lgui.md`。LGUI 有了构建命令后删掉 |
<!-- 结束 -->
<!-- 生成时：上表一行工具都没有（不发布到 Lumio，也不是网页路线），就把整张表换成「（还没有工具。）」 -->

结构检查等框架工具在 `.spec/tools/`，不放这里。

## 依赖

- 可以读写各模块的文件（比如把 `Config/` 的表格导出成 JSON、把构建目录打成 ZIP）。
- 产品代码（`Client/`<!-- 如果：有 Server -->、`Server/`<!-- 结束 -->）不引用这里。

## 不准做什么

- 加新工具时在上面的表里登记一行，不放没人知道的脚本。
- 不在工具里写死本机路径或密钥。
