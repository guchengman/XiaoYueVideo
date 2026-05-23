# Claude Code 会话检查点
最后更新：2026-05-23

## 1. 项目上下文
- 项目名称：xiaoyuevideo — 视频下载工具站
- 技术栈：Nuxt 3 + Vue 3 + TypeScript + Pinia + iconify
- 当前分支：master
- 工作目录：`D:\OPC\videos\xiaoyuevideo\`

## 2. 已完成的任务
- [x] 平台特定下载器架构重构（server/downloaders/）
- [x] TikTok 下载支持（yt-dlp + format selector 确保音频）
- [x] 抖音短链接解析支持
- [x] 快手解析器 + 微博短链接支持
- [x] 微博 CDN 下载添加 Referer 头修复
- [x] Cookie 管理系统（上传/管理/持久化）
- [x] 服务端音频下载（platform headers）
- [x] VIP 解析器管理（vip-parsers.ts）
- [x] CodeGraph 代码索引（@colbymchenry/codegraph, 86 文件 592 nodes）
- [x] gstack 技能安装配置（telemetry + proactive + routing rules）
- [x] CLAUDE.md 新增 gstack skill routing rules
- [x] CLAUDE.md 新增 Checkpoint 纪律规则
- [x] CLAUDE_CHECKPOINT.md 创建并填充实际项目信息

## 3. 当前正在做的事情
- 有未提交的组件/页面变更（BlogList, CookieManager, Header, VideoInput 等）
- CodeGraph query 探索项目核心函数（download/parse 系列）
- 评估 `detectBestParser`（utils/vip-parsers.ts:106）的处理方式

## 4. 关键文件清单
| 文件路径 | 作用 | 当前状态 |
|---------|------|---------|
| server/downloaders/_shared.ts | 下载器共享逻辑 (downloadM3u8ToMp4) | 已完成 |
| server/downloaders/tiktok.ts | TikTok 下载器 | 已完成 |
| server/downloaders/index.ts | 下载器注册入口 | 已完成 |
| server/api/parse.post.ts | 视频解析 API | 已完成 |
| server/api/download.get.ts | 下载 API | 修改中 |
| server/api/download.post.ts | 下载提交 API | 已完成 |
| server/utils/download-state.ts | 下载状态管理 (DownloadJob) | 已完成 |
| stores/video.ts | Pinia 状态管理 (useVideoStore) | 已完成 |
| components/VideoInput.vue | 视频输入组件 (downloadVideo) | 修改中 |
| utils/vip-parsers.ts | VIP 解析器工具函数 | 已完成 |
| utils/platform.ts | 平台工具函数 | 已完成 |
| CLAUDE.md | 项目指令 + routing rules + checkpoint 纪律 | 已完成 |
| CLAUDE_CHECKPOINT.md | 会话检查点 | 本次更新 |

## 5. 未解决的问题 / 待决策事项
- `detectBestParser` 函数定义了但未被调用 — 清理还是替换现有逻辑？
- CodeGraph MCP server 是否要启动以增强代码导航？
- 部分脚本（scripts/）需要 Cookie 文件才能正常工作

## 6. 关键决策记录
- 选择 Nuxt 3 而非纯 Vue SPA：利用 SSR + 文件路由，减少手动配置
- 下载器采用 platform-specific 架构而非统一接口：各平台差异太大（协议、认证、反爬）
- yt-dlp 做主流平台下载，自定义 Python 脚本处理小众/反爬平台
- Cookie 统一存放在 cookies/ 目录，按 {platform}_cookies.txt 命名
- 引入 CLAUDE_CHECKPOINT.md 会话检查点机制，按 checkpoint 纪律维护进度

## 7. 下一步计划
1. 完成当前未提交的组件修改
2. 构建验证（npm run build）确保无报错
3. 决定 CodeGraph MCP server 是否启用
4. 处理 `detectBestParser` 未使用问题
