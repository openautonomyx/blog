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

function yamlString(value) {
  return String(value || '').replace(/"/g, '\\"')
}

function yamlArray(values) {
  return `[${values.map((value) => `"${yamlString(value)}"`).join(', ')}]`
}

const taxonomy = [
  {
    category: 'Artificial Intelligence Platforms',
    keywords: ['ai', 'artificial intelligence', 'llm', 'large language model', 'agent', 'autonomous agent', 'genai', 'generative ai'],
    tags: ['AI platforms', 'generative AI', 'autonomous agents'],
    topics: ['Artificial intelligence', 'Generative artificial intelligence', 'Large language model'],
  },
  {
    category: 'Cloud Infrastructure and Platform Services',
    keywords: ['cloud', 'kubernetes', 'container', 'serverless', 'platform engineering', 'devops', 'infrastructure'],
    tags: ['cloud infrastructure', 'platform engineering', 'DevOps'],
    topics: ['Cloud computing', 'Kubernetes', 'DevOps'],
  },
  {
    category: 'Identity, Access and Security',
    keywords: ['security', 'authorization', 'authentication', 'identity', 'iam', 'zero trust', 'policy', 'compliance'],
    tags: ['security', 'identity access management', 'zero trust'],
    topics: ['Identity management', 'Zero trust security model', 'Access control'],
  },
  {
    category: 'Data and Analytics',
    keywords: ['data', 'analytics', 'warehouse', 'lakehouse', 'etl', 'pipeline', 'observability', 'metrics'],
    tags: ['data platforms', 'analytics', 'observability'],
    topics: ['Data analysis', 'Data warehouse', 'Observability'],
  },
  {
    category: 'Software Engineering and Developer Tools',
    keywords: ['software', 'developer', 'sdk', 'api', 'ci/cd', 'github actions', 'testing', 'architecture'],
    tags: ['developer tools', 'software architecture', 'CI/CD'],
    topics: ['Software engineering', 'Application programming interface', 'Continuous integration'],
  },
]

const trendingSeoTerms = [
  'AI agents',
  'agentic workflows',
  'enterprise AI',
  'AI infrastructure',
  'cloud-native architecture',
  'platform engineering',
  'developer productivity',
  'AI governance',
  'secure AI systems',
  'automation strategy',
]

function inferTaxonomy(text) {
  const lower = text.toLowerCase()
  const scored = taxonomy
    .map((item) => ({
      ...item,
      score: item.keywords.reduce((score, keyword) => lower.includes(keyword) ? score + 1 : score, 0),
    }))
    .sort((a, b) => b.score - a.score)

  const best = scored[0]?.score > 0 ? scored[0] : taxonomy[0]
  const secondary = scored.filter((item) => item.category !== best.category && item.score > 0).flatMap((item) => item.tags.slice(0, 1))
  const matchedTrending = trendingSeoTerms.filter((term) => lower.includes(term.toLowerCase()))

  return {
    category: best.category,
    tags: Array.from(new Set([...best.tags, ...secondary])).slice(0, 8),
    wikipediaTopics: Array.from(new Set(best.topics)).slice(0, 6),
    seoKeywords: Array.from(new Set([...best.tags, ...matchedTrending, ...trendingSeoTerms.slice(0, 4)])).slice(0, 12),
  }
}

function excerpt(value) {
  return value
    .replace(/[#>*_`\[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 155)
}

const title = section('Post title') || issue.title.replace(/^Blog:\s*/i, '').trim()
const slug = slugify(section('Slug') || title)
const content = section('Blog content') || body
const description = section('Description') || excerpt(content)

if (!title || !slug || !content) {
  throw new Error('Issue must include title, slug, and blog content')
}

const inferred = inferTaxonomy(`${title}\n${description}\n${content}`)

const postsDir = path.join(process.cwd(), 'content', 'posts')
fs.mkdirSync(postsDir, { recursive: true })

const filePath = path.join(postsDir, `${slug}.mdx`)

if (fs.existsSync(filePath)) {
  throw new Error(`Post already exists: ${filePath}`)
}

const today = new Date().toISOString().slice(0, 10)

const frontmatter = `---\ntitle: "${yamlString(title)}"\ndescription: "${yamlString(description)}"\ndate: "${today}"\nauthor: "OpenAutonomyX"\ncategory: "${yamlString(inferred.category)}"\ntags: ${yamlArray(inferred.tags)}\nwikipediaTopics: ${yamlArray(inferred.wikipediaTopics)}\nseoKeywords: ${yamlArray(inferred.seoKeywords)}\ndraft: false\n---\n\n`

fs.writeFileSync(filePath, frontmatter + content + '\n')
console.log(`Created ${filePath}`)
