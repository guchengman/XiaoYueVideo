---
title: 'Whisper.cpp：CPU 上跑语音识别比官方快 4 倍，无需 GPU'
groupId: 'a1b2c3d4-3008-4f1e-9a2b-1c3d5e7f8a9b'
summary: 'OpenAI Whisper 很强但 Python 版太慢。Whisper.cpp 用 C/C++ 重写，CPU 上就能跑出比官方版快 4 倍的速度，还能跑在树莓派上。手把手教你编译和使用。'
date: 2026-05-25
---

OpenAI 开源的 Whisper 语音识别模型支持 99 种语言，准确率极高。但官方 Python 实现在 CPU 上跑得非常慢（1 小时视频可能需 2-3 小时处理）。[Whisper.cpp](https://github.com/ggerganov/whisper.cpp) 用纯 C/C++ 重写推理引擎，解决了这个痛点。


    ### 核心优势

    
**速度快 4 倍：**同等 CPU 硬件上，whisper.cpp 比官方 Python 版快 3-4 倍。30 分钟的视频，官方版约 40 分钟，whisper.cpp 只需 10-12 分钟。

    
**零依赖：**不依赖 Python、PyTorch、CUDA。单二进制文件，下载即用。

    
**内存省：**官方 large-v3 模型需约 5GB 内存，whisper.cpp 优化后仅需 2-3GB。

    
**跨平台：**Windows/macOS/Linux，甚至树莓派和 iPhone 上都能跑。


    ### 安装使用

    
`git clone https://github.com/ggerganov/whisper.cpp.git

    cd whisper.cpp && make -j

    bash models/download-ggml-model.sh medium

    ./main -m models/ggml-medium.bin -f audio.wav -l zh -osrt`

    
-l zh 指定中文，-osrt 输出 SRT 字幕格式。


    ### 模型选择

    
tiny：极快但准确率一般，适合实时演示

    base/small：速度和准确率的平衡

    medium：推荐，最佳平衡点

    large-v3：最准确，需要 4GB+ 内存


    ### 集成到工作流

    
Whisper.cpp 提供 C API，可被其他语言调用。Trove、Cut/Storm 等开源项目已在使用它作为转录引擎。如果你在搭建视频处理流水线，whisper.cpp 是本地转录的最佳选择。


### 相关下载链接

- **Whisper.cpp**：[https://github.com/ggerganov/whisper.cpp](https://github.com/ggerganov/whisper.cpp)
