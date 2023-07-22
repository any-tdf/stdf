## Swiper Props

| Prop Name           | Type    | Default Value | Optional Values                        | Required | Description                                                           |
| ------------------- | ------- | ------------- | -------------------------------------- | -------- | --------------------------------------------------------------------- |
| data                | Array   | []            | -                                      | Y        | The data to be rendered.                                              |
| interval            | Number  | 4             | -                                      | N        | Time interval (in seconds).                                           |
| duration            | Number  | 1000          | -                                      | N        | Transition duration (in milliseconds).                                |
| autoplay            | Boolean | true          | true/false                             | N        | Whether to enable automatic playback.                                 |
| lazyplay            | Boolean | true          | true/false                             | N        | Whether to enable lazy loading.                                       |
| initActive          | Number  | 0             | -                                      | N        | Initial active index.                                                 |
| indicatePosition    | String  | 'inner'       | 'inner'/'out'/'none'                   | N        | Indicator position.                                                   |
| indicateAlign       | String  | 'center'      | 'start'/'center'/'end'                 | N        | Indicator alignment.                                                  |
| indicateStyle       | String  | 'pointLine'   | 'point'/'line'/'pointLine'/'longLine'  | N        | Indicator style.                                                      |
| indicateRadius      | Boolean | true          | true/false                             | N        | Whether the indicator has rounded corners.                            |
| indicateInjClass    | String  | '''           | Class                                  | N        | Additional class for the indicator.                                   |
| indicateColor       | String  | '''           | Class                                  | N        | Indicator color.                                                      |
| indicateActiveColor | String  | '''           | Class                                  | N        | Active indicator color.                                               |
| aspectRatio         | Array   | [16, 9]       | -                                      | N        | Container aspect ratio.                                               |
| containerWidth      | Number  | 0             | -                                      | N        | Container width.                                                      |
| px                  | String  | ’0‘           | '0'/'1'/'2'/'4'/'6'/'8'/'12'/'16'/'24' | N        | Horizontal padding of the container.                                  |
| py                  | String  | '0'           | '0'/'1'/'2'/'4'/'6'/'8'/'12'           | N        | Vertical padding of the container.                                    |
| translateX          | Number  | 0             | -                                      | N        | X-axis offset value for inactive containers.                          |
| translateZ          | Number  | 0             | -                                      | N        | Z-axis offset value for inactive containers.                          |
| rotateX             | Number  | 0             | -                                      | N        | X-axis rotation value for inactive containers.                        |
| rotateY             | Number  | 0             | -                                      | N        | Y-axis rotation value for inactive containers.                        |
| rotateZ             | Number  | 0             | -                                      | N        | Z-axis rotation value for inactive containers.                        |
| activeInjClass      | String  | ’‘            | Class                                  | N        | Additional class for active container.                                |
| notActiveInjClass   | String  | ’‘            | Class                                  | N        | Additional class for inactive containers.                             |
| radius              | String  | 'none'        | 'none'/'base'/'xl'/'2xl'/'full'        | N        | Container inner radius.                                               |
| triggerLong         | Number  | 30            | 0-100                                  | N        | Percentage of sliding distance that always triggers the slide switch. |
| notTriggerLong      | Number  | 10            | 0-100                                  | N        | Percentage of sliding distance that never triggers the slide switch.  |
| triggerSpeed        | Number  | 0.5           | 0-1                                    | N        | Touch move speed coefficient.                                         |
| innerInjClass       | String  | ’‘            | Class                                  | N        | Additional class for elements inside the container.                   |

## Swiper Events

| Event Name | Parameters                                                                             | Description                                            |
| ---------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| clickimg   | event: The event object detail representing the index of the clicked container.        | Triggered when an image inside a container is clicked. |
| change     | event: The event object detail representing the index of the current active container. | Triggered when the current active container changes.   |
