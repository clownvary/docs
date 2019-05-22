## SelectOptionMenu 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
prefixCls|string|&ensp;|false|&ensp;
optionData|array|&ensp;|false|select option object array to render as option item list by default
selectedValues|array|[]|false|determine which option is displaying as selected state
activeValue|string|&ensp;|false|determine which option is displaying as active state
hidden|bool|&ensp;|false|determine the menu hidden state
style|object|&ensp;|false|option menu's css style width
menuOptionsMaxHeight|number|300|false|option menu's css style maxHeight
optionFooterRenderer|func|&ensp;|false|function to customize rendering the footer section below all option item
optionItemRenderer|func|&ensp;|false|function to customize rendering a single option item
onOptionItemClick|func|&ensp;|false|onClick callback function triggered by user click on an option item
onOptionItemSelect|func|&ensp;|false|onClick callback function triggered by user select an option
onOptionItemDeselect|func|&ensp;|false|onClick callback function triggered by user deselect an option