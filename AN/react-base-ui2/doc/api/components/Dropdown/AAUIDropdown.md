## AAUIDropdown 
---
UI component that displays Dropdown with variant settings.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
className|string|&ensp;|false|Custom class name.
value|string &#124; number|&ensp;|false|Dropdown value.
defaultValue|string &#124; number|&ensp;|false|Dropdown default value.
maxHeight|string|&ensp;|false|The max height of dropdown list.
placeholder|string|'Select one...'|false|Dropdown place holder, and the default value is 'Select one...'.
filterPlaceholder|string|'Filter...'|false|Filter place holder, and the default value is 'Filter...'.
preIcon|string|&ensp;|false|Display which icon inside of dropdown.
size|enum:<br>['m', 'lg']|'m'|false|Dropdown size such as m, lg. And the default value is m.
theme|enum:<br>['flat', 'gradient', 'borderless']|'flat'|false|Dropdown theme such as flat, gradient and borderless. And the default value is flat.
isMoreButton|bool|&ensp;|false|Whether or not to show more buttons.
disabled|bool|&ensp;|false|Whether or not to change dropdown.
filter|bool|false|false|Whether or not to show filter.
highlight|bool|false|false|Whether or not to show highlight.
data|[{<br>&emsp;&emsp;text: string,<br>&emsp;&emsp;value: string &#124; number<br>}]|[]|false|The data list of dropdown options.
style|object|&ensp;|false|Custom style object.
onChange|func|&ensp;|false|Fires when value change.