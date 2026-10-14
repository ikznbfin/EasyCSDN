<br><br>

<center><div align="center">

<img src="/assets/EasyCSDN.png" width="750"></img>

<br>

<img alt="version" src="https://img.shields.io/badge/版本-34.1-7B68EE?style=for-the-badge&label=%E7%89%88%E6%9C%AC&logo=velog&logoColor=BE95FF"></img>
<img alt="stars" src="https://img.shields.io/github/stars/ikznbfin/EasyCSDN?style=for-the-badge&label=Stars&logo=undertale&logoColor=red&color=orange"></img>
<img alt="forks" src="https://img.shields.io/github/forks/ikznbfin/EasyCSDN?style=for-the-badge&label=Forks&logo=stackshare&logoColor=green&color=0AC18E"></img>
<img alt="javascript" src="https://img.shields.io/badge/JavaScript-%3E%3DES13-green?style=for-the-badge&label=JavaScript&logo=JavaScript&color=FDEE21"></img>
<img alt="license" src="https://img.shields.io/badge/License-GPL--2.0--only-blue?style=for-the-badge"></img>

</div></center>

<br>

## 项目简介

EasyCSDN 是一款让 CSDN 文章页变得极致简洁高效的 Tampermonkey 油猴脚本：隐藏登录弹窗、顶栏、侧边栏、推荐流等一切干扰元素，文章正文全屏居中展示，支持一键临时查看推荐、自动展开代码块、净化 URL 追踪参数。

本仓库是 [xcanwin/EasyCSDN](https://github.com/xcanwin/EasyCSDN) 的 fork。上游已三年未更新，CSDN 页面结构大改后原版部分功能失效，本 fork 针对新版页面做了适配维护（见[更新日志](#更新日志)）。

## 效果对比

| 对比 | 截图 |
| --- | --- |
| 使用前 | <img src="/assets/csdn-before.png" width="750"></img> |
| 使用后 | <img src="/assets/csdn-after.png" width="750"></img> |

> 截图取自原版 README，仅供示意，实际效果以新版页面为准。

## 功能

| # | 功能 | 说明 |
| --- | --- | --- |
| 1 | 净化页面 | 隐藏置顶登录提示/权益弹窗、顶部菜单栏、左右侧边栏、右侧磁吸工具栏、底部网站介绍、打分弹窗、分类标签、专栏推广、技能树、代码块"登录复制"按钮等 |
| 2 | 展示全屏 | 正文居中、图片居中并限制最大宽度、隐藏背景，还你一个干净的阅读区 |
| 3 | 显示推荐 | 默认隐藏底部推荐文章，点击页面最底部的灰色条可临时展开查看 |
| 4 | 展开代码 | 代码块高度小于阈值时自动点击展开（新版 CSDN 代码块默认已展开，此逻辑保留做兼容） |
| 5 | 阅读全文 | 去掉"阅读全文"折叠限制，直接看全文（新版 CSDN 已默认展开全文，样式保留做兼容） |
| 6 | 净化 URL | 自动去掉文章链接 `?` 后面的追踪参数，保护隐私 |
| 7 | 拦截推荐请求 | 拦截 `redisdatarecall.csdn.net/recommend/` 的推荐接口请求，减少干扰 |

复制文本不受限请配合作者的另一个项目 [Unlimit-Web](https://github.com/xcanwin/Unlimit-Web/)。

## 安装

1. 浏览器安装 [Tampermonkey](https://www.tampermonkey.net/) 扩展；
2. 点击下面的安装链接，按提示安装脚本：

👉 [点击安装 EasyCSDN v34.1](https://raw.githubusercontent.com/ikznbfin/EasyCSDN/main/EasyCSDN.user.js)

3. 打开任意 CSDN 文章页（`blog.csdn.net/*/article/details/*`）即可生效，无需任何配置。

## 常见问题

**脚本装了但完全没效果？**

Chrome 138+ 新增了限制：先到 `chrome://extensions` → 找到 Tampermonkey → 点"详情" → 打开**"允许用户脚本"**开关。不开这个，Tampermonkey 无法执行任何脚本，表现为装了跟没装一样。

## 更新日志

### v34.1（2026-10-14）
- 修复 `@downloadURL` / `@updateURL` 仍指向上游 GreasyFork 的问题，改为本 fork 的 raw 地址，Tampermonkey 检查更新不再被下回旧版

### v34.0（2026-10-14）
去广告力度加强，新增一整组隐藏规则：
- 广告位：文中伪装成推荐的 `#dmp_ad_58`、鲲鹏广告平台所有 iframe（右侧两个 300x600 横幅）、万维广告联盟（`wwads` 全套）、推荐流里的"百度推广"条目、左侧栏 VIP 横幅
- 推广/弹窗：右边缘"送 VIP"竖条、DeepSeek 体验胶囊、VIP 限时优惠弹窗及遮罩、会员新人礼包气泡、客服悬浮按钮
- AI 相关：文章顶部"AI 摘要"框、代码块"AI 写代码"外链按钮（如需保留 AI 摘要可反馈恢复）
- 文章末尾渐隐遮罩（`.article-end` 的 mask 效果）一并去掉

### v33.0（2026-10-14）
- 适配新版 CSDN 页面：顶部菜单栏 id 由 `#toolbarBox` 改为 `#toolBarBox`，重新可隐藏
- 修复致命 bug：新版页面移除了 `.article-type-img`，`beautyLOGO()` 空指针导致整个 `onload` 链崩溃（展开代码、显示推荐全部失效），现已加保护
- `window.onload` 改为 `addEventListener`，不再覆盖页面自身的加载处理器
- `showRecommend()` / `hookXHR()` 增加防御性判断，元素缺失时静默跳过

### v32.0 及之前
上游 [xcanwin/EasyCSDN](https://github.com/xcanwin/EasyCSDN) 原始版本。

## 致谢

- 原作者 [xcanwin](https://github.com/xcanwin/EasyCSDN)，本项目基于其 GPL-2.0-only 开源作品维护。

## License

GPL-2.0-only，见 [LICENSE](./LICENSE)。
