> Tip：All code or commands can be double-clicked to select the word, three clicks to select the line.

## 😉 Existing works

### Install

Svelte and Tailwind have been configured for direct installation.

```bash
npm i stdf
# or
yarn add stdf
# or
pnpm i stdf
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

### Construction project

Use the Vite example to create the project here. See [Vite documentation](https://vitejs.cn/vite3-cn/guide/#trying-vite-online).

```sh
npm create vite@latest
```

Follow the prompts to create a project.

### Configuration Tailwind CSS

See [Tailwind CSS documentation](https://tailwindcss.com/docs/guides/vite)。

1. Install Tailwind CSS and other dependencies, then generate tailwind.config.js and postcss.config.js files.

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Add the template file to tailwind.config.js.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,svelte}'],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

3. Add Tailwind CSS to the entry CSS file, such as./src/index.css, and import the CSS file in the entry file main.js.

4. Start the project.

```sh
npm run dev
```
