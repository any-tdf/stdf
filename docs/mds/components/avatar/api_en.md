## Avatar Props

| Property | Type                                                      | Default  | Required | Description                        |
| -------- | --------------------------------------------------------- | -------- | -------- | ---------------------------------- |
| image    | `string`                                                  | `''`     | N        | Image path.                        |
| alt      | `string`                                                  | `''`     | N        | Alt text, single char recommended. |
| icon     | [`Icon`](https://stdf.design/#/components?nav=icon&tab=1) | `{}`     | N        | Alternative icon.                  |
| altSize  | `'xs'\|'sm'\|'md'\|'lg'\|'xl'`                            | `'md'`   | N        | Alt text size.                     |
| radius   | `'none'\|'sm'\|'xl'\|'2xl'\|'3xl'\|'full'`                | `'sm'`   | N        | Border radius style.               |
| size     | `'xs'\|'sm'\|'base'\|'md'\|'lg'\|'xl'\|'2xl'`             | `'md'`   | N        | Avatar frame size.                 |
| imgSize  | `'s'\|'m'\|'l'`                                           | `'l'`    | N        | Avatar image size.                 |
| line     | `'none'\|'solid'\|'dashed'\|'dotted'`                     | `'none'` | N        | Border style.                      |
| injClass | `string`                                                  | `''`     | N        | Injected CSS class name.           |

## Avatar Events

| Name    | Type         | Params | Description         |
| ------- | ------------ | ------ | ------------------- |
| onclick | `() => void` | -      | Triggered on click. |

## Avatars Props

| Name      | Type                                                                                        | Default   | Required | Description                                   |
| --------- | ------------------------------------------------------------------------------------------- | --------- | -------- | --------------------------------------------- |
| data      | `Avatar[]`                                                                                  | `[]`      | N        | Array of Avatar Props data.                   |
| radius    | `'none'\|'base'\|'xl'\|'2xl'\|'3xl'\|'full'`                                                | `'full'`  | N        | Border radius style.                          |
| size      | `'xs'\|'sm'\|'base'\|'md'\|'lg'\|'xl'\|'2xl'`                                               | `'md'`    | N        | Avatar frame size.                            |
| compact   | `number`                                                                                    | `5`       | N        | Compactness level, higher means more compact. |
| lineWidth | `'0'\|'1'\|'2'\|'3'\|'4'\|'8'`                                                              | `'3'`     | N        | Border width.                                 |
| reverse   | `boolean`                                                                                   | `false`   | N        | Whether to reverse the order.                 |
| max       | `number`                                                                                    | `10`      | N        | Maximum number of avatars to display.         |
| top       | `'totle'\|'add'\|null`\|[`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | `'totle'` | N        | Top layer content.                            |
| injClass  | `string`                                                                                    | `''`      | N        | Injected CSS class name.                      |

## Avatars Events

| Name    | Type         | Params | Description                          |
| ------- | ------------ | ------ | ------------------------------------ |
| onclick | `() => void` | -      | Triggered when avatar group clicked. |
