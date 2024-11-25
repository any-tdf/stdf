## Input Props

| Name              | Type                                                                                                      | Default   | Required | Description                       |
| ----------------- | --------------------------------------------------------------------------------------------------------- | --------- | -------- | --------------------------------- |
| title             | `string`                                                                                                  | `''`      | N        | Title content.                    |
| titlePosition     | `'in'\|'out'\|null`                                                                                       | `'out'`   | N        | Title position.                   |
| inputPosition     | `'left'\|'right'`                                                                                         | `'left'`  | N        | Input text position.              |
| placeholder       | `string`                                                                                                  | `''`      | N        | Input placeholder text.           |
| radius            | `'none'\|'base'\|'xl'\|'full'`                                                                            | `'base'`  | N        | Border radius style.              |
| inputStyle        | `'block'\|'line'`                                                                                         | `'block'` | N        | Input box style.                  |
| lineTransition    | `string`                                                                                                  | `'none'`  | N        | Linear transition position.       |
| duration          | `'fast'\|'base'\|'slow'\|'slower'`                                                                        | `'base'`  | N        | Transition duration.              |
| autocomplete      | `boolean`                                                                                                 | `true`    | N        | Whether to enable autocomplete.   |
| py                | `'0'\|'0.5'\|'1'\|'2'\|'3'\|'4'\|'6'`                                                                     | `'2'`     | N        | Vertical padding.                 |
| disabled          | `boolean`                                                                                                 | `false`   | N        | Whether disabled.                 |
| state             | `'theme'\|'success'\|'warning'\|'error'\|'info'`                                                          | `'theme'` | N        | State.                            |
| type              | `'text'\|'decimal'\|'email'\|'none'\|'numeric'\|'search'\|'tel'\|'url'\|'password'\|'number'\|'textarea'` | `'text'`  | N        | Input type.                       |
| inputmode         | `'text'\|'decimal'\|'email'\|'none'\|'numeric'\|'search'\|'tel'\|'url'\|''`                               | `''`      | N        | Specify input data type.          |
| maxlength         | `number`                                                                                                  | `24`      | N        | Maximum input text length.        |
| textareaMaxlength | `number`                                                                                                  | `200`     | N        | Maximum text length for textarea. |
| rows              | `number`                                                                                                  | `2`       | N        | Number of rows for textarea.      |
| autosize          | `boolean`                                                                                                 | `false`   | N        | Auto adjust height for textarea.  |
| label1            | [`Icon`](https://stdf.design/#/components?nav=icon&tab=1)\|`null`                                         | `null`    | N        | Label 1 content.                  |
| label2            | `string\|null`                                                                                            | `null`    | N        | Label 2 content.                  |
| label3            | [`Icon`](https://stdf.design/#/components?nav=icon&tab=1)\|`null`                                         | `null`    | N        | Label 3 content.                  |
| label4            | [`Icon`](https://stdf.design/#/components?nav=icon&tab=1)\|`null`                                         | `null`    | N        | Label 4 content.                  |
| label5            | `string\|null`                                                                                            | `null`    | N        | Label 5 content.                  |
| label6            | [`Icon`](https://stdf.design/#/components?nav=icon&tab=1)\|`null`                                         | `null`    | N        | Label 6 content.                  |
| tip               | `string\|null`                                                                                            | `null`    | N        | Tip message content.              |
| data1             | `string\|null`                                                                                            | `null`    | N        | Data item 1 content.              |
| data2             | `string\|null`                                                                                            | `null`    | N        | Data item 2 content.              |
| data3             | `string\|null`                                                                                            | `null`    | N        | Data item 3 content.              |
| value             | `string`                                                                                                  | `''`      | N        | Input value.                      |
| clear             | `boolean`                                                                                                 | `false`   | N        | Whether clearable.                |

## Input Events

| Name          | Type                      | Parameters            | Description                             |
| ------------- | ------------------------- | --------------------- | --------------------------------------- |
| onfocus       | `(value: string) => void` | value - current value | Triggered when input gets focus.        |
| onblur        | `(value: string) => void` | value - current value | Triggered when input loses focus.       |
| onchange      | `(value: string) => void` | value - current value | Triggered when input value changes.     |
| onclear       | `() => void`              | -                     | Triggered when clear button is clicked. |
| onclickLabel1 | `() => void`              | -                     | Triggered when Label 1 is clicked.      |
| onclickLabel2 | `() => void`              | -                     | Triggered when Label 2 is clicked.      |
| onclickLabel3 | `() => void`              | -                     | Triggered when Label 3 is clicked.      |
| onclickLabel4 | `() => void`              | -                     | Triggered when Label 4 is clicked.      |
| onclickLabel5 | `() => void`              | -                     | Triggered when Label 5 is clicked.      |
| onclickLabel6 | `() => void`              | -                     | Triggered when Label 6 is clicked.      |
| onkeydown     | `(key: string) => void`   | key - pressed key     | Triggered when keyboard key is pressed. |

## Input Snippets

| Name        | Type                                                                | Parameters | Description               |
| ----------- | ------------------------------------------------------------------- | ---------- | ------------------------- |
| titleChild  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Title slot content.       |
| data1Child  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Data item 1 slot content. |
| data2Child  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Data item 2 slot content. |
| data3Child  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Data item 3 slot content. |
| label1Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 1 slot content.     |
| label2Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 2 slot content.     |
| label3Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 3 slot content.     |
| label4Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 4 slot content.     |
| label5Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 5 slot content.     |
| label6Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 6 slot content.     |
| tipChild    | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Tip message slot content. |
