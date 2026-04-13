import { For, createEffect, createSignal, onCleanup } from 'solid-js';

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
						data-no-drag
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
						data-no-drag
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
	const [active, setActive] = createSignal(0);
	const [visibleCount, setVisibleCount] = createSignal(2);
	let dragStartX = 0;
	let dragDeltaX = 0;
	let isDragging = false;
	let touchStartX = 0;
	let touchStartY = 0;
	let touchDeltaX = 0;
	let touchDeltaY = 0;
	let isTouchDragging = false;

	const total = () => props.items.length;
	const maxIndex = () => Math.max(0, total() - visibleCount());
	const pageCount = () => maxIndex() + 1;
	const canGoPrev = () => active() > 0;
	const canGoNext = () => active() < maxIndex();

	const prevProject = () => {
		setActive((idx) => Math.max(0, idx - 1));
	};
	const nextProject = () => {
		setActive((idx) => Math.min(maxIndex(), idx + 1));
	};

	const updateVisibleCount = () => {
		const width = window.innerWidth;
		if (width >= 768) {
			setVisibleCount(2);
			return;
		}
		setVisibleCount(1);
	};

	createEffect(() => {
		if (typeof window === 'undefined') return;
		updateVisibleCount();
		window.addEventListener('resize', updateVisibleCount);
		onCleanup(() => window.removeEventListener('resize', updateVisibleCount));
	});

	createEffect(() => {
		if (active() > maxIndex()) {
			setActive(maxIndex());
		}
	});

	const onPointerDown = (e: PointerEvent) => {
		if (e.pointerType !== 'mouse') return;
		const target = e.target as HTMLElement | null;
		if (target?.closest('button, a, input, textarea, select, [data-no-drag]')) return;
		if (e.button !== 0) return;
		dragStartX = e.clientX;
		dragDeltaX = 0;
		isDragging = true;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	};

	const onPointerMove = (e: PointerEvent) => {
		if (!isDragging) return;
		dragDeltaX = e.clientX - dragStartX;
	};

	const onPointerUp = () => {
		if (!isDragging) return;
		isDragging = false;
		if (dragDeltaX <= -50) nextProject();
		if (dragDeltaX >= 50) prevProject();
	};

	const onTouchStart = (e: TouchEvent) => {
		const target = e.target as HTMLElement | null;
		if (target?.closest('button, a, input, textarea, select, [data-no-drag]')) return;
		const touch = e.touches[0];
		if (!touch) return;
		touchStartX = touch.clientX;
		touchStartY = touch.clientY;
		touchDeltaX = 0;
		touchDeltaY = 0;
		isTouchDragging = true;
	};

	const onTouchMove = (e: TouchEvent) => {
		if (!isTouchDragging) return;
		const touch = e.touches[0];
		if (!touch) return;
		touchDeltaX = touch.clientX - touchStartX;
		touchDeltaY = touch.clientY - touchStartY;
	};

	const onTouchEnd = () => {
		if (!isTouchDragging) return;
		isTouchDragging = false;
		if (Math.abs(touchDeltaX) < Math.abs(touchDeltaY)) return;
		if (touchDeltaX <= -40) nextProject();
		if (touchDeltaX >= 40) prevProject();
	};

	return (
		<div class="mt-10">
			<div
				class="relative"
				role="region"
				aria-roledescription="carousel"
				aria-label={props.labels.region}
			>
				<div
					class="overflow-hidden touch-pan-y"
					onPointerDown={onPointerDown}
					onPointerMove={onPointerMove}
					onPointerUp={onPointerUp}
					onPointerCancel={onPointerUp}
					onPointerLeave={onPointerUp}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					onTouchCancel={onTouchEnd}
				>
					<div
						class="flex select-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
						style={{ transform: `translateX(-${(active() * 100) / visibleCount()}%)` }}
					>
						<For each={props.items}>
							{(p, i) => (
								<div
									class="min-w-0 shrink-0 px-2 md:px-3"
									style={{ width: `${100 / visibleCount()}%` }}
								>
									<article class="project-card group flex h-full min-h-[20rem] flex-col rounded-3xl border border-black/5 bg-white/90 p-6 shadow-none backdrop-blur-sm transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-black/10 dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-white/20 md:min-h-[22rem] md:p-8">
										<ProjectImageSlider
											images={p.images}
											projectTitle={p.title}
											prevLabel={props.labels.prevImage}
											nextLabel={props.labels.nextImage}
										/>
										<div class="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0071e3] to-[#5856d6] text-[14px] font-semibold text-white shadow-md">
											{i() + 1}
										</div>
										<h3 class="text-balance text-[clamp(1.2rem,2.4vw,1.7rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
											{p.title}
										</h3>
										<p class="mt-3 flex-1 text-pretty text-[15px] leading-[1.5] text-neutral-600 md:text-[17px] dark:text-neutral-400">
											{p.problem}
										</p>
										<p class="mt-6 text-[14px] font-medium leading-snug text-[#0071e3] md:text-[15px] dark:text-[#2997ff]">
											{p.stack}
										</p>
										<a
											href={p.url}
											target="_blank"
											rel="noopener noreferrer"
											class="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0071e3] transition-opacity duration-200 hover:opacity-80 dark:text-[#2997ff]"
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
						onClick={prevProject}
						disabled={!canGoPrev()}
						data-no-drag
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
						<For each={Array.from({ length: pageCount() }, (_, idx) => idx)}>
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
									aria-label={`Slide group ${i + 1}`}
									onClick={() => setActive(i)}
									data-no-drag
								/>
							)}
						</For>
					</div>
					<button
						type="button"
						class="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 text-neutral-800 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-white hover:shadow-lg hover:shadow-black/[0.1] active:shadow-sm dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 dark:hover:shadow-black/50"
						aria-label={props.labels.next}
						onClick={nextProject}
						disabled={!canGoNext()}
						data-no-drag
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
