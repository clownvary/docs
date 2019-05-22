## SessionCalendarRow 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
prefixCls|string|&ensp;|false|&ensp;
rowDates|array|&ensp;|false|&ensp;
rowSessionDates|[{<br>&emsp;&emsp;date: moment,<br>&emsp;&emsp;waiting: bool<br>}]|[]|false|&ensp;
rowSelectedDates|[moment]|[]|false|&ensp;
rowDisabled|bool|&ensp;|false|&ensp;
today|moment|&ensp;|false|&ensp;
sessionLastDay|moment|&ensp;|false|&ensp;
disableExpired|bool|true|false|&ensp;
disableFutureUnavailable|bool|true|false|&ensp;
onDateRowClick|func|&ensp;|false|&ensp;