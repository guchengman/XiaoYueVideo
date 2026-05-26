---
title: 'yt-dlp 视频下载终极指南：一个命令下载全网视频'
groupId: 'a1b2c3d4-1001-4f1e-9a2b-1c3d5e7f8a9b'
summary: 'yt-dlp 是 GitHub 16 万 Star 的开源神器，支持 1000+ 网站视频下载。本文从安装、基础用法、音频提取、Cookie 配置、批量下载到高级技巧，手把手教你玩转这个命令行利器。'
date: 2026-05-25
---

yt-dlp 是目前最强大的开源视频下载工具，在 [GitHub](https://github.com/yt-dlp/yt-dlp) 上拥有超过 16 万 Star，支持 YouTube、B站、抖音、Twitter 等 1000+ 网站的視頻下载。它是 youtube-dl 的活跃分支，更新频率极高，平台改版后通常几天内就能适配。


### 为什么选择 yt-dlp？


相比在线解析网站，yt-dlp 有几个无法替代的优势：支持批量下载整个播放列表或频道、可自定义画质和格式、完全免费开源无广告、支持 Cookie 登录获取高清画质、自动合并 DASH 分离的音视频流。


### 安装（三平台）


**Windows：**下载 yt-dlp.exe 放入 PATH 目录，同时安装 FFmpeg（音视频合并必需）。

**macOS：**`brew install yt-dlp ffmpeg`

**Linux：**`sudo apt install yt-dlp ffmpeg`


### 基础命令


下载最佳画质：`yt-dlp "视频链接"`

查看可用格式：`yt-dlp -F "视频链接"`

指定格式合并：`yt-dlp -f 137+140 "视频链接"`（137 是视频流，140 是音频流）

自定义文件名：`yt-dlp -o "%(title)s.%(ext)s" "视频链接"`


### 提取纯音频


`yt-dlp -x --audio-format mp3 --audio-quality 0 "视频链接"`

支持 mp3、m4a、flac、opus 等格式，适合提取音乐或播客。


### Cookie 配置（下载高清/登录内容）


B站 1080P 高码率、YouTube 会员视频、抖音主页内容等需要登录才能访问。使用浏览器扩展 "Get cookies.txt LOCALLY" 导出 Netscape 格式 Cookie 文件，然后：

`yt-dlp --cookies cookies.txt "视频链接"`


### 批量下载


下载播放列表：`yt-dlp "播放列表URL"`

增量备份（跳过已下载）：`yt-dlp --download-archive archive.txt "播放列表URL"`

从文件批量下载：`yt-dlp -a urls.txt`


### 性能优化


多线程加速：`yt-dlp -N 8 "视频链接"`

限速下载：`yt-dlp --limit-rate 2M "视频链接"`

使用代理：`yt-dlp --proxy "socks5://127.0.0.1:1080" "视频链接"`



如果你偏好图形界面操作，xiaoyuevideo 等在线解析网站提供了更友好的交互方式，无需记忆命令行参数。


### 相关下载链接

- **yt-dlp**：[https://github.com/yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)
- **FFmpeg**：[https://ffmpeg.org](https://ffmpeg.org)
