"""Download Kuaishou videos using cookies for authentication."""

import http.cookiejar
import os
import re
import sys
import urllib.request
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.parent
COOKIE_FILE = SCRIPT_DIR / "cookies" / "kuaishou_cookies.txt"
OUTPUT_DIR = Path.cwd() / "raw"

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"


def load_cookies(path: Path) -> http.cookiejar.MozillaCookieJar:
    cj = http.cookiejar.MozillaCookieJar()
    cj.load(str(path), ignore_discard=True, ignore_expires=True)
    return cj


def extract_video_url(html: str) -> str | None:
    """Extract the best quality video URL from a Kuaishou page."""
    # Priority: adaptationSet hd15 (highest quality, no watermark)
    ads = re.findall(r'"adaptationSet":(\[.+?\}\])}', html)
    best = None
    for a in ads:
        urls = re.findall(r'"url":"([^"]+)"', a)
        for u in urls:
            u2 = u.encode().decode("unicode_escape")
            if "hd15" in u2:
                return u2
            if not best and ".mp4" in u2:
                best = u2
    if best:
        return best
    # Fallback to photoUrl (original upload)
    pu = re.findall(r'"photoUrl":"([^"]+)"', html)
    if pu:
        u = pu[0].encode().decode("unicode_escape")
        if ".mp4" in u:
            return u
    return None


def extract_title(html: str) -> str:
    m = re.search(r"<title>([^<]+)</title>", html)
    if not m:
        return "unknown"
    title = m.group(1).strip()
    title = title.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
    # Remove non-printable characters
    title = "".join(c for c in title if c.isprintable())
    # Collapse whitespace
    title = re.sub(r"\s+", " ", title).strip()
    return title


def parse_shortlink(url: str, opener: urllib.request.OpenerDirector) -> str:
    """Resolve short links like kuaishou.com/f/XXX to full short-video URL."""
    if "/f/" in url or "v.kuaishou.com" in url:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            resp = opener.open(req, timeout=15)
            final = resp.geturl()
            if final != url:
                return final
        except Exception:
            pass
    return url


def download_video(video_url: str, output_path: Path, opener: urllib.request.OpenerDirector) -> int:
    req = urllib.request.Request(
        video_url,
        headers={"User-Agent": UA, "Referer": "https://www.kuaishou.com/"},
    )
    resp = opener.open(req, timeout=120)
    total = int(resp.headers.get("Content-Length", 0))
    downloaded = 0
    with open(output_path, "wb") as f:
        while True:
            chunk = resp.read(65536)
            if not chunk:
                break
            f.write(chunk)
            downloaded += len(chunk)
    return downloaded


def main():
    if len(sys.argv) < 2:
        print("Usage: python download_kuaishou.py <kuaishou_url>")
        print("  Supports: short-video/XXX, /f/XXX, v.kuaishou.com/XXX")
        sys.exit(1)

    url = sys.argv[1]

    if not COOKIE_FILE.exists():
        print(f"ERROR: Cookie file not found: {COOKIE_FILE}")
        print("Export cookies from browser and save as Netscape format.")
        sys.exit(1)

    cj = load_cookies(COOKIE_FILE)
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

    print("Fetching page...")
    url = parse_shortlink(url, opener)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    resp = opener.open(req, timeout=15)
    html = resp.read().decode("utf-8")

    title = extract_title(html)
    print(f"Title: {title}")

    video_url = extract_video_url(html)
    if not video_url:
        print("ERROR: Could not find video URL in page")
        sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    ext = ".mp4"
    safe_title = re.sub(r'[\\/:*?"<>|]', "_", title)[:80]
    out_path = OUTPUT_DIR / f"kuaishou_{safe_title}{ext}"

    print(f"Downloading ({len(video_url)} bytes URL)...")
    size = download_video(video_url, out_path, opener)
    print(f"Saved: {out_path} ({size / 1024 / 1024:.1f} MB)")


if __name__ == "__main__":
    main()
