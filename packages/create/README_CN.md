[English](https://github.com/any-tdf/stdf/blob/main/packages/create/README.md)

# create-stdf

一个用于创建新的 [STDF](https://stdf.design) 项目的命令行工具。只需运行以下命令...

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
# 或
npm init stdf@latest
# 或
npx create-stdf@latest
```
<!-- :: -->
<!-- yarn -->
```sh
yarn create stdf@latest
```
<!-- ::: -->

...然后按照提示进行操作。

你也可以通过额外的命令行选项直接指定项目名称与默认参数。例如，如果要使用 **SvelteKit & Tailwind & TypeScript & STDF** 模板创建一个名为 my-app 的新项目，请运行：

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

提示语言为简体中文，使用 **SvelteKit & Tailwind & STDF** 模板，使用 Iconify 管理图标，使用内置 3 个主题，创建一个名为 my-app 的新项目，请运行：

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

# 命令选项

| 命令               | 默认         | 描述                     |
| ------------------ | ------------ | ------------------------ |
| -                  | -            | 项目名称，可以直接输入。 |
| -t / --template    | sktt         | 要使用的模板。           |
| -l / --language    | en_US        | 提示语言。               |
| -i / --icon-usage  | any-tdf-icon | 图标使用方式。           |
| -m / --theme-mode  | single       | 主题模式。               |

# 模板预设

| 简写 | 模板                                  | 描述     |
| ---- | ------------------------------------- | -------- |
| sktt | SvelteKit & Tailwind & TypeScript     | 默认     |
| skt  | SvelteKit & Tailwind                  | -        |
| vstt | Vite & Svelte & Tailwind & TypeScript | -        |
| vst  | Vite & Svelte & Tailwind              | -        |
| skut | SvelteKit & UnoCSS & TypeScript       | 暂未适配 |
| sku  | SvelteKit & UnoCSS                    | 暂未适配 |
| vsut | Vite & Svelte & UnoCSS & TypeScript   | 暂未适配 |
| vsu  | Vite & Svelte & UnoCSS                | 暂未适配 |

# 语言预设

| 简写  | 语言         |
| ----- | ------------ |
| en_US | 英语（美式） |
| zh_CN | 中文（简体） |
| zh_TW | 中文（繁体） |
| ja_JP | 日语         |
| ko_KR | 韩语         |
| es_ES | 西班牙语     |
| ru_RU | 俄语         |
| fr_FR | 法语         |
| de_DE | 德语         |
| it_IT | 意大利语     |

# 图标使用方式预设

| 简写         | 描述                                                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| any-tdf-icon | 使用 [@any-tdf/vite-plugin-svg-symbol](https://github.com/any-tdf/vite-plugin-svg-symbol) 插件管理图标（SVG 雪碧图）。 |
| iconify      | 配合 Tailwind CSS 使用 [Iconify](https://iconify.design) 图标集。                                                      |
| both         | 同时使用 @any-tdf/vite-plugin-svg-symbol 和 Iconify 管理图标。                                                         |
| none         | 不使用任何工具管理图标，后续手动配置。                                                                                 |

# 主题模式预设

| 简写   | 描述                                                                                       |
| ------ | ------------------------------------------------------------------------------------------ |
| single | 初始主题（STDF），后续可增加自定义主题。可到 https://stdf.design/guide/generator 生成主题。 |
| multi  | 内置 3 个主题（STDF、Sage、GoldWood）。                                                    |
| all    | 全部 42 个内置主题。                                                                       |

# 许可证

本项目基于 [MIT 许可证](https://github.com/any-tdf/stdf/blob/main/LICENSE)。
