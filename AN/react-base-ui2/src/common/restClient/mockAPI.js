import find from 'lodash/find';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isPromise from '../../utils/isPromise';

let mockedData = [];
let callRecords = {};

 /* istanbul ignore next */
window.__API_Hook__ = (path) => {
  const time = (callRecords[path] || 0) + 1;
  callRecords[path] = time;

  const data = find(mockedData, { path, time }) || find(mockedData, { path });
  const result = data ? data.result : data;

  if (result) {
    console.warn(`Matching API Hook on path: ${path} (${time}) times`);
  }

  return result;
};

/** Explicily clean up the API hooks
 *
 */
const cleanMock = () => {
  mockedData = [];
  callRecords = {};
};

/** Mock up a batch of API calls
 * @param {Array} - data An array of API matching rule and result data
 *
 * Parameter data can be an object or an array of objects that define the matching
 * rules and mocked result.
 * The object has format as below:
 * {
 *  path: '/json/Cart/loadReservationCart.json',
 *  time: 2,
 *  result: { headers: {}, body: {}}
 * }
 *
 * in which,
 * - path: Path to match. We use strict matching.
 * - time: Optional. Not mean date time, but how many times the API is called.
 * - result: An object with headers & body which follow our response format from
 * server or a redirected path to a new JSON file.
 *
 * @param {Function} - caseCaller An callback function, it will help to call cleanMock at the
 * end of promise chain.
 *
 * For example(have caseCaller):
 * ```js
 * mockAPI({
 *   path: 'json/Cart/Checkout/get_agreement.json',
 *   result: 'json/Cart/Checkout/get_agreement_error.json'
 * }, () => store.dispatch(getAgreementAsyncAction()).catch((e) => {
 *   //...
 *   done();
 * }));
 * ```
 *
 * For example(no caseCaller):
 * ```js
 * mockAPI({
 *   path: 'json/Cart/Checkout/get_agreement.json',
 *   result: 'json/Cart/Checkout/get_agreement_error.json'
 * });
 *
 * store.dispatch(getAgreementAsyncAction()).catch((e) => {
 *   //...
 *   cleanMock();
 *   done();
 * }));
 * ```
 *
 */
const mockAPI = (data, caseCaller) => {
  mockedData = isArray(data) ? data : [data];
  callRecords = {};

  if (caseCaller && isFunction(caseCaller)) {
    const promise = caseCaller();

    isPromise(promise) && promise.then(cleanMock).catch((e) => {
      cleanMock();
      return Promise.reject(e);
    });
  }
};

export {
  mockAPI,
  cleanMock
};

export default mockAPI;
