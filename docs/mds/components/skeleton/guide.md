> Skeleton 使用了图标 ri-image-fill、ri-movie-2-fill、ri-code-box-fill、ri-qr-code-fill、ri-barcode-fill，请确保项目的 symbol.svg 文件中包含这些图标。详细信息请参考 [STDF-指南-图标](https://stdf.design/#/guide/icon)。

## 说明

1. Skeleton 组件并不是必需组件，但它能优化页面加载过程中的视觉效果，进而有效地提升用户体验。

2. 对比 Loading 组件，Skeleton 组件更加不容易引起用户的注意，因为它的样式接近实际页面，而且它的过渡效果更加轻柔自然，能给用户一个页面的预期效果。

3. 为了满足如此多复杂的页面布局，使 Skeleton 更加接近实际页面轮廓，组件内部只是实现了基本的过渡效果与自身样式配置，页面整块 Skeleton 区域需开发者按照实际业务场景去布局，使用 Tailwind CSS 的 Flexbox 或 Grid 是很快的，况且这一过程相当于搭建实际页面之前的一次彩排，可以复用。

## type

Skeleton 组件目前提供了七种类型的骨架屏，分别是：`'div'|'p'|'img'|'video'|'code'|'qrcode'|'barcode'`，其中 code 是代码块，qrcode 是二维码，barcode 是条形码。

## 特殊

当 type 为 `'p'` 时可以通过 lines 属性来控制段落行数，此时最后一行的长度会在一个合适的范围内随机变化。
