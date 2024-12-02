## 问：为什么已经完整支持 Svelte 5 了却还是 next 版本？

答：因为当前时间点 Tailwind CSS v4 只是发布了 Beta 版本，正式版还未发布，STDF 将等待 Tailwind CSS v4 正式版发布后，迅速适配，届时将发布 v1.0.0 正式版。

## 问：为什么没有栅格组件？

答：直接使用 CSS 的 Flexbox 特性，已经可以很方便快速地实现栅格布局，不再需要为了实现栅格布局而引入额外的组件，而且使用 Tailwind CSS 书写会非常简洁。

## 问：部分组件的 Props 需要传入 String 类型，但传入 Number 类型也完全正常使用？

答：由于组件内部这些 Props 作为 Object 的 key，严格来说应该传入 String 类型，若传入数字也会被转为 String，所以传入 Number 或者 String 类型都是可以的，开启类型检查的时候会有类型报错。虽然可以正常使用，但还是建议传入规定的类型。
