import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import collapseReducer from 'index/modules/Daycare/EnrollForm/reducers/collapse';
import { PARTICIPANT, SESSIONS, ENROLL_DETAIL } from 'index/modules/Daycare/EnrollForm/consts/sectionName';

describe('index/modules/Daycare/EnrollForm/reducers/collapse', () => {
  const initialState = fromJS({
    collapseSections: [SESSIONS, ENROLL_DETAIL],
    disableSections: [SESSIONS, ENROLL_DETAIL]
  });

  it('Should return the expected initial state', () => {
    const { SECTION_COLLAPSE_UI_RESET } = actionTypes;
    expect(is(initialState, collapseReducer(undefined, {}))).toBeTruthy();
    expect(is(initialState, collapseReducer(initialState, { type: SECTION_COLLAPSE_UI_RESET }))).toBeTruthy();
  });

  it('Should expand and enable section correctly', () => {
    const { SECTION_EXPAND_UI } = actionTypes;

    const returnState = collapseReducer(initialState, {
      type: SECTION_EXPAND_UI,
      payload: { name: SESSIONS }
    });
    const expectState = fromJS({
      collapseSections: [ENROLL_DETAIL],
      disableSections: [ENROLL_DETAIL]
    });
    expect(is(expectState, returnState)).toBeTruthy();
  });

  it('Should collapse section correctly', () => {
    const { SECTION_COLLAPSE_UI } = actionTypes;

    const returnState1 = collapseReducer(initialState, {
      type: SECTION_COLLAPSE_UI,
      payload: { name: SESSIONS }
    });
    const expectState1 = initialState;
    expect(is(expectState1, returnState1)).toBeTruthy();

    const returnState2 = collapseReducer(returnState1, {
      type: SECTION_COLLAPSE_UI,
      payload: { name: PARTICIPANT, disable: true }
    });
    const expectState2 = expectState1
      .update('collapseSections', collapseSections => collapseSections.push(PARTICIPANT))
      .update('disableSections', disableSections => disableSections.push(PARTICIPANT));
    expect(is(expectState2, returnState2)).toBeTruthy();
  });

  it('Should expand multiple sections correctly', () => {
    const { MULTIPLE_SECTIONS_EXPAND_UI } = actionTypes;

    const returnState = collapseReducer(initialState, {
      type: MULTIPLE_SECTIONS_EXPAND_UI,
      payload: { names: [SESSIONS, ENROLL_DETAIL] }
    });
    const expectState = fromJS({
      collapseSections: [],
      disableSections: []
    });
    expect(is(expectState, returnState)).toBeTruthy();
  });
});
