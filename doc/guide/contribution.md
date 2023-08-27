## 介绍

感谢你使用 STDF。

以下是关于向 STDF 提交反馈或代码的指南。在向 STDF 提交 issue 或者 PR 之前，请先花几分钟时间阅读以下内容。

## Issue 规范

-   遇到问题时，请先确认这个问题是否已经在 issue 中有记录或者已被修复。
-   提 issue 时，请用简短的语言描述遇到的问题，并添加出现问题时的环境和复现步骤。

## 本地开发

在进行本地开发前，请先确保你的开发环境中安装了 Git 与 Node.js。

调试 STDF 必须要有个工程环境，为此提供了一个简单的 Demo 工程。STDF 本身不受 Node 版本限制，Demo 使用 Vite 开发，所以请确保你的 Node.js 版本 >= 14.18+，参考 [Vite 官网](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)。

> 推荐：使用 [pnpm](https://pnpm.io/zh) 进行包管理；安装针对 Svelte 的 [VSCode 插件](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) 或者 [WebStorm 插件](https://plugins.jetbrains.com/plugin/12375-svelte) 进行开发；安装针对 Tailwind 的 [VSCode 插件](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)，WebStorm 默认集成，[了解更多](https://www.jetbrains.com/help/webstorm/tailwind-css.html)。

按照下面的步骤操作，即可在本地快速启动 STDF Demo。

>由于 Demo 依赖的 stdf 和 rollup-plugin-stdf-icon 包都是本地构建的，所以请先构建一下这两个包。

```bash
## 克隆 STDF 仓库
git clone git@github.com:dufu1991/stdf.git

## 构建一下 STDF package
cd stdf/packages/stdf
npm run dist

## 构建一下 rollup-plugin-stdf-icon package
cd stdf/packages/rollup-plugin-stdf-icon
pnpm i
## or
npm i
npm run build

## 进入项目 demo 目录
cd stdf/demo

## 安装依赖
pnpm i
## or
npm i

## 启动项目
npm run dev
```

启动成功之后，可在浏览器中打开 `http://localhost:8888` 查看效果，请将浏览器的开发者工具切换为移动端模式。

可对 `packages/stdf/components` 目录下组件源码进行修改并实时查看修改效果。注意，VS Code 与 WebStorm 都支持在调用组件时直接跳转到组件源码。

如果不想本地开发，可以选择使用 StackBlitz 在线简单调试。直接打开 [STDF Demo](https://stackblitz.com/github/dufu1991/demo-stdf) 即可开始在线调试。

## 提交 PR

如果你是第一次在 GitHub 上提 Pull Request ，可以阅读下面这两篇文章来学习：

-   [第一次参与开源](https://github.com/firstcontributions/first-contributions/blob/main/translations/README.zh-cn.md)
-   [如何优雅地在 GitHub 上贡献代码](https://segmentfault.com/a/1190000000736629)

### 流程

-   请先 fork 一份 [STDF](https://github.com/dufu1991/stdf) 代码到自己的仓库，如果已经 fork 过，请同步主仓库的最新代码。
-   克隆你的仓库至本地。
-   修改组件源码并在 Demo 中验证通过。
-   「可选」补充此次修改的中英文档中，文档位于 `doc/components` 目录下。根据具体修改内容可能需要修改 api、FAQ、guide、version 等文档。对 version 的修改请增加 tag，具体参考 [STDF Version tag](https://github.com/dufu1991/stdf/blob/main/doc/components/button/version.md?plain=1)。
-   提交修改内容至你的仓库，然后提 Pull Request 到主仓库。
-   Pull Request 会在 Review 通过后被合并到主仓库，并发布新版本至 npm。

### 注意事项

在提交 Pull Request 时，请注意：

-   保持你的 PR 足够小，一般一个 PR 只解决单个组件文件，解决单个问题或添加单个功能，以便于 Review。
-   当新增组件或者修改原有组件时，记得在 Demo 中验证通过，保证代码的稳定。
-   在 PR 中请添加合适的描述，如果有关联 Issue，请注明一下。
