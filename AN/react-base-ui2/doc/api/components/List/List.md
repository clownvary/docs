## List 
---
List Component provide a full list.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
data-qa-id|string|''|false|defined the unique id for usage of automation test
prefix|string|`${DefaultCSSPrefix}-`|false|Determines the skin prefix of list.
data|[{<br>&emsp;&emsp;index: number &#124; string,<br>&emsp;&emsp;text: string,<br>&emsp;&emsp;value: number &#124; string,<br>&emsp;&emsp;disabled: bool,<br>&emsp;&emsp;selected: bool,<br>&emsp;&emsp;showTips: bool,<br>&emsp;&emsp;icon: string,<br>&emsp;&emsp;renderer: func<br>}]|[]|false|Array of list. Each item is an object.
config|{<br>&emsp;&emsp;selectionMode: enum:<br>[SelectionMode.SINGLE, SelectionMode.MULTIPLE],<br>&emsp;&emsp;listType: enum:<br>[ListType.SINGLE, ListType.MULTIPLE],<br>&emsp;&emsp;disabled: bool,<br>&emsp;&emsp;maxHeight: string,<br>&emsp;&emsp;showTips: bool,<br>&emsp;&emsp;showIcon: bool,<br>&emsp;&emsp;checkable: bool,<br>&emsp;&emsp;sortable: bool,<br>&emsp;&emsp;filterable: bool,<br>&emsp;&emsp;asyncable: bool,<br>&emsp;&emsp;isFuzzy: bool,<br>&emsp;&emsp;sortField: string,<br>&emsp;&emsp;filterField: string,<br>&emsp;&emsp;WCAG: bool,<br>&emsp;&emsp;allowDeselect: bool<br>}|{
  /** Determines the selection mode of list.
   * @type {Number}
   * - 0= SINGLE
   * - 1= MULTIPLE
   */
  selectionMode: SelectionMode.SINGLE,
  /** Determines the column mode of list.
   * @type {Number}
   * - 0= SINGLE
   * - 1= MULTIPLE
   */
  listType: ListType.SINGLE,
  disabled: false,
  maxHeight: undefined,
  showTips: true,
  showIcon: true,
  checkable: true,
  sortable: false,
  filterable: false,
  asyncable: false,
  isFuzzy: true,
  WCAG: true,
  allowDeselect: false,
  /** The default sort data field. default value is 'text'
   * @type {String}
   */
  sortField: 'text',
  /** The default filter data field. default value is 'text'
   * @type {String}
   */
  filterField: 'text'
}|false|Config the list.
selectedIndex|[number &#124; string]|[]|false|Gets or sets the selected Item's index.
selectedValue|[string]|&ensp;|false|Gets or sets the selected Item's value.
filterer|func|undefined|false|Customize filter func.
sorter|func|undefined|false|Customize sort func in ascending order.
onChange|func|undefined|false|Fires when check or uncheck the list item.
onScrollToBottom|func|&ensp;|false|Fires when scroll to the list bottom.
renderer|func|undefined|false|Customize func which render the list item by self.