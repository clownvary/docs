## AsyncContent 
---
AsyncContent is an UI component that can display content in waiting and show manner.

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
data-qa-id|string|'AsyncContent'|false|Defines the unique id for automation test
prefix|string|`${DefaultCSSPrefix}-`|false|Determines the prefix for CSS class names
component|node|&ensp;|false|Async component will be rendered
loader|func|() => Promise.resolve()|false|Contains the job need be executed.
placeHolder|string|'loading'|false|The default charactor when loading.
placeHolderType|enum:<br>[PlaceHolderType.TEXT, PlaceHolderType.ICON]|PlaceHolderType.TEXT|false|The type of Placeholder.