export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export type ProjectCard = {
	title: string;
	problem: string;
	stack: string;
	url: string;
	images: { src: string; alt: string }[];
};

export type Messages = {
	seo: {
		pageTitle: string;
		pageDescription: string;
		personName: string;
		personJobTitle: string;
		knowsAbout: string[];
	};
	nav: {
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
	hero: {
		kicker: string;
		headline: string;
		subline: string;
		photoAlt: string;
		ctaProjects: string;
		ctaContact: string;
	};
	about: {
		title: string;
		body: string;
	};
	skills: {
		title: string;
		hub: {
			frontend: string;
			backend: string;
			uiux: string;
			testing: string;
			ai: string;
			devops: string;
		};
		hubClose: string;
		hubHint: string;
		hubStackLabel: string;
	};
	projects: {
		title: string;
		items: ProjectCard[];
		carouselPrev: string;
		carouselNext: string;
		carouselLabel: string;
		projectLinkLabel: string;
		slidePrevLabel: string;
		slideNextLabel: string;
	};
	contact: {
		title: string;
		lead: string;
		formSubject: string;
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
		altTelegram: string;
		altEmail: string;
	};
	footer: {
		note: string;
	};
	chat: {
		open: string;
		close: string;
		title: string;
		placeholder: string;
		send: string;
		empty: string;
		error: string;
	};
};

export const dictionary: Record<Locale, Messages> = {
	en: {
		seo: {
			pageTitle: 'Full-Cycle Developer · UI to DevOps & AI',
			pageDescription:
				'Full-cycle developer: UI/UX, front-end, back-end, DevOps, testing, AI integration, and technical SEO. TypeScript, React, Next.js, Go, Python.',
			personName: 'Your Name',
			personJobTitle: 'Full-Cycle Developer & AI Integration',
			knowsAbout: [
				'UI/UX',
				'React',
				'Next.js',
				'TypeScript',
				'Go',
				'Python',
				'Testing',
				'DevOps',
				'AI workflows',
				'SEO',
			],
		},
		nav: {
			about: 'About',
			skills: 'Skills',
			projects: 'Projects',
			contact: 'Contact',
			theme: 'Theme',
			themeLight: 'Light',
			themeDark: 'Dark',
			themeSystem: 'System',
			language: 'Language',
		},
		hero: {
			kicker: 'Full-cycle · AI · SEO',
			headline: 'I ship calm, fast products end to end.',
			subline:
				'From interface craft and front-end performance to APIs, infra, tests, and AI-assisted workflows — with search and analytics in mind.',
			photoAlt: 'Professional photo (placeholder)',
			ctaProjects: 'See projects',
			ctaContact: 'Get in touch',
		},
		about: {
			title: 'About',
			body: 'I combine product thinking with engineering depth: clear UX, strict TypeScript, solid test coverage, observable deployments, and LLM features that stay maintainable. Replace this block with your real story, clients, and metrics.',
		},
		skills: {
			title: 'Skills',
			hub: {
				frontend: 'Frontend',
				backend: 'Backend',
				uiux: 'UI / UX',
				testing: 'Testing',
				ai: 'AI / Integration',
				devops: 'DevOps',
			},
			hubClose: 'Close',
			hubHint: 'Click a category to explore the stack',
		},
		projects: {
			title: 'Projects',
			carouselPrev: 'Previous project',
			carouselNext: 'Next project',
			carouselLabel: 'Project highlights',
			projectLinkLabel: 'View project',
			slidePrevLabel: 'Previous image',
			slideNextLabel: 'Next image',
			items: [
				{
					title: 'Latency-aware dashboard',
					problem: 'Cut perceived load time for operators monitoring live data without losing density.',
					stack: 'Next.js · Edge caching · Observability',
					url: 'https://example.com/projects/latency-dashboard',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
							alt: 'Latency dashboard overview',
						},
						{
							src: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=1400&q=80',
							alt: 'Latency metrics panel',
						},
					],
				},
				{
					title: 'Typed API + contract tests',
					problem: 'Prevent mobile and web drift by enforcing shared schemas from CI.',
					stack: 'TypeScript · OpenAPI · Playwright',
					url: 'https://example.com/projects/typed-api',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80',
							alt: 'Typed API code view',
						},
						{
							src: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1400&q=80',
							alt: 'Contract test run dashboard',
						},
					],
				},
				{
					title: 'AI-assisted support triage',
					problem: 'Route tickets with guardrails: retrieval, citations, and human handoff.',
					stack: 'LLM APIs · Embeddings · Queue workers',
					url: 'https://example.com/projects/ai-triage',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
							alt: 'AI ticket routing dashboard',
						},
						{
							src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1400&q=80',
							alt: 'AI assistant conversation flow',
						},
					],
				},
			],
		},
		contact: {
			title: 'Contact',
			lead: 'Short note is enough — I usually reply within one business day.',
			formSubject: 'Portfolio — contact form',
			name: 'Name',
			email: 'Email',
			message: 'Message',
			send: 'Send',
			sending: 'Sending…',
			sent: 'Sent. Thank you.',
			error: 'Something went wrong. Try email or Telegram below.',
			missingKey:
				'Add PUBLIC_WEB3FORMS_ACCESS_KEY to your environment to enable the form (Web3Forms).',
			namePlaceholder: 'John Appleseed',
			emailPlaceholder: 'john@company.com',
			serviceType: 'Service type',
			budget: 'Expected budget',
			budgetPlaceholder: 'Select budget',
			budgetUnder1k: '<$1k',
			budget1to5k: '$1k-$5k',
			budget5kPlus: '$5k+',
			timeline: 'Timeline',
			timelinePlaceholder: 'For example: ASAP',
			messagePlaceholder: 'Describe your project goals, scope, and context',
			privacyNote: 'Protected against spam. Privacy is guaranteed.',
			altTelegram: 'Telegram',
			altEmail: 'Email',
		},
		footer: {
			note: 'Built with Astro, Solid, and Tailwind. Content is placeholder — swap for your own.',
		},
		chat: {
			open: 'Open assistant',
			close: 'Close',
			title: 'AI assistant',
			placeholder: 'Ask about stack, delivery, or SEO…',
			send: 'Send',
			empty: 'Ask a question to see a mock reply. Wire Groq or Gemini via env when ready.',
			error: 'Request failed. Try again.',
		},
	},
	ru: {
		seo: {
			pageTitle: 'Full-Cycle разработчик · UI, бэкенд, DevOps и AI',
			pageDescription:
				'Full-cycle разработка: UI/UX, фронтенд, бэкенд, DevOps, тестирование, интеграция AI и техническое SEO. TypeScript, React, Next.js, Go, Python.',
			personName: 'Ваше имя',
			personJobTitle: 'Full-Cycle разработчик и интеграция AI',
			knowsAbout: [
				'UI/UX',
				'React',
				'Next.js',
				'TypeScript',
				'Go',
				'Python',
				'Тестирование',
				'DevOps',
				'AI workflows',
				'SEO',
			],
		},
		nav: {
			about: 'Обо мне',
			skills: 'Навыки',
			projects: 'Проекты',
			contact: 'Контакт',
			theme: 'Тема',
			themeLight: 'Светлая',
			themeDark: 'Тёмная',
			themeSystem: 'Системная',
			language: 'Язык',
		},
		hero: {
			kicker: 'Full-cycle · AI · SEO',
			headline: 'Делаю спокойные, быстрые продукты под ключ.',
			subline:
				'От интерфейса и перфоманса фронта до API, инфры, тестов и AI-процессов — с учётом поиска и аналитики.',
			photoAlt: 'Профессиональное фото (заглушка)',
			ctaProjects: 'Смотреть проекты',
			ctaContact: 'Связаться',
		},
		about: {
			title: 'Обо мне',
			body: 'Соединяю продуктовое мышление с инженерией: понятный UX, строгий TypeScript, тесты, наблюдаемые деплои и LLM-фичи, которые не ломают поддержку. Замените этот текст на свой опыт, клиентов и цифры.',
		},
		skills: {
			title: 'Навыки',
			hub: {
				frontend: 'Frontend',
				backend: 'Backend',
				uiux: 'UI / UX',
				testing: 'Тестирование',
				ai: 'AI / Интеграции',
				devops: 'DevOps',
			},
			hubClose: 'Свернуть',
			hubHint: 'Нажмите категорию, чтобы раскрыть стек',
			hubStackLabel: 'Стек',
		},
		projects: {
			title: 'Проекты',
			carouselPrev: 'Предыдущий проект',
			carouselNext: 'Следующий проект',
			carouselLabel: 'Избранные проекты',
			projectLinkLabel: 'Открыть проект',
			slidePrevLabel: 'Предыдущее изображение',
			slideNextLabel: 'Следующее изображение',
			items: [
				{
					title: 'Дашборд с упором на задержку',
					problem: 'Снизить ощущаемое время загрузки для операторов без потери плотности данных.',
					stack: 'Next.js · Edge cache · Observability',
					url: 'https://example.com/projects/latency-dashboard',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
							alt: 'Общий экран дашборда задержек',
						},
						{
							src: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=1400&q=80',
							alt: 'Панель метрик задержек',
						},
					],
				},
				{
					title: 'Типизированное API и контрактные тесты',
					problem: 'Убрать расхождения web/mobile через общие схемы и CI.',
					stack: 'TypeScript · OpenAPI · Playwright',
					url: 'https://example.com/projects/typed-api',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80',
							alt: 'Экран с типизированным API',
						},
						{
							src: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1400&q=80',
							alt: 'Отчёт по контрактным тестам',
						},
					],
				},
				{
					title: 'AI-помощник для тикетов',
					problem: 'Маршрутизация обращений с ограничениями: поиск, цитаты, эскалация к человеку.',
					stack: 'LLM API · Embeddings · Очереди',
					url: 'https://example.com/projects/ai-triage',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
							alt: 'Панель маршрутизации заявок с AI',
						},
						{
							src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1400&q=80',
							alt: 'Экран сценариев AI-ассистента',
						},
					],
				},
			],
		},
		contact: {
			title: 'Контакт',
			lead: 'Достаточно короткого сообщения — обычно отвечаю в течение рабочего дня.',
			formSubject: 'Портфолио — форма связи',
			name: 'Имя',
			email: 'Почта',
			message: 'Сообщение',
			send: 'Отправить',
			sending: 'Отправка…',
			sent: 'Отправлено. Спасибо.',
			error: 'Не вышло. Напишите в Telegram или на почту ниже.',
			missingKey:
				'Добавьте PUBLIC_WEB3FORMS_ACCESS_KEY в окружение, чтобы включить форму (Web3Forms).',
			namePlaceholder: 'Иван Иванов',
			emailPlaceholder: 'name@company.com',
			serviceType: 'Тип услуг',
			budget: 'Ожидаемый бюджет',
			budgetPlaceholder: 'Выберите бюджет',
			budgetUnder1k: '<$1k',
			budget1to5k: '$1k-$5k',
			budget5kPlus: '$5k+',
			timeline: 'Сроки',
			timelinePlaceholder: 'Например: ASAP',
			messagePlaceholder: 'Опишите задачу, цели проекта и важные детали',
			privacyNote: 'Защищено от спама, конфиденциальность гарантирована.',
			altTelegram: 'Telegram',
			altEmail: 'Почта',
		},
		footer: {
			note: 'Собрано на Astro, Solid и Tailwind. Тексты-заглушки — замените своими.',
		},
		chat: {
			open: 'Открыть ассистента',
			close: 'Закрыть',
			title: 'AI-ассистент',
			placeholder: 'Спросите про стек, поставку или SEO…',
			send: 'Отправить',
			empty: 'Задайте вопрос — ответ пока mock. Подключите Groq или Gemini через env.',
			error: 'Запрос не прошёл. Повторите.',
		},
	},
};

export function getMessages(locale: Locale): Messages {
	return dictionary[locale];
}

/** Placeholder — замените на свои ссылки */
export const contactLinks = {
	telegram: 'https://t.me/yourusername',
	email: 'mailto:you@example.com',
} as const;
