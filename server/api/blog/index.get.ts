import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

export default defineEventHandler(() => {
  const dir = join(process.cwd(), 'articles')
  const files = readdirSync(dir).filter(f => f.endsWith('.md'))
  const posts: { title: string; groupId: string; summary: string }[] = []

  for (const file of files) {
    try {
      const raw = readFileSync(join(dir, file), 'utf-8')
      const { data } = matter(raw)
      if (data.title && data.groupId) {
        posts.push({ title: data.title, groupId: data.groupId, summary: data.summary || '' })
      }
    } catch { /* skip malformed files */ }
  }

  posts.sort((a, b) => b.groupId.localeCompare(a.groupId))
  return posts
})
