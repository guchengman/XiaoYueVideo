"""
提取视频文案并修正错别字/语病。

用法:
  python scripts/extract_caption.py <视频文件或目录>
  python scripts/extract_caption.py raw/20260520_vlog01_edit_v2.mp4
  python scripts/extract_caption.py publish/          # 批量处理目录下所有视频

依赖:
  pip install openai-whisper anthropic ffmpeg-python
  需要 ffmpeg 在 PATH 中

环境变量 (从 Claude Code 配置继承):
  ANTHROPIC_BASE_URL, ANTHROPIC_AUTH_TOKEN, ANTHROPIC_MODEL
"""

import argparse
import json
import os
import sys
import tempfile
from pathlib import Path

# 确保 stdout 支持 UTF-8
sys.stdout.reconfigure(encoding="utf-8")

# 读取 API 配置：优先环境变量，回退到 Claude Code 的 settings.json
_CLAUDE_SETTINGS = Path(os.environ.get("CLAUDE_CONFIG", "")) or (
    Path.home() / ".claude" / "settings.json"
)


def _read_claude_env(key: str, default: str = "") -> str:
    val = os.environ.get(key)
    if val:
        return val
    try:
        cfg = json.loads(_CLAUDE_SETTINGS.read_text(encoding="utf-8"))
        return cfg.get("env", {}).get(key, default)
    except Exception:
        return default


API_BASE = _read_claude_env("ANTHROPIC_BASE_URL", "https://api.deepseek.com/anthropic")
API_KEY = _read_claude_env("ANTHROPIC_AUTH_TOKEN", "")
API_MODEL = _read_claude_env("ANTHROPIC_MODEL", "deepseek-v4-flash")

SUPPORTED_EXTS = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v", ".flv"}

WHISPER_MODEL = os.environ.get("WHISPER_MODEL", "medium")


def find_video_files(path: Path) -> list[Path]:
    """找出所有视频文件。如果 path 是目录则递归扫描，否则返回单个文件。"""
    if path.is_dir():
        files = []
        for f in path.rglob("*"):
            if f.suffix.lower() in SUPPORTED_EXTS:
                files.append(f)
        return sorted(files)
    elif path.suffix.lower() in SUPPORTED_EXTS:
        return [path]
    else:
        print(f"[错误] 不支持的文件格式: {path}")
        sys.exit(1)


def has_audio_stream(video_path: Path) -> bool:
    """检查视频文件是否包含音频流。"""
    import ffmpeg

    try:
        probe = ffmpeg.probe(str(video_path))
        streams = probe.get("streams", [])
        return any(s.get("codec_type") == "audio" for s in streams)
    except Exception:
        return True  # 不确定时假定有音频，让后续步骤报错


def extract_audio(video_path: Path, audio_path: Path):
    """用 ffmpeg 提取音频为 16kHz WAV。"""
    import ffmpeg

    print(f"  [音频] 提取音频...")
    try:
        (
            ffmpeg.input(str(video_path))
            .output(str(audio_path), format="wav", acodec="pcm_s16le", ar=16000, ac=1)
            .overwrite_output()
            .run(quiet=True, capture_stdout=True, capture_stderr=True)
        )
    except ffmpeg.Error as e:
        err = e.stderr.decode() if e.stderr else ""
        if "does not contain any stream" in err:
            print(f"  [警告] 视频没有音轨，跳过")
            return False
        print(f"  [错误] ffmpeg 失败")
        raise e
    return True


def transcribe(audio_path: Path, model_name: str = WHISPER_MODEL) -> str:
    """用 Whisper 转录音频为文字。"""
    import whisper

    print(f"  [转录] 转录中 (模型: {model_name})...")
    model = whisper.load_model(model_name)
    result = model.transcribe(str(audio_path), language="zh", verbose=False)
    return result["text"].strip()


def correct_text(text: str) -> str:
    """调用 LLM 修正错别字和语句不通顺的地方。"""
    if not API_KEY:
        print("  [警告] 未设置 ANTHROPIC_AUTH_TOKEN，跳过修正")
        return text

    from anthropic import Anthropic

    client = Anthropic(base_url=API_BASE, api_key=API_KEY)

    print(f"  [修正] 修正文案中...")
    resp = client.messages.create(
        model=API_MODEL,
        max_tokens=4096,
        messages=[
            {
                "role": "user",
                "content": f"""你是一个专业的文案编辑。请修正以下文本中的错别字和语句不通顺之处。

要求：
- 只修正错别字和语病，不要改变原有表达风格和内容
- 不要添加原文没有的内容
- 保持分段/换行格式不变
- 直接输出修正后的文本，不要加任何解释

原文：
{text}""",
            },
        ],
    )
    return resp.content[0].text.strip()


def save_text(text: str, output_path: Path):
    """保存修正后的文案到文件。"""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(text, encoding="utf-8")
    print(f"  [完成] 已保存: {output_path}")


def process_video(video_path: Path, force: bool = False, model_name: str = WHISPER_MODEL,
                  output_dir: Path | None = None):
    """处理单个视频文件。"""
    txt_path = video_path.with_suffix(".txt")
    if output_dir:
        txt_path = output_dir / f"{video_path.stem}.txt"
    if txt_path.exists() and not force:
        print(f"  [跳过] 跳过 (文案已存在): {video_path.name}")
        return

    print(f"\n[处理] {video_path.name}")

    # 检查是否有音轨
    if not has_audio_stream(video_path):
        print(f"  [警告] 视频没有音轨，跳过")
        return

    # 提取音频到临时文件
    with tempfile.TemporaryDirectory() as tmp_dir:
        audio_path = Path(tmp_dir) / "audio.wav"

        ok = extract_audio(video_path, audio_path)
        if not ok:
            return

        if not audio_path.exists() or audio_path.stat().st_size == 0:
            print(f"  [错误] 音频文件为空")
            return

        try:
            raw_text = transcribe(audio_path, model_name)
        except Exception as e:
            print(f"  [错误] 转录失败: {e}")
            return

    if not raw_text:
        print(f"  [警告] 未识别到语音内容")
        return

    print(f"  [识别] 识别结果 ({len(raw_text)} 字): {raw_text[:80]}...")

    # 修正
    corrected = correct_text(raw_text)

    # 保存
    save_text(corrected, txt_path)


def main():
    parser = argparse.ArgumentParser(description="提取视频文案并修正错别字/语病")
    parser.add_argument("input", help="视频文件路径或目录")
    parser.add_argument("--output", "-o", help="输出目录（默认: 输入所在目录）")
    parser.add_argument("--force", "-f", action="store_true", help="强制重新提取（覆盖已有文案）")
    parser.add_argument("--model", help="Whisper 模型 (默认: " + WHISPER_MODEL + ")")
    args = parser.parse_args()

    model = args.model or WHISPER_MODEL

    input_path = Path(args.input)
    if not input_path.exists():
        print(f"[错误] 路径不存在: {input_path}")
        sys.exit(1)

    output_dir = Path(args.output) if args.output else None
    if output_dir:
        output_dir.mkdir(parents=True, exist_ok=True)

    videos = find_video_files(input_path)
    if not videos:
        print(f"[错误] 未找到视频文件")
        sys.exit(1)

    print(f"[信息] 找到 {len(videos)} 个视频文件")
    for i, v in enumerate(videos, 1):
        print(f"{'='*50}")
        print(f"[{i}/{len(videos)}]")
        process_video(v, args.force, model, output_dir)


if __name__ == "__main__":
    main()
