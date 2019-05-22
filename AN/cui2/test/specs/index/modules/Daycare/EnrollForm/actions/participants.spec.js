import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import {
  selectParticipant,
  fetchParticipants
} from 'index/modules/Daycare/EnrollForm/actions/participants';
import { ErrorObj, ErrorType } from 'react-base-ui/lib/common/error';
import API from 'index/modules/Daycare/EnrollForm/api';
import { mockAPI } from 'react-base-ui/lib/common/restClient/mockAPI';
import helper from 'utils/testHelper';

const receipt = {
  receiptNumber: 0
};

const participants = {
  id: null,
  validId: null,
  list: []
};


describe('index/modules/Daycare/EnrollForm/actions/enrollNow', () => {
  let store = null;
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchParticipants', () => {
    it('works as expect', () =>
      store.dispatch(fetchParticipants()).then(() => {
        expect(store.getActions()[0].type === actionTypes.PARTICIPANTS_UI).toBe(true);
      })
    );
  });

  describe('setParticipant', () => {
    it('works as expect', () => {
      let promise = store.dispatch(selectParticipant(231, 921, 1)).then((response) => {
        const { FEE_SUMMARY_UI_RESET, PARTICIPANT_UI, FORM_ERROR_CLEAN_UI } = actionTypes;
        expect(response.body.reno).toBe(1);
        expect(helper.isIncluding([{ type: FEE_SUMMARY_UI_RESET }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: PARTICIPANT_UI }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: FORM_ERROR_CLEAN_UI }],
          store.getActions())).toBeTruthy();
      });

      promise = promise.then(() => {
        store = mockStore({
          modules: {
            Daycare: {
              EnrollForm: {
                receipt: fromJS(receipt),
                participants: fromJS(participants)
              }
            }
          }
        });

        return new Promise((resolve) => {
          mockAPI([
            {
              path: '/test/json/Daycare/EnrollForm/set_participant.json',
              result: {
                headers: {
                  response_code: '9008',
                  response_message: ''
                },
                body: {
                  reno: 0,
                  errors: [
                    'Gender: Only Males can register for this activity.'
                  ]
                }
              }
            }
          ], () => store.dispatch(selectParticipant(232, 922, 2)).then((e) => {
            const { FEE_SUMMARY_UI_RESET, PARTICIPANT_UI, FORM_ERROR_CLEAN_UI,
              FORM_ERROR_UI } = actionTypes;
            expect(e.type).toBe(ErrorType.SERVICE);
            expect(helper.isIncluding([{ type: FEE_SUMMARY_UI_RESET }],
              store.getActions())).toBeTruthy();
            expect(helper.isIncluding([{ type: PARTICIPANT_UI }],
              store.getActions())).toBeTruthy();
            expect(helper.isIncluding([{ type: FORM_ERROR_CLEAN_UI }],
              store.getActions())).toBeTruthy();
            expect(helper.isIncluding([{ type: FORM_ERROR_UI }],
              store.getActions())).toBeTruthy();
            resolve();
          }));
        });
      });

      promise = promise.then(() => {
        const setParticipantSpy = jest.spyOn(API, 'setParticipant');
        setParticipantSpy.mockImplementationOnce(() => Promise.reject(
          new ErrorObj(ErrorType.APP, 'test', { response: { code: '0022' } })
        ));
        store.dispatch(selectParticipant(3)).catch((e) => {
          expect(e.message.details[0]).toBe('test');
        });
      });

      promise = promise.then(() => new Promise((resolve) => {
        const setParticipantSpy = jest.spyOn(API, 'setParticipant');
        setParticipantSpy.mockImplementationOnce(() => Promise.reject({ testProp: 'test' }));
        store.dispatch(selectParticipant(3)).catch((e) => {
          expect(e.testProp).toBe('test');
          resolve();
        });
      }));

      return promise;
    });
  });
});
