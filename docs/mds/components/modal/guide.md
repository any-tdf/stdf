## 使用

Modal 弹框组件一般用于展示一些需要用户明确知悉的内容或步骤，为避免误触，点击遮罩默认不会关闭。相比 Toast 用户感知度会更强，相比可以完成特定交互操作的 Dialog 又更简单一些。

## 说明

Modal 弹框组件是在 Popup 基础上封装的，通过预先定义一些 Popup 的 Props 实现，因此可以通过传入 Popup 的属性来实现不同的效果。比如示例中通过设置 popup 的 easeType 换了一种缓动效果。

而 Modal 内部又使用了 Icon 和 Button 组件，可以通过传入 Icon 和 Button 的 Props 来实现不同的效果。比如示例中通过设置 Button 的 radius 自定义按钮的圆角风格。

## contentChild

Modal 的内容可以通过 contentChild 传入，当需要显示复杂内容时，可以通过 contentChild 渲染，此时 content 会失效。

## 关闭

Modal 默认不会自动关闭，需要通过点击内部按钮来关闭，当不显示按钮时默认点击遮罩也会关闭，或者通过改变外部的 visible 来关闭。当然这些参数都可以通过传入的 Props 来控制。
