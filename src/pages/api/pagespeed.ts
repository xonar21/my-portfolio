import type { APIRoute } from 'astro';

// Module-level cache — persists for warm serverless instances
let _cache: { data: unknown; ts: number } | null = null;
const CACHE_MS = 12 * 60 * 60 * 1000; // 12 hours

const SITE_URL = 'https://jan-spinu.vercel.app/';

type RawResult = {
	lighthouseResult?: {
		categories?: {
			performance?: { score: number };
			accessibility?: { score: number };
			'best-practices'?: { score: number };
			seo?: { score: number };
		};
	};
};

function extractScores(r: RawResult) {
	const cats = r?.lighthouseResult?.categories ?? {};
	return {
		performance: Math.round((cats.performance?.score ?? 0) * 100),
		accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
		bestPractices: Math.round((cats['best-practices']?.score ?? 0) * 100),
		seo: Math.round((cats.seo?.score ?? 0) * 100),
	};
}

export const GET: APIRoute = async () => {
	if (_cache && Date.now() - _cache.ts < CACHE_MS) {
		return new Response(JSON.stringify(_cache.data), {
			headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' },
		});
	}

	const apiKey =
		(import.meta.env.PAGESPEED_API_KEY as string | undefined) ??
		process.env.PAGESPEED_API_KEY;

	if (!apiKey) {
		return new Response(
			JSON.stringify({ error: 'PAGESPEED_API_KEY not configured' }),
			{ status: 503, headers: { 'Content-Type': 'application/json' } },
		);
	}

	const base = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(SITE_URL)}&key=${apiKey}`;

	try {
		const [mobileRes, desktopRes] = await Promise.all([
			fetch(`${base}&strategy=mobile`),
			fetch(`${base}&strategy=desktop`),
		]);

		const [mobile, desktop]: [RawResult, RawResult] = await Promise.all([
			mobileRes.json(),
			desktopRes.json(),
		]);

		const data = {
			mobile: extractScores(mobile),
			desktop: extractScores(desktop),
			fetchedAt: new Date().toISOString(),
		};

		_cache = { data, ts: Date.now() };

		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json', 'X-Cache': 'MISS' },
		});
	} catch (err) {
		return new Response(
			JSON.stringify({ error: 'PageSpeed API request failed' }),
			{ status: 502, headers: { 'Content-Type': 'application/json' } },
		);
	}
};
