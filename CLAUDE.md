# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Video Publish Project - D:\OPC\videos

## Project Overview

Greenfield project for video file management, sorting, batch upload and release. Stores raw video materials, edited clips, published versions, release records and related configuration files.

## Directory Structure

- `raw/` — Original unedited video footage
- `edit/` — Edited intermediate video files
- `publish/` — Final version ready for release
- `captions/` — 提取的字幕和文案（按平台分子目录）
- `logs/` — Release logs, upload records, platform notes
- `temp/` — Temporary files, drafts, cache files

## Conventions

1. 文件命名: `{platform}_{id}_{title}.{ext}`（如 `douyin_7631040144_职场生存.mp4`、`xiaoyuzhou_abc123_播客标题.mp3`）
2. `publish/` 发布版可额外使用 `YYYYMMDD_title_platform.mp4` 格式
3. Keep only final released files in `publish/` folder
4. Clean `temp/` folder regularly
5. Record upload time & platform in logs

## Common Commands (Windows PowerShell)

```powershell
# List all video files
Get-ChildItem *.mp4,*.mov -Recurse

# Move finished videos to publish folder
Move-Item *.mp4 .\publish\

# Clean temp files
Remove-Item .\temp\* -Recurse -Force
```

## Tools

- `XiaoYueVideo/tools/yt-dlp.exe` — 命令行视频/音频下载器，支持 YouTube、Bilibili 等上千个网站
  - **所有需要登录的平台（快手、抖音、B站等）一律带 Cookie 下载**，Cookie 文件按平台存放: `XiaoYueVideo/cookies/{platform}_cookies.txt`（Netscape 格式，通过 XiaoYueVideo 站点的 Cookie 管理页面上传，或从浏览器导出后放入该目录）
  - 视频: `.\XiaoYueVideo\tools\yt-dlp.exe --cookies XiaoYueVideo/cookies/{platform}_cookies.txt -o "raw/%(title)s.%(ext)s" <url>`
  - 音频: `.\XiaoYueVideo\tools\yt-dlp.exe --cookies XiaoYueVideo/cookies/{platform}_cookies.txt -x --audio-format mp3 -o "raw/%(title)s.%(ext)s" <url>`
  - 查看可用格式: `.\XiaoYueVideo\tools\yt-dlp.exe --cookies XiaoYueVideo/cookies/{platform}_cookies.txt --list-formats <url>`
  - 调试（查看实际抓取内容）: `.\XiaoYueVideo\tools\yt-dlp.exe --cookies XiaoYueVideo/cookies/{platform}_cookies.txt --dump-json <url>`
  - 官网: https://github.com/yt-dlp/yt-dlp
  - **已配置 Cookie**: bilibili, douyin, kuaishou, weibo
  - **待配置 Cookie**: tiktok, instagram, xiaohongshu — 需从浏览器导出后通过 XiaoYueVideo 管理界面或直接放入 `XiaoYueVideo/cookies/` 目录
- `XiaoYueVideo/tools/wx_channels_download/` — 微信视频号下载器 (ltaoo/wx_channels_download)
  - 以管理员身份运行 `wx_video_download.exe`，自动安装证书并启动代理
  - 启动后打开微信PC端播放视频号视频，会出现下载按钮
  - 配置文件: `config.yaml`（可修改下载目录、端口等）
  - 下载地址: https://github.com/ltaoo/wx_channels_download/releases

## Scripts

- `XiaoYueVideo/scripts/upload.ps1` — 批量上传脚本，按文件名解析平台信息并发起上传
  - 支持 Bilibili API 上传（需配置 Cookie），预留 YouTube 上传接口
  - 使用: `.\XiaoYueVideo\scripts\upload.ps1 -Platform bilibili` 或 `-DryRun`
  - 凭据: 复制 `XiaoYueVideo/scripts/config.example.ps1` 为 `XiaoYueVideo/scripts/config.ps1` 并填入 Cookie
- `XiaoYueVideo/scripts/config.example.ps1` — 上传凭据配置模板

## Audio Download Scripts

