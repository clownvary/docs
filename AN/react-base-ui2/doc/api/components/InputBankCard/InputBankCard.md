## InputBankCard 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
className|string|''|false|A list of class names to pass along to the container element of component. Default value is "".
value|string|''|false|Externally exposed value. Default value is null.
group|number|4|false|Set the length of a group's numbers. Default value is 4.
maxLength|number|16|false|Set the length of numbers that are allowed to enter. Default is 16.
gapChar|string|' '|false|Determines the delimiter between each group.
showPrompt|bool|false|false|Determines the prompt character displaying.
keepPosition|bool|false|false|Determines the number only can be inserted at empty position.
onInput|func|&ensp;|false|The callback function that is triggered when changes the number.