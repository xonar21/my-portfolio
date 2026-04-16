import { For, Show, createEffect, createSignal, onCleanup } from 'solid-js';
import {
	siVuedotjs, siReact, siAngular, siTypescript, siTailwindcss, siVite, siAstro,
	siGo, siPython, siNodedotjs, siDotnet, siPostgresql, siMongodb,
	siFigma, siStorybook,
	siJest, siCypress, siLighthouse,
	siFastapi, siLangchain,
	siDocker, siGit, siVercel, siKubernetes,
} from 'simple-icons';

/** Локальные id категорий — совпадают с ключами подписей из i18n */
export type CategoryId = 'frontend' | 'backend' | 'uiux' | 'testing' | 'ai' | 'devops';

export type HubLabels = Record<CategoryId, string>;

/**
 * Стек по категориям — дополняйте `items` и при необходимости ключи в `techIcon`.
 */
export const SKILL_HUB_DATA: Record<
	CategoryId,
	{ items: { key: string; label: string }[] }
> = {
	frontend: {
		items: [
			{ key: 'vue', label: 'Vue 3 / Nuxt' },
			{ key: 'react', label: 'React / Next.js' },
			{ key: 'angular', label: 'Angular' },
			{ key: 'ts', label: 'TypeScript' },
			{ key: 'tailwind', label: 'Tailwind CSS' },
			{ key: 'vite', label: 'Vite' },
			{ key: 'astro', label: 'Astro' },
		],
	},
	backend: {
		items: [
			{ key: 'go', label: 'Go (Golang)' },
			{ key: 'python', label: 'Python' },
			{ key: 'node', label: 'Node.js' },
			{ key: 'dotnet', label: '.NET Core' },
			{ key: 'grpc', label: 'gRPC' },
			{ key: 'postgres', label: 'PostgreSQL' },
			{ key: 'mongo', label: 'MongoDB' },
		],
	},
	uiux: {
		items: [
			{ key: 'figma', label: 'Figma' },
			{ key: 'storybook', label: 'Storybook' },
			{ key: 'design-tokens', label: 'Design Tokens' },
			{ key: 'a11y', label: 'Accessibility' },
			{ key: 'motion', label: 'Motion UX' },
		],
	},
	testing: {
		items: [
			{ key: 'playwright', label: 'Playwright' },
			{ key: 'jest', label: 'Jest' },
			{ key: 'cypress', label: 'Cypress' },
			{ key: 'lighthouse', label: 'Lighthouse' },
			{ key: 'contract', label: 'Contract Tests' },
		],
	},
	ai: {
		items: [
			{ key: 'llm-api', label: 'LLM APIs' },
			{ key: 'langchain', label: 'LangChain' },
			{ key: 'agents', label: 'Autonomous Agents' },
			{ key: 'rag', label: 'RAG' },
			{ key: 'fastapi', label: 'FastAPI' },
			{ key: 'embeddings', label: 'Embeddings' },
		],
	},
	devops: {
		items: [
			{ key: 'docker', label: 'Docker' },
			{ key: 'ci', label: 'CI/CD' },
			{ key: 'git', label: 'Git' },
			{ key: 'vercel', label: 'Vercel' },
			{ key: 'k8s', label: 'Kubernetes' },
			{ key: 'observability', label: 'Observability' },
		],
	},
};

const CATEGORY_ORDER: CategoryId[] = [
	'frontend',
	'backend',
	'uiux',
	'testing',
	'ai',
	'devops',
];

