[English](https://github.com/any-tdf/stdf/blob/main/packages/create-stdf/README.md)

> v0.2.2 之后支持选择图标使用方式，使用 `stdf-icon` 或 `iconify`。

# create-stdf

一个用于创建新的 [STDF](https://stdf.design) 项目的命令行工具。只需运行以下命令...

<!-- :::code-groups -->
<!-- pnpm -->

```sh
pnpm create stdf
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
<!-- bun -->

```sh
bun create stdf
```

<!-- :: -->
<!-- yarn -->

```sh
yarn create stdf
```

<!-- ::: -->

...然后按照提示进行操作。

你也可以通过额外的命令行选项直接指定项目名称和要使用的模板。例如，如果要使用 **SvelteKit & Tailwind & TypeScript & STDF & stdf-icon** 模板创建一个名为 `my-app` 的新项目，请运行：

<!-- :::code-groups -->
<!-- pnpm -->

```sh
pnpm create stdf my-app
```

<!-- :: -->
<!-- npm -->

```sh
npm create stdf@latest my-app
```

<!-- :: -->
<!-- bun -->

```sh
bun create stdf my-app
```

<!-- :: -->
<!-- yarn -->

```sh
yarn create stdf my-app
```

<!-- ::: -->

如果要使用 **SvelteKit & Tailwind & STDF & stdf-icon** 模板，请运行：

<!-- :::code-groups -->
<!-- pnpm -->

```sh
pnpm create stdf my-app --template skts
# 或
pnpm create stdf my-app -t skts
```

<!-- :: -->
<!-- npm -->

```sh
npm create stdf@latest my-app --template skts
# 或
npm create stdf@latest my-app -t skts
```

<!-- :: -->
<!-- bun -->

```sh
bun create stdf my-app --template skts
# 或
bun create stdf my-app -t skts
```

<!-- :: -->
<!-- yarn -->

```sh
yarn create stdf my-app --template skts
# 或
yarn create stdf my-app -t skts
```

<!-- ::: -->

模板预设包括：

| 简写   | 模板                                                    | 描述     |
| ------ | ------------------------------------------------------- | -------- |
| sktts  | SvelteKit & Tailwind & TypeScript & stdf-icon           | 默认     |
| skts   | SvelteKit & Tailwind & stdf-icon                        | -        |
| sktti  | SvelteKit & Tailwind & TypeScript & iconify             | -        |
| skti   | SvelteKit & Tailwind & iconify                          | -        |
| skttsi | SvelteKit & Tailwind & TypeScript & stdf-icon & iconify | -        |
| sktsi  | SvelteKit & Tailwind & stdf-icon & iconify              | -        |
| skuts  | SvelteKit & UnoCSS & TypeScript & stdf-icon             | 暂未适配 |
| skus   | SvelteKit & UnoCSS & stdf-icon                          | 暂未适配 |
| skuti  | SvelteKit & UnoCSS & TypeScript & iconify               | 暂未适配 |
| skui   | SvelteKit & UnoCSS & iconify                            | 暂未适配 |
| skutsi | SvelteKit & UnoCSS & TypeScript & stdf-icon & iconify   | 暂未适配 |
| skusi  | SvelteKit & UnoCSS & stdf-icon & iconify                | 暂未适配 |

# 命令选项

| 命令            | 类型   | 默认  | 描述                                                       |
| --------------- | ------ | ----- | ---------------------------------------------------------- |
| -               | string | -     | 项目名称，可以直接输入。                                   |
| -t / --template | string | sktts | 要使用的模板。 |
| -l / --language | string | en_US | 提示语言。                                                 |

# 支持的语言

| 代码  | 语言         |
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

例如：

<!-- :::code-groups -->
<!-- pnpm -->

```sh
pnpm create stdf my-app -l zh_CN
```

<!-- :: -->
<!-- npm -->

```sh
npm create stdf@latest my-app -l zh_CN
```

<!-- :: -->
<!-- bun -->

```sh
bun create stdf my-app -l zh_CN
```

<!-- :: -->
<!-- yarn -->

```sh
yarn create stdf my-app -l zh_CN
```

<!-- ::: -->

# 许可证

本项目基于 [MIT 许可证](https://github.com/any-tdf/stdf/blob/main/LICENSE)。
