## ColumnList 
---
ColumnList component provide a full sortable, filterable, pagable and cachable list

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
data-qa-id|string|''|false|defined the unique id for usage of automation test
dataSource|array &#124; IDataSource|&ensp;|false|Either an array or an instance of IDataSource
disabled|bool|false|false|Disable or enable the entire list
pageMode|bool|false|false|Enable or disable the page mode of the list
pageSize|number|&ensp;|false|Number of items per page if list is in page mode and dataSource is an array
width|string|&ensp;|false|Specify the width of list
minWidth|string|&ensp;|false|Specify the minWidth of list
maxHeight|string|&ensp;|false|Specify the maxHeight of the list body (excluding the list header and footer)
showTips|bool|true|false|Whether or not to show the tip while mouse over items
showSorter|bool|false|false|Whether or not to show a sorter icon and change the sort of the list by clicks
showFilter|bool|false|false|Whether or not to show a filter on the header of the list
showCount|bool|false|false|Whether or not to show a current/total counts on the footer of the list
showCheckAll|bool|false|false|Whether or not to show a "Check All" item to control the total seleciton state
sortField|string|'text'|false|Specify the field name which it's value will be used to sort the list
filterField|string|'text'|false|Specify the field name which it's value will be used to filter the list
filterPlaceholder|string|&ensp;|false|A placeholder text for the filter
defaultSort|string|SortOrder.ORIGIN|false|The default sort of the list
selectionMode|string|SelectionMode.MULTIPLE|false|Single or multiple mode of selection
WCAG|bool|true|false|Whether to enable the advanced WCAG support
filter|func|&ensp;|false|Customize filter func.
onChange|func|&ensp;|false|Fires when check or uncheck the columnlist item.
onItemRender|func|&ensp;|false|Customize func which render the columnlist item by self.
columns|[{<br>&emsp;&emsp;field: string,<br>&emsp;&emsp;type: string,<br>&emsp;&emsp;onRender: func<br>}]|[
  { field: 'checked', type: ColumnType.CHECKBOX },
  { field: 'text', type: ColumnType.TEXT },
  { field: 'icon', type: ColumnType.ICON }
]|false|Column configurations