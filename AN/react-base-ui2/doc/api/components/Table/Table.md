## Table 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
prefix|string|`${DefaultCSSPrefix}-`|false|Determines the class prefix of table.
className|string|''|false|Specified class name for the table.
sortable|bool|false|false|Determines the table is sortable or not.
resizable|bool|false|false|Determines the table is resizable or not.
rowSeperator|bool|false|false|Determines the table has borders between rows or not.
striped|bool|true|false|Determines the table is striped or not.
minWidth|number|30|false|Determines the min width of the column.
fixed|enum:<br>[FixedPosition.TOP, FixedPosition.BOTTOM]|FixedPosition.BOTTOM|false|Determines the default fixed row's position in the table.
onExpand|func|row => row|false|Callback when row expanding.
onCollapse|func|row => row|false|Callback when row collapsing.
rows|[{<br>&emsp;&emsp;data: object,<br>&emsp;&emsp;expanded: bool,<br>&emsp;&emsp;hidden: bool,<br>&emsp;&emsp;className: string,<br>&emsp;&emsp;fixed: number,<br>&emsp;&emsp;expandControl: string,<br>&emsp;&emsp;extraRows: array,<br>&emsp;&emsp;children: object<br>}]|&ensp;|true|Collection of structured data to render.
columns|[{<br>&emsp;&emsp;title: string,<br>&emsp;&emsp;keyName: string,<br>&emsp;&emsp;className: string,<br>&emsp;&emsp;colSpan: number,<br>&emsp;&emsp;format: func,<br>&emsp;&emsp;render: func,<br>&emsp;&emsp;sorter: func &#124; bool<br>}]|&ensp;|true|Data rendering descriptions.