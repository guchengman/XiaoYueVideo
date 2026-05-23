<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">使用</span>教程
      </h1>
      <h2 class="py-3 text-sm text-gray-500">xiaoyuevideo 全部功能详解，从入门到进阶</h2>
    </div>

    <div class="max-w-5xl mx-auto mb-16">
      <!-- 目录 -->
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 class="text-lg font-semibold mb-3 text-gray-800">📋 目录</h3>
        <ul class="space-y-1.5 text-sm text-gray-600">
          <li><a href="#download" class="text-[#6366f1] hover:underline">一、视频下载 — 核心功能</a></li>
          <li><a href="#player" class="text-[#6366f1] hover:underline">二、在线播放器 — 无需下载，直接预览</a></li>
          <li><a href="#vip" class="text-[#6366f1] hover:underline">三、VIP 视频免费看 — 解锁付费内容</a></li>
          <li><a href="#cookies" class="text-[#6366f1] hover:underline">四、Cookie 管理 — 下载需要登录的视频</a></li>
          <li><a href="#platforms" class="text-[#6366f1] hover:underline">五、支持平台一览</a></li>
          <li><a href="#history" class="text-[#6366f1] hover:underline">六、解析历史 — 回顾与复用</a></li>
          <li><a href="#faq" class="text-[#6366f1] hover:underline">七、常见问题</a></li>
        </ul>
      </div>

      <!-- 一、视频下载 -->
      <div id="download" class="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4 text-[#6366f1]">一、视频下载 — 核心功能</h3>
        <div class="text-gray-600 leading-relaxed space-y-3">
          <p>xiaoyuevideo 支持抖音、B站、YouTube、快手等 26 个主流视频平台的视频解析与下载。</p>

          <div class="bg-[#f0f0ff] border border-[#6366f1]/20 rounded-lg p-4 space-y-2">
            <p class="font-semibold text-gray-800">操作步骤</p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">1</span> 打开目标视频页面，<strong>复制浏览器地址栏中的完整链接</strong></p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">2</span> 回到 xiaoyuevideo，将链接 <strong>粘贴到首页输入框</strong></p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">3</span> 点击 <strong>"开始"</strong> 按钮，系统自动解析视频源（几秒到十几秒不等）</p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">4</span> 解析完成后，在 <strong>画质选择下拉框</strong> 中挑选需要的清晰度</p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">5</span> 点击 <strong>"保存视频"</strong> 下载视频，或点击 <strong>"提取音频"</strong> 仅下载声音</p>
          </div>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p class="font-semibold text-yellow-800">提示</p>
            <p class="text-yellow-700 text-sm">部分平台（如 B站 1080P、抖音主页视频、快手、微博等）需要登录才能获取高清画质。遇到解析失败或只有低清画质时，请先配置 Cookie（见第四节）。</p>
          </div>
        </div>
      </div>

      <!-- 二、在线播放器 -->
      <div id="player" class="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4 text-[#6366f1]">二、在线播放器 — 无需下载，直接预览</h3>
        <div class="text-gray-600 leading-relaxed space-y-3">
          <p>不想下载整段视频，只想快速预览？使用<strong>在线播放器</strong>，粘贴链接即可在浏览器中直接播放。</p>

          <div class="bg-[#f0f0ff] border border-[#6366f1]/20 rounded-lg p-4 space-y-2">
            <p class="font-semibold text-gray-800">使用方法</p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">1</span> 访问 <NuxtLink to="/video/player" class="text-[#6366f1] font-semibold hover:underline">在线播放器</NuxtLink> 页面</p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">2</span> 粘贴视频链接（支持平台链接或 mp4/m3u8 直链）</p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">3</span> 点击"播放"，自动解析并加载视频</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="font-semibold text-gray-800 text-sm mb-1">功能亮点</p>
              <ul class="text-sm space-y-1 list-disc list-inside">
                <li>画质切换 — 多档清晰度随意选</li>
                <li>倍速播放 — 0.5x 到 16x 无极变速</li>
                <li>画中画 (PiP) — 悬浮小窗边看边干别的</li>
                <li>截图 — 一键保存当前画面</li>
              </ul>
            </div>
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="font-semibold text-gray-800 text-sm mb-1">快捷键</p>
              <ul class="text-sm space-y-1 list-disc list-inside">
                <li><kbd class="bg-white border px-1 rounded text-xs">空格</kbd> 暂停 / 播放</li>
                <li><kbd class="bg-white border px-1 rounded text-xs">← →</kbd> 快退 / 快进 5 秒</li>
                <li><kbd class="bg-white border px-1 rounded text-xs">↑ ↓</kbd> 音量加减</li>
                <li><kbd class="bg-white border px-1 rounded text-xs">F</kbd> 全屏</li>
              </ul>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="font-semibold text-blue-800 text-sm">DASH 音视频分离</p>
            <p class="text-blue-700 text-sm">B站、YouTube 等平台的高清视频采用 DASH 技术（视频和音频分开传输）。播放器会自动在服务端合并音视频流，合并进度会实时显示，合并完成后即可正常播放和拖放进度条。</p>
          </div>
        </div>
      </div>

      <!-- 三、VIP 视频免费看 -->
      <div id="vip" class="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4 text-[#6366f1]">三、VIP 视频免费看 — 解锁付费内容</h3>
        <div class="text-gray-600 leading-relaxed space-y-3">
          <p>腾讯视频、爱奇艺、优酷、芒果TV 等平台的 VIP 付费视频，可以通过<strong>第三方解析接口</strong>免费在线观看。</p>

          <div class="bg-[#f0f0ff] border border-[#6366f1]/20 rounded-lg p-4 space-y-2">
            <p class="font-semibold text-gray-800">使用步骤</p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">1</span> 访问 <NuxtLink to="/video/vip" class="text-[#6366f1] font-semibold hover:underline">VIP 免费看</NuxtLink> 页面</p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">2</span> 粘贴 VIP 视频的播放页链接</p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">3</span> 选择解析接口（默认"自动选择"即可，失败会自动切换）</p>
            <p><span class="inline-block bg-[#6366f1] text-white w-6 h-6 rounded-full text-center text-xs leading-6 mr-2">4</span> 点击"开始播放"，在新标签页中观看</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="font-semibold text-gray-800 text-sm mb-2">内置 11 个解析接口</p>
            <p class="text-sm text-gray-500">虾米解析、万能接口、极速解析、BL解析、飞速解析、稳定线路、CK解析、789优选、剖元解析、JSON解析 等。系统会记住你上次成功使用的接口，同类视频自动选择。</p>
          </div>

          <p class="text-sm text-gray-400">注：解析接口由第三方提供，可用性和画质不受本站控制。如遇接口失效，请手动切换其他接口。</p>
        </div>
      </div>

      <!-- 四、Cookie 管理 -->
      <div id="cookies" class="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4 text-[#6366f1]">四、Cookie 管理 — 下载需要登录的视频</h3>
        <div class="text-gray-600 leading-relaxed space-y-3">
          <p>抖音、B站、快手、微博、TikTok、Twitter、Instagram、小红书等平台的高清视频或部分内容需要<strong>登录账号</strong>才能访问。上传 Cookie 后，xiaoyuevideo 可以以你的身份解析和下载视频。</p>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p class="font-semibold text-yellow-800">安全说明</p>
            <p class="text-yellow-700 text-sm">Cookie 文件仅保存在服务器本地，仅用于视频解析请求。不会上传到任何第三方、不会用于其他目的。Cookie 有过期时间，失效后需重新上传。</p>
          </div>

          <div class="space-y-3">
            <p class="font-semibold text-gray-800">如何获取 Cookie（三种方式）</p>

            <div class="bg-gray-50 rounded-lg p-3">
              <p class="font-semibold text-sm text-gray-800">方式一：Cookie-Editor 浏览器扩展（推荐）</p>
              <p class="text-sm text-gray-500">Chrome 应用商店安装 Cookie-Editor 扩展 → 打开目标网站并登录 → 点击扩展图标 → Export → 复制内容 → 粘贴到 xiaoyuevideo 的 Cookie 管理面板。</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-3">
              <p class="font-semibold text-sm text-gray-800">方式二：Get cookies.txt 扩展</p>
              <p class="text-sm text-gray-500">安装 get cookies.txt 扩展 → 打开目标网站 → 点击扩展导出 cookies.txt → 将文件内容粘贴到对应平台的 Cookie 输入框。</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-3">
              <p class="font-semibold text-sm text-gray-800">方式三：Python 脚本自动提取</p>
              <p class="text-sm text-gray-500">项目内置 <code class="bg-gray-200 px-1 rounded text-xs">scripts/chrome_cookie_extract.py</code> 脚本，可从 Chrome 浏览器直接提取指定网站的 Cookie 并输出为 Netscape 格式。</p>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="font-semibold text-blue-800 text-sm">Cookie 状态提示</p>
            <p class="text-blue-700 text-sm">在首页输入框下方的 Cookie 管理面板中，可以查看各平台的 Cookie 配置状态。绿色 = 已配置，灰色 = 未配置。部分平台（如 B站）未登录也能下载 720P，但 1080P 需要登录。</p>
          </div>
        </div>
      </div>

      <!-- 五、支持平台一览 -->
      <div id="platforms" class="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4 text-[#6366f1]">五、支持平台一览</h3>
        <div class="text-gray-600 leading-relaxed space-y-3">
          <p>xiaoyuevideo 目前支持以下 26 个平台的视频解析，每个平台有独立的专题页面和 SEO 优化。</p>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
            <div class="bg-gray-50 rounded p-2 text-center" v-for="p in platforms" :key="p.id">
              <NuxtLink :to="p.path" class="text-[#6366f1] hover:underline font-medium">{{ p.name }}</NuxtLink>
            </div>
          </div>

          <p class="text-sm text-gray-400">除了以上平台，mp4 / webm / m3u8 直链也可以直接下载或在线播放。</p>
        </div>
      </div>

      <!-- 六、解析历史 -->
      <div id="history" class="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4 text-[#6366f1]">六、解析历史 — 回顾与复用</h3>
        <div class="text-gray-600 leading-relaxed space-y-3">
          <p>每次解析成功的视频链接都会自动保存到<strong>解析历史</strong>中（最多保存 50 条）。</p>

          <div class="bg-[#f0f0ff] border border-[#6366f1]/20 rounded-lg p-4">
            <p class="text-sm">访问 <NuxtLink to="/history" class="text-[#6366f1] font-semibold hover:underline">历史记录</NuxtLink> 页面，可以查看所有解析过的链接，点击 <strong>"重新解析"</strong> 按钮可再次解析该视频，无需重新复制粘贴。</p>
          </div>

          <p class="text-sm text-gray-400">历史记录存储在浏览器本地 (localStorage)，清除浏览器数据会导致记录丢失。</p>
        </div>
      </div>

      <!-- 七、常见问题 -->
      <div id="faq" class="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4 text-[#6366f1]">七、常见问题</h3>
        <div class="text-gray-600 leading-relaxed space-y-6">

          <div>
            <p class="font-semibold text-gray-800 mb-1">Q: iPhone / iPad 如何将视频保存到相册？</p>
            <div class="text-sm space-y-1">
              <p>由于 iOS 系统限制，Safari 不能直接下载视频文件到相册。可尝试以下方案：</p>
              <p>• <strong>方案一</strong>：换用 Chrome 浏览器打开 xiaoyuevideo，下载体验更好</p>
              <p>• <strong>方案二</strong>：Safari 下载后，点击分享图标 → "存储到文件"，再通过文件 App 分享到相册</p>
              <p>• <strong>方案三</strong>：使用第三方下载管理器 App 来协助保存</p>
            </div>
          </div>

          <div>
            <p class="font-semibold text-gray-800 mb-1">Q: 想批量下载视频怎么办？</p>
            <div class="text-sm space-y-1">
              <p>xiaoyuevideo 专注于单个视频的在线解析与下载。如需批量处理，推荐使用专业工具：</p>
              <p>• <strong>yt-dlp</strong>：强大的命令行工具，支持 YouTube、B站等上千个网站的批量下载。本站内置了 yt-dlp，可通过命令行调用</p>
              <p>• 各平台官方 App 的离线缓存功能（如 B站、YouTube Premium）</p>
            </div>
          </div>

          <div>
            <p class="font-semibold text-gray-800 mb-1">Q: 视频解析失败或只有低清画质？</p>
            <div class="text-sm space-y-1">
              <p>常见原因及解决方法：</p>
              <p>• <strong>需要登录</strong>：B站 1080P、抖音主页视频等需要账号登录 → 配置对应平台的 Cookie（见第四节）</p>
              <p>• <strong>链接不正确</strong>：确保复制的是完整的视频页面 URL，而非分享口令或短链接（短链接会自动解析）</p>
              <p>• <strong>地区限制</strong>：部分平台（如 YouTube、TikTok）的视频有地区限制 → 使用代理或 VPN</p>
              <p>• <strong>视频已删除/私密</strong>：原视频可能已被作者删除或设为私密</p>
            </div>
          </div>

          <div>
            <p class="font-semibold text-gray-800 mb-1">Q: 在线播放器无法快进/拖放进度条？</p>
            <div class="text-sm space-y-1">
              <p>播放器已支持 HTTP Range 请求，正常情况下所有视频均可拖放快进。如果遇到问题：</p>
              <p>• B站 / YouTube DASH 格式：等待音视频合并完成（进度条走完）后即可自由拖放</p>
              <p>• M3U8 直播流：部分直播流不支持拖放，属于正常现象</p>
            </div>
          </div>

          <div>
            <p class="font-semibold text-gray-800 mb-1">Q: 下载的视频没有声音？</p>
            <div class="text-sm space-y-1">
              <p>这是 DASH 流媒体技术导致的——高清视频和音频分开传输。xiaoyuevideo 会在下载时<strong>自动合并音视频</strong>，你不需要做任何额外操作。如果使用"提取音频"功能，则只会下载音频轨道。</p>
            </div>
          </div>

          <div>
            <p class="font-semibold text-gray-800 mb-1">Q: 网站会存储我下载的视频吗？</p>
            <div class="text-sm space-y-1">
              <p><strong>不会。</strong> xiaoyuevideo 仅作为代理转发视频流，不存储任何视频文件。下载的视频直接从源 CDN 传输到你的设备，服务器不会保留副本。合并产生的临时文件在传输完成后立即删除。</p>
            </div>
          </div>

        </div>
      </div>

      <!-- 联系 -->
      <div class="text-center text-sm text-gray-400 py-8">
        <p>还有问题？欢迎通过 <NuxtLink to="/contact" class="text-[#6366f1] hover:underline">联系反馈</NuxtLink> 页面提交意见。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { platforms } from '~/utils/platform'

useHead({ title: '使用教程_xiaoyuevideo视频下载帮助' })
</script>
