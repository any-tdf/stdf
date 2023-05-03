## Cell Props

| Property  | Type                                         | Default | Options                                       | Required | Description                              |
| --------- | -------------------------------------------- | ------- | --------------------------------------------- | -------- | ---------------------------------------- |
| title     | String                                       | ''      | -                                             | Y        | Title.                                   |
| detail    | String or Slot                               | ''      | Any character/'slot'                          | N        | Detail on the right side.                |
| left      | String or Icon Props or Slot                 | ''      | ''/Icon Props/'slot'                          | N        | The leftmost content.                    |
| right     | String or Icon Props or Switch Props or Slot | 'arrow' | 'none'/'arrow'/Switch Props/Icon Props/'slot' | N        | The content on the far right.            |
| subTitle  | String                                       | ''      | -                                             | N        | Secondary title on the left.             |
| info      | String                                       | ''      | -                                             | N        | Secondary information on the right.      |
| line      | Boolean                                      | false   | true/false                                    | N        | Whether to display bottom dividing line. |
| my        | String                                       | '4'     | '0'/'1'/'2'/'3'/'4'/'6'/'8'                   | N        | Top and bottom margin.                   |
| mx        | String                                       | '2'     | '0'/'1'/'2'/'3'/'4'/'6'/'8'                   | N        | Left and right margin.                   |
| radius    | String                                       | 'lg'    | 'none'/'base'/'md'/'lg'/'xl'/'2xl'/'full'     | N        | Rounded style.                           |
| shadow    | String                                       | 'sm'    | 'none'/'sm'/'base'/'md'/'lg'/'xl'/'2xl'       | N        | Shadow style.                            |
| switcheck | Boolean                                      | false   | true/false                                    | N        | Switch status.                           |
| injClass  | String                                       | ''      | Class                                         | N        | Inject CSS name.                         |
| love      | Boolean                                      | false   | true/false                                    | N        | Whether to enable the Loving version.    |

## Cell Events

| Name  | Parameters | Description         |
| ----- | ---------- | ------------------- |
| click | -          | Triggered on click. |

## Cell Slots

| Name   | Description                   |
| ------ | ----------------------------- |
| left   | The leftmost content.         |
| right  | The content on the far right. |
| detail | Detail content.               |

## CellGroup Props

| Property | Type   | Default | Options                                   | Required | Description            |
| -------- | ------ | ------- | ----------------------------------------- | -------- | ---------------------- |
| my       | String | '4'     | '0'/'1'/'2'/'3'/'4'/'6'/'8'               | N        | Top and bottom margin. |
| mx       | String | '2'     | '0'/'1'/'2'/'3'/'4'/'6'/'8'               | N        | Left and right margin. |
| radius   | String | 'lg'    | 'none'/'base'/'md'/'lg'/'xl'/'2xl'/'full' | N        | Rounded style.         |
| shadow   | String | 'sm'    | 'none'/'sm'/'base'/'md'/'lg'/'xl'/'2xl'   | N        | Shadow style.          |

## CellGroup Slots

| Name | Description                                  |
| ---- | -------------------------------------------- |
| -    | The content of Cell Group, typically plural. |
