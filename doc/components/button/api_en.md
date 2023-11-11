## Button Props

| property     | type    | default value | optional value                               | required | description                                       |
| ------------ | ------- | ------------- | -------------------------------------------- | -------- | ------------------------------------------------- |
| fill         | String  | 'base'        | base/line/lineLight/lineTheme/text/textTheme | N        | fill mode.                                        |
| state        | String  | 'theme'       | theme/success/warning/error/info             | N        | Status color, theme means follow the theme color. |
| radius       | String  | 'base'        | none/base/xl/2xl/full                        | N        | Rounded corner style.                             |
| size         | String  | 'big'         | full/big/md/sm/auto                          | N        | size.                                             |
| line         | String  | 'solid'       | solid/dashed/dotted                          | N        | border style.                                     |
| heightOut    | String  | '2'           | '0'/'1'/'2'/'4'                              | N        | Button outer height.                              |
| heightIn     | String  | '3'           | '0'/'1'/'2'/'4'                              | N        | Button height.                                    |
| injClass     | String  | ''            | Class                                        | N        | Inject CSS name.                                  |
| love         | Boolean | false         | true/false                                   | N        | Whether to open the love version.                 |
| group        | Boolean | false         | true/false                                   | N        | Whether to use a button group.                    |
| disabled     | Boolean | false         | true/false                                   | N        | Whether to disable.                               |
| customSize   | Boolean | false         | true/false                                   | N        | Whether to customize the size.                    |
| customWidth  | Number  | 0             | -                                            | N        | Customize the width.                              |
| customHeight | Number  | 0             | -                                            | N        | Customize the height.                             |

## Button Events

| Name  | Parameters | Description       |
| ----- | ---------- | ----------------- |
| click | -          | Click to trigger. |

## Button Slots

| Name | Description     |
| ---- | --------------- |
| -    | Button content. |
