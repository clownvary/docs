## CheckboxGroup 
---
UI component that displays a group of Checkbox.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
disabled|bool|&ensp;|false|Determines the enable/disable state.
size|string|&ensp;|false|Determines the Checkbox size.
name|string|&ensp;|false|Field name.
className|string|&ensp;|false|Customize CSS class name.
onChange|func|identity|false|Fires when value change.
data|[{<br>&emsp;&emsp;text: string,<br>&emsp;&emsp;value: any<br>}]|&ensp;|false|Array of child items. Each item is a text/value pair.
children|node|&ensp;|false|Child node
value|array|&ensp;|false|Array of checked value.
defaultValue|array|&ensp;|false|Array of checked value in default state.