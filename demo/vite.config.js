import postcss from './postcss.config.cjs';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [svelte()],
    css: { postcss },
    server: {
        hmr: true,
        host: '0.0.0.0',
        port: 8888,
        // 是否开启 https
        https: false,
    },
});
