import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import fetchHelpLink from 'shared/actions/helpLink';

describe('shared/actions/helpLink', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  const mockData = {
    help: {
      help_context_id: '1691',
      html_file_url: 'https://help-vip.qa.aw.dev.activenetwork.com/ActiveNet/17.4/en_US/ActiveNetHelp.htm',
      is_debug_on: false
    }
  };

  it('fetchHelpLink action should works fine', () => {
    store.dispatch(fetchHelpLink('Permit.jsp'))
      .then(({ payload: { headers, body } }) => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(1);
        expect(storeActions[0].type).toBe('FETCH_HELP_SUCCESS');
        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
        expect(body).toEqual(mockData);
      });
  });
});
