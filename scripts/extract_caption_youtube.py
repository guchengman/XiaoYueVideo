"""
Download subtitles/captions from YouTube videos.

Usage:
  python scripts/extract_caption_youtube.py <url>
  python scripts/extract_caption_youtube.py "https://www.youtube.com/watch?v=xxx"
  python scripts/extract_caption_youtube.py "https://www.youtube.com/playlist?list=xxx" --playlist

Method:
  Uses yt-dlp to download subtitles (manual + auto-generated) without downloading the video.

Output:
  Saves .srt subtitle files to captions/youtube/

Dependencies:
  yt-dlp (or tools/yt-dlp.exe)

Notes:
  - YouTube auto-captions available for most videos
  - Specify --langs to customize subtitle language priority
  - May require cookies for age-restricted content (cookies/youtube.txt)
"""

import argparse
import os
import subprocess
from pathlib import Path

CAPTIONS_DIR = Path(__file__).resolve().parent.parent / "captions" / "youtube"
COOKIES_DIR = Path(__file__).resolve().parent.parent / "cookies"

YTDLP = os.environ.get("YTDLP", "yt-dlp")
if not os.environ.get("YTDLP"):
    local = Path(__file__).resolve().parent.parent / "tools" / "yt-dlp.exe"
    if local.exists():
        YTDLP = str(local)

DEFAULT_LANGS = "zh-Hans,zh-CN,zh-TW,zh,en,ja,ko"


def download_subs(url: str, output_dir: Path, playlist: bool = False,
                  cookies_file: str | None = None, langs: str = DEFAULT_LANGS,
                  write_auto: bool = True) -> int:
    """Download subtitles only (no video). Returns count of files created."""
    output_dir.mkdir(parents=True, exist_ok=True)

    before = set(output_dir.rglob("*"))

    output_tpl = str(output_dir / "youtube_%(id)s_%(title).80s.%(ext)s")

    cmd = [
        YTDLP,
        "--no-check-certificates",
        "--geo-bypass",
        "--ignore-errors",
        "--skip-download",
        "--write-subs",
        "--sub-langs", langs,
        "--convert-subs", "srt",
        "-o", output_tpl,
    ]

    if write_auto:
        cmd.append("--write-auto-subs")

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
    parser = argparse.ArgumentParser(description="Download YouTube subtitles")
    parser.add_argument("url", help="YouTube video/playlist URL")
    parser.add_argument("--playlist", action="store_true", help="Download subtitles for entire playlist")
    parser.add_argument("--no-auto", action="store_true", help="Skip auto-generated captions (manual only)")
    parser.add_argument("--langs", default=DEFAULT_LANGS,
                        help=f"Subtitle language priority (default: {DEFAULT_LANGS})")
    parser.add_argument("--cookies", default="youtube.txt", help="Cookies file in cookies/ dir")
    parser.add_argument("--out-dir", "-o", default=None, help="Output directory")
    args = parser.parse_args()

    output_dir = Path(args.out_dir) if args.out_dir else CAPTIONS_DIR
    output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 50)
    print("  YouTube Caption Downloader")
    print("=" * 50)
    print()
    print(f"  URL:       {args.url}")
    print(f"  Output:    {output_dir}")
    print(f"  Languages: {args.langs}")
    print(f"  Auto subs: {'yes' if not args.no_auto else 'no'}")
    print()

    count = download_subs(
        args.url, output_dir,
        playlist=args.playlist,
        cookies_file=args.cookies,
        langs=args.langs,
        write_auto=not args.no_auto,
    )

    print()
    print("=" * 50)
    if count > 0:
        print(f"  Done! {count} new subtitle file(s)")
    else:
        print(f"  No subtitles found for this video")
        print(f"  Try different --langs or check if the video has captions")
    print(f"  Saved to: {output_dir}")
    print("=" * 50)


if __name__ == "__main__":
    main()
