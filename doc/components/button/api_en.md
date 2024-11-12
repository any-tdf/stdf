## Button Props

| Name            | Type                                                                          | Default   | Required | Description                                                                        |
| --------------- | ----------------------------------------------------------------------------- | --------- | -------- | ---------------------------------------------------------------------------------- |
| fill            | `'base'\|'line'\|'lineLight'\|'lineTheme'\|'text'\|'textTheme'\|'colorLight'` | `'base'`  | N        | Fill mode.                                                                         |
| state           | `'theme'\|'success'\|'warning'\|'error'\|'info'`                              | `'theme'` | N        | Status color, theme means following theme color.                                   |
| radius          | `'none'\|'base'\|'xl'\|'2xl'\|'full'`                                         | `'base'`  | N        | Border radius style.                                                               |
| size            | `'full'\|'big'\|'md'\|'sm'\|'auto'`                                           | `'big'`   | N        | Size.                                                                              |
| line            | `'solid'\|'dashed'\|'dotted'`                                                 | `'solid'` | N        | Border style.                                                                      |
| heightOut       | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'2'`     | N        | Button outer height.                                                               |
| heightIn        | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'3'`     | N        | Button height.                                                                     |
| injClass        | `string`                                                                      | `''`      | N        | Inject CSS class name.                                                             |
| love            | `boolean`                                                                     | `false`   | N        | Whether to enable care version.                                                    |
| group           | `boolean`                                                                     | `false`   | N        | Whether to use button group.                                                       |
| disabled        | `boolean`                                                                     | `false`   | N        | Whether to disable.                                                                |
| customSize      | `boolean`                                                                     | `false`   | N        | Whether to use custom size.                                                        |
| customWidth     | `number`                                                                      | `0`       | N        | Custom width.                                                                      |
| customHeight    | `number`                                                                      | `0`       | N        | Custom height.                                                                     |
| icon            | `Icon\|null`                                                                  | `null`    | N        | Icon props [Icon Props](https://stdf.design/#/components?nav=icon&tab=1).          |
| loading         | `Loading\|null`                                                               | `null`    | N        | Loading props [Loading Props](https://stdf.design/#/components?nav=loading&tab=1). |
| disabledLoading | `boolean`                                                                     | `false`   | N        | Whether to disable when loading.                                                   |

## Button Events

| Name    | Type         | Parameters | Description         |
| ------- | ------------ | ---------- | ------------------- |
| onclick | `() => void` | -          | Triggered on click. |

## Button Snippets

| Name     | Description     |
| -------- | --------------- |
| children | Button content. |
