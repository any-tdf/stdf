## Avatar Props

| Properties | Type   | Default value                                     | Optional value                        | required | Description                                  |
| ---------- | ------ | ------------------------------------------------- | ------------------------------------- | ----------- | -------------------------------------------- |
| image      | String | ''                                                | -                                     | N           | Picture path.                                |
| alt        | String | ''                                                | -                                     | N           | Replace the text, it is recommended to word. |
| icon       | Object | { name: 'ri-user-3-line', theme: true, size: 32 } | Icon Props                            | N           | Replace the icon and pass in Icon Props.     |
| altSize    | String | 'md'                                              | 'xs'/'sm'/'md'/'lg'/'xl'              | N           | Replace the text size.                       |
| radius     | String | 'base'                                            | 'none'/'base'/'xl'/'2xl'/'3xl'/'full' | N           | Round -corner style.                         |
| size       | String | 'md'                                              | 'xs'/'sm'/'md'/'lg'/'xl'              | N           | The size of the avatar box.                  |
| imgSize    | String | 'l'                                               | 's'/'m'/'l'                           | N           | Avatar picture size.                         |
| line       | String | 'none'                                            | 'none'/'solid'/'dashed'/'dotted'      | N           | Border style.                                |
| injClass   | String | ''                                                | Class                                 | N           | Inject the CSS name.                         |

## Avatar Events

| Name  | Parameter | Description       |
| ----- | --------- | ----------------- |
| click | -         | Click to trigger. |
