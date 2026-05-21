export const metadata = {
  title: 'OpenAutonomyX Blog',
  description: 'AI systems, autonomous agents, infrastructure, and engineering insights.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
