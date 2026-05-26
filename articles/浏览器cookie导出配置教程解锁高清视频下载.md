---
title: '浏览器Cookie导出配置教程：解锁高清视频下载'
groupId: 'a1b2c3d4-1014-4f1e-9a2b-1c3d5e7f8a9b'
summary: 'B站 1080P、抖音主页视频、YouTube 会员内容都需要登录才能访问。本文详解三种 Cookie 导出方法：浏览器扩展（推荐）、Python 脚本自动提取、开发者工具手动复制，手把手教你配置。'
date: 2026-05-25
---

很多视频平台的 HD/4K 画质或特定内容需要登录账号才能访问。配置 Cookie 后，下载工具就能以你的身份获取这些内容。


### 什么是 Cookie？为什么需要它？


Cookie 是网站存储在浏览器中的一段数据，包含你的登录状态信息。当你登录 B站、抖音等网站后，浏览器会保存 Cookie。下载工具读取这个 Cookie，就能模拟你已登录的状态，从而获取需要登录才能看到的视频源（如 B站 1080P 高码率、抖音私密账号内容等）。


### 方法一：Get cookies.txt LOCALLY 扩展（推荐）


这是最推荐的方法，完全本地操作，不会上传任何数据：


1. 在 Chrome/Edge/Firefox 应用商店搜索安装 **Get cookies.txt LOCALLY**（注意一定要带 "LOCALLY" 字样，旧版不带此字样的扩展可能有隐私风险）

2. 打开目标网站（如 bilibili.com）并登录账号

3. 点击扩展图标 → Export → 下载得到 cookies.txt 文件（Netscape 格式）

4. 将 cookies.txt 内容粘贴到 xiaoyuevideo 的 Cookie 管理面板中对应平台


### 方法二：Cookie-Editor 扩展


1. 安装 [Cookie-Editor](https://chrome.google.com/webstore/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm) 扩展

2. 打开目标网站并登录

3. 点击扩展图标 → Export → 复制 JSON 格式内容

4. 粘贴到 xiaoyuevideo Cookie 管理面板

这个扩展的优势是界面更友好，可以查看每条 Cookie 的详细信息。


### 方法三：Python 脚本自动提取


xiaoyuevideo 项目内置了 `scripts/chrome_cookie_extract.py` 脚本，可从 Chrome 浏览器直接提取指定网站的 Cookie。使用 win32crypt + cryptography 解密 Chrome 的 AES-GCM 加密 Cookie，输出 Netscape 格式。适合技术用户和自动化场景。


### 安全须知


Cookie 包含登录凭证，等同于你的账号密码。请勿将 Cookie 文件分享给任何人。xiaoyuevideo 的 Cookie 仅保存在服务器本地，仅用于视频解析请求，不会上传到第三方或用于其他目的。Cookie 有过期时间，失效后需重新上传。


### 各平台 Cookie 需求一览


B站：未登录可下载 720P，1080P 高码率/4K 需登录

抖音：部分视频未登录可下载，主页批量/高清需登录

快手：大部分视频需登录才能解析

微博：部分视频需登录获取最高画质

TikTok/Twitter/Instagram/小红书：用于突破部分限制


### 相关下载链接

- **Cookie-Editor 扩展**：[Chrome Web Store](https://chrome.google.com/webstore/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm)
