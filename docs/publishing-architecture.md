# Publishing Architecture

This repository does not currently use an AI agent in the publishing flow.

The current flow is deterministic automation powered by GitHub Issues and GitHub Actions.

## Current Flow

```txt
GitHub issue using the ChatGPT Blog Post template
  ↓
Human adds the `publish` label
  ↓
GitHub Actions runs `.github/workflows/publish-from-issue.yml`
  ↓
`scripts/issue-to-post.mjs` parses the issue
  ↓
The script creates an MDX file in `content/posts`
  ↓
Next.js builds the static blog
  ↓
GitHub Pages deploys the site
```

## Deciding Layer

The deciding layer is currently:

```txt
scripts/issue-to-post.mjs
```

It uses a rules-based taxonomy matcher:

```txt
article title + description + content
  ↓
keyword matching
  ↓
category, tags, wikipediaTopics, seoKeywords
```

This is not an autonomous agent. It does not reason, browse, review quality, or call an LLM.

## Human Approval Layer

The human approval layer is the `publish` label.

A post is only converted into an MDX article when a maintainer manually applies the `publish` label to the GitHub issue.

## Future Agentic Layer

A future agentic publishing layer could add:

- SEO scoring
- duplicate-topic detection
- factuality checks
- title rewriting
- image suggestions
- internal-link recommendations
- schema metadata generation
- human approval before publishing

That would be a separate layer between issue creation and final publish.

Recommended future flow:

```txt
Draft issue
  ↓
AI review agent
  ↓
SEO and taxonomy enrichment
  ↓
Human approval
  ↓
MDX generation
  ↓
GitHub Pages deployment
```
