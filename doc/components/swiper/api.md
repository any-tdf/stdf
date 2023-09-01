## Swiper Props

| 属性                | 类型    | 默认值      | 可选值                                 | 必传 | 说明                         |
| ------------------- | ------- | ----------- | -------------------------------------- | ---- | ---------------------------- |
| data                | Array   | []          | -                                      | Y    | 数据。                       |
| interval            | Number  | 4           | -                                      | N    | 间隔时间（秒）。             |
| duration            | Number  | 1000        | -                                      | N    | 过渡时间（毫秒）。           |
| autoplay            | Boolean | true        | true/false                             | N    | 是否自动播放。               |
| lazyplay            | Boolean | true        | true/false                             | N    | 是否懒轮播。                 |
| initActive          | Number  | 0           | -                                      | N    | 初始激活索引。               |
| indicatePosition    | String  | 'inner'     | 'inner'/'out'/'none'                   | N    | 指示器位置。                 |
| indicateAlign       | String  | 'center'    | 'start'/'center'/'end'                 | N    | 指示器对齐方式。             |
| indicateStyle       | String  | 'pointLine' | 'point'/'line'/'pointLine'/'longLine'  | N    | 指示器样式。                 |
| indicateRadius      | Boolean | true        | true/false                             | N    | 指示器是否圆角。             |
| indicateInjClass    | String  | '''         | Class                                  | N    | 指示器注入 Class。           |
| indicateColor       | String  | '''         | Class                                  | N    | 指示器颜色。                 |
| indicateActiveColor | String  | '''         | Class                                  | N    | 指示器激活颜色。             |
| aspectRatio         | Array   | [16, 9]     | -                                      | N    | 容器宽高比。                 |
| containerWidth      | Number  | 0           | -                                      | N    | 容器宽度。                   |
| px                  | String  | ’0‘         | '0'/'1'/'2'/'4'/'6'/'8'/'12'/'16'/'24' | N    | 容器横向内边距。             |
| py                  | String  | '0'         | '0'/'1'/'2'/'4'/'6'/'8'/'12'           | N    | 容器纵向内边距。             |
| translateX          | Number  | 0           | -                                      | N    | 未激活容器 X 方向偏移值。    |
| translateZ          | Number  | 0           | -                                      | N    | 未激活容器 Z 方向偏移值 。   |
| rotateX             | Number  | 0           | -                                      | N    | 未激活容器 X 轴旋转值。      |
| rotateY             | Number  | 0           | -                                      | N    | 未激活容器 Y 轴旋转值。      |
| rotateZ             | Number  | 0           | -                                      | N    | 未激活容器 Z 轴旋转值。      |
| activeInjClass      | String  | ’‘          | Class                                  | N    | 激活容器注入 Class。         |
| notActiveInjClass   | String  | ’‘          | Class                                  | N    | 未激活容器注入 Class。       |
| radius              | String  | 'none'      | 'none'/'base'/'xl'/'2xl'/'full'        | N    | 容器内部区域圆角。           |
| triggerLong         | Number  | 30          | 0-100                                  | N    | 始终触发的滑动距离百分比。   |
| notTriggerLong      | Number  | 10          | 0-100                                  | N    | 始终不触发的滑动距离百分比。 |
| triggerSpeed        | Number  | 0.5         | 0-1                                    | N    | 触发的滑动速度系数。         |
| innerInjClass       | String  | ’‘          | Class                                  | N    | 容器内部元素注入 Class。     |

## Swiper Events

| 名称     | 参数                                              | 描述                     |
| -------- | ------------------------------------------------- | ------------------------ |
| clickimg | event：事件对象，其中 detail 表示点击容器索引值。 | 点击容器内图片时触发。   |
| change   | event：事件对象，其中 detail 表示当前容器索引值。 | 当前激活容器变化时触发。 |
