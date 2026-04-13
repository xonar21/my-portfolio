/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly GOOGLE_GENERATIVE_AI_API_KEY?: string;
	readonly GEMINI_API_KEY?: string;
	readonly GEMINI_MODEL?: string;
	readonly CHAT_MOCK_REPLY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
