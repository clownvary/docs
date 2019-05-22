## Tag 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
prefixCls|string|`${DefaultCSSPrefix}-tag`|false|&ensp;
className|string|&ensp;|false|class names which were applied to component container div.
size|enum:<br>[TagSize.SMALL, TagSize.MEDIUM, TagSize.LARGE, TagSize.EXTRA_LARGE]|TagSize.MEDIUM|false|determine the tag size.
type|enum:<br>[TagType.DEFAULT, TagType.PENDING, TagType.ERROR]|TagType.DEFAULT|false|determine the type of tag, including background-color and color.
closable|bool|&ensp;|false|determine the close icon renders of tag.
visible|bool|true|false|determine the hide status of tag.
onClose|func|&ensp;|false|the callback function which is triggered when clicking the close icon.