## Usage

ActionSheet is a panel that pops up from the bottom of the page and provides operation actions related to the current scene. This operation generally does not carry data, so there is no need to worry about accidental touch. The cancel operation item is not displayed by default and clicking the mask can close it.

## Description

ActionSheet is encapsulated based on Popup. By predefining some Props of Popup, different effects can be achieved by passing Popup's properties. For example, in the example, the radius style is changed by setting the radius of popup.

## Actions

The actions property of ActionSheet is an array, and each item in the array is an object. The properties of the object refer to Actions Props.

## ActionSheet, Picker, Radio

ActionSheet, Picker, and Radio all give data for users to select or perform some operations, but when to use which component?

-   Radio is generally used for single selection data, with a fixed and relatively small amount of data. It needs to directly display options on the UI interface, and is convenient for users to have an overview of multiple data when interacting with the interface, such as gender selection.
-   ActionSheet is generally used to immediately perform some operations after selection. The options are fixed and relatively small, but there is no need to directly display the options on the UI interface, such as deleting and modifying operations.
-   Picker is generally used to select single or multiple data, dynamic data with a large amount of data or an undetermined length, or for the selection of some linked data, such as province, city, and district selection.
