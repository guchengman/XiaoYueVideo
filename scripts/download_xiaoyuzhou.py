"""
Download podcast episodes from Xiaoyuzhou (小宇宙).

Usage:
  python scripts/download_xiaoyuzhou.py <podcast_url>
  python scripts/download_xiaoyuzhou.py "https://www.xiaoyuzhoufm.com/podcast/xxx"
  python scripts/download_xiaoyuzhou.py <pid> --pid

Dependencies:
  pip install requests

Method:
  1. Resolve podcast ID from URL or use directly
  2. Fetch episode list via Xiaoyuzhou API
  3. Download audio (mp3) for each episode

Notes:
  - Xiaoyuzhou audio URLs are typically public and don't require login
  - Supports batch download with --limit to control count
"""

import argparse
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

RAW_DIR = Path(__file__).resolve().parent.parent / "raw"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Referer": "https://www.xiaoyuzhoufm.com/",
}

API_EPISODES = "https://www.xiaoyuzhoufm.com/api/v2/podcast/episodes"


def extract_pid(url_or_id: str) -> str:
    """Extract podcast ID from URL or return as-is."""
    # Pattern: xiaoyuzhoufm.com/podcast/<pid> or xiaoyuzhoufm.com/episode/<eid>
    match = re.search(r'xiaoyuzhoufm\.com/(?:podcast|episode)/([a-zA-Z0-9]+)', url_or_id)
    if match:
        return match.group(1)
    # Assume it's already a PID
    if re.match(r'^[a-zA-Z0-9]+$', url_or_id.strip()):
        return url_or_id.strip()
    return ""


def fetch_episodes(pid: str, limit: int = 0) -> list[dict]:
    """Fetch episode list from Xiaoyuzhou API."""
    episodes = []
    offset = 0
    page_size = 30

    print(f"  [INFO] Fetching episodes for podcast: {pid}")

    try:
        import requests

        while True:
            params = {
                "pid": pid,
                "limit": page_size,
                "offset": offset,
                "order": "desc",
            }
            resp = requests.get(API_EPISODES, headers=HEADERS, params=params, timeout=15)
            resp.raise_for_status()
            data = resp.json()

            items = (
                data.get("data", [])
                or data.get("episodes", [])
                or data.get("items", [])
                or []
            )
            if not items:
                break

            for ep in items:
                episodes.append({
                    "eid": ep.get("eid", ""),
                    "title": ep.get("title", ""),
                    "duration": ep.get("duration", 0),
                    "audio_url": ep.get("audio") or ep.get("mediaUrl") or ep.get("enclosure", {}).get("url", ""),
                    "pub_date": ep.get("pubDate") or ep.get("publishedAt", ""),
                })

            if limit and len(episodes) >= limit:
                episodes = episodes[:limit]
                break

            if len(items) < page_size:
                break

            offset += page_size
            time.sleep(0.3)

    except Exception as e:
        print(f"  [ERR] API request failed: {e}")
        return []

    print(f"  [INFO] Found {len(episodes)} episodes")
    return episodes


def fetch_episodes_via_autocli(pid: str) -> list[dict]:
    """Fallback: fetch episode list via autocli browser automation."""
    print("  [INFO] Trying autocli for episode list...")
    try:
        result = subprocess.run(
            ["autocli", "xiaoyuzhou", "episodes", "--pid", pid, "--format", "json"],
            capture_output=True, encoding="utf-8", timeout=30,
            env={**os.environ, "PYTHONIOENCODING": "utf-8"},
        )
        if result.returncode == 0:
            data = json.loads(result.stdout or "[]")
            episodes = data if isinstance(data, list) else data.get("episodes", [])
            print(f"  [INFO] Found {len(episodes)} episodes via autocli")
            return episodes
        else:
            print(f"  [WARN] autocli failed: {(result.stderr or '')[:200]}")
    except Exception as e:
        print(f"  [WARN] autocli error: {e}")
    return []


