> Tip：All code or commands can be double-clicked to select the word, three clicks to select the line.

## 😉 Existing works

### Install

Svelte and Tailwind have been configured for direct installation.

```bash
npm i stdf -D
# or
pnpm i stdf -D
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

Use the Vite example to create the project here. See [Vite documentation](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

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

2. Add a template file within the `tailwind.config.js` file. Note that `./node_modules/stdf/src/**/*.svelte` is added in content, which is the component location of STDF.The colors of theme can be modified according to its own needs. Reference [STDF Guide - Color](/#/Guide?nav=color).

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    // ...
    content: ['./index.html', './src/**/*.{html,js,svelte}', './node_modules/stdf/src/**/*.svelte'],
    theme: {
        colors: {
            primary: '#0B24FB',
            dark: '#FFC043',
            purple: '#7356BF',
            green: '#05944F',
            orange: '#FF6937',
            black: '#000000',
            gray1: '#23262B',
            gray2: '#2A2B2F',
            gray3: '#303239',
            gray4: '#373940',
            gray5: '#414249',
            gray6: '#747B84',
            gray7: '#DADEE3',
            gray8: '#EBEEF2',
            gray9: '#F4F6F9',
            gray10: '#FAFAFB',
            success: '#11BB8D',
            warning: '#B95000',
            error: '#DA1414',
            info: '#2E5AAC',
            transparent: 'transparent',
        },
    },
    darkMode: 'class',
    // ...
};
```

3. Add Tailwind CSS to the entry CSS file, such as./src/index.css, and import the CSS file in the entry file main.js.

4. Start the project.

```sh
npm run dev
```
