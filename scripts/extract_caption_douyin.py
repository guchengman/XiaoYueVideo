"""
Extract captions from Douyin videos — description text from autocli + speech-to-text.

Usage:
  python scripts/extract_caption_douyin.py <share_link_or_sec_uid>
  python scripts/extract_caption_douyin.py "https://v.douyin.com/xxx"    # fetch descs + download & transcribe
  python scripts/extract_caption_douyin.py <sec_uid> --sec-uid --desc-only   # only fetch descriptions
  python scripts/extract_caption_douyin.py <sec_uid> --sec-uid --local raw/  # transcribe local files

Modes:
  --desc-only   Fetch video descriptions only (fast, no download needed)
  --local       Transcribe already-downloaded video files in a directory
  (default)     Fetch descriptions + download and transcribe audio

Dependencies:
  pip install openai-whisper ffmpeg-python
  ffmpeg must be in PATH

Prerequisites:
  - Chrome open and logged into douyin.com (for autocli mode)
  - autocli extension installed
"""

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import urllib.parse
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

RAW_DIR = Path(__file__).resolve().parent.parent / "raw"
CAPTIONS_DIR = Path(__file__).resolve().parent.parent / "captions"

SUPPORTED_EXTS = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v", ".flv"}
WHISPER_MODEL = os.environ.get("WHISPER_MODEL", "medium")


# ====== Douyin API helpers (shared with download_douyin.py) ======

