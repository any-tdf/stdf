> Tip：所有代码或命令可以双击选定词，三击选定行。

## 😉 已有工程

### 安装

已有配置好 Svelte 与 Tailwind 的工程，直接安装。

```bash
npm i stdf
# or
yarn add stdf
# or
pnpm i stdf
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

### 搭建工程

此处用 Vite 示例创建工程，参考 [Vite 文档](https://vitejs.cn/vite3-cn/guide/#trying-vite-online)。

```sh
npm create vite@latest
```

按照提示操作创建工程。

### 配置 Tailwind CSS

参考 [Tailwind CSS 文档](https://tailwindcss.com/docs/guides/vite)。

1. 安装 Tailwind CSS 和其他依赖，然后生成 `tailwind.config.js` 和 `postcss.config.js` 文件。

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. 在 tailwind.config.js 文件内添加模板文件。

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

3. 将 Tailwind CSS 添加到入口 CSS 文件中，如 `./src/index.css`，并在入口文件 main.js 中引入这个 CSS 文件。

4. 启动项目。

```sh
npm run dev
```
