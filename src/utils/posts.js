import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return []

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const source = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(source)

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || '',
        author: data.author || 'OpenAutonomyX',
        category: data.category || 'Engineering',
        tags: data.tags || [],
        content,
      }
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
}

export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug)
}
