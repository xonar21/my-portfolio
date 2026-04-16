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

export const POST: APIRoute = async ({ request, clientAddress }) => {
	const redis = getRedis();
	if (!redis) {
		return new Response(JSON.stringify({ ok: false, reason: 'not configured' }), {
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		const country =
			(request.headers.get('x-vercel-ip-country') ?? '').trim() || 'Unknown';
		const today = new Date().toISOString().split('T')[0];
		const ua = request.headers.get('user-agent') ?? '';
		const sessionKey = `session:${clientAddress}:${ua.slice(0, 64)}`;
		const dailyKey = `daily:${today}:${clientAddress}`;
		const totalKey = `total:${clientAddress}`;

		const now = Date.now();
		const fiveMinAgo = now - 5 * 60 * 1000;

		await Promise.all([
			redis.zadd('sessions:active', { score: now, member: sessionKey }),
			redis.zremrangebyscore('sessions:active', 0, fiveMinAgo),
		]);

		const isNewToday = await redis.set(dailyKey, 1, { ex: 86400, nx: true });
		if (isNewToday) {
			await redis.incr(`visitors:day:${today}`);
		}

		const isNewTotal = await redis.set(totalKey, 1, { nx: true });
		if (isNewTotal) {
			await redis.incr('visitors:total');
			if (country !== 'Unknown') {
				await redis.zincrby('countries', 1, country);
			}
		}

		return new Response(JSON.stringify({ ok: true }), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch {
		return new Response(JSON.stringify({ ok: false }), {
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
