## Description

When placed horizontally, NoticeBar will automatically scroll horizontally if the total length of the content plus the spacing between each content exceeds the width of the container, otherwise it will not scroll.

When placed vertically, it will automatically scroll vertically if there is more than one piece of content, and if a single piece of content is too long it will overflow.

## `leftIcon` and `rightIcon`

The `leftIcon` area, in addition to the default small speaker icon, can display other icons with Icon Props or any custom content through a slot. The `rightIcon` area, on the other hand, only allows for the options of close, arrow, or not showing, please refer to the example.

## `clickright` event

When clicking on the right area, if `rightIcon` is "close", it will close the current notice bar. Whether `rightIcon` is "close" or "arrow", it will dispatch a `clickright` event, which can be used to implement custom business logic by listening to the event.

## CSS injection

The `injClass` parameter can inject a CSS classname (not limited to Tailwind CSS) into the outermost element within the component, which provides more customization options for the component's style. In the example, custom background color and text color are achieved through `injClass`.

If the injected class does not take effect, add a "!" before the injected class name, as shown in the [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier) documentation.
