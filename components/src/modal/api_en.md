## Modal Props

| Property    | Type    | Default                           | Available Values            | Required | Description                     |
| ----------- | ------- | --------------------------------- | --------------------------- | -------- | ------------------------------- |
| visible     | Boolean | false                             | true / false                | N        | Whether the modal is visible    |
| title       | String  | modal.title in current language   | -                           | N        | The title of the modal          |
| titleAlign  | String  | 'center'                          | 'left' / 'center' / 'right' | N        | The alignment of the title      |
| content     | String  | modal.content in current language | -                           | N        | The content of the modal        |
| contentSlot | Boolean | false                             | true / false                | N        | Whether the content uses a slot |
| showIcon    | Boolean | false                             | true / false                | N        | Whether to show the icon        |
| icon        | Object  | {}                                | Refer to Icon Props         | N        | The param of the icon           |
| showBtn     | Boolean | true                              | true / false                | N        | Whether to show the button      |
| btnText     | String  | modal.btnText in current language | -                           | N        | The text on the button          |
| button      | Object  | {}                                | Refer to Button Props       | N        | The param of the button         |
| popup       | Object  | {}                                | Refer to Popup Props        | N        | The param of the popup          |

## Modal Events

| Event Name | Parameters | Description                     |
| ---------- | ---------- | ------------------------------- |
| open       | -          | Triggered when the modal opens  |
| close      | -          | Triggered when the modal closes |

## Modal Slots

| Slot Name | Description                                          |
| --------- | ---------------------------------------------------- |
| -         | The content of `content` when `contentSlot` is true. |