音频/视频下载脚本，按平台独立处理。默认保存到 `raw/`。

- `XiaoYueVideo/scripts/download_kuaishou.py` — 快手视频下载（基于页面解析，yt-dlp 不支持快手）
  - 使用: `python XiaoYueVideo/scripts/download_kuaishou.py <快手链接>`
  - 依赖 Cookie: `XiaoYueVideo/cookies/kuaishou_cookies.txt`
  - 支持: `short-video/XXX`, `/f/XXX`, `v.kuaishou.com/XXX` 链接格式
- `XiaoYueVideo/scripts/download_douyin_audio.py` — 抖音音频下载，批量提取视频音轨
  - 使用: `python XiaoYueVideo/scripts/download_douyin_audio.py <分享链接> [-l 数量]`
  - 支持批量下载用户全部视频的音频
- `XiaoYueVideo/scripts/download_bilibili_audio.py` — Bilibili 音频提取
  - 使用: `python XiaoYueVideo/scripts/download_bilibili_audio.py <视频/空间URL> [-f mp3|m4a|best|flac]`
- `XiaoYueVideo/scripts/download_xiaoyuzhou.py` — 小宇宙播客下载
  - 使用: `python XiaoYueVideo/scripts/download_xiaoyuzhou.py <播客URL或PID> [-l 集数]`
  - 使用 API 直接下载，无需浏览器

## Caption Extraction Scripts

文案/字幕提取脚本，按平台独立处理。默认保存到 `captions/{platform}/`。

- `XiaoYueVideo/scripts/extract_caption.py` — 通用语音转文字，基于 Whisper + LLM 修正错别字
  - 使用: `python XiaoYueVideo/scripts/extract_caption.py <视频文件或目录> [-o 输出目录] [--force]`
  - 依赖: `openai-whisper ffmpeg-python anthropic`
- `XiaoYueVideo/scripts/extract_caption_douyin.py` — 抖音文案提取（视频描述 + 语音转文字）
  - 使用: `python XiaoYueVideo/scripts/extract_caption_douyin.py <分享链接> [--desc-only] [--local raw/]`
  - `--desc-only` 仅拉取视频描述（快，无需下载视频）
  - `--local raw/` 对已下载视频做语音转文字
- `XiaoYueVideo/scripts/extract_caption_bilibili.py` — Bilibili 字幕下载（CC 字幕 + AI 生成字幕）
  - 使用: `python XiaoYueVideo/scripts/extract_caption_bilibili.py <视频URL> [--playlist] [--no-auto]`
  - 不下载视频，仅下载 .srt 字幕文件
- `XiaoYueVideo/scripts/extract_caption_youtube.py` — YouTube 字幕下载（手动 + 自动生成字幕）
  - 使用: `python XiaoYueVideo/scripts/extract_caption_youtube.py <视频URL> [--playlist] [--langs zh-Hans,en,ja]`
  - 不下载视频，仅下载 .srt 字幕文件

## Token 节约

运行 npm build/test、pip install、yt-dlp 等命令时，输出超过 50 行则只保留最后 20 行错误/关键信息（用 `| tail -20` 或 `| Select-Object -Last 20`）。git 命令输出交给 RTK 处理，不要额外加管道。

## Logs

上传记录自动写入 `logs/upload_YYYYMM.csv`。

## XiaoYueVideo (视频下载网站)

位于 `D:\OPC\videos\XiaoYueVideo\`，基于 Nuxt 3 的视频下载工具站。
- **所有 XiaoYueVideo 项目的文件、目录、依赖、构建产物等，必须存放在 `D:\OPC\videos\XiaoYueVideo\` 目录下，不得放在其它目录。**
- GitHub: `guchengman/XiaoYueVideo`（https://github.com/guchengman/XiaoYueVideo）
- 部署前必须先跑 `npm run build` 确认构建无报错
- 构建产物（`.nuxt/`、`.output/`、`node_modules/`）不提交到 Git

## Scope & To-Do

- [ ] Define target release platforms
- [x] Build batch upload script
- [x] Set up video download tool (wx_channels_download)
- [ ] Manage video version archives
