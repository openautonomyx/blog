import fs from 'node:fs'
import path from 'node:path'

const issuePath = process.env.ISSUE_EVENT_PATH

if (!issuePath) {
  throw new Error('ISSUE_EVENT_PATH is required')
}

const event = JSON.parse(fs.readFileSync(issuePath, 'utf8'))
const issue = event.issue

if (!issue) {
  throw new Error('No issue found in event payload')
}

const body = issue.body || ''

function section(label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`### ${escaped}\\s*\\n+([\\s\\S]*?)(?=\\n### |$)`, 'i')
  const match = body.match(regex)
  return match ? match[1].trim() : ''
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const title = section('Post title') || issue.title.replace(/^Blog:\s*/i, '').trim()
const slug = slugify(section('Slug') || title)
const description = section('Description') || ''
const content = section('Blog content') || body

if (!title || !slug || !content) {
  throw new Error('Issue must include title, slug, and blog content')
}

const postsDir = path.join(process.cwd(), 'content', 'posts')
fs.mkdirSync(postsDir, { recursive: true })

const filePath = path.join(postsDir, `${slug}.mdx`)

if (fs.existsSync(filePath)) {
  throw new Error(`Post already exists: ${filePath}`)
}

const today = new Date().toISOString().slice(0, 10)

const frontmatter = `---\ntitle: "${title.replace(/"/g, '\\"')}"\ndescription: "${description.replace(/"/g, '\\"')}"\ndate: "${today}"\nauthor: "OpenAutonomyX"\ndraft: false\n---\n\n`

fs.writeFileSync(filePath, frontmatter + content + '\n')
console.log(`Created ${filePath}`)
