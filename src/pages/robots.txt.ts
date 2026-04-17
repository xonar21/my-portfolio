import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://jan-spinu.vercel.app/sitemap.xml`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
