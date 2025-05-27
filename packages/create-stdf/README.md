[简体中文](https://github.com/any-tdf/stdf/blob/main/packages/create-stdf/README_CN.md)

> Since v0.2.2, you can choose to use `stdf-icon` or `iconify` for icons.

# create-stdf

A CLI for creating new [STDF](https://stdf.design) projects. Just run...

<!-- :::code-groups -->
<!-- pnpm -->

```sh
pnpm create stdf
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
bun create stdf
```

<!-- :: -->
<!-- yarn -->

```sh
yarn create stdf
```

<!-- ::: -->

...and follow the prompts.

You can also directly specify the project name and the template you want to use via additional command line options. For example, to create a new project named `my-app` using the **SvelteKit & Tailwind & TypeScript & STDF & stdf-icon** template, run:

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

If you want to use the **SvelteKit & Tailwind & STDF & stdf-icon** template, run:

<!-- :::code-groups -->
<!-- pnpm -->

```sh
pnpm create stdf my-app --template skts
# or
pnpm create stdf my-app -t skts
```

<!-- :: -->
<!-- npm -->

```sh
npm create stdf@latest my-app --template skts
# or
npm create stdf@latest my-app -t skts
```

<!-- :: -->
<!-- bun -->

```sh
bun create stdf my-app --template skts
# or
bun create stdf my-app -t skts
```

<!-- :: -->
<!-- yarn -->

```sh
yarn create stdf my-app --template skts
# or
yarn create stdf my-app -t skts
```

<!-- ::: -->

Template presets include:

| Abbreviation | Template                                                | Description     |
| ------------ | ------------------------------------------------------- | --------------- |
| sktts        | SvelteKit & Tailwind & TypeScript & stdf-icon           | Default         |
| skts         | SvelteKit & Tailwind & stdf-icon                        | -               |
| sktti        | SvelteKit & Tailwind & TypeScript & iconify             | -               |
| skti         | SvelteKit & Tailwind & iconify                          | -               |
| skttsi       | SvelteKit & Tailwind & TypeScript & stdf-icon & iconify | -               |
| sktsi        | SvelteKit & Tailwind & stdf-icon & iconify              | -               |
| skuts        | SvelteKit & UnoCSS & TypeScript & stdf-icon             | Not adapted yet |
| skus         | SvelteKit & UnoCSS & stdf-icon                          | Not adapted yet |
| skuti        | SvelteKit & UnoCSS & TypeScript & iconify               | Not adapted yet |
| skui         | SvelteKit & UnoCSS & iconify                            | Not adapted yet |
| skutsi       | SvelteKit & UnoCSS & TypeScript & stdf-icon & iconify   | Not adapted yet |
| skusi        | SvelteKit & UnoCSS & stdf-icon & iconify                | Not adapted yet |

# Options

| Option          | Type   | Default | Description                                    |
| --------------- | ------ | ------- | ---------------------------------------------- |
| -               | string | -       | The name of the project, you can direct input. |
| -t / --template | string | sktts   | The template to use.                           |
| -l / --language | string | en_US   | The language of the prompts.                   |

# Supported Languages

| Code  | Language              |
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

For example:

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

# License

This project is licensed under the [MIT License](https://github.com/any-tdf/stdf/blob/main/LICENSE).
