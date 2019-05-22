import template from 'lodash/template';
import isPlainObject from 'lodash/isPlainObject';

export function formatI18n(message = '', values) {
  return values && isPlainObject(values) ? template(message, { 'interpolate': /{([\s\S]+?)}/g })(values) : message;
}
