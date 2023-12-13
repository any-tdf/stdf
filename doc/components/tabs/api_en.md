## Tabs Props

| Prop Name  | Type    | Default | Options                       | Required | Description                                                         |
| ---------- | ------- | ------- | ----------------------------- | -------- | ------------------------------------------------------------------- |
| tab        | Object  | {}      | Tab Props                     | Yes      | Pass in the Tab Props, which applies to the internal Tab component. |
| active     | Number  | 0       | -                             | No       | Index value of the active Tab.                                      |
| duration   | String  | 'base'  | 'fast'/'base'/'slow'/'slower' | No       | Transition animation speed.                                         |
| position   | String  | 't'     | 't'/'b'/'l'/'r'               | No       | Tab position corresponds to duration in Tab Props.                  |
| transition | Boolean | true    | true/false                    | No       | Whether to use transition animations.                               |

## Tabs Events

| Name   | Parameters                                                                       | Description                            |
| ------ | -------------------------------------------------------------------------------- | -------------------------------------- |
| change | event: Event object, with `detail` indicating the index value of the active Tab. | Triggered when the active Tab changes. |

## Tabs Slots

| Name | Description           |
| ---- | --------------------- |
| -    | Main content of Tabs. |

## Tab Props

| Prop Name         | Type    | Default | Options                                    | Required | Description                                                             |
| ----------------- | ------- | ------- | ------------------------------------------ | -------- | ----------------------------------------------------------------------- |
| labels            | Array   | []      | -                                          | Yes      | An array of tab content, consisting of text and Icon Props.             |
| active            | Number  | 0       | -                                          | No       | Index value of the active Tab.                                          |
| lineType          | Boolean | false   | true/false                                 | No       | Whether to use linear style.                                            |
| radius            | String  | 'base'  | 'none'/'base'/'xl'/'full'                  | No       | Corner style.                                                           |
| mx                | String  | '2'     | '0'/'1'/'2'/'3'/'4'/'6'/'8'/'12'/'16'/'20' | No       | Horizontal margin.                                                      |
| duration          | String  | 'base'  | 'fast'/'base'/'slow'/'slower'              | No       | Transition animation speed.                                             |
| layout            | String  | 'h'     | 'h'/'v'                                    | No       | Horizontal or vertical layout, corresponding to position in Tabs Props. |
| love              | Boolean | false   | true/false                                 | No       | Whether to enable Love Edition.                                         |
| injClass          | String  | ''      | -                                          | No       | Inject CSS to wrap the Tabs.                                            |
| tabInjClass       | String  | ''      | -                                          | No       | Inject CSS for individual Tabs.                                         |
| activeTabInjClass | String  | ''      | -                                          | No       | Inject CSS for active Tab.                                              |
| activeInjClass    | String  | ''      | -                                          | No       | Inject CSS for indicator.                                               |
| overflow          | Boolean | false   | true/false                                 | No       | Whether to enable overflow hiding.                                      |
| showNum           | Number  | 3       | -                                          | No       | When overflow hiding is enabled, the number of Tabs to be displayed.    |
| autoScroll        | Boolean | false   | true/false                                 | No       | Whether to enable automatic scrolling when overflow hiding is enabled.  |

## Tab Events

| Name     | Parameters                                                                       | Description                      |
| -------- | -------------------------------------------------------------------------------- | -------------------------------- |
| clicktab | event: Event object, with `detail` indicating the index value of the active Tab. | Triggered when a Tab is clicked. |

## TabContent Props

| Prop Name | Type    | Default | Options    | Required | Description              |
| --------- | ------- | ------- | ---------- | -------- | ------------------------ |
| show      | Boolean | true    | true/false | No       | Whether to show content. |

## TabContent Slots

| Name | Description                |
| ---- | -------------------------- |
| -    | Content of the TabContent. |
