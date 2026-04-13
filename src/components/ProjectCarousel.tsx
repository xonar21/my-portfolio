import { For, createEffect, createSignal, onCleanup } from 'solid-js';
import createEmblaCarousel from 'embla-carousel-solid';

export type CarouselProject = {
	title: string;
	problem: string;
	stack: string;
	url: string;
	images: { src: string; alt: string }[];
};

function ProjectImageSlider(props: {
	images: { src: string; alt: string }[];
	projectTitle: string;
	prevLabel: string;
	nextLabel: string;
}) {
	const [activeImage, setActiveImage] = createSignal(0);
	const total = () => props.images.length;
	const canSlide = () => total() > 1;

	const prev = () => {
		if (!canSlide()) return;
		setActiveImage((i) => (i - 1 + total()) % total());
	};

	const next = () => {
		if (!canSlide()) return;
		setActiveImage((i) => (i + 1) % total());
	};

	const currentImage = () => props.images[activeImage()];

	return (
		<div class="mb-6 rounded-2xl border border-black/5 bg-white/80 p-2 dark:border-white/10 dark:bg-white/[0.04]">
			<div class="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
				<img
					src={currentImage().src}
					alt={currentImage().alt}
					class="h-full w-full object-cover"
					draggable={false}
					loading="lazy"
				/>
				<div class="absolute inset-x-2 bottom-2 flex items-center justify-between">
					<button
						type="button"
						aria-label={props.prevLabel}
						onClick={prev}
						disabled={!canSlide()}
						class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-white/90 text-neutral-900 shadow-sm transition-[opacity] duration-200 hover:opacity-90 disabled:opacity-35 dark:border-white/20 dark:bg-black/55 dark:text-neutral-100"
					>
						<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M15 6l-6 6 6 6"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					<span class="rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-neutral-700 dark:border-white/20 dark:bg-black/55 dark:text-neutral-200">
						{activeImage() + 1}/{total()}
					</span>
					<button
						type="button"
						aria-label={props.nextLabel}
						onClick={next}
						disabled={!canSlide()}
						class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-white/90 text-neutral-900 shadow-sm transition-[opacity] duration-200 hover:opacity-90 disabled:opacity-35 dark:border-white/20 dark:bg-black/55 dark:text-neutral-100"
					>
						<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M9 6l6 6-6 6"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>
			<p class="mt-2 text-[12px] text-neutral-500 dark:text-neutral-400">{props.projectTitle}</p>
		</div>
	);
}

function reducedMotion(): boolean {
	return (
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}

export default function ProjectCarousel(props: {
	items: CarouselProject[];
	labels: {
		prev: string;
		next: string;
		region: string;
		openProject: string;
		prevImage: string;
		nextImage: string;
	};
}) {
	const [setViewport, emblaApi] = createEmblaCarousel(() => ({
		axis: 'x',
		align: 'center',
		containScroll: 'trimSnaps',
		slidesToScroll: 1,
		dragFree: false,
		duration: reducedMotion() ? 0 : 36,
	}));

	const [active, setActive] = createSignal(0);

	createEffect(() => {
		const api = emblaApi();
		if (!api) return;
		const sync = () => setActive(api.selectedScrollSnap());
		api.on('select', sync);
		api.on('reInit', sync);
		sync();
		onCleanup(() => {
			api.off('select', sync);
			api.off('reInit', sync);
		});
	});

	const jump = () => reducedMotion();

	return (
		<div class="mt-10">
			<div
				class="relative"
				role="region"
				aria-roledescription="carousel"
				aria-label={props.labels.region}
			>
				<div
					class="cursor-grab overflow-hidden select-none active:cursor-grabbing"
					ref={setViewport}
				>
					<div class="flex touch-pan-y [backface-visibility:hidden] [-webkit-backface-visibility:hidden] -ml-6">
						<For each={props.items}>
							{(p, i) => (
								<div class="min-w-0 shrink-0 grow-0 basis-[88%] pl-6 sm:basis-[72%] lg:basis-[56%]">
									<article class="project-card group flex h-full min-h-[20rem] flex-col rounded-3xl border border-black/5 bg-white/90 p-8 shadow-none backdrop-blur-sm transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-black/10 dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-white/20 md:min-h-[22rem] md:p-10">
										<ProjectImageSlider
											images={p.images}
											projectTitle={p.title}
											prevLabel={props.labels.prevImage}
											nextLabel={props.labels.nextImage}
										/>
										<div class="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#0071e3] to-[#5856d6] text-[15px] font-semibold text-white shadow-md transition-[box-shadow] duration-300 group-hover:shadow-lg">
											{i() + 1}
										</div>
										<h3 class="text-balance text-[clamp(1.5rem,3.5vw,1.875rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
											{p.title}
										</h3>
										<p class="mt-4 flex-1 text-pretty text-[17px] leading-[1.5] text-neutral-600 md:text-[19px] dark:text-neutral-400">
											{p.problem}
										</p>
										<p class="mt-8 text-[15px] font-medium leading-snug text-[#0071e3] md:text-[16px] dark:text-[#2997ff]">
											{p.stack}
										</p>
										<a
											href={p.url}
											target="_blank"
											rel="noopener noreferrer"
											class="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0071e3] transition-opacity duration-200 hover:opacity-80 dark:text-[#2997ff]"
										>
											{props.labels.openProject}
											<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
												<path
													d="M7 17L17 7M9 7h8v8"
													stroke="currentColor"
													stroke-width="1.8"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</a>
									</article>
								</div>
							)}
						</For>
					</div>
				</div>

				<div class="mt-8 flex items-center justify-center gap-4">
					<button
						type="button"
						class="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 text-neutral-800 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-white hover:shadow-lg hover:shadow-black/[0.1] active:shadow-sm dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 dark:hover:shadow-black/50"
						aria-label={props.labels.prev}
						onClick={() => emblaApi()?.scrollPrev(jump())}
					>
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M15 6l-6 6 6 6"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					<div class="flex gap-2 px-2" role="tablist" aria-label={props.labels.region}>
						<For each={Array.from({ length: props.items.length }, (_, idx) => idx)}>
							{(i) => (
								<button
									type="button"
									role="tab"
									aria-selected={active() === i}
									class="h-2 rounded-full transition-[width,background-color] duration-300 ease-out"
									classList={{
										'w-7 bg-[#0071e3] dark:bg-[#2997ff]': active() === i,
										'w-2 bg-neutral-300 dark:bg-neutral-600': active() !== i,
									}}
									aria-label={`Slide ${i + 1}`}
									onClick={() => emblaApi()?.scrollTo(i, jump())}
								/>
							)}
						</For>
					</div>
					<button
						type="button"
						class="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 text-neutral-800 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-white hover:shadow-lg hover:shadow-black/[0.1] active:shadow-sm dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 dark:hover:shadow-black/50"
						aria-label={props.labels.next}
						onClick={() => emblaApi()?.scrollNext(jump())}
					>
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M9 6l6 6-6 6"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
