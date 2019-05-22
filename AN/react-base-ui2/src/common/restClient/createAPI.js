import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import Request from './Request';
import * as HttpMethod from './consts/HttpMethod';

let _createAPI;
/* istanbul ignore else */
if (__STATIC__) {
  _createAPI = () => {
    const mockedAPI = () => {
    };
    /* istanbul ignore next */
    mockedAPI.mock = jsonPath => () => Request.instance[HttpMethod.GET](jsonPath);
    return mockedAPI;
  };
} else {
  const exp = /\{\{([\s\S]+?)\}\}/;
  const hasTemplate = s => s.match(exp);
  const findTemplate = (s) => {
    const m = exp.exec(s);
    return m ? m[1] : '';
  };

  const doTemplate = (url, param) => {
    if (isString(url) && isPlainObject(param)) {
      let key = findTemplate(url);
      while (key) {
        let value = param[key];
        if (!value && value !== 0) {
          value = '';
        }
        if (isArray(value)) {
          value = value.join(',');
        }
        url = url.replace(`{{${key}}}`, value);
        key = findTemplate(url);
      }
    }

    return url;
  };

  _createAPI = (method, url, fetchConfig, templateHandler) => (params, content) => {
    if (isFunction(fetchConfig)) {
      fetchConfig = null;
      templateHandler = fetchConfig;
    }

    if (hasTemplate(url) && !isFunction(templateHandler)) {
      templateHandler = doTemplate;
    }

    let restUrl = url;
    if (isFunction(templateHandler)) {
      restUrl = templateHandler(url, params);
    } else {
      content = params;
    }

    return Request.instance[method](restUrl, content);
  };
}

const createAPI = _createAPI;

export default createAPI;
