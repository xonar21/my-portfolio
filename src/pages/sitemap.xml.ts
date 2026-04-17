import type { APIRoute } from 'astro';

const site = 'https://jan-spinu.vercel.app';

interface URLEntry {
  loc: string;
  lastmod: string;
  changefreq: 'monthly' | 'weekly' | 'daily';
  priority: number;
  alternates: { hreflang: string; href: string }[];
}

const generateSitemap = (urls: URLEntry[]): string => {
  const urlEntries = urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${url.alternates.map((alt) => `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`).join('\n    ')}
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
};

const getLastmod = (): string => new Date().toISOString().split('T')[0];

export const GET: APIRoute = async () => {
  const urls: URLEntry[] = [
    {
      loc: `${site}/`,
      lastmod: getLastmod(),
      changefreq: 'monthly',
      priority: 1.0,
      alternates: [
        { hreflang: 'en-US', href: `${site}/en/` },
        { hreflang: 'ru-RU', href: `${site}/ru/` },
        { hreflang: 'x-default', href: `${site}/` },
      ],
    },
    {
      loc: `${site}/en/`,
      lastmod: getLastmod(),
      changefreq: 'monthly',
      priority: 0.9,
      alternates: [
        { hreflang: 'en-US', href: `${site}/en/` },
        { hreflang: 'ru-RU', href: `${site}/ru/` },
        { hreflang: 'x-default', href: `${site}/` },
      ],
    },
    {
      loc: `${site}/ru/`,
      lastmod: getLastmod(),
      changefreq: 'monthly',
      priority: 0.9,
      alternates: [
        { hreflang: 'en-US', href: `${site}/en/` },
        { hreflang: 'ru-RU', href: `${site}/ru/` },
        { hreflang: 'x-default', href: `${site}/` },
      ],
    },
  ];

  const sitemap = generateSitemap(urls);

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Content-Length': sitemap.length.toString(),
    },
  });
};
