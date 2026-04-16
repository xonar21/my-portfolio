import { createSignal, onMount, onCleanup, Show, For, lazy } from 'solid-js';

const WorldMap = lazy(() => import('./WorldMap'));

type StatsData = {
	onlineNow: number;
	today: number;
	total: number;
	topCountries: { country: string; count: number }[];
};

type Labels = {
	labelOnline: string;
	labelToday: string;
	labelTotal: string;
	labelRegions: string;
	loading: string;
	noData: string;
};

function flag(code: string) {
	if (!code || code.length !== 2) return '🌐';
	return String.fromCodePoint(
		...Array.from(code.toUpperCase()).map((c) => 0x1f1e6 - 65 + c.charCodeAt(0)),
	);
}

const COUNTRY_NAMES: Record<string, string> = {
	US: 'United States', RU: 'Russia', DE: 'Germany', GB: 'United Kingdom',
	FR: 'France', UA: 'Ukraine', PL: 'Poland', NL: 'Netherlands',
	TR: 'Turkey', IT: 'Italy', ES: 'Spain', CA: 'Canada', AU: 'Australia',
	MD: 'Moldova', RO: 'Romania', BY: 'Belarus', KZ: 'Kazakhstan',
	IN: 'India', CN: 'China', JP: 'Japan', BR: 'Brazil', MX: 'Mexico',
	SE: 'Sweden', NO: 'Norway', FI: 'Finland', DK: 'Denmark', CH: 'Switzerland',
	AT: 'Austria', BE: 'Belgium', CZ: 'Czech Republic', SK: 'Slovakia',
	HU: 'Hungary', PT: 'Portugal', GR: 'Greece', IL: 'Israel', AE: 'UAE',
};
function countryName(code: string) {
	return COUNTRY_NAMES[code.toUpperCase()] ?? code;
}

function StatCard(props: { value: number | string; label: string; dot?: string }) {
	return (
		<div class="flex flex-col items-center gap-1 rounded-2xl border border-black/5 bg-white/60 p-5 text-center backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
			<Show when={props.dot}>
				<span
					class="mb-1 inline-block h-2 w-2 animate-pulse rounded-full"
					style={`background:${props.dot}`}
				/>
			</Show>
			<span class="text-[28px] font-semibold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-100">
				{typeof props.value === 'number' ? props.value.toLocaleString() : props.value}
			</span>
			<span class="text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
				{props.label}
			</span>
		</div>
	);
}

type View = 'list' | 'map';

export default function VisitorStats(props: { labels: Labels }) {
	const [data, setData] = createSignal<StatsData | null>(null);
	const [loading, setLoading] = createSignal(true);
	const [unavailable, setUnavailable] = createSignal(false);
	const [view, setView] = createSignal<View>('list');

	const fetchStats = async () => {
		try {
			const res = await fetch('/api/stats');
			const json = await res.json();
			if (json.error) { setUnavailable(true); return; }
			setData(json as StatsData);
		} catch {
			setUnavailable(true);
		} finally {
			setLoading(false);
		}
	};

	onMount(() => {
		fetch('/api/track', { method: 'POST' }).catch(() => {});
		fetchStats();
		const id = setInterval(fetchStats, 30_000);
		onCleanup(() => clearInterval(id));
	});

	return (
		<Show when={!unavailable()} fallback={null}>
			<Show when={loading()}>
				<div class="mt-10 flex h-16 items-center gap-2 text-[14px] text-neutral-400">
					<div class="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-[#0071e3] dark:border-neutral-600 dark:border-t-[#2997ff]" />
					{props.labels.loading}
				</div>
			</Show>

			<Show when={!loading() && data()}>
				<div class="mt-10 space-y-6">
					{/* Stat cards */}
					<div class="grid grid-cols-3 gap-3 sm:gap-4">
						<StatCard value={data()!.onlineNow} label={props.labels.labelOnline} dot="#22c55e" />
						<StatCard value={data()!.today} label={props.labels.labelToday} />
						<StatCard value={data()!.total} label={props.labels.labelTotal} />
					</div>

					{/* View toggle */}
					<Show when={data()!.topCountries.length > 0}>
						<div class="flex items-center justify-between">
							<p class="text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
								{props.labels.labelRegions}
							</p>
							<div class="inline-flex rounded-full border border-black/8 bg-neutral-100/60 p-0.5 dark:border-white/10 dark:bg-white/[0.06]">
								{(['list', 'map'] as View[]).map((v) => (
									<button
										type="button"
										onClick={() => setView(v)}
										class={`rounded-full px-3 py-1 text-[12px] font-medium transition-all duration-200 ${
											view() === v
												? 'bg-white text-neutral-900 shadow-sm dark:bg-white/15 dark:text-neutral-100'
												: 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
										}`}
									>
										{v === 'list' ? '≡ List' : '🌍 Map'}
									</button>
								))}
							</div>
						</div>

						{/* List view */}
						<Show when={view() === 'list'}>
							<div class="rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
								<ul class="space-y-2.5">
									<For each={data()!.topCountries}>
										{(item) => {
											const max = data()!.topCountries[0].count;
											const pct = Math.round((item.count / max) * 100);
											return (
												<li class="flex items-center gap-3">
													<span class="text-xl">{flag(item.country)}</span>
													<div class="min-w-0 flex-1">
														<div class="mb-1 flex items-baseline justify-between gap-2">
															<span class="truncate text-[13px] font-medium text-neutral-800 dark:text-neutral-200">
																{countryName(item.country)}
															</span>
															<span class="shrink-0 text-[12px] tabular-nums text-neutral-500 dark:text-neutral-400">
																{item.count.toLocaleString()}
															</span>
														</div>
														<div class="h-1 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700">
															<div
																class="h-full rounded-full bg-[#0071e3] dark:bg-[#2997ff]"
																style={`width:${pct}%`}
															/>
														</div>
													</div>
												</li>
											);
										}}
									</For>
								</ul>
							</div>
						</Show>

						{/* Map view — lazy loaded */}
						<Show when={view() === 'map'}>
							<WorldMap countries={data()!.topCountries} />
						</Show>
					</Show>
				</div>
			</Show>
		</Show>
	);
}
