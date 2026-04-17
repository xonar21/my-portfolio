import { createSignal, onMount, onCleanup } from 'solid-js';
import ThemeToggle from './ThemeToggle';

export default function Header(props: {
	locale: 'en' | 'ru';
	alternateHref: string;
	labels: {
		about: string;
		skills: string;
		projects: string;
		contact: string;
		theme: string;
		themeLight: string;
		themeDark: string;
		themeSystem: string;
		language: string;
	};
}) {
	const { labels: L } = props;
	const [activeSection, setActiveSection] = createSignal('');

	onMount(() => {
		const ids = ['about', 'skills', 'projects', 'contact'];
		const observers: IntersectionObserver[] = [];

		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (!el) return;
			const io = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) setActiveSection(id);
				},
				{ threshold: 0.3 },
			);
			io.observe(el);
			observers.push(io);
		});

		onCleanup(() => observers.forEach((io) => io.disconnect()));
	});

	const navLink = (section: string) => {
		const isActive = activeSection() === section;
		return (
			`relative text-[17px] font-normal after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-[#0071e3] after:transition-transform after:duration-300 after:ease-out hover:text-neutral-950 hover:after:scale-x-100 dark:after:bg-[#2997ff] dark:hover:text-white ` +
			(isActive
				? 'text-neutral-950 after:scale-x-100 dark:text-white'
				: 'text-neutral-700 after:scale-x-0 dark:text-neutral-300')
		);
	};

	return (
		<header class="sticky top-0 z-40 border-b border-black/5 bg-[#f5f5f7]/85 backdrop-blur-xl dark:border-white/10 dark:bg-black/75">
			<div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
				<nav class="flex flex-wrap items-center gap-x-8 gap-y-2" aria-label="Primary">
					<a href="#about" class={navLink('about')}>
						{L.about}
					</a>
					<a href="#skills" class={navLink('skills')}>
						{L.skills}
					</a>
					<a href="#projects" class={navLink('projects')}>
						{L.projects}
					</a>
					<a href="#contact" class={navLink('contact')}>
						{L.contact}
					</a>
				</nav>
				<div class="flex flex-wrap items-center gap-5">
					<div class="flex items-center gap-2">
						<span class="sr-only">{L.language}</span>
						<a
							href={props.alternateHref}
							class="rounded-full border border-black/10 bg-white/80 px-3.5 py-2 text-[13px] font-semibold text-[#0071e3] transition-[box-shadow] duration-200 hover:shadow-md hover:shadow-black/[0.08] dark:border-white/15 dark:bg-white/10 dark:text-[#2997ff] dark:hover:shadow-black/45"
							hreflang={props.locale === 'en' ? 'ru' : 'en'}
						>
							{props.locale === 'en' ? 'RU' : 'EN'}
						</a>
					</div>
					<ThemeToggle
						labels={{
							theme: L.theme,
							light: L.themeLight,
							dark: L.themeDark,
							system: L.themeSystem,
						}}
					/>
				</div>
			</div>
		</header>
	);
}
