export default (app) => {
  app.log.info('OpenAutonomyX editorial agent loaded')

  app.on(['issues.opened', 'issues.edited'], async (context) => {
    const issue = context.payload.issue

    if (!issue.title?.toLowerCase().startsWith('blog:')) {
      return
    }

    const body = issue.body || ''
    const wordCount = body.trim().split(/\s+/).filter(Boolean).length

    const recommendations = []

    if (wordCount < 700) {
      recommendations.push('- Expand the article to improve topical authority and SEO depth.')
    }

    if (!/##\s+/.test(body)) {
      recommendations.push('- Add H2 sections for readability and technical SEO.')
    }

    if (!/```/.test(body)) {
      recommendations.push('- Add code or configuration examples where relevant.')
    }

    if (!/\[[^\]]+\]\([^)]+\)/.test(body)) {
      recommendations.push('- Add at least one authoritative reference or internal link.')
    }

    const report = `## Probot Editorial Agent\n\nThis GitHub App automatically reviewed the blog draft.\n\n### Summary\n\n- Word count: ${wordCount}\n- SEO structure: ${/##\s+/.test(body) ? 'Good' : 'Needs improvement'}\n- Code examples: ${/```/.test(body) ? 'Present' : 'Missing'}\n- Links: ${/\[[^\]]+\]\([^)]+\)/.test(body) ? 'Present' : 'Missing'}\n\n### Recommendations\n\n${recommendations.length ? recommendations.join('\n') : '- Looks ready for editorial review.'}\n\n### Publishing\n\nAdd the \`publish\` label when the article is ready to publish.\n`

    await context.octokit.issues.createComment(
      context.issue({
        body: report,
      })
    )
  })
}