def download_audio(eid: str, title: str, audio_url: str, index: int, total: int) -> bool:
    """Download a single audio file."""
    safe_title = re.sub(r'[\\/:*?"<>|#]', '', title)[:60]
    ext = ".mp3"
    if ".m4a" in audio_url:
        ext = ".m4a"
    elif ".wav" in audio_url:
        ext = ".wav"

    filename = f"xiaoyuzhou_{eid}_{safe_title}{ext}"
    filepath = RAW_DIR / filename

    if filepath.exists() and filepath.stat().st_size > 10 * 1024:
        size_mb = filepath.stat().st_size / 1_048_576
        print(f"  [{index}/{total}] Skipped (exists {size_mb:.1f}MB) - {filename}")
        return True

    label = f"[{index}/{total}]" if total > 1 else ""
    title_short = title[:50] if len(title) > 50 else title
    print(f"  {label} Downloading: {title_short}...")

    cmd = [
        "curl", "-L", "-C", "-",
        "-o", str(filepath),
        "-H", f"User-Agent: {HEADERS['User-Agent']}",
        "-H", f"Referer: {HEADERS['Referer']}",
        "--connect-timeout", "15",
        "--max-time", "600",
        audio_url,
    ]

    for attempt in range(1, 4):
        try:
            result = subprocess.run(cmd, timeout=600, capture_output=True, text=True)
            if filepath.exists() and filepath.stat().st_size > 10 * 1024:
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
    parser = argparse.ArgumentParser(description="Download Xiaoyuzhou podcast episodes")
    parser.add_argument("url", help="Podcast URL or PID")
    parser.add_argument("--pid", action="store_true", help="Treat url as PID directly")
    parser.add_argument("--limit", "-l", type=int, default=0, help="Max episodes (0=all)")
    parser.add_argument("--use-autocli", action="store_true",
                        help="Use autocli (browser) to fetch episode list")
    args = parser.parse_args()

    RAW_DIR.mkdir(parents=True, exist_ok=True)

    print("============================================")
    print("  Xiaoyuzhou Podcast Downloader")
    print("============================================")
    print()

    # Step 1: Resolve podcast ID
    print("  [1/3] Resolving podcast ID...")
    pid = args.url if args.pid else extract_pid(args.url)

    if not pid:
        print("  [ERR] Cannot extract podcast ID from input")
        print("        Provide a URL like: https://www.xiaoyuzhoufm.com/podcast/<pid>")
        print("        Or use --pid to pass the ID directly")
        sys.exit(1)

    print(f"  [OK] Podcast ID: {pid}")
    print()

    # Step 2: Fetch episode list
    print("  [2/3] Fetching episode list...")
    if args.use_autocli:
        episodes = fetch_episodes_via_autocli(pid)
    else:
        episodes = fetch_episodes(pid, args.limit)

    if not episodes:
        print("  [INFO] Trying autocli fallback...")
        episodes = fetch_episodes_via_autocli(pid)

    if not episodes:
        print("  [ERR] No episodes found")
        print("        Try --use-autocli if you're logged into xiaoyuzhoufm.com in Chrome")
        sys.exit(1)

    if args.limit > 0:
        episodes = episodes[:args.limit]

    print(f"  [OK] Total: {len(episodes)} episodes")
    print()

    # Step 3: Download audio
    print("  [3/3] Downloading audio...")
    success = 0
    failed = 0
    total = len(episodes)

    for i, ep in enumerate(episodes, 1):
        eid = ep.get("eid", "")
        title = ep.get("title", "")
        audio_url = ep.get("audio_url", "")

        if not audio_url:
            print(f"  [{i}/{total}] Skipped (no audio URL) - {title[:40]}")
            failed += 1
            continue

        ok = download_audio(eid, title, audio_url, i, total)
        if ok:
            success += 1
        else:
            failed += 1

        if i < total:
            time.sleep(0.5)

    print()
    print("============================================")
    print(f"  Done! Success: {success}, Failed: {failed}")
    print(f"  Saved to: {RAW_DIR}")
    print("============================================")


if __name__ == "__main__":
    main()
