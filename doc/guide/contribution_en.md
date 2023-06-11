## Introduction

Thank you for using STDF.

Below are guidelines for submitting feedback or code to STDF. Before submitting an issue or PR to STDF, please take a few minutes to read the following content.

## Issue Guidelines

-   When encountering problems, please first confirm whether the problem has been recorded in the issue or has been fixed.
-   When submitting an issue, describe the problem briefly and add information about the environment and reproduction steps when the problem occurs.

## Local Development

22Before local development, make sure that Git and Node.js are installed in your development environment.

Debugging of STDF requires a project environment. Therefore, we provide a simple Demo project. The version of Node.js used by STDF is not limited; however, Vite is used for developing Demo projects. Therefore, ensure that your Node.js version >= 14.18+ (refer to [Vite official website](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)).

> Recommended: Use [pnpm](https://pnpm.io) for package management. Install [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) or [WebStorm plugin](https://plugins.jetbrains.com/plugin/12375-svelte) specifically designed for Svelte development. Install [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) specifically designed for Tailwind CSS. WebStorm integrates it by default ([learn more here](https://www.jetbrains.com/help/webstorm/tailwind-css.html)).

Follow these steps below to quickly start up STDF Demo locally:

```bash
## Clone repository of STDF Demo
git clone git@github.com:dufu1991/demo-stdf.git

## Enter the project directory
cd demo-stdf

## Install dependencies
pnpm i
## or
npm i

## Start the project
npm run dev
```

After successful startup, you can open `http://localhost:8888` in your browser to view the effect. Please switch your browser's developer tools to mobile mode.

For components within Demo, you can find corresponding files under `node_modules/stdf/src` and modify them to see real-time modification effects. Note that both VS Code and WebStorm support jumping directly to component source code when calling components.

> If STDF in this repository is not the latest version, please upgrade it first.

If you do not want local development, you can choose to use StackBlitz for simple online debugging. Simply open [STDF Demo](https://stackblitz.com/github/dufu1991/demo-stdf) to start online debugging.

## Submitting PRs

If this is your first time submitting a Pull Request on GitHub, read these two articles:

-   [First Contributions](https://github.com/firstcontributions/first-contributions/blob/main/translations/README.zh-cn.md)
-   [How To Contribute To Open Source Without Being A Jerk](https://segmentfault.com/a/1190000000736629)

### Process

-   Fork STDF (https://github.com/dufu1991/stdf) into your own repository; if already forked before, synchronize with the latest code from main repository.
-   Create a new branch based on main branch of forked repository such as `feature/add_Loading_type`, clone it locally.
-   Copy modified component files under `node_modules/stdf/src` in above mentioned Demo project and verify them successfully onto corresponding directories under `components/src`.
-   In the Chinese and English documents updated this time, the document is located in the `doc/components` directory. Depending on the specific modifications, it may be necessary to modify documents such as api, FAQ, guide, and version. When modifying the version, please add a tag. For details, refer to [STDF Version tag](https://github.com/dufu1991/stdf/blob/main/doc/components/button/version_en.md?plain=1).
-   Submit a Pull Request to main branch of primary repository.
-   After the Pull Request is approved in Review, it will be merged into the main repository and a new version will be released to npm.

### Notes

When submitting a Pull Request, please note:

-   Keep your PR small enough. Generally, one PR only solves a single component file or adds a single feature to solve a single problem for ease of review.
-   When adding or modifying components, remember to verify them successfully in Demo project to ensure code stability.
-   Please add appropriate descriptions in PRs. If there are related issues, please indicate them.
