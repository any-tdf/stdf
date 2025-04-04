## 使用场景

Picker 组件用于选择单条或多条数据，数据量较大或无法确定长度的动态数据。Picker 组件的数据源可以是静态数据，也可以是动态数据。

## 传入数据

非多级联动时，传入的数据 datas 是一个数组，数组中的每一项都是一个对象，对象中的属性参考 PickerDatas Props。其中 data 才是每一列的数据，每一列的数据都是一个数组。

多级联动时，传入的数据与非联动的结构将完全不一样，传入的是一个多层级的数组，由 Picker 内部自动处理。请参考示例。

注意：多级联动使用时，请在传入数据之前先明确数据层级，且**保证每一条数据层级相同**，缺失的请用空数据或其他补齐。

## 返回数据

Picker 组件返回的数据有两项，一项是选定的多列数据组成的数组 items，另一项是选定的多列数据的索引组成的数组 indexs，请按照需求选择使用。

其中 items 每一项的数据结构与传入的数据结构一致，也方便开发者直接使用。

## 使用优化

实际开发中，多数情况下 Picker 的数据都是动态获取的，通常是通过接口获取，一般我们需要对传入的数据进行循环处理，以便于 Picker 组件能够正常使用。但这是一个比较繁琐且没必要的过程，因此 STDF 对 Picker 组件的入参作了一些优化，使得开发者可以直接传入接口返回的数据，而不需要做循环处理。

非多级联动时：

- 可以通过 PickerDatas Props 中的 labelKey 自定义传入的每列数据 label 属性名，如果不传入则默认使用 'label'，请参考示例。

多级联动时：

- 可以通过 linkageLabelKeys 自定义对应的每级数据的 label 属性名，如果不传入则默认使用 'label'，请参考示例。
- 可以通过 linkageChildrenKey 自定义上下级数据的 children 属性名，如果不传入则默认使用 'children'，请参考示例。

## 特别说明

多级联动使用时，请在**传入数据之前先明确数据层级**，传入 linkageInitIndexs、linkageShowRows、linkageFlexs、linkageAligns、linkageLabelKeys 的长度必须与数据层级一致。

## 说明

Picker 选择器是在 Popup 基础上封装的，通过预先定义一些 Popup 的 Props 实现，因此可以通过传入 Popup 的属性来实现不同的效果。比如示例中通过设置 popup 的 radius 改变圆角风格。

## Radio、ActionSheet、IndexBar、Picker、AsyncPicker 区别

Radio、Checkbox、ActionSheet、IndexBar、Picker、AsyncPicker 组件本质都是给出一系列数据，让用户进行数据选择或执行一些操作，但在使用上有一些区别：

- Radio 一般用于单选数据，数据量固定且较少，需要在 UI 界面上直接展示选项，方便用户在界面交互时对备选数据有个概览，比如性别选择。
- Checkbox 使用场景类似 Radio，但是可以多选。
- ActionSheet 一般用于选择之后立即执行一些操作，选项固定且较少，但不需要在 UI 界面上直接展示选项，比如做一些删除、修改等操作。
- IndexBar 一般用于选择单条数据，数据量非常大的动态数据，且已经对数据进行了分类索引，一般会用整个页面来展示。
- Picker 一般用于选择单条或多条数据，数据量较大或无法确定长度的动态数据，或用于一些联动数据的选择。**无论是否联动，数据在传入时已经是确定的。**
- AsyncPicker 一般用于选择多条数据，下级数据是根据上级数据动态获取的，比如服务端接口单次只返回一级数据，需要根据用户选择的一级数据再次请求接口获取下级数据。
