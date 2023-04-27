## Popup Props

| Property           | Type    | Default Value | Optional Values                                                                                                                  | Required | Description                                                                                      |
| ------------------ | ------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| visible            | Boolean | false         | true/false                                                                                                                       | N        | Whether to display the component.                                                                |
| size               | Number  | 40            | 0-100                                                                                                                            | N        | The size of the popup layer, with 0 being determined by the internal element.                    |
| position           | String  | 'bottom'      | 'center'/'top'/'bottom'/'left'/'right'                                                                                           | N        | Display position.                                                                                |
| duration           | Number  | 450           | -                                                                                                                                | N        | Transition time for appearing animation (in ms).                                                 |
| outDuration        | Number  | 240           | -                                                                                                                                | N        | Transition time for exiting animation (in ms).                                                   |
| easeType           | String  | 'cubicOut'    | Supports 31 types of effect, with specific values ​​referencing [svelte/easing](https://svelte.dev/docs#run-time-svelte-easing). | N        | The type of appearing animation.                                                                 |
| easeOutType        | String  | 'cubicOut'    | Supports 31 types of effect, with specific values ​​referencing [svelte/easing](https://svelte.dev/docs#run-time-svelte-easing). | N        | The type of exiting animation.                                                                   |
| px                 | String  | '0'           | '0'/'1'/'2'/'3'/'4'/'5'/'6'/'8'/'10'/'12'/'16'/'20'                                                                              | N        | Left and right distance.                                                                         |
| py                 | String  | '0'           | '0'/'1'/'2'/'3'/'4'/'5'/'6'/'8'/'10'/'12'/'16'/'24'/'32'/'48'/'64'                                                               | N        | Up and down distance.                                                                            |
| mask               | Object  | {}            | Refer to Mask Props                                                                                                              | N        | Parameters for the mask layer.                                                                   |
| maskClosable       | Boolean | true          | true/false                                                                                                                       | No       | Determines whether clicking on the mask layer closes the popup.                                  |
| radiusPosition     | String  | 'top'         | 'all'/'top'/'bottom'/'left'/'right'                                                                                              | No       | Determines the position of the rounded corners.                                                  |
| radius             | String  | 'none'        | 'none'/'base'/'md'/'lg'/'xl'/'2xl'/'3xl'/'full'                                                                                  | No       | Determines the size of the rounded corners.                                                      |
| transitionDistance | Number  | 0             | -                                                                                                                                | No       | Determines the animation distance when the size of the popup is determined by internal elements. |
| transparent        | Boolean | false         | true/false                                                                                                                       | No       | Determines whether the background is transparent.                                                |
| allowBodyScroll    | Boolean | true          | true/false                                                                                                                       | No       | Determines whether body scrolling is allowed when the popup is displayed.                        |
| zIndex             | Number  | 600           | -                                                                                                                                | No       | Determines the z-index of the popup.                                                             |
| dynamicFixed       | Boolean | true          | true/false                                                                                                                       | No       | Determines whether the popup is dynamically fixed.                                               |
| hideScrollbar      | Boolean | false         | true/false                                                                                                                       | No       | Determines whether to hide the scrollbar in the scrolling area.                                  |

## Popup Events

| Name      | Parameters | Description                                                                           |
| --------- | ---------- | ------------------------------------------------------------------------------------- |
| open      | -          | Triggered when the popup is opened.                                                   |
| clickMask | -          | Triggered when the mask layer of the popup is clicked, even if maskClosable is false. |
| close     | -          | Triggered when the popup is closed.                                                   |

## Popup Slots

| Name | Description               |
| ---- | ------------------------- |
| -    | The content of the popup. |
