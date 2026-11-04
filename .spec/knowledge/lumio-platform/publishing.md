---
name: lumio-platform-publishing
description: lumio.json 声明、ZIP 打包规则和两种发布方式（自己上传 ZIP、用作者 API 密钥发布）——打包发布或被拒收时查
metadata:
  type: standard
  status: 已交付
---

# 打包与上传

规则核对自平台的上传检查代码（2026-11-03）。以创作中心上传后的检查结果为准。

## lumio.json

放在客户端工程里（网页路线是 `Client/app/`），构建时原样复制到构建目录根部。最小写法（云存档 + 排行榜）：

```json
{
  "entry": "index.html",
  "engine": false,
  "capabilities": ["identity.basic", "save", "data", "leaderboard"],
  "data": {
    "fields": {
      "bestScore": {
        "type": "int",
        "min": 0,
        "max": 999999,
        "writer": "player",
        "visibility": "public",
        "leaderboard": { "order": "desc", "maxSubmitPerMinute": 6 }
      }
    },
    "slots": {
      "progress": { "maxBytes": 32768, "maxKeys": 128, "maxDepth": 6, "writer": "player", "visibility": "self" }
    }
  }
}
```

| 字段 | 规则 |
| --- | --- |
| `entry` | 必填。包内入口 HTML 的相对路径，以 `.html` 或 `.htm` 结尾，文件必须真实存在 |
| `engine` | 必填。网页游戏写 `false`（`true` 是 Lumio 引擎游戏） |
| `capabilities` | 用到的能力名，见 [sdk.md](sdk.md)。可写：`identity.basic`、`identity.profile`、`save`、`data`、`leaderboard`、`achievement`、`chat.game` |
| `data.fields` | 游戏字段。上榜字段要有 `min` / `max` 和 `leaderboard.maxSubmitPerMinute`；排行榜名是 `stats.<字段名>` |
| `data.slots` | 云存档槽，写清大小、键数、深度上限，`writer: "player"`，`visibility: "self"` |
| `achievements` | 成就，如 `{ "first_win": { "writer": "player" } }` |
| `network.connect` | 游戏要访问的外部地址，只写精确的 `https://` 或 `wss://` 来源，不写通配、不写平台域名 |
| `locales` / `defaultLocale` | 可选，取 `zh-CN`、`en` |
| `sdk` | 旧写法的能力数组，**不是** SDK 版本号，新游戏不用 |

不认识的顶层字段会被拒收。不要写 `ds`、`multiplayer`（联机不对第三方开放，且要求 `engine: true`）。

## 入口页和平台启动脚本

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <title>游戏名</title>
  <script src="./lumio-bootstrap.js"></script>
</head>
<body>…</body>
</html>
```

- `lumio-bootstrap.js` 是平台启动脚本：平台在上线时把它放到包根目录，加载页借它显示下载进度、上报页面报错，页面一加载就算游戏已启动。引用是可选的；本模板建议引用，原因见 [sdk.md](sdk.md)。
- 它是平台保留的路径：**ZIP 里不能放这个文件**。也不要让构建工具把它打进业务脚本（Vite 会提示无法打包这个外部脚本，保留原样即可）。
- 路径从入口所在目录回到包根：入口是 `index.html` 用 `./lumio-bootstrap.js`，`nested/index.html` 用 `../lumio-bootstrap.js`。不要写 `/lumio-bootstrap.js`。
- 本地开发时这个文件不存在，浏览器控制台有一条 404，正常。

## ZIP 规则

| 规则 | 说明 |
| --- | --- |
| 包根直接是入口 HTML 和 `lumio.json` | 不要多套一层项目文件夹（会报 `package_wrapped`） |
| 资源路径用相对路径 | 游戏在平台上的地址是 `https://<作品号>.lumiogame.com/<版本>/index.html`，以 `/` 开头的路径会找不到 |
| 只放构建产物 | 不放源码、`node_modules` |
| 不放 `lumio-bootstrap.js` | 平台保留路径 |
| 文件名 | 只用字母、数字、中文和 `_ . - ( ) @ , '` 及空格；不能有 `..`、反斜杠、隐藏文件；大小写不同的同名文件算重复 |
| 不能有符号链接、加密条目 | ZIP64 也不支持 |
| 大小 | 平台按配置限制总大小和文件数；包超过 50 MB 时创作中心会提示，尽量压小 |

