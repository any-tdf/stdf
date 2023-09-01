## Badge Props

| Properties | Type    | Default value | Optional value              | required | Description                                                                    |
| ---------- | ------- | ------------- | --------------------------- | -------- | ------------------------------------------------------------------------------ |
| text       | String  | ''            | -                           | N        | Mark copywriting.                                                              |
| radius     | String  | 'full'        | 'full'/'base'/'none'/'leaf' | N        | Round -corner style.                                                           |
| isShow     | Boolean | true          | true/false                  | N        | Whether to display.                                                            |
| isInner    | Boolean | false         | true/false                  | N        | Whether it is inside.                                                          |
| isLeft     | Boolean | false         | true/false                  | N        | Whether it is located on the left (only isinner is effective when false).      |
| offsetY    | Number  | 0             | -                           | N        | The displacement of the upper and lower part (only when the Isinner is false). |
| offsetX    | Number  | 0             | -                           | N        | The left and right offset (only when the Isinner is false).                    |
| injClass   | String  | ''            | Class                       | N        | Inject the CSS name.                                                           |

## Badge Slots

| Name | Explanation                                           |
| ---- | ----------------------------------------------------- |
| -    | Isinner is a relative position of Badge when isinner. |
