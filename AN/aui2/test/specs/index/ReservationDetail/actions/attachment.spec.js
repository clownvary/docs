import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/ReservationDetail/actions/attachment';

const initialData = {
  permitID: '1111111'
};
const mockData = {
  attached_files: [{
    display_name: '121B342B 18k.PNG',
    file_type: 'png',
    uploadedfile_id: 'CA8E0D8D07',
    upload_date: '2018 Mar 19 2:54 PM',
    file_size: '17.49kb'
  }]
};

describe('index -> ReservationDetail -> actions -> attachment', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  test('fetchAttachments method should works fine', () => {
    const { fetchAttachments } = actions;

    return store.dispatch(fetchAttachments())
      .then(({ payload: { headers, body } }) => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
        expect(body).toEqual(mockData);
      });
  });

  test('deleteAttachment method should works fine', () => {
    const { deleteAttachment } = actions;

    return store.dispatch(deleteAttachment())
      .then(({ payload: { headers } }) => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
      });
  });

  it('removeAttachedFile should work fine', () => {
    const { removeAttachedFile } = actions;

    store.dispatch(removeAttachedFile());
    const action = store.getActions()[0];

    expect(typeof action).toBe('object');
    expect(action.type).toBe('DELETE_ATTACHMENT');
  });
});
