import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  SECTION_EXPAND_UI,
  MULTIPLE_SECTIONS_EXPAND_UI,
  SECTION_COLLAPSE_UI,
  SECTION_COLLAPSE_UI_RESET
} from '../consts/actionTypes';
import { SESSIONS, ENROLL_DETAIL } from '../consts/sectionName';

const initialState = fromJS({
  collapseSections: [SESSIONS, ENROLL_DETAIL],
  disableSections: [SESSIONS, ENROLL_DETAIL]
});

const handlers = {
  [SECTION_COLLAPSE_UI](state, { payload: { name, disable } }) {
    const collapseSections = state.get('collapseSections');
    const disableSections = state.get('disableSections');
    return state.withMutations((s) => {
      collapseSections.indexOf(name) === -1 &&
      s.set('collapseSections', collapseSections.push(name));
      disable && disableSections.indexOf(name) === -1 &&
      s.set('disableSections', disableSections.push(name));
    });
  },

  [SECTION_EXPAND_UI](state, { payload: { name } }) {
    return state.withMutations((s) => {
      s.update('collapseSections', collapseSections =>
        collapseSections.filter(section => section !== name));
      s.update('disableSections', disableSections =>
        disableSections.filter(section => section !== name));
    });
  },

  [MULTIPLE_SECTIONS_EXPAND_UI](state, { payload: { names } }) {
    return state.withMutations((s) => {
      s.update('collapseSections', collapseSections =>
        collapseSections.filter(section => names.indexOf(section) < 0));
      s.update('disableSections', disableSections =>
        disableSections.filter(section => names.indexOf(section) < 0));
    });
  },

  [SECTION_COLLAPSE_UI_RESET]() {
    return initialState;
  }
};

export default reducerHandler(initialState, handlers);
