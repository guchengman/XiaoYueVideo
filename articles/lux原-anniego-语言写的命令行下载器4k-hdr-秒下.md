---
title: 'Lux（原 Annie）：Go 语言写的命令行下载器，4K HDR 秒下'
groupId: 'a1b2c3d4-3002-4f1e-9a2b-1c3d5e7f8a9b'
summary: '纯 Go 语言编写的视频下载 CLI 工具，支持 30+ 网站、4K/HDR 画质、多线程下载、播放列表批量处理。安装只需要一行命令：brew install lux。'
date: 2026-05-25
---

提到命令行视频下载，大家想到的往往是 yt-dlp。但有一款后起之秀值得关注——[Lux](https://github.com/iawia002/lux)（原名 Annie），用 Go 语言重写的下载器，在简洁性和性能上有自己的特色。


    ### Lux 的独特之处

    
yt-dlp 是 Python 写的，依赖 Python 运行时和第三方库。Lux 是 Go 编译的单二进制文件——下载即用，无需 Python、FFmpeg 或其他依赖。这在跨平台部署上有天然优势。


    ### 安装（一行命令）

    
macOS：`brew install lux`

    Windows：`scoop install lux`

    Linux：`sudo snap install lux`

    或从 GitHub Releases 下载编译好的二进制文件。


    ### 核心用法

    
下载视频：`lux "视频URL"`

    查看画质：`lux -i "视频URL"`

    指定画质：`lux -f 137 "视频URL"`

    下载列表：`lux -p "播放列表URL"`

    多线程：`lux -n 8 "视频URL"`


    ### 实测体验

    
实测下载 B站 1080P 视频，Lux 的解析速度比 yt-dlp 略快（Go 的 HTTP 客户端性能优势），多线程下载表现稳定。4K HDR 需要配合 FFmpeg 进行流合并。


    ### Lux vs yt-dlp

    
Lux 的优势：单二进制、安装极简、Go 并发模型带来的多线程性能好。

    yt-dlp 的优势：支持的网站更多（1000+ vs 30+）、更新更频繁、社区更大。


    
两者互补。日常用 Lux 足够，遇到小众网站用 yt-dlp 做后备。


### 相关下载链接

- **Lux**：[https://github.com/iawia002/lux](https://github.com/iawia002/lux)
