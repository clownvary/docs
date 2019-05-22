## Button 
---
UI component that displays Button with variant settings.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
noSubmit|bool|false|false|Determines whether the button is a not a Submit button.
loading|bool|false|false|Whether or not to show loading icon.
type|string|ButtonType.SECONDARY|false|Determines the button type.
size|string|&ensp;|false|Determines the button size.
disabled|bool|&ensp;|false|Whether or not to disable button.
className|string|&ensp;|false|Custom class name.
children|node|&ensp;|false|Child Node
menuData|[{<br>&emsp;&emsp;text: string,<br>&emsp;&emsp;value: number &#124; string<br>}]|[]|false|Menu data list.
onMenuSelect|func|&ensp;|false|Triger the functtion when select menu item.
onClick|func|&ensp;|false|Triger the functtion when click button.
onMouseHover|func|&ensp;|false|Triger the function when hover button.
onMouseEnter|func|&ensp;|false|Triger the function when enter button.
onMouseLeave|func|&ensp;|false|Triger the function when leave button.