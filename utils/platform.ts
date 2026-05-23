import type { Platform } from '~/types'

export const platforms: Platform[] = [
  { id: 'youtube', name: 'YouTube', path: '/youtube', icon: '/icons/youtube.png', description: 'YouTube视频在线保存' },
  { id: 'twitter', name: 'Twitter(x.com)', path: '/twitter', icon: '/icons/twitter.png', description: 'Twitter视频快速下载' },
  { id: 'bilibili', name: '哔哩哔哩', path: '/bilibili', icon: '/icons/bilibili.png', description: 'B站视频一键下载' },
  { id: 'douyin', name: '抖音', path: '/douyin', icon: '/icons/douyin.png', description: '抖音视频去水印保存' },
  { id: 'kuaishou', name: '快手', path: '/kuaishou', icon: '/icons/kuaishou.png', description: '快手视频去水印下载' },
  { id: 'tiktok', name: 'TikTok', path: '/tiktok', icon: '/icons/tiktok.png', description: 'TikTok视频本地保存' },
  { id: 'ins', name: 'Instagram', path: '/ins', icon: '/icons/instagram.svg', description: 'Instagram视频/图片保存' },
  { id: 'facebook', name: 'Facebook', path: '/fb', icon: '/icons/facebook.png', description: 'Facebook视频提取下载' },
  { id: 'weibo', name: '微博', path: '/weibo', icon: '/icons/weibo.png', description: '微博视频/图片保存' },
  { id: 'xiaohongshu', name: '小红书', path: '/xiaohongshu', icon: '/icons/xiaohongshu.png', description: '小红书视频下载' },
  { id: 'ixigua', name: '西瓜视频', path: '/ixigua', icon: '/icons/ixigua.png', description: '西瓜视频在线保存' },
  { id: 'haokan', name: '好看视频', path: '/haokan', icon: '/icons/haokan.png', description: '好看视频提取下载' },
  { id: 'cctv', name: 'CCTV', path: '/cctv', icon: '/icons/cctv.png', description: 'CCTV节目视频保存' },
  { id: 'zhihu', name: '知乎', path: '/zhihu', icon: '/icons/zhihu.png', description: '知乎视频下载' },
  { id: 'acfun', name: 'AcFun', path: '/acfun', icon: '/icons/acfun.ico', description: 'AcFun视频保存' },
  { id: 'vimeo', name: 'Vimeo', path: '/vimeo', icon: '/icons/vimeo.png', description: 'Vimeo高清视频下载' },
  { id: 'pinterest', name: 'Pinterest', path: '/pinterest', icon: '/icons/pinterest.webp', description: 'Pinterest视频保存' },
  { id: 'threads', name: 'Threads', path: '/threads', icon: '/icons/threads.png', description: 'Threads视频下载' },
  { id: 'weverse', name: 'Weverse', path: '/weverse', icon: '/icons/weverse.jpg', description: 'Weverse视频提取' },
  { id: 'xpc', name: '新片场', path: '/xpc', icon: '/icons/xinpianchang.png', description: '新片场视频下载' },
  { id: 'gzh', name: '公众号', path: '/gzh', icon: '/icons/gzh.png', description: '公众号视频保存' },
  { id: 'toutiao', name: '今日头条', path: '/toutiao', icon: '/icons/toutiao.png', description: '今日头条视频下载' },
  { id: 'souhu', name: '搜狐视频', path: '/souhu', icon: '/icons/souhu.png', description: '搜狐视频在线保存' },
  { id: 'net163', name: '网易视频', path: '/net163', icon: '/icons/wangyi.png', description: '网易视频提取下载' },
  { id: 'huya', name: '虎牙', path: '/huya', icon: '/icons/huya.png', description: '虎牙视频保存' },
  { id: 'douyu', name: '斗鱼', path: '/douyu', icon: '/icons/douyu.png', description: '斗鱼视频下载' },
]

export const faqs = [
  {
    q: 'xiaoyuevideo可以解析哪些网站的视频？',
    a: 'xiaoyuevideo覆盖了国内外绝大多数主流视频平台，包括Instagram、哔哩哔哩（B站）、抖音、Facebook、Weverse等社交网络和视频站点。此外还支持从未知视频站提取内容，无论是视频、音频还是图片，都能帮助您轻松保存到本地。'
  },
  {
    q: '手机端（Android/iOS）能用xiaoyuevideo吗？',
    a: '当然可以。Android手机通过Chrome、UC、360、QQ等主流浏览器都能正常使用，推荐Chrome以获得最佳体验。iOS设备（iPhone、iPad）自带的Safari浏览器因系统限制不支持直接下载文件，建议前往教程页面了解如何保存视频到相册。'
  },
  {
    q: '点击下载后跳转到播放页面，怎么保存到本地？',
    a: '如果下载按钮跳转到了视频播放页面，您可以在播放器上找到下载选项进行保存。建议使用Chrome、360或QQ浏览器，这些浏览器对视频下载的支持更加完善。'
  }
]
