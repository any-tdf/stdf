[简体中文](https://github.com/any-tdf/stdf/blob/main/packages/create-stdf/README_CN.md)

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

You can also directly specify the project name and the template you want to use via additional command line options. For example, to create a new project named `my-app` using the **SvelteKit + Tailwind + TypeScript + STDF** template, run:

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

If you want to use the **SvelteKit + Tailwind + STDF** template, run:

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm create stdf my-app --template skt
# or
pnpm create stdf my-app -t skt
```
<!-- :: -->
<!-- npm -->
```sh
npm create stdf@latest my-app --template skt
# or
npm create stdf@latest my-app -t skt
```
<!-- :: -->
<!-- bun -->
```sh
bun create stdf my-app --template skt
# or
bun create stdf my-app -t skt
```
<!-- :: -->
<!-- yarn -->
```sh
yarn create stdf my-app --template skt
# or
yarn create stdf my-app -t skt
```
<!-- ::: -->

Template presets include:

| Abbreviation | Template                                 | Description     |
| ------------ | ---------------------------------------- | --------------- |
| sktt         | SvelteKit + Tailwind + TypeScript + STDF | Default         |
| skt          | SvelteKit + Tailwind + STDF              | -               |
| skut         | SvelteKit + UnoCSS + TypeScript + STDF   | Not adapted yet |
| sku          | SvelteKit + UnoCSS + STDF                | Not adapted yet |

# Options

| Option          | Type   | Default | Description                                                                 |
| --------------- | ------ | ------- | --------------------------------------------------------------------------- |
| -               | string | -       | The name of the project, you can direct input.                              |
| -t / --template | string | sktt    | The template to use. Available templates are: `skt`, `sku`, `sktt`, `skut`. |
| -l / --language | string | en_US   | The language of the prompts.                                                |

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

This project is licensed under the [MIT License](https://github.com/any-tdf/stdf/blob/main/LICENSE). Feel free to enjoy and contribute to this open-source project.
