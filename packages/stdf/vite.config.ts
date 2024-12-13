import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svgSprite from 'rollup-plugin-stdf-icon';

export default defineConfig({
	plugins: [sveltekit(), svgSprite([{ inFile: 'src/assets/svgs', outFile: 'static/fonts', fileName: 'symbol' }])],
	server: { hmr: true, host: '0.0.0.0', port: 8888 },
	build: {
		assetsDir: 'build',
		rollupOptions: {
			output: {
				manualChunks: (id: string) => {
					if (id.includes('node_modules')) {
						return 'vendor/index';
					}
				}
			}
		}
	}
});
