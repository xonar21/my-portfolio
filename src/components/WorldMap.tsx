import { createSignal, createEffect, For, Show } from 'solid-js';

type CountryData = { country: string; count: number };

type Location = { id: string; name: string; path: string };
type WorldData = { viewBox: string; locations: Location[] };

// Lazy-load world SVG data only when map tab is opened
let _worldCache: WorldData | null = null;
async function loadWorld(): Promise<WorldData> {
	if (_worldCache) return _worldCache;
	const mod = await import('@svg-maps/world');
	_worldCache = (mod.default ?? mod) as WorldData;
	return _worldCache;
}

// Logarithmic color interpolation: 0 = empty, 1 = max
function interpolateBlue(t: number): string {
	// light blue → vivid blue
	const r = Math.round(219 - t * (219 - 29));
	const g = Math.round(234 - t * (234 - 78));
	const b = Math.round(254 - t * (254 - 216));
	return `rgb(${r},${g},${b})`;
}

export default function WorldMap(props: { countries: CountryData[] }) {
	const [world, setWorld] = createSignal<WorldData | null>(null);
	const [tooltip, setTooltip] = createSignal<{
		name: string;
		count: number;
		x: number;
		y: number;
	} | null>(null);

	createEffect(() => {
		loadWorld().then(setWorld);
	});

	// Build lookup: lowercase country code → count
	const countMap = () => {
		const m = new Map<string, number>();
		for (const c of props.countries) m.set(c.country.toLowerCase(), c.count);
		return m;
	};

	const maxCount = () => Math.max(...props.countries.map((c) => c.count), 1);

	function fillFor(id: string) {
		const count = countMap().get(id) ?? 0;
		if (count === 0) return undefined; // use CSS var
		const t = Math.log1p(count) / Math.log1p(maxCount());
		return interpolateBlue(t);
	}

	function handleMove(e: MouseEvent, loc: Location) {
		const count = countMap().get(loc.id) ?? 0;
		if (count === 0) { setTooltip(null); return; }
		setTooltip({ name: loc.name, count, x: e.clientX, y: e.clientY });
	}

	function handleTouch(e: TouchEvent, loc: Location) {
		const count = countMap().get(loc.id) ?? 0;
		if (count === 0) return;
		const t = e.touches[0];
		setTooltip({ name: loc.name, count, x: t.clientX, y: t.clientY });
		setTimeout(() => setTooltip(null), 2000);
	}

	return (
		<div class="relative mt-6 w-full select-none overflow-hidden rounded-2xl border border-black/5 bg-white/60 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
			<Show
				when={world()}
				fallback={
					<div class="flex h-48 items-center justify-center">
						<div class="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-[#0071e3] dark:border-neutral-600 dark:border-t-[#2997ff]" />
					</div>
				}
			>
				<svg
					viewBox={world()!.viewBox}
					class="w-full"
					aria-label="World visitor map"
					onMouseLeave={() => setTooltip(null)}
				>
					<For each={world()!.locations}>
						{(loc) => {
							const fill = fillFor(loc.id);
							return (
								<path
									d={loc.path}
									fill={fill ?? 'var(--map-empty, #e5e7eb)'}
									class={
										fill
											? 'cursor-pointer transition-opacity duration-150 hover:opacity-75 dark:[--map-empty:#374151]'
											: 'dark:[--map-empty:#374151]'
									}
									stroke="var(--map-stroke, #fff)"
									stroke-width="0.4"
									onMouseMove={(e) => handleMove(e, loc)}
									onMouseLeave={() => setTooltip(null)}
									onTouchStart={(e) => handleTouch(e, loc)}
									aria-label={`${loc.name}${(countMap().get(loc.id) ?? 0) > 0 ? `: ${countMap().get(loc.id)} visitors` : ''}`}
								/>
							);
						}}
					</For>
				</svg>

				{/* Tooltip */}
				<Show when={tooltip()}>
					{(tip) => (
						<div
							class="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-xl border border-black/5 bg-white px-3 py-2 text-[13px] shadow-lg dark:border-white/10 dark:bg-neutral-900"
							style={{ left: `${tip().x}px`, top: `${tip().y - 8}px` }}
						>
							<span class="font-semibold text-neutral-900 dark:text-neutral-100">
								{tip().name}
							</span>
							<span class="ml-2 tabular-nums text-neutral-500">
								{tip().count.toLocaleString()}
							</span>
						</div>
					)}
				</Show>

				{/* Legend */}
				<div class="mt-3 flex items-center justify-end gap-2">
					<span class="text-[11px] text-neutral-400">0</span>
					<div
						class="h-2 w-24 rounded-full"
						style="background: linear-gradient(to right, #dbeefc, #1d4ed8)"
					/>
					<span class="text-[11px] text-neutral-400">max</span>
				</div>
			</Show>
		</div>
	);
}
