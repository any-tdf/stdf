> Rate 使用了图标 ri-star-fill，请确保项目的 symbol.svg 文件中包含这些图标。详细信息请参考 [STDF-指南 - 图标](https://stdf.design/guide/icon)。

## value 与 total 注意事项

1. 传入的 value 不允许大于 total；
2. total 必须能被 1 整除；
3. 非半选时，value 必须能被 1 整除；
4. 半选时，value 必须能被 0.5 整除。

## 点击优化

考虑移动端交互方式，允许半选时点击会在半选和全选之间切换，允许零分时点击第一项会在 0、0.5、1 之间切换。

注意：考虑点击区域，**width 与 height 的值请不要小于 20**。

## 点击动画

通过 animation 来控制点击动画，`'current'` 表示仅点击项有动画，`'active'` 表示点击项及之前的项都有动画，`null` 表示无动画。

## 特别注意

当需要自定义内容时，可以通过传入 Snippet 实现，此时请务必**传入自定义内容的宽高**。
