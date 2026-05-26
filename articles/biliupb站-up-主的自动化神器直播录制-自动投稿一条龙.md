---
title: 'Biliup：B站 UP 主的自动化神器，直播录制 + 自动投稿一条龙'
groupId: 'a1b2c3d4-3009-4f1e-9a2b-1c3d5e7f8a9b'
summary: '专为 B站 UP 主设计的开源工具，支持直播自动录制、B站自动投稿、多平台视频同步。开播即录、下播即停、自动上传，帮你省下大量重复劳动。'
date: 2026-05-25
---

如果你是一个 B站 UP 主，或者经常在 B站做直播，[Biliup](https://github.com/biliup/biliup) 可能是 2026 年最值得安装的工具。


    ### 三大核心功能

    
**直播自动录制：**设置好直播间 ID，Biliup 自动监控直播状态——开播即录，下播即停。再也不用担心忘记按录制按钮。

    
**自动投稿：**通过命令行自动上传视频到 B站，自动填写标题、简介、标签、分区、设置定时发布。批量上传效率提升惊人。

    
**多平台同步：**支持 YouTube/Twitch 内容自动同步到 B站，适合跨平台创作者。


    ### 实际场景

    
每周三晚 8 点在 B站直播，想录制直播内容以便后期剪辑：

    `biliup start --room-id 12345 --out-dir ./recordings`

    
Biliup 在后台运行，检测到开播自动开始录制，直播结束后自动保存为 MP4。你不需要守在电脑前。


    ### 自动投稿工作流

    
`biliup upload video.mp4 --title "新视频" --tid 171 --tags "教程"`

    
配合自动化流水线：直播回放 → 自动剪辑 → 自动投稿，全程无人值守。


    ### 配置要点

    
需配置 B站 Cookie 或 Token。建议使用小号操作，避免主账号被限流。Cookie 导出方法在 xiaoyuevideo 的 Cookie 管理文章中有详细介绍。


### 相关下载链接

- **Biliup**：[https://github.com/biliup/biliup](https://github.com/biliup/biliup)
