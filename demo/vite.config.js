import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svgSprite from 'rollup-plugin-stdf-icon';

// @ts-ignore
export default defineConfig({
	// @ts-ignore
	plugins: [sveltekit({}), svgSprite()],
	server: {
		hmr: true,
		host: '0.0.0.0',
		port: 8888,
		https: false,
	},
});
