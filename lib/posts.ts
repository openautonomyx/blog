import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type Post = {
  slug: string
  title: string
  description: string
  date: string
  author: string
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const source = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(source)

      return {
        slug,
        title: String(data.title || slug),
        description: String(data.description || ''),
        date: String(data.date || ''),
        author: String(data.author || 'OpenAutonomyX'),
        content,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((post) => post.slug === slug) || null
}
