import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

export default (e, keyCodes, handler) => {
  if (e && isArray(keyCodes) && keyCodes.length > 0 && isFunction(handler)) {
    const keyCode = e.keyCode || e.which;

    if (keyCodes.indexOf(keyCode) > -1) {
      handler();
      e.preventDefault();
    }
  }
};
