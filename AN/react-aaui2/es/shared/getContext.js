import _extends from 'babel-runtime/helpers/extends';
import React from 'react';

var getContext = function getContext(contextTypes) {
  return function (BaseComponent) {
    var GetContext = function GetContext(props, context) {
      return React.createElement(BaseComponent, _extends({}, context, props));
    };

    GetContext.contextTypes = contextTypes;
    GetContext.WrappedComponent = BaseComponent;

    return GetContext;
  };
};

export default getContext;