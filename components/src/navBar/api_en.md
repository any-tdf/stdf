## NavBar Props

| Prop Name | Type    | Default Value                        | Available Values    | Required | Description                                                                                          |
| --------- | ------- | ------------------------------------ | ------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| title     | String  | navBar.title of the current language | -                   | Y        | The page title.                                                                                      |
| titleSlot | Boolean | false                                | true/false          | N        | Whether to use slot for the title area.                                                              |
| left      | String  | 'back'                               | 'back'/'customIcon' | N        | The content of the left side, which is 'back' by default. Choose 'customIcon' to set leftIcon value. |
| leftIcon  | Object  | {}                                   | Refer to Icon Props | N        | Custom icon for the left side, used when left is set to 'customIcon'.                                |
| leftSlot  | Boolean | false                                | true/false          | N        | Whether to use slot for the left content.                                                            |
| rights    | Array   | []                                   | Icon Props Array    | N        | The content of the right side, which is an array of Icon Props, suggested to not exceed three.       |
| rightSlot | Boolean | false                                | true/false          | N        | Whether to use slot for the right content.                                                           |
| line      | Boolean | true                                 | true/false          | N        | Whether to display the bottom divider.                                                               |
| injClass  | String  | ''                                   | Class               | N        | The injected CSS class name.                                                                         |
| love      | Boolean | false                                | true/false          | N        | Whether to enable the loving version.                                                                |

## NavBar Events

| Event Name | Parameters                                                           | Description                               |
| ---------- | -------------------------------------------------------------------- | ----------------------------------------- |
| clickleft  | -                                                                    | Triggered when the left icon is clicked.  |
| clickright | event: event object, detail represents the index of the clicked icon | Triggered when the right icon is clicked. |

## NavBar Slots

| Slot Name | Description                                                    |
| --------- | -------------------------------------------------------------- |
| title     | The content of the title area when titleSlot is set to 'true'. |
| left      | The content of the left side when leftSlot is set to 'true'.   |
| right     | The content of the right side when rightSlot is set to 'true'. |
