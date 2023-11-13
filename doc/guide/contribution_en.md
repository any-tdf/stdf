## Introduction

Thank you for using STDF.

Below are guidelines for submitting feedback or code to STDF. Before submitting an issue or PR to STDF, please take a few minutes to read the following.

## Issue Guidelines

- When encountering an issue, please first confirm whether the issue has already been recorded in the issue or has been fixed.
- When submitting an issue, please describe the issue briefly in language and add the environment and replication steps when the issue occurs.

## Local Development

Before local development, please make sure that [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en) or [Bun](https://bun.sh) are installed in your development environment.

Debugging STDF requires an engineering environment. For this purpose, a simple Demo project is provided. STDF itself is not limited by the Node version, and the Demo uses Vite for development, so please ensure that your Node.js version >= 14.18+, refer to the [Vite official website](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project).

Before submitting a PR after you have made code modifications, please ensure that you have formatted the code and passed the code formatting check. You can install relevant editor plugins or use the command line for code formatting.

Recommended installations:

- [pnpm](https://pnpm.io): Package management tool, no need to install when using Bun.
- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) or [Svelte](https://plugins.jetbrains.com/plugin/12375-svelte): Svelte development plugin.
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) or [WebStorm integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html): Tailwind CSS development plugin.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) or [WebStorm integration](https://www.jetbrains.com/help/webstorm/eslint.html): Code formatting check plugin.
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) or [WebStorm integration](https://www.jetbrains.com/help/webstorm/prettier.html): Code formatting plugin.

> Because the rollup-plugin-stdf-icon packages that the demo depends on are locally built, please build this packages first.

```bash
## 1. Clone the STDF repository and enter
git clone git@github.com:any-tdf/stdf.git
cd stdf

## 2. Build the rollup-plugin-stdf-icon package
cd packages/rollup-plugin-stdf-icon

## Install dependencies
bun i
## or
pnpm i
## or
npm i

## Build package
bun run build
## or
npm run build

## 3. Use the Demo project to debug STDF
cd demo

## Install dependencies
bun i
## or
pnpm i
## or
npm i

## Start Demo
bun dev_en
## or
npm run dev_en
```

After the startup is successful, you can open `http://localhost:8888` in the browser to view the effect. Please switch the developer tools of the browser to the mobile mode.

You can modify the component source code under the `packages/stdf/components` directory and view the modification effect in real-time. Note that both VS Code and WebStorm support directly jumping to the component source code when calling the component.

If you don't want to develop locally, you can choose to use StackBlitz to debug online. Just open [STDF Demo](https://stackblitz.com/github/dufu1991/demo-stdf?startScript=dev_en) to start online debugging.

## Submitting PR

If you are submitting a Pull Request on GitHub for the first time, you can read the following two articles to learn:

- [First Contributions](https://github.com/firstcontributions/first-contributions/blob/main/translations/README.zh-cn.md)
- [How to contribute code elegantly on GitHub](https://segmentfault.com/a/1190000000736629)

### Process

- Please fork a copy of [STDF](https://github.com/any-tdf/stdf) to your own repository. If you have already forked, please synchronize the latest code from the main repository.
- Clone your repository to your local machine.
- Modify the component source code and verify it in the Demo.
- 「Optional」Supplement the Chinese and English documentation for this modification, which is located in the `doc/components` directory. Depending on the specific modification content, you may need to modify the api, FAQ, guide, version, and other documents. For modifications to version, please add tags. Please refer to the [STDF Version tag](https://github.com/any-tdf/stdf/blob/main/doc/components/button/version.md?plain=1) for specific details.
- Go to the root directory of the repository and execute `bun i` or `pnpm i` or `npm i` to install dependencies.
- Use your editor to format the modified code or execute `pnpm run format` or `npm run format` in the command line to format the code.
- Execute `pnpm run lint` or `npm run lint` to check the code formatting.
- Commit the modified content to your repository and then submit a Pull Request to the main repository.
- The Pull Request will be merged into the main repository after it passes the review and a new version will be released subsequently.

### Notes

When submitting a Pull Request, please note:

- Keep your PR small enough, generally one PR only solves a single component file, solves a single problem, or adds a single function, to facilitate review.
- When adding or modifying existing components, remember to verify it in the Demo to ensure the stability of the code.
- Please add a suitable description in the PR. If there is a related issue, please indicate it.
