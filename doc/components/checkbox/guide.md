## 说明

由于移动端横向显示内容有限，CheckboxGroup 默认为纵向布局，横向布局建议只用作简单使用。当选项较多、内容较长或显示内容较多时建议使用纵向布局，当 Checkbox 被点击时，CheckboxGroup 通过 change 事件，可以获取到当前所有选定 Checkbox 的 name 组成的数组。

## icon && iconChecked

Checkbox Props 的 icon 默认值 'default' 会按照 Remix Icon 的 ri-checkbox-line 以 Icon 组件形式渲染；传入字符 'none'，表示未选中选项图标区域不显示内容；也可以传入 Icon Props，未选中选项图标区域将会以传入的参数以 Icon 组件形式渲染。

iconChecked 与 icon 逻辑一样，对应的是选中选项的图标区域内容。

## Checkbox Slots

Checkbox 的插槽将会渲染在每条 Checkbox 的内容区域，可结合 CheckboxGroup change 事件获取到的 checkeds，自由设计选中与未选中的效果。

注：虽然有 Tailwind 写样式比较方便，但过多的自定义将会失去使用组件库的意义。

## 点击区域优化

为了优化体验，CheckboxGroup 整个区域都可以点击，将会激活与之对应的 Checkbox，不仅仅只可以点击 Checkbox 的文字或图标区域。

## checkeds && outControl

Checkbox 通过 checkeds 传入一组值初始控制 CheckboxGroup 内部所有选项是否已选定。

outControl 常规使用时是不需要传入这个参数的，但是在做一些全选、全不选、反选等操作时，由于单项是否选中不是由点击单项本身来决定的，而是由外部事件决定的，就需要传入 outControl，结合 checkeds 用于控制单项内部的界面效果；另一方面，虽然 Checkbox 状态可以由外部控制，但单项 Checkbox 自身也是可以点击选定与取消的，所以就需要 outControl 这个动态值来通知 Checkbox，界面效果到底是由外部控制还是由自身点击控制。具体使用可以参考示例。
