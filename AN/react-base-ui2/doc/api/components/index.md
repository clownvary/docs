## CollapsePanel 
---
UI component of CollapsePanel

### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
children|node|&ensp;|true|child content of CollapsePanel
className|string|''|false|customize class for CollapsePanel section
expandedIcon|string|'icon-chevron-up'|false|expanded icon of CollapsePanel panel
collapsedIcon|string|'icon-chevron-down'|false|collapsed icon of CollapsePanel panel
transition|string|'none'|false|define collapse/expanded transition, just have a transition on attribute of 'height'
title|string|''|false|define what title will be display on collapse panel
summary|string &#124; element|''|false|define what summary will be display on collapse panel
onExpand|func|() => {}|false|a callback function after expanded
onCollapse|func|() => {}|false|a callback function after collapsed