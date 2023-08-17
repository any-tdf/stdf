<div align="center">

[![Public STDF Status](https://github.com/dufu1991/stdf/actions/workflows/publish-stdf.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/publish-stdf.yml)
[![Releases Status](https://github.com/dufu1991/stdf/actions/workflows/releases.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/releases.yml)
[![Sync Status](https://github.com/dufu1991/stdf/actions/workflows/sync-demo.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/sync-demo.yml)
[![Build Status](https://github.com/dufu1991/stdf/actions/workflows/build-demo.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/build-demo.yml)
[![Public Create Status](https://github.com/dufu1991/stdf/actions/workflows/publish-create.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/publish-create.yml)
[![Public Icon Status](https://github.com/dufu1991/stdf/actions/workflows/publish-icon.yml/badge.svg)](https://github.com/dufu1991/stdf/actions/workflows/publish-icon.yml)

  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://stdf.design/assets/favicon_logo_dark/android-chrome-512x512.png">
    <img src="https://stdf.design/assets/favicon_logo/android-chrome-512x512.png" alt="logo" width="120" height="auto" />
  </picture>
  <h1>S T D F</h1>

[![NPM Version](https://flat.badgen.net/npm/v/stdf?color=cb3837)](https://www.npmjs.com/package/stdf)
[![Github Stars](https://flat.badgen.net/github/stars/dufu1991/stdf?icon=github&color=202328)](https://github.com/dufu1991/stdf)
[![License](https://flat.badgen.net/github/license/dufu1991/stdf)](https://github.com/dufu1991/stdf/blob/main/LICENSE)
[![NPM Installs](https://flat.badgen.net/npm/dt/stdf?label=installs&icon=npm)](https://www.npmjs.com/package/stdf)
[![NPM Minzip](https://flat.badgen.net/bundlephobia/minzip/stdf?label=minzip&icon=npm&color=d26027)](https://www.npmjs.com/package/stdf)
[![NPM Dependency](https://flat.badgen.net/bundlephobia/dependency-count/stdf?label=dependency&icon=npm&color=7a4489)](https://www.npmjs.com/package/stdf)

  <h3>
    <a href="https://github.com/dufu1991/stdf/blob/main/README.md" target="_blank">English</a>
    <span> • </span>
    <a href="https://stdf.design?lang=zh_CN" target="_blank">网站</a>
  </h3>
</div>

# 介绍

基于 [Svelte](https://svelte.dev) 与 [Tailwind](https://www.tailwindcss.com) 的移动 web 组件库。

> **S**imple • **T**hin • **D**esign • **F**ast

> 简 单 • 轻 量 • 设 计 • 快 速

# 特性

- 🚀 无运行时，无虚拟 DOM，线上运行更快；
- 🧰 API 丰富，轻松配置出符合需求的组件样式；
- ✍ 基于 Svelte 和 Tailwind，编码迅速轻松；
- 🍭 支持暗色模式；
- 📖 提供丰富的中英文文档和组件示例；
- 🌍 支持国际化，已内置 60+ 种语言包；
- 🫰 交互友好，动画参数可配，可自定义主题；
- 🤝 支持 Tailwind 类库，如 Windi CSS、UnoCSS 等；
- 🫡 无三方依赖，无需担心三方库版本与安全问题。
- 📦 支持按需引入，减少打包体积。
- 🪜 配套脚手架，快速创建工程。
- 🔗 配套 SVG 合并插件，快速合并 SVG。

# 快速上手

## 安装

已有配置好 Svelte 与 Tailwind 的工程，直接安装。

```bash
pnpm i stdf -D
# or
npm i stdf -D
```

## 使用

```xml
<!-- Button Demo -->
<script>
import { Button } from 'stdf';
</script>

<Button>默认</Button>
```

## 😓 无工程？创建工程

可以尝试使用 [create-stdf](https://www.npmjs.com/package/create-stdf) 快速创建工程。（beta 版本）

```bash
pnpm create stdf
# or
npm create stdf@latest
# or
npm init stdf@latest
# or
npx create-stdf@latest
```

或者自行创建 Vite 工程，并配置 Tailwind CSS 和 STDF 使用到的配置。参考 [Vite](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project) & [Tailwind CSS](https://tailwindcss.com/docs/guides/vite) & [STDF](https://stdf.design/#/guide)。

# 预览

扫描二维码访问移动端 Demo：

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://stdf.design/assets/qr/demo_zh_dark.png">
  <img src="https://stdf.design/assets/qr/demo_zh.png" width="220" height="220" >
</picture>

# 开源协议

本项目基于 [MIT](https://github.com/dufu1991/stdf/blob/main/LICENSE) 协议，请自由地享受和参与开源。

# 贡献者

<a href="https://github.com/dufu1991/stdf/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=dufu1991/stdf" />
</a>

## Star 历史

<a href="https://github.com/dufu1991/stdf">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=dufu1991/stdf&type=Timeline&theme=dark" />
    <img alt="Star History Chart" width="100%" src="https://api.star-history.com/svg?repos=dufu1991/stdf&type=Timeline" />
  </picture>
</a>
