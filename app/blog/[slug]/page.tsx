import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '../../../lib/posts'

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '80px 24px' }}>
      <article>
        <h1 style={{ fontSize: '64px', lineHeight: 1, marginBottom: 24 }}>
          {post.title}
        </h1>

        <div style={{ color: '#777', marginBottom: 40 }}>
          {post.date}
        </div>

        <div
          style={{
            fontSize: 20,
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
