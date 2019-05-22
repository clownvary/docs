## MultiSelect 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
aria-label|string|&ensp;|false|aria label (for assistive tech)
aria-labelledby|string|&ensp;|false|HTML ID of an element that should be used as the label (for assistive tech)
prefixCls|string|`${DefaultCSSPrefix}-multi-select`|false|&ensp;
optionData|array|&ensp;|false|select option object array to render as option item list by default
placeholder|string|''|false|placeholder of search input
resetFilterAfterSelect|bool|true|false|clean filter character after select or deselect an option and reset option item list
optionItemRenderer|func|&ensp;|false|function to customize rendering a single option item
optionFooterRenderer|func|&ensp;|false|function to customize rendering the footer section below all option item
optionMenuRenderer|func|menu => menu|false|function to customize rendering the menu of option
optionFilterFn|func|(options, value) => options.filter(({ text }) => text.toLowerCase().indexOf(value.toLowerCase()) > -1)|false|function to customize the filter logic by inputted search characters
onSelect|func|&ensp;|false|onSelect callback function triggered by user select/deselect an option
onChange|func|&ensp;|false|onChange callback function triggered by user change selection
onOptionItemClick|func|&ensp;|false|onClick callback function triggered by user click on an option