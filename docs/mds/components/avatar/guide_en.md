> Avatar uses icons ri-user-3-line and ri-user-add-line. Please ensure these icons are included in your project's symbol.svg file. For detailed information, please refer to [STDF-Guide-Icon](https://stdf.design/guide/icon).

## Content Description

image accepts relative or absolute image paths, which will be converted to the src attribute of an img tag internally; alt displays the input text directly; icon accepts Icon Props to render avatar content using the Icon component, please refer to Icon API; if image, alt, and icon are not provided, the Avatar component will display a default user icon using the Icon component.

With the configurability of content combined with other style adjustment parameters, the Avatar component is not limited to just avatar scenarios - please use it flexibly.

## Content Priority

image > alt > icon.

## imgSize

This parameter determines the ratio of the internal image to the entire avatar frame. The three levels s, m, l correspond to 1/3, 2/3, and full coverage respectively. Most business scenarios use full coverage, but some interface designs require PNG format images, in which case this parameter may need to be adjusted to give the page a sense of breathing space.

## injClass

The injClass parameter allows injecting CSS class names (not limited to Tailwind CSS) into the component's internal button element, enabling more customization possibilities for component styles. The example demonstrates custom background color and border color through injClass.

If the injected class doesn't take effect, please add "!" before the class name. Refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).

## Avatar Group

Starting from v0.4.0, avatar groups are supported. Avatar groups are used to display multiple avatars within an avatar frame, such as group chat avatars or comment avatars. Simply pass in an array composed of Avatar Props, and the avatar group has its own Props to control different styles.

By default, the top layer displays the total number of avatars. The top parameter can control the top layer content, with options including totle (display total avatar count), add (add avatar Icon), null (no display), and Snippet (custom top layer content).

Avatar group Props also has its own injClass, which can inject Class names for the avatar group, typically used to unify the ring color when the default border color doesn't match the background color.
