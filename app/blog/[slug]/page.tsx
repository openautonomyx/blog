import { notFound } from 'next/navigation'
import { getPostBySlug } from '../../../lib/posts'

export default function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '80px 24px' }}>
      <article>
        <p style={{ color: '#777', marginBottom: 16 }}>
          {post.date} · {post.author}
        </p>

        <h1 style={{ fontSize: '56px', lineHeight: 1, marginBottom: 24 }}>
          {post.title}
        </h1>

        <p style={{ color: '#555', fontSize: 20, lineHeight: 1.7, marginBottom: 40 }}>
          {post.description}
        </p>

        <div
          style={{
            fontSize: 19,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          {post.content}
        </div>
      </article>
    </main>
  )
}
