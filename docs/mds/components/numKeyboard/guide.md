> NumKeyboard 使用了图标 ri-delete-back-2-line 和 ri-skip-down-line，请确保项目的 symbol.svg 文件中包含这些图标。详细信息请参考 [STDF-指南 - 图标](https://stdf.design/#/guide/icon)。

## 说明

NumKeyboard 组件是一个虚拟的数字键盘，一般用于输入整数或小数。内部使用了网格布局，布局方式只有 3\*4 或 4\*4 两种，当不显示完成按键时，就只有 3 列，否则就是 4 列。

## 按键

NumKeyboard 组件的按键有 5 种类型，分别是 0-9 数字、删除、小数点、完成、关闭，其中 0-9 数字、删除是必须的，完成、删除、关闭是非必须的。

非必须按键的优先级为：完成 > 小数点 > 关闭，所以当同时需要显示小数点和关闭时，由于关闭的优先级低于小数点，所以关闭按钮将不会显示，如果需要强制显示关闭按钮，只能关闭小数点的显示。请参考示例。

## reverse

通常情况，我们在移动设备上习惯的数字键盘布局是从上到下的顺序，但是在传统物理键盘上数字键盘是按照从下到上的顺序排列的，考虑部分特殊行业人群的使用习惯，NumKeyboard 组件提供了 reverse 参数，当 reverse 为 true 时，数字键盘将会按照从下到上的顺序排列。

## doneDisabled

当 doneDisabled 为 true 时，完成按钮将会被禁用，此时完成按钮的文案将会变成灰色，且不可点击。可用于根据输入内容动态控制业务流程。

## 按键文字大小

按键文字大小会动态地跟随按键的高度变化。

## 键盘高度

移动端使用到键盘的地方需要注意键盘的高度，因为键盘可能会遮盖掉页面上需要显示输入内容的区域，所以 NumKeyboard 组件在打开的时候会自动计算键盘的高度，通过 onopen 事件派发出去，开发者可以根据这个值来处理键盘遮挡的问题。

## CSS 注入

通过 injClass 参数可以向 NumKeyboard 的三个地方注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性，示例中通过 injClass 实现了自定义背景色与文字颜色。

panelClass 注入后作用到键盘面板，keyClass 注入后作用到所有按键，doneClass 注入后作用到完成按键。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。

## popup

NumKeyboard 是在 Popup 的基础上封装的，通过预先定义一些 Popup 的 Props 实现，因此可以通过传入 Popup 的属性来实现不同的效果。比如示例中通过设置 popup 改变了过渡动画和背景透明度。
