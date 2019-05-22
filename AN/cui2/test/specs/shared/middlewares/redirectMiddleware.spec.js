import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import { ActionType } from 'react-base-ui/lib/middlewares/actions';
import { ErrorObj, ErrorType } from 'react-base-ui/lib/common/error';
import { Message, MessageType } from 'react-base-ui/lib/common/message';

describe('shared/middlewares/redirectMiddleware', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      systemSettings: fromJS({
        login_url: 'https://www.baidu.com'
      })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Pass in all kinds of actions should work as expected.', () => {
    it('Should delivery to next middleware directly without any process if the action is a thunk.', () => {
      const action = () => ({
        error: true,
        type: ActionType.BASE_REPORT_ERROR_ACTION,
        payload: {}
      });
      expect(store.dispatch(action)).toEqual(action());
    });

    it('Should delivery to next middleware directly without any process if the action is no error property or error is false.', () => {
      const action = {
        type: ActionType.BASE_REPORT_ERROR_ACTION,
        payload: {}
      };
      expect(store.dispatch(action)).toEqual(action);
    });

    it('Should delivery to next middleware directly without any process if action.payload is not ErrorObj.', () => {
      const action = {
        error: true,
        type: ActionType.BASE_REPORT_ERROR_ACTION,
        payload: {}
      };
      expect(store.dispatch(action)).toEqual(action);
    });

    /* HTTP error will be handled by system. Need to confirm with bill
        it('Should delivery to next middleware directly without any process if error type is not SERVICE.', () => {
            const message = new Message(MessageType.ERROR, '', 'HTTP Error');
            const action = {
              error: true,
              type: ActionType.BASE_REPORT_ERROR_ACTION,
              payload: new ErrorObj(ErrorType.HTTP, message, {
                response: {
                  code: '404'
                }
              })
            };
            expect(store.dispatch(action)).toEqual(action);
        });
    */

    it('Should delivery to next middleware directly without any process if error code is not 0002.', () => {
      const message = new Message(MessageType.ERROR, 'Unknown error!', 'Service Error');
      const action = {
        error: true,
        type: ActionType.BASE_REPORT_ERROR_ACTION,
        payload: new ErrorObj(ErrorType.SERVICE, message, {
          response: {
            code: '9999'
          }
        })
      };
      expect(store.dispatch(action)).toEqual(action);
    });

    it('Should return false if meet the condition of session time out.', () => {
      const message = new Message(MessageType.ERROR, 'Session time out!', 'Service Error');
      const action = {
        error: true,
        type: ActionType.BASE_REPORT_ERROR_ACTION,
        payload: new ErrorObj(ErrorType.SERVICE, message, {
          response: {
            code: '0002'
          }
        })
      };
      expect(store.dispatch(action)).toEqual(false);
    });

    it('Should return false if meet the condition of user not login.', () => {
      const message = new Message(MessageType.ERROR, '', 'Service Error');
      const action = {
        error: true,
        type: ActionType.BASE_REPORT_ERROR_ACTION,
        payload: new ErrorObj(ErrorType.SERVICE, message, {
          response: {
            code: '0021'
          }
        })
      };
      expect(store.dispatch(action)).toEqual(false);
    });
  });
});