function CategoryGlyph(props: { id: CategoryId }) {
	const c = 'h-8 w-8 text-neutral-700 dark:text-neutral-200';
	switch (props.id) {
		case 'frontend':
			return (
				<svg class={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M8 9l4-4 4 4M8 15l4 4 4-4"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			);
		case 'backend':
			return (
				<svg class={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<rect
						x="3"
						y="4"
						width="18"
						height="6"
						rx="1.5"
						stroke="currentColor"
						stroke-width="1.5"
					/>
					<rect
						x="3"
						y="14"
						width="18"
						height="6"
						rx="1.5"
						stroke="currentColor"
						stroke-width="1.5"
					/>
					<circle cx="7" cy="7" r="1" fill="currentColor" />
					<circle cx="7" cy="17" r="1" fill="currentColor" />
				</svg>
			);
		case 'uiux':
			return (
				<svg class={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<rect
						x="4"
						y="4"
						width="16"
						height="16"
						rx="2"
						stroke="currentColor"
						stroke-width="1.5"
					/>
					<path d="M8 10h8M8 14h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			);
		case 'testing':
			return (
				<svg class={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M5 13l4 4L19 7"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			);
		case 'ai':
			return (
				<svg class={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M12 3a6 6 0 00-6 6c0 3 2 5 4 6v3h4v-3c2-1 4-3 4-6a6 6 0 00-6-6z"
						stroke="currentColor"
						stroke-width="1.5"
					/>
					<path d="M9 21h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			);
		case 'devops':
			return (
				<svg class={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M4 7h16M4 12h10M4 17h14"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
					/>
					<circle cx="18" cy="12" r="2" fill="currentColor" />
				</svg>
			);
		default:
			return null;
	}
}

// Brand icons lookup: key → { path, hex } from simple-icons
const BRAND_ICONS: Record<string, { path: string; hex: string }> = {
	vue:       siVuedotjs,
	react:     siReact,
	angular:   siAngular,
	ts:        siTypescript,
	tailwind:  siTailwindcss,
	vite:      siVite,
	astro:     siAstro,
	go:        siGo,
	python:    siPython,
	node:      siNodedotjs,
	dotnet:    siDotnet,
	postgres:  siPostgresql,
	mongo:     siMongodb,
	figma:     siFigma,
	storybook: siStorybook,
	jest:      siJest,
	cypress:   siCypress,
	lighthouse: siLighthouse,
	fastapi:   siFastapi,
	langchain: siLangchain,
	docker:    siDocker,
	git:       siGit,
	vercel:    siVercel,
	k8s:       siKubernetes,
};

function hexLuminance(hex: string): number {
	const r = parseInt(hex.slice(0, 2), 16) / 255;
	const g = parseInt(hex.slice(2, 4), 16) / 255;
	const b = parseInt(hex.slice(4, 6), 16) / 255;
	return 0.299 * r + 0.587 * g + 0.114 * b;
}

function TechIcon(props: { techKey: string }) {
	const k = props.techKey.toLowerCase();
	const sz = 'h-9 w-9 shrink-0';
	const cc = `${sz} text-neutral-600 dark:text-neutral-300`;

	// ── brand icons from simple-icons ─────────────────────────────────────
	const brand = BRAND_ICONS[k];
	if (brand) {
		const dark = hexLuminance(brand.hex) < 0.2; // very dark → invert in dark mode
		return (
			<svg
				viewBox="0 0 24 24"
				class={`${sz}${dark ? ' fill-neutral-900 dark:fill-neutral-100' : ''}`}
				style={dark ? {} : { fill: `#${brand.hex}` }}
				aria-hidden="true"
			>
				<path d={brand.path} />
			</svg>
		);
	}

	// ── custom icons for conceptual / brand-less techs ───────────────────
	switch (k) {

		// gRPC – two boxes connected by bidirectional arrows
		case 'grpc':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<rect x="2" y="9" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
					<rect x="16" y="9" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
					<path d="M8 11h8M8 13h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					<path d="M14 10l2 2-2 2M10 10l-2 2 2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			);

		// Playwright – circle with play triangle (browser test runner)
		case 'playwright':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
					<path d="M10 8.5l5 3.5-5 3.5V8.5z" fill="currentColor" />
				</svg>
			);

		// Design Tokens – four circles linked by connectors
		case 'design-tokens':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<circle cx="7" cy="7" r="2.5" stroke="currentColor" stroke-width="1.5" />
					<circle cx="17" cy="7" r="2.5" stroke="currentColor" stroke-width="1.5" />
					<circle cx="7" cy="17" r="2.5" stroke="currentColor" stroke-width="1.5" />
					<circle cx="17" cy="17" r="2.5" stroke="currentColor" stroke-width="1.5" />
					<path d="M9.5 7h5M7 9.5v5M17 9.5v5M9.5 17h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			);

		// Accessibility – universal access person
		case 'a11y':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<circle cx="12" cy="4.5" r="2" />
					<path d="M7.5 9C9.5 8 11 7.5 12 7.5s2.5.5 4.5 1L15 10l-1 8h-1.5l-.5-4h-1l-.5 4H9l-1-8z" />
				</svg>
			);

		// Motion UX – sine wave / easing curve
		case 'motion':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6-2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			);

		// Contract Tests – document with check
		case 'contract':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" stroke-width="1.5" />
					<path d="M9 8h6M9 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					<path d="M8.5 16.5l1.5 1.5 3.5-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			);

		// LLM APIs – brain with connection nodes
		case 'llm-api':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M12 3C8.5 3 5 5.5 5 9.5c0 1.8.7 3.2 1.8 4.3L6.2 17H9l.5-2h5l.5 2h2.8l-.6-3.2C18.3 12.7 19 11.3 19 9.5 19 5.5 15.5 3 12 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
					<path d="M9 21h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					<path d="M9.5 10h1.5M13 10h1.5M12 8.5V12" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
				</svg>
			);

		// Autonomous Agents – robot head with eyes and smile
		case 'agents':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<rect x="5" y="7" width="14" height="12" rx="3" stroke="currentColor" stroke-width="1.5" />
					<path d="M9 4v3M15 4v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					<circle cx="9.5" cy="13" r="1.25" fill="currentColor" />
					<circle cx="14.5" cy="13" r="1.25" fill="currentColor" />
					<path d="M9.5 16.5c.6.6 1.2.8 2.5.8s1.9-.2 2.5-.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			);

		// RAG – document with magnifying glass (retrieval)
		case 'rag':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<rect x="3" y="3" width="11" height="14" rx="2" stroke="currentColor" stroke-width="1.5" />
					<path d="M6 7h5M6 10h5M6 13h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					<circle cx="18" cy="17.5" r="3" stroke="currentColor" stroke-width="1.5" />
					<path d="M20.5 20l1.8 1.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			);

		// Embeddings – scattered dots with faint connecting lines (vector space)
		case 'embeddings':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<circle cx="4"  cy="5"  r="1.5" opacity="0.5" />
					<circle cx="12" cy="3"  r="1.5" />
					<circle cx="20" cy="7"  r="1.5" opacity="0.7" />
					<circle cx="6"  cy="12" r="1.5" opacity="0.8" />
					<circle cx="15" cy="11" r="1.5" />
					<circle cx="4"  cy="19" r="1.5" opacity="0.6" />
					<circle cx="13" cy="20" r="1.5" opacity="0.9" />
					<circle cx="21" cy="17" r="1.5" opacity="0.5" />
					<path d="M4 5l8-2 8 4M12 3l3 8M6 12l-2 7M15 11l6 6" stroke="currentColor" stroke-width="0.8" opacity="0.3" />
				</svg>
			);

		// CI/CD – circular arrows (continuous loop)
		case 'ci':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M21 12a9 9 0 0 1-14.7 6.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					<path d="M3 12a9 9 0 0 1 14.7-6.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2.5 2" />
					<path d="M19 8.5l2 3.5h-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M5 15.5l-2-3.5h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			);

		// Observability – eye with gauge lines beneath
		case 'observability':
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" stroke="currentColor" stroke-width="1.5" />
					<circle cx="12" cy="12" r="2.75" stroke="currentColor" stroke-width="1.5" />
					<path d="M8 19.5l1-3M16 19.5l-1-3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
				</svg>
			);

		// fallback
		default:
			return (
				<svg class={cc} viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.5" />
					<path d="M9 10h6M9 14h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			);
	}
}

export default function SkillsShowcase(props: {
	labels: HubLabels;
	closeLabel: string;
	stackLabel: string;
}) {
	const [activeCategory, setActiveCategory] = createSignal<CategoryId | null>(null);
	const [isMobile, setIsMobile] = createSignal(false);
	let rootRef: HTMLDivElement | undefined;

	const isExpanded = (id: CategoryId) => activeCategory() === id;
	const isDimmed = (id: CategoryId) => activeCategory() !== null && activeCategory() !== id;

	const toggle = (id: CategoryId) => {
		setActiveCategory((c) => (c === id ? null : id));
	};

	createEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setActiveCategory(null);
		};
		const onPointerDown = (e: PointerEvent) => {
			const t = e.target as Node;
			if (rootRef && !rootRef.contains(t)) setActiveCategory(null);
		};
		window.addEventListener('keydown', onKey);
		document.addEventListener('pointerdown', onPointerDown, true);
		onCleanup(() => {
			window.removeEventListener('keydown', onKey);
			document.removeEventListener('pointerdown', onPointerDown, true);
		});
	});

	createEffect(() => {
		if (typeof window === 'undefined') return;
		const mq = window.matchMedia('(max-width: 767px)');
		const sync = () => setIsMobile(mq.matches);
		sync();
		const onChange = () => sync();
		mq.addEventListener('change', onChange);
		onCleanup(() => mq.removeEventListener('change', onChange));
	});

	const cardBase =
		'skills-hub-card group relative flex w-full flex-col items-center rounded-2xl border border-black/10 bg-white/70 text-center shadow-sm outline-none backdrop-blur-md transition-all duration-500 ease-in-out hover:z-[2] hover:scale-[1.02] hover:border-black/15 hover:shadow-[0_0_0_1px_rgba(0,113,227,0.12),0_12px_40px_-16px_rgba(0,113,227,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3] dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-white/20 dark:hover:shadow-[0_0_0_1px_rgba(41,151,255,0.2),0_16px_48px_-16px_rgba(0,0,0,0.65)] dark:focus-visible:outline-[#2997ff]';

	return (
		<div
			ref={(el) => {
				rootRef = el;
			}}
			class="skills-hub relative z-20 mt-10 grid grid-cols-2 gap-4 overflow-visible md:grid-cols-3 md:gap-5"
			id="skills-hub-root"
		>
			<For each={CATEGORY_ORDER}>
				{(id, idx) => (
					<div
						class="reveal-ov relative min-w-0"
						classList={{
							'z-30': isExpanded(id),
							'z-0': !isExpanded(id),
						}}
						style={{ '--reveal-delay': `${idx() * 55}ms` }}
					>
						<button
							type="button"
							class={`${cardBase} min-h-[9rem] p-6 opacity-100`}
							classList={{
								'border-[#0071e3]/25 ring-1 ring-[#0071e3]/15 dark:border-[#2997ff]/30 dark:ring-[#2997ff]/20':
									isExpanded(id),
								'pointer-events-auto opacity-[0.42]': isDimmed(id),
							}}
							aria-expanded={isExpanded(id)}
							aria-controls={`skills-hub-panel-${id}`}
							onClick={() => toggle(id)}
						>
							<div class="flex w-full flex-col items-center gap-4 text-center">
								<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100/90 dark:bg-white/10">
									<CategoryGlyph id={id} />
								</div>
								<span class="text-[15px] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-neutral-100 md:text-[16px]">
									{props.labels[id]}
								</span>
							</div>
						</button>

						<Show when={isExpanded(id)}>
							<Show
								when={isMobile()}
								fallback={
									<div class="pointer-events-none absolute inset-0 z-[25] overflow-visible">
										<div
											class="pointer-events-auto absolute left-1/2 top-[calc(50%+2.95rem)] w-[min(34rem,calc(100vw-2.5rem))] -translate-x-1/2 rounded-2xl border border-[#0071e3]/25 bg-white p-5 shadow-[0_0_0_1px_rgba(0,113,227,0.15),0_24px_64px_-24px_rgba(0,113,227,0.35)] backdrop-blur-xl transition-all duration-500 ease-in-out dark:border-[#2997ff]/35 dark:bg-neutral-900 dark:shadow-[0_0_0_1px_rgba(41,151,255,0.2),0_28px_72px_-24px_rgba(0,0,0,0.8)] md:p-6"
											id={`skills-hub-panel-${id}`}
											role="region"
											aria-label={props.labels[id]}
										>
											<div class="flex flex-col gap-5">
												<div class="flex items-start justify-between gap-4">
													<div class="flex items-center gap-3">
														<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100/90 dark:bg-white/10">
															<CategoryGlyph id={id} />
														</div>
														<div>
															<p class="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
																{props.stackLabel}
															</p>
															<h3 class="text-base font-semibold tracking-[-0.02em] text-neutral-950 dark:text-neutral-50 md:text-lg">
																{props.labels[id]}
															</h3>
														</div>
													</div>
													<button
														type="button"
														class="inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-[12px] font-medium text-neutral-700 shadow-sm transition-[box-shadow] duration-300 hover:shadow-md dark:border-white/15 dark:bg-white/10 dark:text-neutral-200 dark:hover:shadow-black/50"
														aria-label={props.closeLabel}
														onClick={() => setActiveCategory(null)}
													>
														{props.closeLabel}
													</button>
												</div>
												<ul class="grid grid-cols-1 gap-2.5 sm:grid-cols-2" role="list">
													<For each={SKILL_HUB_DATA[id].items}>
														{(item) => (
															<li>
																<div class="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-neutral-800">
																	<TechIcon techKey={item.key} />
																	<span class="text-[13px] font-medium leading-snug text-neutral-800 dark:text-neutral-200">
																		{item.label}
																	</span>
																</div>
															</li>
														)}
													</For>
												</ul>
											</div>
										</div>
									</div>
								}
							>
								<div class="fixed inset-x-0 bottom-24 top-[7.25rem] z-[80] flex items-stretch justify-center px-3 pb-3">
									<button
										type="button"
										class="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
										aria-label={props.closeLabel}
										onClick={() => setActiveCategory(null)}
									/>
									<div
										class="relative z-[1] max-h-full w-full max-w-sm overflow-auto rounded-2xl border border-[#0071e3]/25 bg-white p-4 shadow-[0_0_0_1px_rgba(0,113,227,0.15),0_28px_72px_-24px_rgba(0,113,227,0.35)] transition-all duration-500 ease-in-out dark:border-[#2997ff]/35 dark:bg-neutral-900 dark:shadow-[0_0_0_1px_rgba(41,151,255,0.2),0_28px_72px_-20px_rgba(0,0,0,0.82)]"
										id={`skills-hub-panel-${id}`}
										role="dialog"
										aria-modal="true"
										aria-label={props.labels[id]}
									>
										<div class="flex flex-col gap-4">
											<div class="flex items-start justify-between gap-3">
												<div class="flex items-center gap-3">
													<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100/90 dark:bg-white/10">
														<CategoryGlyph id={id} />
													</div>
													<h3 class="text-base font-semibold tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
														{props.labels[id]}
													</h3>
												</div>
												<button
													type="button"
													class="inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-[12px] font-medium text-neutral-700 shadow-sm transition-[box-shadow] duration-300 hover:shadow-md dark:border-white/15 dark:bg-white/10 dark:text-neutral-200 dark:hover:shadow-black/50"
													aria-label={props.closeLabel}
													onClick={() => setActiveCategory(null)}
												>
													{props.closeLabel}
												</button>
											</div>
											<ul class="space-y-2.5 pr-1" role="list">
												<For each={SKILL_HUB_DATA[id].items}>
													{(item) => (
														<li>
															<div class="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-neutral-800">
																<TechIcon techKey={item.key} />
																<span class="text-[13px] font-medium leading-snug text-neutral-800 dark:text-neutral-200">
																	{item.label}
																</span>
															</div>
														</li>
													)}
												</For>
											</ul>
										</div>
									</div>
								</div>
							</Show>
						</Show>
					</div>
				)}
			</For>
		</div>
	);
}
