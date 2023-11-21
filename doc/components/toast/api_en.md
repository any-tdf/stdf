## Toast Props

| Property         | Type    | Default  | Options                                                                     | Required | Description                                                                                                                                             |     |
| ---------------- | ------- | -------- | --------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| message          | String  | ''       | -                                                                           | N        | The message to display in the notification.                                                                                                             |     |
| visible          | Boolean | false    | true/false                                                                  | N        | Whether the notification should be visible or hidden.                                                                                                   |     |
| duration         | Number  | 2000     | -                                                                           | N        | The duration in milliseconds for which the notification should remain visible. A value of 0 means it won't automatically close.                         |     |
| position         | String  | 'center' | 'center'/'top'/'bottom'                                                     | N        | The position where the notification should be displayed.                                                                                                |     |
| py               | String  | '20      | '0'/'10'/'20'/'40'/'60'/'80'                                                | N        | The position offset from the top or bottom of the screen when the notification is displayed. This property is ignored when position is set to 'center'. |     |
| radius           | String  | 'base'   | 'base'/'full'/'none'/'sm'/'md'/'lg'/'xl'/'2xl'                              | N        | The style of the notification's corners.                                                                                                                |     |
| useSlot          | Boolean | false    | true/false                                                                  | N        | Whether to use a slot.                                                                                                                                  |     |
| transitionType   | String  | 'scale'  | 'fade'/'fly'/'scale'/'slide'/'blur'/'none'                                  | N        | The type of animation to use.                                                                                                                           |     |
| transitionParams | Object  | {}       | See [svelte/transition](https://svelte.dev/docs#run-time-svelte-transition) | N        | Animation parameters, with the default duration set to 300ms.                                                                                           |
| outDuration      | Number  | 0        | -                                                                           | N        | Duration of the exit animation in milliseconds.                                                                                                         |
| mask             | Object  | {}       | See Mask Props                                                              | N        | Parameters for the mask layer.                                                                                                                          |
| type             | String  | ''       | ''/'success'/'error'/'warning'/'info'/'loading'/SVG Sprites name            | N        | Type of notification.                                                                                                                                   |
| loading          | Object  | {}       | See Loading Props                                                           | N        | Parameters for the loading component, only effective when the type is 'loading'.                                                                        |
| icon             | Object  | {}       | See Icon Props                                                              | N        | Parameters for the icon component, only effective when the type is non-empty and non-'loading'.                                                         |
| zIndex           | Number  | 1000     | -                                                                           | N        | z-index.                                                                                                                                                |
| clickable        | Boolean | false    | true/false                                                                  | N        | Whether the notification area is clickable through.                                                                                                     |
| dynamicFixed     | Boolean | true     | true/false                                                                  | N        | Whether to dynamically fix the position.                                                                                                                |

## Toast Events

| Name  | Parameters | Description                         |
| ----- | ---------- | ----------------------------------- |
| close | -          | Triggered when the toast is closed. |
| open  | -          | Triggered when the toast is opened. |

## Toast Slots

| Name | Description                                      |
| ---- | ------------------------------------------------ |
| -    | The content of the toast when `useSlot` is true. |
