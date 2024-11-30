## 使用

Dialog 对话框一般用于展示一些需要用户明确知悉的内容或步骤，同时可以完成一些简单的交互操作，为避免误触，点击遮罩默认不会关闭。比一般只用于展示的 Modal 组件更加强大一些。

## 说明

Dialog 弹框组件是在 Popup 基础上封装的，通过预先定义一些 Popup 的 Props 实现，因此可以通过传入 Popup 的属性来实现不同的效果。比如示例中通过设置 popup 的 easeType 换了一种缓动效果。

而 Dialog 内部又使用了 Icon 和 Button 组件，可以通过传入 Icon 和 Button 的 Props 来实现不同的效果。比如示例中通过设置 Button 的 radius 自定义按钮的圆角风格。

## contentChild

Dialog 的内容可以通过 contentChild 这个 Snippet 渲染，当需要显示复杂内容时，可以通过此方式来实现。

## btnRatio

Dialog 的按钮有主次之分，通过 btnRatio 可以设置主次按钮的大小比例，如 btnRatio 为 `[2,1]` 时，主按钮宽度为次按钮的两倍。

## 关闭

Dialog 默认不会自动关闭，默认点击内部次要按钮可以关闭，或者通过改变外部的 visible 来关闭。当然这些参数都可以通过传入的 Props 来控制。
