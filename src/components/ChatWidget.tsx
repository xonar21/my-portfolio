import { For, createSignal } from 'solid-js';

const MAX_MESSAGES = 20;

type Msg = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget(props: {
	labels: {
		open: string;
		close: string;
		title: string;
		placeholder: string;
		send: string;
		empty: string;
		error: string;
	};
}) {
	const [open, setOpen] = createSignal(false);
	const [input, setInput] = createSignal('');
	const [messages, setMessages] = createSignal<Msg[]>([]);
	const [loading, setLoading] = createSignal(false);
	const [err, setErr] = createSignal(false);
	const [errDetail, setErrDetail] = createSignal<string | null>(null);

	async function send() {
		const text = input().trim();
		if (!text || loading()) return;
		setErr(false);
		setErrDetail(null);
		const nextUser: Msg = { role: 'user', content: text };
		const thread: Msg[] = [...messages(), nextUser].slice(-MAX_MESSAGES);
		setMessages(thread);
		setInput('');
		setLoading(true);
		try {
			const res = await fetch('/api/chat/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: thread.map(({ role, content }) => ({ role, content })),
				}),
			});
			const data = await res.json().catch(() => null);
			if (!res.ok) {
				const fromServer =
					data && typeof data === 'object' && typeof (data as { error?: string }).error === 'string'
						? (data as { error: string }).error
						: null;
				setErrDetail(fromServer);
				setErr(true);
				return;
			}
			if (!data || typeof data.content !== 'string') {
				setErrDetail(null);
				setErr(true);
				return;
			}
			setMessages((m) => [...m, { role: 'assistant', content: data.content }]);
		} catch {
			setErr(true);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
			{open() ? (
				<div
					class="flex w-[min(100vw-3rem,22rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-none"
					role="dialog"
					aria-label={props.labels.title}
				>
					<div class="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
						<span class="text-[14px] font-medium text-neutral-950 dark:text-neutral-100">
							{props.labels.title}
						</span>
						<button
							type="button"
							class="rounded-full px-2 py-1 text-[13px] text-neutral-500 transition-opacity hover:opacity-70"
							onClick={() => setOpen(false)}
						>
							{props.labels.close}
						</button>
					</div>
					<div class="max-h-64 space-y-3 overflow-y-auto px-4 py-3">
						{messages().length === 0 ? (
							<p class="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-500">
								{props.labels.empty}
							</p>
						) : (
							<For each={messages()}>
								{(m) => (
									<div
										class={
											m.role === 'user'
												? 'ml-4 rounded-xl bg-neutral-100 px-3 py-2 text-[13px] text-neutral-950 dark:bg-neutral-900 dark:text-neutral-100'
												: 'mr-4 rounded-xl border border-neutral-200 px-3 py-2 text-[13px] text-neutral-800 dark:border-neutral-800 dark:text-neutral-200'
										}
									>
										{m.content}
									</div>
								)}
							</For>
						)}
						{loading() ? (
							<p class="text-[12px] text-neutral-400">…</p>
						) : null}
						{err() ? (
							<p class="whitespace-pre-wrap break-words text-[12px] leading-snug text-red-600 dark:text-red-400">
								{errDetail() ?? props.labels.error}
							</p>
						) : null}
					</div>
					<div class="flex gap-2 border-t border-neutral-200 p-3 dark:border-neutral-800">
						<input
							class="min-w-0 flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-[13px] text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus-visible:outline-neutral-100"
							placeholder={props.labels.placeholder}
							value={input()}
							onInput={(e) => setInput(e.currentTarget.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									void send();
								}
							}}
						/>
						<button
							type="button"
							class="shrink-0 rounded-full bg-[#0071e3] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-[opacity,box-shadow] duration-200 hover:shadow-md hover:shadow-[#0071e3]/35 dark:bg-[#2997ff] dark:hover:shadow-[#2997ff]/40"
							onClick={() => void send()}
							disabled={loading()}
						>
							{props.labels.send}
						</button>
					</div>
				</div>
			) : null}
			<button
				type="button"
				class="rounded-full bg-[#0071e3] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-[#0071e3]/25 transition-[box-shadow] duration-200 hover:shadow-2xl hover:shadow-[#0071e3]/38 dark:bg-[#2997ff] dark:shadow-[#2997ff]/20 dark:hover:shadow-[#2997ff]/45"
				onClick={() => setOpen(!open())}
				aria-expanded={open()}
			>
				{open() ? props.labels.close : props.labels.open}
			</button>
		</div>
	);
}
