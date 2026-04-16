import { createSignal, onMount, Show, For } from 'solid-js';

type Scores = {
	performance: number;
	accessibility: number;
	bestPractices: number;
	seo: number;
};

type PageSpeedData = {
	mobile: Scores;
	desktop: Scores;
	fetchedAt: string;
};

type Labels = {
	lead: string;
	tabMobile: string;
	tabDesktop: string;
	labelPerformance: string;
	labelAccessibility: string;
	labelBestPractices: string;
	labelSeo: string;
	lastChecked: string;
	refresh: string;
	loading: string;
	noKey: string;
};

// SVG gauge constants
const R = 36;
const CIRC = 2 * Math.PI * R;

function scoreColor(s: number) {
	if (s >= 90) return '#22c55e';
	if (s >= 50) return '#f97316';
	return '#ef4444';
}

function scoreLabel(s: number) {
	if (s >= 90) return 'text-green-500';
	if (s >= 50) return 'text-orange-500';
	return 'text-red-500';
}

function formatRelative(iso: string) {
	const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
	if (diff < 1) return '< 1 min ago';
	if (diff < 60) return `${diff} min ago`;
	const h = Math.floor(diff / 60);
	return `${h}h ago`;
}

function ScoreGauge(props: { score: number; label: string }) {
	const offset = () => CIRC * (1 - props.score / 100);
	return (
		<div class="flex flex-col items-center gap-2">
			<div class="relative h-[88px] w-[88px]">
				<svg viewBox="0 0 88 88" class="h-full w-full -rotate-90" aria-hidden="true">
					<circle
						cx="44" cy="44" r={R}
						fill="none"
						stroke="currentColor"
						stroke-width="7"
						class="text-neutral-200 dark:text-neutral-700"
					/>
					<circle
						cx="44" cy="44" r={R}
						fill="none"
						stroke={scoreColor(props.score)}
						stroke-width="7"
						stroke-linecap="round"
						stroke-dasharray={`${CIRC}`}
						stroke-dashoffset={`${offset()}`}
						style="transition: stroke-dashoffset 0.7s cubic-bezier(.4,0,.2,1)"
					/>
				</svg>
				<div class="absolute inset-0 flex items-center justify-center">
					<span class={`text-[18px] font-bold tabular-nums ${scoreLabel(props.score)}`}>
						{props.score}
					</span>
				</div>
			</div>
			<span class="max-w-[80px] text-center text-[11px] font-medium leading-snug text-neutral-500 dark:text-neutral-400">
				{props.label}
			</span>
		</div>
	);
}

export default function PageSpeedSection(props: { labels: Labels }) {
	const [data, setData] = createSignal<PageSpeedData | null>(null);
	const [loading, setLoading] = createSignal(true);
	const [error, setError] = createSignal<string | null>(null);
	const [tab, setTab] = createSignal<'mobile' | 'desktop'>('mobile');

	const fetchData = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch('/api/pagespeed');
			const json = await res.json();
			if (json.error) throw new Error(json.error);
			setData(json as PageSpeedData);
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Error');
		} finally {
			setLoading(false);
		}
	};

	onMount(fetchData);

	const scores = () => {
		const d = data();
		if (!d) return null;
		return tab() === 'mobile' ? d.mobile : d.desktop;
	};

	const scoreEntries = () => {
		const s = scores();
		if (!s) return [];
		return [
			{ score: s.performance, label: props.labels.labelPerformance },
			{ score: s.accessibility, label: props.labels.labelAccessibility },
			{ score: s.bestPractices, label: props.labels.labelBestPractices },
			{ score: s.seo, label: props.labels.labelSeo },
		];
	};

	return (
		<div class="mt-10 max-w-2xl rounded-3xl border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
			{/* Lead + Google branding */}
			<p class="mb-6 text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
				{props.labels.lead}
			</p>

			{/* Mobile / Desktop tabs */}
			<div class="mb-8 inline-flex rounded-full border border-black/8 bg-neutral-100/60 p-1 dark:border-white/10 dark:bg-white/[0.06]">
				{(['mobile', 'desktop'] as const).map((t) => (
					<button
						type="button"
						onClick={() => setTab(t)}
						class={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
							tab() === t
								? 'bg-white text-neutral-900 shadow-sm dark:bg-white/15 dark:text-neutral-100'
								: 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
						}`}
					>
						{t === 'mobile' ? props.labels.tabMobile : props.labels.tabDesktop}
					</button>
				))}
			</div>

			{/* States */}
			<Show when={loading()}>
				<div class="flex h-24 items-center justify-center">
					<div class="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-[#0071e3] dark:border-neutral-600 dark:border-t-[#2997ff]" />
					<span class="ml-3 text-[14px] text-neutral-500">{props.labels.loading}</span>
				</div>
			</Show>

			<Show when={!loading() && error()}>
				<p class="text-[13px] text-neutral-500 dark:text-neutral-400">
					{error()?.includes('not configured') ? props.labels.noKey : error()}
				</p>
			</Show>

			<Show when={!loading() && !error() && data()}>
				<div class="grid grid-cols-4 gap-4">
					<For each={scoreEntries()}>
						{(entry) => <ScoreGauge score={entry.score} label={entry.label} />}
					</For>
				</div>

				<p class="mt-6 text-[12px] text-neutral-400 dark:text-neutral-500">
					{props.labels.lastChecked}: {data() ? formatRelative(data()!.fetchedAt) : '—'}
					<button
						type="button"
						onClick={fetchData}
						class="ml-3 text-[#0071e3] hover:opacity-70 dark:text-[#2997ff]"
					>
						{props.labels.refresh}
					</button>
				</p>
			</Show>
		</div>
	);
}
