# OpenAutonomyX Probot Editorial Agent

This directory contains a Probot-based GitHub App for editorial review automation.

## What It Does

When a GitHub issue with a title starting with:

```txt
Blog:
```

is opened or edited, the Probot app:

- reviews the draft
- checks SEO structure
- checks article depth
- checks for headings
- checks for code examples
- checks for links
- comments editorial recommendations back onto the issue

Publishing still requires the `publish` label.

## Local Development

Install dependencies:

```bash
cd probot-editorial-agent
npm install
```

Run locally:

```bash
npm start
```

## GitHub App Setup

1. Go to GitHub Developer Settings
2. Create a new GitHub App
3. Configure webhook events:

- Issues
- Issue comments

4. Install the app on the repository

## Future Improvements

- LLM-powered editorial review
- SEO scoring
- duplicate-topic detection
- automatic internal linking
- title rewriting suggestions
- AI-generated social snippets
- schema.org metadata generation
