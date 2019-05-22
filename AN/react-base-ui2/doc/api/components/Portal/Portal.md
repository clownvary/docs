## Portal 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
CSSPrefix|string|DefaultCSSPrefix|false|&ensp;
getContainer|func|() => {
  const container = window.document.createElement('div');
  window.document.body.appendChild(container);
  return container;
}|false|&ensp;
savePortalRef|func|&ensp;|false|&ensp;
children|node|&ensp;|true|&ensp;
onChildrenMount|func|&ensp;|false|&ensp;