---
title: 'Social Auto Upload：GitHub 上最火的多平台一键分发工具'
groupId: 'a1b2c3d4-3007-4f1e-9a2b-1c3d5e7f8a9b'
summary: '做好的视频要同时发到抖音、B站、小红书、快手和视频号？这个开源项目可以在命令行一键分发，支持定时发布、多账号管理、批量上传。'
date: 2026-05-25
---

内容创作者最头疼的事情之一：做一个视频 2 小时，分发到 5 个平台又要 30 分钟——每个平台都要手动上传、填标题标签、选封面。Social Auto Upload 就是为了解决这个问题而生的。


    ### 一句话介绍

    
CLI 工具，在命令行一键将视频发布到抖音、TikTok、B站、快手、小红书、视频号、YouTube 等多个平台。支持定时发布、多账号管理、批量上传、标签自动生成。

👉 **GitHub：**[https://github.com/dreammis/social-auto-upload](https://github.com/dreammis/social-auto-upload)


    ### 支持平台

    
国内：抖音、B站、快手、小红书、视频号、微博

    国外：YouTube、TikTok

    每个平台都有独立的适配器，即使某个平台 API 变更，不影响其他平台。


    ### 使用方法

    
`pip install social-auto-upload

    social-auto-upload config

    social-auto-upload publish --platform bilibili,douyin --video ./output.mp4 --title "新视频" --tags "教程"`


    ### 自动化工作流

    
MoneyPrinterTurbo 生成视频 → 自动保存输出目录 → Social Auto Upload 检测新文件 → 自动发布到各平台 → 记录发布结果。实现"输入主题 → AI 生成 → 自动分发"的完整闭环。


    ### 注意事项

    
各平台自动发布依赖 Cookie 或 API Token，有被封号风险。建议使用小号或专门的发布账号。定时发布功能适合矩阵号运营场景。


### 相关下载链接

- **Social Auto Upload**：[https://github.com/dreammis/social-auto-upload](https://github.com/dreammis/social-auto-upload)
