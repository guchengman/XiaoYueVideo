export interface DownloadJob {
  id: string
  phase: 'video' | 'audio' | 'merge' | 'done'
  pct: number
  filePath: string
  error: string
  ext: string
  filename: string
}

const jobs = new Map<string, DownloadJob>()

function gc() {
  const cutoff = Date.now() - 10 * 60 * 1000
  for (const [id, job] of jobs) {
    const ts = parseInt(id.slice(0, 13), 36)
    if (ts < cutoff) jobs.delete(id)
  }
}

export function createJob(ext = 'mp4', filename = ''): string {
  gc()
  const id = Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8)
  jobs.set(id, { id, phase: 'video', pct: 0, filePath: '', error: '', ext, filename: filename || `video.${ext}` })
  return id
}

export function updateProgress(id: string, phase: DownloadJob['phase'], pct: number) {
  const job = jobs.get(id)
  if (job) {
    job.phase = phase
    job.pct = pct
  }
}

export function markDone(id: string, filePath: string) {
  const job = jobs.get(id)
  if (job) {
    job.phase = 'done'
    job.pct = 100
    job.filePath = filePath
  }
}

export function markError(id: string, error: string) {
  const job = jobs.get(id)
  if (job) {
    job.error = error
    job.phase = 'done'
  }
}

export function getJob(id: string): DownloadJob | undefined {
  return jobs.get(id)
}

export function removeJob(id: string) {
  jobs.delete(id)
}
