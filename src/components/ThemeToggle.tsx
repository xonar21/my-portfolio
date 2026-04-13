import { createEffect, createSignal, onCleanup } from 'solid-js';

const STORAGE_KEY = 'theme-preference';

type Mode = 'light' | 'dark' | 'system';

function readStored(): Mode {
	try {
		const v = localStorage.getItem(STORAGE_KEY);
		if (v === 'light' || v === 'dark') return v;
	} catch {
		/* private mode */
	}
	return 'system';
}

function applyFromMode(mode: Mode) {
	const root = document.documentElement;
	if (mode === 'light') {
		root.classList.remove('dark');
		return;
	}
	if (mode === 'dark') {
		root.classList.add('dark');
		return;
	}
	const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	root.classList.toggle('dark', dark);
}

function persist(mode: Mode) {
	try {
		if (mode === 'system') localStorage.removeItem(STORAGE_KEY);
		else localStorage.setItem(STORAGE_KEY, mode);
	} catch {
		/* ignore */
	}
}

export default function ThemeToggle(props: {
	labels: { theme: string; light: string; dark: string; system: string };
}) {
	const [mode, setMode] = createSignal<Mode>('system');

	createEffect(() => {
		const initial = readStored();
		setMode(initial);
		applyFromMode(initial);
	});

	const mq = () => window.matchMedia('(prefers-color-scheme: dark)');
	createEffect(() => {
		if (mode() !== 'system') return;
		const m = mq();
		const listener = () => applyFromMode('system');
		m.addEventListener('change', listener);
		onCleanup(() => m.removeEventListener('change', listener));
	});

	function select(next: Mode) {
		setMode(next);
		persist(next);
		applyFromMode(next);
	}

	const btn =
		'rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-[background-color,color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3] dark:focus-visible:outline-[#2997ff]';

	return (
		<div
			class="flex flex-wrap items-center gap-0 rounded-full border border-black/10 bg-white/80 p-0.5 shadow-sm dark:border-white/15 dark:bg-white/10"
			role="group"
			aria-label={props.labels.theme}
		>
			<button
				type="button"
				class={btn}
				classList={{
					'bg-[#0071e3] text-white shadow-sm dark:bg-[#2997ff]': mode() === 'light',
					'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white':
						mode() !== 'light',
				}}
				aria-pressed={mode() === 'light'}
				onClick={() => select('light')}
			>
				{props.labels.light}
			</button>
			<button
				type="button"
				class={btn}
				classList={{
					'bg-[#0071e3] text-white shadow-sm dark:bg-[#2997ff]': mode() === 'dark',
					'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white':
						mode() !== 'dark',
				}}
				aria-pressed={mode() === 'dark'}
				onClick={() => select('dark')}
			>
				{props.labels.dark}
			</button>
			<button
				type="button"
				class={btn}
				classList={{
					'bg-[#0071e3] text-white shadow-sm dark:bg-[#2997ff]': mode() === 'system',
					'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white':
						mode() !== 'system',
				}}
				aria-pressed={mode() === 'system'}
				onClick={() => select('system')}
			>
				{props.labels.system}
			</button>
		</div>
	);
}
