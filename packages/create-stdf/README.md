[简体中文](https://github.com/dufu1991/stdf/blob/main/packages/create-stdf/README_CN.md)

# create-stdf

A CLI for creating new [STDF](https://stdf.design) projects. Just run...

With PNPM:

```bash
pnpm create stdf
```

With NPM:

```bash
npm create stdf@latest
# or
npm init stdf@latest
# or
npx create-stdf@latest
```

...and follow the prompts.

You can also directly specify the project name and the template you want to use via additional command line options. For example, to create a new project named `my-app` using the **Vite + Svelte + Tailwind + STDF** template, run:

```bash
# pnpm
pnpm create stdf my-app

# npm
npm create stdf@latest my-app
```

If you want to use the **Vite + UnoCSS + Svelte + STDF** template, run:

```bash
# pnpm
pnpm create stdf my-app --template vu
# or
pnpm create stdf my-app -t vu

# npm
npm create stdf@latest my-app --template vu
# or
npm create stdf@latest my-app -t vu
```

Template presets include:

| abbreviation | template                                     | description         |
| ------------ | -------------------------------------------- | ------------------- |
| vt           | Vite + Tailwind + Svelte + STDF              | default             |
| vu           | Vite + UnoCSS + Svelte + STDF                | -                   |
| skt          | SvelteKit + Tailwind + STDF                  | -                   |
| sku          | SvelteKit + UnoCSS + STDF                    | -                   |
| vtt          | Vite + Tailwind + TypeScript + Svelte + STDF | Has not adapted yet |
| vut          | Vite + UnoCSS + TypeScript + Svelte + STDF   | Has not adapted yet |
| sktt         | SvelteKit + Tailwind + TypeScript + STDF     | Has not adapted yet |
| skut         | SvelteKit + UnoCSS + TypeScript + STDF       | Has not adapted yet |

# Options

| Option          | Type   | Default | Description                                                                                           |
| --------------- | ------ | ------- | ----------------------------------------------------------------------------------------------------- |
| -               | string | -       | The name of the project, you can direct input.                                                        |
| -t / --template | string | vt      | The template to use. Available templates are: `vt`, `vu`, `skt`, `sku`, `vtt`, `vut`, `sktt`, `skut`. |
| -l / --language | string | en_US   | The language of the prompts.                                                                          |

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

```bash
pnpm create stdf my-app -l zh_CN
```

# License

This project is licensed under the [MIT License](https://github.com/dufu1991/stdf/blob/main/LICENSE). Feel free to enjoy and contribute to this open-source project.
