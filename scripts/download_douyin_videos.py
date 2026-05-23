"""
从 autocli douyin videos 输出中解析视频列表，批量下载。

用法:
  python scripts/download_douyin_videos.py <json文件>
  autocli douyin videos --sec_uid "xxx" --format json | python scripts/download_douyin_videos.py -
"""

import json
import re
import subprocess
import sys
import time
from pathlib import Path

RAW_DIR = Path(__file__).resolve().parent.parent / "raw"


def main():
    # 读取 JSON 输入
    if len(sys.argv) > 1 and sys.argv[1] == "-":
        data = json.loads(sys.stdin.read())
    elif len(sys.argv) > 1:
        data = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    else:
        data = json.loads(sys.stdin.read())

    videos = data if isinstance(data, list) else [data]
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    print(f"[信息] 共 {len(videos)} 个视频")

    for i, v in enumerate(videos, 1):
        vid = v.get("aweme_id", "")
        desc = v.get("desc", "")
        play_url = v.get("play_url", "")

        if not vid or not play_url:
            print(f"  [跳过] #{i} 缺少下载链接")
            continue

        # 生成文件名
        safe_desc = re.sub(r'[\\/:*?"<>|#]', "", desc)[:50] or f"douyin_{vid}"
        filename = f"douyin_{vid}_{safe_desc}.mp4"
        filepath = RAW_DIR / filename

        if filepath.exists():
            print(f"  [跳过] {i}/{len(videos)}: {filename} (已存在)")
            continue

        print(f"  [下载] {i}/{len(videos)}: {safe_desc[:40]}...")

        # 使用 curl 下载（支持断点续传）
        cmd = [
            "curl", "-L", "-C", "-",
            "-H", "Referer: https://www.douyin.com/",
            "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "-o", str(filepath),
            play_url,
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)

        if filepath.exists() and filepath.stat().st_size > 0:
            size_mb = filepath.stat().st_size / 1024 / 1024
            print(f"    [完成] {size_mb:.1f}MB")
        else:
            print(f"    [错误] 下载失败: {result.stderr[:200]}")

        # 间隔避免风控
        if i < len(videos):
            time.sleep(1)


if __name__ == "__main__":
    main()
