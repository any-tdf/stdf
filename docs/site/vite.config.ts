import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import md from 'rollup-plugin-md-ts';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss(), md({ marked: {}, include: ['../mds/**/*.md', '../../packages/**/*.md'] })],
	server: { hmr: true, host: '0.0.0.0', port: 5555 },
	build: { assetsDir: 'build' }
});
