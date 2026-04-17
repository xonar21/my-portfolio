import { For, createSignal } from 'solid-js';

type Labels = {
	name: string;
	email: string;
	message: string;
	send: string;
	sending: string;
	sent: string;
	error: string;
	missingKey: string;
	namePlaceholder: string;
	emailPlaceholder: string;
	serviceType: string;
	budget: string;
	budgetPlaceholder: string;
	budgetUnder1k: string;
	budget1to5k: string;
	budget5kPlus: string;
	timeline: string;
	timelinePlaceholder: string;
	messagePlaceholder: string;
	privacyNote: string;
};

const inputClass =
	'w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 text-[17px] font-normal text-neutral-950 placeholder:text-neutral-400 shadow-sm transition-[border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:border-[#0071e3]/45 focus-visible:shadow-[0_0_0_4px_rgba(0,113,227,0.09)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-600 dark:focus-visible:border-[#2997ff]/55 dark:focus-visible:shadow-[0_0_0_4px_rgba(41,151,255,0.14)]';

const invalidClass =
	'border-red-300/80 focus-visible:border-red-300/80 focus-visible:shadow-[0_0_0_4px_rgba(248,113,113,0.16)] dark:border-red-400/50 dark:focus-visible:border-red-400/50 dark:focus-visible:shadow-[0_0_0_4px_rgba(248,113,113,0.2)]';

type ServiceOption = {
	id: string;
	label: string;
};

