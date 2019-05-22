## InputMoment  extends InputBase
---
InputMoment component allows you validate and enter manually date and time.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
value|moment &#124; Date &#124; string|null|false|Gets or sets the date value for a date input.
min|moment &#124; Date|undefined|false|Determines the minimal date that can be entered.
max|moment &#124; Date|undefined|false|Determines the maximum date that can be entered.
format|string|'d'|false|The format pattern to display the date value.<br>InputMoment supports two types of formats: Standard Format and Custom Format.<br>A standard date and time format string uses a single format specifier to  define the text representation of a date and time value.<br> Possible values for Standard Format are:<br> - "d": ShortDatePattern  M/D/YYYY  - "D": LongDatePattern  dddd, MMMM DD, YYYY  - "f": Full date and time (long date and short time)  dddd, MMMM DD, YYYY h:mm A  - "F": Full date and time (long date and long time) dddd, MMMM DD, YYYY h:mm:ss A  - "g": General (short date and short time) M/d/YYYY h:mm A  - "G": General (short date and long time) M/d/YYYY h:mm:ss A  - "m": month/day pattern MMMM DD  - "M": month/day pattern MMMM DD  - "s": sortable format that does not vary by culture  -      YYYY\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss  - "t": short time pattern h:mm A  - "T": long time pattern h:mm:ss A  - "u": Universal Sortable DateTime Pattern, same to s  - "U": Full date and time (long date and long time) using universal time  -    same to F  - "y": month/year pattern YYYY MMMM  - "Y": month/year pattern YYYY MMMM<br> Any date and time format string that contains more than one character, including white space,  is interpreted as a custom date and time format string. For example:  "mmm-DD-YYYY", "mmmm d, YYYY", "mm/DD/YYYY", "d-mmm-YYYY", "ddd, mmmm DD, YYYY" etc.<br> Below are the custom date and time format specifiers:<br> - "D": The day of the month, from 1 through 31.  - "DD": The day of the month, from 01 through 31.  - "ddd": The abbreviated name of the day of the week.  - "dddd": The full name of the day of the week.  - "m": The minute, from 0 through 59.  - "mm": The minute, from 00 through 59.  - "M": The month, from 1 through 12.  - "MM": The month, from 01 through 12.  - "MMM": The abbreviated name of the month.  - "MMMM": The full name of the month.  - "Y": The year, from 0 to 99.  - "YY": The year, from 00 to 99  - "YYYY": The year as a four-digit number  - "h": The hour, using a 12-hour clock from 1 to 12.  - "hh": The hour, using a 12-hour clock from 01 to 12.  - "H": The hour, using a 24-hour clock from 0 to 23.  - "HH": The hour, using a 24-hour clock from 00 to 23.  - "s": The second, from 0 through 59.  - "ss": The second, from 00 through 59.  - "a": The am/pm designator.  - "A": The AM/PM designator.
allowKeySpin|bool|true|false|Allow spinning value by up/down key.
triggerIcon|string|'icon-calendar-m'|false|Icon class name for the 1st trigger button.
triggerIconToggle|string|''|false|Icon class name for the 1st trigger button in toggle state.
triggerIcon2|string|'icon-clock-m'|false|Icon class name for the 2nd trigger button.
triggerIconToggle2|string|''|false|Icon class name for the 2nd trigger button in toggle state.
timeStep|number|30|false|Step in minutes when generating the time picker list.
onCalendarOpen|func|identity|false|Callback function that will be called when the calendar is dropdown.
onCalendarClose|func|identity|false|Callback function that will be called when the calendar is closed.
onValueChange|func|identity|false|The onValueChange event handler.A function called when the value of the input is changed.