// @ts-check
import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

/** На Vercel при сборке выставляется VERCEL=1 — нужен их адаптер. Локально — Node, чтобы работал `astro preview`. */
const useVercel = process.env.VERCEL === '1';

/** Site URL for SEO (canonical URLs, sitemap, hreflang) */
const siteUrl = process.env.PUBLIC_SITE_URL || 'https://janspinu.com';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'server',
  adapter: useVercel ? vercel() : node({ mode: 'standalone' }),
  integrations: [
    solidJs(),
    sitemap({
      // Generate sitemap.xml only for production build
      // Ensures canonical URLs and proper indexing
      changefreq: 'monthly',
      priority: 1.0,
      // Filter out any routes that shouldn't be indexed
      filter: (page) => {
        // Include only /en/ and /ru/ routes
        return page.includes('/en/') || page.includes('/ru/');
      },
    }),
  ],
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
  },
});
