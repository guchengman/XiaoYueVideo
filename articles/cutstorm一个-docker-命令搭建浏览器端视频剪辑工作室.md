---
title: 'Cut/Storm：一个 Docker 命令搭建浏览器端视频剪辑工作室'
groupId: 'a1b2c3d4-3012-4f1e-9a2b-1c3d5e7f8a9b'
summary: '不用 Premiere 不用 Final Cut。Cut/Storm 是一个 Docker 容器，跑起来后浏览器中完成剪辑、字幕生成、多比例导出。内置 Whisper、去静音、自动裁剪竖屏。'
date: 2026-05-25
---

偶尔需要剪辑视频但不想装几十 GB 的专业软件？或者主力电脑配置低跑不动 Pr？[Cut/Storm](https://github.com/vorniches/cutstorm) 可能是你的理想方案——它跑在服务器上，你在浏览器中操作。


    ### 设计理念

    
"浏览器内的视频剪辑工作室"。剪辑这种计算密集型任务，交给服务器，用户只需在浏览器中操作时间线和预览画面。

    
好处：笔记本不需要高性能显卡、团队共享同一剪辑环境、iPad 或手机上也能操作剪辑。


    ### 一键部署

    
`docker run -d -p 8080:8080 -v /path/to/videos:/videos vorniches/cutstorm`

    
启动后浏览器访问 http://服务器IP:8080 即可开始剪辑。


    ### 内置功能

    
**Whisper 字幕生成：**导入视频后自动调用本地 Whisper 引擎生成 SRT 字幕，不依赖外部 API。

    **去静音：**一键删除视频中的静音段落，适合录制类内容精简。

    **多比例导出：**同一项目可同时导出 16:9、9:16、1:1 三种比例——一次剪辑多平台分发。

    **轨道式时间线：**多视频/音频/字幕轨道拖拽编辑。


    ### 适合谁？

    
有 NAS 或家庭服务器的用户、不想在主力电脑上装大型剪辑软件的创作者、需要在多设备间切换剪辑的团队。


### 相关下载链接

- **Cut/Storm**：[https://github.com/vorniches/cutstorm](https://github.com/vorniches/cutstorm)
