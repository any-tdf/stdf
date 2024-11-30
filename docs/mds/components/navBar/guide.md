> NavBar 使用了图标 ri-arrow-left-s-line，请确保项目的 symbol.svg 文件中包含这些图标。详细信息请参考 [STDF-指南-图标](https://stdf.design/#/guide/icon)。

## 说明

移动端的 NavBar 一般用于页面顶部显示当前页面与路由跳转操作。STDF 的 NavBar 由左中右三个部分组成，且每个部分都支持 Snippet 渲染，而最外层元素的 Class 支持 injClass（class 注入）。

## 拓展

现有参数已经能满足绝大部分业务场景，比如根据页面上下滚动实时改变 NavBar 背景透明度与文字颜色这种常用场景，就可以通过 injClass 实现。如果还不满足你的需求，结合 Snippet 与 injClass，理论上 NavBar 可以定制为你想要的任何样式，甚至不仅仅把它作为顶部的导航栏来使用。

需要提醒的是，此处的拓展只是提供一种方法与思路，过多的自定义可能已经比自己写一个组件显得更加复杂，反而失去了使用组件库的意义。