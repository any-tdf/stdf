## Description

The `Avatar` component can receive a relative or absolute path for `image`, which will be converted to the `src` attribute of the `img` tag inside the component. If `alt` is passed in, it will be displayed as text. If `icon` is passed in as `Icon Props`, the `Icon` component will be used to render the contents of the avatar. If none of `image`, `alt`, and `icon` are passed in, the `Avatar` component will default to using the `Icon` component to display a user icon.

Combined with other parameters for style adjustments, the configurability of the content means that the `Avatar` component is not only suitable for the specific use case of displaying avatars, but can be used flexibly for other purposes as well.

## Content Priority

`image` > `alt` > `icon`

## `imgSize`

This parameter determines the proportion of the avatar frame that the image inside it takes up. The three levels of `s`, `m`, and `l` correspond to 1/3, 2/3, and full width, respectively. Most use cases require full width, but if the design requires the use of a PNG format image, this parameter may be used to adjust the breathing room of the image within the frame.

## `injClass`

The `injClass` parameter can be used to inject custom CSS class names (not limited to Tailwind CSS) into the `button` element inside the component. This allows for further customization of the component's appearance, as demonstrated in the example using `injClass` to customize the background and border colors.

If the injected class name does not take effect, add a `!` before the class name, as demonstrated in the [Tailwind Important Modifier](https://tailwindcss.com/docs/configuration#important-modifier).
