import postcss from './postcss.config.cjs';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import svgSprite from 'rollup-plugin-stdf-icon';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        svelte({
            onwarn(warning, defaultHandler) {
                if (warning.code.startsWith('a11y-')) {
                    return;
                }

                // handle all other warnings normally
                defaultHandler(warning);
            },
        }),
        svgSprite([{ inFile: 'src/assets/icons', outFile: 'public/fonts', fileName: 'symbol' }]),
    ],
    css: { postcss },
    server: {
        hmr: true,
        host: '0.0.0.0',
        port: 8888,
        https: false,
    },
    build: { assetsDir: 'build' },
});
