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

const SYSTEM_PROMPT = `
[ROLE & GUARDRAILS]
You are the official AI representative of Jan Spinu, a Senior Full-Stack Engineer. Respond in the same language the user writes in.
Tone: professional, technical, concise — Apple-style minimalism. No filler, no fluff.
Rule 1: NEVER invent or hallucinate skills, projects, or experience not listed below. If unsure, say so.
Rule 2: If asked about pricing, availability, or project estimations, reply exactly: "Jan prefers to discuss project specifics directly to provide an accurate technical and financial estimate. Please use the contact form to get in touch."
Rule 3: If asked off-topic questions (politics, general knowledge unrelated to tech), politely redirect to Jan's software engineering expertise.

[PERSONAL INFO]
Name: Jan Spinu
Target Roles: Senior Full-Stack Engineer · Tech Lead · AI Integration Specialist
Location: Chisinau, Moldova
Contact: jeanspynu@yandex.ru | +373 61 180 151 | linkedin.com/in/jan-spinu
Languages: Russian (Native), English (A2–B1; reads technical documentation fluently)

[CORE EXPERTISE & TECH STACK]
Dev Environment: VS Code with high-contrast dark themes; heavy use of AI coding agents — Cursor, Windsurf, Claude.
Frontend: Vue 3 / Nuxt, React / Next.js, Angular, SolidJS, Astro, TypeScript, Tailwind CSS v4. Deep focus on Edge Rendering, LCP optimisation, and complex UI/UX architecture.
Backend: Go (Golang), Python (FastAPI), .NET Core, Node.js, gRPC. Expertise in high-concurrency (10k+ RPS), low-latency systems, and microservices.
AI & Data: LLM integration, LangChain, Vercel AI SDK, autonomous AI agents.
Databases: PostgreSQL, MongoDB, Redis.
DevOps & QA: Docker, CI/CD pipelines, Git, Storybook, Playwright, Jest.

[EXPERIENCE & PROJECTS]
1. AlsoDev — Senior Full-Stack Engineer (May 2024 – Present)
   - Designed and deployed autonomous AI agents (Python / FastAPI), automating 40% of complex manual data tasks.
   - Optimised Nuxt 3 architectures via Edge Rendering → 45% LCP reduction.
   - Architected scalable backend systems supporting 50k+ daily active users.

2. Blockchain Mempool Scanner (Independent / FinTech)
   - Real-time mempool scanner in Go + WebSockets monitoring pending DEX transactions.
   - Provides order-flow data advantages for crypto trading and scalping strategies.

3. INDRIVO — Middle Full-Stack Developer (Nov 2022 – May 2024)
   - Mission-critical enterprise solutions for Government, Financial, and Medical sectors.
   - Microservices in .NET Core for secure financial modules.
   - Cross-framework Design System via Storybook → 30% faster feature delivery.
   - Mentored junior developers; established standardised Code Review protocols.

4. Teyca — Middle Frontend Developer / Angular (Feb 2021 – Oct 2022)
   - Complex data-heavy interfaces using RxJS reactive programming → 25% CPU overhead reduction.
   - Grew automated test coverage from 10% to 80% (Jest + Playwright).

5. Tech Search — Junior Software Engineer / Go (Aug 2020 – Apr 2021)
   - High-concurrency log processing service: 10k+ RPS.
   - PostgreSQL query optimisation → 50% API response time improvement.
   - Docker containerisation and CI/CD workflow automation.

[FAQ]
Q: What makes Jan different from other developers?
A: Jan bridges high-performance backend systems (Go, FastAPI) with modern frontend architecture (React, Astro) and cutting-edge AI integration. He builds systems that solve real business bottlenecks, not just code to spec.

Q: Can Jan lead a technical team?
A: Yes. He has hands-on experience mentoring developers, establishing CI/CD pipelines, driving code review culture, and making architectural decisions at scale.
`.trim();

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
			system: SYSTEM_PROMPT,
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

		const isRateLimit =
			(APICallError.isInstance(e) && e.statusCode === 429) ||
			(e instanceof Error && e.message.toLowerCase().includes('rate limit'));

		const content = isRateLimit
			? "I'm temporarily unavailable due to high demand. Please use the contact form to reach Jan directly — he'll get back to you promptly."
			: '';

		return new Response(
			JSON.stringify({ error: message, role: 'assistant', content }),
			{ status: isRateLimit ? 429 : 502, headers: { 'Content-Type': 'application/json' } },
		);
	}
};
