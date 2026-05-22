# OpenAutonomyX Blog

This repository contains the Astro blog site for **OpenAutonomyX**.

## Live site

The intended production URL is:

https://blog.openautonomyx.com/

## Structure

- `src/pages/index.astro` — homepage.
- `src/pages/blog/index.astro` — blog listing page.
- `src/pages/blog/[slug].astro` — blog article route.
- `.github/workflows/deploy.yml` — GitHub Actions workflow that builds Astro and publishes `dist` to GitHub Pages.

## Deployment

This site is configured to deploy with GitHub Actions.

In repository settings, use:

1. **Settings → Pages**
2. **Source:** GitHub Actions

Every push to `main` triggers the Astro deployment workflow.

## Editing posts

Update `src/pages/blog/index.astro` for visible blog cards and add article content under `content/posts` or Astro routes.

Deploy refresh: 2026-05-22.
