## Icon Props

| Properties | Type        | Default value      | Optional value        | required | Description                                                           |
| ---------- | ----------- | ------------------ | --------------------- | -------- | --------------------------------------------------------------------- |
| name       | String/slot | ''                 | SVG Sprites name/slot | Y        | Icon name.                                                            |
| size       | Number      | 24                 | -                     | N        | Icon size.                                                            |
| theme      | Boolean     | false              | true/false            | N        | Whether to follow the theme color (including bright and dark colors). |
| alpha      | Number      | 1                  | 0 - 1                 | N        | Icon transparency.                                                    |
| top        | Number      | -2                 | -                     | N        | Disposal up and down.                                                 |
| injClass   | String      | ''                 | Class                 | N        | Inject the CSS name.                                                  |
| path       | String      | 'fonts/symbol.svg' | -                     | N        | The project stores the path of symbol.svg.                            |

## Icon Events

| Name  | Parameter | Description       |
| ----- | --------- | ----------------- |
| click | -         | Click to trigger. |

## Icon Slots

| Name | Description |
| ---- | ----------- |
| -    | Custom SVG. |
