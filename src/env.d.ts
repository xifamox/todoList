/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_API_URL: string; // Добавьте другие переменные окружения, если есть
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
