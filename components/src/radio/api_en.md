Translation:

## RadioGroup Props

| Property   | Type    | Default | Options    | Required | Description                                                            |
| ---------- | ------- | ------- | ---------- | -------- | ---------------------------------------------------------------------- |
| value      | String  | ''      | -          | Y        | The selected value, corresponding to the name property of Radio Props. |
| horizontal | Boolean | false   | true/false | N        | Whether to display the radio buttons horizontally.                     |

## RadioGroup Events

| Event Name | Event Parameter                                                                     | Description                                                                                     |
| ---------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| change     | event: event object, where detail represents the name of the selected radio button. | Triggered when a radio button is clicked (when the value property of RadioGroup Props changes). |

## RadioGroup Slots

| Name | Description                                                             |
| ---- | ----------------------------------------------------------------------- |
| -    | The RadioGroup internal slot generally includes multiple radio buttons. |

## Radio Props

| Property     | Type          | Default   | Options                     | Required | Description                                                              |
| ------------ | ------------- | --------- | --------------------------- | -------- | ------------------------------------------------------------------------ |
| name         | String        | ''        | -                           | Y        | The identifier, corresponding to the value property of RadioGroup Props. |
| textPosition | String        | 'r'       | 't'/'b'/'l'/'r'             | N        | The position of the option content area.                                 |
| icon         | String/Object | 'default' | 'default'/'none'/Icon Props | N        | The content of the unchecked option icon area.                           |
| iconChecked  | String/Object | 'default' | 'default'/'none'/Icon Props | N        | The content of the checked option icon area.                             |

## Radio Slots

| Name | Description     |
| ---- | --------------- |
| -    | Option content. |
