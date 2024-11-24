## NumKeyboard Props

| Name         | Type                                                                   | Default                        | Required | Description                                                                       |
| ------------ | ---------------------------------------------------------------------- | ------------------------------ | -------- | --------------------------------------------------------------------------------- |
| type         | `'button'`\|`'block'`                                                  | `'button'`                     | N        | Keyboard style type.                                                              |
| visible      | `boolean`                                                              | `false`                        | N        | Whether to show keyboard.                                                         |
| height       | `'8'`\|`'10'`\|`'12'`\|`'14'`\|`'16'`\|`'20'`                          | `'12'`                         | N        | Key height.                                                                       |
| space        | `'0'`\|`'1'`\|`'2'`\|`'3'`\|`'4'`                                      | `'2'`                          | N        | Key spacing.                                                                      |
| p            | `'0'`\|`'1'`\|`'2'`\|`'3'`\|`'4'`                                      | `'2'`                          | N        | Keyboard padding.                                                                 |
| reverse      | `boolean`                                                              | `false`                        | N        | Whether to reverse number order.                                                  |
| done         | `boolean`                                                              | `true`                         | N        | Whether to show done button.                                                      |
| dot          | `boolean`                                                              | `true`                         | N        | Whether to show decimal point.                                                    |
| close        | `boolean`                                                              | `false`                        | N        | Whether to show close button.                                                     |
| doneText     | `string`                                                               | Current language's common.done | N        | Done button text.                                                                 |
| doneDisabled | `boolean`                                                              | `false`                        | N        | Whether to disable done button.                                                   |
| radius       | `'none'`\|`'base'`\|`'md'`\|`'lg'`\|`'xl'`\|`'2xl'`\|`'3xl'`\|`'full'` | `'base'`                       | N        | Key border radius.                                                                |
| panelClass   | `string`                                                               | `''`                           | N        | Inject class for keyboard panel.                                                  |
| keyClass     | `string`                                                               | `''`                           | N        | Inject class for keys.                                                            |
| doneClass    | `string`                                                               | `''`                           | N        | Inject class for done button.                                                     |
| popup        | `Popup`                                                                | `{}`                           | N        | Popup parameters [Popup Props](https://stdf.design/#/components?nav=popup&tab=1). |

## NumKeyboard Events

| Name    | Type                                    | Parameters                                                   | Description                        |
| ------- | --------------------------------------- | ------------------------------------------------------------ | ---------------------------------- |
| onclick | `(numStr: string, key: string) => void` | numStr - Input number string<br />key - Clicked keyboard key | Triggered when any key is clicked. |
| onopen  | `(height: number) => void`              | height - Keyboard height                                     | Triggered when keyboard opens.     |
| onclose | `() => void`                            | -                                                            | Triggered when keyboard closes.    |
