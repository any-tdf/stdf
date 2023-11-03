## Avatar Props

| Properties | Type   | Default value                                     | Optional value                        | required | Description                                  |
| ---------- | ------ | ------------------------------------------------- | ------------------------------------- | -------- | -------------------------------------------- |
| image      | String | ''                                                | -                                     | N        | Picture path.                                |
| alt        | String | ''                                                | -                                     | N        | Replace the text, it is recommended to word. |
| icon       | Object | { name: 'ri-user-3-line', theme: true, size: 32 } | Icon Props                            | N        | Replace the icon and pass in Icon Props.     |
| altSize    | String | 'md'                                              | 'xs'/'sm'/'md'/'lg'/'xl'              | N        | Replace the text size.                       |
| radius     | String | 'base'                                            | 'none'/'base'/'xl'/'2xl'/'3xl'/'full' | N        | Round -corner style.                         |
| size       | String | 'md'                                              | 'xs'/'sm'/'md'/'lg'/'xl'              | N        | The size of the avatar box.                  |
| imgSize    | String | 'l'                                               | 's'/'m'/'l'                           | N        | Avatar picture size.                         |
| line       | String | 'none'                                            | 'none'/'solid'/'dashed'/'dotted'      | N        | Border style.                                |
| injClass   | String | ''                                                | Class                                 | N        | Inject the CSS name.                         |

## Avatar Events

| Name  | Parameter | Description       |
| ----- | --------- | ----------------- |
| click | -         | Click to trigger. |

## Avatars Props

| Properties | Type    | Default value | Optional value                        | required | Description                               |
| ---------- | ------- | ------------- | ------------------------------------- | -------- | ----------------------------------------- |
| data       | Array   | []            | -                                     | N        | The avatar data composed of Avatar Props. |
| radius     | String  | 'full'        | 'none'/'base'/'xl'/'2xl'/'3xl'/'full' | N        | Round -corner style.                      |
| size       | String  | 'md'          | 'xs'/'sm'/'base'/'md'/'lg'/'xl'       | N        | The size of the avatar box.               |
| compact    | Number  | 5             | 1-10                                  | N        | Compactness, the larger the more compact. |
| lineWidth  | String  | 3             | '0'/'1'/'2'/'3'/'4'/'8'               | N        | Border thickness.                         |
| reverse    | Boolean | false         | true/false                            | N        | Whether to reverse.                       |
| max        | Number  | 10            | -                                     | N        | Maximum maximum display quantity.         |
| top        | String  | 0             | 'totle'/'add'/'none'/Slot             | N        | Top content.                              |
| injClass   | String  | ''            | Class                                 | N        | Inject the CSS name.                      |

## Avatars Events

| Name       | Parameter | Description                    |
| ---------- | --------- | ------------------------------ |
| clickgroup | -         | Click avatar group to trigger. |
