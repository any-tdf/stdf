## BottomSheet Props

| Properties      | Type    | Default value                      | Optional value                     | required | Description                                                        |
| --------------- | ------- | ---------------------------------- | ---------------------------------- | -------- | ------------------------------------------------------------------ |
| visible         | Boolean | false                              | true/false                         | N        | Whether to display.                                                |
| title           | String  | Current language bottomSheet.title | -                                  | N        | title.                                                             |
| titleAlign      | String  | 'left'                             | 'left'/'center'/'right'            | N        | Title alignment method.                                            |
| showBackIcon    | Boolean | false                              | true/false                         | N        | Whether the icon is returned.                                      |
| closeContent    | String  | 'downIcon'                         | 'downIcon'/'closeIcon'/''/Any text | N        | Close the area content.                                            |
| showDivider     | Boolean | true                               | true/false                         | N        | Whether to display the segmentation line.                          |
| duration        | Number  | 450                                | -                                  | N        | The time of transition animation, unit: ms.                        |
| outDuration     | Number  | 240                                | -                                  | N        | The exit time of the transition animation, unit: ms.               |
| mask            | Object  | {}                                 | refer to Mask Props                | N        | Cover layer parameters.                                            |
| maskClosable    | Boolean | false                              | true/false                         | N        | Click whether the mask layer is closed.                            |
| zIndex          | Number  | 600                                | -                                  | N        | z-index.                                                           |
| stayHeightList  | Array   | [10, 50, 90]                       | -                                  | N        | List of fixed height.                                              |
| stayHeightIndex | Number  | 1                                  | stayHeightList Index value         | N        | Initial fixed height index.                                        |
| closeHeight     | Number  | 0                                  | 0-100                              | N        | At the end of the sliding, the position is lower than this height. |
| radius          | String  | 'full'                             | 'none'/'base'/'full'               | N        | Round -corner style.                                               |

## BottomSheet Events

| Name         | Parameter                                          | Description                                                                                            |
| ------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| close        | -                                                  | Triggered when the floating window is turned off.                                                      |
| clickMask    | -                                                  | Triggered when clicking the floating window mask, even if MaskClosable is false, it will be triggered. |
| back         | -                                                  | Trigger when clicking the icon on the left.                                                            |
| heightChange | EVENT: Event object, where it is a current height. | Triggered at the end of sliding.                                                                       |

## BottomSheet Slots

| Name | Description          |
| ---- | -------------------- |
| -    | BottomSheet content. |
