[简体中文](https://github.com/any-tdf/stdf/blob/main/packages/create-stdf/README_CN.md)

> Since v0.2.2, you can choose to use stdf-icon or iconify for icons.

# create-stdf

A CLI for creating new [STDF](https://stdf.design) projects. Just run...

<!-- :::code-groups -->
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
<!-- bun -->
```sh
bun create stdf@latest
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
<!-- bun -->
```sh
bun create stdf@latest my-app
```
<!-- :: -->
<!-- yarn -->
```sh
yarn create stdf@latest my-app
```
<!-- ::: -->

Prompt language is Simplified Chinese, use **SvelteKit & Tailwind & STDF** template, use Iconify to manage icons, create a new project named my-app, run:

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm create stdf@latest my-app --template skt --language zh_CN --icon-usage iconify
# or
pnpm create stdf@latest my-app --t skt --l zh_CN --i iconify
```
<!-- :: -->
<!-- npm -->
```sh
npm create stdf@latest my-app --template skt --language zh_CN --icon-usage iconify
# or
npm create stdf@latest my-app --t skt --l zh_CN --i iconify
```
<!-- :: -->
<!-- bun -->
```sh
bun create stdf@latest my-app --template skt --language zh_CN --icon-usage iconify
# or
bun create stdf@latest my-app --t skt --l zh_CN --i iconify
```
<!-- :: -->
<!-- yarn -->
```sh
yarn create stdf@latest my-app --template skt --language zh_CN --icon-usage iconify
# or
yarn create stdf@latest my-app --t skt --l zh_CN --i iconify
```
<!-- ::: -->

# Options

| Option          | Optional values   | Default | Description                                    |
| --------------- | ------ | ------- | ---------------------------------------------- |
| -               | -       | -       | The name of the project, you can direct input. |
| --t / --template | sktt/skt/skut/sku | sktt | The template to use.                           |
| --l / --language | en_US/zh_CN/zh_TW/ja_JP/ko_KR/es_ES/ru_RU/fr_FR/de_DE/it_IT | en_US | The language of the prompts.                   |
| --i / --icon-usage | stdf-icon/iconify/both/none | stdf-icon | The icon usage method.                         |

# Template presets

| Abbreviation | Template                                                | Description     |
| ------------ | ------------------------------------------------------- | --------------- |
| sktt        | SvelteKit & Tailwind & TypeScript           | Default         |
| skt         | SvelteKit & Tailwind                         | -               |
| skut        | SvelteKit & UnoCSS & TypeScript             | Not adapted yet |
| sku         | SvelteKit & UnoCSS                         | Not adapted yet |

# Language presets

| Abbreviation  | Language              |
| ----- | --------------------- |
| en_US | English (US)          |
| zh_CN | Chinese (Simplified)  |
| zh_TW | Chinese (Traditional) |
| ja_JP | Japanese              |
| ko_KR | Korean                |
| es_ES | Spanish               |
| ru_RU | Russian               |
| fr_FR | French                |
| de_DE | German                |
| it_IT | Italian               |

# Icon usage presets

| Abbreviation | Description                                                           |
| --------- | -------------------------------------------------------------- |
| stdf-icon | Use rollup-plugin-stdf-icon to manage icons.                  |
| iconify   | Use iconify to manage icons.                                  |
| both      | Use both rollup-plugin-stdf-icon and iconify to manage icons. |
| none      | Do not use any tool to manage icons.                                       |

# License

This project is licensed under the [MIT License](https://github.com/any-tdf/stdf/blob/main/LICENSE).
