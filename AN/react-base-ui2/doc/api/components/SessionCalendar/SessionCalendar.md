## SessionCalendar 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
prefixCls|string|`${DefaultCSSPrefix}-sc`|false|&ensp;
className|string|&ensp;|false|class names which were applied to component container div.
sessionDates|[{<br>&emsp;&emsp;date: moment,<br>&emsp;&emsp;waiting: bool<br>}]|[]|false|session date object array determine which month could be displayed.
selectedDates|[moment]|[]|false|selected session date array determine which date were selected.
today|string &#124; Date|new Date()|false|today determines which day is today.
currentDate|string &#124; Date|new Date()|false|current date determines the default display date of session calendar.
next|bool|&ensp;|false|next determines the next month button active state.
previous|bool|&ensp;|false|previous determines the previous month button active state.
disableExpired|bool|true|false|disable expired determines the day before today would be rendered as disabled.
disableFutureUnavailable|bool|true|false|disabled future unavailable determines the day after the last session date would be rendered as disabled.
customizeAction|node|&ensp;|false|customize action is a react component node which would be rendered at the right side of session calendar control actions.
onPrevBtnClick|func|&ensp;|false|the handler function which would be triggered when previous button were clicked.
onNextBtnClick|func|&ensp;|false|the handler function which would be triggered when next button were clicked.
onDateRowClick|func|&ensp;|false|the handler function which would be trigger when the row of week date were clicked.