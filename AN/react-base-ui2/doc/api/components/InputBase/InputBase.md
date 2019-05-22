## InputBase 
---
Base class for all Input components

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
data-qa-id|string|''|false|The unique id for automation test.
prefix|string|`${DefaultCSSPrefix}`|false|The CSS class prefix.
value|string &#124; number &#124; object|''|false|The text value.
id|string|''|false|The DOM id.
name|string|''|false|The name of the input
className|string|''|false|Customize class name for the input wrapper.
listClassName|string|''|false|Customize class name for the popup list.
listWidth|string|'auto'|false|Determines the width of the popup list.
listMinWidth|string|&ensp;|false|Determines the minimum width of the popup list.
listMaxHeight|string|'300px'|false|Determines the maximum height of the popup list.
listConfig|object|{}|false|Config the list. {@link List.ListPropTypes.config}
listPopupOptions|object|{}|false|Config the popup service.
onListRender|func|&ensp;|false|Customize func which render the list item by self. {@link List.ListPropTypes.renderer}
items|array|[]|false|Array of list. Each item is an object. {@link List.ListPropTypes.data}
onListOpen|func|identity|false|The callback function that is triggered when the list popups.
onListClose|func|identity|false|The callback function that is triggered when the popup list closes.
style|object|&ensp;|false|Determines the style of the input wrapper.
size|enum:<br>['sm', 'md', 'lg']|'md'|false|Determines the Input size.
maxLength|number|&ensp;|false|Determines the maximum length of the input value.
disabled|bool|false|false|The enable/disable state
readonly|bool|&ensp;|false|Determines whether the input is readonly.
placeHolder|string|''|false|Specifies the short hint that describes the expected value of the input field.
showClear|bool|false|false|Whether to show clear class and enable clear the input value.
showTrigger|bool|false|false|Whether to show the trigger icon for the Input.
showTrigger2|bool|false|false|Whether to show the second trigger icon for the Input.
showSpinner|bool|false|false|whether to show the spinner bar for the input.
allowKeySpin|bool|false|false|Whether update value by up and down key.
allowMouseSpin|bool|false|false|Whether update value by mouse scroll.
currency|string|'USD'|false|Determines the currency symbol to be used.
textAlign|string|'left'|false|Determines how the input value is aligned and the popup position and can be 'left' or 'right'.
triggerIcon|string|'icon-chevron-down'|false|The class of the trigger icon.
triggerIconToggle|string|'icon-chevron-up'|false|The class of the toggle trigger icon.
triggerIconHint|string|''|false|The description for the trigger icon.
triggerIcon2|string|'icon-chevron-down'|false|The class of the spinner icon.
triggerIconToggle2|string|'icon-chevron-up'|false|The class of the toggle spinner icon.
triggerIconHint2|string|''|false|The description for the spinner icon.
icon|string|''|false|The icon displayed inside the input
iconHint|string|''|false|The description for the icon