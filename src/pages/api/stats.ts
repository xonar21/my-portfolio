import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';

function getRedis() {
	const url =
		(import.meta.env.UPSTASH_REDIS_REST_URL as string | undefined) ??
		process.env.UPSTASH_REDIS_REST_URL;
	const token =
		(import.meta.env.UPSTASH_REDIS_REST_TOKEN as string | undefined) ??
		process.env.UPSTASH_REDIS_REST_TOKEN;
	if (!url || !token) return null;
	return new Redis({ url, token });
}

export const GET: APIRoute = async () => {
	const redis = getRedis();
	if (!redis) {
		return new Response(JSON.stringify({ error: 'not configured' }), {
			status: 503,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		const today = new Date().toISOString().split('T')[0];
		const fiveMinAgo = Date.now() - 5 * 60 * 1000;

		await redis.zremrangebyscore('sessions:active', 0, fiveMinAgo);

		const [onlineNow, todayVisitors, totalVisitors, countriesRaw] =
			await Promise.all([
				redis.zcard('sessions:active'),
				redis.get<number>(`visitors:day:${today}`),
				redis.get<number>('visitors:total'),
				redis.zrange<string[]>('countries', 0, 5, { rev: true, withScores: true }),
			]);

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
		return new Response(JSON.stringify({ error: 'redis error' }), {
			status: 503,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
