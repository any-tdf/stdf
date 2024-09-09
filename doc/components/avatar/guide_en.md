> Avatar uses the icons ri-user-3-line and ri-user-add-line, please ensure that the symbol.svg file in your project includes these icons. For details, please refer to [STDF-Guide-Icon](https://stdf.design/#/guide/icon).

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

## Avatar Group

Starting with v0.4.0, the `Avatar` component supports avatar groups, which can be used to display multiple avatars inside an avatar frame, such as group chat avatars, comment avatars, etc. Simply pass in an array of `Avatar Props` to use. The avatar group has its own props for controlling different styles.

By default, the total number of avatars is displayed at the top level, and the `top` parameter can be used to control what is displayed at the top level, with the following optional values: `totle` (displays the total number of avatars), `add` (displays an icon for adding avatars), `none` (does not display anything), and `Slot` (allows for custom content at the top level).

The avatar group props also have an `injClass` that can be used to insert a class name into the avatar group, which is generally used to unify the background and border colors when the default border color does not match the background color. Note that the `ring` color must be passed in.
