# OpenAutonomyX Blog

This repository contains the static blog site for **OpenAutonomyX**.

## Live site

The intended GitHub Pages URL is:

https://openautonomyx.github.io/blog/

## Structure

- `index.html` — the blog homepage with starter posts.
- `.github/workflows/pages.yml` — GitHub Actions workflow that publishes the site to GitHub Pages.

## Deployment

This site is configured to deploy with GitHub Actions.

In repository settings, use:

1. **Settings → Pages**
2. **Source:** GitHub Actions

After that, every push to `main` will trigger the Pages deployment workflow.

## Editing posts

For now, posts are listed directly in `index.html`. Edit the `<article>` blocks to add, remove, or update blog posts.
