import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import md from 'rollup-plugin-md-ts';

export default defineConfig({
	plugins: [
		sveltekit(),
		md({
			marked: {},
			include: ['../mds/**/*.md', './src/pages/guide/**/*.md', '../../packages/**/*.md']
		})
	],
	server: { hmr: true, host: '0.0.0.0', port: 5555 }
});
