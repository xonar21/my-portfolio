import { For, Show, createEffect, createSignal, onCleanup } from 'solid-js';

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
			{ key: 'react', label: 'React' },
			{ key: 'next', label: 'Next.js' },
			{ key: 'astro', label: 'Astro' },
			{ key: 'solid', label: 'SolidJS' },
			{ key: 'ts', label: 'TypeScript' },
			{ key: 'tailwind', label: 'Tailwind CSS' },
			{ key: 'vite', label: 'Vite' },
		],
	},
	backend: {
		items: [
			{ key: 'node', label: 'Node.js' },
			{ key: 'go', label: 'Go' },
			{ key: 'python', label: 'Python' },
			{ key: 'rest', label: 'REST APIs' },
			{ key: 'graphql', label: 'GraphQL' },
			{ key: 'postgres', label: 'PostgreSQL' },
			{ key: 'redis', label: 'Redis' },
		],
	},
	uiux: {
		items: [
			{ key: 'figma', label: 'Figma' },
			{ key: 'a11y', label: 'Accessibility' },
			{ key: 'design-tokens', label: 'Design tokens' },
			{ key: 'motion', label: 'Motion UX' },
			{ key: 'storybook', label: 'Storybook' },
		],
	},
	testing: {
		items: [
			{ key: 'jest', label: 'Jest' },
			{ key: 'playwright', label: 'Playwright' },
			{ key: 'cypress', label: 'Cypress' },
			{ key: 'contract', label: 'Contract tests' },
			{ key: 'lighthouse', label: 'Lighthouse' },
		],
	},
	ai: {
		items: [
			{ key: 'llm-api', label: 'LLM APIs' },
			{ key: 'rag', label: 'RAG' },
			{ key: 'embeddings', label: 'Embeddings' },
			{ key: 'agents', label: 'Agent workflows' },
			{ key: 'guardrails', label: 'Guardrails' },
		],
	},
	devops: {
		items: [
			{ key: 'docker', label: 'Docker' },
			{ key: 'ci', label: 'GitHub Actions' },
			{ key: 'vercel', label: 'Vercel' },
			{ key: 'k8s', label: 'Kubernetes' },
			{ key: 'terraform', label: 'Terraform' },
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

function TechIcon(props: { techKey: string }) {
	const k = props.techKey.toLowerCase();
	const box = 'h-9 w-9 shrink-0 text-neutral-600 dark:text-neutral-300';

	if (k === 'react')
		return (
			<svg class={box} viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<circle cx="12" cy="12" r="2" fill="currentColor" />
				<ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.25" />
				<ellipse
					cx="12"
					cy="12"
					rx="10"
					ry="4"
					stroke="currentColor"
					stroke-width="1.25"
					transform="rotate(60 12 12)"
				/>
				<ellipse
					cx="12"
					cy="12"
					rx="10"
					ry="4"
					stroke="currentColor"
					stroke-width="1.25"
					transform="rotate(-60 12 12)"
				/>
			</svg>
		);
	if (k === 'next')
		return (
			<svg class={box} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M11.07 3.27L18 20.73h-2.6l-1.75-4.9H8.45l-1.77 4.9H4.2L11.07 3.27zm.43 8.45L9.2 16.9h4.6l-1.3-3.63-.02-.05-.02.05z" />
			</svg>
		);
	if (k === 'ts')
		return (
			<svg class={box} viewBox="0 0 24 24" aria-hidden="true">
				<rect x="3" y="3" width="18" height="18" rx="4" class="fill-neutral-200 dark:fill-neutral-700" />
				<text
					x="12"
					y="15.5"
					text-anchor="middle"
					font-size="8"
					font-weight="700"
					class="fill-neutral-800 dark:fill-neutral-100"
					font-family="system-ui,sans-serif"
				>
					TS
				</text>
			</svg>
		);
	if (k === 'go')
		return (
			<svg class={box} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M6.5 11.2c.2-1.4 1-2.6 2.2-3.3-.4 1.1-.5 2.3-.2 3.4l.1.4c.2.7.6 1.3 1.1 1.8.6.5 1.3.8 2.1.9h.5c1.2 0 2.3-.5 3.1-1.4.8-.9 1.2-2.1 1-3.3-.2-1.2-.9-2.3-2-3 .9.8 1.4 2 1.4 3.2 0 2.5-2 4.5-4.5 4.5S6 16.5 6 14c0-1 .4-2 .9-2.8z" />
			</svg>
		);
	if (k === 'python')
		return (
			<svg class={box} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M12 2C7.5 2 7 3.8 7 5.5V8h10V5.5C17 3.8 16.5 2 12 2zM7 10v6.5C7 18.2 7.5 20 12 20s5-1.8 5-3.5V10H7z" opacity=".9" />
			</svg>
		);

	return (
		<svg class={box} viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<rect
				x="4"
				y="4"
				width="16"
				height="16"
				rx="3"
				stroke="currentColor"
				stroke-width="1.5"
			/>
			<path
				d="M9 10h6M9 14h4"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
		</svg>
	);
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
		'skills-hub-card group relative flex w-full flex-col rounded-2xl border border-black/10 bg-white/70 text-left shadow-sm outline-none backdrop-blur-md transition-all duration-500 ease-in-out hover:z-[2] hover:scale-[1.02] hover:border-black/15 hover:shadow-[0_0_0_1px_rgba(0,113,227,0.12),0_12px_40px_-16px_rgba(0,113,227,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3] dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-white/20 dark:hover:shadow-[0_0_0_1px_rgba(41,151,255,0.2),0_16px_48px_-16px_rgba(0,0,0,0.65)] dark:focus-visible:outline-[#2997ff]';

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
							<div class="flex flex-col items-center gap-4 text-center">
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
