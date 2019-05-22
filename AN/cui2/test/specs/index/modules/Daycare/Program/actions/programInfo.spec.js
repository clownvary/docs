import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import {
  fetchProgramInfo
} from 'index/modules/Daycare/Program/actions/programInfo';
import {
  PROGRAM_INFO_UI
} from 'index/modules/Daycare/Program/consts/actionTypes';

describe('index/modules/Daycare/Program/actions/programInfo', () => {
  let store = null;

  const initialState = {
    modules: {
      Daycare: {
        Program: {
          programInfo: fromJS({
            sessionFacilities: [],
            ageMinRestriction: [0, 0, 0],
            ageMaxRestriction: [0, 0, 0],
            description: ''
          })
        }
      }
    }
  };


  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchProgramInfo', () => {
    it('Should return expected Action Object.', (done) => {
      store.dispatch(fetchProgramInfo(435)).then(() => {
        expect(helper.isIncluding([
          {
            type: PROGRAM_INFO_UI
          }], store.getActions())).toBeTruthy();
        done();
      });
    });
  });
});
