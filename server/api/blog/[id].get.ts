import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing article id' })
  }

  const dir = join(process.cwd(), 'articles')
  const files = readdirSync(dir).filter(f => f.endsWith('.md'))

  for (const file of files) {
    try {
      const raw = readFileSync(join(dir, file), 'utf-8')
      const { data } = matter(raw)
      if (data.groupId === id) {
        const { content } = matter(raw)
        return {
          title: data.title,
          groupId: data.groupId,
          summary: data.summary || '',
          content: marked(content),
        }
      }
    } catch { /* skip */ }
  }

  throw createError({ statusCode: 404, message: '文章不存在' })
})
