## 默认样式

通过查看大量主流的移动端 UI 设计（包含原生与 web），发现在实际应用中，大块主题色按钮的使用频率比较高，因为它的突出性与品牌属性，非常适合用来引导用户操作。故而 STDF 没有跟随主流组件库的灰色边框按钮作为默认样式，而采用大块主题色填充按钮，应该可以减少使用时的书写代码量。其余样式基本上按照 Tailwind 的样式规则，只是对一些选项做了分类与限定，传入可选外的值将被按照默认值处理。

## 填充模式

填充模式中，line 为线性按钮（幽灵按钮）；lineLight 线性浅色按钮；text 为纯文本按钮；而 lineTheme 与 textTheme 表示对应边框和文字颜色会跟随主题色，包括亮暗模式；colorLight 为带透明度浅色背景按钮，也自动适配亮暗模式。

## 状态色

状态色对应着 STDF 颜色系统的成功、警告、错误、信息四种功能色，请确保在 Tailwind 的配置文件 tailwind.config.js 中已经配置了对应色值，当然也可以根据你的项目自行灵活配置。

## 尺寸

按钮尺寸为 full 和 big 表示块级元素，md、sm、xs 表示行内元素，auto 时按钮宽度由内部元素的宽度决定。

## 边框风格

边框风格（line）必须在填充模式（fill）为 line 或 lineTheme 情况下才会生效。

## CSS 注入

通过 injClass 参数可以向组件内部 button 元素注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性，示例中通过 injClass 实现了自定义颜色。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。

## 按钮组

要使用按钮组可以直接通过在内部 Snippet 放入多个元素，结合 heightOut 与 heightIn 就可以实现。需要注意的是此时点击事件就需要绑定在内部独立元素之上，另外需要通过将 Props 的 group 设置为 true，将不显示整个按钮区域的点击效果。可参考示例。

## 带图标或加载

通过 icon 参数可以向 Button 组件内容区域前注入图标，参数为 Icon 组件的 Props；通过 loading 参数可以向 Button 组件内容区域前注入加载，参数为 Loading 组件的 Props，当传入 loading 时按钮默认禁用，可通过 disabledLoading 参数控制。请参考示例。
