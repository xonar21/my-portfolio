// @ts-check
import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

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
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          ru: 'ru',
        },
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  }
});
