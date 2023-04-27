## Tabs

### 说明

Tabs 组件内部使用了 Tab 组件，而 Tabs Props 中的 tab 全部透传给 Tab，用于配置 Tab 不同的样式。

### 插槽

Tabs Props 的 transition 默认为 true，此时 Tabs 主体内容切换带有过渡效果。而当 transition 为 false，或者 placement 为 'l' 或 'r' 时，Tabs 主体内容将不会有过渡效果，可以通过 Svelte 提供的插槽传值，`let:`指令将当前激活的 Tab 索引值 active 暴露给插槽内部，再结合 TabContent 的 show 控制主体内容的显示与隐藏。通过暴露出的 active，你还可以自由使用其他方式控制主体区域内容的过渡效果。示例中展示了一种方式，请结合具体业务尝试其他切换效果。

Svelte 插槽传值可参考 [Svelte Slot](https://svelte.dev/docs#template-syntax-slot-slot-key-value)。

### 选项卡位置

Tabs 通过 placement（t：上、b：下、l：左、r：右）决定选项卡位置，而此参数又决定了其中 Tab 的布局方式 layout（h：水平、v：垂直）。

<hr>

## Tab

### 说明

Tab 组件可以单独使用，通过绑定的 clicktab 事件，传递出当前激活选项卡的索引值。

### labels

此参数决定了 Tab 内部的选项卡内容，支持图标与文字自由搭配。数据类型为对象数组，内部对象由 text 和 icon 组成，而 icon 使用 Icon 组件渲染，具体参数请参考 Icon API。

### 线性风格

当 Tab props 的 lineType 为 true 时， Tab 会使用线性风格，但若布局方式为 v（垂直）则线性风格不会生效。

### CSS 注入

Tab 结构相对复杂，为了支持更灵活的自定义样式，内部支持四个地方注入 CSS，injClass 作用于 Tab 最外层元素；tabInjClass 作用于内部的单项 tab；activeTabInjClass 作用于当前激活的 tab；activeInjClass 作用于 Tab 的指示器。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
