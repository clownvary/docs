## Calendar 
---
Calendar Component with three view mode: Date View, Month View and Year View.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
data-qa-id|string|'popupCalendar'|false|Define the unique id for usage of automation test
prefix|string|`${DefaultCSSPrefix}-`|false|Determines the skin prefix of calendar.
today|moment|&ensp;|false|Determines the today of calendar.
firstDayOfWeek|number|moment().localeData().firstDayOfWeek()|false|Determines the first day of week.
min|moment|moment(new Date(1900, 0, 1))|false|Gets or sets the earliest date that the user can select in the calendar.
max|moment|&ensp;|false|Gets or sets the latest date that the user can select in the calendar.
disabledDates|[moment]|[]|false|Gets or sets the array of dates that the user can not select in the calendar.
value|[moment]|[]|false|Gets or sets the currently selected date.
selectMode|enum:<br>[SelectionMode.SINGLE, SelectionMode.MULTIPLE]|SelectionMode.SINGLE|false|Determines the selection mode of calendar.
viewMode|enum:<br>[ViewMode.DATEVIEW, ViewMode.MONTHVIEW, ViewMode.YEARVIEW]|ViewMode.DATEVIEW|false|Determines the view mode of calendar.
monthMode|bool|false|false|Determines the minimum selectable unit of the calendar is month.
displayToday|bool|true|false|Determines the display state of today button
todayBehavior|enum:<br>[TodayBehavior.DISPLAY, TodayBehavior.SELECT]|TodayBehavior.DISPLAY|false|&ensp;
valueChanged|func|() => { }|false|Occurs when the value property changes,   either as a result of user actions or by assignment in code.