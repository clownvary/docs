## Dropdown 
---
UI component that displays Dropdown with variant settings.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
className|string|&ensp;|false|Custom class name.
style|object|&ensp;|false|Custom style object.
disabled|bool|&ensp;|false|Whether or not to change dropdown.
placeholder|string|'Select one...'|false|Dropdown place holder, and the default value is 'Select one...'.
maxHeight|{<br>&emsp;&emsp;maxHeight: string<br>}|&ensp;|false|The max height of dropdown list.
filter|bool|&ensp;|false|Whether or not to show filter.
filterPlaceholder|string|'Filter...'|false|Filter place holder, and the default value is 'Filter...'.
serverFilter|bool|&ensp;|false|Whether or not to show filter.
autoOpen|bool|false|false|Whether or not to show data list when init.
theme|enum:<br>['flat', 'gradient', 'borderless']|'flat'|false|Dropdown theme such as flat, gradient and borderless. And the default value is flat.
errored|bool|&ensp;|false|Whether or not to show error style.
showCheckbox|bool|&ensp;|false|Whether or not to display checkbox of each option.
showAllCheckbox|bool|&ensp;|false|Whether or not to dispaly check all option.
showTextTip|bool|&ensp;|false|Whether or not to show text tip when hovering the option.
showSpiner|bool|&ensp;|false|Whether or not to show spiner when loading data.
errorInfo|string|&ensp;|false|Error message.
showResults|bool|&ensp;|false|Whether or not to show the count of data list.
results|func|&ensp;|false|Customize how to render Count of data list.
showError|bool|&ensp;|false|Whether or not to show error message.
errorInfoTemplate|string|&ensp;|false|Error infomation template.
onlyDefaultPlaceholder|bool|&ensp;|false|Whether or not to onlyt show text as default place holder.
prefix|string|&ensp;|false|The prefix of text.
value|string &#124; number &#124; object &#124; array|&ensp;|false|Dropdown value.
defaultValue|string &#124; number &#124; object|&ensp;|false|Dropdown default value.
data|[{<br>&emsp;&emsp;text: string,<br>&emsp;&emsp;value: string &#124; number &#124; object<br>}]|[]|false|Display which icon inside of dropdown.
onChange|func|&ensp;|false|Fires when value change.
fuzzyQuery|bool|false|false|Whether or not to get data with fuzzy query.
showTxtOnlyCheckedOneItem|bool|true|false|Whether or not to show checked items text just checked one item.
visible|bool|true|false|Whether or not to show the menu list of Dropdown.
showDeselectall|bool|false|false|Whether or not to show the icon of deselectting all items .
txtSuffix|string|'selected'|false|The suffix text of button.
noResult|string|'No results found.'|false|The text when length of data list is 0.