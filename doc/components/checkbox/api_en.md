## CheckboxGroup Props

| Property | Type   | Default | Options          | Required | Description                                                                  |
| -------- | ------ | ------- | ---------------- | -------- | ---------------------------------------------------------------------------- |
| layout   | String | 'v'     | 'v'/'h'/'inline' | No       | The arrangement of the checkboxes, v-vertical, h-horizontal, inline-in line. |

## CheckboxGroup Events

| Event  | Parameters                                                                                                         | Description                           |
| ------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| change | event: the event object, including the detail property which represents an array of selected checkbox identifiers. | Triggered when a checkbox is clicked. |

## CheckboxGroup Slots

| Name | Description                                                                |
| ---- | -------------------------------------------------------------------------- |
| -    | The interior slot of CheckboxGroup generally contains multiple Checkboxes. |

## Checkbox Props

| Property     | Type          | Default   | Options                     | Required | Description                                                         |
| ------------ | ------------- | --------- | --------------------------- | -------- | ------------------------------------------------------------------- |
| name         | String        | ''        | -                           | Y        | Identifier.                                                         |
| checkeds     | Array         | []        | -                           | N        | An array of selected checkbox identifiers within the CheckboxGroup. |
| textPosition | String        | 'r'       | 't'/'b'/'l'/'r'             | N        | The position of the option content area.                            |
| icon         | String/Object | 'default' | 'default'/'none'/Icon Props | N        | The content of the unselected option icon area.                     |
| iconChecked  | String/Object | 'default' | 'default'/'none'/Icon Props | N        | The content of the selected option icon area.                       |
| outControl   | Boolean       | false     | true/false                  | N        | Whether the selection state is controlled externally.               |

## Checkbox Slots

| Name | Description          |
| ---- | -------------------- |
| -    | Option content area. |
