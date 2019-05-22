## InputNumeric  extends InputBase
---
InputNumeric component allows you to input numeric values only.

InputNumeric has 3 types of style: they are: 'number', 'currency' and 'percent'.

This can be determined by changing the type prop.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
type|string|NumericType.NUMBER|false|The type of the InputNumeric.
value|string &#124; number &#124; bool|null|false|The current value.
min|number|-9999999999.99|false|Determines the minimal value that can be entered.
max|number|9999999999.99|false|Determines the maximum value that can be entered.
showGroup|bool|false|false|Indicates whether the thousands group separator will be inserted between  each digital group. (number of digits in thousands group depends on the selected Culture)
decimals|number|2|false|Indicates the custom setting for decimal places to display.
increment|number|1|false|Determines how much to increase/decrease the input field.
allowKeySpin|bool|true|false|Allow increment or decrement by typing the up or down keys.
textAlign|string|'right'|false|Determines the left or right alignment of text.
onValueChange|func|identity|false|A function called when the value of the input is changed.
allowBlank|bool|true|false|Determines whether blank text is displayed after selecting all and pressing delete.
listClass|string|'input-numeric-list'|false|&ensp;