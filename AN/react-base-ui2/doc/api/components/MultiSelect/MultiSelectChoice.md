## `(Missing displayName)` 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---## MultiSelectChoice 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
prefixCls|string|&ensp;|false|&ensp;
value|string|&ensp;|false|current choice item value
last|bool|&ensp;|false|determine the choice is the last one
onChoiceRemove|func|&ensp;|false|callback function triggered by user click choice remove icon
choiceRenderer|func|(props) => {
  const { choicePrefixCls, text } = props;
  return (<span className={`${choicePrefixCls}__content`}>{text}</span>);
}|false|function to customize the choice item