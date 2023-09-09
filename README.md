<div align="center">

[![Public STDF Status](https://github.com/dufu1991/stdf/actions/workflows/publish-stdf.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/publish-stdf.yml)
[![Releases Status](https://github.com/dufu1991/stdf/actions/workflows/releases.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/releases.yml)
[![Sync Status](https://github.com/dufu1991/stdf/actions/workflows/sync-demo.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/sync-demo.yml)
[![Build Status](https://github.com/dufu1991/stdf/actions/workflows/build-demo.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/build-demo.yml)
[![Public Create Status](https://github.com/dufu1991/stdf/actions/workflows/publish-create.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/publish-create.yml)
[![Public Icon Status](https://github.com/dufu1991/stdf/actions/workflows/publish-icon.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/publish-icon.yml)
[![Public VS Code Extension Status](https://github.com/dufu1991/stdf/actions/workflows/publish-vscode.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/publish-vscode.yml)
[![Sync Gitee Status](https://github.com/dufu1991/stdf/actions/workflows/sync-gitee.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/sync-gitee.yml)

  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://stdf.design/assets/favicon_logo_dark/android-chrome-512x512.png">
    <img src="https://stdf.design/assets/favicon_logo/android-chrome-512x512.png" alt="logo" width="120" height="auto" />
  </picture>
  <h1>S T D F</h1>
  
[![npm](https://img.shields.io/npm/v/stdf?logo=npm&label=stdf)](https://www.npmjs.com/package/stdf)
[![npm](https://img.shields.io/npm/dt/stdf?logo=npm&label=installs)](https://www.npmjs.com/package/stdf)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/stdf?logo=npm&label=minzip)](https://www.npmjs.com/package/stdf)
[![GitHub stars](https://img.shields.io/github/stars/dufu1991/stdf?logo=github&label=stars)](https://github.com/dufu1991/stdf)
[![GitHub license](https://img.shields.io/github/license/dufu1991/stdf?logo=github)](https://github.com/dufu1991/stdf)

[![npm](https://img.shields.io/npm/v/create-stdf?logo=npm&label=create)](https://www.npmjs.com/package/create-stdf)
[![npm](https://img.shields.io/npm/v/rollup-plugin-stdf-icon?logo=npm&label=icon)](https://www.npmjs.com/package/rollup-plugin-stdf-icon)
[![Visual Studio Marketplace Version (including pre-releases)](https://img.shields.io/visual-studio-marketplace/v/STDF.stdf-vscode-extension?logo=visualstudiocode&label=extension)](https://marketplace.visualstudio.com/items?itemName=STDF.stdf-vscode-extension)

  <h3>
    <a href="https://github.com/dufu1991/stdf/blob/main/README_CN.md" target="_blank">简体中文</a>
    <span> • </span>
    <a href="https://stdf.design?lang=en_US" target="_blank">Website</a>
  </h3>
</div>

# Introduction

Mobile web component library based on [Svelte](https://svelte.dev) and [Tailwind](https://www.tailwindcss.com) .

> **S**imple • **T**hin • **D**esign • **F**ast

# Features

- 🚀 No runtime, no virtual DOM, runs faster online.
- 🧰 Rich API, easily configure component styles that meet your needs.
- ✍ Based on Svelte and Tailwind, coding is quick and easy.
- 🍭 Supports dark mode.
- 📖 Provides extensive Chinese and English documentation and component examples.
- 🌍 Supports internationalization, with 60+ built-in language packages.
- 🫰 User-friendly interaction, animation parameters can be configured, and custom themes are supported.
- 🤝 Supports Tailwind libraries such as Windi CSS and UnoCSS.
- 🫡 No three -party dependence, no need to worry about the three -party library version and security issues.
- 📦 Supports on-demand import to reduce bundle size.
- 🪜 Comes with a scaffolding tool for quick project creation.
- 🔗 Comes with an SVG merging plugin for quickly merging SVG files.
- 🍺 IDE plugin for quickly viewing component APIs.

# Getting Started

## Installation

If you have a project configured with Svelte and Tailwind, install directly.

```bash
pnpm i stdf -D
# or
npm i stdf -D
```

## Usage

```xml
<!-- Button Demo -->
<script>
import { Button } from 'stdf';
</script>

<Button>Default</Button>
```

## 😓 No project? Create one

You can try using [create-stdf](https://www.npmjs.com/package/create-stdf) to quickly create a project. (beta version)

```bash
pnpm create stdf
# or
npm create stdf@latest
# or
npm init stdf@latest
# or
npx create-stdf@latest
```

Alternatively, you can create a Vite project and configure it to use Tailwind CSS and the configurations used by STDF. Refer to [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) & [Tailwind CSS](https://tailwindcss.com/docs/guides/vite) & [STDF](https://stdf.design/#/guide) for more information.

# Preview

Please scan the QR code to access the mobile demo:

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://stdf.design/assets/qr/demo_en_dark.png">
  <img src="https://stdf.design/assets/qr/demo_en.png" width="220" height="220" >
</picture>

# Quick Try

You can quickly try STDF on StackBlitz's [STDF Demo](https://stackblitz.com/github/dufu1991/demo-stdf?startScript=dev_en).

# Feedback and Communication

We recommend using [GitHub Issues](https://github.com/dufu1991/stdf/issues) for direct and effective feedback and communication. Contributions of code are also highly appreciated. You can also choose from the following options:

- [QQ Group](https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=U8ZlXJ3KVpTI9oZzs1jBnyWc3gVA0h6Y&authKey=ScWu0nU9g8BqNsC7o2eYkESwgVDVz9vzGNZEb17MrEAay9%2F7bTkXDiLJRIzo2vrg&noverify=0&group_code=581073686)
- [QQ Discord](https://pd.qq.com/s/fdd8incyr)
- [Discord](https://discord.gg/DMkHu8GGre)
- [Discussions](https://github.com/dufu1991/stdf/discussions)

# Contributors

<a href="https://github.com/dufu1991/stdf/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=dufu1991/stdf" />
</a>

# License

This project is licensed under the [MIT License](https://github.com/dufu1991/stdf/blob/main/LICENSE). Feel free to enjoy and contribute to this open-source project.

# Star History

<a href="https://github.com/dufu1991/stdf">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=dufu1991/stdf&type=Timeline&theme=dark" />
    <img alt="Star History Chart" width="100%" src="https://api.star-history.com/svg?repos=dufu1991/stdf&type=Timeline" />
  </picture>
</a>
