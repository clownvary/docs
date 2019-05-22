import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import {
  fetchEnrollNow
} from 'index/modules/Daycare/Program/actions/enrollNow';
import API from 'index/modules/Daycare/Program/api';
import { mockAPI } from 'react-base-ui/lib/common/restClient/mockAPI';

describe('index/modules/Daycare/Program/actions/enrollNow', () => {
  let store = null;
  const mockStore = configureStore(middlewares);

  beforeAll(() => {
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/init'
    });
  });

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchEnrollNow', () => {
    it('works as expect', () => {
      let promise = store.dispatch(fetchEnrollNow()).then(() => {
        expect(store.getActions()[0].payload.method === 'push').toBe(true);
      });

      promise = promise.then(() => {
        store = mockStore({
          systemSettings: fromJS({ login_url: '/test' })
        });

        return new Promise((resolve) => {
          mockAPI([
            {
              path: '/test/json/Daycare/Program/get_enroll_now.json',
              result: {
                headers: {
                  response_code: '0021',
                  response_message: 'User not login'
                }
              }
            }
          ], () => store.dispatch(fetchEnrollNow()).catch(() => {
            expect(store.getActions().length).toBe(0);
            resolve();
          }));
        });
      });

      promise = promise.then(() => new Promise((resolve) => {
        mockAPI([
          {
            path: '/test/json/Daycare/Program/get_enroll_now.json',
            result: {
              headers: {
                response_code: '0021'
              }
            }
          }
        ], () => store.dispatch(fetchEnrollNow()).catch(() => {
          expect(store.getActions().length).toBe(0);
          resolve();
        }));
      }));

      promise = promise.then(() => new Promise((resolve) => {
        store = mockStore({ systemSettings: fromJS({}) });
        mockAPI([
          {
            path: '/test/json/Daycare/Program/get_enroll_now.json',
            result: {
              headers: {
                response_code: '0021'
              }
            }
          }
        ], () => store.dispatch(fetchEnrollNow()).catch(() => {
          expect(store.getActions().length).toBe(0);
          resolve();
        }));
      }));

      promise = promise.then(() => new Promise((resolve) => {
        mockAPI([
          {
            path: '/test/json/Daycare/Program/get_enroll_now.json',
            result: {
              headers: {
                response_code: '0022'
              }
            }
          }
        ], () => store.dispatch(fetchEnrollNow()).catch(() => {
          expect(store.getActions().length).toBe(0);
          resolve();
        }));
      }));

      promise = promise.then(() => new Promise((resolve) => {
        const getEnrollNowSpy = jest.spyOn(API, 'getEnrollNow');
        getEnrollNowSpy.mockImplementationOnce(() => Promise.reject());
        mockAPI([
          {
            path: '/test/json/Daycare/Program/get_enroll_now.json',
            result: {
              headers: {
                response_code: '0022'
              }
            }
          }
        ], () => store.dispatch(fetchEnrollNow()).catch(() => {
          expect(store.getActions().length).toBe(0);
          resolve();
        }));
      }));

      return promise;
    });
  });
});
