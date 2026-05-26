---
title: 'YTB2BILI：YouTube 视频一键搬运到 B站，AI 翻译配音全自动'
groupId: 'a1b2c3d4-3019-4f1e-9a2b-1c3d5e7f8a9b'
summary: 'YouTube 上好视频想搬到 B站？YTB2BILI 实现了一键下载、AI 生成中文字幕、自动配音、上传 B站的完整流水线。YouTube 创作者开拓中文市场的好帮手。'
date: 2026-05-25
---

跨平台内容搬运在 2026 年是一个持续存在的需求。很多优秀英文 YouTube 内容没有对应的中文版本，[YTB2BILI](https://github.com/difyz9/ytb2bili) 正是为填补这个空白而生的开源工具。


    ### 完整流水线

    
输入 YouTube 视频链接，YTB2BILI 自动执行：

    
**步骤 1：下载视频** → yt-dlp 下载最高画质版本

    **步骤 2：语音识别** → Whisper 识别英语/日语等语音，生成原始语言字幕

    **步骤 3：AI 翻译** → LLM API（ChatGPT/Claude/DeepSeek）翻译为中文，优化使其自然口语化

    **步骤 4：AI 配音（可选）** → TTS 引擎生成中文配音，替换原始音轨

    **步骤 5：压制字幕** → 翻译后的字幕烧录到视频中

    **步骤 6：自动上传** → B站 API 自动设置标题简介标签发布


    ### 实际案例

    
一位科技博主用 YTB2BILI 搬运国外编程教程：每周选 3-5 个优质英文教程 → 一键跑完翻译流水线 → 上传到自己 B站专栏。一个月 B站 账号增长 2 万粉丝。


    ### 版权提醒

    
搬运前请确保获得原作者授权，在简介中标注出处。建议只搬运自己创作的内容，或与原作者合作授权。


### 相关下载链接

- **YTB2BILI**：[https://github.com/difyz9/ytb2bili](https://github.com/difyz9/ytb2bili)
