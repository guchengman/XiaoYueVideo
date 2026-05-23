"""
微信视频号视频下载器
Usage: python download_wechat_video.py <video_url>
Dependencies: pip install requests
Prerequisite: ffmpeg installed and in PATH (https://ffmpeg.org/download.html)
"""

import datetime

import requests
import re
import subprocess
import os
import sys
from urllib.parse import urljoin

# ---------- Configuration ----------
SAVE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "publish")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}


def get_real_m3u8(url: str) -> str:
    """Fetch the video page and extract the m3u8 URL."""
    try:
        res = requests.get(url, headers=HEADERS, timeout=15, allow_redirects=True)
        res.raise_for_status()
        html = res.text

        # Match m3u8 URLs (common patterns in video page source)
        pattern = r'https?://[^\s"<>]+\.m3u8[^\s"<>]*'
        match = re.search(pattern, html)
        if not match:
            raise Exception("No m3u8 video URL found in the page")

        m3u8_url = match.group(0)

        # Handle relative URLs
        if not m3u8_url.startswith("http"):
            m3u8_url = urljoin(url, m3u8_url)

        return m3u8_url

    except requests.exceptions.Timeout:
        raise Exception("Request timed out (15s). Check the link or your network.")
    except requests.exceptions.HTTPError as e:
        raise Exception(f"HTTP error: {e.response.status_code} {e.response.reason}")
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {e}")


def check_ffmpeg():
    """Verify ffmpeg is installed and accessible."""
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        raise Exception(
            "ffmpeg not found. Install from https://ffmpeg.org/download.html "
            "and add the bin directory to your system PATH, then restart your terminal."
        )


def download_m3u8(m3u8_url: str, save_name: str):
    """Download video from m3u8 URL using ffmpeg."""
    os.makedirs(SAVE_DIR, exist_ok=True)
    output = os.path.join(SAVE_DIR, f"{save_name}.mp4")

    check_ffmpeg()

    cmd = [
        "ffmpeg",
        "-user_agent", HEADERS["User-Agent"],
        "-i", m3u8_url,
        "-c:v", "copy",
        "-c:a", "copy",
        "-bsf:a", "aac_adtstoasc",      # Fix audio stream issues
        "-y",                            # Overwrite existing file
        "-loglevel", "error",            # Suppress verbose output
        output
    ]

    try:
        subprocess.run(cmd, check=True)
        print(f"  [OK] Download complete: {output}")
    except subprocess.CalledProcessError as e:
        raise Exception(f"ffmpeg download failed: {e}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python download_wechat_video.py <video_share_url>")
        print("Example: python download_wechat_video.py https://weixin.qq.com/...")
        sys.exit(1)

    video_url = sys.argv[1].strip()

    if not video_url.startswith("http"):
        print("  [ERR] Invalid URL. Please provide a valid WeChat video share link.")
        sys.exit(1)

    print("============================================")
    print("  WeChat Video Downloader")
    print("============================================")
    print()
    print(f"  URL: {video_url}")
    print(f"  Save to: {os.path.abspath(SAVE_DIR)}")
    print()

    try:
        print("  [1/2] Extracting m3u8 address...")
        m3u8_url = get_real_m3u8(video_url)
        print(f"  [OK] Found m3u8: {m3u8_url}")
        print()

        print("  [2/2] Downloading video (via ffmpeg)...")
        ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        m = re.search(r'/([^/]+)(?:\?|$)', video_url)
        slug = re.sub(r'[^a-zA-Z0-9_-]', '', m.group(1))[:30] if m else ""
        save_name = f"wechat_{ts}_{slug}" if slug else f"wechat_{ts}"
        download_m3u8(m3u8_url, save_name)
        print()
        print("  [OK] All done!")

    except Exception as e:
        print(f"  [ERR] {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
