---
title: '视频字幕提取与翻译：Whisper + AI 生成字幕完整工作流'
groupId: 'a1b2c3d4-2005-4f1e-9a2b-1c3d5e7f8a9b'
summary: '想给视频自动加字幕？想把外语视频转为中文？本文从 Whisper 的模型选型、安装配置到生成 SRT 字幕、AI 翻译校对，一步步教你搭建属于自己的字幕工厂。'
date: 2026-05-25
---

字幕是 2026 年视频创作的基本功。好的字幕不仅提升观看体验、帮助听力障碍者，还能显著提高视频的完播率和搜索曝光。但手动打字幕人累效率低——AI 做这件事又快又好。


    ### 为什么是 Whisper？

    
OpenAI 开源的 [Whisper](https://github.com/openai/whisper) 模型是目前最流行、效果最好的通用语音识别系统。它支持 99 种语言的自动检测和转录，准确率在英语可达 98%+，在中文普通话也能达到 95%+（视音频质量而定）。

    
更棒的是，Whisper 直接输出带时间戳的文本——这意味着只需一行命令就能生成标准的 SRT 字幕文件。


    ### 模型选型：速度和精度的取舍

    
Whisper 有多个模型尺寸可选：

    
**tiny（39M 参数）：**极速但准确率一般，适合实时语音转写概念演示。

    **base（74M）/ small（244M）：**准确率可用，速度较快。

    **medium（769M）：**推荐。速度和准确率的优秀平衡点。

    **large-v3（1.5B 参数）：**准确率最高。短视频（<10 分钟）优先用这个，追求极致精度。

    **[Faster-Whisper](https://github.com/SYSTRAN/faster-whisper)（量化版）：**体积减少 40%，推理速度提升 2.3 倍，准确率保持 98%，推荐作为生产主力。


    ### 安装与使用

    
`# 安装 openai-whisper

    pip install openai-whisper

    

    # 或者安装 faster-whisper（推荐）

    pip install faster-whisper`

    
使用 Whisper 生成字幕：

    
`whisper input.mp4 --model medium --language zh --task transcribe --output_format srt`

    
这条命令会：加载 medium 模型 → 逐帧分析音频 → 输出自带时间戳的 SRT 字幕文件。--task translate 可以将非英语语音翻译为英语。


    ### 从生成到成品：字幕工作流

    
自动生成的字幕往往不能直接用：断句不合理（长句被截断）、标点符号错误、专业名词识别不准。所以需要后处理：

    
**1. VAD 预过滤：**语音活动检测（Silero VAD）在处理前自动跳过静音段，减少无效转录，提升约 10-15% 的字幕准确率。

    **2. 断句优化：**设置每行字幕不超过 42 个字符（中英文均适用），时长 1-6 秒。太短眨眼即过，太长读不过来。

    **3. 时间戳精校：**Whisper 原始时间戳精度约 ±300ms。通过强制对齐（Forced Alignment）技术可以优化到 ±80ms。

    **4. AI 校对：**用 Claude/GPT-4 等 LLM 修正错别字和专业术语，准确率可从 90% 提升到 98%+。

    **5. AI 翻译：**配合 LLM 翻译引擎，将生成的中文字幕翻译为英/日/韩等语言，进一步拓展观众群。


    ### xiaoyuevideo 的字幕提取功能

    
xiaoyuevideo 项目内置了针对不同平台的字幕提取脚本：

    
- **extract_caption.py：**通用语音转文字，基于 Whisper + LLM 修正错别字，适用于本地视频文件

    - **extract_caption_douyin.py：**抖音文案提取，支持 --desc-only 仅拉取描述（快，无需下载视频），或 --local 对已下载视频做语音转文字

    - **extract_caption_bilibili.py：**B站字幕下载，直接获取 CC 字幕和 AI 生成字幕，输出 SRT 格式

    - **extract_caption_youtube.py：**YouTube 字幕下载，支持多语言（zh-Hans/en/ja 等），包含手动和自动字幕

    
这些脚本让字幕提取从下载、识别到输出的全过程自动化，无需手动操作各个工具。


    ### 实用技巧

    
- 输入音频建议统一为 16kHz 单声道 WAV（Whisper 的最佳输入格式）

    - 背景噪音严重时，先做人声分离（Spleeter / CAM++），再单独处理人声轨

    - 多说话人场景可配合 speaker diarization（如 pyannote-audio）实现说话人标签

    - 长视频（>1 小时）建议使用 Faster-Whisper + INT8 量化，显存占用降低 60%


### 相关下载链接

- **OpenAI Whisper**：[https://github.com/openai/whisper](https://github.com/openai/whisper)
- **Faster-Whisper**：[https://github.com/SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper)
