// @ts-check
import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

/** На Vercel при сборке выставляется VERCEL=1 — нужен их адаптер. Локально — Node, чтобы работал `astro preview`. */
const useVercel = process.env.VERCEL === '1';

// https://astro.build/config
export default defineConfig({
  site: 'https://jan-spinu.vercel.app/',
  output: 'server',
  adapter: useVercel ? vercel() : node({ mode: 'standalone' }),
  integrations: [
    solidJs(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
      changefreq: 'monthly',
      priority: 0.8,
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          ru: 'ru-RU'
        }
      }
    })
  ],
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  }
});
