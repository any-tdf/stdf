## Slider Props

| Name       | Type                        | Default   | Required | Description                         |
| ---------- | --------------------------- | --------- | -------- | ----------------------------------- |
| value      | `number`                    | `40`      | N        | Current value.                      |
| step       | `number`                    | `1`       | N        | Step size.                          |
| minRange   | `number`                    | `0`       | N        | Minimum selectable value.           |
| maxRange   | `number`                    | `100`     | N        | Maximum selectable value.           |
| isRange    | `boolean`                   | `false`   | N        | Whether it's a range selection.     |
| startValue | `number`                    | `20`      | N        | Start value for range selection.    |
| endValue   | `number`                    | `60`      | N        | End value for range selection.      |
| showTip    | `'always'\|'never'\|'touch'` | `'touch'` | N        | Tip display mode.                   |
| radius     | `'none'\|'sm'\|'xl'\|'full'` | `'full'`  | N        | Border radius style.                |
| lineBlock  | `boolean`                   | `false`   | N        | Whether the slider is a line block. |
| disabled   | `boolean`                   | `false`   | N        | Whether it's disabled.              |
| readonly   | `boolean`                   | `false`   | N        | Whether it's read-only.             |

## Slider Events

| Name     | Type                                  | Parameters                                          | Description                   |
| -------- | ------------------------------------- | --------------------------------------------------- | ----------------------------- |
| onchange | `(values: [number, number?]) => void` | values - Current value array (two items for range). | Triggered when value changes. |

## Slider Snippets

| Name     | Type                                                                | Parameters | Description                                  |
| -------- | ------------------------------------------------------------------- | ---------- | -------------------------------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Content to be rendered in the progress area. |
