---
title: 'MoneyPrinterTurbo：20K Star 的 AI 短视频工厂，一键生成爆款'
groupId: 'a1b2c3d4-3005-4f1e-9a2b-1c3d5e7f8a9b'
summary: '输入一个主题，AI 自动写脚本、配音、匹配画面、加字幕、生成视频。GitHub 20K+ Star 的开源项目，支持中文、多种大模型和 TTS 语音。手把手搭建自己的短视频生产线。'
date: 2026-05-25
---

如果你做过短视频创作，一定经历过这些痛苦：写脚本（半天）、录音（嘴瓢 N 次）、找素材（翻遍图库）、剪辑（熬夜）、加字幕（眼睛看花）。[MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) 的目标就是消灭这些痛苦——你只需输入一个主题，剩下的交给 AI。


    ### 一键生成短视频

    
操作流程：

    1. 输入一个主题（如"一分钟看懂量子纠缠"）

    2. AI 自动生成视频脚本（可手动编辑）

    3. 选择配音音色（多种 TTS 引擎）

    4. 点击"生成视频"→ 等待几分钟 → 拿到成品

    
生成的视频包含：AI 配音旁白 + 自动匹配的画面素材 + 同步字幕 + 背景音乐，可直接发布到抖音/B站/YouTube。


    ### 技术架构

    
后端 Python + Flask，提供 Web UI 和 API 接口。脚本生成接入了 ChatGPT/DeepSeek/通义千问等多种大模型。配音支持 Edge TTS、OpenAI TTS、Azure TTS。画面素材自动搜索 Pexels/Pixabay 等免版权库。


    ### 适用内容类型

    
科普解说类（最适合）：输入知识点，AI 生成通俗解说视频

    新闻快讯类：输入新闻标题，30 秒速览

    产品介绍类：输入产品名和卖点，生成宣传短片


    ### 部署建议

    
最低 2 核 4GB 内存即可运行。建议 RTX 显卡加速 Whisper 转录。Docker 和手动部署两种方式都支持。


    
注意：自动生成的视频缺乏"人味儿"，建议作为初稿使用，在 AI 基础上人工调整效果会更好。


### 相关下载链接

- **MoneyPrinterTurbo**：[https://github.com/harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)
