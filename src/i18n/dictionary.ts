export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export type ProjectCard = {
	title: string;
	problem: string;
	url?: string;
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
					title: 'alo.md — Electronics Marketplace',
					problem: 'Online marketplace specializing in electronics, mobile phones, and household appliances in Moldova. Supports credit and installment purchase options for customers.',
					url: 'https://alo.md/ro',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/1.png', alt: 'alo.md homepage' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/2.png', alt: 'alo.md product listing' },
					],
				},
				{
					title: 'Ecaterix — Security Systems',
					problem: 'Corporate website for a company providing security systems, fire safety, and engineering network services — covering design, installation, and maintenance for residential and commercial clients.',
					url: 'https://ecaterix.md/',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/3.png', alt: 'Ecaterix homepage' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/4.png', alt: 'Ecaterix services page' },
					],
				},
				{
					title: 'Terenuri.md — Land Real Estate Portal',
					problem: 'Specialized real estate portal for the sale and lease of land plots across Moldova. Covers agricultural, residential, and industrial land with detailed maps and descriptions.',
					url: 'https://terenuri.md/',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/5.png', alt: 'Terenuri.md land listings' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/6.png', alt: 'Terenuri.md map view' },
					],
				},
				{
					title: 'GlobalStore.md — Household Retail',
					problem: 'Large retail platform offering a diverse selection of household goods: kitchenware, home decor, toys, and cleaning supplies — a one-stop shop for daily family essentials.',
					url: 'https://globalstore.md/en',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/7.png', alt: 'GlobalStore homepage' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/8.png', alt: 'GlobalStore product categories' },
					],
				},
				{
					title: 'Farmacie.md — Online Pharmacy',
					problem: 'Online pharmaceutical platform for the Farmacia Familiei network. Search medicines, beauty products, and health supplements; check local branch availability and loyalty programs.',
					url: 'https://farmacie.md/',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/9.png', alt: 'Farmacie.md homepage' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/10.png', alt: 'Farmacie.md product search' },
					],
				},
				{
					title: 'Bizon 360° — CRM Platform',
					problem: 'Comprehensive CRM platform to streamline business operations and amplify sales. Features full pipeline visibility, lead management, task distribution, and real-time analytics for deal forecasting.',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/11.png', alt: 'Bizon 360 CRM dashboard' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/12.png', alt: 'Bizon 360 sales pipeline' },
					],
				},
				{
					title: 'DDWC — Disability Assessment System',
					problem: 'State information system for Moldova\'s National Council for Determining Limitations and Employability. Manages case intake, request tracking, and individual records for disability and work capacity assessments.',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/13.png', alt: 'DDWC system dashboard' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/14.png', alt: 'DDWC case management' },
					],
				},
				{
					title: 'CEC Moldova — Electoral Platform',
					problem: 'Official portal for the Central Election Commission of the Republic of Moldova. Ensures transparent electoral processes and provides citizens with reliable information for exercising their voting rights.',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/15.png', alt: 'CEC Moldova portal' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/16.png', alt: 'CEC Moldova electoral data' },
					],
				},
				{
					title: 'MedScheduler — Clinical Booking System',
					problem: 'Multi-role Angular application for a private clinic network, enabling doctors, administrators, and patients to manage appointments, medical records, and real-time schedule availability.',
					images: [
						{ src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80', alt: 'Medical scheduling dashboard' },
						{ src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1400&q=80', alt: 'Clinic appointment calendar' },
					],
				},
				{
					title: 'LogStream — Event Ingestion Service',
					problem: 'High-throughput Go service for event streaming and log aggregation, processing 50k+ events per second with fault-tolerant delivery and sub-millisecond routing for distributed systems.',
					images: [
						{ src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80', alt: 'Server infrastructure' },
						{ src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80', alt: 'Real-time data monitoring' },
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
			note: '© 2025 Jan Spinu · Anonymous analytics: visit counts only, no cookies or personal data.',
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
					title: 'alo.md — Маркетплейс электроники',
					problem: 'Онлайн-маркетплейс электроники, мобильных телефонов и бытовой техники в Молдове. Поддерживает покупку товаров в кредит и рассрочку.',
					url: 'https://alo.md/ro',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/1.png', alt: 'Главная страница alo.md' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/2.png', alt: 'Каталог товаров alo.md' },
					],
				},
				{
					title: 'Ecaterix — Системы безопасности',
					problem: 'Сайт компании, предоставляющей профессиональные услуги в области систем безопасности, пожарной защиты и инженерных сетей — проектирование, монтаж и обслуживание для жилых и коммерческих объектов.',
					url: 'https://ecaterix.md/',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/3.png', alt: 'Главная страница Ecaterix' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/4.png', alt: 'Услуги Ecaterix' },
					],
				},
				{
					title: 'Terenuri.md — Портал земельной недвижимости',
					problem: 'Специализированный портал недвижимости для продажи и аренды земельных участков по всей Молдове. Охватывает сельскохозяйственные, жилые и промышленные участки с подробными картами.',
					url: 'https://terenuri.md/',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/5.png', alt: 'Список участков Terenuri.md' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/6.png', alt: 'Карта участков Terenuri.md' },
					],
				},
				{
					title: 'GlobalStore.md — Товары для дома',
					problem: 'Крупная розничная платформа товаров для дома: посуда, декор, игрушки и бытовая химия — всё необходимое для семьи и дома в одном месте.',
					url: 'https://globalstore.md/en',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/7.png', alt: 'Главная страница GlobalStore' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/8.png', alt: 'Категории товаров GlobalStore' },
					],
				},
				{
					title: 'Farmacie.md — Онлайн-аптека',
					problem: 'Онлайн-платформа аптечной сети Farmacia Familiei. Поиск лекарств, косметики и БАДов, проверка наличия в филиалах и участие в программах лояльности.',
					url: 'https://farmacie.md/',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/9.png', alt: 'Главная страница Farmacie.md' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/10.png', alt: 'Поиск лекарств Farmacie.md' },
					],
				},
				{
					title: 'Bizon 360° — CRM-платформа',
					problem: 'Комплексная CRM-платформа для автоматизации бизнес-процессов и роста продаж. Полная видимость воронки, управление лидами, распределение задач и аналитика в реальном времени.',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/11.png', alt: 'Дашборд Bizon 360 CRM' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/12.png', alt: 'Воронка продаж Bizon 360' },
					],
				},
				{
					title: 'DDWC — Система оценки трудоспособности',
					problem: 'Государственная информационная система Национального совета по определению ограничений трудоспособности Молдовы. Управление заявками, учёт обращений и ведение личных дел.',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/13.png', alt: 'Дашборд системы DDWC' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/14.png', alt: 'Управление делами DDWC' },
					],
				},
				{
					title: 'ЦИК Молдовы — Избирательный портал',
					problem: 'Официальный портал Центральной избирательной комиссии Республики Молдова. Обеспечивает прозрачность избирательных процессов и доступ граждан к достоверной информации.',
					images: [
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/15.png', alt: 'Портал ЦИК Молдовы' },
						{ src: 'https://raw.githubusercontent.com/xonar21/my-portfolio/main/img-for-projects/16.png', alt: 'Электоральные данные ЦИК' },
					],
				},
				{
					title: 'MedScheduler — Система записи в клинику',
					problem: 'Многоролевое Angular-приложение для сети частных клиник. Управление записями к врачам, медкартами и расписанием в реальном времени для пациентов, врачей и администраторов.',
					images: [
						{ src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80', alt: 'Дашборд медицинского планирования' },
						{ src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1400&q=80', alt: 'Календарь записей клиники' },
					],
				},
				{
					title: 'LogStream — Сервис обработки событий',
					problem: 'Высокопроизводительный Go-сервис для потоковой обработки событий и агрегации логов — 50k+ событий в секунду с отказоустойчивой доставкой и маршрутизацией с задержкой менее миллисекунды.',
					images: [
						{ src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80', alt: 'Серверная инфраструктура' },
						{ src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80', alt: 'Мониторинг данных в реальном времени' },
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
			note: '© 2025 Ян Спину · Анонимная аналитика: только счётчики посещений, без cookie и персональных данных.',
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
