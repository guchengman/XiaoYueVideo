# Scripts & Tools Reference

## Tools

- `xiaoyuevideo/tools/yt-dlp.exe` — 命令行视频/音频下载器
  - **所有需登录平台一律带 Cookie**: `xiaoyuevideo/cookies/{platform}_cookies.txt`（Netscape 格式）
  - 视频: `.\xiaoyuevideo\tools\yt-dlp.exe --cookies xiaoyuevideo/cookies/{platform}_cookies.txt -o "raw/%(title)s.%(ext)s" <url>`
  - 音频: `.\xiaoyuevideo\tools\yt-dlp.exe --cookies xiaoyuevideo/cookies/{platform}_cookies.txt -x --audio-format mp3 -o "raw/%(title)s.%(ext)s" <url>`
  - 查看格式: `.\xiaoyuevideo\tools\yt-dlp.exe --cookies xiaoyuevideo/cookies/{platform}_cookies.txt --list-formats <url>`
  - 调试: `.\xiaoyuevideo\tools\yt-dlp.exe --cookies xiaoyuevideo/cookies/{platform}_cookies.txt --dump-json <url>`
  - **已配置 Cookie**: bilibili, douyin, kuaishou, weibo
  - **待配置 Cookie**: tiktok, instagram, xiaohongshu
- `xiaoyuevideo/tools/wx_channels_download/` — 微信视频号下载器
  - 管理员运行 `wx_video_download.exe`，自动安装证书并启动代理
  - 打开微信PC端播放视频号视频，会出现下载按钮
  - 下载地址: https://github.com/ltaoo/wx_channels_download/releases

## Scripts

- `scripts/upload.ps1` — 批量上传脚本，按文件名解析平台并上传。支持 Bilibili API（需 Cookie），预留 YouTube 接口。使用: `-Platform bilibili` 或 `-DryRun`
- `scripts/config.example.ps1` — 上传凭据配置模板

## Audio Download

- `scripts/download_kuaishou.py` — 快手视频下载（页面解析，非 yt-dlp）。需 Cookie
- `scripts/download_douyin_audio.py` — 抖音音频下载，批量提取视频音轨
- `scripts/download_bilibili_audio.py` — Bilibili 音频提取，支持 mp3/m4a/best/flac
- `scripts/download_xiaoyuzhou.py` — 小宇宙播客下载（API 直下，无需浏览器）

## Caption Extraction

- `scripts/extract_caption.py` — 通用语音转文字（Whisper + LLM 修正）
- `scripts/extract_caption_douyin.py` — 抖音文案提取。`--desc-only` 仅拉描述，`--local raw/` 对本地视频做语音转文字
- `scripts/extract_caption_bilibili.py` — Bilibili 字幕下载（.srt），支持 `--playlist`
- `scripts/extract_caption_youtube.py` — YouTube 字幕下载（.srt），支持 `--langs zh-Hans,en,ja`
