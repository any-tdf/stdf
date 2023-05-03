## Rate Props

| Property  | Type    | Default   | Options                   | Required | Description                                 |
| --------- | ------- | --------- | ------------------------- | -------- | ------------------------------------------- |
| value     | Number  | 4         | -                         | No       | The selected value.                         |
| total     | Number  | 5         | -                         | No       | The total score.                            |
| width     | Number  | 24        | -                         | No       | The width of a single content (in pixels).  |
| height    | Number  | 24        | -                         | No       | The height of a single content (in pixels). |
| opacity   | Number  | 0.2       | 0-1                       | No       | The opacity of unselected content.          |
| space     | String  | '3'       | '0'/'1'/'2'/'3'/'4'/'8'   | No       | The spacing between contents.               |
| half      | Boolean | false     | true/false                | No       | Whether to allow half selection.            |
| zero      | Boolean | false     | true/false                | No       | Whether to allow 0 score.                   |
| vertical  | Boolean | false     | true/false                | No       | Whether to allow vertical half selection.   |
| disabled  | Boolean | false     | true/false                | No       | Whether to disable.                         |
| readonly  | Boolean | false     | true/false                | No       | Whether to be read-only.                    |
| custom    | Boolean | false     | true/false                | No       | Whether to use customized content.          |
| animation | String  | 'current' | 'current'/'active'/'none' | No       | The type of click animation.                |

## Rate Events

| Event | Parameters                                                     | Description             |
| ----- | -------------------------------------------------------------- | ----------------------- |
| click | event: Event object, where detail indicates the current value. | Triggered when clicked. |

## Rate Slots

| Name | Description                                   |
| ---- | --------------------------------------------- |
| -    | A single content, which will be used by Rate. |
