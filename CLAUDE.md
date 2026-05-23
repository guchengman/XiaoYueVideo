# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**语言: 回答请使用中文。**

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

## 工具脚本参考

详细用法见 `.claude/scripts-reference.md`。需要时 `@scripts-reference.md` 加载。

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

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore

## Checkpoint 纪律

每完成一个功能 → 更新 CLAUDE_CHECKPOINT.md
每解决一个 bug → 更新 CLAUDE_CHECKPOINT.md
每做出一个技术决策 → 记入"关键决策记录"
每次收工前 → 务必更新"当前正在做的事情"和"下一步计划"
