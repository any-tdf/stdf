[English](https://github.com/dufu1991/stdf/blob/main/packages/create-stdf/README.md)

# create-stdf

一个用于创建新的 [STDF](https://stdf.design) 项目的命令行工具。只需运行以下命令...

使用 PNPM：

```bash
pnpm create stdf
```

使用 NPM：

```bash
npm create stdf@latest
# 或者
npm init stdf@latest
# 或者
npx create-stdf@latest
```

...然后按照提示进行操作。

你也可以通过额外的命令行选项直接指定项目名称和要使用的模板。例如，如果要使用 **Vite + Svelte + Tailwind + STDF** 模板创建一个名为 `my-app` 的新项目，请运行：

```bash
# pnpm
pnpm create stdf my-app

# npm
npm create stdf@latest my-app
```

如果要使用 **Vite + UnoCSS + Svelte + STDF** 模板，请运行：

```bash
# pnpm
pnpm create stdf my-app --template vu
# 或者
pnpm create stdf my-app -t vu

# npm
npm create stdf@latest my-app --template vu
# 或者
npm create stdf@latest my-app -t vu
```

模板预设包括：

| 简写 | 模板                                         | 描述     |
| ---- | -------------------------------------------- | -------- |
| vt   | Vite + Tailwind + Svelte + STDF              | 默认     |
| vu   | Vite + UnoCSS + Svelte + STDF                | -        |
| skt  | SvelteKit + Tailwind + STDF                  | -        |
| sku  | SvelteKit + UnoCSS + STDF                    | -        |
| vtt  | Vite + Tailwind + TypeScript + Svelte + STDF | 尚未适配 |
| vut  | Vite + UnoCSS + TypeScript + Svelte + STDF   | 尚未适配 |
| sktt | SvelteKit + Tailwind + TypeScript + STDF     | 尚未适配 |
| skut | SvelteKit + UnoCSS + TypeScript + STDF       | 尚未适配 |

# 命令选项

| 命令            | 类型   | 默认  | 描述                                                                                 |
| --------------- | ------ | ----- | ------------------------------------------------------------------------------------ |
| -               | string | -     | 项目名称，可以直接输入。                                                             |
| -t / --template | string | vt    | 要使用的模板。可用的模板有：`vt`、`vu`、`skt`、`sku`、`vtt`、`vut`、`sktt`、`skut`。 |
| -l / --language | string | en_US | 提示语言。                                                                           |

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

例如：

```bash
pnpm create stdf my-app -l zh_CN
```


# 许可证

本项目基于 [MIT 许可证](https://github.com/dufu1991/stdf/blob/main/LICENSE)。请随意享受并贡献给这个开源项目。