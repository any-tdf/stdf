## 0.4.4

- 增强 Tabs 组件，详见 [Tabs](https://stdf.design/#/components?nav=tabs&tab=4)。

## 0.4.3

- 修改 Tabs 组件，详见 [Tabs](https://stdf.design/#/components?nav=tabs&tab=4)。

## 0.4.2

- 组件源码的 Props 按照 JSDoc 规范增加类型注释，使用组件时将获得更好的 IDE 提示。可开启 checkJs 检测或使用 TypeScript 做类型检测。

## 0.4.1

- 将仓库由 dufu1991/stdf 迁移至 any-tdf/stdf。

## 0.4.0

- 新增支持多主题配置，请参考 [主题配置](https://stdf.design/#/guide/theme)、[色彩](https://stdf.design/#/guide/color)、[主题生成器](https://stdf.design/#/guide/generator)。
- 按照 Tailwind 命名规则统一将灰色由 `gray5` 改为 `gray-500` 写法，请注意升级后更改写法。详见 [色彩](https://stdf.design/#/guide/color)。
- Avatar 组件新增头像组用法，详见 [Avatar](https://stdf.design/#/components?nav=avatar&tab=4)。

## 0.3.2

- 修复 Input 组件，详见 [Input](https://stdf.design/#/components?nav=input&tab=4)。

## 0.3.1

- 增强 Input 组件，详见 [Input](https://stdf.design/#/components?nav=input&tab=4)。

## 0.3.0

- 新增 NumKeyboard 组件，详见 [NumKeyboard](https://stdf.design/#/components?nav=numKeyboard&tab=0)。

## 0.2.11

- 修复 Cell，详见 [Cell](https://stdf.design/#/components?nav=cell&tab=4)。
- 修复 Icon，详见 [Icon](https://stdf.design/#/components?nav=icon&tab=4)。
- 修复 Skeleton，详见 [Skeleton](https://stdf.design/#/components?nav=skeleton&tab=4)。

## 0.2.10

- 增强 Cell 组件，详见 [Cell](https://stdf.design/#/components?nav=cell&tab=4)。

## 0.2.9

- 修复 NPM 缺少的文件。

## 0.2.8

- 删除部分组件无用代码。
- 格式化组件代码，方便后续其他参与成员统一代码风格。
- 考虑到组件代码本身体积也不大，还是决定直接将组件源码放入 NPM 包中，方便用户直接查看源码，避免了需要去 GitHub 上查看源码的麻烦。
- 多语言引入路径改回 `stdf/lang/xx_XX`，详见 [国际化](https://stdf.design/#/guide/internation)。

## 0.2.7

- 0.2.6 ~ 0.2.7 STDF package 增加 `svelte`，使其可在 SvelteKit 中直接引入使用，关联 [Issues](https://github.com/any-tdf/stdf/issues/9) 。[!issue|edhub|]

## 0.2.5

- Icon 修改 path 默认值，详见 [Icon](https://stdf.design/#/components?nav=icon&tab=4)。
- 新增了 `rollup-plugin-stdf-icon` 插件，将指定文件夹内的所有 SVG 组合为 SVG symbol，详见 [rollup-plugin-stdf-icon](https://www.npmjs.com/package/rollup-plugin-stdf-icon)，方便 STDF 的 Icon 组件使用。
- 配合 `rollup-plugin-stdf-icon` 更新 `create-stdf`。

## 0.2.4

- 0.2.2 ~ 0.2.4 优化文件结构，精简 NPM 包体积。抵制 `node_modules` 体积膨胀和依赖黑洞，从我做起！
- 多语言引入路径由 `stdf/lang/xx_XX` 改为 `stdf/dist/lang/xx_XX`，详见 [国际化](https://stdf.design/#/guide/internation)。

## 0.2.1

- 新增了 `create-stdf`，可以快速创建使用 STDF 的工程。（beta 版本，可能存在问题）

## 0.2.0

- 适配 Svelte 4 同时也兼容 Svelte 3。目前仅需适配一项，即升级部分组件过渡动画，参考 Svelte 4 migration guide - [Transitions are local by default](https://svelte.dev/docs/v4-migration-guide#transitions-are-local-by-default)。
- 增强 Swiper 组件，详见 [Swiper](https://stdf.design/#/components?nav=swiper&tab=4)。

## 0.1.5

- 修改组件内部的触摸事件为指针事件，使其同时支持鼠标、触控笔和触摸等各种输入方式，包含组件：BottomSheet、IndexBar、Slider、Swiper。关联 [Issues](https://github.com/any-tdf/stdf/issues/5)。[!issue|shenliqing|]

## 0.1.4

- 更新 NPM README。

## 0.1.3

- Pagination 新增 Props。详见 [Pagination](https://stdf.design/#/components?nav=pagination&tab=4)。

## 0.1.2

- Pagination 细节优化。详见 [Pagination](https://stdf.design/#/components?nav=pagination&tab=4)。

## 0.1.1

- 修复 Pagination。

## 0.1.0

- 新增 Pagination 组件，详见 [Pagination](https://stdf.design/#/components?nav=pagination&tab=0)。

## 0.0.27

- 0.0.12 ~ 0.0.27 版本无实质更新，仅用于测试 GitHub Action。

## 0.0.11

- 优化 Input，详见 [Input](https://stdf.design/#/components?nav=input&tab=4)。

## 0.0.10

- 优化 Cell，详见 [Cell](https://stdf.design/#/components?nav=cell&tab=4)。

## 0.0.9

- 修复 AsyncPicker 文件路径。

## 0.0.8

- 修复 Calendar，详见 [Calendar](https://stdf.design/#/components?nav=calendar&tab=4)。

## 0.0.7

- 多语言包 Context 的值由 `lang` 改为 `STDF_lang`，避免与工程内其他语言包名称冲突。
- 完善站点快速上手中配置 Tailwind CSS 的说明，关联 [Issues](https://github.com/any-tdf/stdf/issues/1)。[!issue|gavinning|][!contribute|yuedanlabs|]

## 0.0.6

- 新增 Loading 类型，详见 [Loading](https://stdf.design/#/components?nav=loading&tab=4)。

## 0.0.1

- 上线了。
