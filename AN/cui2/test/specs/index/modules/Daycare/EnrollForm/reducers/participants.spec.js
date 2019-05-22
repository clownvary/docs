import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import participantsReducer from 'index/modules/Daycare/EnrollForm/reducers/participants';

describe('index/modules/Daycare/Program/reducers/sessions', () => {
  const initialState = fromJS({
    id: null,
    list: []
  });

  it('Should return the expected initial state', () => {
    expect(is(initialState, participantsReducer(undefined, {}))).toBeTruthy();
  });

  it('Should handle PARTICIPANTS_UI correctly', () => {
    const { PARTICIPANTS_UI } = actionTypes;

    const participants = [
      {
        id: 1,
        name: 'Bo Xu',
        validation_msg: null
      },
      {
        id: 2,
        name: 'Flora1 Xu',
        validation_msg: 'Does not meet gender qualification.'
      }
    ];

    let newState = participantsReducer(initialState, {
      type: PARTICIPANTS_UI,
      payload: {
        participants
      }
    });

    expect(newState.toJS().list).toEqual(participants);

    newState = participantsReducer(newState, {
      type: PARTICIPANTS_UI,
      payload: { participants: null }
    });

    expect(newState.toJS().list).toEqual(participants);
  });

  it('Should handle PARTICIPANT_UI correctly', () => {
    const { PARTICIPANT_UI } = actionTypes;

    const participantId = 1;
    const newState = participantsReducer(initialState, {
      type: PARTICIPANT_UI,
      payload: {
        participantId
      }
    });

    expect(newState.toJS().id).toEqual(participantId);
  });
});
