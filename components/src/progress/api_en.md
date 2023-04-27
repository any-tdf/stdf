## Progress Props

| Property        | Type    | Default | Options                        | Required | Description                                          |
| --------------- | ------- | ------- | ------------------------------ | -------- | ---------------------------------------------------- |
| percent         | Number  | 66      | 0-100                          | Yes      | The percentage completed.                            |
| percentPosition | String  | 'right' | 'right'/'inner'/'block'/'none' | Yes      | The position of the percentage text.                 |
| height          | String  | '2'     | '1'/'2'/'3'/'4'                | Yes      | The height of the progress bar.                      |
| radius          | String  | 'full'  | 'full'/'base'/'none'           | Yes      | The style of the progress bar's corners.             |
| inactive        | Boolean | false   | true/false                     | Yes      | Whether the progress bar is inactive.                |
| useSlot         | Boolean | false   | true/false                     | Yes      | Whether the percentage text should be a slot.        |
| overflowPercent | Number  | 10      | 0-100                          | Yes      | The threshold for the percentage text's overflow.    |
| duration        | String  | '300'   | '150'/'300'/'500'/'700'/'1000' | Yes      | The duration of the animation in milliseconds.       |
| injClass        | String  | ''      | -                              | Yes      | The class to inject when the progress bar is active. |
| trackInjClass   | String  | ''      | -                              | Yes      | The class to inject for the progress bar's track.    |

## Progress Slots

| Name | Description                                              |
| ---- | -------------------------------------------------------- |
| -    | The content of the percentage text when useSlot is true. |