def extract_sec_uid(share_url: str) -> str | None:
    try:
        import requests
        resp = requests.get(share_url, allow_redirects=True, timeout=10,
                            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"})
        match = re.search(r'sec_uid=([^&]+)', resp.url)
        if match:
            return urllib.parse.unquote(match.group(1))
        match = re.search(r'/user/([^?&]+)', resp.url)
        if match:
            return match.group(1)
    except Exception as e:
        print(f"  [ERR] Failed to resolve share link: {e}")
    return None


def get_video_list_via_autocli(sec_uid: str) -> list[dict]:
    print("  [INFO] Fetching video list via autocli...")
    result = subprocess.run(
        ["autocli", "douyin", "videos", "--sec_uid", sec_uid, "--format", "json"],
        capture_output=True, encoding="utf-8", timeout=60,
        env={**os.environ, "PYTHONIOENCODING": "utf-8"},
    )
    if result.returncode != 0:
        print(f"  [ERR] autocli failed (exit {result.returncode})")
        return []
    try:
        videos = json.loads(result.stdout or "[]")
        if isinstance(videos, list):
            print(f"  [INFO] Found {len(videos)} videos")
            return videos
    except json.JSONDecodeError:
        pass
    return []


# ====== Description fetch ======

def fetch_descriptions(sec_uid: str, limit: int = 0) -> list[dict]:
    """Fetch video descriptions (文案) from Douyin via autocli."""
    videos = get_video_list_via_autocli(sec_uid)
    if not videos:
        return []

    if limit > 0:
        videos = videos[:limit]

    captions = []
    for v in videos:
        captions.append({
            "aweme_id": v.get("aweme_id", ""),
            "desc": v.get("desc", ""),
        })
    return captions


def save_descriptions(captions: list[dict], output_dir: Path):
    """Save descriptions to captions/ directory."""
    output_dir.mkdir(parents=True, exist_ok=True)

    for i, c in enumerate(captions, 1):
        aid = c["aweme_id"]
        desc = c["desc"]
        if not desc:
            continue

        filepath = output_dir / f"douyin_{aid}_desc.txt"
        if filepath.exists():
            print(f"  [{i}/{len(captions)}] Skipped (exists) - {filepath.name}")
            continue

        filepath.write_text(desc, encoding="utf-8")
        print(f"  [{i}/{len(captions)}] {filepath.name} ({len(desc)} chars)")

    # Write combined manifest
    manifest = output_dir / f"douyin_{captions[0]['aweme_id'][:8]}_all.txt" if captions else None
    if manifest and len(captions) > 1:
        lines = []
        for c in captions:
            if c["desc"]:
                lines.append(f"--- {c['aweme_id']} ---")
                lines.append(c["desc"])
                lines.append("")
        manifest.write_text("\n".join(lines), encoding="utf-8")
        print(f"  [Manifest] {manifest.name} ({len(captions)} videos)")


# ====== Speech-to-text (shared logic) ======

def find_video_files(path: Path) -> list[Path]:
    if path.is_dir():
        return sorted([f for f in path.rglob("*") if f.suffix.lower() in SUPPORTED_EXTS])
    elif path.suffix.lower() in SUPPORTED_EXTS:
        return [path]
    return []


def has_audio_stream(video_path: Path) -> bool:
    try:
        import ffmpeg
        probe = ffmpeg.probe(str(video_path))
        return any(s.get("codec_type") == "audio" for s in probe.get("streams", []))
    except Exception:
        return True


def extract_audio(video_path: Path, audio_path: Path) -> bool:
    import ffmpeg
    print(f"  [音频] 提取音频...")
    try:
        (ffmpeg.input(str(video_path))
         .output(str(audio_path), format="wav", acodec="pcm_s16le", ar=16000, ac=1)
         .overwrite_output().run(quiet=True, capture_stdout=True, capture_stderr=True))
    except ffmpeg.Error as e:
        err = e.stderr.decode() if e.stderr else ""
        if "does not contain any stream" in err:
            print(f"  [警告] 无音轨，跳过")
            return False
        raise e
    return True


def transcribe(audio_path: Path) -> str:
    import whisper
    model = whisper.load_model(WHISPER_MODEL)
    result = model.transcribe(str(audio_path), language="zh", verbose=False)
    return result["text"].strip()


def transcribe_video(video_path: Path, output_dir: Path, force: bool = False):
    """Transcribe a single video file."""
    txt_path = output_dir / f"{video_path.stem}_transcript.txt"
    if txt_path.exists() and not force:
        print(f"  [跳过] 已存在: {txt_path.name}")
        return

    print(f"\n  [处理] {video_path.name}")

    if not has_audio_stream(video_path):
        print(f"  [警告] 无音轨")
        return

    with tempfile.TemporaryDirectory() as tmp_dir:
        audio_path = Path(tmp_dir) / "audio.wav"
        if not extract_audio(video_path, audio_path):
            return
        try:
            text = transcribe(audio_path)
        except Exception as e:
            print(f"  [错误] 转录失败: {e}")
            return

    if not text:
        print(f"  [警告] 未识别到语音内容")
        return

    txt_path.parent.mkdir(parents=True, exist_ok=True)
    txt_path.write_text(text, encoding="utf-8")
    print(f"  [完成] {txt_path.name} ({len(text)} chars)")


# ====== Main ======

def main():
    parser = argparse.ArgumentParser(description="Extract Douyin video captions")
    parser.add_argument("input", help="Share link, sec_uid, or local directory")
    parser.add_argument("--sec-uid", action="store_true", help="Treat input as sec_uid directly")
    parser.add_argument("--desc-only", action="store_true", help="Only fetch descriptions (no speech-to-text)")
    parser.add_argument("--local", action="store_true", help="Input is a local video file/directory")
    parser.add_argument("--limit", "-l", type=int, default=0, help="Max videos (0=all)")
    parser.add_argument("--force", "-f", action="store_true", help="Force re-transcribe")
    args = parser.parse_args()

    captions_dir = CAPTIONS_DIR / "douyin"
    captions_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 50)
    print("  Douyin Caption Extractor")
    print("=" * 50)
    print()

    # Mode 1: Local file transcription
    if args.local:
        input_path = Path(args.input)
        if not input_path.exists():
            print(f"[错误] 路径不存在: {input_path}")
            sys.exit(1)
        videos = find_video_files(input_path)
        print(f"[信息] 找到 {len(videos)} 个视频文件")
        for v in videos:
            transcribe_video(v, captions_dir, args.force)
        print(f"\n[完成] 文案保存到: {captions_dir}")
        return

    # Mode 2: Fetch from Douyin
    sec_uid = None
    if args.sec_uid:
        sec_uid = args.input
    elif "douyin.com" in args.input:
        sec_uid = extract_sec_uid(args.input)

    if not sec_uid:
        sec_uid = args.input  # try as-is

    print(f"  [1/2] Fetching descriptions for: {sec_uid}")
    print()
    captions = fetch_descriptions(sec_uid, args.limit)

    if not captions:
        print("  [ERR] No videos found")
        sys.exit(1)

    # Save descriptions
    print(f"  [2/2] Saving {len(captions)} descriptions...")
    save_descriptions(captions, captions_dir)

    # Show non-empty count
    with_desc = [c for c in captions if c["desc"]]
    print()
    print("=" * 50)
    print(f"  Done! {len(with_desc)}/{len(captions)} videos have descriptions")
    print(f"  Saved to: {captions_dir}")
    print("=" * 50)

    if not args.desc_only:
        print()
        print("  [提示] 如需语音转文字，先用 download_douyin.py 下载视频，")
        print("         再运行: python scripts/extract_caption_douyin.py raw/ --local")


if __name__ == "__main__":
    main()
