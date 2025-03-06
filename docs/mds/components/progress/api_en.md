## Progress Props

| Name            | Type                                 | Default   | Required | Description                                                       |
| --------------- | ------------------------------------ | --------- | -------- | ----------------------------------------------------------------- |
| percent         | `number`                             | `66`      | N        | Percentage value.                                                 |
| percentPosition | `'inner'\|'right'\|'block'\|null`    | `'right'` | N        | Position of percentage text.                                      |
| height          | `'1'\|'2'\|'3'\|'4'`                 | `'2'`     | N        | Height of progress bar.                                           |
| radius          | `'full'\|'middle'\|'none'`           | `'full'`  | N        | Border radius style.                                              |
| inactive        | `boolean`                            | `false`   | N        | Whether to show in inactive state.                                |
| overflowPercent | `number`                             | `10`      | N        | Text overflow threshold when percentPosition is set to `'inner'`. |
| duration        | `'150'\|'300'\|'500'\|'700'\|'1000'` | `'300'`   | N        | Animation transition duration (ms).                               |
| injClass        | `string`                             | `''`      | N        | Injected class name for active progress bar.                      |
| trackInjClass   | `string`                             | `''`      | N        | Injected class name for track bar.                                |

## Progress Snippets

| Name     | Type                                                                | Params | Description                                 |
| -------- | ------------------------------------------------------------------- | ------ | ------------------------------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -      | Renders custom text content when passed in. |
