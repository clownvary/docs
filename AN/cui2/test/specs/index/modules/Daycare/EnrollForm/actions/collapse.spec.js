import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import {
  expandSection,
  expandMultipleSections,
  collapseSection,
  resetCollapseSections
} from 'index/modules/Daycare/EnrollForm/actions/collapse';
import {
  SECTION_EXPAND_UI,
  MULTIPLE_SECTIONS_EXPAND_UI,
  SECTION_COLLAPSE_UI,
  SECTION_COLLAPSE_UI_RESET
} from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import { SESSIONS, ENROLL_DETAIL } from 'index/modules/Daycare/EnrollForm/consts/sectionName';

describe('index/modules/Daycare/EnrollForm/actions/collapse', () => {
  let store = null;

  const initialState = {
    modules: {
      Daycare: {
        EnrollForm: {
          collapse: fromJS({
            collapseSections: [SESSIONS],
            disableSections: [SESSIONS]
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

  describe('expandMultipleSections', () => {
    it('Should return expected Action Object.', (done) => {
      store.dispatch(expandMultipleSections([SESSIONS, ENROLL_DETAIL]));
      expect(helper.isIncluding([{ type: MULTIPLE_SECTIONS_EXPAND_UI }],
        store.getActions())).toBeTruthy();
      done();
    });
  });

  describe('expandSection', () => {
    it('Should return expected Action Object.', (done) => {
      store.dispatch(expandSection(SESSIONS));
      expect(helper.isIncluding([{ type: SECTION_EXPAND_UI }],
        store.getActions())).toBeTruthy();
      done();
    });
  });

  describe('collapseSection', () => {
    it('Should return expected Action Object.', (done) => {
      store.dispatch(collapseSection(SESSIONS));
      expect(helper.isIncluding([{ type: SECTION_COLLAPSE_UI }],
        store.getActions())).toBeTruthy();
      done();
    });
  });

  describe('resetCollapseSections', () => {
    it('Should return expected Action Object.', (done) => {
      store.dispatch(resetCollapseSections());
      expect(helper.isIncluding([{ type: SECTION_COLLAPSE_UI_RESET }],
        store.getActions())).toBeTruthy();
      done();
    });
  });
});
