## Usage Scenario

The usage scenario of the AsyncPicker component is similar to a Picker with multiple levels of interdependence, which is designed to solve situations where lower level data is queried from the server based on upper level data selection. For example, after selecting data at the provincial level, corresponding data at the city level is queried dynamically, and then, after selecting city-level data, corresponding data at the district level is queried dynamically, and so on.

## Usage

Using the AsyncPicker component requires more steps than a Picker with multiple levels of interdependence, because the data is not passed in at once but rather obtained dynamically through an API, so developers need to handle the data themselves.

By listening to the next and prev methods, update the new data "data" for the current column and dynamically bind it to the component's internal state. At the same time, you also need to dynamically bind whether the current column is the first level "lastLevel" and whether it is the last level "firstLevel".

When the data is at the last level, clicking on the right button triggers the confirm method and returns the selected data. When the data is not at the last level, clicking on the right button triggers the next method and returns the index value of the current selection.

## Returned Data

The AsyncPicker component ultimately returns two pieces of data: an array "items" composed of multiple selected data columns, and another array "indexs" composed of the indexes of the multiple selected data columns. Use as needed.

The data structure of each item in "items" is the same as the data structure passed in, which is convenient for developers to use directly.

## Usage Optimization

In actual development, the data of most AsyncPicker components is dynamically acquired, usually through an API. Normally, we need to loop through the passed-in data to make sure the AsyncPicker component can be used correctly. However, this is a somewhat cumbersome and unnecessary process, so STDF has optimized the input of the AsyncPicker component, allowing developers to directly pass in data returned by an API without needing to do looping themselves.

- LabelKey for each data item can be dynamically bound to customize the label attribute name for each column of data passed in. If not passed in, it defaults to "label". Please refer to the example.

## Notes

The AsyncPicker is wrapped based on Popup by defining some Popup Props in advance, so you can achieve different effects by passing in Popup properties. For example, in the example, we change the rounded corner style by setting the radius of the popup.

The loading displayed when data is loaded in AsyncPicker is wrapped based on Loading, so you can achieve different effects by passing in Loading properties. For example, in the example, we changed the loading effect by setting some parameters of the loading.

## Difference between Radio, ActionSheet, IndexBar, Picker, and AsyncPicker

Radio, Checkbox, ActionSheet, IndexBar, Picker, and AsyncPicker components all essentially provide a series of data for users to select or perform certain operations, but they differ in usage:

- Radio is generally used to select a single data item, the number of options is fixed and relatively small. It needs to display the options directly on the UI interface, making it easy for users to have an overview of the available data while interacting with the interface, such as gender selection.
- Checkbox is used in a similar way as Radio, but allows multiple selections.
- ActionSheet is generally used to choose a set of options that will execute an operation immediately after selection. Options are fixed and relatively small, but do not need to be displayed directly on the UI interface, such as doing some deletion, modification and other operations.
- IndexBar is generally used to select a single item of data. It handles large amounts of dynamic data that has been indexed and classified into categories, and is generally reserved for a full webpage display.
- Picker is generally used to select one or multiple data items. Used for dynamic data with large or undefined length, or when selecting dependent data. **Regardless of whether it is dependent, the data is already determined when passed in.**
- AsyncPicker is generally used to select multiple data. Lower level data is obtained dynamically based on upper level data selection. For example, if the server API returns only one level of data at a time, the next level of data must be requested based on the upper level of data selected by the user.