export default function ContactForm(props: {
	labels: Labels;
	subject: string;
	serviceOptions: ServiceOption[];
}) {
	const [status, setStatus] = createSignal<'idle' | 'sending' | 'sent' | 'error'>('idle');
	const [attemptedSubmit, setAttemptedSubmit] = createSignal(false);
	const [name, setName] = createSignal('');
	const [email, setEmail] = createSignal('');
	const [timeline, setTimeline] = createSignal('');
	const [budget, setBudget] = createSignal('');
	const [message, setMessage] = createSignal('');
	const [services, setServices] = createSignal<string[]>([]);
	const key = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY as string | undefined;

	const isInvalidName = () => attemptedSubmit() && name().trim().length === 0;
	const isInvalidEmail = () =>
		attemptedSubmit() && !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email().trim());
	const isInvalidTimeline = () => attemptedSubmit() && timeline().trim().length === 0;
	const isInvalidBudget = () => attemptedSubmit() && budget().trim().length === 0;
	const isInvalidMessage = () => attemptedSubmit() && message().trim().length === 0;
	const isInvalidServices = () => attemptedSubmit() && services().length === 0;

	const hasValidationErrors = () =>
		isInvalidName() ||
		isInvalidEmail() ||
		isInvalidTimeline() ||
		isInvalidBudget() ||
		isInvalidMessage() ||
		isInvalidServices();

	const inputStateClass = (isInvalid: boolean) => `${inputClass} ${isInvalid ? invalidClass : ''}`;

	function toggleService(id: string) {
		setServices((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
	}

	async function onSubmit(e: Event) {
		e.preventDefault();
		setAttemptedSubmit(true);
		if (hasValidationErrors()) {
			setStatus('idle');
			return;
		}
		if (!key) {
			setStatus('error');
			return;
		}
		const form = e.currentTarget as HTMLFormElement;
		setStatus('sending');
		try {
			const res = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					access_key: key,
					subject: props.subject,
					name: name().trim(),
					email: email().trim(),
					message: message().trim(),
					service_type: services().join(', '),
					budget: budget().trim(),
					timeline: timeline().trim(),
					from_name: name().trim(),
				}),
			});
			const data = await res.json().catch(() => ({}));
			if (res.ok && data.success) {
				setStatus('sent');
				setAttemptedSubmit(false);
				setName('');
				setEmail('');
				setTimeline('');
				setBudget('');
				setMessage('');
				setServices([]);
				form.reset();
			} else {
				setStatus('error');
			}
		} catch {
			setStatus('error');
		}
	}

	return (
		<div>
			{!key ? (
				<p class="mb-6 text-[16px] leading-snug text-neutral-500 dark:text-neutral-500" role="status">
					{props.labels.missingKey}
				</p>
			) : null}
			<div class="relative">
				<form
					class="space-y-5 transition-all duration-500 ease-in-out"
					classList={{
						'pointer-events-none invisible absolute inset-0 -translate-y-2 opacity-0': status() === 'sent',
						'relative translate-y-0 opacity-100': status() !== 'sent',
					}}
					onSubmit={onSubmit}
					noValidate
				>
					<input type="checkbox" name="botcheck" class="hidden" tabIndex={-1} autocomplete="off" />
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label for="wf-name" class="mb-2 block text-[15px] font-medium text-neutral-600 dark:text-neutral-400">
								{props.labels.name}
							</label>
							<input
								id="wf-name"
								name="name"
								type="text"
								required
								class={inputStateClass(isInvalidName())}
								autocomplete="name"
								placeholder={props.labels.namePlaceholder}
								value={name()}
								onInput={(e) => setName(e.currentTarget.value)}
								aria-invalid={isInvalidName()}
							/>
						</div>
						<div>
							<label for="wf-email" class="mb-2 block text-[15px] font-medium text-neutral-600 dark:text-neutral-400">
								{props.labels.email}
							</label>
							<input
								id="wf-email"
								name="email"
								type="email"
								required
								class={inputStateClass(isInvalidEmail())}
								autocomplete="email"
								placeholder={props.labels.emailPlaceholder}
								value={email()}
								onInput={(e) => setEmail(e.currentTarget.value)}
								aria-invalid={isInvalidEmail()}
							/>
						</div>
					</div>

					<fieldset
						class="rounded-2xl border border-neutral-200 p-4 transition-colors duration-200 dark:border-neutral-800"
						classList={{
							[invalidClass]: isInvalidServices(),
						}}
						aria-invalid={isInvalidServices()}
					>
						<legend class="px-1 text-[15px] font-medium text-neutral-600 dark:text-neutral-400">
							{props.labels.serviceType}
						</legend>
						<div class="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
							<For each={props.serviceOptions}>
								{(opt) => {
									const selected = () => services().includes(opt.id);
									return (
										<button
											type="button"
											aria-pressed={selected()}
											class="rounded-xl border bg-white px-3 py-2.5 text-center text-[14px] font-medium text-neutral-700 shadow-sm transition-all duration-200 dark:bg-neutral-900 dark:text-neutral-200"
											classList={{
												'border-[#0071e3] dark:border-[#2997ff]':
													selected(),
												'border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600':
													!selected(),
											}}
											onClick={() => toggleService(opt.id)}
										>
											<span>{opt.label}</span>
										</button>
									);
								}}
							</For>
						</div>
					</fieldset>

					<div>
						<label
							for="wf-budget"
							class="mb-2 block text-[15px] font-medium text-neutral-600 dark:text-neutral-400"
						>
							{props.labels.budget}
						</label>
						<select
							id="wf-budget"
							name="budget"
							required
							class={inputStateClass(isInvalidBudget())}
							value={budget()}
							onChange={(e) => setBudget(e.currentTarget.value)}
							aria-invalid={isInvalidBudget()}
						>
							<option value="">{props.labels.budgetPlaceholder}</option>
							<option value="<1k">{props.labels.budgetUnder1k}</option>
							<option value="1-5k">{props.labels.budget1to5k}</option>
							<option value="5k+">{props.labels.budget5kPlus}</option>
						</select>
					</div>

					<div>
						<label
							for="wf-timeline"
							class="mb-2 block text-[15px] font-medium text-neutral-600 dark:text-neutral-400"
						>
							{props.labels.timeline}
						</label>
						<input
							id="wf-timeline"
							name="timeline"
							type="text"
							required
							class={inputStateClass(isInvalidTimeline())}
							placeholder={props.labels.timelinePlaceholder}
							value={timeline()}
							onInput={(e) => setTimeline(e.currentTarget.value)}
							aria-invalid={isInvalidTimeline()}
						/>
					</div>

					<div>
						<label for="wf-msg" class="mb-2 block text-[15px] font-medium text-neutral-600 dark:text-neutral-400">
							{props.labels.message}
						</label>
						<textarea
							id="wf-msg"
							name="message"
							required
							rows={5}
							class={`${inputStateClass(isInvalidMessage())} min-h-[132px] resize-y`}
							placeholder={props.labels.messagePlaceholder}
							value={message()}
							onInput={(e) => setMessage(e.currentTarget.value)}
							aria-invalid={isInvalidMessage()}
						/>
						<p class="mt-2 text-[12px] leading-relaxed text-neutral-500 dark:text-neutral-500">
							{props.labels.privacyNote}
						</p>
					</div>

					<button
						type="submit"
						disabled={status() === 'sending' || !key}
						class="min-h-[3rem] rounded-full bg-[#0071e3] px-8 py-2.5 text-[17px] font-normal text-white shadow-md shadow-[#0071e3]/20 transition-[opacity,box-shadow] duration-200 hover:opacity-95 hover:shadow-xl hover:shadow-[#0071e3]/32 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-md dark:bg-[#2997ff] dark:shadow-[#2997ff]/20 dark:hover:shadow-[#2997ff]/35"
					>
						{status() === 'sending' ? props.labels.sending : props.labels.send}
					</button>

					{status() === 'error' ? (
						<p class="text-[14px] text-red-600 dark:text-red-400" role="alert">
							{props.labels.error}
						</p>
					) : null}
				</form>

				<div
					class="rounded-2xl border border-[#0071e3]/20 bg-white/90 p-6 shadow-sm transition-all duration-500 ease-in-out dark:border-[#2997ff]/30 dark:bg-neutral-900/90"
					classList={{
						'relative translate-y-0 opacity-100': status() === 'sent',
						'pointer-events-none invisible absolute inset-0 translate-y-2 opacity-0': status() !== 'sent',
					}}
					role="status"
				>
					<p class="text-[17px] font-medium text-neutral-900 dark:text-neutral-100">{props.labels.sent}</p>
				</div>
			</div>
		</div>
	);
}
