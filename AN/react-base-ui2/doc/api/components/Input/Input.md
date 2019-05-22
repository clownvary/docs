## Input 
---
UI component of Input

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
value|string &#124; number|&ensp;|false|Sets the value of the Input.
defaultValue|string &#124; number|&ensp;|false|Sets the default value of the Input.
type|string|'text'|false|Sets the type of the Input and can be 'text', 'password', 'button' etc.
size|enum:<br>['sm', 'md', 'lg']|'md'|false|Determines the Input size.
preIcon|string|&ensp;|false|The label icon displayed before (on the left side of) the input field.
preText|string|&ensp;|false|The label text displayed before (on the left side of) the input field.
postIcon|string|&ensp;|false|The label icon displayed after (on the right side of) the input field.
postText|string|&ensp;|false|The label text displayed after (on the right side of) the input field.
errored|bool|&ensp;|false|Determines if the input has errors.
icon|bool|false|false|Whether add 'input-group--icon' class for the input wrapper.
disabled|bool|&ensp;|false|Whether the input is disabled.
className|string|&ensp;|false|Customize class name for the input wrapper.
style|object|&ensp;|false|Determines the style of the input wrapper.
onChange|func|identity|false|The callback function that is triggered when input value changes.
PreComponent|func &#124; element|&ensp;|false|The component displayed after (on the right side of) the input field.
PostComponent|func &#124; element|&ensp;|false|The component displayed before (on the left side of) the input field.
inputRef|func|identity|false|Gets the instance of the Input Component.
children|node|&ensp;|false|Child Node