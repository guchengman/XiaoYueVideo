import type { Platform } from '~/types'

export const platforms: Platform[] = [
  { id: 'youtube', name: 'YouTube', path: '/youtube', icon: 'https://client.feiyudo.com/com/greenvideo/youtube.png', description: 'YouTube视频在线保存' },
  { id: 'twitter', name: 'Twitter(x.com)', path: '/twitter', icon: 'https://client.feiyudo.com/com/greenvideo/twitter.png', description: 'Twitter视频快速下载' },
  { id: 'bilibili', name: '哔哩哔哩', path: '/bilibili', icon: 'https://client.feiyudo.com/com/greenvideo/bilibili.png', description: 'B站视频一键下载' },
  { id: 'douyin', name: '抖音', path: '/douyin', icon: 'https://client.feiyudo.com/com/greenvideo/douyin.png', description: '抖音视频去水印保存' },
  { id: 'kuaishou', name: '快手', path: '/kuaishou', icon: 'https://client.feiyudo.com/com/greenvideo/kuaishou.png', description: '快手视频去水印下载' },
  { id: 'tiktok', name: 'TikTok', path: '/tiktok', icon: 'https://client.feiyudo.com/com/greenvideo/tiktok.png', description: 'TikTok视频本地保存' },
  { id: 'ins', name: 'Instagram', path: '/ins', icon: 'https://client.feiyudo.com/com/greenvideo/instagram.webp', description: 'Instagram视频/图片保存' },
  { id: 'facebook', name: 'Facebook', path: '/fb', icon: 'https://client.feiyudo.com/com/greenvideo/facebook.png', description: 'Facebook视频提取下载' },
  { id: 'weibo', name: '微博', path: '/weibo', icon: 'https://client.feiyudo.com/com/greenvideo/weibo.png', description: '微博视频/图片保存' },
  { id: 'xiaohongshu', name: '小红书', path: '/xiaohongshu', icon: 'https://client.feiyudo.com/com/greenvideo/xiaohongshu.png', description: '小红书视频下载' },
  { id: 'ixigua', name: '西瓜视频', path: '/ixigua', icon: 'https://client.feiyudo.com/com/greenvideo/ixigua.png', description: '西瓜视频在线保存' },
  { id: 'haokan', name: '好看视频', path: '/haokan', icon: 'https://client.feiyudo.com/com/greenvideo/haokan.png', description: '好看视频提取下载' },
  { id: 'cctv', name: 'CCTV', path: '/cctv', icon: 'https://client.feiyudo.com/com/greenvideo/cctv.png', description: 'CCTV节目视频保存' },
  { id: 'zhihu', name: '知乎', path: '/zhihu', icon: 'https://client.feiyudo.com/com/greenvideo/zhihu.png', description: '知乎视频下载' },
  { id: 'acfun', name: 'AcFun', path: '/acfun', icon: 'https://client.feiyudo.com/website-icon/zlpt/acfun.ico', description: 'AcFun视频保存' },
  { id: 'vimeo', name: 'Vimeo', path: '/vimeo', icon: 'https://client.feiyudo.com/com/greenvideo/vimeo.png', description: 'Vimeo高清视频下载' },
  { id: 'pinterest', name: 'Pinterest', path: '/pinterest', icon: 'https://client.feiyudo.com/com/greenvideo/pinterest.webp', description: 'Pinterest视频保存' },
  { id: 'threads', name: 'Threads', path: '/threads', icon: 'https://client.feiyudo.com/com/greenvideo/threads.png', description: 'Threads视频下载' },
  { id: 'weverse', name: 'Weverse', path: '/weverse', icon: 'https://client.feiyudo.com/com/greenvideo/weverse.jpg', description: 'Weverse视频提取' },
  { id: 'xpc', name: '新片场', path: '/xpc', icon: 'https://client.feiyudo.com/com/greenvideo/xinpianchang.png', description: '新片场视频下载' },
  { id: 'gzh', name: '公众号', path: '/gzh', icon: 'https://client.feiyudo.com/com/greenvideo/gzh.png', description: '公众号视频保存' },
  { id: 'toutiao', name: '今日头条', path: '/toutiao', icon: 'https://client.feiyudo.com/com/greenvideo/toutiao.png', description: '今日头条视频下载' },
  { id: 'souhu', name: '搜狐视频', path: '/souhu', icon: 'https://client.feiyudo.com/com/greenvideo/souhu.png', description: '搜狐视频在线保存' },
  { id: 'net163', name: '网易视频', path: '/net163', icon: 'https://client.feiyudo.com/com/greenvideo/wangyi.png', description: '网易视频提取下载' },
  { id: 'huya', name: '虎牙', path: '/huya', icon: 'https://client.feiyudo.com/com/greenvideo/huya.png', description: '虎牙视频保存' },
  { id: 'douyu', name: '斗鱼', path: '/douyu', icon: 'https://client.feiyudo.com/com/greenvideo/douyu.png', description: '斗鱼视频下载' },
]

export const blogPosts: { title: string; groupId: string }[] = [
  { title: 'Twitter（X）视频保存方法，这几个技巧很实用', groupId: '0f28fe50-41ef-11f1-975b-077e759ab69d' },
  { title: 'YouTube视频下载全攻略：多种方案任你选（2026版）', groupId: '82bf0c90-37ab-11f1-9ba4-ff1fceab7067' },
  { title: 'B站视频下载哪家强？四款热门工具横向评测', groupId: '17baf360-2fda-11f1-b4b3-2d16c4384577' },
  { title: '抖音视频保存对比：网页在线解析与批量下载哪个好', groupId: '69f86810-2b3e-11f1-a4c4-bd3cc6f302ab' },
  { title: '微博视频保存从入门到精通：单条与批量下载全攻略', groupId: 'd8f0e0c0-1622-11f1-a9db-3de0f64ab879' },
  { title: 'Instagram视频下载教程：2026年可用工具汇总', groupId: 'c25711b0-023e-11f1-9a34-6b44950bf749' },
  { title: 'Vimeo视频如何保存到本地？', groupId: 'c8c6c0c0-c75d-11f0-9ec4-4f2252e83580' },
  { title: 'TikTok主页批量下载，轻松备份喜欢的视频', groupId: 'de33c4d0-c5e6-11f0-a78a-d19cb9cd3dfe' },
]

export const faqs = [
  {
    q: 'XiaoYueVideo可以解析哪些网站的视频？',
    a: 'XiaoYueVideo覆盖了国内外绝大多数主流视频平台，包括Instagram、哔哩哔哩（B站）、抖音、Facebook、Weverse等社交网络和视频站点。此外还支持从未知视频站提取内容，无论是视频、音频还是图片，都能帮助您轻松保存到本地。'
  },
  {
    q: '手机端（Android/iOS）能用XiaoYueVideo吗？',
    a: '当然可以。Android手机通过Chrome、UC、360、QQ等主流浏览器都能正常使用，推荐Chrome以获得最佳体验。iOS设备（iPhone、iPad）自带的Safari浏览器因系统限制不支持直接下载文件，建议前往教程页面了解如何保存视频到相册。'
  },
  {
    q: '点击下载后跳转到播放页面，怎么保存到本地？',
    a: '如果下载按钮跳转到了视频播放页面，您可以在播放器上找到下载选项进行保存。建议使用Chrome、360或QQ浏览器，这些浏览器对视频下载的支持更加完善。'
  }
]
