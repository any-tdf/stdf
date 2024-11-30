> Toast 使用了图标 ri-checkbox-circle-line、ri-close-circle-line、ri-error-warning-line、ri-information-line，请确保项目的 symbol.svg 文件中包含这些图标。详细信息请参考 [STDF-指南-图标](https://stdf.design/#/guide/icon)。

## 显示位置

提示默认显示在屏幕中央，也可以通过 `position` 属性设置显示位置，当 position 为 `top` 或 `bottom` 时，可以通过 `py` 属性设置距离顶部或底部的距离。

## 动画

提示默认使用 `scale` 动画，也可以通过 `transitionType` 属性设置其他动画类型，通过 `transitionParams` 属性设置动画参数，其中 `duration` 表示进入的动画时间。

transitionParams 具体支持的参数请参考 [svelte/transition](https://svelte.dev/docs#run-time-svelte-transition)。

考虑到用户体验，提示信息出现时有一个较短的动画（默认 300ms），能引起用户的注意力；而提示信息展示完后一般需要迅速关闭，所以退出动画默认为 0ms，当然也可以通过 `outDuration` 属性设置退出的动画时间。

退出动画只允许设置动画时长，其他参数会沿用进入动画的参数，保证动画效果「从哪里来回哪里去」。

## 显示时长

显示时长默认为 2000ms，可以通过 `duration` 属性设置显示时长。当 `duration` 为 0 时，提示不会自动关闭。

注意：由于出现有动画时长（默认 300ms 或自定义其他值），所以 `duration` 不能低于出现的动画时长，否则提示信息还没完全出现就被关闭了 😭。

## type

Toast 内部通过 `type` 属性为 'success'/'error'/'warning'/'info' 四种情况设置了对应的图标，也可以传入 `'loading'` 和 `'icon'` 配合 loading 与 icon 自定义对应的显示内容，传 `null` 不显示。请参考示例。

## Snippet

默认情况下，Toast 内部可以通过 `children` 属性传入任意内容作为提示信息。

## 优化

由于移动端的 Safari、Chrome 或其他一些浏览器滚动页面时会动态显示工具栏或地址栏（多此一举），导致页面的高度也会动态变化，Toast 针对这一情况也做了优化。当 dynamicFixed 为 true 时滚动页面时会动态地更新页面高度，相对应地 Toast 内部元素相对于页面的位置也会动态更新。

当然，这个滚动监听会有微弱的性能损失，如果你的项目中不需要此功能（比如在可控的 webview 内使用），可以设置 dynamicFixed 为 false 来关闭。
