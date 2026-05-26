---
title: 'FFmpeg 视频处理完全指南：剪辑、合并、转码、压缩一篇文章搞定'
groupId: 'a1b2c3d4-2001-4f1e-9a2b-1c3d5e7f8a9b'
summary: 'FFmpeg 是开源视频处理领域的瑞士军刀。本文从安装配置讲起，覆盖剪辑、合并、转码、压缩、截图、音视频分离等高频场景，20 个实用命令让你从入门到熟练。'
date: 2026-05-25
---

FFmpeg 是视频处理领域无可争议的王牌工具，几乎所有的视频下载工具（包括 yt-dlp）、播放器、转码软件都在底层依赖它。学会 FFmpeg，就等于掌握了视频处理的"内核语言"。


    ### FFmpeg 能做什么？

    
一句话：任何你能想到的视频操作，FFmpeg 都能做。格式转换、裁剪合并、压缩画质、提取音频、添加字幕、录制屏幕、直播推流……它不提供图形界面，但命令行赋予它无与伦比的灵活性和自动化能力。


    ### 安装

    
**Windows：**从 [ffmpeg.org](https://ffmpeg.org) 下载预编译包，解压后将 bin 目录加入 PATH，或直接使用 xiaoyuevideo 内置的 FFmpeg。

    **macOS：**`brew install ffmpeg`

    **Linux：**`sudo apt install ffmpeg`

    
验证安装：`ffmpeg -version`


    ### 高频操作 20 例


    
**1. 格式转换**

    `ffmpeg -i input.mkv -c:v libx264 -preset medium -crf 23 -c:a aac output.mp4`

    将 MKV 转为兼容性最好的 MP4。libx264 是 H.264 编码器，-crf 控制画质（18-28，越低画质越好）。


    
**2. 视频裁剪（时间）**

    `ffmpeg -i input.mp4 -ss 00:01:30 -to 00:03:00 -c copy output.mp4`

    从 1 分 30 秒截取到 3 分钟，-c copy 实现"秒剪"——不重新编码，只复制流数据。


    
**3. 视频合并**

    先创建 filelist.txt：`file '1.mp4'\nfile '2.mp4'\nfile '3.mp4'`

    `ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4`

    无损合并多个 MP4 文件，适用于将下载的短视频片段拼接成长视频。


    
**4. 压缩视频体积**

    `ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slower -c:a aac -b:a 96k output.mp4`

    CRF 28 配合 slower 预设可在画质损失很小的情况下将体积缩小 50%-70%。


    
**5. 调整分辨率**

    `ffmpeg -i input.mp4 -vf scale=1920:1080 output.mp4`

    也可自动按比例缩放：`ffmpeg -i input.mp4 -vf scale=-2:720 output.mp4`（宽度自适应，高度 720P）


    
**6. 提取音频**

    `ffmpeg -i input.mp4 -vn -c:a libmp3lame -q:a 2 output.mp3`

    -vn 表示不处理视频，-q:a 2 表示高质量 MP3（0=最好，9=最差）。


    
**7. 添加硬字幕**

    `ffmpeg -i input.mp4 -vf subtitles=subtitle.srt output.mp4`

    将 SRT 字幕"烧录"进视频画面。注意这是硬编码，字幕无法关闭。


    
**8. 视频转 GIF**

    `ffmpeg -i input.mp4 -vf "fps=10,scale=480:-1" output.gif`

    每秒 10 帧，宽度 480 像素，是社交媒体可用的合适大小。


    
**9. 画面旋转**

    `ffmpeg -i input.mp4 -vf transpose=1 output.mp4`

    transpose=1 顺时针 90 度，=2 逆时针 90 度。


    
**10. 去除片头片尾**

    `ffmpeg -i input.mp4 -ss 10 -i input.mp4 -c copy -map 1:0 -map 0:1 -shortest -fflags +shortest output.mp4`

    跳过前 10 秒，适合批量处理录制内容。更简单的方法请参考上面的裁剪命令。


    
**11. 多图合成视频**

    `ffmpeg -framerate 24 -i img_%03d.png -c:v libx264 -pix_fmt yuv420p output.mp4`

    将 img_001.png、img_002.png……合成 24fps 的视频。


    
**12. 倍速播放**

    `ffmpeg -i input.mp4 -vf setpts=0.5*PTS -af atempo=2.0 output.mp4`

    视频 2 倍速（setpts=0.5），音频同步加速（atempo=2.0）。


    
**13. 视频倒放**

    `ffmpeg -i input.mp4 -vf reverse -af areverse output.mp4`

    适合制作趣味短视频。注意这需要完整解码再编码，耗时较长。


    
**14. 视频静音**

    `ffmpeg -i input.mp4 -an output.mp4`

    -an 忽略音频轨，适合需要纯画面的场景。


    
**15. 更换音频轨**

    `ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -shortest output.mp4`

    用 audio.mp3 替换原视频的音频。BGM 替换、配音等场景常用。


    
**16. 提取视频帧（截图）**

    `ffmpeg -i input.mp4 -vf fps=1 screenshot_%04d.png`

    每秒截一帧。修改 fps 参数可控制截图频率。


    
**17. 查看媒体信息**

    `ffprobe -v quiet -print_format json -show_format -show_streams input.mp4`

    ffprobe 是 FFmpeg 套件中的分析工具，输出 JSON 格式的编码参数、分辨率、码率、时长等信息。


    
**18. 拼接视频（不同编码）**

    `ffmpeg -i input1.mp4 -i input2.mp4 -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1" output.mp4`

    当两个视频编码参数不同时，需要用 filter_complex 重新编码拼接。


    
**19. 画中画**

    `ffmpeg -i main.mp4 -i overlay.mp4 -filter_complex "[1:v]scale=320:180[over];[0:v][over]overlay=10:10" output.mp4`

    右上角小窗叠加，适合教程类视频。


    
**20. 直播推流**

    `ffmpeg -re -i input.mp4 -c:v libx264 -b:v 3000k -f flv rtmp://live.example.com/stream`

    将视频文件以直播形式推送到 RTMP 服务器。


    ### 视频参数速查表

    
- **CRF**（恒定质量）：17-20 视觉无损，21-24 高质量，25-28 中等（推荐平衡），29-32 低质量省空间

    - **Preset**（编码速度）：ultrafast > superfast > veryfast > faster > fast > medium > slow > slower > veryslow。越慢体积越小，画质越好

    - **-b:v**（视频码率）：1080P 建议 4000-8000k，720P 建议 2000-4000k


    
掌握以上命令，日常 90% 的视频处理需求都能搞定。xiaoyuevideo 下载工具内部也深度集成了 FFmpeg，自动完成 DASH 音视频合并和格式转换，让你无需手动处理这些复杂命令。


### 相关下载链接

- **FFmpeg**：[https://ffmpeg.org](https://ffmpeg.org)
