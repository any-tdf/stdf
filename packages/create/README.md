[简体中文](https://github.com/any-tdf/stdf/blob/main/packages/create/README_CN.md)

# create-stdf

A CLI for creating new [STDF](https://stdf.design) projects. Just run...

<!-- :::code-groups -->
<!-- bun -->
```sh
bun create stdf@latest
```
<!-- :: -->
<!-- pnpm -->
```sh
pnpm create stdf@latest
```
<!-- :: -->
<!-- npm -->
```sh
npm create stdf@latest
# or
npm init stdf@latest
# or
npx create-stdf@latest
```
<!-- :: -->
<!-- yarn -->
```sh
yarn create stdf@latest
```
<!-- ::: -->

...and follow the prompts.

You can also directly specify the project name and the template you want to use via additional command line options. For example: create a new project named my-app using the **SvelteKit & Tailwind & TypeScript & STDF** template, run:

<!-- :::code-groups -->
<!-- bun -->
```sh
bun create stdf@latest my-app
```
<!-- :: -->
<!-- pnpm -->
```sh
pnpm create stdf@latest my-app
```
<!-- :: -->
<!-- npm -->
```sh
npm create stdf@latest my-app
```
<!-- :: -->
<!-- yarn -->
```sh
yarn create stdf@latest my-app
```
<!-- ::: -->

Prompt language is Simplified Chinese, use **SvelteKit & Tailwind & STDF** template, use Iconify to manage icons, use 3 built-in themes, create a new project named my-app, run:

<!-- :::code-groups -->
<!-- bun -->
```sh
bun create stdf@latest my-app -t skt -l zh_CN -i iconify -m multi
```
<!-- :: -->
<!-- pnpm -->
```sh
pnpm create stdf@latest my-app -t skt -l zh_CN -i iconify -m multi
```
<!-- :: -->
<!-- npm -->
```sh
npm create stdf@latest my-app -t skt -l zh_CN -i iconify -m multi
```
<!-- :: -->
<!-- yarn -->
```sh
yarn create stdf@latest my-app -t skt -l zh_CN -i iconify -m multi
```
<!-- ::: -->

# Options

| Option             | Default      | Description                                    |
| ------------------ | ------------ | ---------------------------------------------- |
| -                  | -            | The name of the project, you can direct input. |
| -t / --template    | sktt         | The template to use.                           |
| -l / --language    | en_US        | The language of the prompts.                   |
| -i / --icon-usage  | any-tdf-icon | The icon usage method.                         |
| -m / --theme-mode  | single       | The theme mode.                                |

# Template presets

| Abbreviation | Template                              | Description     |
| ------------ | ------------------------------------- | --------------- |
| sktt         | SvelteKit & Tailwind & TypeScript     | Default         |
| skt          | SvelteKit & Tailwind                  | -               |
| vstt         | Vite & Svelte & Tailwind & TypeScript | -               |
| vst          | Vite & Svelte & Tailwind              | -               |
| skut         | SvelteKit & UnoCSS & TypeScript       | Not adapted yet |
| sku          | SvelteKit & UnoCSS                    | Not adapted yet |
| vsut         | Vite & Svelte & UnoCSS & TypeScript   | Not adapted yet |
| vsu          | Vite & Svelte & UnoCSS                | Not adapted yet |

# Language presets

| Abbreviation | Language              |
| ------------ | --------------------- |
| en_US        | English (US)          |
| zh_CN        | Chinese (Simplified)  |
| zh_TW        | Chinese (Traditional) |
| ja_JP        | Japanese              |
| ko_KR        | Korean                |
| es_ES        | Spanish               |
| ru_RU        | Russian               |
| fr_FR        | French                |
| de_DE        | German                |
| it_IT        | Italian               |

# Icon usage presets

| Abbreviation | Description                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| any-tdf-icon | Use [@any-tdf/vite-plugin-svg-symbol](https://github.com/any-tdf/vite-plugin-svg-symbol) to manage icons with SVG symbol sprites.  |
| iconify      | Use [Iconify](https://iconify.design) icon sets with Tailwind CSS.                                                                 |
| both         | Use both @any-tdf/vite-plugin-svg-symbol and Iconify to manage icons.                                                              |
| none         | Do not use any tool to manage icons, configure manually later.                                                                     |

# Theme mode presets

| Abbreviation | Description                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| single       | Initial theme (STDF), add custom themes later. You can generate custom themes at https://stdf.design/guide/generator               |
| multi        | 3 built-in themes (STDF, Sage, GoldWood).                                                                                          |
| all          | All 42 built-in themes.                                                                                                            |

# License

This project is licensed under the [MIT License](https://github.com/any-tdf/stdf/blob/main/LICENSE).
