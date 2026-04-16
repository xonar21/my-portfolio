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
	pagespeed: {
		title: string;
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
	visitors: {
		title: string;
		labelOnline: string;
		labelToday: string;
		labelTotal: string;
		labelRegions: string;
		loading: string;
		noData: string;
	};
};

export const dictionary: Record<Locale, Messages> = {
	en: {
		seo: {
			pageTitle: 'Jan Spinu · Senior Full-Stack & AI Integration Engineer',
			pageDescription:
				'Senior Full-Stack Engineer specializing in LLM integration, autonomous AI agents, and high-performance web systems. React, Next.js, Vue 3, Go, Python, FastAPI, TypeScript.',
			personName: 'Jan Spinu',
			personJobTitle: 'Senior Full-Stack Engineer & AI Integration Specialist',
			knowsAbout: [
				'LLM Integration',
				'Autonomous AI Agents',
				'React',
				'Next.js',
				'Vue 3',
				'Nuxt',
				'Angular',
				'TypeScript',
				'Go',
				'Python',
				'FastAPI',
				'DevOps',
				'Performance Optimization',
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
			kicker: 'Full-Stack · AI Agents · 5+ yrs',
			headline: 'I build fast products and wire AI that actually works.',
			subline:
				'Senior Full-Stack Engineer specializing in LLM integration, autonomous agent workflows, and low-latency architectures — shipped for government, finance, and 50k+ daily users.',
			photoAlt: 'Jan Spinu — Senior Full-Stack & AI Engineer',
			ctaProjects: 'See projects',
			ctaContact: 'Get in touch',
		},
		about: {
			title: 'About',
			body: 'I bridge complex frontend ecosystems and resilient backend architectures — with a sharp focus on AI-driven development. Over 5 years I\'ve shipped mission-critical systems for government, finance, and healthcare; automated 40% of data workflows with autonomous agents; and pushed LCP scores down by 45% on high-traffic frontends. Clean code, measurable outcomes, no fluff.',
		},
		skills: {
			title: 'Skills',
			hub: {
				frontend: 'Frontend',
				backend: 'Backend',
				uiux: 'UI / UX',
				testing: 'Testing',
				ai: 'AI / Agents',
				devops: 'DevOps',
			},
			hubClose: 'Close',
			hubHint: 'Click a category to explore the stack',
			hubStackLabel: 'Stack',
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
					title: 'Autonomous AI Agent Suite',
					problem: 'Automate 40% of repetitive data-processing tasks while keeping workflows auditable and production-ready.',
					stack: 'Python · FastAPI · LangChain · Autonomous Agents · PostgreSQL',
					url: 'https://linkedin.com/in/jan-spinu',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
							alt: 'AI agent workflow dashboard',
						},
						{
							src: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1400&q=80',
							alt: 'Agent orchestration pipeline',
						},
					],
				},
				{
					title: 'Cross-Framework Design System',
					problem: 'Unify UI delivery across Angular and React codebases for government, finance, and healthcare clients — cutting feature release time by 30%.',
					stack: 'Storybook · Angular · TypeScript · .NET Core · Design Tokens',
					url: 'https://linkedin.com/in/jan-spinu',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80',
							alt: 'Design system component library',
						},
						{
							src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1400&q=80',
							alt: 'Component documentation interface',
						},
					],
				},
				{
					title: 'High-Concurrency Log Processing Service',
					problem: 'Handle 10k+ requests per second with reliable ingestion and cut API response times by 50% through deep query optimization.',
					stack: 'Go · PostgreSQL · Docker · CI/CD · gRPC',
					url: 'https://linkedin.com/in/jan-spinu',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
							alt: 'Log processing service overview',
						},
						{
							src: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=1400&q=80',
							alt: 'Performance metrics dashboard',
						},
					],
				},
			],
		},
		contact: {
			title: 'Contact',
			lead: 'Got a product challenge or AI integration in mind? A short note is enough — I usually reply within one business day.',
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
			budget1to5k: '$1k–$5k',
			budget5kPlus: '$5k+',
			timeline: 'Timeline',
			timelinePlaceholder: 'e.g. ASAP or Q3 2025',
			messagePlaceholder: 'Describe your project goals, scope, and context',
			privacyNote: 'Protected against spam. Privacy is guaranteed.',
			altTelegram: 'Telegram',
			altEmail: 'Email',
		},
		footer: {
			note: 'Built with Astro, SolidJS, and Tailwind. Engineered for performance and clarity.',
		},
		chat: {
			open: 'Open assistant',
			close: 'Close',
			title: 'AI assistant',
			placeholder: 'Ask about stack, past projects, or availability…',
			send: 'Send',
			empty: 'Ask me anything about Jan\'s experience, tech stack, or how we can work together.',
			error: 'Request failed. Try again.',
		},
		pagespeed: {
			title: 'Performance',
			lead: 'Verified by Google PageSpeed Insights',
			tabMobile: 'Mobile',
			tabDesktop: 'Desktop',
			labelPerformance: 'Performance',
			labelAccessibility: 'Accessibility',
			labelBestPractices: 'Best Practices',
			labelSeo: 'SEO',
			lastChecked: 'Last checked',
			refresh: 'Refresh',
			loading: 'Running audit…',
			noKey: 'PAGESPEED_API_KEY not configured.',
		},
		visitors: {
			title: 'Visitors',
			labelOnline: 'Online now',
			labelToday: 'Today',
			labelTotal: 'All time',
			labelRegions: 'Top regions',
			loading: 'Loading…',
			noData: 'Analytics not configured.',
		},
	},
	ru: {
		seo: {
			pageTitle: 'Jan Spinu · Senior Full-Stack & AI Integration Engineer',
			pageDescription:
				'Senior Full-Stack Engineer со специализацией на LLM-интеграции, автономных AI-агентах и высоконагруженных веб-системах. React, Next.js, Vue 3, Go, Python, FastAPI, TypeScript.',
			personName: 'Jan Spinu',
			personJobTitle: 'Senior Full-Stack Engineer и AI Integration Specialist',
			knowsAbout: [
				'LLM Integration',
				'Автономные AI агенты',
				'React',
				'Next.js',
				'Vue 3',
				'Nuxt',
				'Angular',
				'TypeScript',
				'Go',
				'Python',
				'FastAPI',
				'DevOps',
				'Оптимизация производительности',
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
			kicker: 'Full-Stack · AI Агенты · 5+ лет',
			headline: 'Строю быстрые продукты и внедряю AI, который работает.',
			subline:
				'Senior Full-Stack Engineer со специализацией на LLM-интеграции, автономных агентах и низколатентных архитектурах — для госсектора, финансов и продуктов с 50k+ пользователей в день.',
			photoAlt: 'Jan Spinu — Senior Full-Stack & AI Engineer',
			ctaProjects: 'Смотреть проекты',
			ctaContact: 'Связаться',
		},
		about: {
			title: 'Обо мне',
			body: 'Строю мост между сложными фронтенд-экосистемами и надёжными бэкендами — с фокусом на AI-разработку. За 5+ лет: запустил критически важные системы для госсектора, финансов и медицины; автоматизировал 40% рутинных задач автономными агентами; снизил LCP на 45% на высоконагруженных фронтендах. Чистый код, измеримые результаты, никакой воды.',
		},
		skills: {
			title: 'Навыки',
			hub: {
				frontend: 'Frontend',
				backend: 'Backend',
				uiux: 'UI / UX',
				testing: 'Тестирование',
				ai: 'AI / Агенты',
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
					title: 'Autonomous AI Agent Suite',
					problem: 'Автоматизировать 40% рутинных задач по обработке данных, сохранив аудируемость и производственную надёжность.',
					stack: 'Python · FastAPI · LangChain · Autonomous Agents · PostgreSQL',
					url: 'https://linkedin.com/in/jan-spinu',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
							alt: 'Дашборд AI-агентов',
						},
						{
							src: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1400&q=80',
							alt: 'Пайплайн оркестрации агентов',
						},
					],
				},
				{
					title: 'Кросс-фреймворк Design System',
					problem: 'Унифицировать UI-разработку на Angular и React для клиентов из госсектора, финансов и медицины — сократив время выпуска фич на 30%.',
					stack: 'Storybook · Angular · TypeScript · .NET Core · Design Tokens',
					url: 'https://linkedin.com/in/jan-spinu',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80',
							alt: 'Библиотека компонентов дизайн-системы',
						},
						{
							src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1400&q=80',
							alt: 'Документация компонентов',
						},
					],
				},
				{
					title: 'Высоконагруженный сервис обработки логов',
					problem: 'Обработать 10k+ запросов в секунду с надёжной приёмкой данных и сократить время ответа API на 50% через глубокую оптимизацию запросов.',
					stack: 'Go · PostgreSQL · Docker · CI/CD · gRPC',
					url: 'https://linkedin.com/in/jan-spinu',
					images: [
						{
							src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
							alt: 'Обзор сервиса обработки логов',
						},
						{
							src: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=1400&q=80',
							alt: 'Дашборд метрик производительности',
						},
					],
				},
			],
		},
		contact: {
			title: 'Контакт',
			lead: 'Есть продуктовый вызов или задача по AI-интеграции? Короткого сообщения достаточно — обычно отвечаю в течение рабочего дня.',
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
			budget1to5k: '$1k–$5k',
			budget5kPlus: '$5k+',
			timeline: 'Сроки',
			timelinePlaceholder: 'Например: ASAP или Q3 2025',
			messagePlaceholder: 'Опишите задачу, цели проекта и важные детали',
			privacyNote: 'Защищено от спама, конфиденциальность гарантирована.',
			altTelegram: 'Telegram',
			altEmail: 'Почта',
		},
		footer: {
			note: 'Собрано на Astro, SolidJS и Tailwind. Оптимизировано для производительности и читаемости.',
		},
		chat: {
			open: 'Открыть ассистента',
			close: 'Закрыть',
			title: 'AI-ассистент',
			placeholder: 'Спросите про стек, проекты или сотрудничество…',
			send: 'Отправить',
			empty: 'Задайте вопрос — расскажу об опыте Jan, технологиях или как мы можем поработать вместе.',
			error: 'Запрос не прошёл. Повторите.',
		},
		pagespeed: {
			title: 'Производительность',
			lead: 'Проверено Google PageSpeed Insights',
			tabMobile: 'Мобильная',
			tabDesktop: 'Десктоп',
			labelPerformance: 'Производительность',
			labelAccessibility: 'Доступность',
			labelBestPractices: 'Практики',
			labelSeo: 'SEO',
			lastChecked: 'Проверено',
			refresh: 'Обновить',
			loading: 'Проверяем…',
			noKey: 'PAGESPEED_API_KEY не настроен.',
		},
		visitors: {
			title: 'Посетители',
			labelOnline: 'Онлайн сейчас',
			labelToday: 'Сегодня',
			labelTotal: 'За всё время',
			labelRegions: 'Топ регионов',
			loading: 'Загрузка…',
			noData: 'Аналитика не настроена.',
		},
	},
};

export function getMessages(locale: Locale): Messages {
	return dictionary[locale];
}

export const contactLinks = {
	telegram: 'https://t.me/jspinu',
	email: 'mailto:jspynu15@gmail.com',
} as const;
