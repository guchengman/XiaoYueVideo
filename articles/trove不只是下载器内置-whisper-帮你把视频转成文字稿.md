---
title: 'Trove：不只是下载器，内置 Whisper 帮你把视频转成文字稿'
groupId: 'a1b2c3d4-3004-4f1e-9a2b-1c3d5e7f8a9b'
summary: '一个"现代网页保存机"，下载视频的同时自动进行语音转文字。内置 whisper.cpp 本地转录，不依赖云端 API，可生成 SRT/VTT 字幕和纯文本文字稿。'
date: 2026-05-25
---

Trove 的开源介绍语很简单："Save what you care about from the modern web."——把你关心的网页内容保存下来。特殊之处在于：不止保存视频文件，还帮你把视频里的信息提取出来。


    ### Trove 的差异化能力

    
大多数下载工具只下载视频文件就结束了。[Trove](https://github.com/afk1997/trove) 多走了一步：下载完成后自动用 whisper.cpp 进行本地语音转文字，生成完整的文字稿。

    
几个实用场景：

    下载讲座视频 → Trove 自动生成文字稿，你可以直接搜索文字内容定位视频位置

    下载采访视频 → 文字稿快速浏览核心观点，不用从头到尾重看

    文字稿导出为 txt/markdown，方便在笔记软件中引用


    ### 技术实现

    
使用 whisper.cpp（C++ 实现的 Whisper），在 CPU 上就能运行，不需要 GPU。转录速度大约是实时速度的 2-3 倍——30 分钟的视频约 10-15 分钟完成转录。


    ### 字幕编辑

    
生成的 SRT/VTT 字幕可以在 Trove 的 Web UI 中直接编辑：调整时间轴、修改错别字、导出不同格式。


    ### 部署

    
同样是 Docker 单容器部署，适合跑在 NAS 或云服务器上。支持暂停/恢复下载（网络中断后自动续传）。


### 相关下载链接

- **Trove**：[https://github.com/afk1997/trove](https://github.com/afk1997/trove)
