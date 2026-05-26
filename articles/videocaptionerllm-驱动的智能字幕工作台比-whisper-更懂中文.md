---
title: 'VideoCaptioner：LLM 驱动的智能字幕工作台，比 Whisper 更懂中文'
groupId: 'a1b2c3d4-3013-4f1e-9a2b-1c3d5e7f8a9b'
summary: 'Whisper 的中文识别总有"AI 味"？VideoCaptioner 在 Whisper 基础上增加 LLM 校正——大模型修正错别字、优化断句、润色表达。同时支持翻译、双语输出和视频压制。'
date: 2026-05-25
---

用过 Whisper 做中文字幕的人都有同感：大部分时候识别率不错，但总有字是错的。[VideoCaptioner](https://github.com/WEIFENG2333/VideoCaptioner) 用 LLM 解决了这个痛点——"百度"变成"白度"，"人工智能"变成"人功智能"，"卷积神经网络"各种花样翻车。


    ### 工作流

    
Whisper 转录 → LLM 校正错别字 → LLM 优化断句 → 翻译（可选）→ 压制字幕到视频

    
核心创新在第二步：Whisper 识别结果送到大模型（ChatGPT、Claude、DeepSeek、通义千问等），根据上下文纠正错别字，同时优化标点和断句。


    ### 一个例子

    
**Whisper 原始输出：**"在这个实验中我们使用了深对 learning 的房法你来看这个结果非常出忽亿了"

    **LLM 校正后：**"在这个实验中，我们使用了深度学习的算法。你看这个结果，非常出乎意料。"

    
校正前的字幕基本没法直接用，校正后可以直接出片。


    ### 部署方式

    
提供 Windows 图形界面和 Docker 两种部署。Windows 版适合个人用户，Docker 版适合批量处理。需配置 LLM API Key（ChatGPT 或国产模型均可）。


    ### 与 xiaoyuevideo 配合

    
xiaoyuevideo 下载视频 → 导入 VideoCaptioner 自动生成精校中文字幕。适合下载海外教程后快速配上高质量中文字幕。


### 相关下载链接

- **VideoCaptioner**：[https://github.com/WEIFENG2333/VideoCaptioner](https://github.com/WEIFENG2333/VideoCaptioner)
