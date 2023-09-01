## value、startValue、endValue、minRange、maxRange

传入 value、startValue、endValue 时，请确保在 minRange 与 maxRange 之间。

## step

传入 step 时，请尽量保证 (maxRange - minRange) / step 为整数，且考虑每一步的精度问题，太小可能导致无法快速滑动到需要的值，从而影响用户体验。

## 布局

Slider 未设置外部间距，请在页面布局时自行设置。

## Slot

当 Props 的 useSlot 为 true 时，Slider 表示进度的区域会使用 slot 渲染，参考示例。
