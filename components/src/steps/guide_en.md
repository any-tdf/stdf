## Description

By default, Steps are horizontally layouted, but due to limited display on mobile devices, horizontal layout is recommended only for simple use. When there are many steps, long titles, or more content to display, vertical layout is recommended. Horizontal layout only displays titles and step bar areas, and other parameters such as desc will not be displayed.

## current

The actual step number starting from 1, corresponding to the index value +1 of steps within the component.

## finishStep

Props for each step support finishStep, which is used for more precise expressions of completed steps in some scenarios. Please refer to the example for details.

## Step bar area

The step bar area bar can be passed in as an object or a character. If a character is passed in, it will be displayed directly. It is recommended to use a single character. The object supports image and icon through type. Icon uses Icon Props, and image can pass the relative or absolute path of the image, and the component will convert it to the src attribute of the img tag.

Please refer to Icon API for Icon Props.

## injComponent

step Props and finishStep Props support the injection of Svelte components through injComponent. Steps will use the `<svelte:component>`syntax to render the entire Svelte component passed in. Refer to the example for details.

For \<svelte:component\>, please refer to [\<svelte:component\>](https://svelte.dev/docs#template-syntax-svelte-component).

## Supplement

Tip: The business scenario that represents a timeline can also use the Steps component.
