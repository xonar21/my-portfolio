import type { APIRoute } from 'astro';
import { kv } from '@vercel/kv';

export const GET: APIRoute = async () => {
	try {
		const today = new Date().toISOString().split('T')[0];
		const fiveMinAgo = Date.now() - 5 * 60 * 1000;

		// Prune stale sessions
		await kv.zremrangebyscore('sessions:active', 0, fiveMinAgo);

		const [onlineNow, todayVisitors, totalVisitors, countriesRaw] =
			await Promise.all([
				kv.zcard('sessions:active'),
				kv.get<number>(`visitors:day:${today}`),
				kv.get<number>('visitors:total'),
				// Top 6 countries sorted by count descending, with scores
				kv.zrange<string[]>('countries', 0, 5, { rev: true, withScores: true }),
			]);

		// zrange withScores returns [member, score, member, score, ...]
		const topCountries: { country: string; count: number }[] = [];
		if (Array.isArray(countriesRaw)) {
			for (let i = 0; i < countriesRaw.length - 1; i += 2) {
				topCountries.push({
					country: countriesRaw[i],
					count: Number(countriesRaw[i + 1]),
				});
			}
		}

		return new Response(
			JSON.stringify({
				onlineNow: onlineNow ?? 0,
				today: todayVisitors ?? 0,
				total: totalVisitors ?? 0,
				topCountries,
			}),
			{ headers: { 'Content-Type': 'application/json' } },
		);
	} catch {
		return new Response(JSON.stringify({ error: 'KV not configured' }), {
			status: 503,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
