## Avatar Props

| Name     | Type                                          | Default                                             | Required | Description                                                               |
| -------- | --------------------------------------------- | --------------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| image    | `string`                                      | `''`                                                | N        | Image path.                                                               |
| alt      | `string`                                      | `''`                                                | N        | Alternative text, single character recommended.                           |
| icon     | `Icon`                                        | `{ name: 'ri-user-3-line', theme: true, size: 32 }` | N        | Icon props [Icon Props](https://stdf.design/#/components?nav=icon&tab=1). |
| altSize  | `'xs'\|'sm'\|'md'\|'lg'\|'xl'`                | `'md'`                                              | N        | Alternative text size.                                                    |
| radius   | `'none'\|'base'\|'xl'\|'2xl'\|'3xl'\|'full'`  | `'base'`                                            | N        | Border radius style.                                                      |
| size     | `'xs'\|'sm'\|'base'\|'md'\|'lg'\|'xl'\|'2xl'` | `'md'`                                              | N        | Avatar frame size.                                                        |
| imgSize  | `'s'\|'m'\|'l'`                               | `'l'`                                               | N        | Avatar image size.                                                        |
| line     | `'none'\|'solid'\|'dashed'\|'dotted'`         | `'none'`                                            | N        | Border style.                                                             |
| injClass | `string`                                      | `''`                                                | N        | Inject CSS class name.                                                    |

## Avatar Events

| Name    | Type         | Parameters | Description         |
| ------- | ------------ | ---------- | ------------------- |
| onclick | `() => void` | -          | Triggered on click. |

## Avatars Props

| Name      | Type                                          | Default   | Required | Description                                                                                |
| --------- | --------------------------------------------- | --------- | -------- | ------------------------------------------------------------------------------------------ |
| data      | `Avatar[]`                                    | `[]`      | N        | Avatar data array composed of Avatar Props.                                                |
| radius    | `'none'\|'base'\|'xl'\|'2xl'\|'3xl'\|'full'`  | `'full'`  | N        | Border radius style.                                                                       |
| size      | `'xs'\|'sm'\|'base'\|'md'\|'lg'\|'xl'\|'2xl'` | `'md'`    | N        | Avatar frame size.                                                                         |
| compact   | `number`                                      | `5`       | N        | Compactness level, larger value means more compact.                                        |
| lineWidth | `'0'\|'1'\|'2'\|'3'\|'4'\|'8'`                | `'3'`     | N        | Border width.                                                                              |
| reverse   | `boolean`                                     | `false`   | N        | Whether to reverse the order.                                                              |
| max       | `number`                                      | `10`      | N        | Maximum number of avatars to display.                                                      |
| top       | `'totle'\|'add'\|null\|Snippet`               | `'totle'` | N        | Top content, Note: type [Snippet](https://svelte.dev/docs/svelte/snippet#Typing-snippets). |
| injClass  | `string`                                      | `''`      | N        | Inject CSS class name.                                                                     |

## Avatars Events

| Name    | Type         | Parameters | Description                          |
| ------- | ------------ | ---------- | ------------------------------------ |
| onclick | `() => void` | -          | Triggered when avatar group clicked. |
