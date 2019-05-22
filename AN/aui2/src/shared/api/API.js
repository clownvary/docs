import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import has from 'lodash/has';
import fetch from 'isomorphic-fetch';
import serializeData from 'shared/utils/serialize';

import parseResponse from './parseResponse';
import processHeaders, { defaultPageInfo } from './headersService';

// TODO fallback to use ES5 to create a customize error, because
// accroding to to BABEL parse the error instanceof RequestError always return false
export function RequestError(payload, message) {
  Error.call(this, message);
  this.name = 'RequestError';
  this.message = message || 'Request Error';
  this.payload = payload;
}

RequestError.prototype = new Error();
RequestError.prototype.constructor = RequestError;

export default class API {
  constructor() {
    ['get', 'post', 'put', 'patch', 'delete', 'head'].forEach((method) => {
      this[method] = (path, { headers = {}, body = undefined } = {}) =>
        new Promise((resolve, reject) => {
          /* istanbul ignore next */
          const requestBody = __STATIC__ ? undefined : body;
          /* istanbul ignore next */
          const requestMethod = __STATIC__ ? 'get' : method;
          let requestPath = path;

          const fetchConfig = {
            method: requestMethod,
            headers: processHeaders(headers),
            credentials: 'include'
          };

          let params = requestBody;
          const contentType = fetchConfig.headers['Content-Type'];
          if (contentType !== 'application/json') {
            params = serializeData(requestBody);
          }

          if ((requestMethod !== 'get' && requestMethod !== 'delete') || contentType === 'application/json') {
            fetchConfig.body = params;
          } else {
            /* istanbul ignore next */
            const paramsString = params ? `${params}&` : '';
            requestPath =
              `${path}${path.indexOf('?') > -1 ? '&' : '?'}${paramsString}ui_random=${new Date().getTime()}`;
          }
          /* istanbul ignore else */
          if (__TESTING__) {
            if (window.__API_Hook__ && isFunction(window.__API_Hook__)) {
              const result = window.__API_Hook__(path);
              if (isPlainObject(result) && has(result, 'headers')) {
                const succ = parseResponse(result.headers);
                if (succ) {
                  return resolve({
                    payload: result
                  });
                }
                return reject(new RequestError(result));
              } else if (isString(result)) {
                path = result;
              }
            }

            const leading = path.substr(0, 1) === '/';
            requestPath = `http://${__TESTINGHOST__}:${__TESTINGPORT__}/test${leading ? '' : '/'}${path}`;
          }
          return fetch(requestPath, fetchConfig).then(
            (/* istanbul ignore next */response = {}) => {
              const { status, statusText, ok } = response;

              if (ok) {
                const respContentType = response.headers.get('content-type');

                /* istanbul ignore if */
                if (/application\/pdf/.test(respContentType)) {
                  const contentDisposition = response.headers.get('content-disposition');
                  const filename = contentDisposition.match(/"(.*)"/)[1];
                  response.blob().then((blob) => {
                    resolve({
                      payload: {
                        blob,
                        filename
                      }
                    });
                  });
                } else {
                  response.json().then(({ headers: responseHeaders, body: responseBody }) => {
                    responseHeaders.page_info = Object.assign(
                      {},
                      defaultPageInfo,
                      responseHeaders.page_info
                    );

                    const success = parseResponse(responseHeaders);
                    /* istanbul ignore else */
                    if (success) {
                      resolve({
                        payload: {
                          headers: responseHeaders,
                          body: responseBody
                        }
                      });
                    } else {
                      /* istanbul ignore next */
                      if (__STATIC__ || __DEV__) {
                        console.log(`****** fail to fetch ${requestPath}`, responseHeaders);
                      }
                      reject(new RequestError({
                        headers: responseHeaders,
                        body: responseBody
                      }));
                    }
                  });
                }
              } else {
                /* istanbul ignore next */
                if (__STATIC__ || __DEV__) {
                  console.log(`****** fail to fetch ${requestPath}`, statusText);
                }
                reject(new RequestError({
                  headers: {
                    response_code: status,
                    response_message: statusText
                  }
                }));
              }
            },
            /* istanbul ignore next */
            (error = {}) => {
              /* istanbul ignore next */
              if (__STATIC__ || __DEV__) {
                console.log(`****** fail to fetch ${requestPath}`, error);
              }
              reject(new RequestError({
                headers: {
                  response_code: error.code,
                  response_message: error.message
                }
              }));
            }
          );
        });
    });
  }
}
