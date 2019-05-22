
import { mockAPI, cleanMock } from 'src/common/restClient/mockAPI';
import isFunction from 'lodash/isFunction';


describe('mockAPI', () => {
  it('init mockAPI well', () => {
    cleanMock();
    mockAPI({
      path: '/json/Payment/accountholder.json',
      result: {
        headers: {
          response_code: '0050',
          response_message: 'unknown error'
        }
      }
    });
    expect(isFunction(mockAPI)).toBeTruthy();
  });

  it('cleanMock works well', () => {
    mockAPI([{
      path: '/json/Payment/accountholder.json',
      result: {
        headers: {
          response_code: '0050',
          response_message: 'unknown error'
        }
      }
    }], () => new Promise(() => { throw new Error(); }, () => 'reject'));
    expect(isFunction(cleanMock)).toBeTruthy();
  });
});
