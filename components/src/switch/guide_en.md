## Use Cases

On mobile devices, the Switch component is generally used in conjunction with the Cell component, and the `right` parameter of the Cell component supports passing in Switch Props. Please refer to the Cell API.

Of course, it can also be used alone.

## injClass

The `injClass` parameter can be used to inject CSS class names (not limited to Tailwind CSS) into the outermost element inside the component, which will make the component style more customizable. Because CSS injection is at the end, if the outermost element already has the same property CSS, it will be based on `injClass`. This is also the reason why custom switch colors can be achieved through `injClass`.

## inside & slot

The `inside` parameter determines the content displayed inside the switch, with an empty array as the default value, displaying no content. If 'state' is passed in, the switch status will be represented by a vertical line and a circle. If an array of two characters is passed in, the first and second items will display the internal text when the switch is turned off and on, respectively. It is recommended to pass in a single character. If 'loading' is passed in, a Loading icon will be rendered. If 'slot' is passed in, the slot content when turned on and off will be rendered.

Please refer to the example.

## Special Note

When used in the Cell component, the `check` of the Switch is determined by the `switcheck` of the Cell Props,**please do not pass in `check` again inside the switch component.**
