"""
Download/extract audio from Douyin videos.

Usage:
  python scripts/download_douyin_audio.py <share_link>
  python scripts/download_douyin_audio.py "https://v.douyin.com/OQD9yDKzOz0/"
  python scripts/download_douyin_audio.py <sec_uid> --sec-uid

Dependencies:
  pip install requests
  yt-dlp (or tools/yt-dlp.exe)

Method:
  1. Resolve share link -> sec_uid
  2. Use autocli (browser) to fetch video list
  3. Download audio via yt-dlp (extracts audio track only)

Prerequisites:
  - Chrome open and logged into douyin.com
  - autocli extension installed
"""

import argparse
import json
import os
import re
import subprocess
import sys
import time
import urllib.parse
from pathlib import Path

RAW_DIR = Path(__file__).resolve().parent.parent / "raw"

YTDLP = os.environ.get("YTDLP", "yt-dlp")
if not os.environ.get("YTDLP"):
    local = Path(__file__).resolve().parent.parent / "tools" / "yt-dlp.exe"
    if local.exists():
        YTDLP = str(local)


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
        match = re.search(r'/video/(\d+)', resp.url)
        if match:
            return None
        print(f"  [ERR] Cannot extract user ID from: {resp.url}")
    except Exception as e:
        print(f"  [ERR] Failed to resolve share link: {e}")
    return None


def get_sec_uid_from_video(video_id: str) -> str | None:
    url = f"https://www.douyin.com/video/{video_id}"
    try:
        import requests
        resp = requests.get(url, timeout=15, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Referer": "https://www.douyin.com/",
        })
        html = resp.text
        match = re.search(r'"sec_uid"\s*:\s*"([^"]+)"', html)
        if match:
            return match.group(1)
    except Exception as e:
        print(f"  [WARN] HTTP extraction failed: {e}")
    return None


def get_video_list_via_autocli(sec_uid: str) -> list[dict]:
    print("  [INFO] Fetching video list via autocli (browser)...")
    result = subprocess.run(
        ["autocli", "douyin", "videos", "--sec_uid", sec_uid, "--format", "json"],
        capture_output=True, encoding="utf-8", timeout=60,
        env={**os.environ, "PYTHONIOENCODING": "utf-8"},
    )
    if result.returncode != 0:
        print(f"  [ERR] autocli failed (exit {result.returncode})")
        stderr = (result.stderr or "").strip()
        if stderr:
            print(f"         {stderr[:300]}")
        return []

    stdout = result.stdout or ""
    try:
        videos = json.loads(stdout)
        if not isinstance(videos, list):
            print(f"  [ERR] Unexpected response format")
            return []
        print(f"  [INFO] Found {len(videos)} videos")
        return videos
    except json.JSONDecodeError as e:
        print(f"  [ERR] Failed to parse autocli output: {e}")
        return []


def download_audio_ytdlp(aweme_id: str, desc: str, index: int = 1, total: int = 1) -> bool:
    """Download audio from a single Douyin video via yt-dlp."""
    safe_desc = re.sub(r'[\\/:*?"<>|#]', '', desc)[:50]
    filename_base = f"douyin_{aweme_id}_{safe_desc}"
    filepath = RAW_DIR / f"{filename_base}.mp3"

    if filepath.exists() and filepath.stat().st_size > 10 * 1024:
        size_mb = filepath.stat().st_size / 1_048_576
        print(f"  [{index}/{total}] Skipped (exists {size_mb:.1f}MB) - {filepath.name}")
        return True

    # Also check for m4a output
    m4a_path = RAW_DIR / f"{filename_base}.m4a"
    if m4a_path.exists() and m4a_path.stat().st_size > 10 * 1024:
        size_mb = m4a_path.stat().st_size / 1_048_576
        print(f"  [{index}/{total}] Skipped (exists {size_mb:.1f}MB) - {m4a_path.name}")
        return True

    label = f"[{index}/{total}]" if total > 1 else ""
    desc_short = desc[:40] if len(desc) > 40 else desc
    print(f"  {label} Downloading audio: {desc_short}...")

    video_url = f"https://www.douyin.com/video/{aweme_id}"
    output_tpl = str(RAW_DIR / f"douyin_{aweme_id}_%(title).50s.%(ext)s")

    cmd = [
        YTDLP,
        "--no-check-certificates",
        "--geo-bypass",
        "-x", "--audio-format", "mp3",
        "--audio-quality", "0",
        "-o", output_tpl,
        "--no-playlist",
        "--ignore-errors",
        video_url,
    ]

    for attempt in range(1, 4):
        try:
            result = subprocess.run(cmd, timeout=120, capture_output=True, text=True)
            # yt-dlp exits 0 on success; check if any audio file was created
            audio_files = list(RAW_DIR.glob(f"douyin_{aweme_id}_*.mp3")) + list(RAW_DIR.glob(f"douyin_{aweme_id}_*.m4a"))
            if audio_files:
                size_mb = audio_files[0].stat().st_size / 1_048_576
                print(f"  {label} {size_mb:.1f}MB - {audio_files[0].name}")
                return True
            if attempt < 3:
                print(f"  {label} Retry {attempt}/3...")
                time.sleep(2)
        except subprocess.TimeoutExpired:
            if attempt < 3:
                print(f"  {label} Timeout, retry {attempt}/3...")
                time.sleep(2)
        except Exception as e:
            if attempt < 3:
                print(f"  {label} Error: {e}, retry {attempt}/3...")
                time.sleep(2)

    print(f"  [ERR] {label} Download failed after 3 attempts")
    return False


