import { defineMiddleware } from 'astro:middleware';

const SUPPORTED_LANGUAGES = ['en', 'ru'];
const DEFAULT_LANGUAGE = 'en';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Only redirect from root path
  if (pathname === '/' || pathname === '') {
    const acceptLanguage = context.request.headers.get('accept-language') || '';
    const userAgent = context.request.headers.get('user-agent') || '';

    // Detect preferred language from Accept-Language header
    const preferredLanguage = parseAcceptLanguage(acceptLanguage);
    const targetLanguage = SUPPORTED_LANGUAGES.includes(preferredLanguage)
      ? preferredLanguage
      : DEFAULT_LANGUAGE;

    // Use 301 for SEO-friendly permanent redirect
    return context.redirect(`/${targetLanguage}/`, 301);
  }

  return next();
});

function parseAcceptLanguage(header: string): string {
  if (!header) return DEFAULT_LANGUAGE;

  // Parse Accept-Language header: en-US,en;q=0.9,ru;q=0.8
  const languages = header
    .split(',')
    .map((lang) => {
      const [code, q] = lang.split(';');
      const priority = q ? parseFloat(q.replace('q=', '')) : 1;
      // Extract primary language code (en from en-US)
      const primary = code.trim().split('-')[0].toLowerCase();
      return { code: primary, priority };
    })
    .sort((a, b) => b.priority - a.priority);

  for (const lang of languages) {
    if (SUPPORTED_LANGUAGES.includes(lang.code)) {
      return lang.code;
    }
  }

  return DEFAULT_LANGUAGE;
}
