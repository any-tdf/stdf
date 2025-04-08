## Switch Props

| Name     | Type                                                            | Default    | Required | Description                                                              |
| -------- | --------------------------------------------------------------- | ---------- | -------- | ------------------------------------------------------------------------ |
| active   | `boolean`                                                       | `false`    | N        | Switch state.                                                            |
| radius   | `'none'\|'middle'\|'full'`                                      | `'middle'` | N        | Border radius style.                                                     |
| inside   | `'state'\|'loading'\|[string,string]\|null`                     | `null`     | N        | Switch inner content.                                                    |
| injClass | `string`                                                        | `''`       | N        | Injected CSS class name.                                                 |
| disabled | `boolean`                                                       | `false`    | N        | Whether the switch is disabled.                                          |
| async    | `boolean`                                                       | `false`    | N        | Whether the switch is asynchronous.                                      |
| loading  | [`Loading`](https://stdf.design/components?nav=loading&tab=1) | `{}`       | N        | Loading component parameters, only effective when inside is `'loading'`. |

## Switch Events

| Name     | Type                        | Parameters                     | Description                              |
| -------- | --------------------------- | ------------------------------ | ---------------------------------------- |
| onclick  | `() => void`                | -                              | Triggered when clicked.                  |
| onchange | `(active: boolean) => void` | active - Current switch state. | Triggered when the switch state changes. |

## Switch Snippets

| Name       | Type                                                                | Parameters | Description                                 |
| ---------- | ------------------------------------------------------------------- | ---------- | ------------------------------------------- |
| trueChild  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Switch inner content when the state is on.  |
| falseChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Switch inner content when the state is off. |
