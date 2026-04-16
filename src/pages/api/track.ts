import type { APIRoute } from 'astro';
import { kv } from '@vercel/kv';

export const POST: APIRoute = async ({ request, clientAddress }) => {
	try {
		const country =
			(request.headers.get('x-vercel-ip-country') ?? '').trim() || 'Unknown';
		const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
		const ua = request.headers.get('user-agent') ?? '';

		// Session key — unique per IP + UA (not stored anywhere, just used as KV key)
		const sessionKey = `session:${clientAddress}:${ua.slice(0, 64)}`;
		const dailyKey = `daily:${today}:${clientAddress}`;
		const totalKey = `total:${clientAddress}`;

		// Active sessions sorted set: score = timestamp (ms), member = sessionKey
		const now = Date.now();
		const fiveMinAgo = now - 5 * 60 * 1000;

		await Promise.all([
			// Upsert this session with current timestamp
			kv.zadd('sessions:active', { score: now, member: sessionKey }),
			// Prune sessions older than 5 minutes
			kv.zremrangebyscore('sessions:active', 0, fiveMinAgo),
		]);

		// Unique visitor today
		const isNewToday = await kv.set(dailyKey, 1, { ex: 86400, nx: true });
		if (isNewToday) {
			await kv.incr(`visitors:day:${today}`);
		}

		// Unique visitor all-time
		const isNewTotal = await kv.set(totalKey, 1, { nx: true });
		if (isNewTotal) {
			await kv.incr('visitors:total');
			if (country !== 'Unknown') {
				await kv.zincrby('countries', 1, country);
			}
		}

		return new Response(JSON.stringify({ ok: true }), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch {
		// KV not configured or unavailable — fail silently
		return new Response(JSON.stringify({ ok: false }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
