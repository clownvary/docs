## Tabs 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
id|string|&ensp;|false|Id property for Tabs container, if not specified, will generate a unique id automatically.
children|node|&ensp;|false|Child Node, will be used as TabPanel's children.
className|string|&ensp;|false|Custom CSS class for Tabs container.
selectedId|string|&ensp;|false|Control which tab is selected.
size|enum:<br>[Size3.SMALL, Size3.MEDIUM, Size3.LARGE]|Size3.MEDIUM|false|Determines the size of Tabs.
onChange|func|&ensp;|false|A callback function called when a tab clicked.