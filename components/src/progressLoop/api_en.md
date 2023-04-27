## ProgressLoop Props

| Prop Name     | Type    | Default | Options                        | Required | Description                                                                  |
| ------------- | ------- | ------- | ------------------------------ | -------- | ---------------------------------------------------------------------------- |
| percent       | Number  | 66      | 0-100                          | No       | The percentage value of the progress ring.                                   |
| strokeWidth   | Number  | 2       | 0-12                           | No       | The width of the progress ring.                                              |
| butt          | Boolean | false   | true/false                     | No       | Whether the endpoint of the progress ring is square.                         |
| reverse       | Boolean | false   | true/false                     | No       | Whether the progress ring is shown in a reverse (anti-clockwise) direction.  |
| duration      | String  | '300'   | '150'/'300'/'500'/'700'/'1000' | No       | The transition time of the animation.                                        |
| gradient      | Array   | []      | -                              | No       | The colors of the gradient, represented by an array of start and end colors. |
| useSlot       | Boolean | false   | true/false                     | No       | Whether to use a custom slot for the percentage text.                        |
| injClass      | String  | ''      | -                              | No       | The CSS class name injected into the active progress ring.                   |
| trackInjClass | String  | ''      | -                              | No       | The CSS class name injected into the track ring.                             |

## ProgressLoop Slots

| Slot Name | Description                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------ |
| -         | The content of the slot that will replace the default text for `percent` when `useSlot` is true. |
