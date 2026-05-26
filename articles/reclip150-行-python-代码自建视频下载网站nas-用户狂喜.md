---
title: 'ReClip：150 行 Python 代码自建视频下载网站，NAS 用户狂喜'
groupId: 'a1b2c3d4-3003-4f1e-9a2b-1c3d5e7f8a9b'
summary: '一个只有 150 行 Python 代码的视频下载 Web 服务，Flask 后端 + 纯 HTML 前端，Docker 一键部署。支持批量 URL、去重、画质选择。适合在 NAS 上自托管。'
date: 2026-05-25
---

如果你有自己的 NAS 或云服务器，[ReClip](https://github.com/averygan/reclip) 可能是最省事的自托管视频下载方案——整个项目只有 150 行 Python 代码，前后端一体，Docker 一键跑起来。


    ### 为什么需要 ReClip？

    
很多人家有 NAS，想搭建一个"全家都能用的视频下载服务"。yt-dlp 命令行对家人不友好，桌面软件每台电脑都要装。ReClip 的做法：跑一个 Web 服务在 NAS 上，任何设备打开浏览器就能用。


    ### 部署方式

    
`docker run -d -p 5000:5000 -v /path/to/downloads:/downloads averygan/reclip`

    
一行命令。之后在任何设备的浏览器中访问 http://你的NASIP:5000，就是简洁的下载界面。


    ### 核心功能

    
粘贴视频链接 → 自动解析 → 选择画质 → 下载到 NAS。

    
ReClip 还支持：批量粘贴多个 URL 排队下载、自动去重（已下载的不会重复下）、下载进度实时显示。


    ### 适合场景

    
家庭共享：家人通过手机/平板/电视浏览器访问，看到想下载的视频粘贴链接即可。

    创作团队：所有人把素材链接发到 ReClip，统一下载到 NAS 共享目录。

    自动化流水线：ReClip 下载目录作为 Jellyfin 媒体库的输入源，下载完成自动入库。


### 相关下载链接

- **ReClip**：[https://github.com/averygan/reclip](https://github.com/averygan/reclip)
