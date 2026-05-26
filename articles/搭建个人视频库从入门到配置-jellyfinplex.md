---
title: '搭建个人视频库：从入门到配置 Jellyfin/Plex'
groupId: 'a1b2c3d4-2016-4f1e-9a2b-1c3d5e7f8a9b'
summary: '下载的视频越来越多，怎么管理才不乱？本文手把手教你搭建个人媒体服务器：硬件选型、Jellyfin/Plex 安装配置、远程访问设置、元数据刮削、自动下载入库，打造属于自己的 Netflix。'
date: 2026-05-25
---

下载了几十上百个视频后，你可能会遇到一个常见困惑：文件越来越多，在电脑文件夹里翻来翻去找想看的那个，体验远不如 Netflix 那样丝滑。解决方案是——搭建一个个人媒体服务器。


    ### 什么是个人媒体库？

    
简单说，就是你买一台 NAS 或旧电脑装专用软件，把你的视频文件全部丢进去，然后在电视/手机/平板上能像刷 Netflix 一样刷你自己的视频——自动匹配封面、演员信息、评分、简介，记录观看进度，推荐相似内容。


    ### 方案一：Jellyfin（推荐，完全免费开源）

    
[Jellyfin](https://github.com/jellyfin/jellyfin) 是首选。它是 Emby 的一个自由开源分支，功能几乎一样，完全免费，无任何付费墙。

    
**安装：**

    Windows：下载 Jellyfin 安装包 → 下一步 → 下一步 → 完成

    Linux：`sudo apt install jellyfin`

    NAS：群晖/威联通/Unraid 都有对应的套件或 Docker 镜像

    
**基本配置：**

    1. 设置媒体库路径（如 /videos/movies、/videos/tvshows）

    2. 选择元数据刮削器（从 TMDB/豆瓣获取海报和简介）

    3. 开启硬件加速（Intel QuickSync / NVIDIA NVENC / AMD AMF）

    4. 配置用户和权限

    
配置完成后，在任何设备的浏览器中访问 http://你的NASIP:8096 即可开始使用。


    ### 方案二：Plex（最易用，部分功能付费）

    
[Plex](https://www.plex.tv) 是商业化方案，用户体验最友好。设置向导完善、客户端覆盖最全（所有电视系统、手机、平板、游戏机都有 Plex App）、远程访问配置最简单。

    
**免费版 vs 付费版：**免费版可用基础功能。Plex Pass（买断制，约 ¥100-200）解锁硬件转码、下载到本地、歌词支持等高级功能。


    ### 硬件选型建议

    
**入门（1-5 人，1080P）：**旧电脑 / 树莓派 4B / 入门级 NAS。CPU 自带 Intel UHD Graphics 630 或以上，可硬解 1080P HEVC。

    **进阶（家庭使用，4K）：**中端 NAS 或 Mini PC。推荐 Intel N100/N305 或以上处理器，支持 AV1 解码。

    **玩家（多用户，4K HDR 转码）：**自组 NAS（Unraid / TrueNAS）+ Intel 12 代以上 CPU 或 NVIDIA RTX 3050+。

    **核心指标：**CPU 的集成显卡支持哪些硬解格式，以及是否有足够的 HDMI 2.0/2.1 接口直连电视。


    ### 文件命名规范

    
媒体库软件依赖文件名来匹配元数据。推荐命名规范：

    
**电影：**

    /movies/让子弹飞 (2010)/让子弹飞 (2010) [Remux 4K HDR].mkv

    /movies/The Matrix (1999)/The Matrix (1999) [2160p HEVC].mkv

    
**剧集：**

    /tvshows/漫长的季节/Season 1/漫长的季节 S01E01.mkv

    
正确的命名决定了软件能不能自动识别内容，是搭建媒体库的最关键一步。


    ### 自动化入库：让下载和入库联动

    
更进阶的玩法是建立"下载即入库"的自动化流水线：

    
1. yt-dlp 下载视频到指定目录

    2. 后处理脚本自动重命名、整理到对应文件夹

    3. Jellyfin/Plex 自动扫描新文件、刮削元数据

    4. 你在电视上打开媒体库 App，新内容已经准备好了


    ### 远程访问

    
在外面的网络也能访问家里媒体库：

    - 最简单：[Tailscale](https://tailscale.com) / [ZeroTier](https://www.zerotier.com)（组网工具，不需要公网 IP）

    - 进阶：DDNS + 端口转发（需要公网 IP）

    - 最安全：Cloudflare Tunnel（通过 Cloudflare 网络代理）


    
媒体库搭建是一次性投入、长期收益的工程。无论是 100 部还是 1000 部电影/视频，整理好了之后，你的观看体验会彻底改变——不再是在文件夹里翻来翻去，而是像刷流媒体一样浏览自己的收藏。xiaoyuevideo 的下载内容可以直接作为媒体库的"输入源"，下载完成后自动纳入你的私人库。


### 相关下载链接

- **Jellyfin**：[https://github.com/jellyfin/jellyfin](https://github.com/jellyfin/jellyfin)
- **Plex**：[https://www.plex.tv](https://www.plex.tv)
- **Tailscale**：[https://tailscale.com](https://tailscale.com)
- **ZeroTier**：[https://www.zerotier.com](https://www.zerotier.com)
