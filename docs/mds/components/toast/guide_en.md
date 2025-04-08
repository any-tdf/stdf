> Toast uses icons ri-checkbox-circle-line, ri-close-circle-line, ri-error-warning-line, ri-information-line. Please ensure these icons are included in your project's symbol.svg file. For details, please refer to [STDF-Guide-Icon](https://stdf.design/guide/icon).

## Display Position

By default, the toast appears in the center of the screen. You can also set its position using the `position` prop. When position is set to `top` or `bottom`, you can use the `py` prop to set the distance from the top or bottom.

## Animation

Toast uses `scale` animation by default. You can set other animation types through the `transitionType` prop and configure animation parameters via `transitionParams`, where `duration` represents the entry animation time.

For detailed supported parameters of transitionParams, please refer to [svelte/transition](https://svelte.dev/docs#run-time-svelte-transition).

For better user experience, the toast appears with a short animation (default 300ms) to catch user attention. Since toast messages generally need to close quickly after display, the exit animation is 0ms by default. However, you can set the exit animation duration using the `outDuration` prop.

The exit animation only allows setting the duration, while other parameters inherit from the entry animation to ensure the animation effect "returns where it came from".

## Display Duration

The default display duration is 2000ms, which can be customized using the `duration` prop. When `duration` is 0, the toast won't close automatically.

Note: Since there is an entry animation duration (default 300ms or custom value), `duration` cannot be less than the entry animation duration, otherwise the toast would close before fully appearing 😭.

## type

Toast internally sets corresponding icons for four types: `'success'|'error'|'warning'|'info'` through the `type` prop, and the icon color follows the functional color in the [Color System](https://stdf.design/guide/color). You can also pass `'loading'` and `'icon'` to customize display content with loading and icon components, or pass `null` to display no icon. Please refer to examples.

## Snippet

By default, Toast can accept any content as the prompt message through the `children` prop.

## Optimization

Since mobile Safari, Chrome, and some other browsers dynamically show/hide toolbars or address bars when scrolling (unnecessarily), causing page height to change dynamically, Toast has been optimized for this situation. When dynamicFixed is true, the page height updates dynamically while scrolling, and correspondingly, Toast's internal elements' positions relative to the page update dynamically.

Of course, this scroll monitoring causes slight performance overhead. If your project doesn't need this feature (e.g., when used in a controlled webview), you can disable it by setting dynamicFixed to false.
