## Description

It is always difficult to balance customization and ease of use in component library development.

As a component with high frequency of use in mobile scenes, Cell has a lot of props and customizable options due to the various use cases it can accommodate.

## Slots

Cell component supports two slots: left and right. When the left parameter is set to 'slot', the leftmost content of the cell will be rendered in the left slot. You can refer to the example to customize the left image. When the right parameter is set to 'slot', the content on the right side of the cell will be rendered in the right slot. You can refer to the example to customize the right image.

## left & right

The left parameter also supports the Icon Props format Object. In this case, the STDF Icon component will be used to render it.

Considering that the arrow is widely used in the right area of the Cell component, the component defaults to the 'arrow' value for the right parameter, which displays the arrow.

The right parameter also supports Icon Props. Considering that the switch is widely used in the right area of the Cell component, the right parameter adds a type property (optional 'icon' and 'switch') to distinguish between Icon and Switch components.

Optimization: When the right side is a switch, clicking on the entire Cell area will toggle the switch.

Please refer to the respective component API for specific Icon Props and Switch Props.

## switcheck

The switcheck value only takes effect when the type of right is switch, indicating the switch state value. Please note that the check inside the Cell Switch is determined by switcheck. **Please do not pass check inside the switch again**.

## Bottom Divider

Mainly used for combination scenarios, when there is a gap between cells, you can use the line parameter to control whether the bottom divider is displayed.

## Combination Usage

The Cell component supports combination usage, and Cell can be passed to Cell Group. In order not to affect the layout, please refer to the example to configure the line parameter, my, mx, radius, shadow for a single Cell.

## Customization

By using the top, bottom, left, and right padding and top and bottom radius parameters, you can configure various Cell styles. If they still do not meet your needs, you can use injected CSS (injClass) to implement more customized styles. Please refer to the example.
