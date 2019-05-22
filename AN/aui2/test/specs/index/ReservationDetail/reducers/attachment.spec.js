import { is, fromJS } from 'immutable';
import {
  FETCH_ATTACHMENTS,
  DELETE_ATTACHMENT
} from 'index/ReservationDetail/consts/actionTypes';
import reducers from 'index/ReservationDetail/reducers/attachment';

const initialState = fromJS({
  attachedFiles: []
});

const data = [{
  display_name: '121B342B 18k.PNG',
  file_type: 'png',
  uploadedfile_id: 'CA8E0D8D07',
  upload_date: '2018 Mar 19 2:54 PM',
  file_size: '17.49kb'
}];

const attached_files = {
  attached_files: data
};

const attachedFiles = {
  attachedFiles: data
};

describe('index/ReservationDetail/reducers/attachment', () => {
  it('Return the expected initial state', () => {
    const state = reducers(undefined, {});
    expect(is(initialState, state)).toBe(true);
  });

  it('Should FETCH_ATTACHMENTS info work fine', () => {
    const state = reducers(initialState, {
      type: FETCH_ATTACHMENTS,
      payload: { body: attached_files }
    });

    expect(state.toJS()).toEqual(attachedFiles);
  });

  it('Should DELETE_ATTACHMENT info work fine', () => {
    const state = reducers(fromJS(attachedFiles), {
      type: DELETE_ATTACHMENT,
      payload: 'CA8E0D8D07'
    });
    expect(state.toJS()).toEqual({ attachedFiles: [] });
  });
});
