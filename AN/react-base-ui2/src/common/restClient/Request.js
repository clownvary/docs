import fetch from 'isomorphic-fetch';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import has from 'lodash/has';
import { Message, MessageType } from '../message';
import { pageLoading } from '../../services/loading';
import * as HttpContentType from './consts/HttpContentType';
import toQueryString from '../../utils/toQueryString';
import processHeaders from './processHeaders';
import Response from './Response';
import { ErrorObj, ErrorType } from '../error';

/* istanbul ignore next */
const parseResponse = (jsonResponse, path) => {
  const response = new Response(jsonResponse);
  pageLoading.hide();
  if (response.success) {
    return Promise.resolve(response);
  }

  const msgGroup = new Message(MessageType.ERROR, response.message, 'Service Error');
  return Promise.reject(new ErrorObj(ErrorType.SERVICE, msgGroup, {
    code: response.code,
    url: path,
    response
  }));
};

export default class Request {

  static instance = new Request()

  constructor() {
    ['get', 'post', 'put', 'patch', 'delete', 'head'].forEach((method) => {
      this[method] = (path, data) => {
        let headers = {};
        let body;
        if (data) {
          if (data.body) {
            headers = data.headers || {};
            body = data.body;
          } else {
            body = data;
          }
        }

        const fetchConfig = {
          method,
          headers: processHeaders(method, headers),
          credentials: 'include'
        };
        /* istanbul ignore next */
        if (!__STATIC__) {
          let params = body;
          if (fetchConfig.headers['Content-Type'] !== HttpContentType.JSON) {
            params = toQueryString(body);
          }

          if (method !== 'get' && method !== 'delete') {
            fetchConfig.body = JSON.stringify(params);
          } else {
            const paramsString = params ? `${params}&` : '';
            path = `${path}${path.indexOf('?') !== -1 ? '&' : '?'}${paramsString}ui_random=${new Date().getTime()}`;
          }
        }

        pageLoading.show();
        /* istanbul ignore next */
        if (__TESTING__) {
          if (window.__API_Hook__ && isFunction(window.__API_Hook__)) {
            const result = window.__API_Hook__(path);
            if (isPlainObject(result) && has(result, 'headers')) {
              return parseResponse(result, path);
            } else if (isString(result)) {
              path = result;
            }

            const leading = path.substr(0, 1) === '/';
            // eslint-disable-next-line
            path = `http://${__TESTINGHOST__}:${__TESTINGPORT__}${leading ? '' : '/'}${path}`;
          }
        }
        /* istanbul ignore next */
        return fetch(path, fetchConfig)
          .then((httpResponse = {}) => {
            const { status, statusText = '', ok } = httpResponse;
            if (ok) {
              return httpResponse.json();
            }
            pageLoading.hide();
            const msgGroup = new Message(MessageType.ERROR, statusText, 'HTTP Error');
            return Promise.reject(new ErrorObj(ErrorType.HTTP, msgGroup, {
              code: status,
              url: path,
              response: httpResponse
            }));
          })
          .then(jsonResponse => parseResponse(jsonResponse, path));
      };
    });
  }
}
