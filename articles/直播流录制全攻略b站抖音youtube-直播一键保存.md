---
title: '直播流录制全攻略：B站、抖音、YouTube 直播一键保存'
groupId: 'a1b2c3d4-2004-4f1e-9a2b-1c3d5e7f8a9b'
summary: '精彩的直播错过了怎么办？本文系统介绍直播录制原理，对比 FFmpeg、Streamlink、录屏软件等方法，覆盖 B站、抖音、YouTube 等主流平台，附赠定时录制和自动停止的实操技巧。'
date: 2026-05-25
---

直播内容稍纵即逝——播完就没了。如果你错过了喜欢的 UP 主直播，或者想存档重要的活动直播，录制就是唯一的办法。好消息是，直播录制并不复杂。


    ### 直播录制原理：拉流 vs 抓屏

    
录制直播有两种方式：

    
**拉流录制：**直接从直播服务器的 CDN 获取音视频流，就像直播软件做的那样。画质无损、文件小，但需要知道 RTMP/HLS 流地址。

    **屏幕录制：**用录屏软件捕获屏幕画面。简单通用，但画质有损失，且占用系统资源更大。

    
显然，拉流录制是首选——只要你能获取到流地址。


    ### 方案一：Streamlink（推荐）

    
[Streamlink](https://github.com/streamlink/streamlink) 是目前最成熟的直播录制工具，支持 Twitch、YouTube、B站等主流平台，它会自动解析流地址：

    
`streamlink --hls-live-restart -o output.ts https://live.bilibili.com/房间号 best`

    
`streamlink -o output.ts https://www.twitch.tv/频道名 best`

    
`streamlink -o output.ts https://www.youtube.com/watch?v=视频ID best`

    
`--hls-live-restart` 表示从当前观看位置开始录制（即使直播已经开始了一段时间）。`best` 自动选择最高画质。

    
安装方式：`pip install streamlink`，或者下载预编译包。


    ### 方案二：FFmpeg 直接拉流

    
如果你知道直播的 M3U8 流地址（通过浏览器开发者工具可以获取）：

    
`ffmpeg -i "直播流M3U8地址" -c copy -bsf:a aac_adtstoasc output.mp4`

    
-c copy 不重新编码，直接复制流，几乎不消耗 CPU。FFmpeg 会持续录制直到直播结束或手动停止（按 q）。


    ### 方案三：yt-dlp（YouTube 直播专用）

    
yt-dlp 最新版本已支持 YouTube 直播录制：

    
`yt-dlp --live-from-start -o "直播名称.%(ext)s" "YouTube直播URL"`

    
`--live-from-start` 确保从直播开始录制（而不是下载已结束的 VOD）。支持自动等待直播开始，适合定时任务。


    ### 定时录制：自动开始与停止

    
对于定期举办的直播（如每周固定时间），可以设置定时任务：

    
Windows 下使用任务计划程序，Linux 下使用 cron/crontab，触发脚本如下：

    
`# 定时录制B站直播，最多录制4小时（14400秒）

    timeout 14400 streamlink -o "./recordings/直播_{time}.ts" https://live.bilibili.com/房间号 best`

    
结合 grep 还可以实现"开播自动录制"：通过 Streamlink 的 --retry-stream 参数轮询检测直播状态。


    ### 各平台录制要点

    
**B站直播：**大部分直播间可直接用 Streamlink 解析。失败时可通过浏览器 F12 → Network 过滤 flv/m3u8 来手动获取流地址。

    **抖音直播：**需要 Cookie 验证。使用 yt-dlp 配合 Cookie 文件可以录制。

    **YouTube 直播：**Streamlink 和 yt-dlp 均完美支持。YouTube 直播结束后会自动转为 VOD，可以用常规的 YouTube 下载方法获取。

    **Twitch：**Streamlink 的起源项目，支持最好。Twitch 会自动保存过去 7-60 天的 VOD，也可直接下载。


    ### 注意事项

    
录制 HLS 流时，如果网络中断，FFmpeg 和 Streamlink 默认不会自动重连。建议使用 `--retry-open` 参数或写循环脚本。

    录制长直播（几小时以上）确保磁盘空间充足——1080P 直播每小时约 2-4 GB。

    尊重主播版权，录制内容仅限个人观看，请勿未经授权进行二次分发。


    
xiaoyuevideo 未来也会支持直播流解析功能，让用户无需记忆复杂的命令行即可录制直播内容。


### 相关下载链接

- **Streamlink**：[https://github.com/streamlink/streamlink](https://github.com/streamlink/streamlink)
- **yt-dlp**：[https://github.com/yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)
- **FFmpeg**：[https://ffmpeg.org](https://ffmpeg.org)
