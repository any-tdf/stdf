## Default style

In the practical application of mobile web, the use of large theme color buttons is relatively high, because of its prominence and brand attributes, it is very suitable for guiding users to operate. Therefore, STDF does not follow the gray border button of the mainstream component library as the default style, but uses a large theme color to fill the button, which should reduce the amount of writing code when using it. The rest of the styles are basically in accordance with Tailwind's style rules, but some options are classified and limited, and the incoming optional values ​​will be processed according to the default values.

## Fill pattern

In fill mode, line is a linear button (ghost button), lineLight is a linear light button, text is a plain text button, and lineTheme and textTheme indicate that the corresponding border and text color will follow the theme color, including light and dark colors.

## Status color

The status color corresponds to the four functional colors of success, warning, error, and information of the STDF color system. Please make sure that the corresponding color values ​​have been configured in the Tailwind configuration file tailwind.config.js. Of course, you can also configure it flexibly according to your project. .

## Size

The button size is full and big for block-level elements, md, sm, and xs for inline elements. When auto, the button width is determined by the width of the inner element.

## Border style

The border style (line) will only take effect if the fill mode (fill) is line or lineTheme.

## CSS injection

Through the injClass parameter, you can inject CSS names (not limited to Tailwind CSS) to the button element inside the component, which will allow more customization possibilities for component styles. In the example, injClass implements custom colors.

If the injected class does not take effect, please add "!" before the injected class name, please refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).

## Button group

To use the button group, you can directly put multiple elements in the inner slot, which can be achieved by combining heightOut and heightIn. It should be noted that the click event needs to be bound to the internal independent element at this time. In addition, by setting the group of Props to true, the click effect of the entire button area will not be displayed. Examples are available.
