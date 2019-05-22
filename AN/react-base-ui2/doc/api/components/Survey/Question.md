## Question 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
id|number &#124; string|&ensp;|true|The unique key of question.
path|array|&ensp;|true|The path of question.
text|string|&ensp;|true|The text description of question.
hint|string|&ensp;|true|The hint text of question.
readonly|bool|&ensp;|false|Determines the readonly of question.
required|bool|&ensp;|false|Determines the question require an answer.
isShown|bool|&ensp;|true|Determines the question is not hidden.
errorMsgs|array|&ensp;|false|The error message for the question answer validation.
icon|string|&ensp;|false|The post icon for question.
maxLength|number|&ensp;|false|The max length limit for the question answer. Available for question of INPUT type with formats: UPPERCASE, LOWERCASE, NUMBER, ALPHA and FREE.
placeHolder|string|&ensp;|false|The placeholder for the question answer. Available for question MULTIPLEDROPDOWN type and INPUT type with formats: MULTIPLEDROPDOWN, UPPERCASE, LOWERCASE, NUMBER, ALPHA and FREE.
value|string &#124; array &#124; number &#124; object &#124; Date|&ensp;|false|The answer value of question.
type|enum:<br>[QuestionType.INPUT, QuestionType.RADIO, QuestionType.SINGLEDROPDOWN, QuestionType.CHECKBOX, QuestionType.MULTIPLEDROPDOWN]|&ensp;|false|Determines the render method of question answer section.
format|enum:<br>[InputType.FREE, InputType.PHONE, InputType.DATE, InputType.TIME, InputType.SSNTB, InputType.POSTAL, InputType.UPPERCASE, InputType.LOWERCASE, InputType.NUMBER, InputType.ALPHA, InputType.DURATION]|&ensp;|false|Determines the format of INPUT type question.
answers|[{<br>&emsp;&emsp;text: string,<br>&emsp;&emsp;value: number &#124; string<br>}]|&ensp;|false|The preset answers that only available for question types: RADIO, SINGLEDROPDOWN, CHECKBOX and MULTIPLEDROPDOWN.
onChange|func|&ensp;|false|The callback function that is triggered when changes the answer value.
onIconClick|func|&ensp;|false|The callback function that is triggered when clicks the post question icon.