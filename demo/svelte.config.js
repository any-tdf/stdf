import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// 使用纯静态适配器，并配置打包文件的输入目录
		// Use pure static adapter and configure the input directory of the package file
		adapter: adapter({
			// may differ from host to host
			// 可能因主机而异
			fallback: 'index.html',
		}),
		paths: {
			// @ts-ignore
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
		},
	},
	onwarn: (warning, handler) => {
		if (warning.code.startsWith('a11y-')) {
			return;
		}
		handler(warning);
	},
	preprocess: vitePreprocess(),
};

export default config;
