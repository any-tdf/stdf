## 0.2.4

- 0.2.2 ~ 0.2.4 优化文件结构，精简 NPM 包体积。抵制 `node_modules` 体积膨胀和依赖黑洞，从我做起！
- 多语言引入路径由 `stdf/lang/xx_XX` 改为 `stdf/dist/lang/xx_XX`，详见 [国际化](https://stdf.design/#/guide?nav=internation)。

## 0.2.1

-  新增了 `create-stdf`，可以快速创建使用 STDF 的工程。（beta 版本，可能存在问题）

## 0.2.0

-   适配 Svelte 4 同时也兼容 Svelte 3。目前仅需适配一项，即升级部分组件过渡动画，参考 Svelte 4 migration guide - [Transitions are local by default](https://svelte.dev/docs/v4-migration-guide#transitions-are-local-by-default)。
-   增强 Swiper 组件，详见 [Swiper](https://stdf.design/#/components?nav=swiper&tab=4)。

## 0.1.5

-   修改组件内部的触摸事件为指针事件，使其同时支持鼠标、触控笔和触摸等各种输入方式，包含组件：BottomSheet、IndexBar、Slider、Swiper。关联 [Issues](https://github.com/dufu1991/stdf/issues/5)。[!issue|shenliqing|]

## 0.1.4

-   更新 NPM README。

## 0.1.3

-   Pagination 新增 Props。详见 [Pagination](https://stdf.design/#/components?nav=pagination&tab=4)。

## 0.1.2

-   Pagination 细节优化。详见 [Pagination](https://stdf.design/#/components?nav=pagination&tab=4)。

## 0.1.1

-   修复 Pagination。

## 0.1.0

-   新增 Pagination 组件，详见 [Pagination](https://stdf.design/#/components?nav=pagination&tab=0)。

## 0.0.27

-   0.0.12 ~ 0.0.27 版本无实质更新，仅用于测试 GitHub Action。

## 0.0.11

-   优化 Input，详见 [Input](https://stdf.design/#/components?nav=input&tab=4)。

## 0.0.10

-   优化 Cell，详见 [Cell](https://stdf.design/#/components?nav=cell&tab=4)。

## 0.0.9

-   修复 AsyncPicker 文件路径。

## 0.0.8

-   修复 Calendar，详见 [Calendar](https://stdf.design/#/components?nav=calendar&tab=4)。

## 0.0.7

-   多语言包 Context 的值由 `lang` 改为 `STDF_lang`，避免与工程内其他语言包名称冲突。
-   完善站点快速上手中配置 Tailwind CSS 的说明，关联 [Issues](https://github.com/dufu1991/stdf/issues/1)。[!issue|gavinning|][!contribute|yuedanlabs|]

## 0.0.6

-   新增 Loading 类型，详见 [Loading](https://stdf.design/#/components?nav=loading&tab=4)。

## 0.0.1

-   上线了。
