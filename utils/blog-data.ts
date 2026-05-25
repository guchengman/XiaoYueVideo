export interface BlogPost {
  title: string
  groupId: string
  summary: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    title: 'yt-dlp 视频下载终极指南：一个命令下载全网视频',
    groupId: 'a1b2c3d4-1001-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'yt-dlp 是 GitHub 16 万 Star 的开源神器，支持 1000+ 网站视频下载。本文从安装、基础用法、音频提取、Cookie 配置、批量下载到高级技巧，手把手教你玩转这个命令行利器。',
    content: `<p>yt-dlp 是目前最强大的开源视频下载工具，在 <a href="https://github.com/yt-dlp/yt-dlp" target="_blank">GitHub</a> 上拥有超过 16 万 Star，支持 YouTube、B站、抖音、Twitter 等 1000+ 网站的視頻下载。它是 youtube-dl 的活跃分支，更新频率极高，平台改版后通常几天内就能适配。</p>

<h3>为什么选择 yt-dlp？</h3>
<p>相比在线解析网站，yt-dlp 有几个无法替代的优势：支持批量下载整个播放列表或频道、可自定义画质和格式、完全免费开源无广告、支持 Cookie 登录获取高清画质、自动合并 DASH 分离的音视频流。</p>

<h3>安装（三平台）</h3>
<p><strong>Windows：</strong>下载 yt-dlp.exe 放入 PATH 目录，同时安装 FFmpeg（音视频合并必需）。<br>
<strong>macOS：</strong><code>brew install yt-dlp ffmpeg</code><br>
<strong>Linux：</strong><code>sudo apt install yt-dlp ffmpeg</code></p>

<h3>基础命令</h3>
<p>下载最佳画质：<code>yt-dlp "视频链接"</code><br>
查看可用格式：<code>yt-dlp -F "视频链接"</code><br>
指定格式合并：<code>yt-dlp -f 137+140 "视频链接"</code>（137 是视频流，140 是音频流）<br>
自定义文件名：<code>yt-dlp -o "%(title)s.%(ext)s" "视频链接"</code></p>

<h3>提取纯音频</h3>
<p><code>yt-dlp -x --audio-format mp3 --audio-quality 0 "视频链接"</code><br>
支持 mp3、m4a、flac、opus 等格式，适合提取音乐或播客。</p>

<h3>Cookie 配置（下载高清/登录内容）</h3>
<p>B站 1080P 高码率、YouTube 会员视频、抖音主页内容等需要登录才能访问。使用浏览器扩展 "Get cookies.txt LOCALLY" 导出 Netscape 格式 Cookie 文件，然后：<br>
<code>yt-dlp --cookies cookies.txt "视频链接"</code></p>

<h3>批量下载</h3>
<p>下载播放列表：<code>yt-dlp "播放列表URL"</code><br>
增量备份（跳过已下载）：<code>yt-dlp --download-archive archive.txt "播放列表URL"</code><br>
从文件批量下载：<code>yt-dlp -a urls.txt</code></p>

<h3>性能优化</h3>
<p>多线程加速：<code>yt-dlp -N 8 "视频链接"</code><br>
限速下载：<code>yt-dlp --limit-rate 2M "视频链接"</code><br>
使用代理：<code>yt-dlp --proxy "socks5://127.0.0.1:1080" "视频链接"</code></p>

<p>如果你偏好图形界面操作，xiaoyuevideo 等在线解析网站提供了更友好的交互方式，无需记忆命令行参数。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>yt-dlp</strong>：<a href="https://github.com/yt-dlp/yt-dlp" target="_blank">https://github.com/yt-dlp/yt-dlp</a></li>
  <li><strong>FFmpeg</strong>：<a href="https://ffmpeg.org" target="_blank">https://ffmpeg.org</a></li>
</ul>`

  },
  {
    title: 'B站视频下载到本地最全方法（2026版）',
    groupId: 'a1b2c3d4-1002-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'B站（哔哩哔哩）视频怎么下载到本地？本文整理了在线解析、桌面软件、浏览器扩展、手机端、命令行共五大类方案，涵盖高清 4K、弹幕字幕、批量合集等场景。',
    content: `<p>B站拥有海量优质内容，但官方客户端的"离线缓存"功能导出的文件无法直接播放。本文将系统介绍几种将 B站视频保存为 MP4 的方法。</p>

<h3>一、在线解析网站（最简单）</h3>
<p>无需安装任何软件，复制链接 → 粘贴 → 解析 → 下载，手机和电脑通用。xiaoyuevideo 就是这类工具的代表，支持自动解析 B站视频源，提供多档画质选择，一键保存到本地。</p>

<h3>二、桌面专业软件</h3>
<p><strong><a href="https://github.com/iceAI999/downkyi" target="_blank">哔哩下载姬（DownKyi）</a>：</strong>开源免费，支持 4K 画质、弹幕字幕下载、收藏夹和 UP 主主页批量下载，Windows/macOS/Linux 全平台可用。</p>
<p><strong>BiliTools 工具箱：</strong>支持 4K/8K 超高清，可提取杜比全景声和 Hi-Res 无损音频，弹幕导出为 ASS 字幕。</p>
<p><strong><a href="https://github.com/leiuo/bilibili-download" target="_blank">鼠鼠下载器</a>：</strong>轻量化 B站解析工具，支持 4K 超清和批量下载，无速度限制。</p>

<h3>三、浏览器扩展</h3>
<p>在 Chrome/Edge 应用商店搜索"B站视频下载"即可找到多款扩展。安装后在视频页面出现下载按钮，一键保存。缺点是部分扩展可能因 B站更新而暂时失效。</p>

<h3>四、手机端方案</h3>
<p>安卓和 iOS 用户均可通过在线解析网站（如 xiaoyuevideo）在浏览器中直接下载。微信小程序（如"司马去水印"、"耶斯去水印"）也是不错的选择，粘贴分享链接即可解析保存。</p>

<h3>五、命令行工具（技术用户）</h3>
<p><a href="https://github.com/yt-dlp/yt-dlp" target="_blank">yt-dlp</a> 是最强大的选择，支持 B站 4K 高清、番剧批量下载、弹幕和字幕提取。配置 Cookie 后可下载大会员专属画质：<br>
<code>yt-dlp --cookies bilibili_cookies.txt -f "bestvideo+bestaudio" "BVxxxxxx"</code></p>

<h3>高清下载关键提示</h3>
<p>下载 1080P 高码率 / 4K / 杜比视界需要登录大会员账号。大多数工具支持导入 Cookie 来获取会员权限。另外，B站采用 DASH 技术，高清视频的音频和视频是分开的——如果下载后没有声音，需要工具支持自动合并音视频（xiaoyuevideo 和 yt-dlp 都支持自动合并）。</p>

<p>下载的视频请仅用于个人学习收藏，尊重 UP 主的版权。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>哔哩下载姬（DownKyi）</strong>：<a href="https://github.com/iceAI999/downkyi" target="_blank">https://github.com/iceAI999/downkyi</a></li>
  <li><strong>鼠鼠下载器</strong>：<a href="https://github.com/leiuo/bilibili-download" target="_blank">https://github.com/leiuo/bilibili-download</a></li>
  <li><strong>yt-dlp</strong>：<a href="https://github.com/yt-dlp/yt-dlp" target="_blank">https://github.com/yt-dlp/yt-dlp</a></li>
</ul>`
  },
  {
    title: '抖音无水印视频下载全攻略：从入门到进阶',
    groupId: 'a1b2c3d4-1003-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '抖音视频下载有哪些方法？本文对比了微信小程序、在线解析网站、快捷指令、桌面软件等方案，详解如何获取无水印高清视频，并分析了不同场景的最佳选择。',
    content: `<p>抖音视频默认保存会带有抖音 Logo 水印和创作者 ID，对于做二次创作或收藏来说非常不友好。本文将介绍 2026 年最有效的几种无水印下载方案。</p>

<h3>一、在线解析网站（推荐）</h3>
<p>这是最便捷的方式——打开浏览器访问 xiaoyuevideo 等在线解析网站，复制抖音分享链接，粘贴到输入框，系统会自动解析出无水印的视频源，选择画质后即可下载。整个过程无需安装任何 App，手机电脑通用。</p>
<p>在线解析的优势在于：免安装、跨平台、支持 1080P 原画质、自动去除水印。xiaoyuevideo 还支持抖音用户主页视频的批量解析。</p>

<h3>二、微信小程序</h3>
<p>2026 年最主流的方案。在微信中搜索"耶斯去水印"、"司马去水印"、"大佬去水印"等小程序，复制抖音链接后自动解析，速度极快（30 秒视频约 0.3 秒完成）。小程序运行在微信沙盒中，隐私安全性较好。</p>

<h3>三、iPhone 快捷指令</h3>
<p>iOS 用户专属方案：安装无水印下载快捷指令后，在抖音 App 中点击分享 → 选择快捷指令 → 自动保存到相册，全程约 0.5 秒，原画质无损。</p>

<h3>四、命令行工具</h3>
<p>yt-dlp 支持抖音视频下载，配置 Cookie 后功能更强大：<br>
<code>yt-dlp --cookies douyin_cookies.txt "抖音链接"</code></p>
<p>适合技术用户和批量处理场景。</p>

<h3>五、注意事项</h3>
<p>不要用录屏替代下载——录屏画质损失 60% 以上。短时间内大量解析可能触发平台频率限制，建议分时段操作。去水印视频仅用于个人学习收藏，未经授权二次发布属于侵权。</p>

<h3>场景推荐</h3>
<p>偶尔下载一条 → 在线解析网站或微信小程序<br>追求画质做二创 → 在线解析网站选择最高画质<br>批量下载 → yt-dlp 命令行<br>iOS 用户追求效率 → 快捷指令</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>yt-dlp</strong>：<a href="https://github.com/yt-dlp/yt-dlp" target="_blank">https://github.com/yt-dlp/yt-dlp</a></li>
  <li><strong>耶斯去水印</strong>：微信小程序搜索</li>
  <li><strong>大佬去水印</strong>：微信小程序搜索</li>
</ul>`
  },
  {
    title: 'YouTube视频下载方法汇总：免费高清MP4保存指南',
    groupId: 'a1b2c3d4-1004-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'YouTube 视频怎么下载到本地？本文对比在线网站、桌面软件、浏览器扩展和命令行工具四大类方案，覆盖 4K/8K 高清下载、播放列表批量保存、音频提取等需求。',
    content: `<p>YouTube 是全球最大的视频平台，但官方不提供直接下载功能（YouTube Premium 仅支持 App 内离线观看）。本文汇总了目前最有效的几种下载方案。</p>

<h3>一、在线解析网站</h3>
<p>打开 xiaoyuevideo，粘贴 YouTube 视频链接，系统自动解析视频源，选择画质后即可下载。支持 1080P 高清，无需安装、无需注册，是最简单的入门方案。</p>

<h3>二、桌面软件</h3>
<p><strong><a href="https://www.4kdownload.com/products/videodownloader" target="_blank">4K Video Downloader Plus</a>：</strong>2026 年最新版，支持 8K 画质下载、播放列表和频道批量下载、字幕提取。免费版每天可下载 30 个视频。</p>
<p><strong><a href="https://github.com/stacher-io/stacher" target="_blank">Stacher</a>：</strong>基于 yt-dlp 的图形界面工具，免费开源，支持播放列表和频道整体下载。</p>

<h3>三、命令行工具 yt-dlp</h3>
<p>功能最强的方案，适合技术用户：</p>
<p>基础下载：<code>yt-dlp "https://www.youtube.com/watch?v=xxxxx"</code><br>
查看格式：<code>yt-dlp -F "URL"</code><br>
指定 1080P：<code>yt-dlp -f "bestvideo[height<=1080]+bestaudio/best[height<=1080]" "URL"</code><br>
下载播放列表：<code>yt-dlp "播放列表URL"</code><br>
提取 MP3：<code>yt-dlp -x --audio-format mp3 "URL"</code></p>

<h3>四、在线工具（备选）</h3>
<p><a href="https://cobalt.tools" target="_blank">Cobalt.tools</a> 是开源的在线下载工具，界面干净无广告，支持 YouTube 以外也支持 TikTok、Instagram 等平台。不过 2025 年中期起 YouTube 加强了限制，Cobalt 对 YouTube 的支持不太稳定。</p>

<h3>五、为什么高清视频下载后没有声音？</h3>
<p>YouTube 的 1080P 及以上画质采用 DASH 技术，视频和音频分开传输。下载工具需要自动检测并合并两路流。xiaoyuevideo 和 yt-dlp 都支持自动合并，如果使用其他工具遇到无声音问题，说明该工具不支持 DASH 合并。</p>

<h3>重要提示</h3>
<p>YouTube 视频受版权保护，下载仅限个人离线观看。请勿将下载内容用于商业用途或未经授权再上传。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>4K Video Downloader Plus</strong>：<a href="https://www.4kdownload.com/products/videodownloader" target="_blank">https://www.4kdownload.com</a></li>
  <li><strong>Stacher</strong>：<a href="https://github.com/stacher-io/stacher" target="_blank">https://github.com/stacher-io/stacher</a></li>
  <li><strong>Cobalt.tools</strong>：<a href="https://cobalt.tools" target="_blank">https://cobalt.tools</a></li>
  <li><strong>yt-dlp</strong>：<a href="https://github.com/yt-dlp/yt-dlp" target="_blank">https://github.com/yt-dlp/yt-dlp</a></li>
</ul>`
  },
  {
    title: '快手视频去水印下载方法实测对比（2026版）',
    groupId: 'a1b2c3d4-1005-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '快手视频怎么去水印保存？本文实测对比了微信小程序、在线解析、桌面软件和开源方案四类方法，告诉你哪种方案速度最快、画质最好、最稳定。',
    content: `<p>快手作为国内最大的短视频平台之一，大量优质内容值得收藏。但快手下载的视频带有水印，本文整理了目前最有效的去水印下载方案。</p>

<h3>一、微信小程序（最主流）</h3>
<p>2026 年，微信小程序已成为快手去水印最主流的方案。操作仅需三步：复制快手链接 → 打开小程序 → 粘贴解析保存。</p>
<p>推荐工具：<br>
<strong>耶斯去水印</strong>：运营 3 年+，500 万+ 用户，30 秒视频约 0.3 秒解析完成，支持 100+ 平台<br>
<strong>大佬去水印</strong>：AI 识别复杂水印能力强，准确率 97%，适合遇到特殊水印的情况<br>
<strong>奈斯水印助手</strong>：覆盖 200+ 平台，也支持小众和冷门平台</p>

<h3>二、在线解析网站</h3>
<p>电脑端用户的首选。访问 xiaoyuevideo 等在线解析网站，粘贴快手分享链接或视频页面 URL，即可解析出无水印视频源。xiaoyuevideo 利用自定义解析器直接从快手页面提取视频地址，支持高清画质下载。</p>

<h3>三、桌面软件</h3>
<p>适合需要批量处理的创作者。SoftOrbits、Aiseesoft 等水印去除工具支持批量导入和处理，效果可控，但需要先在本地下载带水印版本再处理。</p>

<h3>四、开源方案</h3>
<p>GitHub 上的 media-parser 项目支持快手等 26+ 平台的视频解析去水印，可自行部署 API 调用，适合有技术背景的开发者进行自动化处理。</p>

<h3>注意事项</h3>
<p>解析出的 CDN 链接有时效性，解析后尽快下载。私密视频无法通过解析工具获取。去水印后版权仍归原作者，请勿商业传播。</p>

<p>对于大多数用户，在线解析网站和微信小程序是最便捷的选择——免安装、完全免费、操作简单。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>media-parser</strong>：<a href="https://github.com/Matthewpco/Media-Parser" target="_blank">https://github.com/Matthewpco/Media-Parser</a></li>
  <li><strong>yt-dlp</strong>：<a href="https://github.com/yt-dlp/yt-dlp" target="_blank">https://github.com/yt-dlp/yt-dlp</a></li>
</ul>`
  },
  {
    title: '小红书视频无水印下载保存教程（手机+电脑）',
    groupId: 'a1b2c3d4-1006-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '小红书视频怎么下载到手机相册？本文覆盖微信小程序、在线网站、手机 App、电脑端 F12 抓包四种方法，详解如何保存无水印高清视频。',
    content: `<p>小红书已成为生活方式分享的重要平台，很多教程类、美食类视频值得保存。但小红书官方不支持直接下载无水印视频，本文介绍几种实用方案。</p>

<h3>一、微信小程序（最推荐）</h3>
<p>微信搜索"小青去水印"、"耶斯去水印"、"大佬去水印"等小程序，复制小红书分享链接后粘贴即可解析下载。这些小程序免费、无需注册、操作极简。</p>

<h3>二、在线解析网站</h3>
<p>xiaoyuevideo 等在线解析网站支持小红书视频的解析下载。在手机或电脑浏览器中打开网站，粘贴复制的小红书链接，一键解析出无水印视频源。支持原画质下载。</p>

<h3>三、手机 App</h3>
<p>Google Play 上的"红下载（Red Downloader）"专为小红书设计，支持批量下载、无水印视频和图片保存，适合重度的内容收藏用户。</p>

<h3>四、电脑端 F12 开发者工具</h3>
<p>在浏览器中打开小红书网页版，按 F12 打开开发者工具 → Network → Media 标签 → 刷新页面播放视频 → 找到 .mp4 文件 → 右键在新标签页打开 → 右键另存为。适合有一定技术基础的用户。</p>

<h3>五、兜底方案：录屏</h3>
<p>如果以上方法都不可用（如链接加密规则更新），手机自带的屏幕录制功能是最后的保底方案。画质会有一定损失，但胜在稳定可靠。</p>

<h3>注意事项</h3>
<p>小红书会不定期更新链接加密规则，部分老方法可能失效。微信小程序通常更新最快、持续适配。保存的视频仅供个人学习收藏，请尊重创作者版权。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>yt-dlp</strong>：<a href="https://github.com/yt-dlp/yt-dlp" target="_blank">https://github.com/yt-dlp/yt-dlp</a></li>
</ul>`
  },
  {
    title: '微博视频保存到手机/电脑的完整方法',
    groupId: 'a1b2c3d4-1007-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '微博视频怎么下载保存？本文介绍了官方下载、在线解析、油猴脚本、桌面软件和手机端五大类方法，支持高清无水印保存。',
    content: `<p>微博视频涵盖新闻、娱乐、教程等各种内容，但并非所有视频都能直接下载。本文整理了几种实用的保存方法。</p>

<h3>一、官方内置下载</h3>
<p>部分微博视频（发布者开启了"允许下载"权限时）可以直接保存。在视频播放页点击右下角的下载图标或"保存到相册"即可。这是最简单的方式，但仅限于发布者允许下载的视频。</p>

<h3>二、在线解析网站</h3>
<p>对于未开放下载的视频，使用 xiaoyuevideo 等在线解析网站是最佳选择。复制微博视频链接 → 粘贴到解析框 → 自动提取视频源 → 选择画质下载。xiaoyuevideo 还支持微博短链接（t.cn）的自动解析。</p>

<h3>三、油猴脚本（Tampermonkey）</h3>
<p>安装<a href="https://www.tampermonkey.net" target="_blank">油猴扩展（Tampermonkey）</a>后，添加"微博视频下载"脚本，打开微博网页版视频页面即可看到下载按钮，支持 4K/1080P/720P 多档画质选择。ScriptCat 平台有多个相关脚本可用。</p>

<h3>四、桌面软件</h3>
<p>星优视频解析下载器、CleverGet 等专业下载工具支持微博视频的自动识别和多码率下载，适合需要批量处理的用户。</p>

<h3>五、手机端方法</h3>
<p>安卓用户可通过文件管理器访问 <code>Android/data/com.sina.weibo/cache/video/</code> 目录，找到缓存文件重命名为 .mp4。iOS 用户可使用国际版微博 App，播放界面直接有下载按钮。</p>

<h3>注意事项</h3>
<p>使用第三方工具下载的微博视频仅限个人使用，请尊重原作者的版权。如果一种方法失效，可尝试其他备用方案，因为微博会不定期更新反爬策略。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Tampermonkey（油猴）</strong>：<a href="https://www.tampermonkey.net" target="_blank">https://www.tampermonkey.net</a></li>
  <li><strong>yt-dlp</strong>：<a href="https://github.com/yt-dlp/yt-dlp" target="_blank">https://github.com/yt-dlp/yt-dlp</a></li>
</ul>`
  },
  {
    title: 'TikTok无水印视频下载工具推荐与安全指南（2026版）',
    groupId: 'a1b2c3d4-1008-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'TikTok 视频怎么去水印下载？本文推荐安全可靠的在线工具和桌面软件，同时揭示浏览器扩展的安全风险（StealTok 恶意软件已影响超 13 万用户），帮你安全下载。',
    content: `<p>TikTok 的全球用户量持续增长，但下载的视频默认带水印和账号 ID。本文将介绍安全有效的无水印下载方案。</p>

<h3>在线网页工具（安全首选）</h3>
<p>推荐使用在线网页工具而非浏览器扩展，因为不需要安装任何内容，用完即走，安全风险最低。</p>
<p><strong><a href="https://snaptik.app" target="_blank">SnapTik</a>（snaptik.app）：</strong>TikTok 专用无水印下载，速度快，界面干净<br>
<strong><a href="https://ssstik.io" target="_blank">SSSTik</a>（ssstik.io）：</strong>支持 MP4 视频和 MP3 音频分离下载<br>
<strong><a href="https://easydown.app" target="_blank">Easydown</a>：</strong>支持 TikTok/抖音/Twitter/YouTube 多平台，多分辨率选择</p>
<p>使用步骤：打开 TikTok → 分享 → 复制链接 → 打开上述网站 → 粘贴 → 下载无水印版。</p>

<h3>xiaoyuevideo 在线解析</h3>
<p>xiaoyuevideo 同样支持 TikTok 视频的解析下载。粘贴 TikTok 视频链接后，系统使用 yt-dlp 后端自动处理 TikTok 的 CDN 验证，解析出可下载的视频源。</p>

<h3>桌面软件</h3>
<p><strong><a href="https://www.4kdownload.com/products/tokkit" target="_blank">4K Tokkit</a>：</strong>TikTok 专用批量下载工具，支持账号整体备份、标签页批量下载<br>
<strong>datatool 万能下载器：</strong>支持 50+ 平台，含 TikTok，支持 4K 画质</p>

<h3>安全警告：远离可疑浏览器扩展</h3>
<p>2026 年 4 月，安全机构 LayerX 披露了名为 "StealTok" 的大规模恶意软件攻击——至少 12 款伪装成 TikTok 下载器的 Chrome/Edge 扩展被植入恶意代码，全球超 13 万用户受影响。</p>
<p>安全建议：<br>
✅ 优先使用网页版工具（无需安装）<br>
❌ 避免安装要求"读取和更改所有网站数据"权限的扩展<br>
❌ 不要向任何第三方工具提供 TikTok 账号密码</p>

<h3>微信小程序</h3>
<p>"live 去水印工具箱"等小程序也支持 TikTok 链接解析，在微信内直接使用，无需担心恶意软件风险。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>SnapTik</strong>：<a href="https://snaptik.app" target="_blank">https://snaptik.app</a></li>
  <li><strong>SSSTik</strong>：<a href="https://ssstik.io" target="_blank">https://ssstik.io</a></li>
  <li><strong>Easydown</strong>：<a href="https://easydown.app" target="_blank">https://easydown.app</a></li>
  <li><strong>4K Tokkit</strong>：<a href="https://www.4kdownload.com/products/tokkit" target="_blank">https://www.4kdownload.com</a></li>
</ul>`
  },
  {
    title: 'Instagram视频和图片保存方法：Reels、快拍、轮播图一网打尽',
    groupId: 'a1b2c3d4-1009-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'Instagram 的视频和图片怎么保存到本地？本文整理了浏览器扩展、在线网站、手机 App 和开源方案，支持 Reels、Stories 快拍、轮播图等所有内容类型的下载。',
    content: `<p>Instagram 内置的"收藏"功能只是书签标记，内容被删除后就找不到了。真正保存到本地才是王道，本文介绍最有效的方法。</p>

<h3>一、浏览器扩展（电脑端最方便）</h3>
<p><strong>Instagram Downloader：</strong>开源扩展，支持 Chrome/Edge/Firefox/Brave/Opera 全平台。安装后在浏览 IG 帖子、Reels、Stories 时，点击扩展图标即可下载。支持批量下载、字幕导出。</p>
<p><strong>SaveFromIns：</strong>无需登录、无水印、一键下载高清内容。操作简单，适合偶尔使用的用户。</p>

<h3>二、在线网页工具</h3>
<p>无需安装，复制链接即可下载，电脑手机通用：<br>
<strong><a href="https://snapsave.app" target="_blank">SnapSave</a>：</strong>解析速度快，支持繁体中文界面，IG 下载首选<br>
<strong>SaveInsta：</strong>支持限时动态和精选动态下载<br>
<strong>IGram / SSSInstagram：</strong>支持简体中文，无限制下载数量，界面干净无弹窗广告</p>

<h3>三、xiaoyuevideo 在线解析</h3>
<p>xiaoyuevideo 支持 Instagram 视频的在线解析。复制 IG Reels 或视频帖子的链接，粘贴到解析框，即可获取可下载的视频源。支持多档画质选择。</p>

<h3>四、手机 App</h3>
<p>Android 用户可在 Google Play 下载 "Instagram Downloader 2026"，支持无需登录、自动同步到相册、Material 3 设计界面、无广告。</p>

<h3>注意事项</h3>
<p>隐私账号（Private）的内容无法通过任何第三方工具下载。Instagram 自带的"保存"仅为书签功能，原作者删除后内容会消失。下载他人内容请尊重版权，仅用于个人收藏。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>SnapSave</strong>：<a href="https://snapsave.app" target="_blank">https://snapsave.app</a></li>
</ul>`
  },
  {
    title: 'Twitter/X视频下载全攻略：在线工具与扩展推荐',
    groupId: 'a1b2c3d4-1010-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'Twitter/X 平台不提供视频下载功能（仅 Premium 会员可用）。本文整理在线网站、浏览器扩展、油猴脚本和命令行四类免费方案，支持 4K 高清下载。',
    content: `<p>Twitter/X 的视频默认无法下载（仅 X Premium 订阅用户可在 App 内保存）。对于普通用户，本文介绍几种免费方案。</p>

<h3>一、在线网站（最推荐）</h3>
<p>复制推文链接，粘贴到以下网站即可下载：<br>
<strong><a href="https://savetwt.com" target="_blank">SaveTWT</a>（savetwt.com）：</strong>支持 4K 画质下载<br>
<strong>TwitterXZ（twitterxz.com）：</strong>支持高清无水印，无需注册<br>
<strong>SSSTwitter（ssstwitter.com）：</strong>老牌工具，稳定性好</p>
<p>操作步骤：打开 X → 找到目标推文 → 分享 → 复制链接 → 粘贴到网站 → 选择画质下载。</p>

<h3>二、xiaoyuevideo 在线解析</h3>
<p>xiaoyuevideo 同样支持 Twitter/X 视频的解析。粘贴推文链接后自动提取视频源，支持多档画质选择，一键保存到本地。</p>

<h3>三、浏览器扩展</h3>
<p><strong>Twitter X Downloader：</strong>开源扩展，支持 Chrome/Edge/Firefox 等，可批量下载视频、图片和文字，2026 年 3 月已更新至 v4.0.1。<br>
<strong>X Media Downloader：</strong>一键下载，自动抓取最高画质。</p>

<h3>四、油猴脚本</h3>
<p>安装 Tampermonkey 后添加"Twitter/X 视频下载助手"脚本，在 X 页面内直接出现下载按钮，支持 4K 原始画质和图片下载，轻量无侵入。</p>

<h3>五、yt-dlp 命令行</h3>
<p><code>yt-dlp "https://x.com/用户名/status/推文ID"</code><br>
适合技术用户，支持批量处理和自动化脚本。</p>

<h3>注意事项</h3>
<p>在线工具仅支持公开推文，私密账号内容无法下载。建议使用完整的 x.com 或 twitter.com 链接格式。下载内容仅限个人离线观看，请勿未经授权二次传播。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>SaveTWT</strong>：<a href="https://savetwt.com" target="_blank">https://savetwt.com</a></li>
  <li><strong>TwitterXZ</strong>：<a href="https://twitterxz.com" target="_blank">https://twitterxz.com</a></li>
</ul>`
  },
  {
    title: 'Facebook视频免费下载方法：免安装、免注册、4K高清',
    groupId: 'a1b2c3d4-1011-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'Facebook 视频怎么下载？本文介绍四种完全免费的方法：修改网址法（零工具）、在线下载网站、浏览器扩展和手机端方案，支持 Reels 和普通视频。',
    content: `<p>Facebook 上的精彩视频想保存到本地？本文整理了几种零成本的免费方案。</p>

<h3>一、修改网址法（最原生，零工具）</h3>
<p>这是最纯粹的方法，不需要任何第三方工具：<br>
1. 在浏览器中打开 Facebook 视频页面<br>
2. 将网址中的 <code>www</code> 改为 <code>mbasic</code><br>
3. 页面以移动简易版加载，点击播放视频<br>
4. 右键视频 → "另存视频为" → 保存为 MP4</p>
<p>这个方法利用了 Facebook 移动版页面的特性，100% 免费、不需要任何工具。</p>

<h3>二、在线下载网站</h3>
<p><strong><a href="https://publer.com" target="_blank">Publer</a>：</strong>零广告、体验最干净，支持高清下载<br>
<strong><a href="https://www.fdownloader.net" target="_blank">FDownloader.net</a>：</strong>速度快，支持 4K<br>
<strong><a href="https://snapsave.app" target="_blank">SnapSave.app</a>：</strong>支持高清无水印，还可处理其他平台<br>
<strong><a href="https://fsave.net" target="_blank">FSave.net</a>：</strong>专注 4K 画质，无广告</p>
<p>使用方法：复制 Facebook 视频链接 → 粘贴到网站 → 选择画质 → 下载。</p>

<h3>三、xiaoyuevideo 在线解析</h3>
<p>xiaoyuevideo 同样支持 Facebook 视频的解析下载。粘贴视频页面链接后自动解析视频源，支持多档画质选择。</p>

<h3>四、浏览器扩展</h3>
<p><strong>FDOWN（Video Downloader PLUS）：</strong>直接在 Facebook 页面添加下载按钮<br>
<strong>FLoader：</strong>轻量级，支持 4K 下载<br>
Chrome/Edge/Firefox 扩展商店均可搜索安装。</p>

<h3>五、手机端</h3>
<p>Android 用户可复制视频链接后，在浏览器中访问 SaveFrom.net 或 SnapSave 下载。iOS 用户建议在 Safari 中操作（而非 FB App），配合 Documents by Readdle 等文件管理 App 完成保存。</p>

<h3>注意事项</h3>
<p>隐私视频（仅好友可见）无法通过第三方工具下载。免费在线网站通常有广告，注意区分真假下载按钮。下载内容仅限个人使用。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Publer</strong>：<a href="https://publer.com" target="_blank">https://publer.com</a></li>
  <li><strong>FDownloader</strong>：<a href="https://www.fdownloader.net" target="_blank">https://www.fdownloader.net</a></li>
  <li><strong>SnapSave</strong>：<a href="https://snapsave.app" target="_blank">https://snapsave.app</a></li>
  <li><strong>FSave</strong>：<a href="https://fsave.net" target="_blank">https://fsave.net</a></li>
</ul>`
  },
  {
    title: 'M3U8/HLS流媒体视频下载详解：从原理到实操',
    groupId: 'a1b2c3d4-1012-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'M3U8 格式的视频为什么难下载？本文从 HLS 协议原理讲起，介绍浏览器扩展、N_m3u8DL-RE、FFmpeg 命令行和在线工具四种下载方案，小白也能学会。',
    content: `<p>很多视频网站的视频无法右键另存为，因为它们使用的是 M3U8/HLS 流媒体协议。本文将通俗讲解 M3U8 是什么以及如何下载。</p>

<h3>M3U8 是什么？为什么难下载？</h3>
<p>普通 MP4 视频是一个完整文件，直接下载即可。而 M3U8/HLS 是 Apple 提出的流媒体协议——视频被切分成几百甚至上千个 .ts 小片段（每个仅几秒），由一个 .m3u8 播放列表文件组织。浏览器播放时按顺序加载这些片段，而不是一次性加载整个视频。</p>
<p>简单理解：MP4 是一本书，M3U8 是书的目录 + 每一页的散页。要"下载一本书"，你需要先把所有散页收集齐全，再按顺序装订好。</p>

<h3>方案一：浏览器扩展（最简单）</h3>
<p>安装 "M3U8 Downloader" 浏览器扩展（支持 Chrome/Edge/Firefox），打开视频页面播放 → 扩展自动检测 M3U8 流 → 点击下载 → 自动转换为 MP4。</p>
<p>优点：无需 FFmpeg 或命令行，全浏览器操作。状态指示灯：绿色 = 可下载，橙色 = 检测中，红色 = 受限站点。</p>

<h3>方案二：N_m3u8DL-RE（最强大，推荐）</h3>
<p>免费开源的跨平台命令行工具（<a href="https://github.com/nilaoda/N_m3u8DL-RE" target="_blank">GitHub</a>），支持 Windows/macOS/Linux：<br>
基础用法：<code>N_m3u8DL-RE "https://example.com/video.m3u8"</code><br>
指定线程数：<code>N_m3u8DL-RE "URL" --thread-count 8</code><br>
选择 1080P：<code>N_m3u8DL-RE "URL" -sv res="1920*1080" -sa best</code><br>
功能：多线程下载、AES-128 解密、直播录制、自定义时间范围、MP4/MKV 输出。</p>

<h3>方案三：FFmpeg 命令行</h3>
<p><code>ffmpeg -i "https://example.com/video.m3u8" -c copy output.mp4</code><br>
FFmpeg 直接从 m3u8 播放列表读取所有 .ts 片段并合并为 MP4。适合有技术基础的用户。</p>

<h3>方案四：在线解析</h3>
<p>xiaoyuevideo 的在线播放器支持直接播放 M3U8 链接，系统会自动代理播放。如需下载，粘贴 M3U8 链接后，系统后台会用 ffmpeg 转码为 MP4 并推送到浏览器下载。</p>

<h3>法律提醒</h3>
<p>M3U8 下载技术仅应用于你有权访问和保存的内容，请遵守版权法规。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>N_m3u8DL-RE</strong>：<a href="https://github.com/nilaoda/N_m3u8DL-RE" target="_blank">https://github.com/nilaoda/N_m3u8DL-RE</a></li>
  <li><strong>FFmpeg</strong>：<a href="https://ffmpeg.org" target="_blank">https://ffmpeg.org</a></li>
</ul>`
  },
  {
    title: 'DASH音视频分离与合并：为什么下载的视频没有声音？',
    groupId: 'a1b2c3d4-1013-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '下载的 B站/YouTube 高清视频为什么没有声音？本文用通俗语言解释 DASH 流媒体技术原理，以及如何用 FFmpeg 合并分离的音视频轨，看完你就明白 xiaoyuevideo 的自动合并有多方便。',
    content: `<p>很多用户在下载 B站或 YouTube 的高清视频后发现没有声音，这是 DASH（Dynamic Adaptive Streaming over HTTP）技术导致的。</p>

<h3>为什么高清视频没有声音？</h3>
<p>传统视频文件（如 MP4）中，视频画面和音频是打包在一起的。但现代视频平台（YouTube、B站等）为了支持自适应码率切换，采用 DASH 技术将视频和音频分离传输。</p>
<p>举个例子：B站一个 1080P 视频，实际上包含：<br>
- 视频流（.m4s 文件）—— 只有画面，没有声音<br>
- 音频流（.m4s 文件）—— 只有声音，没有画面</p>
<p>浏览器播放时实时同步这两路流，所以你看的时候有声音。但如果只下载了视频流文件，自然就没有声音。同样的，只下载音频流就是纯音频文件。</p>

<h3>DASH 分离的优势</h3>
<p>为什么平台要这样做？<br>
1. 自适应码率：网络差时自动降视频画质但保持音频清晰<br>
2. 多语言：可以切换不同语言的音频轨而不改变视频<br>
3. 带宽优化：用户可以选择下载需要的流</p>

<h3>如何合并分离的音视频</h3>
<p>使用 FFmpeg 可以无损合并：<br>
<code>ffmpeg -i video.m4s -i audio.m4s -c:v copy -c:a copy output.mp4</code></p>
<p><code>-c copy</code> 表示"流拷贝"——不解码不重新编码，仅将原始比特流封装进 MP4 容器。这个过程极快（几秒到几十秒）且完全无损。</p>

<h3>xiaoyuevideo 的自动合并</h3>
<p>手动下载两路流再合并比较繁琐。xiaoyuevideo 在下载 DASH 格式的视频时会自动处理：<br>
1. 检测到视频流没有音频轨道<br>
2. 自动寻找并下载对应的音频流<br>
3. 服务端用 ffmpeg 无损合并<br>
4. 推送给用户的是合并好的完整 MP4 文件</p>
<p>这个流程对用户透明——你只需要点击"下载"，系统会自动完成整个合并过程。进度条会实时显示"正在下载视频流...正在下载音频流...正在合并..."。</p>

<h3>fMP4 与普通 MP4</h3>
<p>DASH 使用 fMP4（Fragmented MP4）格式，与普通 MP4 的区别在于：普通 MP4 的元数据（moov box）在文件尾部，必须完整下载才能播放；fMP4 将元数据前置，媒体数据分片存储，支持按需加载和快速起播。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>FFmpeg</strong>：<a href="https://ffmpeg.org" target="_blank">https://ffmpeg.org</a></li>
</ul>`
  },
  {
    title: '浏览器Cookie导出配置教程：解锁高清视频下载',
    groupId: 'a1b2c3d4-1014-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'B站 1080P、抖音主页视频、YouTube 会员内容都需要登录才能访问。本文详解三种 Cookie 导出方法：浏览器扩展（推荐）、Python 脚本自动提取、开发者工具手动复制，手把手教你配置。',
    content: `<p>很多视频平台的 HD/4K 画质或特定内容需要登录账号才能访问。配置 Cookie 后，下载工具就能以你的身份获取这些内容。</p>

<h3>什么是 Cookie？为什么需要它？</h3>
<p>Cookie 是网站存储在浏览器中的一段数据，包含你的登录状态信息。当你登录 B站、抖音等网站后，浏览器会保存 Cookie。下载工具读取这个 Cookie，就能模拟你已登录的状态，从而获取需要登录才能看到的视频源（如 B站 1080P 高码率、抖音私密账号内容等）。</p>

<h3>方法一：Get cookies.txt LOCALLY 扩展（推荐）</h3>
<p>这是最推荐的方法，完全本地操作，不会上传任何数据：</p>
<p>1. 在 Chrome/Edge/Firefox 应用商店搜索安装 <strong>Get cookies.txt LOCALLY</strong>（注意一定要带 "LOCALLY" 字样，旧版不带此字样的扩展可能有隐私风险）<br>
2. 打开目标网站（如 bilibili.com）并登录账号<br>
3. 点击扩展图标 → Export → 下载得到 cookies.txt 文件（Netscape 格式）<br>
4. 将 cookies.txt 内容粘贴到 xiaoyuevideo 的 Cookie 管理面板中对应平台</p>

<h3>方法二：Cookie-Editor 扩展</h3>
<p>1. 安装 <a href="https://chrome.google.com/webstore/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm" target="_blank">Cookie-Editor</a> 扩展<br>
2. 打开目标网站并登录<br>
3. 点击扩展图标 → Export → 复制 JSON 格式内容<br>
4. 粘贴到 xiaoyuevideo Cookie 管理面板<br>
这个扩展的优势是界面更友好，可以查看每条 Cookie 的详细信息。</p>

<h3>方法三：Python 脚本自动提取</h3>
<p>xiaoyuevideo 项目内置了 <code>scripts/chrome_cookie_extract.py</code> 脚本，可从 Chrome 浏览器直接提取指定网站的 Cookie。使用 win32crypt + cryptography 解密 Chrome 的 AES-GCM 加密 Cookie，输出 Netscape 格式。适合技术用户和自动化场景。</p>

<h3>安全须知</h3>
<p>Cookie 包含登录凭证，等同于你的账号密码。请勿将 Cookie 文件分享给任何人。xiaoyuevideo 的 Cookie 仅保存在服务器本地，仅用于视频解析请求，不会上传到第三方或用于其他目的。Cookie 有过期时间，失效后需重新上传。</p>

<h3>各平台 Cookie 需求一览</h3>
<p>B站：未登录可下载 720P，1080P 高码率/4K 需登录<br>
抖音：部分视频未登录可下载，主页批量/高清需登录<br>
快手：大部分视频需登录才能解析<br>
微博：部分视频需登录获取最高画质<br>
TikTok/Twitter/Instagram/小红书：用于突破部分限制</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Cookie-Editor 扩展</strong>：<a href="https://chrome.google.com/webstore/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm" target="_blank">Chrome Web Store</a></li>
</ul>`
  },
  {
    title: '在线视频解析工具评测对比：哪款最适合你？（2026版）',
    groupId: 'a1b2c3d4-1015-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '市面上视频解析下载工具有很多，到底选哪个好？本文从平台覆盖、画质支持、下载速度、是否免费、隐私安全等维度，对比了 xiaoyuevideo、微信小程序、桌面软件和命令行工具四类方案。',
    content: `<p>2026 年，在线视频解析下载的工具已经非常丰富。但不同工具有不同的定位和优势，本文将帮你找到最适合自己的方案。</p>

<h3>一、在线解析网站（xiaoyuevideo 等）</h3>
<p><strong>代表：</strong>xiaoyuevideo、i 导航解析器等</p>
<p><strong>优势：</strong><br>
- 无需安装任何软件，浏览器打开即用<br>
- 电脑手机全平台通用<br>
- 支持 26+ 主流视频平台<br>
- 自动合并 DASH 分离的音视频流<br>
- 支持画质选择、音频提取<br>
- 提供 Cookie 管理，解锁需要登录的高清画质<br>
- 内置在线播放器，可预览后再决定是否下载</p>
<p><strong>适合人群：</strong>绝大多数普通用户，不想折腾、追求简单高效。</p>

<h3>二、微信小程序</h3>
<p><strong>代表：</strong>耶斯去水印、大佬去水印、奈斯水印助手</p>
<p><strong>优势：</strong><br>
- 微信内直接使用，无需跳转<br>
- 解析速度极快（通常 0.3-1 秒）<br>
- 自动去水印<br>
- 支持批量处理</p>
<p><strong>劣势：</strong><br>
- 仅支持移动端<br>
- 平台覆盖以短视频为主<br>
- 部分小程序有广告</p>
<p><strong>适合人群：</strong>手机重度用户，主要下载短视频平台内容。</p>

<h3>三、桌面专业软件</h3>
<p><strong>代表：</strong>4K Video Downloader Plus、哔哩下载姬（DownKyi）、Stacher</p>
<p><strong>优势：</strong><br>
- 功能全面，支持 4K/8K 超高清<br>
- 批量下载、播放列表整体下载<br>
- 字幕提取、弹幕保存等高级功能</p>
<p><strong>劣势：</strong><br>
- 需要下载安装<br>
- 部分收费（4K Video Downloader Plus 免费版每天 30 个）<br>
- 不同平台需要不同软件</p>
<p><strong>适合人群：</strong>需要批量下载、追求最高画质、经常使用的重度用户。</p>

<h3>四、命令行工具（yt-dlp）</h3>
<p><strong>优势：</strong><br>
- 功能最强，支持 1000+ 网站<br>
- 完全免费开源<br>
- 可编写自动化脚本<br>
- 更新最快（平台改版几天内适配）</p>
<p><strong>劣势：</strong><br>
- 需要技术背景，学习曲线陡峭<br>
- 需要单独安装 FFmpeg<br>
- 无图形界面</p>
<p><strong>适合人群：</strong>开发者、技术用户、需要自动化批量处理的场景。</p>

<h3>综合推荐</h3>
<p>日常偶尔下载 → <strong>在线解析网站</strong>（最省心）<br>
手机端快速去水印 → <strong>微信小程序</strong>（最快）<br>
重度批量下载 → <strong>桌面软件 + yt-dlp</strong>（功能最强）<br>
多场景灵活切换 → <strong>xiaoyuevideo</strong>（全平台覆盖 + 在线播放 + Cookie 管理）</p>

<h3>选择在线工具的注意事项</h3>
<p>1. 检查是否支持 HTTPS（网址带锁）<br>
2. 优先选择无需注册登录的工具<br>
3. 注意隐私政策——是否声明不存储用户下载的视频<br>
4. 支持平台数量和画质选项是否满足需求<br>
5. 是否有 Cookie 管理功能（这对下载高清内容很重要）</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>yt-dlp</strong>：<a href="https://github.com/yt-dlp/yt-dlp" target="_blank">https://github.com/yt-dlp/yt-dlp</a></li>
  <li><strong>4K Video Downloader Plus</strong>：<a href="https://www.4kdownload.com/products/videodownloader" target="_blank">https://www.4kdownload.com</a></li>
  <li><strong>哔哩下载姬（DownKyi）</strong>：<a href="https://github.com/iceAI999/downkyi" target="_blank">https://github.com/iceAI999/downkyi</a></li>
</ul>`
  },
  {
    title: 'FFmpeg 视频处理完全指南：剪辑、合并、转码、压缩一篇文章搞定',
    groupId: 'a1b2c3d4-2001-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'FFmpeg 是开源视频处理领域的瑞士军刀。本文从安装配置讲起，覆盖剪辑、合并、转码、压缩、截图、音视频分离等高频场景，20 个实用命令让你从入门到熟练。',
    content: `<p>FFmpeg 是视频处理领域无可争议的王牌工具，几乎所有的视频下载工具（包括 yt-dlp）、播放器、转码软件都在底层依赖它。学会 FFmpeg，就等于掌握了视频处理的"内核语言"。</p>

    <h3>FFmpeg 能做什么？</h3>
    <p>一句话：任何你能想到的视频操作，FFmpeg 都能做。格式转换、裁剪合并、压缩画质、提取音频、添加字幕、录制屏幕、直播推流……它不提供图形界面，但命令行赋予它无与伦比的灵活性和自动化能力。</p>

    <h3>安装</h3>
    <p><strong>Windows：</strong>从 <a href="https://ffmpeg.org" target="_blank">ffmpeg.org</a> 下载预编译包，解压后将 bin 目录加入 PATH，或直接使用 xiaoyuevideo 内置的 FFmpeg。<br>
    <strong>macOS：</strong><code>brew install ffmpeg</code><br>
    <strong>Linux：</strong><code>sudo apt install ffmpeg</code></p>
    <p>验证安装：<code>ffmpeg -version</code></p>

    <h3>高频操作 20 例</h3>

    <p><strong>1. 格式转换</strong><br>
    <code>ffmpeg -i input.mkv -c:v libx264 -preset medium -crf 23 -c:a aac output.mp4</code><br>
    将 MKV 转为兼容性最好的 MP4。libx264 是 H.264 编码器，-crf 控制画质（18-28，越低画质越好）。</p>

    <p><strong>2. 视频裁剪（时间）</strong><br>
    <code>ffmpeg -i input.mp4 -ss 00:01:30 -to 00:03:00 -c copy output.mp4</code><br>
    从 1 分 30 秒截取到 3 分钟，-c copy 实现"秒剪"——不重新编码，只复制流数据。</p>

    <p><strong>3. 视频合并</strong><br>
    先创建 filelist.txt：<code>file '1.mp4'\nfile '2.mp4'\nfile '3.mp4'</code><br>
    <code>ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4</code><br>
    无损合并多个 MP4 文件，适用于将下载的短视频片段拼接成长视频。</p>

    <p><strong>4. 压缩视频体积</strong><br>
    <code>ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slower -c:a aac -b:a 96k output.mp4</code><br>
    CRF 28 配合 slower 预设可在画质损失很小的情况下将体积缩小 50%-70%。</p>

    <p><strong>5. 调整分辨率</strong><br>
    <code>ffmpeg -i input.mp4 -vf scale=1920:1080 output.mp4</code><br>
    也可自动按比例缩放：<code>ffmpeg -i input.mp4 -vf scale=-2:720 output.mp4</code>（宽度自适应，高度 720P）</p>

    <p><strong>6. 提取音频</strong><br>
    <code>ffmpeg -i input.mp4 -vn -c:a libmp3lame -q:a 2 output.mp3</code><br>
    -vn 表示不处理视频，-q:a 2 表示高质量 MP3（0=最好，9=最差）。</p>

    <p><strong>7. 添加硬字幕</strong><br>
    <code>ffmpeg -i input.mp4 -vf subtitles=subtitle.srt output.mp4</code><br>
    将 SRT 字幕"烧录"进视频画面。注意这是硬编码，字幕无法关闭。</p>

    <p><strong>8. 视频转 GIF</strong><br>
    <code>ffmpeg -i input.mp4 -vf "fps=10,scale=480:-1" output.gif</code><br>
    每秒 10 帧，宽度 480 像素，是社交媒体可用的合适大小。</p>

    <p><strong>9. 画面旋转</strong><br>
    <code>ffmpeg -i input.mp4 -vf transpose=1 output.mp4</code><br>
    transpose=1 顺时针 90 度，=2 逆时针 90 度。</p>

    <p><strong>10. 去除片头片尾</strong><br>
    <code>ffmpeg -i input.mp4 -ss 10 -i input.mp4 -c copy -map 1:0 -map 0:1 -shortest -fflags +shortest output.mp4</code><br>
    跳过前 10 秒，适合批量处理录制内容。更简单的方法请参考上面的裁剪命令。</p>

    <p><strong>11. 多图合成视频</strong><br>
    <code>ffmpeg -framerate 24 -i img_%03d.png -c:v libx264 -pix_fmt yuv420p output.mp4</code><br>
    将 img_001.png、img_002.png……合成 24fps 的视频。</p>

    <p><strong>12. 倍速播放</strong><br>
    <code>ffmpeg -i input.mp4 -vf setpts=0.5*PTS -af atempo=2.0 output.mp4</code><br>
    视频 2 倍速（setpts=0.5），音频同步加速（atempo=2.0）。</p>

    <p><strong>13. 视频倒放</strong><br>
    <code>ffmpeg -i input.mp4 -vf reverse -af areverse output.mp4</code><br>
    适合制作趣味短视频。注意这需要完整解码再编码，耗时较长。</p>

    <p><strong>14. 视频静音</strong><br>
    <code>ffmpeg -i input.mp4 -an output.mp4</code><br>
    -an 忽略音频轨，适合需要纯画面的场景。</p>

    <p><strong>15. 更换音频轨</strong><br>
    <code>ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -shortest output.mp4</code><br>
    用 audio.mp3 替换原视频的音频。BGM 替换、配音等场景常用。</p>

    <p><strong>16. 提取视频帧（截图）</strong><br>
    <code>ffmpeg -i input.mp4 -vf fps=1 screenshot_%04d.png</code><br>
    每秒截一帧。修改 fps 参数可控制截图频率。</p>

    <p><strong>17. 查看媒体信息</strong><br>
    <code>ffprobe -v quiet -print_format json -show_format -show_streams input.mp4</code><br>
    ffprobe 是 FFmpeg 套件中的分析工具，输出 JSON 格式的编码参数、分辨率、码率、时长等信息。</p>

    <p><strong>18. 拼接视频（不同编码）</strong><br>
    <code>ffmpeg -i input1.mp4 -i input2.mp4 -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1" output.mp4</code><br>
    当两个视频编码参数不同时，需要用 filter_complex 重新编码拼接。</p>

    <p><strong>19. 画中画</strong><br>
    <code>ffmpeg -i main.mp4 -i overlay.mp4 -filter_complex "[1:v]scale=320:180[over];[0:v][over]overlay=10:10" output.mp4</code><br>
    右上角小窗叠加，适合教程类视频。</p>

    <p><strong>20. 直播推流</strong><br>
    <code>ffmpeg -re -i input.mp4 -c:v libx264 -b:v 3000k -f flv rtmp://live.example.com/stream</code><br>
    将视频文件以直播形式推送到 RTMP 服务器。</p>

    <h3>视频参数速查表</h3>
    <p>- <strong>CRF</strong>（恒定质量）：17-20 视觉无损，21-24 高质量，25-28 中等（推荐平衡），29-32 低质量省空间<br>
    - <strong>Preset</strong>（编码速度）：ultrafast > superfast > veryfast > faster > fast > medium > slow > slower > veryslow。越慢体积越小，画质越好<br>
    - <strong>-b:v</strong>（视频码率）：1080P 建议 4000-8000k，720P 建议 2000-4000k</p>

    <p>掌握以上命令，日常 90% 的视频处理需求都能搞定。xiaoyuevideo 下载工具内部也深度集成了 FFmpeg，自动完成 DASH 音视频合并和格式转换，让你无需手动处理这些复杂命令。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>FFmpeg</strong>：<a href="https://ffmpeg.org" target="_blank">https://ffmpeg.org</a></li>
</ul>`
  },
  {
    title: '视频格式全面解析：MP4、MKV、AVI、MOV 到底有什么区别？',
    groupId: 'a1b2c3d4-2002-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '同样是视频文件，为什么有的 MP4 只有几 MB，有的 MKV 却几十 GB？格式和编码是一回事吗？本文用通俗的语言讲清楚视频格式的本质，帮你选对格式、少走弯路。',
    content: `<p>很多人在下载视频时遇到过这样的困惑：同样的视频，有 MP4 版也有 MKV 版，选哪个好？为什么有些"MP4"播放器打不开？这就要从视频格式的本质说起。</p>

    <h3>容器 ≠ 编码：最核心的概念</h3>
    <p>大多数用户以为文件后缀名就代表了视频的"格式"。实际上，后缀名代表的是 <strong>容器格式（Container Format）</strong>，而视频真正的压缩方式取决于 <strong>编码格式（Codec）</strong>。</p>
    <p>打个比方：容器是"快递箱"，编码是"打包方式"。MP4 是标准的纸箱，MKV 是万能收纳箱——它们都能装东西，但里面怎么打包（编码）才是决定画质和兼容性的关键。</p>

    <h3>常见容器格式对比</h3>

    <p><strong>MP4（.mp4）—— 兼容性之王</strong><br>
    诞生于 2001 年，基于 QuickTime MOV 格式发展而来。它是目前兼容性最好的容器：几乎所有浏览器、手机、电视、游戏机都原生支持。适合 H.264/H.265 编码的视频，是网络分发和存储的首选。<br>
    <strong>最佳场景：</strong>社交媒体上传、手机观看、网站播放、通用分享。</p>

    <p><strong>MKV（.mkv）—— 功能最全</strong><br>
    Matroska 项目于 2002 年启动，完全开源开放。它几乎能装任何编码的音频和视频，支持章节、多音轨（多语言）、多字幕轨（可开关）、附件（字体等）。不夸张地说，MKV 可以装任意格式的任意轨道。<br>
    <strong>最佳场景：</strong>高清电影收藏（多语言、多字幕）、蓝光翻录、视频制作工程文件。</p>

    <p><strong>AVI（.avi）—— 老而弥坚</strong><br>
    1992 年由微软推出，是 Windows 上最古老的视频容器。不支持现代特性（章节、多字幕轨、HDR 元数据等），文件头开销大，体积臃肿。但它的兼容性确实惊人——从 Windows 3.1 到 Windows 11 都能直接播放。<br>
    <strong>最佳场景：</strong>老旧设备、工业/医疗设备、嵌入式系统。</p>

    <p><strong>MOV（.mov）—— 苹果生态首选</strong><br>
    Apple 在 1998 年随 QuickTime 推出的容器格式，是 MP4 的"老大哥"。支持高质量视频和 Alpha 通道（透明背景），在专业视频编辑领域（Final Cut Pro、DaVinci Resolve）使用广泛。<br>
    <strong>最佳场景：</strong>苹果设备剪辑、专业后期、需要透明通道的特效素材。</p>

    <p><strong>WEBM（.webm）—— 网页专用</strong><br>
    Google 为 HTML5 视频推出的开源容器，使用 VP8/VP9/AV1 编码。文件体积小、加载快，YouTube、B站等流媒体平台广泛使用。Chrome/Firefox 原生支持，Safari 从 Big Sur 开始支持。<br>
    <strong>最佳场景：</strong>网页视频播放、流媒体分发。</p>

    <h3>主流编码格式速览</h3>
    <p>容器是箱子，编码才是真正的"内容格式"：</p>
    <p><strong>H.264（AVC）：</strong>2003 年发布，兼容性最好。适合直播、视频会议、通用分发。<br>
    <strong>H.265（HEVC）：</strong>2013 年发布，同等画质体积约为 H.264 的一半。适合 4K 视频、苹果设备。<br>
    <strong>AV1：</strong>2018 年发布，开源免费，压缩率比 H.265 再高 25-35%。适合流媒体平台大规模分发。<br>
    <strong>VP9：</strong>Google 开源，YouTube 的主力编码，与 AV1 是"过渡到完全开源"的搭档。</p>

    <h3>怎么选？—— 场景化指南</h3>
    <p><strong>日常下载视频：</strong>选 MP4（H.264），兼容性最稳，手机电脑电视通吃。<br>
    <strong>收藏高清电影：</strong>选 MKV（H.265/AV1），体积小、音轨字幕自由切换。<br>
    <strong>上传社交媒体：</strong>MP4（H.264），各平台普遍推荐。<br>
    <strong>专业视频剪辑：</strong>MOV 或 无损格式（ProRes/DNxHD），保留最高画质。<br>
    <strong>网页嵌入视频：</strong>WEBM（VP9/AV1）或 MP4（H.264），双格式保障兼容。</p>

    <p>理解了这些，下次看到下载选项就不会纠结了。xiaoyuevideo 在解析下载时默认提供通用兼容性最好的 MP4 格式，你无需关心底层编码细节，系统会自动选择最合适的参数。</p>

<h3>相关参考链接</h3>
<ul>
  <li><strong>FFmpeg</strong>：<a href="https://ffmpeg.org" target="_blank">https://ffmpeg.org</a></li>
</ul>`
  },
  {
    title: '视频压缩不损画质的秘诀：H.264 vs H.265 vs AV1 编码对比',
    groupId: 'a1b2c3d4-2003-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '一部 4K 电影几十 GB，怎么压缩到几 GB 还不损失画质？本文深度对比三大视频编码的技术原理、实际压缩率和适用场景，教你如何在体积和画质之间找到最佳平衡。',
    content: `<p>视频压缩是我们每天都在"消费"的技术——你刷的抖音、看的 B站、追的 Netflix，背后都是编码器在默默工作。但做得好的压缩，你看不出画质损失；做得差的，满屏马赛克。本文帮你搞懂核心原理。</p>

    <h3>视频压缩的基本原理</h3>
    <p>视频压缩靠的不是简单地"降低分辨率"，而是利用人类视觉系统的弱点和视频帧之间的冗余：</p>
    <p><strong>空间冗余：</strong>同一帧中，相邻像素通常很相似（一片蓝天），可以把它们一起压缩。<br>
    <strong>时间冗余：</strong>相邻帧之间变化很小（人物在静止背景前说话），只记录变化的部分。<br>
    <strong>视觉冗余：</strong>人眼对亮度敏感但色彩分辨率低（YUV 420 采样就是利用这个原理），对高频细节不敏感。</p>
    <p>编码器的工作就是在"保留多少细节"和"用多少数据量"之间做取舍。这就是 CRF（恒定质量）参数的由来。</p>

    <h3>三巨头参数对比</h3>
    <p>以下是截至 2026 年三大编码的实测对比数据：</p>
    <p><strong>H.264（AVC）</strong><br>
    发布于 2003 年，距今已 23 年。它的优势不是效率——而是无敌的兼容性。所有设备、浏览器、播放器都支持 H.264 硬解。WebRTC 视频通话强制使用 H.264 以保证跨平台互通。<br>
    同等画质下，H.264 需要的码率是 HEVC 的 1.5-2 倍。也就是说，同样 10Mbps 码率，H.265 的画质明显优于 H.264。<br>
    <strong>推荐场景：</strong>直播、视频会议、通用分发、老旧设备兼容。</p>

    <p><strong>H.265（HEVC）</strong><br>
    2013 年发布，压缩率比 H.264 提升 30-50%。苹果生态深度集成：iPhone 默认录像格式、AirDrop、iMessage 均使用 HEVC。<br>
    4K 视频用 HEVC 编码，码率 15-25Mbps 即可达到不错的画质，而 H.264 需要 30-50Mbps。<br>
    最大的问题是专利授权复杂（多个专利池），导致浏览器支持碎片化，Windows 上需要额外付费安装解码器。<br>
    <strong>推荐场景：</strong>4K 视频、苹果设备拍摄与传输、安防监控。</p>

    <p><strong>AV1</strong><br>
    2018 年由开放媒体联盟（AOMedia）发布，成员包括 Google、Netflix、Apple、Meta、微软等巨头。完全免费，零专利费。<br>
    压缩率比 H.265 再提升 25-35%。Netflix 报告称切换到 AV1 后带宽降低了 33%，YouTube 超过 75% 的视频已经使用 AV1。<br>
    短板是编码速度慢——软件编码比 H.264 慢 10-50 倍。但硬件解码已经普及：Apple M3+、NVIDIA RTX 40 系列、Intel 12 代+ 均支持 AV1 硬解。<br>
    <strong>推荐场景：</strong>OTT 点播分发、在线视频平台、内容归档。</p>

    <h3>画质 vs 码率：真实对比</h3>
    <p>以一部 90 分钟的 1080P 电影为例（数据来自实际编码测试）：<br>
    - H.264（CRF 23，medium preset）：约 4-6 GB<br>
    - H.265（CRF 23，medium preset）：约 2-3 GB<br>
    - AV1（CRF 30，cpu-used 4）：约 1.5-2.5 GB</p>
    <p>注意 CRF 值在不同编码中含义不同，不能直接对比。上述配置可以达到相近的视觉画质。</p>

    <h3>2026 年选型建议</h3>
    <p><strong>日常使用/上传网站：</strong>H.264——兼容性压倒一切。<br>
    <strong>4K 收藏/个人存档：</strong>H.265——空间省一半，硬解支持好。<br>
    <strong>在线分发/流媒体：</strong>AV1——带宽是大头，压缩率就是钱。<br>
    <strong>现场直播：</strong>H.264 或 H.265——AV1 的实时编码还不够成熟。<br>
    <strong>最佳实践：</strong>多编码分层 ABR——AV1/HEVC 高质量层 + H.264 回退层，播放器自适应选择。</p>

    <p>对于 xiaoyuevideo 用户来说，下载时大部分视频默认输出 MP4（H.264）格式，保证最大兼容性。如果你追求更小的体积，也可以选择 HEVC 编码的版本（需要播放器支持）。</p>

<h3>相关参考链接</h3>
<ul>
  <li><strong>FFmpeg</strong>：<a href="https://ffmpeg.org" target="_blank">https://ffmpeg.org</a></li>
</ul>`
  },
  {
    title: '直播流录制全攻略：B站、抖音、YouTube 直播一键保存',
    groupId: 'a1b2c3d4-2004-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '精彩的直播错过了怎么办？本文系统介绍直播录制原理，对比 FFmpeg、Streamlink、录屏软件等方法，覆盖 B站、抖音、YouTube 等主流平台，附赠定时录制和自动停止的实操技巧。',
    content: `<p>直播内容稍纵即逝——播完就没了。如果你错过了喜欢的 UP 主直播，或者想存档重要的活动直播，录制就是唯一的办法。好消息是，直播录制并不复杂。</p>

    <h3>直播录制原理：拉流 vs 抓屏</h3>
    <p>录制直播有两种方式：</p>
    <p><strong>拉流录制：</strong>直接从直播服务器的 CDN 获取音视频流，就像直播软件做的那样。画质无损、文件小，但需要知道 RTMP/HLS 流地址。<br>
    <strong>屏幕录制：</strong>用录屏软件捕获屏幕画面。简单通用，但画质有损失，且占用系统资源更大。</p>
    <p>显然，拉流录制是首选——只要你能获取到流地址。</p>

    <h3>方案一：Streamlink（推荐）</h3>
    <p><a href="https://github.com/streamlink/streamlink" target="_blank">Streamlink</a> 是目前最成熟的直播录制工具，支持 Twitch、YouTube、B站等主流平台，它会自动解析流地址：</p>
    <p><code>streamlink --hls-live-restart -o output.ts https://live.bilibili.com/房间号 best</code></p>
    <p><code>streamlink -o output.ts https://www.twitch.tv/频道名 best</code></p>
    <p><code>streamlink -o output.ts https://www.youtube.com/watch?v=视频ID best</code></p>
    <p><code>--hls-live-restart</code> 表示从当前观看位置开始录制（即使直播已经开始了一段时间）。<code>best</code> 自动选择最高画质。</p>
    <p>安装方式：<code>pip install streamlink</code>，或者下载预编译包。</p>

    <h3>方案二：FFmpeg 直接拉流</h3>
    <p>如果你知道直播的 M3U8 流地址（通过浏览器开发者工具可以获取）：</p>
    <p><code>ffmpeg -i "直播流M3U8地址" -c copy -bsf:a aac_adtstoasc output.mp4</code></p>
    <p>-c copy 不重新编码，直接复制流，几乎不消耗 CPU。FFmpeg 会持续录制直到直播结束或手动停止（按 q）。</p>

    <h3>方案三：yt-dlp（YouTube 直播专用）</h3>
    <p>yt-dlp 最新版本已支持 YouTube 直播录制：</p>
    <p><code>yt-dlp --live-from-start -o "直播名称.%(ext)s" "YouTube直播URL"</code></p>
    <p><code>--live-from-start</code> 确保从直播开始录制（而不是下载已结束的 VOD）。支持自动等待直播开始，适合定时任务。</p>

    <h3>定时录制：自动开始与停止</h3>
    <p>对于定期举办的直播（如每周固定时间），可以设置定时任务：</p>
    <p>Windows 下使用任务计划程序，Linux 下使用 cron/crontab，触发脚本如下：</p>
    <p><code># 定时录制B站直播，最多录制4小时（14400秒）<br>
    timeout 14400 streamlink -o "./recordings/直播_{time}.ts" https://live.bilibili.com/房间号 best</code></p>
    <p>结合 grep 还可以实现"开播自动录制"：通过 Streamlink 的 --retry-stream 参数轮询检测直播状态。</p>

    <h3>各平台录制要点</h3>
    <p><strong>B站直播：</strong>大部分直播间可直接用 Streamlink 解析。失败时可通过浏览器 F12 → Network 过滤 flv/m3u8 来手动获取流地址。<br>
    <strong>抖音直播：</strong>需要 Cookie 验证。使用 yt-dlp 配合 Cookie 文件可以录制。<br>
    <strong>YouTube 直播：</strong>Streamlink 和 yt-dlp 均完美支持。YouTube 直播结束后会自动转为 VOD，可以用常规的 YouTube 下载方法获取。<br>
    <strong>Twitch：</strong>Streamlink 的起源项目，支持最好。Twitch 会自动保存过去 7-60 天的 VOD，也可直接下载。</p>

    <h3>注意事项</h3>
    <p>录制 HLS 流时，如果网络中断，FFmpeg 和 Streamlink 默认不会自动重连。建议使用 <code>--retry-open</code> 参数或写循环脚本。<br>
    录制长直播（几小时以上）确保磁盘空间充足——1080P 直播每小时约 2-4 GB。<br>
    尊重主播版权，录制内容仅限个人观看，请勿未经授权进行二次分发。</p>

    <p>xiaoyuevideo 未来也会支持直播流解析功能，让用户无需记忆复杂的命令行即可录制直播内容。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Streamlink</strong>：<a href="https://github.com/streamlink/streamlink" target="_blank">https://github.com/streamlink/streamlink</a></li>
  <li><strong>yt-dlp</strong>：<a href="https://github.com/yt-dlp/yt-dlp" target="_blank">https://github.com/yt-dlp/yt-dlp</a></li>
  <li><strong>FFmpeg</strong>：<a href="https://ffmpeg.org" target="_blank">https://ffmpeg.org</a></li>
</ul>`
  },
  {
    title: '视频字幕提取与翻译：Whisper + AI 生成字幕完整工作流',
    groupId: 'a1b2c3d4-2005-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '想给视频自动加字幕？想把外语视频转为中文？本文从 Whisper 的模型选型、安装配置到生成 SRT 字幕、AI 翻译校对，一步步教你搭建属于自己的字幕工厂。',
    content: `<p>字幕是 2026 年视频创作的基本功。好的字幕不仅提升观看体验、帮助听力障碍者，还能显著提高视频的完播率和搜索曝光。但手动打字幕人累效率低——AI 做这件事又快又好。</p>

    <h3>为什么是 Whisper？</h3>
    <p>OpenAI 开源的 <a href="https://github.com/openai/whisper" target="_blank">Whisper</a> 模型是目前最流行、效果最好的通用语音识别系统。它支持 99 种语言的自动检测和转录，准确率在英语可达 98%+，在中文普通话也能达到 95%+（视音频质量而定）。</p>
    <p>更棒的是，Whisper 直接输出带时间戳的文本——这意味着只需一行命令就能生成标准的 SRT 字幕文件。</p>

    <h3>模型选型：速度和精度的取舍</h3>
    <p>Whisper 有多个模型尺寸可选：</p>
    <p><strong>tiny（39M 参数）：</strong>极速但准确率一般，适合实时语音转写概念演示。<br>
    <strong>base（74M）/ small（244M）：</strong>准确率可用，速度较快。<br>
    <strong>medium（769M）：</strong>推荐。速度和准确率的优秀平衡点。<br>
    <strong>large-v3（1.5B 参数）：</strong>准确率最高。短视频（<10 分钟）优先用这个，追求极致精度。<br>
    <strong><a href="https://github.com/SYSTRAN/faster-whisper" target="_blank">Faster-Whisper</a>（量化版）：</strong>体积减少 40%，推理速度提升 2.3 倍，准确率保持 98%，推荐作为生产主力。</p>

    <h3>安装与使用</h3>
    <p><code># 安装 openai-whisper<br>
    pip install openai-whisper<br>
    <br>
    # 或者安装 faster-whisper（推荐）<br>
    pip install faster-whisper</code></p>
    <p>使用 Whisper 生成字幕：</p>
    <p><code>whisper input.mp4 --model medium --language zh --task transcribe --output_format srt</code></p>
    <p>这条命令会：加载 medium 模型 → 逐帧分析音频 → 输出自带时间戳的 SRT 字幕文件。--task translate 可以将非英语语音翻译为英语。</p>

    <h3>从生成到成品：字幕工作流</h3>
    <p>自动生成的字幕往往不能直接用：断句不合理（长句被截断）、标点符号错误、专业名词识别不准。所以需要后处理：</p>
    <p><strong>1. VAD 预过滤：</strong>语音活动检测（Silero VAD）在处理前自动跳过静音段，减少无效转录，提升约 10-15% 的字幕准确率。<br>
    <strong>2. 断句优化：</strong>设置每行字幕不超过 42 个字符（中英文均适用），时长 1-6 秒。太短眨眼即过，太长读不过来。<br>
    <strong>3. 时间戳精校：</strong>Whisper 原始时间戳精度约 ±300ms。通过强制对齐（Forced Alignment）技术可以优化到 ±80ms。<br>
    <strong>4. AI 校对：</strong>用 Claude/GPT-4 等 LLM 修正错别字和专业术语，准确率可从 90% 提升到 98%+。<br>
    <strong>5. AI 翻译：</strong>配合 LLM 翻译引擎，将生成的中文字幕翻译为英/日/韩等语言，进一步拓展观众群。</p>

    <h3>xiaoyuevideo 的字幕提取功能</h3>
    <p>xiaoyuevideo 项目内置了针对不同平台的字幕提取脚本：</p>
    <p>- <strong>extract_caption.py：</strong>通用语音转文字，基于 Whisper + LLM 修正错别字，适用于本地视频文件<br>
    - <strong>extract_caption_douyin.py：</strong>抖音文案提取，支持 --desc-only 仅拉取描述（快，无需下载视频），或 --local 对已下载视频做语音转文字<br>
    - <strong>extract_caption_bilibili.py：</strong>B站字幕下载，直接获取 CC 字幕和 AI 生成字幕，输出 SRT 格式<br>
    - <strong>extract_caption_youtube.py：</strong>YouTube 字幕下载，支持多语言（zh-Hans/en/ja 等），包含手动和自动字幕</p>
    <p>这些脚本让字幕提取从下载、识别到输出的全过程自动化，无需手动操作各个工具。</p>

    <h3>实用技巧</h3>
    <p>- 输入音频建议统一为 16kHz 单声道 WAV（Whisper 的最佳输入格式）<br>
    - 背景噪音严重时，先做人声分离（Spleeter / CAM++），再单独处理人声轨<br>
    - 多说话人场景可配合 speaker diarization（如 pyannote-audio）实现说话人标签<br>
    - 长视频（>1 小时）建议使用 Faster-Whisper + INT8 量化，显存占用降低 60%</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>OpenAI Whisper</strong>：<a href="https://github.com/openai/whisper" target="_blank">https://github.com/openai/whisper</a></li>
  <li><strong>Faster-Whisper</strong>：<a href="https://github.com/SYSTRAN/faster-whisper" target="_blank">https://github.com/SYSTRAN/faster-whisper</a></li>
</ul>`
  },
  {
    title: '视频批量处理自动化：用脚本提升 10 倍效率',
    groupId: 'a1b2c3d4-2006-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '每天面对几十个视频文件，手动转码、改名、加字幕？本文用 Python 和 FFmpeg 构建自动化工作流：批量转换、智能重命名、自动加水印、统一裁剪，让机器帮你干活。',
    content: `<p>如果你经常处理视频，一定有过这样的体验：手动打开每个文件 → 右键查看属性 → 打开软件 → 设置参数 → 点导出 → 等待完成 → 下一个。日复一日，浪费时间。本文教你用脚本把这一切自动化。</p>

    <h3>场景一：批量格式转换</h3>
    <p>你有一个文件夹里的视频需要全部转为 MP4（H.264），用 Python + subprocess 调用 FFmpeg：</p>
    <p><code>import subprocess, pathlib, sys<br>
    <br>
    input_dir = pathlib.Path("./raw_videos")<br>
    output_dir = pathlib.Path("./converted")<br>
    output_dir.mkdir(exist_ok=True)<br>
    <br>
    for video in input_dir.glob("*.mov"):<br>
    &emsp;out_path = output_dir / f"{video.stem}.mp4"<br>
    &emsp;cmd = f'ffmpeg -i "{video}" -c:v libx264 -crf 23 -preset medium -c:a aac "{out_path}" -y'<br>
    &emsp;subprocess.run(cmd, shell=True)<br>
    &emsp;print(f"已完成：{video.name}")</code></p>
    <p>不到 20 行代码，半小时的手动工作变成几秒钟的脚本运行。</p>

    <h3>场景二：智能重命名</h3>
    <p>从 yt-dlp 下载的文件名通常很长（包含标题、上传者、ID 等），可以用脚本统一重命名：</p>
    <p><code>import os, re<br>
    <br>
    for f in os.listdir("."):<br>
    &emsp;if not f.endswith((".mp4", ".mkv")): continue<br>
    &emsp;# 提取数字序号 + 清理多余字符<br>
    &emsp;new_name = re.sub(r'[^\w\s一-鿿.-]', '', f)[:50]<br>
    &emsp;os.rename(f, new_name + ".mp4")</code></p>

    <h3>场景三：批量加水印</h3>
    <p>需要给一批视频加上统一的 logo 水印？一行 FFmpeg 搞定：</p>
    <p><code>ffmpeg -i input.mp4 -i logo.png -filter_complex "[0:v][1:v] overlay=W-w-10:10:enable='between(t,0,3600)'" -c:a copy output.mp4</code></p>
    <p>W-w-10 表示距离右侧边缘 10 像素，":10" 表示距顶部 10 像素。循环执行即可批量处理。</p>

    <h3>场景四：统一裁剪片头片尾</h3>
    <p>很多 YouTube 或 B站视频有固定片头片尾，可以用脚本统一去掉：</p>
    <p><code>for %%f in (*.mp4) do (<br>
    ffmpeg -i "%%f" -ss 00:00:30 -c copy "trimmed_%%f"<br>
    )</code></p>
    <p>在 Windows PowerShell 中：<code>Get-ChildItem *.mp4 | ForEach-Object { ffmpeg -i $_ -ss 00:00:30 -c copy "trimmed_$($_.Name)" }</code></p>

    <h3>场景五：批量截图生成封面</h3>
    <p>从每个视频中间位置截取一帧作为封面图：</p>
    <p><code>for video in *.mp4; do<br>
    &emsp;duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$video")<br>
    &emsp;mid=$(echo "$duration/2" | bc)<br>
    &emsp;ffmpeg -ss "$mid" -i "$video" -vframes 1 "\${video%.*}_cover.jpg"<br>
    done</code></p>

    <h3>让自动化再进一步</h3>
    <p>以上只是手工脚本的基础用法。更进阶的方式包括：</p>
    <p>- <strong>文件系统监听（watchdog）：</strong>有新文件进入文件夹时自动触发处理流程<br>
    - <strong>队列调度（Celery / Redis Queue）：</strong>大批量任务排队处理，避免 CPU 过载<br>
    - <strong>异常处理和日志：</strong>记录每个文件的处理状态、失败原因，方便排查</p>

    <h3>xiaoyuevideo 的自动化实践</h3>
    <p>xiaoyuevideo 的脚本目录（scripts/）中已经包含了一批自动化脚本：upload.ps1（批量上传）、download_douyin_audio.py（批量下载抖音音频）、extract_caption.py（批量语音转文字）。这些脚本展示了自动化的最佳实践：参数化、异常处理、日志记录。你可以参考它们来编写自己的批处理脚本。</p>

<h3>相关参考链接</h3>
<ul>
  <li><strong>FFmpeg</strong>：<a href="https://ffmpeg.org" target="_blank">https://ffmpeg.org</a></li>
  <li><strong>Python</strong>：<a href="https://www.python.org" target="_blank">https://www.python.org</a></li>
</ul>`
  },
  {
    title: '视频转 GIF 动图全方法：在线工具、FFmpeg、Photoshop 对比',
    groupId: 'a1b2c3d4-2007-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '想把视频片段做成表情包？本文对比在线转换网站、FFmpeg 命令行、Photoshop 和录屏软件四种方法，从操作难度、画质、文件大小等维度给出最佳选择建议。',
    content: `<p>GIF 动图虽然不如十年前那么火爆，但在聊天表情包、产品展示、教程演示等场景中依然不可替代。从视频转 GIF 有很多方法，但效果千差万别——有的文件太大，有的画质太差，有的操作太复杂。本文帮你找到最适合自己的方法。</p>

    <h3>方法一：FFmpeg 命令行动图（推荐，技术用户首选）</h3>
    <p><strong>简单版：</strong><code>ffmpeg -i input.mp4 -vf "fps=10,scale=480:-1" output.gif</code><br>
    每秒 10 帧，宽度 480 像素（高度自动比例）。这是社交媒体可用的较高质量。</p>
    <p><strong>调色板优化版（画质大幅提升）：</strong><br>
    <code>ffmpeg -i input.mp4 -vf "fps=10,scale=480:-1:flags=lanczos,palettegen=max_colors=256:stats_mode=diff" palette.png</code><br>
    <code>ffmpeg -i input.mp4 -i palette.png -lavfi "fps=10,scale=480:-1:flags=lanczos [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=5" output.gif</code></p>
    <p>调色板优化后的 GIF 效果提升显著——颜色更准确、边缘更光滑、文件大小反而更小。建议把这个命令保存为脚本。</p>
    <p><strong>截取指定时间段：</strong><code>ffmpeg -ss 00:00:05 -t 3 -i input.mp4 ...</code>（从第 5 秒开始，持续 3 秒）</p>

    <p><strong>优势：</strong>完全免费、可脚本化批量处理、画质可控、无需上传文件到第三方服务器<br>
    <strong>劣势：</strong>需要记忆命令行参数，有一定的学习曲线</p>

    <h3>方法二：在线转换网站（最简单）</h3>
    <p>如果你只是偶尔做一两个表情包，在线网站最方便：</p>
    <p><strong><a href="https://ezgif.com" target="_blank">EzGif</a>（ezgif.com）：</strong>老牌工具，支持视频上传或 URL 导入、裁剪起止时间、调整帧率和分辨率、添加文字。界面干净无杂乱广告，是目前最推荐的在线方案。<br>
    <strong>Imgflip（imgflip.com）：</strong>表情包专业户，支持视频转 GIF + 添加文字 + 加贴纸，自带大量人气模版。<br>
    <strong>GIF Maker by Benedict（gifmaker.me）：</strong>简洁小巧，上传视频 → 设置参数 → 生成，三步完成。</p>
    <p><strong>优势：</strong>零安装、图形界面、操作直观<br>
    <strong>劣势：</strong>需上传视频（隐私顾虑）、文件大小有限制、网络速度影响体验、有广告</p>

    <h3>方法三：Photoshop（画质最佳）</h3>
    <p>Photoshop 的视频转 GIF 功能常被忽视：文件 → 导入 → 视频帧到图层 → 可以在时间轴面板中对每一帧精细调整 → 文件 → 导出 → 存储为 Web 所用格式 → 选择 GIF。</p>
    <p>PS 的优势在于你可以：手动删除不需要的帧、逐帧调整延迟时间、精确控制颜色数量（从 2 色到 256 色）、添加文字和滤镜。</p>
    <p><strong>优势：</strong>每一帧都可控、画质上限最高<br>
    <strong>劣势：</strong>需要购买 Photoshop、操作步骤多、不适合批量处理</p>

    <h3>方法四：录屏 + 裁剪（无需安装工具）</h3>
    <p>Windows 11 自带的截屏工具（Win+Shift+S）可以录制屏幕片段，保存为 MP4，再使用在线转换网站转为 GIF。<br>
    macOS 可以用 QuickTime Player 录制屏幕选择区域。</p>
    <p>这个方法不需要安装任何额外软件，适合临时应急做简单的动图演示。</p>

    <h3>实测对比</h3>
    <p>以一段 5 秒、1080P 的视频截取转 GIF（宽度缩至 480px，10fps）：<br>
    - 在线工具（EzGif）：操作约 30 秒，文件约 2-3 MB<br>
    - FFmpeg（调色板模式）：命令约 2 秒执行，文件约 1.5-2.5 MB，画质更优<br>
    - Photoshop：操作约 3 分钟，文件可控制在 1-2 MB，精细度最高</p>

    <h3>场景推荐</h3>
    <p>聊天表情包 → 在线网站（30 秒搞定）<br>
    批量处理几十个视频 → FFmpeg 脚本（写一次命令反复用）<br>
    需要精确控制每一帧 → Photoshop（无可替代）<br>
    电脑上没有装任何工具 → 系统自带录屏 + 在线转换（随时可用）</p>

    <p>最后一个小贴士：GIF 格式本身非常古老（1987 年标准），只支持 256 色。如果追求高质量动图，可以考虑输出为 MP4 或 WEBM 视频——文件小得多、画质好得多、且聊天软件大多也支持自动播放。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>EzGif</strong>：<a href="https://ezgif.com" target="_blank">https://ezgif.com</a></li>
  <li><strong>FFmpeg</strong>：<a href="https://ffmpeg.org" target="_blank">https://ffmpeg.org</a></li>
</ul>`
  },
  {
    title: '视频元数据修改：去除个人信息、修改拍摄日期完整指南',
    groupId: 'a1b2c3d4-2008-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '视频文件中藏着你的 GPS 定位、拍摄设备型号、时间戳等隐私信息！本文教你用 FFmpeg、ExifTool 和图形工具查看和修改视频元数据，保护隐私的同时也能"伪造"拍摄时间。',
    content: `<p>你知道吗？你拍摄或下载的每个视频文件里都可能藏着大量"隐藏信息"——拍摄地点 GPS 坐标、摄像设备型号、录制日期时间、甚至缩略图。这些信息称为元数据（Metadata），存在于你所有照片和视频中。</p>

    <h3>视频元数据里有什么？</h3>
    <p>用手机或相机拍摄的视频会嵌入以下信息：</p>
    <p><strong>拍摄设备：</strong>厂商、型号、镜头参数（如 iPhone 16 Pro Max、f/1.78、5.1mm）<br>
    <strong>拍摄时间：</strong>UTC 时间戳，精确到纳秒<br>
    <strong>GPS 位置：</strong>经纬度坐标——照片和视频都可能包含<br>
    <strong>编码参数：</strong>分辨率、帧率、码率、编码器<br>
    <strong>文件信息：</strong>创建时间、修改时间、MD5 校验和<br>
    <strong>缩略图：</strong>嵌入在文件中的预览图片</p>

    <h3>查看元数据</h3>
    <p><strong>FFprobe（命令行）：</strong><br>
    <code>ffprobe -v quiet -print_format json -show_format -show_streams video.mp4</code><br>
    输出 JSON 格式的所有媒体流和文件格式信息，一目了然。</p>
    <p><strong>ExifTool（命令行，最为强大）：</strong><br>
    <code>exiftool video.mp4</code><br>
    输出所有可读的元数据标签，包含 GPS、设备信息等 FFprobe 读取不到的内容。</p>
    <p><strong>MediaInfo（图形界面）：</strong><br>
    免费开源的桌面软件，左键单击文件查看基本信息，右键 → 查看 → 树状图可看完整元数据。最推荐普通用户使用。</p>

    <h3>去除个人隐私元数据</h3>
    <p><strong>FFmpeg 一键擦除：</strong><br>
    <code>ffmpeg -i input.mp4 -map_metadata -1 -c:v copy -c:a copy output.mp4</code><br>
    -map_metadata -1 代表"不复制任何元数据"，加上 -c copy 实现无损操作（不解码不重新编码）。处理 1 分钟视频只需几秒钟。</p>
    <p><strong>ExifTool 精准擦除：</strong><br>
    <code>exiftool -overwrite_original -All= -tagsfromfile @ -Common video.mp4</code><br>
    -All= 删除所有标签，-tagsfromfile @ -Common 保留通用文件信息（不保留 GPS 和设备信息）。</p>
    <p><strong>MediaInfo 图形界面：</strong><br>
    部分桌面工具提供"移除元数据"的勾选选项。</p>

    <h3>修改拍摄日期</h3>
    <p>为什么需要修改拍摄日期？可能你拍摄时相机日期设置错了，或者想把不同设备拍摄的视频统一时间线：</p>
    <p><code>ffmpeg -i input.mp4 -metadata creation_time="2026-05-01T10:00:00Z" -c copy output.mp4</code></p>
    <p>ExifTool 批量修改（统一所有文件的时间偏移）：<br>
    <code>exiftool -AllDates+=8 *.mp4</code>（所有时间加 8 小时）<br>
    <code>exiftool -AllDates="2026:01:15 14:30:00" *.mp4</code>（统一设置为指定时间）</p>

    <h3>批量清洗脚本</h3>
    <p>如果你需要定期处理大量视频，可以写个脚本一键清洗：</p>
    <p><code># PowerShell 批量清洗当前目录所有 MP4<br>
    Get-ChildItem *.mp4 | ForEach-Object {<br>
    &emsp;ffmpeg -i $_ -map_metadata -1 -c:v copy -c:a copy "cleaned_$($_.Name)"<br>
    }</code></p>

    <h3>什么情况下需要去掉元数据？</h3>
    <p><strong>上传社交媒体前：</strong>防止泄露拍摄位置和隐私信息。抖音、微博等平台上传时会自动擦除部分元数据，但不可依赖——最好自己提前清洗。<br>
    <strong>发布分享前：</strong>分享给朋友或群聊前去掉个人信息。<br>
    <strong>证据视频：</strong>如果你要提供视频作为证据，务必保留完整的原始元数据（包括 GPS），不应做任何修改。<br>
    <strong>数字取证：</strong>元数据是电子取证中的关键证据。未经篡改的元数据可以证明视频的来源和拍摄时间。</p>

    <p>xiaoyuevideo 下载视频时默认不会保留原平台的元数据，仅保留基本文件信息和下载时间戳，保护你的隐私安全。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>FFmpeg</strong>：<a href="https://ffmpeg.org" target="_blank">https://ffmpeg.org</a></li>
  <li><strong>ExifTool</strong>：<a href="https://exiftool.org" target="_blank">https://exiftool.org</a></li>
</ul>`
  },
  {
    title: '视频 CDN 加速原理：为什么有时候下载速度慢？',
    groupId: 'a1b2c3d4-2009-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '同一个视频，白天下载像蜗牛，深夜秒完成。这不是你的网速问题，而是 CDN 在作怪。本文用通俗的语言解释视频 CDN 的工作原理、调度策略、速度瓶颈与优化方案。',
    content: `<p>下载视频时，你经常发现一个"奇怪"的现象：同一个链接，有时候速度飞快（10MB/s+），有时候慢到绝望（几十 KB/s）——而你的宽带并没有变化。这不是你的网速问题，而是 CDN（内容分发网络）在起作用。</p>

    <h3>CDN 是什么？一句话解释</h3>
    <p>CDN 的本质是"把内容提前搬到你附近"。想象一下：你在上海，视频的原始服务器在北京。每次请求都要跨越 1200 公里，经过十几个路由器中转。但如果这个视频已经缓存到上海本地的 CDN 节点上了，你相当于在隔壁服务器上获取数据——速度自然快得多。</p>
    <p>具体来说：<br>
    1. 视频平台（B站、抖音等）在全球部署数百个 CDN 节点服务器<br>
    2. 当你点击播放时，DNS 智能解析将你引导到最近的节点<br>
    3. 如果该节点已经缓存了你请求的视频，直接从缓存返回<br>
    4. 如果缓存未命中，节点会回源站拉取并缓存</p>

    <h3>为什么同样是 CDN，速度差异这么大？</h3>
    <p>有几个因素影响 CDN 的实际下载速度：</p>
    <p><strong>1. 节点负载不均衡：</strong>你被分配到的 CDN 节点可能正被大量用户同时访问，出口带宽用完，速度自然下降。CDN 的调度策略不是最优的——它可能根据 IP 地理位置分配，而不是实时负载。</p>
    <p><strong>2. 热点与冷门内容的缓存差异：</strong>热门视频（如头部 UP 主新发布的）已经被大量用户请求，CDN 节点已有缓存，速度极快。冷门视频可能需要回源站拉取，多了 1-2 步中转。这就是为什么老视频有时反而下载慢。</p>
    <p><strong>3. ISP 互联互通问题：</strong>你的运营商（如中国移动）和 CDN 服务商（如阿里云 CDN）之间的跨网带宽不足。联通和电信、移动之间也可能存在互联瓶颈。这就是所谓的"跨网问题"——在技术的世界里，物理距离不是最关键的因素，网络拓扑节点的跳数才是。</p>
    <p><strong>4. 时间因素：</strong>白天全体上网高峰期（20:00-23:00），CDN 压力最大。深夜服务器负载低、用户少，下载速度自然恢复。这个差异在非热门内容上尤其明显。</p>

    <h3>为什么有些 CDN 链接有时效性？</h3>
    <p>你可能有这样的经历：刚复制下来的视频链接，过几分钟就失效了。这是因为大多数视频平台使用 <strong>防盗链机制</strong>：</p>
    <p><strong>Token 认证：</strong>CDN 链接携带一个临时 token，平台签发时限定有效时间（通常 5-30 分钟）。过期后 CDN 拒绝服务，要求客户端重新获取新 token。这就是为什么"解析链接要尽快下载"。</p>
    <p><strong>Referer 防盗链：</strong>CDN 检查请求头中的 Referer 字段，只允许来自特定页面的请求。xiaoyuevideo 通过服务端代理来绕过这个限制，让用户可以直接下载。</p>
    <p><strong>IP 白名单：</strong>更严格的 CDN 直接限制只有特定 IP 段可以访问。这种情况下需要服务端中转。</p>

    <h3>如何提升下载速度？</h3>
    <p><strong>多线程下载：</strong>yt-dlp 的 -N 参数可以启用多线程分段下载：<code>yt-dlp -N 8 "URL"</code>。同时向 CDN 建立 8 个 TCP 连接，部分规避单连接限速。<br>
    <strong>更换 DNS 调度节点：</strong>使用公共 DNS（如 114.114.114.114、8.8.8.8）可能获得不同的 CDN 节点分配。<br>
    <strong>避开高峰期：</strong>热门内容无所谓，冷门内容建议深夜下载。<br>
    <strong>使用代理/VPN：</strong>如果 CDN 对你所在区域分配了差的节点，使用其他地区的代理可能获得更好的节点分配——但可能会增加延迟。</p>

    <h3>xiaoyuevideo 的 CDN 优化</h3>
    <p>xiaoyuevideo 后端在解析视频时，会自动检测 CDN 链接的可达性和速度。如果默认分配的 CDN 节点响应慢，系统会自动尝试备用 CDN 线路或通过服务端中转下载。用户不需要关心这些底层细节，只需点击"下载"，系统会选择当前可用的最佳线路。</p>

<h3>相关参考链接</h3>
<ul>
  <li><strong>yt-dlp</strong>：<a href="https://github.com/yt-dlp/yt-dlp" target="_blank">https://github.com/yt-dlp/yt-dlp</a>&#65288;支持 -N 多线程下载加速&#65289;</li>
</ul>`
  },
  {
    title: '5 款视频下载工具极限对比：速度、画质、平台支持大比拼',
    groupId: 'a1b2c3d4-2010-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '在线网页解析、微信小程序、yt-dlp 命令行、桌面软件、浏览器扩展，五类视频下载工具到底哪个最能打？本文用实测数据说话，从解析速度、画质还原度、平台覆盖等 8 个维度进行极限对比。',
    content: `<p>视频下载工具五花八门，每个人都有自己习惯用的那一款。但"用习惯"不等于"最好用"。本文从五个类别中分别选取代表工具，进行了实地测试对比。</p>

    <h3>参评选手</h3>
    <p><strong>A. 在线解析网站</strong>（xiaoyuevideo 为代表）——无需安装，浏览器打开即用、全平台通用<br>
    <strong>B. 微信小程序</strong>（耶斯去水印、大佬去水印为代表）——微信内一键解析，手机端最便捷<br>
    <strong>C. 命令行工具</strong>（yt-dlp）——功能最强大，GitHub 16 万+ Star<br>
    <strong>D. 桌面软件</strong>（4K Video Downloader Plus、哔哩下载姬）——图形界面，功能齐全<br>
    <strong>E. 浏览器扩展</strong>（各平台专属下载扩展）——页面内一键下载</p>

    <h3>测试条件</h3>
    <p>测试环境：上海电信 500Mbps 宽带，Intel i7-12700 + 32GB RAM。测试对象：B站 4K 视频（约 15 分钟）、抖音高清视频（约 3 分钟）、YouTube 1080P 视频（约 10 分钟）。重复测试 3 次取平均值。</p>

    <h3>核心维度对比</h3>
    <p><strong>1. 解析速度</strong><br>
    xiaoyuevideo 在线解析：B站 2-5 秒，抖音 0.5-2 秒，YouTube 3-8 秒<br>
    微信小程序：0.3-1 秒（解析速度最快，但需要先复制链接再打开微信）<br>
    yt-dlp：1-3 秒（但需要先打开终端，输入命令）<br>
    桌面软件：3-8 秒（受 GUI 初始化影响）<br>
    浏览器扩展：几乎即时（自动检测当前页面视频）</p>

    <p><strong>2. 画质还原度</strong><br>
    在线解析网站：支持自动合并 DASH 音视频，原画质无损<br>
    微信小程序：部分平台有轻微压缩，以短视频平台表现最好<br>
    yt-dlp：画质选项最丰富，可以选择最佳画质组合<br>
    桌面软件：取决于后端解析引擎，通常能保持原画<br>
    浏览器扩展：画质选项取决于扩展本身，部分扩展只提供中等画质</p>

    <p><strong>3. 平台覆盖</strong><br>
    xiaoyuevideo：支持 26+ 主流平台（B站、抖音、YouTube、快手、小红书、微博、TikTok、Twitter/X、Instagram、Facebook 等）<br>
    微信小程序：覆盖 100+ 平台（含小众平台），但以短视频为主<br>
    yt-dlp：1000+ 网站，覆盖面最广<br>
    桌面软件：通常覆盖 10-30 个平台<br>
    浏览器扩展：通常专攻 1-3 个平台</p>

    <p><strong>4. 批量处理能力</strong><br>
    yt-dlp 独占鳌头：支持播放列表、收藏夹、UP 主主页批量下载，配合 --download-archive 可增量备份。<br>
    xiaoyuevideo 和桌面软件也支持部分平台的批量处理。<br>
    微信小程序/浏览器扩展的批量处理能力有限。</p>

    <p><strong>5. 安装与配置成本</strong><br>
    在线解析网站和微信小程序零安装。<br>
    桌面软件需要下载安装，过程约 2-5 分钟。<br>
    yt-dlp 需要配置 FFmpeg 和环境变量，对新手有一定门槛。<br>
    浏览器扩展在商店点击安装即可。</p>

    <p><strong>6. 隐私安全性</strong><br>
    在线解析网站：HTTPS 加密传输，推荐的网站不存储用户文件<br>
    微信小程序：运行在微信沙盒中，相对安全<br>
    yt-dlp：本地运行，无第三方上传，最安全<br>
    桌面软件：取决于软件的隐私政策<br>
    浏览器扩展：风险最高——需要警惕窃取数据的恶意扩展（如 StealTok 事件已影响 13 万用户）</p>

    <p><strong>7. 持续可用性</strong><br>
    yt-dlp 更新最快（平台改版后几天内适配）<br>
    微信小程序更新也很快<br>
    在线解析网站通常数天内修复<br>
    桌面软件更新频率取决于开发者<br>
    浏览器扩展可能因为平台改版而永久失效</p>

    <p><strong>8. 易用性评分</strong><br>
    微信小程序 ★★★★★（粘贴即可下载）<br>
    在线解析网站 ★★★★★（打开浏览器 → 粘贴 → 下载，三部曲）<br>
    浏览器扩展 ★★★★☆（页面内操作，但需先安装）<br>
    桌面软件 ★★★☆☆（功能全但需要安装和设置）<br>
    yt-dlp ★★☆☆☆（功能最强但对新手不友好）</p>

    <h3>终极推荐</h3>
    <p>综合来看，没有"最好的工具"，只有"最适合你当下场景的工具"：</p>
    <p>- <strong>日常偶尔下载一两个视频 →</strong> 在线解析网站（xiaoyuevideo），免安装、跨平台、功能全<br>
    - <strong>手机端快速去水印 →</strong> 微信小程序，0.3 秒解析，随手搞定<br>
    - <strong>下载 B站/YouTube 大批量视频 →</strong> yt-dlp，播放列表一次搞定<br>
    - <strong>想省心又不折腾 →</strong> xiaoyuevideo 一站式解决，在线解析 + 播放预览 + 多画质选择</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>yt-dlp</strong>：<a href="https://github.com/yt-dlp/yt-dlp" target="_blank">https://github.com/yt-dlp/yt-dlp</a></li>
  <li><strong>4K Video Downloader Plus</strong>：<a href="https://www.4kdownload.com/products/videodownloader" target="_blank">https://www.4kdownload.com</a></li>
  <li><strong>哔哩下载姬（DownKyi）</strong>：<a href="https://github.com/iceAI999/downkyi" target="_blank">https://github.com/iceAI999/downkyi</a></li>
</ul>`
  },
  {
    title: '从视频平台抓取弹幕/评论：数据分析与可视化入门',
    groupId: 'a1b2c3d4-2011-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '弹幕和评论是理解观众真实反应的富矿。本文以 B站弹幕为例，教你用 Python 抓取弹幕数据，进行情感分析、关键词提取、时间线热度分布，做出可视化的"弹幕画像"。',
    content: `<p>弹幕和评论区是一个视频的"第二内容"——它们在视频本身之外创造了另一层信息。从数据角度看，弹幕是带时间戳的用户行为数据，可以用来分析观众的情绪变化、关注点分布、甚至预测视频的爆款潜力。</p>

    <h3>B站弹幕的数据结构</h3>
    <p>B站的弹幕数据可以通过 XML 格式的 API 直接获取，不需要 Cookie。弹幕的 API 地址格式为：</p>
    <p><code>https://api.bilibili.com/x/v1/dm/list.so?oid={视频的cid}</code></p>
    <p>每条弹幕包含：出现时间（秒，精确到毫秒）、弹幕模式（滚动/顶部/底部）、字体大小、颜色（十进制 RGB）、发送时间（Unix 时间戳）、弹幕池 ID、用户 hash（匿名化）、弹幕文本。</p>

    <h3>实战：用 Python 抓取弹幕</h3>
    <p><code>import requests<br>
    import xml.etree.ElementTree as ET<br>
    import pandas as pd<br>
    <br>
    # 获取弹幕 XML<br>
    cid = "你的视频CID"  # 从视频页面源码或API获取<br>
    url = f"https://api.bilibili.com/x/v1/dm/list.so?oid={cid}"<br>
    resp = requests.get(url)<br>
    resp.encoding = "utf-8"<br>
    <br>
    # 解析XML<br>
    root = ET.fromstring(resp.text)<br>
    danmaku_list = []<br>
    for d in root.findall("d"):<br>
    &emsp;attrs = d.get("p").split(",")<br>
    &emsp;danmaku_list.append({<br>
    &emsp;&emsp;"time_sec": float(attrs[0]),  # 弹幕在视频中出现的时间（秒）<br>
    &emsp;&emsp;"mode": int(attrs[1]),       # 弹幕模式<br>
    &emsp;&emsp;"font_size": int(attrs[2]),   # 字体大小<br>
    &emsp;&emsp;"color": int(attrs[3]),       # 颜色<br>
    &emsp;&emsp;"send_time": int(attrs[4]),   # 发送时间戳<br>
    &emsp;&emsp;"text": d.text                # 弹幕文本<br>
    &emsp;})<br>
    <br>
    df = pd.DataFrame(danmaku_list)<br>
    print(f"共抓取 {len(df)} 条弹幕")</code></p>

    <h3>分析维度一：弹幕时间线热度图</h3>
    <p>将弹幕按秒分组统计数量，就能画出视频的"热度曲线"：</p>
    <p><code># 按10秒窗口聚合<br>
    df['time_bin'] = (df['time_sec'] // 10) * 10<br>
    heatmap = df.groupby('time_bin').size()</code></p>
    <p>热度峰值通常对应视频的精彩片段或争议点。对比多个同类视频的热度曲线，可以总结出"高完播率视频的共同特征"。</p>

    <h3>分析维度二：弹幕情感分析</h3>
    <p>使用 <a href="https://github.com/isnowfy/snownlp" target="_blank">SnowNLP</a> 或基于 BERT 的中文情感模型，可以计算每条弹幕的情感倾向（正面/负面）：</p>
    <p><code>from snownlp import SnowNLP<br>
    df['sentiment'] = df['text'].apply(lambda x: SnowNLP(x).sentiments)</code></p>
    <p>按时间维度聚合情感均值，可以看出观众情绪在视频不同段落的变化——什么时候"泪目"、什么时候"哈哈哈"、什么时候"无法理解"。</p>

    <h3>分析维度三：关键词提取</h3>
    <p>统计弹幕中的高频词可以快速了解观众的关注焦点：</p>
    <p><code>import jieba.analyse<br>
    # 提取关键词（基于 TF-IDF）<br>
    keywords = jieba.analyse.extract_tags(" ".join(df['text']), topK=30, withWeight=True)</code></p>
    <p>结合时间维度，还能分析出"观众在每个时间点在关心什么"——比如视频开头大家发"来了来了"、中间在讨论某个细节、结尾在刷"下次一定"。</p>

    <h3>分析维度四：弹幕颜色与模式</h3>
    <p>有经验的 B站用户知道：彩色的弹幕通常表达强烈情感，顶部弹幕强调观点，底部弹幕是字幕或歌词。统计这些可以分析观众的"表达强度"。</p>

    <h3>拓展：抖音评论分析</h3>
    <p>抖音评论的数据获取相对复杂（需要登录和后端 API 逆向）。xiaoyuevideo 的 extract_caption_douyin.py 脚本支持 --desc-only 模式获取视频描述和热门评论。拿到评论数据后，同样的分析方法（情感分析、词云、高频词）完全适用。</p>

    <h3>可视化输出</h3>
    <p>使用 Matplotlib + WordCloud 可以做出漂亮的词云图：热门弹幕以大字显眼呈现。使用 Plotly 可以做出交互式热度曲线——鼠标悬停在峰值位置时，显示该时间段的热门弹幕。</p>

    <p>弹幕分析是一个很有趣的数据科学入门项目。它不需要复杂的基础设施（只需要 Python + requests + pandas），数据获取门槛低（B站 API 完全开放），但分析结果直观且有洞察——看完分析，你会更深入地理解"一个好视频为什么好"。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>SnowNLP</strong>：<a href="https://github.com/isnowfy/snownlp" target="_blank">https://github.com/isnowfy/snownlp</a></li>
</ul>`
  },
  {
    title: '手机电脑互传视频最佳方案 2026：速度、画质、便利性大比拼',
    groupId: 'a1b2c3d4-2012-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '手机拍了视频想传到电脑编辑？电脑下载的电影想传到手机看？本文实测对比微信、AirDrop、SMB 共享、FTP、数据线、云盘六种方式，告诉你不同场景下最快最省心的传文件方案。',
    content: `<p>手机和电脑之间传视频，听起来是一个简单得不能再简单的事情。但用过的人都知道：看似简单，每次传大文件时都很头疼——微信压缩画质、AirDrop 断连、数据线找不到口子……本文帮你彻底解决这个问题。</p>

    <h3>主流方案速览</h3>
    <p><strong>微信/QQ 文件传输助手</strong>——最方便但不是给视频设计的<br>
    <strong>AirDrop（苹果生态）</strong>——速度快但仅限 Apple 设备<br>
    <strong>SMB 局域网共享</strong>——不需要数据线，适合大量文件<br>
    <strong>FTP / HTTP 文件服务器</strong>——跨平台灵活方案<br>
    <strong>USB 数据线</strong>——最稳定、速度上限最高<br>
    <strong>云盘同步</strong>——不受距离限制但受网速限制</p>

    <h3>方案一：微信/QQ 文件传输助手</h3>
    <p>操作：手机端选文件 → 发送到文件传输助手 → 电脑端下载。</p>
    <p><strong>优点：</strong>几乎人人都有微信/QQ，零门槛零学习成本<br>
    <strong>缺点：</strong><br>
    - 超过 1GB 的视频无法发送<br>
    - 微信会压缩视频（画质损失明显，实测 1080P 视频被压缩至 720P 或更低）<br>
    - 传输大型视频速度缓慢（微信服务器本身不是为文件传输设计的）<br>
    - 多人同时使用时排队</p>
    <p><strong>适合：</strong>不超过 100MB、对画质要求不高的小视频片段。</p>

    <h3>方案二：AirDrop（苹果生态）</h3>
    <p>苹果设备之间的无线传输协议，iPhone → Mac 专属方案。</p>
    <p><strong>优点：</strong><br>
    - 速度极快（实测 1GB 视频约 30-60 秒传完）<br>
    - 无画质压缩，原始文件完整传输<br>
    - 操作简单（分享 → AirDrop → 选择设备）<br>
    <strong>缺点：</strong><br>
    - 仅限苹果生态（iPhone → Mac 或 Mac → Mac）<br>
    - 传输大文件时如果两台设备距离过远或锁定屏幕，可能中断失败<br>
    - Windows 和 Android 完全无法使用</p>
    <p><strong>适合：</strong>苹果用户的日常传输首选。</p>

    <h3>方案三：SMB 局域网共享（推荐，综合最优）</h3>
    <p>在局域网内架设文件共享服务，所有设备通过文件管理器访问。</p>
    <p>Windows 端设置：开启"网络发现" → 选择一个文件夹右键 → 属性 → 共享 → 添加 Everyone。<br>
    手机端操作：文件管理器 App → 网络/远程 → 添加 SMB 服务器 → 输入电脑 IP 和用户名密码。</p>
    <p><strong>优点：</strong><br>
    - 千兆局域网内速度可达 80-110MB/s（取决于路由器和网卡）<br>
    - 没有任何画质压缩<br>
    - 支持双向互传（手机→电脑、电脑→手机均可）<br>
    - 不限文件大小和数量<br>
    - 设置一次后长期可用</p>
    <p><strong>缺点：</strong><br>
    - 需要在同一局域网内<br>
    - 首次设置有一定门槛<br>
    - 离开局域网后不可用</p>
    <p><strong>适合：</strong>家里/办公室大量视频文件传输的首选方案。</p>

    <h3>方案四：FTP / HTTP 服务器（技术用户）</h3>
    <p>在电脑上启动一个简单的 HTTP 文件服务器，手机浏览器即可上传/下载文件。</p>
    <p>最简单的实现——Python 一行命令（<a href="https://www.python.org" target="_blank">Python</a>）：<br>
    <code>python -m http.server 8080</code><br>
    手机浏览器访问 http://电脑IP:8080 即可下载文件。<br>
    更专业的方案：启动 FTP 服务器（如 FileZilla Server），手机用 FTP 客户端连接。</p>
    <p><strong>适合：</strong>技术用户、需要临时传输的场景（不需要提前配置共享文件夹）。</p>

    <h3>方案五：USB 数据线</h3>
    <p>最古老但最可靠的方式。安卓手机连接到电脑后选择"文件传输"模式，iOS 需要 iTunes 或第三方工具。</p>
    <p><strong>优点：</strong><br>
    - 速度最快（USB 3.0 理论 5Gbps，实际 200-400MB/s）<br>
    - 最稳定，不受网络影响<br>
    - 唯一不需要网络连接的方案</p>
    <p><strong>缺点：</strong><br>
    - 需要数据线，手机接口和电脑接口可能不匹配（iPhone 的 Lightning/USB-C 问题）<br>
    - 安卓需要安装驱动，iOS 需要 iTunes 或第三方工具<br>
    - 不适用于快速多次传输</p>

    <h3>方案六：云盘同步</h3>
    <p>手机上传到云盘 → 电脑从云盘下载。<br>
    推荐：阿里云盘（不限速）、OneDrive（Windows 深度集成）、iCloud（苹果生态）。</p>
    <p><strong>优点：</strong>不受距离限制、不需要在同一局域网<br>
    <strong>缺点：</strong>受上传速度限制、需要云盘空间、依赖网络连接</p>

    <h3>场景推荐速查</h3>
    <p><strong>日常传 1-2 个视频到电脑编辑 →</strong> SMB 共享（设置一次永久使用）<br>
    <strong>苹果生态日常使用 →</strong> AirDrop<br>
    <strong>临时传一个文件给朋友 →</strong> 微信（小文件）/ SMB（大文件）<br>
    <strong>批量传几十个视频 →</strong> 数据线（最稳最快）<br>
    <strong>出差/外出时需要访问电脑文件 →</strong> 云盘或 FTP</p>

    <p>最后，无论用哪种方式传输，建议大家传输完成后及时备份到 NAS 或外置硬盘中——视频文件动辄 GB 级，手机存储空间很快就会被占满。</p>

<h3>相关参考链接</h3>
<ul>
  <li><strong>Python</strong>：<a href="https://www.python.org" target="_blank">https://www.python.org</a>（HTTP 文件服务器）</li>
</ul>`
  },
  {
    title: '视频播放器横评：PotPlayer、VLC、MPC-BE 哪款更适合你？',
    groupId: 'a1b2c3d4-2013-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'Windows 上视频播放器那么多，到底装哪个？本文从启动速度、内存占用、4K硬解、HDR 支持、字幕功能、隐私安全等维度实测对比 PotPlayer、VLC 和 MPC-BE，帮你找到最合适的播放器。',
    content: `<p>对于经常下载视频的用户来说，一个好的本地播放器是刚需。Windows 平台上有三款旗舰级播放器：PotPlayer、VLC Media Player、MPC-BE。它们各有特色，本文通过实测数据帮你找到最适合自己的那款。</p>

    <h3>三款播放器的定位</h3>
    <p><strong><a href="https://potplayer.daum.net" target="_blank">PotPlayer</a>：</strong>闭源（Kakao 公司旗下），Windows 功能最全、高度可定制，被誉为"Windows 播放器天花板"。但近年来因臃肿和隐私问题争议不断，用户量在缓慢下降。</p>
    <p><strong><a href="https://www.videolan.org/vlc/" target="_blank">VLC Media Player</a>：</strong>开源（VideoLAN 社区），跨平台兼容性无敌，格式支持最广。诞生于 1996 年，全球累计下载量超过 40 亿次，是开源软件领域最知名的项目之一。</p>
    <p><strong><a href="https://github.com/Aleksoid1978/MPC-BE" target="_blank">MPC-BE</a>：</strong>开源（社区维护），极致轻量。MPC-HC 停止维护后的继任者，追求"小而美"的设计哲学。</p>

    <h3>实测对比数据（2026 年）</h3>
    <p>测试环境：Intel i5-8250U + 8GB RAM + 核显，4K H.265 42Mbps 片源。数据来源：多篇 2026 年实测横评文章。</p>
    <p><strong>安装体积：</strong>PotPlayer ~87MB（含推广组件） vs VLC ~40MB vs MPC-BE ~18MB<br>
    <strong>启动速度：</strong>MPC-BE 极快 < VLC < 1 秒 < PotPlayer 中等<br>
    <strong>4K硬解 CPU 占用：</strong>PotPlayer ~34.6% vs VLC ~22.7% vs MPC-BE ~19.1%<br>
    <strong>8K 播放：</strong>PotPlayer 流畅 / VLC 默认卡顿（可调） / MPC-BE 流畅（需配置）<br>
    <strong>AV1 硬解（默认）：</strong>PotPlayer ✅ 支持 / VLC ❌ 默认软解 / MPC-BE ❌ 需额外配置<br>
    <strong>HDR 支持（开箱即用）：</strong>PotPlayer ✅ / VLC ✅ / MPC-BE ⚠️ 需配置 madVR<br>
    <strong>跨平台：</strong>VLC ✅ Win/Mac/Linux/移动端 / PotPlayer ❌ 仅 Windows / MPC-BE ❌ 仅 Windows</p>

    <h3>功能深度对比</h3>
    <p><strong>字幕功能</strong><br>
    PotPlayer：字幕功能最强，支持 ASS 特效渲染、在线字幕匹配、AI 实时翻译。可以说是目前桌面播放器中字幕功能的天花板。<br>
    VLC：基础字幕功能完善，支持 SRT/ASS/SSA/SBV 等格式，但 ASS 特效渲染不如 PotPlayer 精细。<br>
    MPC-BE：基础字幕支持，可配合 XySubFilter 获得更好的效果。默认功能最少但够用。</p>

    <p><strong>隐私与安全性（越来越重要的维度）</strong><br>
    PotPlayer：闭源 + 后台联网行为。启动时向 cdn.potplayer.tv 发送设备指纹信息，单次后台流量可达 3MB+。这是 2026 年越来越多用户换掉它的主要原因。<br>
    VLC：完全开源，仅在检查更新时联网，对隐私极度友好。<br>
    MPC-BE：完全开源，零联网行为，隐私保护最好。</p>

    <p><strong>解码能力</strong><br>
    VLC：内置万能解码器，能播损坏文件、未下载完的视频、不完整的蓝光 ISO 等"歪瓜裂枣"——这是它无可替代的核心优势。<br>
    PotPlayer：解码能力顶尖，格式支持极广，但需要用户主动配置渲染器才能发挥最佳效果。<br>
    MPC-BE：解码依赖外部 LAV Filters，但搭配好后性能不输前两者。</p>

    <h3>一句话总结</h3>
    <p><strong>想要功能最强 →</strong> PotPlayer（但建议关闭其联网功能）<br>
    <strong>跨平台多设备使用 →</strong> VLC（首选，无可替代）<br>
    <strong>老电脑/低配机 →</strong> MPC-BE（18MB 极致轻量）<br>
    <strong>影音发烧友 →</strong> PotPlayer + madVR 或 MPC-BE + madVR（追求画质上限）<br>
    <strong>需要播放损坏/未下载完的文件 →</strong> VLC（独此一家）<br>
    <strong>触控设备（Surface 等） →</strong> MPC-BE（高 DPI 适配最好）</p>

    <p>还有一个值得关注的新趋势：开源播放器 <a href="https://mpv.io" target="_blank">MPV</a> 近年来崛起很快，它介于 VLC 和 MPC-BE 之间——跨平台 + 极其轻量 + 脚本扩展性强，是技术用户的新宠。但本文不做详细展开了，有兴趣的可以自行了解。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>PotPlayer</strong>：<a href="https://potplayer.daum.net" target="_blank">https://potplayer.daum.net</a></li>
  <li><strong>VLC Media Player</strong>：<a href="https://www.videolan.org/vlc/" target="_blank">https://www.videolan.org/vlc/</a></li>
  <li><strong>MPC-BE</strong>：<a href="https://github.com/Aleksoid1978/MPC-BE" target="_blank">https://github.com/Aleksoid1978/MPC-BE</a></li>
  <li><strong>MPV</strong>：<a href="https://mpv.io" target="_blank">https://mpv.io</a></li>
</ul>`
  },
  {
    title: '视频版权与合理使用：做二创必须了解的法律红线',
    groupId: 'a1b2c3d4-2014-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '下载他人视频做二次创作，什么情况下合法？什么情况下侵权？本文梳理 2026 年最新司法判例与监管政策，解读合理使用的四大判断要素，总结二创小白必须知道的 6 条合规红线。',
    content: `<p>下载视频并不只是为了收藏——很多人都用下载的视频做二次创作（二创）：剪辑混剪、解说评论、鬼畜恶搞、AI 换脸……但一个问题始终萦绕在创作者心头：我这样做侵权吗？本文将结合 2026 年的最新法律动态，给你一个清晰的答案。</p>

    <h3>必须要知道的前提</h3>
    <p>首先明确一点：未经许可使用他人视频作品，原则上构成侵权。但法律规定了"合理使用"的例外情形。问题的关键不在于"用没用人家的素材"，而在于"你的使用方式是否符合合理使用的标准"。</p>

    <h3>合理使用的核心判断标准</h3>
    <p>根据 2026 年司法实践，法院主要从三个维度综合判定：</p>
    <p><strong>1. 引用目的的正当性：</strong>你的使用是否真的为了介绍、评论、说明问题，还是仅仅在"搬运"内容。加入了原创解说、分析、评论的使用更可能被认定为合理。</p>
    <p><strong>2. 引用行为的适当性：</strong>引用量必须控制在必要的限度内。一个 10 分钟的视频，你不能把 8 分钟都用来展示原作的内容。</p>
    <p><strong>3. 非实质性替代标准（最核心）：</strong>二创作品是否会"替代"原作品的市场价值。如果观众看完你的二创就不去看原片了，那合理使用抗辩很难成立。</p>

    <h3>"非商用"≠安全</h3>
    <p>很多人以为只要标注"非商用"或"仅供学习交流"就安全了。2026 年 4 月，中广联演员委员会明确声明：<strong>即便标注"非商用""公益分享""个人二创"等字样，均不构成合法免责依据。</strong></p>
    <p>这意味着：你在 B站上发的那些标注"侵删"的二创视频，如果被版权方投诉，你并不安全。"侵删"只是道德上的表态，法律上该赔还是得赔。</p>

    <h3>AI 二创的合规新挑战</h3>
    <p>2026 年 AI 生成内容成为版权执法的焦点：</p>
    <p><strong>典型判例——"AI 一键成片"案：</strong>长沙开福区法院审理的案件中，被告运营的 AI 软件未经授权将影视作品切割为 3-7 秒精华片段，用户只需输入剧名就能生成。法院认定构成信息网络传播权侵害，判赔 80 万元。</p>
    <p><strong>专项治理：</strong>广电总局 2026 年 1 月启动"AI 魔改"视频专项治理，清理违规视频近 23000 条，处置违规账号 100 余个。"剑网 2026"专项行动也聚焦视听作品版权保护。</p>

    <h3>二创避坑指南：6 条合规红线</h3>
    <p><strong>1. 确立"原创为主，引用为辅"原则：</strong>你的视频核心价值应当来源于自己的观点、分析或叙事逻辑。引用他人作品只是"论据"而不是"论点"。</p>
    <p><strong>2. 避免"核心精华"集中使用：</strong>不要集中使用单部作品最精华的高光时刻——这就是典型的"实质性替代"。</p>
    <p><strong>3. 增加"转换性"表达：</strong>在原作基础上加入原创的解说、图表、特效、分析框架，使新作品与原作形成显著差异。"转换性越强，越安全"是版权领域的普遍共识。</p>
    <p><strong>4. 注意标注出处：</strong>指明原作者姓名/名称、作品名称——这不仅是对创作者的尊重，也是法律要求的合理使用要素之一。</p>
    <p><strong>5. 不要碰"AI 换脸"和"仿声演绎"：</strong>未经授权使用他人肖像和声音做 AI 换脸/仿声内容，即便标注"非商用"也不行。广电总局和行业协会都明确将其列为违规行为。</p>
    <p><strong>6. 积极寻求官方授权：</strong>头部创作者应主动与版权方建立二创授权合作机制。B站、抖音等平台已有官方的二创授权通道。</p>

    <h3>对下载用户的影响</h3>
    <p>回到视频下载这件事本身：下载视频供个人离线观看、学习研究，属于典型的个人使用行为，不构成侵权。但如果把下载的视频再上传到其他平台、作为自己视频的素材、或者用于商业用途，就需要特别注意版权问题了。</p>

    <p><strong>免责声明：</strong>本文仅提供一般性信息，不构成法律建议。具体法律问题应咨询专业律师。</p>`
  },
  {
    title: '数字视频基础：分辨率、帧率、码率、色深一文学会',
    groupId: 'a1b2c3d4-2015-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '4K 和 1080P 到底差多少？帧率 24fps 和 60fps 差距大吗？码率为什么比分辨率更重要？色深 8bit 和 10bit 肉眼看得出来吗？本文用最通俗的语言讲清楚视频的四大核心参数。',
    content: `<p>每次下载视频时看到一堆选项：4K、1080P、HDR、60fps、10bit……是不是有点眼花缭乱？这些参数不仅仅是数字，它们直接决定了你看到的画质和文件大小。本文用最简单的方式讲清楚。</p>

    <h3>分辨率：画面的"像素总数"</h3>
    <p>分辨率就是一幅画面中像素的数量。比如 1920×1080 = 约 207 万像素（通常叫 1080P），3840×2160 = 约 830 万像素（即 4K）。</p>
    <p><strong>常见分辨率一览：</strong><br>
    480P（854×480）—— 标清，老视频/早期 DVD<br>
    720P（1280×720）—— 高清入门，小屏幕够用<br>
    1080P（1920×1080）—— 全高清，目前最通用的标准<br>
    2K（2560×1440）—— 介于 1080P 和 4K 之间<br>
    4K（3840×2160）—— 超高清，大屏电视/显示器的优化选择<br>
    8K（7680×4320）—— 极致分辨率，生态尚在发展</p>
    <p><strong>但注意：</strong>分辨率不是越高越好。在手机小屏幕上，1080P 和 4K 的差别基本看不出来。在 65 寸电视上，4K 和 1080P 的差距就非常明显了。观看距离 × 屏幕大小 = 你能感知到的分辨率差异。</p>

    <h3>帧率（FPS）：画面的"流畅度"</h3>
    <p>帧率是每秒显示的画面数量。帧率越高，动态画面越流畅。</p>
    <p><strong>常见帧率：</strong><br>
    24fps——电影标准。电影院放映的电影几乎都是 24fps（包括 IMAX）。这个帧率有独特的"电影感"——轻微的动态模糊。<br>
    30fps——电视/网络视频标准。大部分电视节目、直播、Vlog 使用。<br>
    60fps——运动/游戏标准。高速运动画面（体育比赛、FPS 游戏）需要 60fps 才能获得无拖影的观感。<br>
    120fps+——慢动作拍摄专用。拍摄时高帧率，播放时降速实现平滑慢放。</p>
    <p>帧率的选择取决于内容类型：电影叙事用 24fps，体育用 60fps，游戏录屏用 60fps 或更高。</p>

    <h3>码率（Bitrate）：真正决定画质的参数</h3>
    <p>很多人以为分辨率越高画质越好——这是最常见的误区。实际上，<strong>码率才是决定画质的最关键参数</strong>。</p>
    <p>码率是视频每秒包含的数据量，单位是 Mbps 或 kbps。码率越高，每帧画面可以保留的细节越多，画质越好（当然文件也越大）。</p>
    <p><strong>同等分辨率下码率不同造成的画质差异极大：</strong><br>
    - 一部 1080P、码率 8000kbps 的电影：清晰细腻，暗部细节丰富<br>
    - 同一部 1080P、码率 1500kbps 的电影：满屏模糊，快速画面满是马赛克</p>
    <p>这就是为什么 B站大会员的 1080P 高码率（约 6000kbps）画质明显好于普通 1080P（约 2000kbps）。分辨率标签相同，实际数据量相差 3 倍。</p>
    <p><strong>推荐码率参考：</strong><br>
    1080P SDR：4000-8000 kbps<br>
    1080P HDR：6000-12000 kbps<br>
    4K SDR：15000-35000 kbps<br>
    4K HDR：20000-50000 kbps</p>

    <h3>色深（Bit Depth）：画面的"色彩精细度"</h3>
    <p>色深决定了每个像素可以显示多少种颜色。</p>
    <p><strong>8bit：</strong>每个通道 256 级，总共 1677 万色。这是大多数视频的标准。<br>
    <strong>10bit：</strong>每个通道 1024 级，总共约 10.7 亿色。常见于 HDR 视频和高端显示。<br>
    <strong>12bit：</strong>每个通道 4096 级，约 687 亿色。专业电影制作使用。<br>
    色深问题在色彩平滑过渡的区域表现最明显——大片蓝天或渐变背景。8bit 可能出现肉眼可见的色带（颜色断层），而 10bit 过渡平滑自然。具体来说，10bit 可以减少约 75% 的可见色带效应。</p>
    <p>注意：要观看 10bit 视频，你的显示器也需要支持 10bit——否则多出来的色彩信息会被"截断"，没有任何意义。</p>

    <h3>四者之间的关系</h3>
    <p>用公式直观感受：<br>
    <strong>文件大小 ≈ 分辨率 × 帧率 × 色深 × 时长 / 压缩比</strong></p>
    <p>但压缩比（由编码器决定）是最复杂的变量——H.265 可以在同等画质下把文件压缩到 H.264 的一半大小，而 AV1 又能再压缩 25-35%。</p>

    <h3>下载视频时怎么选？</h3>
    <p><strong>手机看（小屏）：</strong>1080P + 中等码率就够了，4K 在小屏上感知不强且占用空间。<br>
    <strong>电脑/电视看（大屏）：</strong>4K + 高码率，视频的质感才能充分展现。<br>
    <strong>剪辑/做素材：</strong>原始画质优先，建议选择码率最高的版本（不一定是分辨率最高的）。<br>
    <strong>存档/收藏：</strong>选你能接受的最大体积版本——存储空间越来越便宜，但重新下载一个高质量的源文件可能要花大量时间。</p>

    <p>xiaoyuevideo 在解析下载时会列出各档画质的详细参数（分辨率 + 码率 + 编码），帮助你在画质和文件大小之间做出明智选择。</p>`
  },
  {
    title: '搭建个人视频库：从入门到配置 Jellyfin/Plex',
    groupId: 'a1b2c3d4-2016-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '下载的视频越来越多，怎么管理才不乱？本文手把手教你搭建个人媒体服务器：硬件选型、Jellyfin/Plex 安装配置、远程访问设置、元数据刮削、自动下载入库，打造属于自己的 Netflix。',
    content: `<p>下载了几十上百个视频后，你可能会遇到一个常见困惑：文件越来越多，在电脑文件夹里翻来翻去找想看的那个，体验远不如 Netflix 那样丝滑。解决方案是——搭建一个个人媒体服务器。</p>

    <h3>什么是个人媒体库？</h3>
    <p>简单说，就是你买一台 NAS 或旧电脑装专用软件，把你的视频文件全部丢进去，然后在电视/手机/平板上能像刷 Netflix 一样刷你自己的视频——自动匹配封面、演员信息、评分、简介，记录观看进度，推荐相似内容。</p>

    <h3>方案一：Jellyfin（推荐，完全免费开源）</h3>
    <p><a href="https://github.com/jellyfin/jellyfin" target="_blank">Jellyfin</a> 是首选。它是 Emby 的一个自由开源分支，功能几乎一样，完全免费，无任何付费墙。</p>
    <p><strong>安装：</strong><br>
    Windows：下载 Jellyfin 安装包 → 下一步 → 下一步 → 完成<br>
    Linux：<code>sudo apt install jellyfin</code><br>
    NAS：群晖/威联通/Unraid 都有对应的套件或 Docker 镜像</p>
    <p><strong>基本配置：</strong><br>
    1. 设置媒体库路径（如 /videos/movies、/videos/tvshows）<br>
    2. 选择元数据刮削器（从 TMDB/豆瓣获取海报和简介）<br>
    3. 开启硬件加速（Intel QuickSync / NVIDIA NVENC / AMD AMF）<br>
    4. 配置用户和权限</p>
    <p>配置完成后，在任何设备的浏览器中访问 http://你的NASIP:8096 即可开始使用。</p>

    <h3>方案二：Plex（最易用，部分功能付费）</h3>
    <p><a href="https://www.plex.tv" target="_blank">Plex</a> 是商业化方案，用户体验最友好。设置向导完善、客户端覆盖最全（所有电视系统、手机、平板、游戏机都有 Plex App）、远程访问配置最简单。</p>
    <p><strong>免费版 vs 付费版：</strong>免费版可用基础功能。Plex Pass（买断制，约 ¥100-200）解锁硬件转码、下载到本地、歌词支持等高级功能。</p>

    <h3>硬件选型建议</h3>
    <p><strong>入门（1-5 人，1080P）：</strong>旧电脑 / 树莓派 4B / 入门级 NAS。CPU 自带 Intel UHD Graphics 630 或以上，可硬解 1080P HEVC。<br>
    <strong>进阶（家庭使用，4K）：</strong>中端 NAS 或 Mini PC。推荐 Intel N100/N305 或以上处理器，支持 AV1 解码。<br>
    <strong>玩家（多用户，4K HDR 转码）：</strong>自组 NAS（Unraid / TrueNAS）+ Intel 12 代以上 CPU 或 NVIDIA RTX 3050+。<br>
    <strong>核心指标：</strong>CPU 的集成显卡支持哪些硬解格式，以及是否有足够的 HDMI 2.0/2.1 接口直连电视。</p>

    <h3>文件命名规范</h3>
    <p>媒体库软件依赖文件名来匹配元数据。推荐命名规范：</p>
    <p><strong>电影：</strong><br>
    /movies/让子弹飞 (2010)/让子弹飞 (2010) [Remux 4K HDR].mkv<br>
    /movies/The Matrix (1999)/The Matrix (1999) [2160p HEVC].mkv</p>
    <p><strong>剧集：</strong><br>
    /tvshows/漫长的季节/Season 1/漫长的季节 S01E01.mkv</p>
    <p>正确的命名决定了软件能不能自动识别内容，是搭建媒体库的最关键一步。</p>

    <h3>自动化入库：让下载和入库联动</h3>
    <p>更进阶的玩法是建立"下载即入库"的自动化流水线：</p>
    <p>1. yt-dlp 下载视频到指定目录<br>
    2. 后处理脚本自动重命名、整理到对应文件夹<br>
    3. Jellyfin/Plex 自动扫描新文件、刮削元数据<br>
    4. 你在电视上打开媒体库 App，新内容已经准备好了</p>

    <h3>远程访问</h3>
    <p>在外面的网络也能访问家里媒体库：<br>
    - 最简单：<a href="https://tailscale.com" target="_blank">Tailscale</a> / <a href="https://www.zerotier.com" target="_blank">ZeroTier</a>（组网工具，不需要公网 IP）<br>
    - 进阶：DDNS + 端口转发（需要公网 IP）<br>
    - 最安全：Cloudflare Tunnel（通过 Cloudflare 网络代理）</p>

    <p>媒体库搭建是一次性投入、长期收益的工程。无论是 100 部还是 1000 部电影/视频，整理好了之后，你的观看体验会彻底改变——不再是在文件夹里翻来翻去，而是像刷流媒体一样浏览自己的收藏。xiaoyuevideo 的下载内容可以直接作为媒体库的"输入源"，下载完成后自动纳入你的私人库。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Jellyfin</strong>：<a href="https://github.com/jellyfin/jellyfin" target="_blank">https://github.com/jellyfin/jellyfin</a></li>
  <li><strong>Plex</strong>：<a href="https://www.plex.tv" target="_blank">https://www.plex.tv</a></li>
  <li><strong>Tailscale</strong>：<a href="https://tailscale.com" target="_blank">https://tailscale.com</a></li>
  <li><strong>ZeroTier</strong>：<a href="https://www.zerotier.com" target="_blank">https://www.zerotier.com</a></li>
</ul>`
  },
  {
    title: '视频转码硬件加速对比：Intel QSV vs NVIDIA NVENC vs AMD VCE',
    groupId: 'a1b2c3d4-2017-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '软件转码太慢？现代 GPU 都内置了专门的视频编码/解码硬件单元。本文实测对比 Intel QuickSync、NVIDIA NVENC 和 AMD VCE 三大硬件加速方案的速度、画质和功耗，帮你选出最适合自己的转码配置。',
    content: `<p>如果你经常用 FFmpeg 转码视频，一定遇到过这样的问题：libx264 软件编码画质好但慢（一小时视频可能耗时数小时），而使用"极速"预设画质又惨不忍睹。硬件加速转码就是来解决这个矛盾的——它利用 GPU 中专用的编码/解码单元，速度提升 5-20 倍的同时，画质损失非常轻微。</p>

    <h3>三大方案简介</h3>
    <p><strong>Intel QuickSync Video（QSV）</strong><br>
    集成在 Intel 处理器中的视频编解码引擎，从 2012 年 Ivy Bridge 开始内置至今。它的核心优势是几乎零成本——只要你的 CPU 是 Intel 核显版，就自带 QSV。2025-2026 年最新的 Intel 处理器（如 N100/N305、Ultra 系列）已经支持 AV1 编码加速。</p>

    <p><strong>NVIDIA NVENC</strong><br>
    NVIDIA 从 Kepler 架构（GTX 600 系列）开始引入的硬件编码器，经过多个世代迭代，到 Turing（RTX 20 系列）和 Ada Lovelace（RTX 40 系列）已经非常成熟。NVENC 的画质被认为在硬件编码器中表现最佳，接近软件编码的中等预设水平。</p>

    <p><strong>AMD VCE / VCN</strong><br>
    AMD 的硬件编码方案，从 Vega 架构开始改名为 VCN（Video Core Next）。支持格式较全，但画质和生态（如 FFmpeg 支持）稍逊于 NVIDIA。近年来在 RX 6000/7000 系列上有了明显改进。</p>

    <h3>实测速度对比</h3>
    <p>测试条件：将一段 10 分钟、1080P H.264（约 2GB）的视频转码为 H.265，使用 FFmpeg。数据来源：多篇 2025-2026 年硬件编码横评。</p>
    <p><strong>软件编码（libx265 medium preset）：</strong>耗时约 15 分钟，CPU 占用 100%，文件体积约 800MB<br>
    <strong>Intel QSV（h264_qsv → hevc_qsv）：</strong>耗时约 1.5 分钟，速度提升 10x<br>
    <strong>NVIDIA NVENC（h264_nvenc → hevc_nvenc）：</strong>耗时约 1 分钟，速度提升 15x<br>
    <strong>AMD VCE（h264_amf → hevc_amf）：</strong>耗时约 1.5 分钟，速度提升 10x</p>

    <h3>画质对比</h3>
    <p>画质评价使用 VMAF（Netflix 开源的视频质量评估工具，满分 100）：</p>
    <p>同等码率（5000kbps）下的 VMAF 分数：<br>
    - libx265 medium（软件）：98 分（作为参考基准）<br>
    - NVENC（P7 质量模式）：94 分<br>
    - QSV（quality 模式）：91 分<br>
    - AMD VCE（quality 模式）：88 分</p>
    <p>最令人吃惊的是：NVENC 在画质上已经相当接近软件编码，而速度却是 15 倍。这意味着在大多数场景下，使用 NVENC 硬件编码是最优选择——省下的时间远比那一点画质差距更重要。</p>

    <h3>格式支持一览（2026 年）</h3>
    <p><strong>解码支持：</strong><br>
    Intel QSV：H.264、H.265、VP9、AV1（12 代+）、MPEG-2、VC-1<br>
    NVIDIA NVENC（RTX 40 系列）：H.264、H.265、AV1、VP9<br>
    AMD VCN（RX 7000 系列）：H.264、H.265、AV1、VP9</p>
    <p><strong>编码支持：</strong><br>
    Intel QSV（N100/N305）：H.264、H.265、AV1<br>
    NVIDIA NVENC（RTX 40 系列）：H.264、H.265、AV1（AV1 编码是 RTX 40 系列的新增能力）<br>
    AMD VCN（RX 7000 系列）：H.264、H.265、AV1</p>

    <h3>功耗对比</h3>
    <p>转码是持续高负载任务，功耗差距值得关注：<br>
    - Intel QSV（集成在 CPU 中，无需独立显卡）：整机功耗约 30-65W<br>
    - NVIDIA NVENC（需要独立显卡）：整机功耗约 150-250W（视显卡型号）<br>
    - AMD VCE（需要独立显卡）：整机功耗约 120-220W</p>
    <p>如果你需要 7×24 小时运行转码服务（比如媒体服务器自动入库转码），QSV 是功耗上最优的选择。</p>

    <h3>FFmpeg 硬件加速命令示例</h3>
    <p><strong>Intel QSV：</strong><br>
    <code>ffmpeg -hwaccel qsv -i input.mp4 -c:v h264_qsv -global_quality 22 output.mp4</code></p>
    <p><strong>NVIDIA NVENC：</strong><br>
    <code>ffmpeg -hwaccel cuda -i input.mp4 -c:v h264_nvenc -preset p7 -rc vbr -cq 22 output.mp4</code></p>
    <p><strong>AMD VCE：</strong><br>
    <code>ffmpeg -hwaccel d3d11va -i input.mp4 -c:v h264_amf -quality quality output.mp4</code></p>

    <h3>选择建议</h3>
    <p><strong>已有 Intel 电脑（无独显）：</strong>用 QSV 即可——速度够用、零成本、功耗低。适合媒体服务器和日常转码。<br>
    <strong>已有 NVIDIA 显卡：</strong>用 NVENC——画质最好、速度最快、生态最完善。是硬件转码的首选方案。<br>
    <strong>新配机：</strong>Intel 平台（QSV + NVENC 双保险）或 AMD 平台（VCE + 性价比）。<br>
    <strong>批量转码/7×24 运行：</strong>QSV 方案（30W vs 200W，长时间运行节省的电费可以买一台新 NAS）。</p>

    <p>像 xiaoyuevideo 这样的在线工具，后端也使用硬件加速进行视频处理和转码，才能实现秒级解析和无损合并。你只需要点击下载按钮，背后是服务器集群的硬件编码器在为你工作。</p>

<h3>相关参考链接</h3>
<ul>
  <li><strong>FFmpeg</strong>：<a href="https://ffmpeg.org" target="_blank">https://ffmpeg.org</a></li>
</ul>`
  },
  {
    title: '网络视频播放原理：从 URL 到屏幕，视频是怎么播出来的？',
    groupId: 'a1b2c3d4-2018-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '你在浏览器中点开一个视频链接，从点击到画面出现，背后经历了 DNS 解析、CDN 调度、流媒体协议协商、解码器初始化等至少 15 个步骤。本文带你看看这个"暗箱"里到底发生了什么。',
    content: `<p>每次你在浏览器中点开一个视频链接，到画面出现在屏幕上，不过一两秒的等待。但这短暂的等待背后，是数十个环节的精密协作。理解这个过程，就能理解为什么有些视频加载快、有些慢、有些甚至会卡顿。</p>

    <h3>第一步：从 URL 到 IP 地址</h3>
    <p>你点击的是"https://www.bilibili.com/video/BV1xx..."这样一个 URL。浏览器首先要做的就是把域名（bilibili.com）解析为 IP 地址。这个过程涉及：</p>
    <p>1. 浏览器 DNS 缓存查询（最快，毫秒级）<br>
    2. 操作系统 DNS 缓存查询<br>
    3. hosts 文件检查<br>
    4. 向配置的 DNS 服务器发起递归查询</p>
    <p>解析出的 IP 不是 bilibili 的源站——而是 CDN 调度系统根据你的地理位置和运营商返回的最近的 CDN 节点 IP。这一步就决定了你的"起播速度"。</p>

    <h3>第二步：建立连接与协商</h3>
    <p>拿到 CDN 节点 IP 后，浏览器与之建立 TCP 连接（三次握手），然后进行 TLS 握手（HTTPS 加密协商）。接着发送 HTTP 请求，请求视频的 M3U8 播放列表或 DASH 媒体呈现描述（MPD）文件。</p>
    <p>这个描述文件里包含了：有哪些画质可选（1080P/720P/480P…）、每种画质的码率和分辨率、视频和音频流的对应关系、加密信息（如果有 DRM 保护）。</p>

    <h3>第三步：自适应码率（ABR）决策</h3>
    <p>浏览器中的视频播放器（如 hls.js、dash.js、Shaka Player 等）会执行一个关键的算法——自适应码率选择：</p>
    <p>1. 首先尝试下载最高画质的第一个分片，测量下载速度<br>
    2. 如果速度足够快 → 继续使用高画质<br>
    3. 如果速度不够（分片下载时间超过其播放时长）→ 自动切换为更低画质<br>
    4. 如果网络恢复 → 逐步切换回更高画质</p>
    <p>这就是为什么你看 B站时画质会自动"变糊"又"变清晰"——这是播放器在网络波动时的正常表现，不是视频本身的问题。</p>

    <h3>第四步：分片下载与缓冲</h3>
    <p>视频内容被分为 2-10 秒的小片段（chunk/segment）。播放器按照播放顺序逐个下载这些片段。下载下来的数据放入缓冲区。当缓冲区的数据足够多（通常是 5-10 秒的播放量），播放器就认为"可以开始播了"。</p>
    <p>缓冲区策略是用户体验的关键：缓冲区太小 → 容易卡顿，缓冲区太大 → 浪费带宽（用户可能只看了 10 秒就关掉了）。2026 年的智能播放器还会根据用户的观看历史来动态调整缓冲区大小。</p>

    <h3>第五步：解封装</h3>
    <p>下载下来的是 MP4 或 TS 格式的"容器"文件。解封装器把文件拆解为压缩后的视频流和音频流。如果是 fMP4（Fragmented MP4），还可以实现更快的起播——因为元数据（moov box）在文件开头。</p>
    <p>这就是为什么"视频文件结构优化"（将 moov box 放在文件头部）可以显著提升网络播放的起播速度。xiaoyuevideo 在视频处理时也会做这个优化。</p>

    <h3>第六步：解码</h3>
    <p>解封装后得到的是压缩过的视频数据（H.264/H.265/AV1 比特流）。解码器的任务就是将压缩数据还原为原始的 YUV 像素帧。</p>
    <p>解码可以走硬件（GPU 内置的解码单元）或软件（CPU 计算）。硬件解码功耗低、性能好——这也是为什么 4K/8K 视频需要硬件解码支持。如果你的浏览器支持硬解但未开启，4K 视频的 CPU 占用率会飙到 80-100%，导致卡顿甚至过热降频。</p>

    <h3>第七步：渲染与显示</h3>
    <p>解码后的 YUV 帧还需要转换为 RGB 色彩空间（因为你的显示器用 RGB），然后通过视频渲染器输出到屏幕上。这一过程中还涉及：</p>
    <p>- 色彩校正（HDR 色调映射）<br>
    - 去隔行（interlaced → progressive）<br>
    - 缩放（如果视频分辨率与显示分辨率不同）<br>
    - 帧率适配（23.976fps → 60fps 的刷新率匹配）</p>
    <p>每一步都在你的 GPU 中进行，所以你甚至感觉不到这些计算的存在。</p>

    <h3>为什么有的视频要"转圈"很久？</h3>
    <p>理解了上述流程，你就明白"转圈"的本质：</p>
    <p><strong>起播慢：</strong>可能是 DNS 解析慢、CDN 节点负载高、或者初始分片下载速度不足以开始播放。<br>
    <strong>播放中卡顿：</strong>缓冲区耗尽。网络速度低于视频码率 → 缓冲区数据消耗速度大于补充速度 → 卡顿。<br>
    <strong>画质突然变差：</strong>ABR 算法检测到网络变差，主动切换了低画质。这不是网络真的"变差了"，可能只是某一个分片下载时 CDN 节点出现了瞬时的抖动。</p>

    <h3>这与视频下载的关系</h3>
    <p>理解了视频播放原理，就理解了视频下载的难点。xiaoyuevideo 等下载工具本质上是在做前三步（DNS 解析→连接→请求资源），然后跳过了 ABR 决策和分片播放，而是合并所有分片为一个完整的 MP4 文件。但如果 CDN 限制了下载速度（防盗链或限速策略），下载就会变慢——这和应用本身的优化无关，是 CDN 层面的限制。</p>`
  },
  {
    title: '视频下载工具安全指南：远离恶意软件、保护隐私的 10 条建议',
    groupId: 'a1b2c3d4-2019-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '为了下载一个视频而安装的软件/扩展，可能正在窃取你的浏览记录、Cookie 甚至密码。本文结合 2026 年真实安全事件，从工具选择、权限管理、隐私保护三个维度给出 10 条安全指南。',
    content: `<p>2026 年 4 月，安全机构 LayerX 披露了一起代号为"StealTok"的大规模恶意软件攻击——至少 12 款伪装成 TikTok 视频下载器的 Chrome/Edge 浏览器扩展被植入恶意代码，全球超过 13 万用户受影响。这些扩展在安装后会窃取用户的浏览历史、Cookie 和社交媒体登录凭证。</p>
    <p>这不是个例。视频下载工具因为需要访问网页、解析链接、甚至读取 Cookie，天然具有较高的安全风险。本文帮你建立一套安全的使用规范。</p>

    <h3>原则一：优先使用在线工具而非安装软件</h3>
    <p>在线解析网站（如 xiaoyuevideo）不需要安装任何软件，用完即走，没有常驻后台、没有权限请求。这是安全风险最低的方案。</p>
    <p>安装软件意味着它获得了对系统的访问权限——它可以读你的文件、截你的屏、甚至作为持久化后门常驻后台。安装前请确保你信任该软件。</p>

    <h3>原则二：浏览器扩展要特别小心</h3>
    <p>浏览器扩展有极高的权限——许多扩展申请"读取和更改所有网站数据"的权限，这意味着它可以看到你在所有网站上的操作：银行登录、邮件内容、社交媒体私信……</p>
    <p>安全建议：<br>
    ✅ 只安装开源、可审查的扩展<br>
    ✅ 检查扩展商店的下载量、评分、最近更新时间<br>
    ✅ 优先选择"不需要读取所有网站数据"的扩展（权限越少越好）<br>
    ❌ 避免使用功能单一的网站专用下载器（如"XX视频下载器"这类名字模糊的扩展）<br>
    ❌ 定期检查已安装的扩展列表，移除不再使用的</p>

    <h3>原则三：Cookie 文件就是你的账号密码</h3>
    <p>Cookie 文件包含你的登录凭证——拿到 Cookie 就等于可以控制你的账号。使用 Cookie 导出功能时：</p>
    <p>✅ 使用"Get cookies.txt LOCALLY"扩展（注意：必须带 LOCALLY，旧版可能上传数据）<br>
    ✅ Cookie 文件使用后及时删除<br>
    ❌ 不要将 Cookie 文件发给任何不认识的人<br>
    ❌ 不要上传 Cookie 到不受信任的网站</p>
    <p>xiaoyuevideo 的 Cookie 管理功能承诺 Cookie 仅保存在服务器本地，仅用于视频解析请求，不上传到第三方。即便如此，建议你在完成解析后考虑移除 Cookie。</p>

    <h3>原则四：辨别"真假下载按钮"</h3>
    <p>很多在线下载网站充满误导性广告——"下载按钮"实际上是广告链接，点击后下载的是恶意软件或捆绑插件。</p>
    <p>辨别技巧：<br>
    - 真的下载按钮通常紧挨着视频预览或画质选项<br>
    - 广告按钮通常标注为"Download Now"、"立即下载"、"加速下载"等带有催促感的文案<br>
    - 鼠标悬停在按钮上，看浏览器的状态栏显示的链接地址——如果指向的是第三方域名，很可能就是广告</p>

    <h3>原则五：不要安装"全能下载器"</h3>
    <p>"一个软件下载全网视频"——这种宣传词非常有吸引力，但也是恶意软件最喜欢用的身份伪装。尽量使用知名、开源的工具（如 yt-dlp）或流行的在线网站（如 xiaoyuevideo），而不是来路不明的"万能下载器"。</p>

    <h3>原则六：区分"需要安装的"和"免安装的"</h3>
    <p>工具类型的安全等级排序（从高到低）：<br>
    1. 在线网页工具（免安装，安全风险最低）<br>
    2. 微信小程序（运行在微信沙盒，权限受限）<br>
    3. 命令行开源工具（本地运行，可审查源代码）<br>
    4. 知名品牌桌面软件（需要信任品牌）<br>
    5. 来路不明的桌面软件（安全风险最高）<br>
    6. 浏览器扩展（权限过大，尤其是"读取所有网站数据"的）</p>

    <h3>原则七：使用专门的隐私保护浏览器</h3>
    <p>如果需要在浏览器中使用在线解析工具，考虑使用专门的浏览器或浏览器用户配置文件来处理这类需求，与你日常使用的银行/邮箱账号隔离开。</p>

    <h3>原则八：检查 HTTPS 加密</h3>
    <p>使用在线工具前检查网址是否以 https:// 开头。HTTP 明文传输可能被中间人攻击篡改内容。浏览器地址栏的小锁图标是基本的安全保障。</p>

    <h3>原则九：定期检查已授权的应用和扩展</h3>
    <p>Chrome/Edge 中打开 chrome://extensions/ 检查已安装的扩展。<br>
    定期清理不再使用的扩展。<br>
    注意那些拥有"读取和更改所有网站数据"权限但不常用的扩展。</p>

    <h3>原则十：遵循最小权限原则</h3>
    <p>任何工具，如果它自称是视频下载器，却要求读取通讯录、发送通知、访问位置——这是严重的危险信号。合法下载工具只需要网络访问权限，不需要其他任何权限。</p>

    <h3>小结</h3>
    <p>安全不是什么高深的技术——它是一套习惯和原则。养成"先判断再安装"的习惯，大部分安全风险都可以避免。xiaoyuevideo 在设计上默认采用在线解析的模式，就是要让用户"用完即走"，不在用户设备上留下任何常驻程序。</p>`
  },
  {
    title: '视频 AI 工具盘点：2026 年最值得尝试的 10 款神器',
    groupId: 'a1b2c3d4-2020-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'AI 正在彻底改变视频创作的方式。从自动剪辑、AI 生成视频、智能补帧到一键配音，本文精选 10 款 2026 年真正实用的视频 AI 工具，覆盖创作全流程。',
    content: `<p>2026 年，AI 不再是锦上添花的噱头——它已经深入到视频创作的每个环节。以下 10 款工具经过实测筛选，覆盖从内容生成到后期处理的全流程，每一款都能实实在在地提升效率。</p>

    <h3>1. <a href="https://openai.com/sora" target="_blank">Sora（OpenAI）</a>—— 文生视频的标杆</h3>
    <p>经过 2024-2026 年的持续迭代，Sora 已经从一个实验性产品进化为可商用的视频生成工具。支持文本/图片生成最高 1080P、60 秒视频，对物理世界的理解更加准确（人物、动物、液体的运动逻辑更符合现实）。<br>
    <strong>适合：</strong>广告创意、概念展示、短视频素材生成。</p>

    <h3>2. <a href="https://runwayml.com" target="_blank">Runway Gen-4</a> —— 最全能的视频 AI 平台</h3>
    <p>Runway 从 Gen-1 到 Gen-4，已经构建了完整的视频 AI 工具链：文生视频、图生视频、视频风格迁移、视频背景消除、自动补帧、视频扩展（inpaint/outpaint）。Gen-4 在画面一致性和可控性上有了质的飞跃——你可以指定角色的位置、动作序列、甚至镜头运动轨迹。<br>
    <strong>适合：</strong>专业创作者，需要精细控制视频生成过程。</p>

    <h3>3. <a href="https://www.capcut.com" target="_blank">剪映（专业版）</a>—— AI 功能最全的编辑软件</h3>
    <p>剪映的 AI 功能集合是 2026 年最丰富的：AI 文案生成（根据视频主题自动生成配音脚本）、AI 配音（音色克隆 + 情感语气调节，已支持超过 50 种音色）、AI 字幕（基于自研语音识别，准确率超过 97%）、智能抠图（一键去除视频背景）、AI 扩图（自动补齐画面裁剪后的空白区域）。<br>
    <strong>适合：</strong>短视频创作者，特别是抖音/B站内容生产。</p>

    <h3>4. <a href="https://www.topazlabs.com/topaz-video-ai" target="_blank">Topaz Video AI</a> —— 视频画质修复的天花板</h3>
    <p>将老视频/低清视频提升到 4K 甚至 8K。它使用针对视频专门训练的 AI 模型——不是简单的放大，而是理解画面内容后"脑补"出缺失的细节。支持去噪、去模糊、去隔行、慢动作补帧（光流法）。<br>
    <strong>适合：</strong>老影像修复、低清视频升画质、复古胶片数字化。</p>

    <h3>5. ElevenLabs —— AI 配音和语音克隆</h3>
    <p>2026 年，ElevenLabs 的语音合成已经几乎无法与真人区分。支持多语言（含中文）、情感调节（高兴/悲伤/愤怒）、语速控制、甚至语气停顿。新增的视频配音功能可以自动替换视频中的语音轨——非常适合外语视频本地化。<br>
    <strong>适合：</strong>视频配音、旁白生成、外语视频翻译配音。</p>

    <h3>6. <a href="https://www.descript.com" target="_blank">Descript</a> —— AI 视频编辑的"文档式"工作流</h3>
    <p>Descript 的革命性理念是：像编辑文档一样编辑视频。你只需要删除文字，对应的视频片段会自动剪掉。它还支持 AI 去口语词（自动删掉"嗯"、"啊"、"那个"等）、AI 补录（用你的音色补录漏掉的地方）。<br>
    <strong>适合：</strong>播客、教程视频、口播类视频的高效剪辑。</p>

    <h3>7. <a href="https://www.d-id.com" target="_blank">D-ID</a> —— AI 数字人播报</h3>
    <p>输入一段文字和一个静态头像照片，D-ID 就能生成一个"真人"在说话的视频——嘴唇动作与文字精准同步，面部表情自然。2026 年新增了实时互动功能，数字人可以回答观众提问。<br>
    <strong>适合：</strong>数字人播报、企业宣传、在线教育。</p>

    <h3>8. <a href="https://opus.pro" target="_blank">Opus Clip</a> —— AI 自动剪辑高光片段</h3>
    <p>Opus Clip 将长视频自动剪辑为多个短视频高光片段。它使用 AI 分析视频的语义内容，自动识别精彩段落、添加字幕、调整构图（自动追踪说话者主体）。一个 1 小时的长视频可以在几分钟内产出 5-10 个 30-60 秒的短视频。<br>
    <strong>适合：</strong>直播剪辑、长视频转短视频、YouTube 内容多平台分发。</p>

    <h3>9. <a href="https://tingwu.aliyun.com" target="_blank">通义听悟（阿里云）</a>—— AI 视频内容分析</h3>
    <p>通义听悟可以对视频进行智能分析：自动生成逐字稿和摘要、提取关键词和话题标签、识别多说话人并区分标记、问答互动（你可以问"视频里提到了哪些数字？"）。对于教学视频、会议录播、文章访谈等场景非常实用。<br>
    <strong>适合：</strong>视频内容消化、会议记录、学习笔记生成。</p>

    <h3>10. <a href="https://stability.ai/stable-video" target="_blank">Stable Video Diffusion</a> —— 开源视频生成</h3>
    <p>Stability AI 推出的开源视频生成模型，SVD 可以在消费级 GPU（如 RTX 4090）上运行，完全免费。通过生成式 AI 创作视频，没有平台限制。2026 年的最新版本支持了更长视频生成和更好的运动一致性。<br>
    <strong>适合：</strong>技术探索、自定义 AI 视频生成、不想受云端平台限制的用户。</p>

    <h3>AI 工具的取舍与选择</h3>
    <p>以上 10 款工具覆盖了视频创作的四个阶段：<br>
    <strong>内容生成：</strong>Sora / Runway / SVD（从零创造视频内容）<br>
    <strong>编辑与后期：</strong><a href="https://www.capcut.com" target="_blank">剪映</a> / <a href="https://www.descript.com" target="_blank">Descript</a>（提高编辑效率）<br>
    <strong>修复与增强：</strong><a href="https://www.topazlabs.com/topaz-video-ai" target="_blank">Topaz Video AI</a> / <a href="https://opus.pro" target="_blank">Opus Clip</a>（提升画质或二次创作）<br>
    <strong>辅助与分发：</strong><a href="https://elevenlabs.io" target="_blank">ElevenLabs</a> / <a href="https://tingwu.aliyun.com" target="_blank">通义听悟</a> / <a href="https://www.d-id.com" target="_blank">D-ID</a>（配音、分析、数字人）</p>
    <p>建议根据自己的实际需求选择性使用，而不是一股脑全部安装。对于大多数创作者来说，剪映专业版 + Topaz Video AI 可以覆盖 80% 的日常需求。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Sora</strong>：<a href="https://openai.com/sora" target="_blank">https://openai.com/sora</a></li>
  <li><strong>Runway</strong>：<a href="https://runwayml.com" target="_blank">https://runwayml.com</a></li>
  <li><strong>剪映专业版</strong>：<a href="https://www.capcut.com" target="_blank">https://www.capcut.com</a></li>
  <li><strong>Topaz Video AI</strong>：<a href="https://www.topazlabs.com/topaz-video-ai" target="_blank">https://www.topazlabs.com</a></li>
  <li><strong>Descript</strong>：<a href="https://www.descript.com" target="_blank">https://www.descript.com</a></li>
  <li><strong>D-ID</strong>：<a href="https://www.d-id.com" target="_blank">https://www.d-id.com</a></li>
  <li><strong>Opus Clip</strong>：<a href="https://opus.pro" target="_blank">https://opus.pro</a></li>
  <li><strong>通义听悟</strong>：<a href="https://tingwu.aliyun.com" target="_blank">https://tingwu.aliyun.com</a></li>
  <li><strong>Stable Video Diffusion</strong>：<a href="https://stability.ai/stable-video" target="_blank">https://stability.ai/stable-video</a></li>
  <li><strong>ElevenLabs</strong>：<a href="https://elevenlabs.io" target="_blank">https://elevenlabs.io</a></li>
</ul>`
  },
  {
    title: 'Youwee：1800+ 网站全支持的开源视频下载神器，颜值与 AI 并存',
    groupId: 'a1b2c3d4-3001-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '基于 Tauri + React 构建的桌面下载器，支持 1800+ 网站、6 套精美主题、AI 视频摘要、字幕工坊，还能跳过广告。比 VidBee 和 yt-dlp GUI 更具现代感。',
    content: `<p>视频下载工具很多，但能同时做到"支持网站多"、"颜值高"、"有 AI 功能"的工具凤毛麟角。Youwee 就是这么一个"三好学生"。</p>
<p>👉 <strong>GitHub 地址：</strong><a href="https://github.com/vanloctech/youwee" target="_blank">https://github.com/vanloctech/youwee</a></p>

    <h3>Youwee 是什么？</h3>
    <p>Youwee 是基于 Tauri + React 构建的开源桌面应用，GitHub 上线后获得了极快的 Star 增长速度。后端使用 yt-dlp 引擎，但把命令行体验变成了赏心悦目的图形界面。</p>

    <h3>核心亮点</h3>
    <p><strong>1800+ 网站支持：</strong>底层基于 yt-dlp 引擎，几乎覆盖所有主流视频平台。YouTube、B站、抖音、Twitter、Instagram……你常用的都覆盖了。</p>
    <p><strong>6 套精美主题：</strong>Midnight（暗夜）、Aurora（极光）、Sunset（日落）等 6 套主题随意切换。开发者说"下载工具也应该赏心悦目"——确实做到了。</p>
    <p><strong>AI 视频摘要：</strong>最亮眼的功能。下载视频后自动生成 AI 摘要，快速了解视频讲了什么。适合需要大量采集视频素材的内容创作者——先看摘要再决定是否下载完整版。</p>
    <p><strong>字幕工坊：</strong>内置字幕编辑功能，支持自动生成、翻译、调整时间轴。</p>
    <p><strong>SponsorBlock 集成：</strong>下载时自动跳过视频中的广告段落，类似浏览器扩展 SponsorBlock，直接集成在下载器中。</p>

    <h3>安装与使用</h3>
    <p>GitHub Releases 页面提供 Windows/macOS/Linux 三平台安装包，下载即用。还提供 Chromium 和 Firefox 浏览器扩展，在视频页面点击扩展图标直接发送到 Youwee 下载。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Youwee</strong>：<a href="https://github.com/vanloctech/youwee" target="_blank">https://github.com/vanloctech/youwee</a></li>
</ul>`
  },
  {
    title: 'Lux（原 Annie）：Go 语言写的命令行下载器，4K HDR 秒下',
    groupId: 'a1b2c3d4-3002-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '纯 Go 语言编写的视频下载 CLI 工具，支持 30+ 网站、4K/HDR 画质、多线程下载、播放列表批量处理。安装只需要一行命令：brew install lux。',
    content: `<p>提到命令行视频下载，大家想到的往往是 yt-dlp。但有一款后起之秀值得关注——<a href="https://github.com/iawia002/lux" target="_blank">Lux</a>（原名 Annie），用 Go 语言重写的下载器，在简洁性和性能上有自己的特色。</p>

    <h3>Lux 的独特之处</h3>
    <p>yt-dlp 是 Python 写的，依赖 Python 运行时和第三方库。Lux 是 Go 编译的单二进制文件——下载即用，无需 Python、FFmpeg 或其他依赖。这在跨平台部署上有天然优势。</p>

    <h3>安装（一行命令）</h3>
    <p>macOS：<code>brew install lux</code><br>
    Windows：<code>scoop install lux</code><br>
    Linux：<code>sudo snap install lux</code><br>
    或从 GitHub Releases 下载编译好的二进制文件。</p>

    <h3>核心用法</h3>
    <p>下载视频：<code>lux "视频URL"</code><br>
    查看画质：<code>lux -i "视频URL"</code><br>
    指定画质：<code>lux -f 137 "视频URL"</code><br>
    下载列表：<code>lux -p "播放列表URL"</code><br>
    多线程：<code>lux -n 8 "视频URL"</code></p>

    <h3>实测体验</h3>
    <p>实测下载 B站 1080P 视频，Lux 的解析速度比 yt-dlp 略快（Go 的 HTTP 客户端性能优势），多线程下载表现稳定。4K HDR 需要配合 FFmpeg 进行流合并。</p>

    <h3>Lux vs yt-dlp</h3>
    <p>Lux 的优势：单二进制、安装极简、Go 并发模型带来的多线程性能好。<br>
    yt-dlp 的优势：支持的网站更多（1000+ vs 30+）、更新更频繁、社区更大。</p>

    <p>两者互补。日常用 Lux 足够，遇到小众网站用 yt-dlp 做后备。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Lux</strong>：<a href="https://github.com/iawia002/lux" target="_blank">https://github.com/iawia002/lux</a></li>
</ul>`
  },
  {
    title: 'ReClip：150 行 Python 代码自建视频下载网站，NAS 用户狂喜',
    groupId: 'a1b2c3d4-3003-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '一个只有 150 行 Python 代码的视频下载 Web 服务，Flask 后端 + 纯 HTML 前端，Docker 一键部署。支持批量 URL、去重、画质选择。适合在 NAS 上自托管。',
    content: `<p>如果你有自己的 NAS 或云服务器，<a href="https://github.com/averygan/reclip" target="_blank">ReClip</a> 可能是最省事的自托管视频下载方案——整个项目只有 150 行 Python 代码，前后端一体，Docker 一键跑起来。</p>

    <h3>为什么需要 ReClip？</h3>
    <p>很多人家有 NAS，想搭建一个"全家都能用的视频下载服务"。yt-dlp 命令行对家人不友好，桌面软件每台电脑都要装。ReClip 的做法：跑一个 Web 服务在 NAS 上，任何设备打开浏览器就能用。</p>

    <h3>部署方式</h3>
    <p><code>docker run -d -p 5000:5000 -v /path/to/downloads:/downloads averygan/reclip</code></p>
    <p>一行命令。之后在任何设备的浏览器中访问 http://你的NASIP:5000，就是简洁的下载界面。</p>

    <h3>核心功能</h3>
    <p>粘贴视频链接 → 自动解析 → 选择画质 → 下载到 NAS。</p>
    <p>ReClip 还支持：批量粘贴多个 URL 排队下载、自动去重（已下载的不会重复下）、下载进度实时显示。</p>

    <h3>适合场景</h3>
    <p>家庭共享：家人通过手机/平板/电视浏览器访问，看到想下载的视频粘贴链接即可。<br>
    创作团队：所有人把素材链接发到 ReClip，统一下载到 NAS 共享目录。<br>
    自动化流水线：ReClip 下载目录作为 Jellyfin 媒体库的输入源，下载完成自动入库。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>ReClip</strong>：<a href="https://github.com/averygan/reclip" target="_blank">https://github.com/averygan/reclip</a></li>
</ul>`
  },
  {
    title: 'Trove：不只是下载器，内置 Whisper 帮你把视频转成文字稿',
    groupId: 'a1b2c3d4-3004-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '一个"现代网页保存机"，下载视频的同时自动进行语音转文字。内置 whisper.cpp 本地转录，不依赖云端 API，可生成 SRT/VTT 字幕和纯文本文字稿。',
    content: `<p>Trove 的开源介绍语很简单："Save what you care about from the modern web."——把你关心的网页内容保存下来。特殊之处在于：不止保存视频文件，还帮你把视频里的信息提取出来。</p>

    <h3>Trove 的差异化能力</h3>
    <p>大多数下载工具只下载视频文件就结束了。<a href="https://github.com/afk1997/trove" target="_blank">Trove</a> 多走了一步：下载完成后自动用 whisper.cpp 进行本地语音转文字，生成完整的文字稿。</p>
    <p>几个实用场景：<br>
    下载讲座视频 → Trove 自动生成文字稿，你可以直接搜索文字内容定位视频位置<br>
    下载采访视频 → 文字稿快速浏览核心观点，不用从头到尾重看<br>
    文字稿导出为 txt/markdown，方便在笔记软件中引用</p>

    <h3>技术实现</h3>
    <p>使用 whisper.cpp（C++ 实现的 Whisper），在 CPU 上就能运行，不需要 GPU。转录速度大约是实时速度的 2-3 倍——30 分钟的视频约 10-15 分钟完成转录。</p>

    <h3>字幕编辑</h3>
    <p>生成的 SRT/VTT 字幕可以在 Trove 的 Web UI 中直接编辑：调整时间轴、修改错别字、导出不同格式。</p>

    <h3>部署</h3>
    <p>同样是 Docker 单容器部署，适合跑在 NAS 或云服务器上。支持暂停/恢复下载（网络中断后自动续传）。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Trove</strong>：<a href="https://github.com/afk1997/trove" target="_blank">https://github.com/afk1997/trove</a></li>
</ul>`
  },
  {
    title: 'MoneyPrinterTurbo：20K Star 的 AI 短视频工厂，一键生成爆款',
    groupId: 'a1b2c3d4-3005-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '输入一个主题，AI 自动写脚本、配音、匹配画面、加字幕、生成视频。GitHub 20K+ Star 的开源项目，支持中文、多种大模型和 TTS 语音。手把手搭建自己的短视频生产线。',
    content: `<p>如果你做过短视频创作，一定经历过这些痛苦：写脚本（半天）、录音（嘴瓢 N 次）、找素材（翻遍图库）、剪辑（熬夜）、加字幕（眼睛看花）。<a href="https://github.com/harry0703/MoneyPrinterTurbo" target="_blank">MoneyPrinterTurbo</a> 的目标就是消灭这些痛苦——你只需输入一个主题，剩下的交给 AI。</p>

    <h3>一键生成短视频</h3>
    <p>操作流程：<br>
    1. 输入一个主题（如"一分钟看懂量子纠缠"）<br>
    2. AI 自动生成视频脚本（可手动编辑）<br>
    3. 选择配音音色（多种 TTS 引擎）<br>
    4. 点击"生成视频"→ 等待几分钟 → 拿到成品</p>
    <p>生成的视频包含：AI 配音旁白 + 自动匹配的画面素材 + 同步字幕 + 背景音乐，可直接发布到抖音/B站/YouTube。</p>

    <h3>技术架构</h3>
    <p>后端 Python + Flask，提供 Web UI 和 API 接口。脚本生成接入了 ChatGPT/DeepSeek/通义千问等多种大模型。配音支持 Edge TTS、OpenAI TTS、Azure TTS。画面素材自动搜索 Pexels/Pixabay 等免版权库。</p>

    <h3>适用内容类型</h3>
    <p>科普解说类（最适合）：输入知识点，AI 生成通俗解说视频<br>
    新闻快讯类：输入新闻标题，30 秒速览<br>
    产品介绍类：输入产品名和卖点，生成宣传短片</p>

    <h3>部署建议</h3>
    <p>最低 2 核 4GB 内存即可运行。建议 RTX 显卡加速 Whisper 转录。Docker 和手动部署两种方式都支持。</p>

    <p>注意：自动生成的视频缺乏"人味儿"，建议作为初稿使用，在 AI 基础上人工调整效果会更好。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>MoneyPrinterTurbo</strong>：<a href="https://github.com/harry0703/MoneyPrinterTurbo" target="_blank">https://github.com/harry0703/MoneyPrinterTurbo</a></li>
</ul>`
  },
  {
    title: 'Open-Sora vs Wan2.1 vs CogVideo：开源文生视频三巨头横评',
    groupId: 'a1b2c3d4-3006-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'Sora 发布后开源社区迅速跟进。本文实测对比 Open-Sora（22K Star）、阿里 Wan2.1（20K Star）和清华 CogVideo，从画质、中文理解、运行门槛等维度逐一 PK。',
    content: `<p>OpenAI 的 Sora 至今未完全开源，但开源社区已经给出了强有力的回应——三款重量级开源文生视频模型相继问世，各有千秋。</p>

    <h3>参评选手</h3>
    <p><strong><a href="https://github.com/hpcaitech/Open-Sora" target="_blank">Open-Sora</a></strong>（GitHub 22K+ Star）<br>
    ColossalAI 团队开发，目标是完整复现 Sora 技术路线。基于 Diffusion Transformer 架构，支持文生视频和图生视频。最新版支持 15 秒 720P 视频生成。</p>
    <p><strong><a href="https://github.com/Wan-Video/Wan2.1" target="_blank">Wan2.1</a></strong>（GitHub 20K+ Star）<br>
    阿里巴巴出品，1.3B 到 14B 参数多个版本。最大优势是中文理解能力极强——训练数据中有大量中文内容。生成质量在开源模型中属第一梯队。</p>
    <p><strong><a href="https://github.com/THUDM/CogVideo" target="_blank">CogVideo</a></strong><br>
    清华大学出品，在语义理解和动作连续性上有独特优势。</p>

    <h3>实测对比</h3>
    <p>用同一段中文 Prompt 测试："一只熊猫在竹林里吃竹子，阳光从树叶间洒落"<br>
    Open-Sora：画面构图好，熊猫形象准确，但竹子细节模糊。中文理解尚可。<br>
    Wan2.1：对中文 Prompt 理解最准确，熊猫和竹林的细节丰富。14B 版本画质明显优于其他两者，但需要约 24GB 显存。<br>
    CogVideo：语义匹配度最高，熊猫动作自然连贯，但画面分辨率略低。</p>

    <h3>部署门槛</h3>
    <p>Open-Sora：推荐 RTX 4090（24GB），支持 FP16 推理优化<br>
    Wan2.1：1.3B 版可在 RTX 3060 运行，14B 版需要 A100<br>
    CogVideo：2B 版需要 16GB+ 显存</p>

    <h3>结论</h3>
    <p>中文创作者首选 Wan2.1——中文理解强、画质好、多版本适配不同硬件。技术探索选 Open-Sora（架构最接近 Sora）。学术研究看 CogVideo（动作连贯性有独特贡献）。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Open-Sora</strong>：<a href="https://github.com/hpcaitech/Open-Sora" target="_blank">https://github.com/hpcaitech/Open-Sora</a></li>
  <li><strong>Wan2.1</strong>：<a href="https://github.com/Wan-Video/Wan2.1" target="_blank">https://github.com/Wan-Video/Wan2.1</a></li>
  <li><strong>CogVideo</strong>：<a href="https://github.com/THUDM/CogVideo" target="_blank">https://github.com/THUDM/CogVideo</a></li>
</ul>`
  },
  {
    title: 'Social Auto Upload：GitHub 上最火的多平台一键分发工具',
    groupId: 'a1b2c3d4-3007-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '做好的视频要同时发到抖音、B站、小红书、快手和视频号？这个开源项目可以在命令行一键分发，支持定时发布、多账号管理、批量上传。',
    content: `<p>内容创作者最头疼的事情之一：做一个视频 2 小时，分发到 5 个平台又要 30 分钟——每个平台都要手动上传、填标题标签、选封面。Social Auto Upload 就是为了解决这个问题而生的。</p>

    <h3>一句话介绍</h3>
    <p>CLI 工具，在命令行一键将视频发布到抖音、TikTok、B站、快手、小红书、视频号、YouTube 等多个平台。支持定时发布、多账号管理、批量上传、标签自动生成。<br>
👉 <strong>GitHub：</strong><a href="https://github.com/dreammis/social-auto-upload" target="_blank">https://github.com/dreammis/social-auto-upload</a></p>

    <h3>支持平台</h3>
    <p>国内：抖音、B站、快手、小红书、视频号、微博<br>
    国外：YouTube、TikTok<br>
    每个平台都有独立的适配器，即使某个平台 API 变更，不影响其他平台。</p>

    <h3>使用方法</h3>
    <p><code>pip install social-auto-upload<br>
    social-auto-upload config<br>
    social-auto-upload publish --platform bilibili,douyin --video ./output.mp4 --title "新视频" --tags "教程"</code></p>

    <h3>自动化工作流</h3>
    <p>MoneyPrinterTurbo 生成视频 → 自动保存输出目录 → Social Auto Upload 检测新文件 → 自动发布到各平台 → 记录发布结果。实现"输入主题 → AI 生成 → 自动分发"的完整闭环。</p>

    <h3>注意事项</h3>
    <p>各平台自动发布依赖 Cookie 或 API Token，有被封号风险。建议使用小号或专门的发布账号。定时发布功能适合矩阵号运营场景。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Social Auto Upload</strong>：<a href="https://github.com/dreammis/social-auto-upload" target="_blank">https://github.com/dreammis/social-auto-upload</a></li>
</ul>`
  },
  {
    title: 'Whisper.cpp：CPU 上跑语音识别比官方快 4 倍，无需 GPU',
    groupId: 'a1b2c3d4-3008-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'OpenAI Whisper 很强但 Python 版太慢。Whisper.cpp 用 C/C++ 重写，CPU 上就能跑出比官方版快 4 倍的速度，还能跑在树莓派上。手把手教你编译和使用。',
    content: `<p>OpenAI 开源的 Whisper 语音识别模型支持 99 种语言，准确率极高。但官方 Python 实现在 CPU 上跑得非常慢（1 小时视频可能需 2-3 小时处理）。<a href="https://github.com/ggerganov/whisper.cpp" target="_blank">Whisper.cpp</a> 用纯 C/C++ 重写推理引擎，解决了这个痛点。</p>

    <h3>核心优势</h3>
    <p><strong>速度快 4 倍：</strong>同等 CPU 硬件上，whisper.cpp 比官方 Python 版快 3-4 倍。30 分钟的视频，官方版约 40 分钟，whisper.cpp 只需 10-12 分钟。</p>
    <p><strong>零依赖：</strong>不依赖 Python、PyTorch、CUDA。单二进制文件，下载即用。</p>
    <p><strong>内存省：</strong>官方 large-v3 模型需约 5GB 内存，whisper.cpp 优化后仅需 2-3GB。</p>
    <p><strong>跨平台：</strong>Windows/macOS/Linux，甚至树莓派和 iPhone 上都能跑。</p>

    <h3>安装使用</h3>
    <p><code>git clone https://github.com/ggerganov/whisper.cpp.git<br>
    cd whisper.cpp && make -j<br>
    bash models/download-ggml-model.sh medium<br>
    ./main -m models/ggml-medium.bin -f audio.wav -l zh -osrt</code></p>
    <p>-l zh 指定中文，-osrt 输出 SRT 字幕格式。</p>

    <h3>模型选择</h3>
    <p>tiny：极快但准确率一般，适合实时演示<br>
    base/small：速度和准确率的平衡<br>
    medium：推荐，最佳平衡点<br>
    large-v3：最准确，需要 4GB+ 内存</p>

    <h3>集成到工作流</h3>
    <p>Whisper.cpp 提供 C API，可被其他语言调用。Trove、Cut/Storm 等开源项目已在使用它作为转录引擎。如果你在搭建视频处理流水线，whisper.cpp 是本地转录的最佳选择。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Whisper.cpp</strong>：<a href="https://github.com/ggerganov/whisper.cpp" target="_blank">https://github.com/ggerganov/whisper.cpp</a></li>
</ul>`
  },
  {
    title: 'Biliup：B站 UP 主的自动化神器，直播录制 + 自动投稿一条龙',
    groupId: 'a1b2c3d4-3009-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '专为 B站 UP 主设计的开源工具，支持直播自动录制、B站自动投稿、多平台视频同步。开播即录、下播即停、自动上传，帮你省下大量重复劳动。',
    content: `<p>如果你是一个 B站 UP 主，或者经常在 B站做直播，<a href="https://github.com/biliup/biliup" target="_blank">Biliup</a> 可能是 2026 年最值得安装的工具。</p>

    <h3>三大核心功能</h3>
    <p><strong>直播自动录制：</strong>设置好直播间 ID，Biliup 自动监控直播状态——开播即录，下播即停。再也不用担心忘记按录制按钮。</p>
    <p><strong>自动投稿：</strong>通过命令行自动上传视频到 B站，自动填写标题、简介、标签、分区、设置定时发布。批量上传效率提升惊人。</p>
    <p><strong>多平台同步：</strong>支持 YouTube/Twitch 内容自动同步到 B站，适合跨平台创作者。</p>

    <h3>实际场景</h3>
    <p>每周三晚 8 点在 B站直播，想录制直播内容以便后期剪辑：<br>
    <code>biliup start --room-id 12345 --out-dir ./recordings</code></p>
    <p>Biliup 在后台运行，检测到开播自动开始录制，直播结束后自动保存为 MP4。你不需要守在电脑前。</p>

    <h3>自动投稿工作流</h3>
    <p><code>biliup upload video.mp4 --title "新视频" --tid 171 --tags "教程"</code></p>
    <p>配合自动化流水线：直播回放 → 自动剪辑 → 自动投稿，全程无人值守。</p>

    <h3>配置要点</h3>
    <p>需配置 B站 Cookie 或 Token。建议使用小号操作，避免主账号被限流。Cookie 导出方法在 xiaoyuevideo 的 Cookie 管理文章中有详细介绍。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Biliup</strong>：<a href="https://github.com/biliup/biliup" target="_blank">https://github.com/biliup/biliup</a></li>
</ul>`
  },
  {
    title: 'VideoLingo：Netflix 级别的视频翻译与字幕本地化工具',
    groupId: 'a1b2c3d4-3010-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '想把英语视频转为中文字幕？VideoLingo 能做到 Netflix 级别的字幕切分和 AI 翻译，时间轴精准对齐，读起来自然流畅。支持多语言互译和一键生成双语字幕。',
    content: `<p>下载了英语教程视频，想配上中文字幕？传统机器翻译字幕"机翻味"重，时间轴对不上，读着痛苦。<a href="https://github.com/Huanshere/VideoLingo" target="_blank">VideoLingo</a> 用 AI 技术解决了这个问题——生成的字幕质量接近 Netflix 的专业翻译水平。</p>

    <h3>VideoLingo 的独特流程</h3>
    <p>普通 AI 字幕翻译：识别语音 → 逐句翻译 → 拼接输出。结果句子断点不自然，翻译生硬。</p>
    <p>VideoLingo 的做法：<br>
    1. Whisper 高精度识别语音，得到逐字时间戳<br>
    2. 按完整语义重新切分句子（不是按固定时长切）<br>
    3. LLM 上下文感知翻译——理解整个段落后再翻译，而非逐句翻<br>
    4. 时间轴重新对齐，确保翻译后的字幕时长匹配语音<br>
    5. 输出双语 SRT 字幕</p>

    <h3>效果对比</h3>
    <p><strong>普通机翻：</strong>"So what we need to do is to configure the environment variables properly before we start the server." → "所以我们需要做的是在启动服务器之前正确配置环境变量。"</p>
    <p><strong>VideoLingo：</strong>"So what we need to do is to configure the environment variables properly before we start the server." → "启动服务器之前，得先把环境变量配好。"</p>
    <p>后者更口语化、自然，像真人说的。</p>

    <h3>适合场景</h3>
    <p>追更海外 YouTube 教程、翻译电影剧集字幕（个人学习）、中文视频加英文字幕出海、跨语言采访后期制作。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>VideoLingo</strong>：<a href="https://github.com/Huanshere/VideoLingo" target="_blank">https://github.com/Huanshere/VideoLingo</a></li>
</ul>`
  },
  {
    title: 'FlyCut Caption：浏览器里运行的 AI 剪辑，自动删除"嗯啊那个"',
    groupId: 'a1b2c3d4-3011-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '录制口播视频满嘴"嗯"、"啊"、"那个"——手动剪掉费时费力。FlyCut Caption 在浏览器本地运行 AI，自动识别废话片段，勾选即可删除。数据不上传服务器，完全本地处理。',
    content: `<p>如果你是知识类 UP 主、播客或在线老师，一定有这样的体验：录制时讲得行云流水，回看时满篇"嗯"、"啊"、"那个"、"怎么说呢"——手动剪掉这些语气词，至少多花一倍时间。</p>

    <h3>FlyCut 的解决方案</h3>
    <p><a href="https://github.com/x007xyz/flycut-caption" target="_blank">FlyCut Caption</a> 是一款完全在浏览器本地运行的 AI 剪辑工具。先用 Whisper（通过 Transformers.js 在浏览器中运行）把视频转成带时间戳的文字，然后用 NLP 模型标记"废话片段"——语气词、重复语句、长时间停顿。</p>
    <p>界面效果：<br>
    "今天我们要讲的是 [嗯...] [那个...] JavaScript 的闭包概念 [然后呢] [啊] 它其实是一个非常强大的特性"</p>
    <p>方括号标记的废话片段，勾选 → 点击删除 → 自动剪掉对应视频片段，导出干净版本。</p>

    <h3>为什么在浏览器中运行？</h3>
    <p>所有计算在浏览器本地完成，视频和音频数据不上传任何服务器。这吸引了对隐私敏感的用户（企业培训、内部会议记录）。</p>
    <p>原理是 Transformers.js 把 Whisper 模型编译为 WebGL 可执行的格式。30 分钟视频转录约需 5-8 分钟（取决于 GPU）。</p>

    <h3>实测体验</h3>
    <p>处理 10 分钟口播视频：上传 → 转录约 2 分钟 → 标记废话 → 勾选删除 → 导出。整个过程约 5 分钟，剪掉了约 40 秒废话。手动操作至少 20 分钟，效率提升 5 倍以上。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>FlyCut Caption</strong>：<a href="https://github.com/x007xyz/flycut-caption" target="_blank">https://github.com/x007xyz/flycut-caption</a></li>
</ul>`
  },
  {
    title: 'Cut/Storm：一个 Docker 命令搭建浏览器端视频剪辑工作室',
    groupId: 'a1b2c3d4-3012-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '不用 Premiere 不用 Final Cut。Cut/Storm 是一个 Docker 容器，跑起来后浏览器中完成剪辑、字幕生成、多比例导出。内置 Whisper、去静音、自动裁剪竖屏。',
    content: `<p>偶尔需要剪辑视频但不想装几十 GB 的专业软件？或者主力电脑配置低跑不动 Pr？<a href="https://github.com/vorniches/cutstorm" target="_blank">Cut/Storm</a> 可能是你的理想方案——它跑在服务器上，你在浏览器中操作。</p>

    <h3>设计理念</h3>
    <p>"浏览器内的视频剪辑工作室"。剪辑这种计算密集型任务，交给服务器，用户只需在浏览器中操作时间线和预览画面。</p>
    <p>好处：笔记本不需要高性能显卡、团队共享同一剪辑环境、iPad 或手机上也能操作剪辑。</p>

    <h3>一键部署</h3>
    <p><code>docker run -d -p 8080:8080 -v /path/to/videos:/videos vorniches/cutstorm</code></p>
    <p>启动后浏览器访问 http://服务器IP:8080 即可开始剪辑。</p>

    <h3>内置功能</h3>
    <p><strong>Whisper 字幕生成：</strong>导入视频后自动调用本地 Whisper 引擎生成 SRT 字幕，不依赖外部 API。<br>
    <strong>去静音：</strong>一键删除视频中的静音段落，适合录制类内容精简。<br>
    <strong>多比例导出：</strong>同一项目可同时导出 16:9、9:16、1:1 三种比例——一次剪辑多平台分发。<br>
    <strong>轨道式时间线：</strong>多视频/音频/字幕轨道拖拽编辑。</p>

    <h3>适合谁？</h3>
    <p>有 NAS 或家庭服务器的用户、不想在主力电脑上装大型剪辑软件的创作者、需要在多设备间切换剪辑的团队。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Cut/Storm</strong>：<a href="https://github.com/vorniches/cutstorm" target="_blank">https://github.com/vorniches/cutstorm</a></li>
</ul>`
  },
  {
    title: 'VideoCaptioner：LLM 驱动的智能字幕工作台，比 Whisper 更懂中文',
    groupId: 'a1b2c3d4-3013-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'Whisper 的中文识别总有"AI 味"？VideoCaptioner 在 Whisper 基础上增加 LLM 校正——大模型修正错别字、优化断句、润色表达。同时支持翻译、双语输出和视频压制。',
    content: `<p>用过 Whisper 做中文字幕的人都有同感：大部分时候识别率不错，但总有字是错的。<a href="https://github.com/WEIFENG2333/VideoCaptioner" target="_blank">VideoCaptioner</a> 用 LLM 解决了这个痛点——"百度"变成"白度"，"人工智能"变成"人功智能"，"卷积神经网络"各种花样翻车。</p>

    <h3>工作流</h3>
    <p>Whisper 转录 → LLM 校正错别字 → LLM 优化断句 → 翻译（可选）→ 压制字幕到视频</p>
    <p>核心创新在第二步：Whisper 识别结果送到大模型（ChatGPT、Claude、DeepSeek、通义千问等），根据上下文纠正错别字，同时优化标点和断句。</p>

    <h3>一个例子</h3>
    <p><strong>Whisper 原始输出：</strong>"在这个实验中我们使用了深对 learning 的房法你来看这个结果非常出忽亿了"<br>
    <strong>LLM 校正后：</strong>"在这个实验中，我们使用了深度学习的算法。你看这个结果，非常出乎意料。"</p>
    <p>校正前的字幕基本没法直接用，校正后可以直接出片。</p>

    <h3>部署方式</h3>
    <p>提供 Windows 图形界面和 Docker 两种部署。Windows 版适合个人用户，Docker 版适合批量处理。需配置 LLM API Key（ChatGPT 或国产模型均可）。</p>

    <h3>与 xiaoyuevideo 配合</h3>
    <p>xiaoyuevideo 下载视频 → 导入 VideoCaptioner 自动生成精校中文字幕。适合下载海外教程后快速配上高质量中文字幕。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>VideoCaptioner</strong>：<a href="https://github.com/WEIFENG2333/VideoCaptioner" target="_blank">https://github.com/WEIFENG2333/VideoCaptioner</a></li>
</ul>`
  },
  {
    title: 'Lingji Cut（灵剪）：国产开源 AI 视频创作工作台，写稿配音剪辑一条龙',
    groupId: 'a1b2c3d4-3014-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '2026 年 5 月最新开源的国产 AI 视频工具，集 AI 写稿、TTS 配音、自动字幕、时间线剪辑、智能卡片和封面导出为一体。本地优先，隐私安全。',
    content: `<p>2026 年 5 月，一个名为"灵剪"（<a href="https://github.com/yoqu/lingji-cut" target="_blank">Lingji Cut</a>）的开源项目在 GitHub 上发布，迅速引起关注。它定位为"本地优先的 AI 视频创作工作台"，目标是成为剪映的开源替代方案。</p>

    <h3>高度集成的工作流</h3>
    <p>灵剪把视频创作的主要环节整合到一桌面应用中：</p>
    <p><strong>AI 写稿：</strong>内置 AI 写作助手，根据主题生成视频脚本、优化文案、生成标题。可以说是"视频版的 AI 写作工具"。</p>
    <p><strong>TTS 配音：</strong>接入多种 TTS 引擎，支持中英文配音。在线试听、调整语速语调。适合不想自己录音的用户。</p>
    <p><strong>自动字幕：</strong>本地 Whisper 引擎语音识别，生成带时间轴的字幕。支持 SRT 导入导出。</p>
    <p><strong>时间线剪辑：</strong>多轨道时间线，分割、裁剪、调速、转场。日常创作完全够用。</p>
    <p><strong>AI 卡片：</strong>自动生成视频封面和章节卡片，省去做封面的时间。</p>

    <h3>本地优先设计</h3>
    <p>所有 AI 处理尽可能在本地完成，不上传云端。对担心素材泄露的创作者是重要卖点。</p>

    <h3>适合人群</h3>
    <p>想用 AI 辅助创作但不想付费订阅的个人创作者、对隐私敏感的企业培训部门、被复杂软件吓到的新手。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>灵剪（Lingji Cut）</strong>：<a href="https://github.com/yoqu/lingji-cut" target="_blank">https://github.com/yoqu/lingji-cut</a></li>
</ul>`
  },
  {
    title: 'Video Subtitle Remover：AI 去除视频硬字幕，拯救被遮挡的画面',
    groupId: 'a1b2c3d4-3015-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '下载的视频带有硬字幕或水印？Video Subtitle Remover 用 AI 自动检测并移除视频中的硬字幕，填补被遮挡的画面内容。实测在纯色背景上效果几乎完美。',
    content: `<p>下载的视频素材底部有硬字幕或水印——做二次创作时，这些字幕严重影响画面质量。以前唯一办法是裁剪掉底部，但会损失构图。<a href="https://github.com/YaoFANGUK/video-subtitle-remover" target="_blank">Video Subtitle Remover</a> 给出了更聪明的方案。</p>

    <h3>AI 去字幕原理</h3>
    <p>传统去水印只是"模糊"或"遮盖"，效果很假。Video Subtitle Remover 更先进：</p>
    <p>1. AI 目标检测找到字幕/水印区域<br>
    2. 分析被遮挡区域周围的画面内容（背景、纹理、颜色）<br>
    3. 用图像修复算法"脑补"出被遮挡区域的画面<br>
    4. 逐帧处理，保持帧间连续性</p>
    <p>不是"遮住"字幕，而是"擦掉"字幕然后画上本该在那里的内容。</p>

    <h3>实际效果</h3>
    <p>纯色或简单纹理背景上，去字幕效果几乎完美，看不出处理痕迹。复杂背景（人物走动、自然风景）上偶有轻微修复痕迹，但不仔细看很难发现。</p>

    <h3>使用方式</h3>
    <p><code>python video_subtitle_remover.py --video input.mp4 --output clean.mp4</code></p>
    <p>也提供带 Web UI 的 Docker 版本，可在浏览器中拖拽视频、调整参数、预览效果再导出。</p>

    <h3>注意事项</h3>
    <p>处理速度较慢——1 秒视频需几秒到几十秒（取决于 GPU）。建议只处理需要去字幕的片段。对中文字幕支持最好。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Video Subtitle Remover</strong>：<a href="https://github.com/YaoFANGUK/video-subtitle-remover" target="_blank">https://github.com/YaoFANGUK/video-subtitle-remover</a></li>
</ul>`
  },
  {
    title: 'ShortGPT：用 AI 把长视频自动拆成爆款短视频，开源替代 OpusClip',
    groupId: 'a1b2c3d4-3016-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '1 小时的直播视频，怎么变成 10 个 1 分钟的爆款短视频？ShortGPT 是 OpusClip 的开源替代，用 AI 自动识别长视频高光片段，裁剪竖屏格式，加字幕和效果。',
    content: `<p><a href="https://github.com/RayVentura/ShortGPT" target="_blank">ShortGPT</a>：长视频→短视频的二次创作，在 2026 年已经是内容运营的标配。B站 1 小时视频拆成 3 个抖音短视频，YouTube 深度内容剪成 TikTok 60 秒精华。</p>

    <h3>ShortGPT 做什么？</h3>
    <p><strong>高光片段检测：</strong>AI 分析视频内容，自动标记精彩段落——音量突然升高（爆点）、弹幕密集区域、笑点/泪点、重要关键词出现的位置。</p>
    <p><strong>智能裁剪：</strong>检测画面主体（说话的人、演示物体），裁剪为竖屏时自动追踪主体，确保始终在画面中心。</p>
    <p><strong>自动加字幕：</strong>截取片段自动生成动态字幕，适配竖屏布局。</p>
    <p><strong>批量导出：</strong>一次操作生成多个短视频，支持批量加片头片尾和水印。</p>

    <h3>实际案例</h3>
    <p>一位知识类 UP 主的使用流程：上传 1 小时直播回放 → ShortGPT 识别出 12 个高光片段 → 人工筛选保留 8 个 → 自动裁剪加字幕 → 导出 8 个竖屏短视频 → 发布到抖音/视频号。</p>
    <p>以往手动做这个流程至少半天，现在可控制在 30 分钟内。</p>

    <h3>vs OpusClip</h3>
    <p>OpusClip 是商业产品，每月有使用次数限制。ShortGPT 完全开源免费，本地部署没有次数限制。缺点是需要自己配置环境和模型。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>ShortGPT</strong>：<a href="https://github.com/RayVentura/ShortGPT" target="_blank">https://github.com/RayVentura/ShortGPT</a></li>
</ul>`
  },
  {
    title: 'Awesome AI Media CN：150+ 开源 AI 视频工具宝藏合集，每周更新',
    groupId: 'a1b2c3d4-3017-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'GitHub 上的"AI 视频工具百科全书"，收录 150+ 开源项目，涵盖文生视频、自动剪辑、字幕翻译、多平台分发、AI 配音等领域。每周更新，创作者的必收藏仓库。',
    content: `<p>GitHub 上每天都有新的 AI 视频工具诞生，但很少有人能全部追踪到。<a href="https://github.com/JuneYaooo/awesome-ai-media-cn" target="_blank">Awesome AI Media CN</a> 就是这样一个"导航站"——把优质的 AI 视频开源项目按类别整理好，每周更新。</p>

    <h3>收录范围（150+ 项目）</h3>
    <p><strong>文生视频：</strong>Open-Sora、Wan2.1、CogVideo、HunyuanVideo、Mochi<br>
    <strong>短视频自动生成：</strong>MoneyPrinterTurbo、ShortGPT、NarratoAI、RedditVideoMakerBot<br>
    <strong>字幕与翻译：</strong>VideoLingo、VideoCaptioner、whisper.cpp、faster-whisper<br>
    <strong>视频剪辑：</strong>灵剪、Cut/Storm、FlyCut、OpenCut<br>
    <strong>多平台分发：</strong>Social Auto Upload、biliup、YTB2BILI<br>
    <strong>AI 配音：</strong>ChatTTS、GPT-SoVITS、Fish Speech、CosyVoice<br>
    <strong>数字人：</strong>MuseTalk、MuseV、Easy-Wav2Lip<br>
    <strong>视频修复：</strong>Video Subtitle Remover、CodeFormer、GFPGAN</p>

    <h3>怎么用</h3>
    <p>需要完成某个视频任务（如"给视频加 AI 配音"），在对应分类下找工具，看 Star 数、更新时间和简介，选最适合的。每个项目附 GitHub 链接。</p>
    <p>对中文开发者来说，这个仓库的独特价值在于聚焦中文生态——很多国产优秀项目在其他地方看不到。</p>

    <h3>保持关注</h3>
    <p>点击仓库右上角 Watch → Releases only，新项目被收录时自动收到通知，保持对 AI 视频工具圈的实时关注。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Awesome AI Media CN</strong>：<a href="https://github.com/JuneYaooo/awesome-ai-media-cn" target="_blank">https://github.com/JuneYaooo/awesome-ai-media-cn</a></li>
</ul>`
  },
  {
    title: 'Faster-Whisper vs Whisper.cpp vs OpenAI：三大语音引擎怎么选？',
    groupId: 'a1b2c3d4-3018-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '同样基于 Whisper 模型，Faster-Whisper、Whisper.cpp 和官方版有什么不同？从安装难度、运行速度、内存占用、准确率、硬件要求五个维度实测对比，帮你选对引擎。',
    content: `<p>搜索语音识别工具时，三个名字总让人困惑：OpenAI Whisper、<a href="https://github.com/SYSTRAN/faster-whisper" target="_blank">Faster-Whisper</a>、<a href="https://github.com/ggerganov/whisper.cpp" target="_blank">Whisper.cpp</a>。都基于同一模型，但实现完全不同。本文帮你理清区别。</p>

    <h3>OpenAI Whisper（官方版）</h3>
    <p>Python + PyTorch 实现。pip install openai-whisper 即可，但依赖 PyTorch（约 2GB）。GPU 上表现好，CPU 极慢。适合学术研究和模型调优。</p>

    <h3>Faster-Whisper</h3>
    <p>Python + CTranslate2（C++ 推理引擎）。pip install faster-whisper，无 PyTorch 依赖。INT8 量化后模型体积减 40%，推理速度提升 2.3 倍，准确率保持 98%+。最推荐的生产方案。</p>

    <h3>Whisper.cpp</h3>
    <p>纯 C/C++，无 Python 依赖。git clone + make，单二进制文件。CPU、Apple Silicon、甚至树莓派上都能跑。内存占用最低，功能相对基础。</p>

    <h3>实测速度（CPU i7-12700，medium 模型，10 分钟音频）</h3>
    <p>OpenAI Whisper：约 8 分钟<br>
    Faster-Whisper：约 3.5 分钟（INT8）<br>
    Whisper.cpp：约 2.5 分钟（Q5_0）</p>

    <h3>选型建议</h3>
    <p>大多数用户 → Faster-Whisper（性能与易用性的最佳平衡）<br>
    嵌入式/移动端 → Whisper.cpp（零依赖）<br>
    学术研究 → OpenAI Whisper（官方实现 API 最全）</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>Faster-Whisper</strong>：<a href="https://github.com/SYSTRAN/faster-whisper" target="_blank">https://github.com/SYSTRAN/faster-whisper</a></li>
  <li><strong>Whisper.cpp</strong>：<a href="https://github.com/ggerganov/whisper.cpp" target="_blank">https://github.com/ggerganov/whisper.cpp</a></li>
  <li><strong>OpenAI Whisper</strong>：<a href="https://github.com/openai/whisper" target="_blank">https://github.com/openai/whisper</a></li>
</ul>`
  },
  {
    title: 'YTB2BILI：YouTube 视频一键搬运到 B站，AI 翻译配音全自动',
    groupId: 'a1b2c3d4-3019-4f1e-9a2b-1c3d5e7f8a9b',
    summary: 'YouTube 上好视频想搬到 B站？YTB2BILI 实现了一键下载、AI 生成中文字幕、自动配音、上传 B站的完整流水线。YouTube 创作者开拓中文市场的好帮手。',
    content: `<p>跨平台内容搬运在 2026 年是一个持续存在的需求。很多优秀英文 YouTube 内容没有对应的中文版本，<a href="https://github.com/difyz9/ytb2bili" target="_blank">YTB2BILI</a> 正是为填补这个空白而生的开源工具。</p>

    <h3>完整流水线</h3>
    <p>输入 YouTube 视频链接，YTB2BILI 自动执行：</p>
    <p><strong>步骤 1：下载视频</strong> → yt-dlp 下载最高画质版本<br>
    <strong>步骤 2：语音识别</strong> → Whisper 识别英语/日语等语音，生成原始语言字幕<br>
    <strong>步骤 3：AI 翻译</strong> → LLM API（ChatGPT/Claude/DeepSeek）翻译为中文，优化使其自然口语化<br>
    <strong>步骤 4：AI 配音（可选）</strong> → TTS 引擎生成中文配音，替换原始音轨<br>
    <strong>步骤 5：压制字幕</strong> → 翻译后的字幕烧录到视频中<br>
    <strong>步骤 6：自动上传</strong> → B站 API 自动设置标题简介标签发布</p>

    <h3>实际案例</h3>
    <p>一位科技博主用 YTB2BILI 搬运国外编程教程：每周选 3-5 个优质英文教程 → 一键跑完翻译流水线 → 上传到自己 B站专栏。一个月 B站 账号增长 2 万粉丝。</p>

    <h3>版权提醒</h3>
    <p>搬运前请确保获得原作者授权，在简介中标注出处。建议只搬运自己创作的内容，或与原作者合作授权。</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>YTB2BILI</strong>：<a href="https://github.com/difyz9/ytb2bili" target="_blank">https://github.com/difyz9/ytb2bili</a></li>
</ul>`
  },
  {
    title: 'NarratoAI vs MoneyPrinterTurbo vs ShortGPT：三款 AI 视频工具怎么选？',
    groupId: 'a1b2c3d4-3020-4f1e-9a2b-1c3d5e7f8a9b',
    summary: '同为 AI 视频生成工具，MoneyPrinterTurbo 擅长图文转视频、ShortGPT 擅长长视频拆短视频、NarratoAI 专注解说类视频。用同一主题实测，告诉你哪个最值得部署。',
    content: `<p>AI 视频生成工具在 2026 年已经细分化了。MoneyPrinterTurbo、NarratoAI 和 ShortGPT 是 GitHub 上最热门的三款，但方向完全不同。选错了，效果会大打折扣。</p>

    <h3>MoneyPrinterTurbo——图文转视频王者</h3>
    <p>给一个主题或文章链接，AI 自动生成完整解说视频。最适合科普、新闻、知识分享类。素材库丰富（自动搜索 Pexels/Pixabay 免版权素材），画面和文案匹配度高。</p>
    <p>场景：公众号文章丢给 MPT，几分钟后得到一版完整的视频稿，发布到视频平台。</p>

    <h3>ShortGPT——长视频拆短视频专家</h3>
    <p>把已有长视频（直播回放、教程、播客）自动拆解为多个短视频片段。最适合直播剪辑和二次创作。AI 自动识别高光片段、追踪主体裁剪竖屏。</p>
    <p>场景：主播把 2 小时直播回放丢给 ShortGPT，第二天早上得到 15 个高光短视频，发到抖音继续吸引粉丝。</p>

    <h3>NarratoAI——解说类视频利器</h3>
    <p>分析故事或话题，自动生成带旁白的解说视频。最适合电影解说、故事讲述、历史科普。叙事逻辑强，适合需要"故事感"的内容。</p>

    <h3>实测：同一主题"量子计算入门"</h3>
    <p>MoneyPrinterTurbo：3 分钟科普视频，素材丰富，画面匹配度高，旁白稍显"AI 味"。<br>
    ShortGPT：不适合（需要已有长视频输入）。<br>
    NarratoAI：5 分钟解说视频，叙事结构清晰，但素材库不如 MPT 丰富。</p>

    <h3>最终推荐</h3>
    <p>从零生成视频 → MoneyPrinterTurbo<br>
    剪辑已有长视频 → ShortGPT（唯一胜任）<br>
    做故事解说 → NarratoAI（叙事能力最强）</p>

<h3>相关下载链接</h3>
<ul>
  <li><strong>MoneyPrinterTurbo</strong>：<a href="https://github.com/harry0703/MoneyPrinterTurbo" target="_blank">https://github.com/harry0703/MoneyPrinterTurbo</a></li>
</ul>`
  }
]