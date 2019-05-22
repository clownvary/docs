## DatePicker 
---
UI component that displays DatePicker with variant settings.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
className|string|&ensp;|false|Determines the class name.
style|object|&ensp;|false|Determines the style.
name|string|&ensp;|false|Determines the date picker name attribute.
showIcon|bool|&ensp;|false|whether to display the date picker icon.
errored|bool|&ensp;|false|whether to have errors.
min|moment|&ensp;|false|Determines the min date.
max|moment|&ensp;|false|Determines the max date.
disabledDates|[moment]|&ensp;|false|Determines the min date value.
value|moment &#124; arrayOf|&ensp;|false|Determines the default date.
formatDate|func|&ensp;|false|A function called when format date.
formatTextValue|func|&ensp;|false|A function called when format date to text.
onValueChange|func|&ensp;|false|A function called when date changed.
onCalendarOpen|func|&ensp;|false|A function called when date canlendar open.
onCalendarClose|func|&ensp;|false|A function called when date canlendar close.