---
title: 'Video Subtitle Remover：AI 去除视频硬字幕，拯救被遮挡的画面'
groupId: 'a1b2c3d4-3015-4f1e-9a2b-1c3d5e7f8a9b'
summary: '下载的视频带有硬字幕或水印？Video Subtitle Remover 用 AI 自动检测并移除视频中的硬字幕，填补被遮挡的画面内容。实测在纯色背景上效果几乎完美。'
date: 2026-05-25
---

下载的视频素材底部有硬字幕或水印——做二次创作时，这些字幕严重影响画面质量。以前唯一办法是裁剪掉底部，但会损失构图。[Video Subtitle Remover](https://github.com/YaoFANGUK/video-subtitle-remover) 给出了更聪明的方案。


    ### AI 去字幕原理

    
传统去水印只是"模糊"或"遮盖"，效果很假。Video Subtitle Remover 更先进：

    
1. AI 目标检测找到字幕/水印区域

    2. 分析被遮挡区域周围的画面内容（背景、纹理、颜色）

    3. 用图像修复算法"脑补"出被遮挡区域的画面

    4. 逐帧处理，保持帧间连续性

    
不是"遮住"字幕，而是"擦掉"字幕然后画上本该在那里的内容。


    ### 实际效果

    
纯色或简单纹理背景上，去字幕效果几乎完美，看不出处理痕迹。复杂背景（人物走动、自然风景）上偶有轻微修复痕迹，但不仔细看很难发现。


    ### 使用方式

    
`python video_subtitle_remover.py --video input.mp4 --output clean.mp4`

    
也提供带 Web UI 的 Docker 版本，可在浏览器中拖拽视频、调整参数、预览效果再导出。


    ### 注意事项

    
处理速度较慢——1 秒视频需几秒到几十秒（取决于 GPU）。建议只处理需要去字幕的片段。对中文字幕支持最好。


### 相关下载链接

- **Video Subtitle Remover**：[https://github.com/YaoFANGUK/video-subtitle-remover](https://github.com/YaoFANGUK/video-subtitle-remover)
