import { Readable } from 'node:stream'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const jobId = query.jobId as string | undefined
  if (!jobId) throw createError({ statusCode: 400, message: '缺少 jobId' })

  setHeader(event, 'Content-Type', 'text/event-stream')
  setHeader(event, 'Cache-Control', 'no-cache')
  setHeader(event, 'Connection', 'keep-alive')
  setHeader(event, 'Access-Control-Allow-Origin', '*')

  let lastPhase = ''
  let lastPct = -2

  const readable = new Readable({
    read() {},
  })

  const interval = setInterval(() => {
    const job = getJob(jobId)
    if (!job) {
      readable.push('event: error\ndata: {"message":"job not found"}\n\n')
      readable.push(null)
      return
    }

    if (job.phase === 'done') {
      if (job.error) {
        readable.push(`event: error\ndata: ${JSON.stringify({ message: job.error })}\n\n`)
      } else {
        readable.push('event: done\ndata: {}\n\n')
      }
      readable.push(null)
      return
    }

    if (job.phase !== lastPhase || job.pct !== lastPct) {
      lastPhase = job.phase
      lastPct = job.pct
      readable.push(`event: progress\ndata: ${JSON.stringify({ phase: job.phase, pct: job.pct })}\n\n`)
    }
  }, 300)

  const cleanup = () => {
    clearInterval(interval)
    readable.destroy()
  }

  event.node.req.on('close', cleanup)
  readable.on('close', cleanup)
  readable.on('error', cleanup)

  return sendStream(event, readable)
})
