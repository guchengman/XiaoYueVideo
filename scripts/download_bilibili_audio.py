"""
Extract audio from Bilibili videos.

Usage:
  python scripts/download_bilibili_audio.py <url>
  python scripts/download_bilibili_audio.py "https://www.bilibili.com/video/BV1xx411c7mD"
  python scripts/download_bilibili_audio.py "https://space.bilibili.com/123456" --playlist

Dependencies:
  yt-dlp (or tools/yt-dlp.exe)

Method:
  Uses yt-dlp to download and extract audio track from Bilibili videos.
  Supports single video, playlist, and user-space batch downloads.

Notes:
  - For high-quality audio, uses best available audio stream
  - Bilibili may require cookies for some content; place cookies in cookies/bilibili.txt
"""

import argparse
import os
import re
import subprocess
import sys
from pathlib import Path

RAW_DIR = Path(__file__).resolve().parent.parent / "raw"
COOKIES_DIR = Path(__file__).resolve().parent.parent / "cookies"

YTDLP = os.environ.get("YTDLP", "yt-dlp")
if not os.environ.get("YTDLP"):
    local = Path(__file__).resolve().parent.parent / "tools" / "yt-dlp.exe"
    if local.exists():
        YTDLP = str(local)

AUDIO_FORMATS = {
    "mp3": {"ext": "mp3", "opts": ["-x", "--audio-format", "mp3", "--audio-quality", "0"]},
    "m4a": {"ext": "m4a", "opts": ["-x", "--audio-format", "m4a", "--audio-quality", "0"]},
    "best": {"ext": "m4a", "opts": ["-f", "bestaudio[ext=m4a]/bestaudio", "--no-extract-audio"]},
    "flac": {"ext": "flac", "opts": ["-x", "--audio-format", "flac", "--audio-quality", "0"]},
}


def build_base_cmd(audio_fmt: str, cookies_file: str | None = None) -> list[str]:
    cmd = [
        YTDLP,
        "--no-check-certificates",
        "--geo-bypass",
        "--ignore-errors",
        "--no-playlist",
    ]

    if cookies_file:
        cookies_path = COOKIES_DIR / cookies_file
        if cookies_path.exists():
            cmd += ["--cookies", str(cookies_path)]
        else:
            print(f"  [WARN] Cookies file not found: {cookies_path}")

    fmt = AUDIO_FORMATS.get(audio_fmt, AUDIO_FORMATS["mp3"])
    cmd += fmt["opts"]

    return cmd


def download_audio(url: str, audio_fmt: str, cookies_file: str | None,
                   output_dir: Path, playlist: bool = False) -> tuple[int, int]:
    """Download audio from a single URL. Returns (success, failed)."""
    output_dir.mkdir(parents=True, exist_ok=True)

    cmd = build_base_cmd(audio_fmt, cookies_file)
    if playlist:
        cmd.remove("--no-playlist")

    ext = AUDIO_FORMATS[audio_fmt]["ext"]
    output_tpl = str(output_dir / "bilibili_%(id)s_%(title).80s.%(ext)s")
    cmd += ["-o", output_tpl, url]

    print(f"  [CMD] {' '.join(cmd[:6])} ...")
    result = subprocess.run(cmd, timeout=1800)

    if result.returncode == 0:
        return (1, 0)
    return (0, 1)


def main():
    parser = argparse.ArgumentParser(description="Extract audio from Bilibili videos")
    parser.add_argument("url", help="Bilibili video/space/playlist URL")
    parser.add_argument("--format", "-f", default="mp3", choices=list(AUDIO_FORMATS.keys()),
                        help="Audio output format (default: mp3)")
    parser.add_argument("--playlist", action="store_true",
                        help="Download entire playlist (off for single video)")
    parser.add_argument("--cookies", default="bilibili.txt",
                        help="Cookies file in cookies/ dir (default: bilibili.txt)")
    parser.add_argument("--out-dir", "-o", default=None,
                        help="Output directory (default: raw/)")
    args = parser.parse_args()

    output_dir = Path(args.out_dir) if args.out_dir else RAW_DIR
    output_dir.mkdir(parents=True, exist_ok=True)

    print("============================================")
    print("  Bilibili Audio Downloader")
    print("============================================")
    print()
    print(f"  URL: {args.url}")
    print(f"  Format: {args.format}")
    print(f"  Output: {output_dir}")
    if args.playlist:
        print(f"  Mode: Playlist")
    print()

    success, failed = download_audio(
        args.url, args.format, args.cookies, output_dir, args.playlist
    )

    print()
    print("============================================")
    print(f"  Done! Success: {success}, Failed: {failed}")
    print(f"  Saved to: {output_dir}")
    print("============================================")


if __name__ == "__main__":
    main()
