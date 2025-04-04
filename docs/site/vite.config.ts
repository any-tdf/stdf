import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import md from 'rollup-plugin-md-ts';

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		md({
			marked: {},
			include: ['../mds/**/*.md', '../../packages/**/*.md']
		})
	],
	server: { hmr: true, host: '0.0.0.0', port: 5555 },
	build: {
		assetsDir: 'build',
		rollupOptions: {
			output: {
				manualChunks: (id: string) => {
					// 将 node_modules 中的包拆分到单独的 build/node_modules.js 文件中
					if (id.includes('node_modules')) {
						return 'vendor/index';
					}
					// 将 sr/lib 中的包拆分到单独的 build/lib/ 文件中
					if (id.includes('src/lib/')) {
						return 'lib/index';
					}
					// 将 src/routes/+page.svelte 单独拆分到 build/home/index.js 文件中
					if (id.includes('src/routes/+page.svelte')) {
						return 'home/index';
					}
					// 将 src/routes/guide 单独拆分到 build/guide/index.js 文件中
					if (id.includes('src/routes/guide')) {
						return 'guide/index';
					}
					// 将 src/routes/components 单独拆分到 build/components/index.js 文件中
					if (id.includes('src/routes/components')) {
						return 'components/index';
					}
				}
			}
		}
	}
});
