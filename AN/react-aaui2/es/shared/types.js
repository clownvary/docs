import _extends from 'babel-runtime/helpers/extends';
import { string, object, func, shape } from 'prop-types';

export var tabsAPIShape = shape({
  select: func,
  getSelected: func
});

export var aauiL10nConfigPropTypes = {
  locale: string,
  messages: object, // eslint-disable-line
  config: object // eslint-disable-line
};

export var aauiL10nFuncPropTypes = {
  formatMessage: func,
  parseDateTime: func,
  formatDateTime: func,
  formatCurrency: func,
  subscribe: func
};

export var aauiL10nShape = shape(_extends({}, aauiL10nConfigPropTypes, aauiL10nFuncPropTypes));