打包工具：`node .spec/tools/lumio-pack.mjs <构建目录> <输出.zip>`（框架文件，随框架更新），ZIP 默认输出到 `Builds/lumio-platform/`。它先查上面几条（`lumio.json`、入口、保留文件、绝对路径、文件名），有问题直接报错，再生成平台能读的 ZIP（UTF-8 文件名、deflate 压缩）。不要用 Windows 资源管理器或 PowerShell 的 `Compress-Archive` 打包。

## 发布：两种方式

两种方式都先把游戏正式构建好，用 `.spec/tools/lumio-pack.mjs` 打成 ZIP，放在 `Builds/lumio-platform/`。之后让用户选：

- **A. 用户自己上传**：Agent 只打包，上传和提交审核由用户在创作中心点。
- **B. 用作者 API 密钥发布**：用户建好作者 API 密钥、自己设进环境变量后，Agent 用 API 完成创建作品、上传、填资料、提交审核和确认上线。

两种方式都要先登录 https://lumiogames.cn/studio 完成作者申请。上传成功、提交成功都不等于已上线，以创作中心显示的线上版本为准。

### A. 打 ZIP，用户自己上传

1. Agent 构建并打包，把 ZIP 的路径（`Builds/lumio-platform/<英文短名>.zip`）告诉用户。
2. 用户到 https://lumiogames.cn/studio/games/new 创建作品，填写标题、介绍、封面。
3. 在作品的「版本」页选择 ZIP，填写版本号（主、次、修订）和更新说明，点「上传版本」。
4. 等上传和包检查完成，选中生成的草稿版本，点「提交审核」。
5. 在版本记录里看审核结果和整改提示；要改就重新打包、上传新版本。

### B. 用作者 API 密钥发布

流程和请求细节以 [LumioSDK README「用 API 密钥发布」](https://github.com/LumioGames/LumioSDK#%E7%94%A8-api-%E5%AF%86%E9%92%A5%E5%8F%91%E5%B8%83) 和平台文档 [author-api.md](https://lumiogames.cn/assets/studio/docs/author-api.md) 为准，每次发布前照它们做。要点：

1. **密钥由用户自己建、自己放。** 用户在创作中心的[作者 API 密钥](https://lumiogames.cn/studio/settings/credentials)页新建密钥（权限和作品范围按 LumioSDK README 的要求选），格式是 `lmo_api_…`，只显示一次。请用户自己在终端里把它设成环境变量，本模板约定变量名是 `LUMIO_API_KEY`。
2. **密钥只放在环境变量里。** Agent 只从环境变量读；不让用户把密钥贴进对话，不写进代码、配置文件、仓库或 ZIP，不放在命令行参数里，不出现在日志和截图里。环境变量没设好就停下，请用户设好再来。
3. **请求顺序**（同一把密钥）：首次发布先创建作品；然后申请上传 → 用回执里的地址上传 ZIP → 完成上传 → 等平台处理完 → 修改资料（首次发布必须有一句话介绍、分类、横竖屏和封面）→ 提交审核 → 查审核结果 → 确认上线。更新已有作品不要新建作品，从申请上传开始，版本号要比上一版大。
4. **对外操作先问用户。** 创建作品、修改公开资料、提交审核之前，把要用的标题、版本号、更新说明和资料给用户看，用户同意再发。
5. **出错按 LumioSDK README「出错时」处理。** 不在那张表里的失败，或审核结果不是通过，就停下，把 `gameKey`、`uploadId`、`versionId`、`requestId` 告诉用户，不自动重试。

## 常见拒收原因

| 提示里的原因 | 怎么改 |
| --- | --- |
| `lumio_json_missing` | 构建目录根部没有 `lumio.json` |
| `package_wrapped` | ZIP 多套了一层文件夹 |
| `entry` / `entry_missing` | `entry` 不是 `.html`，或包里没有这个文件 |
| `declaration_schema` | `lumio.json` 有不认识的字段或类型不对 |
| `declaration.data_invalid` | `data.fields` / `data.slots` 写得不对，按上面的最小写法改 |
| `network_origin` | `network.connect` 用了通配、平台域名或非 https/wss |
| `entry_encoding` | 入口 HTML 不是 UTF-8 |
