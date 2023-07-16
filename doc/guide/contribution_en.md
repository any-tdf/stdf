## Introduction

Thank you for using STDF.

Below are guidelines for submitting feedback or code to STDF. Before submitting an issue or PR to STDF, please take a few minutes to read the following.

## Issue Guidelines

-   When encountering an issue, please first confirm whether the issue has already been recorded in the issue or has been fixed.
-   When submitting an issue, please describe the issue briefly in language and add the environment and replication steps when the issue occurs.

## Local Development

Before local development, please make sure that Git and Node.js are installed in your development environment.

Debugging STDF requires an engineering environment. For this purpose, a simple Demo project is provided. STDF itself is not limited by the Node version, and the Demo uses Vite for development, so please ensure that your Node.js version >= 14.18+, refer to the [Vite official website](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project).

> Recommended: Use [pnpm](https://pnpm.io/zh) for package management; install [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) or [WebStorm plugin](https://plugins.jetbrains.com/plugin/12375-svelte) for Svelte development; install [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) for Tailwind, WebStorm is integrated by default, [learn more](https://www.jetbrains.com/help/webstorm/tailwind-css.html).

Follow the steps below to quickly start the STDF Demo locally.

```bash
## Clone STDF repository
git clone git@github.com:dufu1991/stdf.git

## Enter the project demo directory
cd stdf/demo

## Install dependencies
pnpm i
## or
npm i

## Start the project
npm run dev
```

After the startup is successful, you can open `http://localhost:8888` in the browser to view the effect. Please switch the developer tools of the browser to the mobile mode.

You can modify the component source code under the `components/src` directory and view the modification effect in real-time. Note that both VS Code and WebStorm support directly jumping to the component source code when calling the component.

If you don't want to develop locally, you can choose to use StackBlitz to debug online. Just open [STDF Demo](https://stackblitz.com/github/dufu1991/demo-stdf?startScript=dev_en) to start online debugging.

## Submitting PR

If you are submitting a Pull Request on GitHub for the first time, you can read the following two articles to learn:

-   [First Contributions](https://github.com/firstcontributions/first-contributions/blob/main/translations/README.zh-cn.md)
-   [How to contribute code elegantly on GitHub](https://segmentfault.com/a/1190000000736629)

### Process

-   Please fork a copy of [STDF](https://github.com/dufu1991/stdf) to your own repository. If you have already forked, please synchronize the latest code from the main repository.
-   Clone your repository to your local machine.
-   Modify the component source code and verify it in the Demo.
-   「Optional」Supplement the Chinese and English documentation for this modification, which is located in the `doc/components` directory. Depending on the specific modification content, you may need to modify the api, FAQ, guide, version, and other documents. For modifications to version, please add tags. Please refer to the [STDF Version tag](https://github.com/dufu1991/stdf/blob/main/doc/components/button/version.md?plain=1) for specific details.
-   Submit the modified content to your repository, and then submit a Pull Request to the main repository.
-   The Pull Request will be merged into the main repository after review and a new version will be released to npm.

### Notes

When submitting a Pull Request, please note:

-   Keep your PR small enough, generally one PR only solves a single component file, solves a single problem, or adds a single function, to facilitate review.
-   When adding or modifying existing components, remember to verify it in the Demo to ensure the stability of the code.
-   Please add a suitable description in the PR. If there is a related issue, please indicate it.
