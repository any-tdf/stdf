## 说明

Steps 默认为横向布局，由于移动端横向显示内容有限，横向布局建议只用作简单使用。当步骤较多、标题较长或显示内容较多时建议使用纵向布局，而横向布局只显示标题与步骤栏区域，即使传入了 desc 等其他参数也不会显示。

## current

从 1 开始的实际步骤序号，组件内部对应 steps 的索引值 +1。

## finishStep

每一步的 Props 支持传入 finishStep，用于一些场景下更准确细致地表达已经完成的步骤，请参考示例。

## 步骤栏区域

步骤栏区域 bar 可以传入对象或者字符，传入字符将直接显示，建议单个字符；对象通过 type 支持 image 与 icon，icon 使用 Icon Props，image 可以传入图片的相对路径或绝对路径，组件内部将其转换为 img 标签的 src 属性。

Icon Props 请参考 Icon API。

## injComponent

step Props 和 finishStep Props 支持通过 injComponent 注入 Svelte 组件，Steps 内部将通过`<svelte:component>`语法渲染传入的整个 Svelte 组件，请参考示例。

关于 \<svelte:component\> 可参考 [\<svelte:component\>](https://svelte.dev/docs#template-syntax-svelte-component)。

## 补充

Tip：表示时间线的业务场景也是可以使用 Steps 组件。
