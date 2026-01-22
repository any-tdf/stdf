import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import md from 'rollup-plugin-md-ts';
import svgSprite from 'rollup-plugin-stdf-icon';

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		md({ marked: {}, include: ['../mds/**/*.md', '../../packages/**/*.md'] }),
		svgSprite([{ inFile: 'src/lib/symbol', outFile: 'static/fonts', fileName: 'symbol' }])
	],
	server: {
		hmr: true,
		host: '0.0.0.0',
		port: 5555,
		fs: {
			// 允许访问 packages 目录
			allow: ['../..']
		}
	},
	build: { assetsDir: 'build' }
});
