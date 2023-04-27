## BottomSheet and Popup

In STDF's design philosophy, both `BottomSheet` and `Popup` are floating interactions within the interface, usually used for secondary operations within a page. There are some similarities in their use as components. However, **the `Popup` is a "layer" concept, while the `BottomSheet` is a "window" concept**.

As a pop-up layer, `Popup` should not involve complex interactions within it, and can be closed by default by clicking on the mask layer. The position, size, transition animation, direction and style of the pop-up can be customized through various parameters. **Heavy on style, light on logic**.

As a bottom sheet, `BottomSheet` can only pop up from the bottom. The "floating" nature of `BottomSheet` is reflected in its ability to control its fixed height by sliding within its header area. The difference between a "window" and a "layer" is that `BottomSheet` has its own header area, which can customize the header content, and dispatch events such as `close`, `back`, `slide`, etc., similar to the window interaction model. It can be used in relatively complex interaction scenarios and cannot be closed by clicking the mask layer by default. **Heavy on logic, light on style**.

## Fixed Height

The height of `BottomSheet` is determined by `stayHeightList`, which is an array composed of multiple 0-100 positive integers. The display height of `BottomSheet` on the page is divided into several levels according to the percentage of the page height, and when the sliding stops, `BottomSheet` will automatically stay at the closest level of height. `stayHeightIndex` indicates the initial fixed height index, combined with `stayHeightList` to determine the initial height of `BottomSheet`.

## Swipe to Close

When the percentage value of `BottomSheet`'s position relative to the page height is less than `closeHeight` when the sliding ends, `BottomSheet` will automatically close. `closeHeight` defaults to 0, which means that it cannot be closed by sliding.

## Events

`BottomSheet` supports listening for events such as `close`, `back`, and `heightChange` through events `on-close`, `on-back`, and `on-height-change`, and the `clickMask` event is triggered when the mask layer is clicked, even if `maskClosable` is set to false.
