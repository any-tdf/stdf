## Display position

The toast is displayed in the center of the screen by default, but you can set its position by using the `position` property. When `position` is set to `top` or `bottom`, you can use the `py` property to set the distance from the top or bottom.

## Animation

The toast uses the `scale` animation by default, but you can set a different animation by using the `transitionType` property. You can also set animation parameters using the `transitionParams` property, where `duration` represents the animation duration.

For a better user experience, the toast has a short animation (default 300ms) when it appears to draw the user's attention. After the content is displayed, the toast usually needs to be closed quickly, so the exit animation is set to 0ms by default. You can set the exit animation duration using the `outDuration` property.

Only the duration of the exit animation can be set, other parameters will be the same as those of the entry animation to ensure a consistent animation effect.

## Duration

The toast is displayed for 2000ms by default, but you can set a custom duration using the `duration` property. If `duration` is set to 0, the toast will not close automatically.

Note: Because the toast has an animation duration (default 300ms or another custom value), `duration` cannot be less than the duration of the animation that displays the toast. Otherwise, the toast may be closed before it is fully displayed 😭.

## Type

By default, the toast has predefined content for five types: 'success', 'error', 'warning', 'info' and 'loading'. You can also customize the content by setting the `type` property. If `type` is set to an empty string, no icon will be displayed. Otherwise, the icon corresponding to the name of the SVG Sprites Icon passed to the `type` property will be displayed.

## Use Slot

By default, the toast uses the `message` and `icon` properties to display the content. You can also use a custom slot by setting the `useSlot` property to true and passing in any content you like.

## Optimization

To deal with the dynamic display of toolbars or address bars in Safari, Chrome or other mobile browsers, Toast has also been optimized. When `dynamicFixed` is set to true, the toast will dynamically update the height of the page as the user scrolls, and the position of the toast relative to the page will also be updated accordingly.

Of course, this scroll listener will have a slight performance cost. If you don't need this feature in your project (such as when using a controllable webview), you can set `dynamicFixed` to false to disable it.