def main():
    parser = argparse.ArgumentParser(description="Download audio from Douyin videos")
    parser.add_argument("url", help="Share link or sec_uid")
    parser.add_argument("--sec-uid", action="store_true", help="Treat url as sec_uid directly")
    parser.add_argument("--limit", "-l", type=int, default=0, help="Max videos (0=all)")
    parser.add_argument("--format", "-f", default="mp3", choices=["mp3", "m4a", "wav"],
                        help="Audio output format (default: mp3)")
    args = parser.parse_args()

    RAW_DIR.mkdir(parents=True, exist_ok=True)

    print("============================================")
    print("  Douyin Audio Downloader")
    print("============================================")
    print()

    # Step 1: Get sec_uid / video_id
    print("  [1/3] Resolving link...")
    sec_uid = None
    single_vid = None

    if args.sec_uid:
        sec_uid = args.url
        print(f"  [OK] User ID: {sec_uid}")
    elif "douyin.com" in args.url or "v.douyin" in args.url:
        extracted = extract_sec_uid(args.url)
        if extracted:
            sec_uid = extracted
            print(f"  [OK] User ID: {sec_uid}")
        else:
            match = re.search(r'/video/(\d+)', args.url)
            if match:
                single_vid = match.group(1)
                print(f"  [OK] Video ID: {single_vid}")
            else:
                print("  [ERR] Could not extract user ID or video ID from link")
                sys.exit(1)
    else:
        sec_uid = args.url
        print(f"  [INFO] Using input as sec_uid")
    print()

    # Step 2: Get video list
    videos = []
    if single_vid and not sec_uid:
        answer = input("  Download audio from all videos of this user? (Y/n): ").strip().lower()
        if answer in ("", "y", "yes"):
            print("  [INFO] Extracting user ID from video page...")
            sec_uid = get_sec_uid_from_video(single_vid)
        else:
            print("  [2/3] Downloading single video audio...")
            subprocess.run(
                [YTDLP, "--no-check-certificates", "--geo-bypass",
                 "-x", "--audio-format", args.format, "--audio-quality", "0",
                 "-o", str(RAW_DIR / "%(id)s_%(title).50s.%(ext)s"),
                 "--ignore-errors",
                 f"https://www.douyin.com/video/{single_vid}"],
                timeout=300,
            )
            print()
            print("============================================")
            print(f"  Done! Saved to: {RAW_DIR}")
            print("============================================")
            return

    if not single_vid or sec_uid:
        if not sec_uid:
            print("  [ERR] Cannot determine user ID")
            sys.exit(1)

        print("  [2/3] Fetching video list...")
        videos = get_video_list_via_autocli(sec_uid)

        if not videos:
            print("  [ERR] No videos found. Make sure:")
            print("         1. Chrome is open and logged into douyin.com")
            print("         2. autocli extension is installed")
            sys.exit(1)

        if args.limit > 0:
            videos = videos[:args.limit]

        print(f"  [OK] Total: {len(videos)} videos")
        print()

    # Step 3: Download audio
    print("  [3/3] Downloading audio...")
    success = 0
    failed = 0
    total = len(videos)

    for i, v in enumerate(videos, 1):
        vid = v.get("aweme_id", v.get("id", ""))
        desc = v.get("desc", "")

        if not vid:
            print(f"  [WARN] [{i}/{total}] Skipped (missing ID)")
            failed += 1
            continue

        ok = download_audio_ytdlp(vid, desc, i, total)
        if ok:
            success += 1
        else:
            failed += 1

        if i < total:
            time.sleep(1)

    print()
    print("============================================")
    print(f"  Done! Success: {success}, Failed: {failed}")
    print(f"  Saved to: {RAW_DIR}")
    print("============================================")


if __name__ == "__main__":
    main()
