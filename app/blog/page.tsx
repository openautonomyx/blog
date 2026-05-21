import Link from 'next/link'
import { getAllPosts } from '../../lib/posts'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px' }}>
      <h1 style={{ fontSize: '56px', marginBottom: 16 }}>
        Blog
      </h1>

      <p style={{ color: '#666', marginBottom: 48 }}>
        Articles on AI systems, autonomous agents, infrastructure, and engineering.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        {posts.map((post) => (
          <article
            key={post.slug}
            style={{
              border: '1px solid #ddd',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 style={{ margin: 0, fontSize: 32 }}>
                {post.title}
              </h2>
            </Link>

            <p style={{ marginTop: 12, color: '#666' }}>
              {post.description}
            </p>

            <div style={{ marginTop: 16, fontSize: 14, color: '#888' }}>
              {post.date}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
