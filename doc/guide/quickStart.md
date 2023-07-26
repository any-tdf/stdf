> Tip：所有代码或命令可以双击选定词，三击选定行。

## 😉 已有工程

### 安装

已有配置好 Svelte 与 Tailwind 的工程，直接安装。

```bash
pnpm i stdf -D
# or
npm i stdf -D
```

### 在 Svelte 中使用

```svelte
<!-- Button Demo -->
<script>
import { Button } from 'stdf';
</script>

<Button>默认</Button>
```

## 😓 无工程

### 使用 create-stdf

可以尝试使用 `create-stdf` 快速创建工程。（beta 版本，可能存在问题）

```bash
pnpm create stdf@latest
# or
npm create stdf@latest
# or
npm init stdf@latest
# or
npx create-stdf@latest
```

### 自行搭建工程

此处用 Vite 示例创建工程，参考 [Vite 文档](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)。

```sh
npm create vite@latest
```

按照提示操作创建工程。

参考 [Tailwind CSS 文档](https://tailwindcss.com/docs/guides/vite) 配置 Tailwind CSS。

1. 安装 Tailwind CSS 和其他依赖，然后生成 `tailwind.config.js` 和 `postcss.config.js` 文件。

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. 在 `tailwind.config.js` 文件内添加模板文件。注意 content 内添加`./node_modules/stdf/src/**/*.svelte`，这是 STDF 的组件位置。其中 theme 的 colors 可以根据自己的需要进行修改。可参考 [STDF 指南 - 色彩](/#/guide?nav=color)。

注意：Tailwind 配置文件中的 content 即表示所有可能用到 Tailwind 的文件，请不要遗漏。darkMode 请设置为 'class'，这是为了配合 STDF 的暗黑模式。

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    // ...
    content: ['./src/**/*.{html,js,svelte}', './src/App.svelte', './node_modules/stdf/src/**/*.svelte'],
    theme: {
        colors: {
            // 主题色
            primary: '#0B24FB',
            dark: '#FFC043',
            blue: '#0B24FB', // primary 别名
            yellow: '#FFC043', // dark 别名

            // 扩展色
            purple: '#7356BF',
            green: '#05944F',
            orange: '#FF6937',

            // 功能色
            success: '#11BB8D',
            warning: '#B95000',
            error: '#DA1414',
            info: '#2E5AAC',

            // 中性色
            black: '#000000',
            white: '#fff',
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
            transparent: 'transparent',
        },
    },
    darkMode: 'class',
    // ...
};
```

3. 将 Tailwind CSS 添加到入口 CSS 文件中，如 `./src/index.css`，并在入口文件 main.js 中引入这个 CSS 文件。

4. 启动项目。

```sh
npm run dev
```
