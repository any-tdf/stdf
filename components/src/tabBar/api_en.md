## TabBar Props

| Prop Name         | Type    | Default | Options    | Required | Description                                                  |
| ----------------- | ------- | ------- | ---------- | -------- | ------------------------------------------------------------ |
| labels            | Array   | []      | -          | Yes      | TabBar content group, composed of text and Icon Props.       |
| active            | Number  | 0       | -          | No       | Active Tab index value.                                      |
| line              | Boolean | false   | true/false | No       | Whether to show a line at the bottom.                        |
| lineW             | Number  | 4       | -          | No       | The proportion of the line width to the current Tab width.   |
| love              | Boolean | false   | true/false | No       | Whether to enable the caring version.                        |
| injClass          | String  | ''      | -          | No       | Inject CSS class names into the outermost element of TabBar. |
| tabInjClass       | String  | ''      | -          | No       | Inject CSS class names into a single Tab.                    |
| activeTabInjClass | String  | ''      | -          | No       | Inject CSS class names into the active Tab.                  |
| activeInjClass    | String  | ''      | -          | No       | Inject CSS class names into the bottom line.                 |

## TabBar Events

| Name   | Parameters                                                                   | Description                       |
| ------ | ---------------------------------------------------------------------------- | --------------------------------- |
| change | event: Event object, with `detail` indicating the active TabBar index value. | Triggered when TabBar is clicked. |
