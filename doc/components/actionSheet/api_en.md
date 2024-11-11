## ActionSheet Props

| Name           | Type                        | Default                                 | Required | Description                                                                             |
| -------------- | --------------------------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------- |
| visible        | `boolean`                   | `false`                                 | N        | Whether to show the action sheet.                                                       |
| title          | `string`                    | `''`                                    | N        | Title text.                                                                             |
| titleAlign     | `'left'\|'center'\|'right'` | `'center'`                              | N        | Title alignment.                                                                        |
| actions        | `Action[]`                  | `[]`                                    | N        | Menu options array composed of Action Props.                                            |
| popup          | `Popup`                     | `{}`                                    | N        | Popup layer parameters [Popup Props](https://stdf.design/#/components?nav=popup&tab=1). |
| showCancel     | `boolean`                   | `false`                                 | N        | Whether to show cancel button.                                                          |
| cancelText     | `string`                    | Current language actionSheet.cancelText | N        | Cancel button text.                                                                     |
| actionClosable | `boolean`                   | `true`                                  | N        | Whether to close when clicking an option.                                               |
| align          | `'left'\|'center'\|'right'` | `'center'`                              | N        | Content alignment.                                                                      |

## ActionSheet Events

| Name          | Type                                      | Parameters                                      | Description                                                           |
| ------------- | ----------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| onclose       | `() => void`                              | -                                               | Triggered when closing.                                               |
| oncancel      | `() => void`                              | -                                               | Triggered when clicking cancel button.                                |
| onclickAction | `(index: number, action: Action) => void` | index - Click index; action - Click option data | Triggered when clicking an option, even if the option does not close. |

## Action Props

| Name      | Type                                      | Default    | Required | Description            |
| --------- | ----------------------------------------- | ---------- | -------- | ---------------------- |
| content   | `string`                                  | `''`       | Y        | Option content.        |
| style     | `'normal'\|'theme'\|'danger'\|'disabled'` | `'normal'` | N        | Option style.          |
| desc      | `string`                                  | `''`       | N        | Option description.    |
| showImg   | `boolean`                                 | `false`    | N        | Whether to show image. |
| imgRadius | `'none'\|'base'\|'full'\|'lg'`            | `'full'`   | N        | Image border radius.   |
| imgSrc    | `string`                                  | `''`       | N        | Image source URL.      |
