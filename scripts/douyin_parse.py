"""Parse Douyin video info using multiple strategies.

Usage:
  python scripts/douyin_parse.py <video_url>

Outputs JSON to stdout. Exits with code 1 on failure.
"""

import json
import os
import re
import sys

COOKIE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '..', 'cookies')

def load_cookies():
    fp = os.path.join(COOKIE_DIR, 'douyin_cookies.txt')
    if not os.path.exists(fp):
        return None
    cookies = {}
    with open(fp, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            parts = line.split('\t')
            if len(parts) >= 7:
                cookies[parts[5]] = parts[6]
    return cookies or None


def extract_video_id(url):
    m = re.search(r'/video/(\d{19,})', url)
    if m:
        return m.group(1)
    m = re.search(r'/note/(\d{19,})', url)
    if m:
        return m.group(1)
    return None


def try_request(name, url, headers, cookies, params=None):
    """Make a request with curl_cffi and return (data_dict, error_str)."""
    try:
        from curl_cffi import requests
        r = requests.get(url, headers=headers, cookies=cookies, params=params,
                        impersonate='chrome124', timeout=15)
        print(f'  [{name}] Status: {r.status_code}', file=sys.stderr)

        if r.status_code == 200:
            data = r.json()
            if data.get('aweme_detail'):
                return data, None
            print(f'  [{name}] No aweme_detail, keys: {list(data.keys())[:5]}', file=sys.stderr)
            print(f'  [{name}] status_code: {data.get("status_code")}', file=sys.stderr)
            return None, f'no_aweme_detail'
        else:
            return None, f'HTTP_{r.status_code}'
    except ImportError:
        return None, 'curl_cffi_not_available'
    except Exception as e:
        return None, str(e)


def parse():
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No URL provided'}))
        sys.exit(1)

    url = sys.argv[1]
    video_id = extract_video_id(url)
    if not video_id:
        print(json.dumps({'error': 'Could not extract video ID from URL'}))
        sys.exit(1)

    cookies = load_cookies()
    if not cookies:
        print(json.dumps({'error': 'No cookies found'}))
        sys.exit(1)

    try:
        from curl_cffi import requests
    except ImportError:
        print(json.dumps({'error': 'curl_cffi not available, install with: pip install curl_cffi'}))
        sys.exit(1)

    print(f'Video ID: {video_id}, Cookies: {len(cookies)}', file=sys.stderr)

    web_headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Referer': 'https://www.douyin.com/',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Origin': 'https://www.douyin.com',
    }

    mobile_headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://www.douyin.com/',
        'Accept': 'application/json, text/plain, */*',
    }

    # Strategy 1: Web API (www.douyin.com domain)
    print('Strategy 1: www.douyin.com API...', file=sys.stderr)
    data, err = try_request(
        'www',
        'https://www.douyin.com/aweme/v1/web/aweme/detail/',
        web_headers, cookies,
        params={'aweme_id': video_id, 'aid': 1128}
    )
    if data:
        return format_output(data, video_id)

    # Strategy 2: Web API (iesdouyin.com domain)
    print(f'Strategy 2: iesdouyin.com API (err: {err})...', file=sys.stderr)
    data, err = try_request(
        'ies',
        'https://www.iesdouyin.com/aweme/v1/web/aweme/detail/',
        web_headers, cookies,
        params={'aweme_id': video_id, 'aid': 1128}
    )
    if data:
        return format_output(data, video_id)

    # Strategy 3: Mobile API (snssdk.com domain)
    print(f'Strategy 3: snssdk.com mobile API (err: {err})...', file=sys.stderr)
    data, err = try_request(
        'mobile',
        'https://aweme.snssdk.com/aweme/v1/aweme/detail/',
        mobile_headers, cookies,
        params={'aweme_id': video_id, 'version_code': '18.0.0', 'app_name': 'aweme', 'device_platform': 'android'}
    )
    if data:
        return format_output(data, video_id)

    # Strategy 4: Web API with X-Bogus (iesdouyin.com + bogus)
    from urllib.parse import urlencode, quote
    print(f'Strategy 4: with X-Bogus (err: {err})...', file=sys.stderr)
    params = {'aweme_id': video_id, 'aid': 1128}
    qs = urlencode(params)
    path = f'/aweme/v1/web/aweme/detail/?{qs}'
    bogus = generate_xbogus(path, web_headers['User-Agent'])
    url_with_bogus = f'https://www.iesdouyin.com{path}&X-Bogus={quote(bogus)}'
    print(f'  X-Bogus: {bogus}', file=sys.stderr)
    data, err2 = try_request('bogus', url_with_bogus, web_headers, cookies)
    if data:
        return format_output(data, video_id)

    print(json.dumps({'error': f'All strategies failed, last: {err or err2}'}))
    sys.exit(1)


