import find from 'lodash/find';
import isArray from 'lodash/isArray';

let mockedData = [];
let callRecords = {};

window.__API_Hook__ = function(path){
  const time = (callRecords[path] || 0) + 1;
  callRecords[path] = time;

  const data = find(mockedData, {path, time}) || find(mockedData, {path});
  const result = data ? data['result'] : data;

  if (result){
    console.warn('Matching API Hook on path: ' + path + ' (' + time + ') times');
  }
  
  return result;
}

/** Mock up a batch of API calls
 * @param data An array of API matching rule and result data
 * 
 * Parameter data can be an object or an array of objects that define the matching rules and mocked result.
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
 * - result: An object with headers & body which follow our response format from server or a redirected path to a new JSON file.
 */
const mockAPI = (data) => {
  mockedData = isArray(data) ? data : [data];
  callRecords = {};
}

/** Explicily clean up the API hooks
 * 
 */
const cleanMock = () => {
  mockedData = [];
  callRecords = {};
}

export {
  mockAPI,
  cleanMock
};

export default mockAPI
