> Tip：All code or commands can be double-clicked to select the word, three clicks to select the line.

## 😉 Existing works

### Install

Svelte and Tailwind have been configured for direct installation.

```bash
pnpm i stdf -D
# or
npm i stdf -D
# or
bun i stdf -D
```

### Used in Svelte

```svelte
<!-- Button Demo -->
<script>
	import { Button } from 'stdf';
</script>

<Button>Default</Button>
```

## 😓 No works

### Use create-stdf

You can try using [create-stdf](https://www.npmjs.com/package/create-stdf) to quickly create a project.

```bash
pnpm create stdf
# or
npm create stdf@latest
# or
npm init stdf@latest
# or
npx create-stdf@latest
# or
bun create stdf
```

### Build your own project

Use the Vite example to create the project here. See [Vite documentation](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

```sh
npm create vite@latest
```

Follow the prompts to create a project.

Configuration Tailwind CSS. See [Tailwind CSS documentation](https://tailwindcss.com/docs/guides/vite#svelte)。

1. Install Tailwind CSS and other dependencies, then generate tailwind.config.js and postcss.config.js files.

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Add a template file within the `tailwind.config.js` file. Note that `./node_modules/stdf/**/*.svelte` is added in content, which is the component location of STDF.The colors of theme can be modified according to its own needs. Reference [STDF Guide - Color](/#/guide/color).

Note: The 'content' in the Tailwind configuration file represents all files that may use Tailwind, please do not omit any files. Please set darkMode to 'class' to match STDF's dark mode.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
	// ...
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/stdf/**/*.svelte'],
	theme: {
		colors: {
			// Theme color
			primary: {
				50: 'rgba(var(--theme-color-primary-50), <alpha-value>)',
				100: 'rgba(var(--theme-color-primary-100), <alpha-value>)',
				200: 'rgba(var(--theme-color-primary-200), <alpha-value>)',
				300: 'rgba(var(--theme-color-primary-300), <alpha-value>)',
				400: 'rgba(var(--theme-color-primary-400), <alpha-value>)',
				500: 'rgba(var(--theme-color-primary-500), <alpha-value>)',
				DEFAULT: 'rgba(var(--theme-color-primary), <alpha-value>)',
				700: 'rgba(var(--theme-color-primary-700), <alpha-value>)',
				800: 'rgba(var(--theme-color-primary-800), <alpha-value>)',
				900: 'rgba(var(--theme-color-primary-900), <alpha-value>)',
				950: 'rgba(var(--theme-color-primary-950), <alpha-value>)',
			},
			dark: {
				50: 'rgba(var(--theme-color-dark-50), <alpha-value>)',
				100: 'rgba(var(--theme-color-dark-100), <alpha-value>)',
				200: 'rgba(var(--theme-color-dark-200), <alpha-value>)',
				300: 'rgba(var(--theme-color-dark-300), <alpha-value>)',
				400: 'rgba(var(--theme-color-dark-400), <alpha-value>)',
				500: 'rgba(var(--theme-color-dark-500), <alpha-value>)',
				DEFAULT: 'rgba(var(--theme-color-dark), <alpha-value>)',
				700: 'rgba(var(--theme-color-dark-700), <alpha-value>)',
				800: 'rgba(var(--theme-color-dark-800), <alpha-value>)',
				900: 'rgba(var(--theme-color-dark-900), <alpha-value>)',
				950: 'rgba(var(--theme-color-dark-950), <alpha-value>)',
			},
			primaryBlack: 'rgba(var(--theme-color-primaryBlack), <alpha-value>)',
			primaryWhite: 'rgba(var(--theme-color-primaryWhite), <alpha-value>)',
			darkBlack: 'rgba(var(--theme-color-darkBlack), <alpha-value>)',
			darkWhite: 'rgba(var(--theme-color-darkWhite), <alpha-value>)',

			// Functional color
			success: 'rgba(var(--theme-color-functional-success), <alpha-value>)',
			warning: 'rgba(var(--theme-color-functional-warning), <alpha-value>)',
			error: 'rgba(var(--theme-color-functional-error), <alpha-value>)',
			info: 'rgba(var(--theme-color-functional-info), <alpha-value>)',

			// Extended color
			extend0: 'rgba(var(--theme-color-extend0), <alpha-value>)',
			extend1: 'rgba(var(--theme-color-extend1), <alpha-value>)',
			extend2: 'rgba(var(--theme-color-extend2), <alpha-value>)',

			// Neutral color
			black: '#000000',
			white: '#ffffff',
			gray: {
				50: '#f2f2f2',
				100: '#e6e6e6',
				200: '#cccccc',
				300: '#b3b3b3',
				400: '#999999',
				500: '#808080',
				600: '#666666',
				700: '#4D4D4D',
				800: '#333333',
				900: '#1A1A1A',
				950: '#0D0D0D',
			},
			transparent: 'transparent',
		},
		// ...
	},
	darkMode: 'class',
	// ...
};
```

3. Add Tailwind CSS to the entry CSS file, such as./src/index.css, and import the CSS file in the entry file main.js.

4. Start the project.

```sh
npm run dev
# or
bun dev
```
