## Mask Props

| Property     | Type    | Default | Options                                       | Required | Description                                         |
| ------------ | ------- | ------- | --------------------------------------------- | -------- | --------------------------------------------------- |
| visible      | Boolean | false   | true/false                                    | N        | Whether to display the mask.                        |
| opacity      | Number  | 0.5     | 0-1                                           | N        | The opacity value of the mask.                      |
| duration     | Number  | 150     | -                                             | N        | The duration of the appearance animation, in ms.    |
| outDuration  | Number  | 0       | -                                             | N        | The duration of the disappearance animation, in ms. |
| inverse      | Boolean | false   | true/false                                    | N        | Whether to invert the background of the mask.       |
| clickable    | Boolean | false   | true/false                                    | N        | Whether the mask is clickable and penetrable.       |
| backdropBlur | String  | 'none'  | 'none'/'sm'/'base'/'md'/'lg'/'xl'/'2xl'/'3xl' | N        | The backdrop blur value of the mask.                |
| zIndex       | Number  | 500     | -                                             | N        | The zIndex value.                                   |

## Mask Events

| Name      | Parameters | Description                                                                                              |
| --------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| clickMask | -          | Triggered when the mask is clicked on. Note that it will not be triggered if `clickable` is set to true. |
