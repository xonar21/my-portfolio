import type { APIRoute } from 'astro';
import { APICallError, generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const prerender = false;

type ChatMessage = { role?: string; content?: string };

function firstNonEmpty(...vals: (string | undefined)[]): string {
	for (const v of vals) {
		if (typeof v === 'string' && v.trim()) return v.trim();
	}
	return '';
}

/**
 * Astro/Vite кладёт переменные из `.env` в `import.meta.env` (не в `process.env` в сбандленном коде).
 * На Vercel и в Node в рантайме ключи также приходят в `process.env`.
 */
function getGeminiApiKey() {
	return firstNonEmpty(
		import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY,
		import.meta.env.GEMINI_API_KEY,
		process.env.GOOGLE_GENERATIVE_AI_API_KEY,
		process.env.GEMINI_API_KEY,
	);
}

/** См. https://ai.google.dev/gemini-api/docs/models — при 404/invalid model задайте GEMINI_MODEL в .env */
const defaultModel = 'gemini-2.5-flash';

function formatProviderError(e: unknown): string {
	if (APICallError.isInstance(e)) {
		const parts = [e.message];
		if (e.statusCode != null) parts.push(`HTTP ${e.statusCode}`);
		if (e.responseBody) {
			const raw = e.responseBody.slice(0, 800);
			parts.push(raw);
		}
		return parts.join(' · ');
	}
	if (e instanceof Error && e.message) return e.message;
	return 'Gemini request failed';
}

function toMessages(raw: ChatMessage[]) {
	const out: { role: 'user' | 'assistant'; content: string }[] = [];
	for (const m of raw) {
		if (m.role !== 'user' && m.role !== 'assistant') continue;
		if (typeof m.content !== 'string' || !m.content.trim()) continue;
		out.push({ role: m.role, content: m.content.trim() });
	}
	return out;
}

export const POST: APIRoute = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const messages = (body as { messages?: ChatMessage[] }).messages;
	if (!Array.isArray(messages) || messages.length === 0) {
		return new Response(JSON.stringify({ error: 'Expected messages[]' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const apiKey = getGeminiApiKey();

	if (!apiKey) {
		const last = messages[messages.length - 1];
		const preview =
			typeof last?.content === 'string' ? last.content.slice(0, 200) : '';
		const mock =
			firstNonEmpty(import.meta.env.CHAT_MOCK_REPLY, process.env.CHAT_MOCK_REPLY) ||
			'Mock: добавьте в .env GOOGLE_GENERATIVE_AI_API_KEY или GEMINI_API_KEY (без PUBLIC_), перезапустите dev.';
		const content = preview
			? `${mock}\n\n(Вы написали: «${preview}${last?.content && last.content.length > 200 ? '…' : ''}»)`
			: mock;
		return new Response(JSON.stringify({ role: 'assistant', content }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const core = toMessages(messages);
	if (core.length === 0) {
		return new Response(JSON.stringify({ error: 'No valid messages' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const modelId =
		firstNonEmpty(import.meta.env.GEMINI_MODEL, process.env.GEMINI_MODEL) ||
		defaultModel;
	const google = createGoogleGenerativeAI({ apiKey });

	try {
		const { text } = await generateText({
			model: google(modelId),
			system:
				'You are a helpful, concise assistant on a software developer portfolio site. Answer in the same language the user writes in. Be factual; if unsure, say so.',
			messages: core,
			maxOutputTokens: 1024,
		});

		return new Response(
			JSON.stringify({ role: 'assistant', content: text ?? '' }),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	} catch (e) {
		const message = formatProviderError(e);
		if (import.meta.env.DEV) {
			console.error('[api/chat]', message, e);
		}
		return new Response(
			JSON.stringify({
				error: message,
				role: 'assistant',
				content: '',
			}),
			{ status: 502, headers: { 'Content-Type': 'application/json' } },
		);
	}
};
