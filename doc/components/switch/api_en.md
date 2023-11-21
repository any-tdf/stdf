## Switch Props

| Prop Name | Type         | Default | Options                           | Required | Description                                                        |
| --------- | ------------ | ------- | --------------------------------- | -------- | ------------------------------------------------------------------ |
| check     | Boolean      | false   | true/false                        | No       | Switch status.                                                     |
| radius    | String       | 'base'  | 'full'/'base'/'none'              | No       | Corner style.                                                      |
| inside    | Array/String | []      | Array/'state'/'loading'/'slot'/'' | No       | Switch internal content.                                           |
| injClass  | String       | ''      | Class                             | No       | Inject CSS class names.                                            |
| disabled  | Boolean      | false   | true/false                        | No       | Whether disabled.                                                  |
| async     | Boolean      | false   | true/false                        | No       | Whether asynchronous.                                              |
| loading   | Object       | {}      | Refer to Loading Props            | No       | Loading component parameters, only valid when inside is 'loading'. |

## Switch Events

| Name   | Parameters                                                               | Description                           |
| ------ | ------------------------------------------------------------------------ | ------------------------------------- |
| click  | -                                                                        | Triggered when clicked.               |
| change | event: Event object, with `detail` indicating the current switch status. | Triggered when switch status changes. |

## Switch Slots

| Name  | Description                                            |
| ----- | ------------------------------------------------------ |
| true  | Switch internal content when the switch status is on.  |
| false | Switch internal content when the switch status is off. |
