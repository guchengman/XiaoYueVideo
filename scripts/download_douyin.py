"""
Download all videos from a Douyin user.

Usage:
  python scripts/download_douyin.py <share_link>
  python scripts/download_douyin.py "https://v.douyin.com/OQD9yDKzOz0/"
  python scripts/download_douyin.py <sec_uid> --sec-uid

Dependencies:
  pip install requests

Download method:
  1. Resolve share link -> sec_uid
  2. Use autocli (browser) to fetch video list via Douyin API
  3. Download each video via curl or yt-dlp

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


def extract_sec_uid(share_url: str) -> str | None:
    """Resolve share link and extract sec_uid."""
    try:
        import requests
        resp = requests.get(share_url, allow_redirects=True, timeout=10,
                            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"})
        # Try sec_uid parameter first
        match = re.search(r'sec_uid=([^&]+)', resp.url)
        if match:
            return urllib.parse.unquote(match.group(1))
        # Try /user/ path
        match = re.search(r'/user/([^?&]+)', resp.url)
        if match:
            return match.group(1)
        # Video URL -> need to extract from page
        match = re.search(r'/video/(\d+)', resp.url)
        if match:
            return None  # signal: this is a video, need page-level extraction
        print(f"  [ERR] Cannot extract user ID from: {resp.url}")
    except Exception as e:
        print(f"  [ERR] Failed to resolve share link: {e}")
    return None


def get_sec_uid_from_video(video_id: str) -> str | None:
    """Get sec_uid from a video page via HTTP."""
    url = f"https://www.douyin.com/video/{video_id}"
    try:
        import requests
        resp = requests.get(url, timeout=15, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Referer": "https://www.douyin.com/",
        })
        html = resp.text
        # Look for sec_uid in embedded JSON (SIGI_STATE / RENDER_DATA)
        match = re.search(r'"sec_uid"\s*:\s*"([^"]+)"', html)
        if match:
            return match.group(1)
    except Exception as e:
        print(f"  [WARN] HTTP extraction failed: {e}")
    return None


def get_video_list_via_autocli(sec_uid: str) -> list[dict]:
    """Get video list via autocli douyin adapter (browser-based API call)."""
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
        else:
            print(f"         stdout: {(result.stdout or '')[:200]}")
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
        print(f"         Raw: {stdout[:200]}")
        return []


def download_video_curl(video_id: str, play_url: str, desc: str, dest: Path,
                        index: int = 1, total: int = 1) -> bool:
    """Download a single video via curl."""
    safe_desc = re.sub(r'[\\/:*?"<>|#]', '', desc)[:50]
    filename = f"douyin_{video_id}_{safe_desc}.mp4"
    filepath = dest / filename

    if filepath.exists():
        size_mb = filepath.stat().st_size / 1_048_576
        print(f"  [{index}/{total}] Skipped (exists {size_mb:.1f}MB) - {filename}")
        return True

    label = f"[{index}/{total}]" if total > 1 else ""
    desc_short = desc[:40] if len(desc) > 40 else desc
    print(f"  {label} Downloading: {desc_short}...")

    for attempt in range(1, 4):
        try:
            subprocess.run(
                ["curl.exe", "-L", "-o", str(filepath),
                 "-H", "Referer: https://www.douyin.com/",
                 "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                 "--speed-time", "15", "--speed-limit", "1024",
                 play_url],
                timeout=120, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
            )
            if filepath.exists() and filepath.stat().st_size > 50 * 1024:
                size_mb = filepath.stat().st_size / 1_048_576
                print(f"  {label} {size_mb:.1f}MB - {filename}")
                return True
            filepath.unlink(missing_ok=True)
            if attempt < 3:
                print(f"  {label} Retry {attempt}/3...")
                time.sleep(2)
        except Exception:
            filepath.unlink(missing_ok=True)
            if attempt < 3:
                print(f"  {label} Retry {attempt}/3...")
                time.sleep(2)

    print(f"  [ERR] {label} Download failed after 3 attempts")
    return False


def main():
    parser = argparse.ArgumentParser(description="Download Douyin user videos")
    parser.add_argument("url", help="Share link or sec_uid")
    parser.add_argument("--sec-uid", action="store_true", help="Treat url as sec_uid directly")
    parser.add_argument("--limit", "-l", type=int, default=0, help="Max videos (0=all)")
    args = parser.parse_args()

    RAW_DIR.mkdir(parents=True, exist_ok=True)

    print("============================================")
    print("  Douyin Video Downloader")
    print("============================================")
    print()

    # ====== Step 1: Get sec_uid / video_id ======
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
            # Video link — extract video_id
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

    # ====== Step 2: Ask download preference ======
    download_all = True
    if single_vid and not sec_uid:
        answer = input("  Download all videos from this user? (Y/n): ").strip().lower()
        download_all = answer in ("", "y", "yes")

    # ====== Step 3: Get video list ======
    videos = []
    if download_all:
        # Need sec_uid for all-video download
        if not sec_uid and single_vid:
            print("  [INFO] Extracting user ID from video page...")
            sec_uid = get_sec_uid_from_video(single_vid)

        if not sec_uid:
            print("  [ERR] Cannot determine user ID")
            sys.exit(1)

        print("  [2/3] Fetching video list...")
        videos = get_video_list_via_autocli(sec_uid)

        if not videos:
            print("  [ERR] No videos found. Make sure:")
            print("         1. Chrome is open and logged into douyin.com")
            print("         2. autocli extension is installed")
            print("         3. Chrome can access douyin.com")
            sys.exit(1)

        if args.limit > 0:
            videos = videos[:args.limit]

        print(f"  [OK] Total: {len(videos)} videos")
        print()

    else:
        # Single video download
        print("  [2/3] Preparing single video download...")
        # Try to find this video in the user's list
        if single_vid:
            # Get sec_uid if we don't have it
            if not sec_uid:
                sec_uid = get_sec_uid_from_video(single_vid)
            if sec_uid:
                all_videos = get_video_list_via_autocli(sec_uid)
                for v in all_videos:
                    if v.get("aweme_id") == single_vid:
                        videos = [v]
                        break
            # Fallback: use yt-dlp directly
            if not videos:
                print("  [INFO] Falling back to yt-dlp for single video...")
                url = f"https://www.douyin.com/video/{single_vid}"
                output = str(RAW_DIR / "%(id)s_%(title)s.%(ext)s")
                subprocess.run(
                    ["yt-dlp", "--no-check-certificates", "--geo-bypass",
                     "-o", output, "--ignore-errors", url],
                    timeout=300,
                )
                return

        if not videos:
            print("  [ERR] Could not find video data")
            sys.exit(1)

    # Step 3: Download videos
    print("  [3/3] Downloading videos...")
    success = 0
    failed = 0
    total = len(videos)

    for i, v in enumerate(videos, 1):
        vid = v.get("aweme_id", v.get("id", ""))
        play_url = v.get("play_url", v.get("url", ""))
        desc = v.get("desc", "")

        if not vid or not play_url:
            print(f"  [WARN] [{i}/{total}] Skipped (missing data)")
            failed += 1
            continue

        ok = download_video_curl(vid, play_url, desc, RAW_DIR, i, total)
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
