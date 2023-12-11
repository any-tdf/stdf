## Tabs

### Description

The Tabs component internally uses the Tab component, and all tab props in the Tabs props are passed through to configure different styles for the Tab.

### Slots

When the `transition` property in the Tabs props is set to `true` (which is the default value), a transition effect is added when switching between Tabs. However, when `transition` is set to false, or when `position` is set to 'l' or 'r', there will be no transition effect on the Tab contents. In this case, the Svelte slot feature can be used to expose the active Tab index value to the internal contents of the slot using the `let:` directive. You can use TabContent's `show` property to control whether the main content area is displayed or hidden.
By using the active index value exposed through the slot, you can also freely control the transition effects of the main content area in other ways. The example below shows one way to do this, but you can try other transition effects based on your specific business requirements.

For more information on how to use Svelte slots, see [Svelte Slot](https://svelte.dev/docs#template-syntax-slot-slot-key-value).

### Tab position

The `position` property of Tabs determines the position of the Tabs (t: top, b: bottom, l: left, r: right), which affects the layout style of the `Tab` component. Horizontal and vertical layout styles are available, depending on the value of the `layout` property.

---

## Tab

### Description

The `Tab` component can be used on its own to expose the currently active tab index value through the `clicktab` event binding.

### labels

This property determines the content of the Tabs, and supports a combination of icons and text. The data type is an array of objects, where each object contains a `text` and an `icon` property. The `icon` property uses the `Icon` component to render, its specific parameters can be found in the Icon API.

### Linear style

When the `lineType` property of the `Tab` component is set to `true`, a linear style is used. However, it will not work when the layout is set to 'v' (vertical).

### CSS injection

The Tab structure is relatively complex. In order to support more flexible customization, four places for injecting CSS are provided internally. The `injClass` property is applied to the outermost element of the Tab. The `tabInjClass` property is applied to the internal single tab. The `activeTabInjClass` property is applied to the currently active tab. And, the `activeInjClass` property is used to apply a specific style to the Tab indicator.

If the injected class does not take effect, add an "!" before the class name, similar to the [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
