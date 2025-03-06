import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import svgSprite from "rollup-plugin-stdf-icon";

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		svgSprite([
			{
				inFile: "src/assets/svgs",
				outFile: "static/fonts",
				fileName: "symbol",
			},
		]),
	],
	server: { hmr: true, host: "0.0.0.0", port: 8888 },
});
