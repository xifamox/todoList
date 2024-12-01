import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue'],
			dts: 'src/app/types/auto-imports.d.ts'
		}),
		checker({
			vueTsc: true,
			eslint: {
				lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}"'
			}
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src/', import.meta.url))
		},
		extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
	}
});
