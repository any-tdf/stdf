## 介绍

感谢你使用 STDF。

以下是关于向 STDF 提交反馈或代码的指南。在向 STDF 提交 issue 或者 PR 之前，请先花几分钟时间阅读以下内容。

## Issue 规范

- 遇到问题时，请先确认这个问题是否已经在 issue 中有记录或者已被修复。
- 提 issue 时，请用简短的语言描述遇到的问题，并添加出现问题时的环境和复现步骤。

## 本地开发

在进行本地开发前，请先确保你的开发环境中安装了 [Git](https://git-scm.com) 与 [Node.js](https://nodejs.org/zh-cn) 或 [Bun](https://bun.sh) 。

调试 STDF 必须要有个工程环境，为此提供了一个简单的 Demo 工程。STDF 本身不受 Node 版本限制，Demo 使用 Vite 开发，所以请确保你的 Node.js 版本 >= 14.18+，参考 [Vite 官网](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)。

当你修改完成代码之后，提交 PR 之前请确保对代码进行了格式化并通过代码格式检查，可安装相关编辑器插件或通过命令行进行格式化。

推荐安装：

- [pnpm](https://pnpm.io/zh)：包管理工具，使用 Bun 无需安装。
- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) 或者 [Svelte](https://plugins.jetbrains.com/plugin/12375-svelte)：Svelte 开发插件。
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) 或者 [WebStorm 集成](https://www.jetbrains.com/help/webstorm/tailwind-css.html)：Tailwind CSS 开发插件。
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 或者 [WebStorm 集成](https://www.jetbrains.com/help/webstorm/eslint.html)：代码格式检查插件。
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 或者 [WebStorm 集成](https://www.jetbrains.com/help/webstorm/prettier.html)：代码格式化插件。

按照下面的步骤操作，即可在本地快速启动 STDF Demo。
<!-- main -> next -->
> 由于 Demo 依赖的 rollup-plugin-stdf-icon 包是本地构建的，所以请先构建一下这个包。

<!-- :::code-groups -->
<!-- pnpm -->
```sh
## 1. 克隆 STDF 仓库并进入，切换到 next 分支
git clone git@github.com:any-tdf/stdf.git
cd stdf
git checkout next

## 2. 构建 rollup-plugin-stdf-icon 包
cd packages/rollup-plugin-stdf-icon
## 安装依赖
pnpm i
## 构建包
pnpm build

## 3. 调试 STDF
cd packages/stdf
## 安装依赖
pnpm i
## 启动 Demo
pnpm dev
```
<!-- :: -->
<!-- npm -->
```sh
## 1. 克隆 STDF 仓库并进入，切换到 next 分支
git clone git@github.com:any-tdf/stdf.git
cd stdf
git checkout next

## 2. 构建 rollup-plugin-stdf-icon 包
cd packages/rollup-plugin-stdf-icon
## 安装依赖
npm i
## 构建包
npm run build

## 3. 调试 STDF
cd packages/stdf
## 安装依赖
npm i
## 启动 Demo
npm run dev
```
<!-- :: -->
<!-- bun -->
```sh
## 1. 克隆 STDF 仓库并进入，切换到 next 分支
git clone git@github.com:any-tdf/stdf.git
cd stdf
git checkout next

## 2. 构建 rollup-plugin-stdf-icon 包
cd packages/rollup-plugin-stdf-icon
## 安装依赖
bun i
## 构建包
bun build

## 3. 调试 STDF
cd packages/stdf
## 安装依赖
bun i
## 启动 Demo
bun dev
```
<!-- :: -->
<!-- yarn -->
```sh
## 1. 克隆 STDF 仓库并进入，切换到 next 分支
git clone git@github.com:any-tdf/stdf.git
cd stdf
git checkout next

## 2. 构建 rollup-plugin-stdf-icon 包
cd packages/rollup-plugin-stdf-icon
## 安装依赖
yarn
## 构建包
yarn build

## 3. 调试 STDF
cd packages/stdf
## 安装依赖
yarn
## 启动 Demo
yarn dev
```
<!-- ::: -->

启动成功之后，可在浏览器中打开 `http://localhost:8888` 查看效果，请将浏览器的开发者工具切换为移动端模式。

可对 `packages/stdf/src/lib/components` 目录下组件源码进行修改并实时查看修改效果。注意，VS Code 与 WebStorm 都支持在调用组件时直接跳转到组件源码。

如果不想本地开发，可以选择使用 StackBlitz 在线简单调试。直接打开 [NextSTDF Demo](https://stackblitz.com/github/any-tdf/next-demo-stdf) 即可开始在线调试。

## 提交 PR

如果你是第一次在 GitHub 上提 Pull Request，可以阅读下面这两篇文章来学习：

- [第一次参与开源](https://github.com/firstcontributions/first-contributions/blob/main/translations/README.zh-cn.md)
- [如何优雅地在 GitHub 上贡献代码](https://segmentfault.com/a/1190000000736629)

### 流程

- 请先 fork 一份 [STDF](https://github.com/any-tdf/stdf) 代码到自己的仓库，如果已经 fork 过，请同步主仓库的最新代码。
- 克隆你的仓库至本地。
- 修改组件源码并验证通过。
- 「可选」补充此次修改的中英文档中，文档位于 `docs/mds/components` 目录下。根据具体修改内容可能需要修改 api、FAQ、guide、version 等文档。对 version 的修改请增加 tag，具体参考 [STDF Version tag](https://github.com/any-tdf/stdf/blob/next/docs/mds/components/button/version.md?plain=1)。
- 到仓库 `packages/stdf` 目录，执行 `pnpm i` 或 `npm i` 或 `bun i` 安装依赖。
- 提交修改内容至你的仓库，然后提 Pull Request 到主仓库。
- Pull Request 会在 Review 通过后被合并到主仓库，后续发布新版。

### 注意事项

在提交 Pull Request 时，请注意：

- 保持你的 PR 足够小，一般一个 PR 只解决单个组件文件，解决单个问题或添加单个功能，以便于 Review。
- 当新增组件或者修改原有组件时，记得在 Demo 中验证通过，保证代码的稳定。
- 在 PR 中请添加合适的描述，如果有关联 Issue，请注明一下。
