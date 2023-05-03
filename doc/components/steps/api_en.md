## Steps Props

| Property  | Type    | Default | Options                   | Required | Description                                    |
| --------- | ------- | ------- | ------------------------- | -------- | ---------------------------------------------- |
| steps     | Array   | []      | -                         | Y        | An array composed of step or finishStep Props. |
| current   | Number  | 1       | -                         | N        | The current step number.                       |
| radius    | String  | 'base'  | 'none'/'base'/'xl'/'full' | N        | The border radius style.                       |
| barBorder | Boolean | true    | true/false                | N        | Whether the icon has a border.                 |
| vertical  | Boolean | false   | true/false                | N        | Whether to use a vertical layout.              |

## step Props

| Property     | Type          | Default | Options          | Required | Description                        |
| ------------ | ------------- | ------- | ---------------- | -------- | ---------------------------------- |
| title        | String        | -       | -                | Y        | The title of step.                 |
| bar          | String/Object | -       | String/Object    | N        | The content of the step icon area. |
| desc         | String        | -       | -                | N        | The description of the step.       |
| injComponent | Component     | -       | Svelte Component | N        | The Svelte component.              |

## finishStep Props

The same as step Props, representing the parameters of completed steps.
