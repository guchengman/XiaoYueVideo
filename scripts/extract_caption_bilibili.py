"""
Download subtitles/captions from Bilibili videos.

Usage:
  python scripts/extract_caption_bilibili.py <url>
  python scripts/extract_caption_bilibili.py "https://www.bilibili.com/video/BV1xx411c7mD"
  python scripts/extract_caption_bilibili.py "https://space.bilibili.com/123456" --playlist

Method:
  Uses yt-dlp to download subtitles (CC + auto-generated) without downloading the video.
  Supports: uploaded CC subtitles, AI-generated subtitles (auto-captions).

Output:
  Saves .srt/.vtt subtitle files to captions/bilibili/

Dependencies:
  yt-dlp (or tools/yt-dlp.exe)

Notes:
  - Bilibili auto-captions only available for some videos
  - May require cookies for certain content (cookies/bilibili.txt)
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path

CAPTIONS_DIR = Path(__file__).resolve().parent.parent / "captions" / "bilibili"
COOKIES_DIR = Path(__file__).resolve().parent.parent / "cookies"

YTDLP = os.environ.get("YTDLP", "yt-dlp")
if not os.environ.get("YTDLP"):
    local = Path(__file__).resolve().parent.parent / "tools" / "yt-dlp.exe"
    if local.exists():
        YTDLP = str(local)

# Subtitle language priorities
SUB_LANGS = "zh-Hans,zh-CN,zh-TW,zh,ai-zh,en"


def download_subs(url: str, output_dir: Path, playlist: bool = False,
                  cookies_file: str | None = None, write_auto: bool = True,
                  convert_srt: bool = True, embed_metadata: bool = False) -> int:
    """Download subtitles only (no video). Returns count of files created."""
    output_dir.mkdir(parents=True, exist_ok=True)

    before = set(output_dir.rglob("*"))

    output_tpl = str(output_dir / "bilibili_%(id)s_%(title).80s.%(ext)s")

    cmd = [
        YTDLP,
        "--no-check-certificates",
        "--geo-bypass",
        "--ignore-errors",
        "--skip-download",               # Don't download video
        "--write-subs",                   # Download uploaded CC subtitles
        "--sub-langs", SUB_LANGS,
        "-o", output_tpl,
    ]

    if write_auto:
        cmd.append("--write-auto-subs")   # Download AI-generated captions

    if convert_srt:
        cmd.append("--convert-subs")
        cmd.append("srt")                 # Convert to SRT format

    if embed_metadata:
        cmd.append("--embed-metadata")

    if not playlist:
        cmd.append("--no-playlist")

    if cookies_file:
        cookie_path = COOKIES_DIR / cookies_file
        if cookie_path.exists():
            cmd += ["--cookies", str(cookie_path)]

    cmd.append(url)

    print(f"  [CMD] yt-dlp --skip-download --write-subs ...")
    result = subprocess.run(cmd, timeout=600)

    after = set(output_dir.rglob("*"))
    new_files = after - before

    if result.returncode != 0:
        print(f"  [WARN] yt-dlp exit code: {result.returncode}")

    return len(new_files)


def main():
    parser = argparse.ArgumentParser(description="Download Bilibili subtitles")
    parser.add_argument("url", help="Bilibili video/space URL")
    parser.add_argument("--playlist", action="store_true", help="Download subtitles for playlist")
    parser.add_argument("--no-auto", action="store_true", help="Skip AI-generated captions (CC only)")
    parser.add_argument("--cookies", default="bilibili.txt", help="Cookies file in cookies/ dir")
    parser.add_argument("--out-dir", "-o", default=None, help="Output directory")
    args = parser.parse_args()

    output_dir = Path(args.out_dir) if args.out_dir else CAPTIONS_DIR
    output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 50)
    print("  Bilibili Caption Downloader")
    print("=" * 50)
    print()
    print(f"  URL:       {args.url}")
    print(f"  Output:    {output_dir}")
    print(f"  Auto subs: {'yes' if not args.no_auto else 'no'}")
    print()

    count = download_subs(
        args.url, output_dir,
        playlist=args.playlist,
        cookies_file=args.cookies,
        write_auto=not args.no_auto,
    )

    print()
    print("=" * 50)
    if count > 0:
        print(f"  Done! {count} new subtitle file(s)")
    else:
        print(f"  No subtitles found for this video")
        print(f"  (Bilibili may not have CC or auto-captions for this content)")
    print(f"  Saved to: {output_dir}")
    print("=" * 50)


if __name__ == "__main__":
    main()
