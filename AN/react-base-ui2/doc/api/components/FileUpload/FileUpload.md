## FileUpload 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
prefixCls|string|`${DefaultCSSPrefix}-upload`|false|The prefix of file upload component element class name.
modalTitle|string &#124; element|'Upload Files'|false|The title of file upload modal. It's could be a react element.
modalClassName|string|''|false|A list of class names to pass along to the file upload modal container.
style|object|{}|false|The inline style for file upload container element.
className|string|''|false|A list of class names to pass along to the file upload container element.
showUploadList|bool|true|false|Determines displaying the upload file list.
drag|bool|false|false|Determines enable select the upload file by dragging.
uploadListConfig|object|&ensp;|false|The Upload file list configs which contains showRemoveIcon, errorMessage, className.
multiple|bool|false|false|Determines enable upload multiple files.
disabled|bool|false|false|Determines disable state of file upload component.
headers|object|{}|false|The heads of upload file http request.
accept|string|''|false|Determines the types of files that the file upload accepts.
name|string|'file'|false|Determines the file name which was sent to server.
action|string|''|false|Determines the URL where to send the upload file to.
uploadElemId|string|&ensp;|false|Determines the upload file dom element id.
data|object &#124; func|{}|false|Determines the upload form data. It could be function to do post process works.
children|any|&ensp;|false|The child nodes for file upload component.
withCredentials|bool|&ensp;|false|Determines withCredentials attribute when uploading file by xhr.