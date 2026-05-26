---
title: 'ShortGPT：用 AI 把长视频自动拆成爆款短视频，开源替代 OpusClip'
groupId: 'a1b2c3d4-3016-4f1e-9a2b-1c3d5e7f8a9b'
summary: '1 小时的直播视频，怎么变成 10 个 1 分钟的爆款短视频？ShortGPT 是 OpusClip 的开源替代，用 AI 自动识别长视频高光片段，裁剪竖屏格式，加字幕和效果。'
date: 2026-05-25
---

[ShortGPT](https://github.com/RayVentura/ShortGPT)：长视频→短视频的二次创作，在 2026 年已经是内容运营的标配。B站 1 小时视频拆成 3 个抖音短视频，YouTube 深度内容剪成 TikTok 60 秒精华。


    ### ShortGPT 做什么？

    
**高光片段检测：**AI 分析视频内容，自动标记精彩段落——音量突然升高（爆点）、弹幕密集区域、笑点/泪点、重要关键词出现的位置。

    
**智能裁剪：**检测画面主体（说话的人、演示物体），裁剪为竖屏时自动追踪主体，确保始终在画面中心。

    
**自动加字幕：**截取片段自动生成动态字幕，适配竖屏布局。

    
**批量导出：**一次操作生成多个短视频，支持批量加片头片尾和水印。


    ### 实际案例

    
一位知识类 UP 主的使用流程：上传 1 小时直播回放 → ShortGPT 识别出 12 个高光片段 → 人工筛选保留 8 个 → 自动裁剪加字幕 → 导出 8 个竖屏短视频 → 发布到抖音/视频号。

    
以往手动做这个流程至少半天，现在可控制在 30 分钟内。


    ### vs OpusClip

    
OpusClip 是商业产品，每月有使用次数限制。ShortGPT 完全开源免费，本地部署没有次数限制。缺点是需要自己配置环境和模型。


### 相关下载链接

- **ShortGPT**：[https://github.com/RayVentura/ShortGPT](https://github.com/RayVentura/ShortGPT)
