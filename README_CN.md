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

[![npm](https://img.shields.io/npm/v/stdf?logo=npm&label=stdf&style=for-the-badge&color=aeb5f4&logoColor=DCE4FD&labelColor=010319)](https://www.npmjs.com/package/stdf)
[![npm](https://img.shields.io/npm/dt/stdf?logo=npm&label=installs&style=for-the-badge&color=FFCC33&logoColor=FFFDE8&labelColor=191301)](https://www.npmjs.com/package/stdf)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/stdf?logo=npm&label=minzip&style=for-the-badge&color=E29CD2&logoColor=F9D8ED&labelColor=190113)](https://www.npmjs.com/package/stdf)
[![GitHub stars](https://img.shields.io/github/stars/dufu1991/stdf?logo=github&label=stars&style=for-the-badge&color=A1DAD7&logoColor=D9F8F2&labelColor=011918)](https://github.com/dufu1991/stdf)
[![GitHub license](https://img.shields.io/github/license/dufu1991/stdf?logo=github&style=for-the-badge&color=B9C46A&logoColor=F3F3CB&labelColor=161901)](https://github.com/dufu1991/stdf)

[![npm](https://img.shields.io/npm/v/create-stdf?logo=npm&label=create&style=for-the-badge&color=ebb2ba&logoColor=FBDDDD&labelColor=190104)](https://www.npmjs.com/package/create-stdf)
[![npm](https://img.shields.io/npm/v/rollup-plugin-stdf-icon?logo=npm&label=icon&style=for-the-badge&color=8cf2be&logoColor=D5FCE3&labelColor=01190C)](https://www.npmjs.com/package/rollup-plugin-stdf-icon)
[![Visual Studio Marketplace Version (including pre-releases)](https://img.shields.io/visual-studio-marketplace/v/STDF.stdf-vscode-extension?logo=visualstudiocode&label=extension&style=for-the-badge&color=c7f292&logoColor=F0FCD6&labelColor=0E1901)](https://marketplace.visualstudio.com/items?itemName=STDF.stdf-vscode-extension)

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

- 🚀 无运行时，无虚拟 DOM，线上运行更快。
- 🧰 API 丰富，轻松配置出符合需求的组件样式。
- ✍ 基于 Svelte 与 Tailwind，编码迅速轻松。
- 🍭 支持暗色模式与多主题配置。
- 📖 提供丰富的中英文文档和组件示例。
- 🌍 支持国际化，已内置 60+ 种语言包。
- 🫰 交互友好，动画参数可配，可自定义主题。
- 🤝 支持 Tailwind 类库，如 Windi CSS、UnoCSS 等。
- 🫡 无三方依赖，无需担心三方库版本与安全问题。
- 📦 支持按需引入，减少打包体积。
- 🪜 配套脚手架，快速创建工程。
- 🔗 配套 SVG 合并插件，快速合并 SVG。
- 🍺 配套 IDE 插件，快速查看组件 API。

# 快速上手

## 安装

已有配置好 Svelte 与 Tailwind 的工程，直接安装。

```bash
bun i stdf -D
# or
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
bun create stdf
# or
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

# 快速尝试

可以到 StackBlitz 的 [STDF Demo](https://stackblitz.com/github/dufu1991/demo-stdf) 快速尝试 STDF。

# 反馈与交流

推荐使用 [GitHub Issues](https://github.com/dufu1991/stdf/issues) 进行直接有效地反馈与交流，贡献代码就更好了。也可以选择以下几种方式：

- [QQ 群](https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=U8ZlXJ3KVpTI9oZzs1jBnyWc3gVA0h6Y&authKey=ScWu0nU9g8BqNsC7o2eYkESwgVDVz9vzGNZEb17MrEAay9%2F7bTkXDiLJRIzo2vrg&noverify=0&group_code=581073686)
- [QQ 频道](https://pd.qq.com/s/fdd8incyr)
- [Discord](https://discord.gg/DMkHu8GGre)
- [Discussions](https://github.com/dufu1991/stdf/discussions)

# 贡献者

<a href="https://github.com/dufu1991/stdf/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=dufu1991/stdf" />
</a>

# 赞助者

<a href="https://github.com/yuedanlabs" target="_blank">
  <img src="https://avatars.githubusercontent.com/yuedanlabs" width="60" height="auto" style='border-radius:100%' >
</a>

# 开源协议

本项目基于 [MIT](https://github.com/dufu1991/stdf/blob/main/LICENSE) 协议，请自由地享受和参与开源。

# Star 历史

<a href="https://github.com/dufu1991/stdf">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=dufu1991/stdf&type=Timeline&theme=dark" />
    <img alt="Star History Chart" width="100%" src="https://api.star-history.com/svg?repos=dufu1991/stdf&type=Timeline" />
  </picture>
</a>
