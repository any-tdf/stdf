> Avatar 使用了图标 ri-user-3-line 和 ri-user-add-line，请确保项目的 symbol.svg 文件中包含这些图标。详细信息请参考 [STDF-指南-图标](https://stdf.design/#/guide/icon)。

## 内容说明

image 可以传入图片的相对路径或绝对路径，组件内部将其转换为 img 标签的 src 属性；alt 传入文字将直接显示；icon 传入 Icon Props 将使用 Icon 组件渲染头像框内容，请参考 Icon API；若 image、alt、icon 都不传，Avatar 组件会默认使用 Icon 组件显示一个用户图标。

内容的可配置性结合其他对于样式调整的参数，Avatar 组件不仅仅适用于头像这一种业务场景了，请灵活使用。

## 内容优先级

image > alt > icon。

## imgSize

此参数决定头像框内部的图片占整个头像框的比例，三个档位 s、m、l 分别对应 1/3、2/3、铺满。多数业务场景都是铺满使用的，但是有些界面设计要求使用 png 格式图片，此时可能需要使用此参数调整使页面有呼吸感。

## injClass

通过 injClass 参数可以向组件内部 button 元素注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性，示例中通过 injClass 实现了自定义背景色和边框颜色。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。

## 头像组

v0.4.0 开始支持头像组，头像组的使用场景是在头像框内部显示多个头像，例如群聊头像、评论头像等。传入由 Avatar Props 组成的数组即可，头像组有自己的 Props 用于控制不同样式。

默认顶层显示头像总数，可通过 top 参数控制顶层显示内容，可选值有 totle（显示头像总数）、add（新增头像 Icon）、null（不显示）、Snippet（自定义顶层内容）。

头像组 Props 自己也有一个 injClass，可为头像组注入 Class 名称，一般用于当默认边框颜色与背景色不统一时传入传入 ring 的颜色使其统一。
