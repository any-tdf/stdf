## useSlot

When `useSlot` is set to true, the default percentage text is no longer used and will instead be rendered through a provided slot.

## overflowPercent

When `percentPosition` is set to 'inner' and the percentage value is low, the percentage text may overflow. `overflowPercent` sets the threshold for the overflow. When the percentage is less than the `overflowPercent` value, the percentage text will be placed to the right of the progress bar.

## CSS Injection

The `injClass` and `trackInjClass` props can be used to inject CSS class names into the active progress bar and track bar elements. This allows for greater customization of the component's style. In the provided example, custom progress bar colors are achieved through the use of `injClass` and `trackInjClass`.

If the injected class does not take effect, add a "!" before the class name. More information can be found in the [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