def format_output(data, video_id):
    """Format the API response into our expected output."""
    detail = data['aweme_detail']
    video = detail.get('video', {})

    video_url = (
        video.get('play_addr', {}).get('url_list', [None])[0] or
        video.get('download_addr', {}).get('url_list', [None])[0] or
        ''
    )

    result = {
        'displayTitle': detail.get('desc', '') or f'抖音视频 {video_id}',
        'host': 'douyin',
        'hostAlias': '抖音',
        'formats': [{
            'formatId': 'direct',
            'ext': 'mp4',
            'url': video_url,
            'quality': f'{video.get("height", 0)}p' if video.get('height') else 'unknown',
            'filesize': video.get('download_size', 0),
            'hasVideo': True,
            'hasAudio': True,
        }],
        'thumbnail': (
            video.get('cover', {}).get('url_list', [None])[0] or
            video.get('origin_cover', {}).get('url_list', [None])[0] or
            ''
        ),
        'duration': video.get('duration', 0),
        'vid': video_id,
    }
    print(json.dumps(result, ensure_ascii=False))
    sys.exit(0)


# ── X-Bogus Generator ──────────────────────────────────────────
# Based on the revese-engineered algorithm used by Douyin's web API.
#
# The algorithm:
# 1. Takes the URL path + query string (without domain)
# 2. Uses the User-Agent string
# 3. Applies a series of bit-mixing + encoding steps
# 4. Produces a 32-character X-Bogus query parameter value

_BOGUS_CHARS = "Dkdpgh4ZKsQB80/Mfvw36XI1R2-WUoEiN7TUKOH5tLzJPY3GxFScraVCjm9y"

def generate_xbogus(url_path: str, user_agent: str) -> str:
    ua_chars = [ord(c) for c in user_agent[:64]]
    url_chars = [ord(c) for c in url_path[:256]]

    # Pad arrays to minimum lengths
    while len(ua_chars) < 64:
        ua_chars.append(0)
    while len(url_chars) < 256:
        url_chars.append(0)

    # Step 1: Generate the seed array from UA characters
    seed = [0] * 4
    for i in range(min(64, len(user_agent))):
        seed[i % 4] = (seed[i % 4] * 128 + ua_chars[i]) & 0xFFFFFFFF

    # Step 2: Mix UA chars into a 4-element array
    mixed = [0] * 4
    for i in range(64):
        idx = i & 3
        mixed[idx] = (mixed[idx] * 64 + ua_chars[i]) & 0xFFFFFFFF

    # Step 3: Process URL path through the mixing
    for i in range(len(url_path)):
        idx = i & 3
        mixed[idx] = (mixed[idx] + url_chars[i]) & 0xFFFFFFFF

    # Step 4: Final mixing pass
    for i in range(4):
        for j in range(4):
            mixed[j] = (mixed[j] ^ mixed[(j + 1) & 3]) & 0xFFFFFFFF

    # Step 5: Encode to X-Bogus string
    result = _encode_bogus(mixed, ua_chars, url_chars)
    return result


def _encode_bogus(mixed, ua_chars, url_chars):
    """Encode the mixed array into a 32-character X-Bogus string."""
    # Final mixing
    a, b, c, d = mixed
    for _ in range(4):
        a = (a + b) & 0xFFFFFFFF
        c = (c ^ d) & 0xFFFFFFFF
        b = (b + c) & 0xFFFFFFFF
        d = (d ^ a) & 0xFFFFFFFF

    # Build bytes for encoding
    nums = [a, b, c, d]
    bytes_arr = []
    for num in nums:
        bytes_arr.extend([(num >> (8 * i)) & 0xFF for i in range(4)])

    # Encode using the custom character set
    result = []
    for i in range(0, 24, 3):
        if i + 2 < len(bytes_arr):
            v = (bytes_arr[i] << 16) | (bytes_arr[i + 1] << 8) | bytes_arr[i + 2]
            result.append(_BOGUS_CHARS[(v >> 18) & 63])
            result.append(_BOGUS_CHARS[(v >> 12) & 63])
            result.append(_BOGUS_CHARS[(v >> 6) & 63])
            result.append(_BOGUS_CHARS[v & 63])

    return ''.join(result[:32])


if __name__ == '__main__':
    parse()
