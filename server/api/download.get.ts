export default defineEventHandler(async (event) => {
  const { url } = getQuery(event)
  if (!url || typeof url !== 'string') {
    throw createError({ statusCode: 400, statusMessage: '请提供下载地址' })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      signal: AbortSignal.timeout(60000),
    })

    if (!response.ok) {
      throw createError({ statusCode: 502, statusMessage: '无法获取视频源' })
    }

    const contentType = response.headers.get('content-type') || 'video/mp4'
    const contentLength = response.headers.get('content-length')

    setHeader(event, 'Content-Type', contentType)
    setHeader(event, 'Content-Disposition', 'attachment; filename="video.mp4"')
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    if (contentLength) {
      setHeader(event, 'Content-Length', contentLength)
    }

    return response.body
  } catch (err: any) {
    if (err.name === 'TimeoutError') {
      throw createError({ statusCode: 504, statusMessage: '下载超时' })
    }
    throw createError({ statusCode: 502, statusMessage: '下载失败：' + (err.message || '未知错误') })
  }
})
