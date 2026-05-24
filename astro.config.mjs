import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

export default defineConfig({
  integrations: [mdx()],
  site: 'https://blog.openautonomyx.com',
})
