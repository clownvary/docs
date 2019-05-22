## Steps 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
prefixCls|string|`${DefaultCSSPrefix}-steps`|false|&ensp;
className|string|&ensp;|false|className to apply
direction|string|'horizontal'|false|to specify the direction of the step bar, horizontal or vertical
labelPlacement|enum:<br>['horizontal', 'vertical']|'horizontal'|false|place title and description with horizontal or vertical direction
currentStatus|enum:<br>['wait', 'process', 'finish', 'error']|'process'|false|to specify the status of current step, can be set to one of the following values, wait process finish error
style|object|{}|false|&ensp;
current|number|1|false|to set the current step, counting from 1. You can overwrite this state by using status of Step
dataSource|arrayOf|[]|false|Data record array to be displayed