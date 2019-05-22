## DialogBox 
---
UI component that displays DialogBox with variant settings.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
onCancel|func|&ensp;|false|The callback function that is triggered when click the cancel button.
onConfirm|func|&ensp;|false|The callback function that is triggered when click the confirm button.
title|string|'Dialog'|false|Determines dialog title.
contentView|func|&ensp;|false|Determines dialog content.
contentProps|object|&ensp;|false|Determines the props of content view.
showCancel|bool|false|false|Whether to display the cancel button.
cancelText|string|'Cancel'|false|Determines cancel text.
confirmText|string|'OK'|false|Determines confirm text.