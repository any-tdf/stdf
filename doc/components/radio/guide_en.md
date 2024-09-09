> Radio uses the icons ri-radio-button-line and ri-checkbox-blank-circle-line, please ensure that the symbol.svg file in your project includes these icons. For details, please refer to [STDF-Guide-Icon](https://stdf.design/#/guide/icon).

## Explanation

Due to limited horizontal space on mobile devices, RadioGroup defaults to vertical layout. Horizontal layout is recommended only for simple use cases. When there are many options, long content, or a lot of information to display, a vertical layout is recommended.

RadioGroup passes a value as the initial identifier for internal Radio components with the value property. When a Radio button is clicked, RadioGroup triggers a change event, which can be used to obtain the current value, corresponding to the name of the currently selected Radio.

## icon && iconChecked

The default value of the icon property of Radio Props is 'default', which will render as an Icon component in the shape of ri-checkbox-blank-circle-line in Remix Icon. Passing the character 'none' indicates that the unchecked option icon area should not display any content. You can also pass in Icon Props, and the unchecked option icon area will be rendered as an Icon component based on the parameters passed in.

The logic for iconChecked is the same as that for icon, and corresponds to the content of the selected option's icon area.

## Radio Slots

The slot for Radio will be rendered in the content area of each Radio button. By combining the value obtained from the RadioGroup change event, you can freely design the selection and unselection effects.

Note: Although it is convenient to write styles with Tailwind, too much customization will lose the meaning of using a component library.

## Optimization for Clicking Areas

To optimize the user experience, the entire area of RadioGroup can be clicked, which will activate the corresponding Radio, not just the text or icon area of the Radio button.

## ActionSheet, Picker, and Radio

ActionSheet, Picker, and Radio are all used to give users options for data selection or to perform some actions. But when and how to use which component?

- Radio is generally used for single-choice data with a fixed and small number of options, when you need to display the options directly in the UI for users to preview multiple data items during interaction, such as selecting gender.
- ActionSheet is generally used when you need to immediately perform some operations after selecting, with a fixed and small number of options, but when you do not need to directly display the options in the UI, such as deleting or modifying items.
- Picker is generally used when you need to select single or multiple items, with a large or undetermined number of dynamic data or when you need to select some linked data, such as selecting cities and districts.
