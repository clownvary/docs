## InputTimeRange 
---
UI component that displays InputTimeRange with variant settings.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
format|string|'h:mm'|false|The format pattern to display the time.
step|number|60|false|Step in time unit when generating the time picker list.
disabled|bool|false|false|Whether or not to edit time.
value|MomentRange|null|false|Determines the current selected timeRange
showTextTip|bool|true|false|Whether or not to show text tip.
items|array|[]|false|Determines the time range dropdowm list.