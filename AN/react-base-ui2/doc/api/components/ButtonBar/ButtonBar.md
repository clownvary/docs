## ButtonBar 
---
UI component that displays ButtonBar with variant settings.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
data|[{<br>&emsp;&emsp;id: string,<br>&emsp;&emsp;text: string,<br>&emsp;&emsp;size: string,<br>&emsp;&emsp;type: string,<br>&emsp;&emsp;loading: bool,<br>&emsp;&emsp;icon: custom,<br>&emsp;&emsp;disabled: bool,<br>&emsp;&emsp;menuData: [{<br>&emsp;&emsp;text: string,<br>&emsp;&emsp;value: number &#124; string<br>}],<br>&emsp;&emsp;onMenuSelected: func<br>}]|[]|false|ButtonBar data list.
disabled|bool|false|false|Whether or not to disable buttonbar.
className|string|&ensp;|false|ButtonBar class name.
onButtonClick|func|&ensp;|false|Triger the functtion when click button.
onButtonMouseHover|func|&ensp;|false|Triger the function when hover button.
onButtonMouseEnter|func|&ensp;|false|Triger the function when enter button.
onButtonMouseLeave|func|&ensp;|false|Triger the function when leave button.
onButtonMenuSelect|func|&ensp;|false|Triger the functtion when select menu item of the button.