import { fromJS, is } from 'immutable';
import reducers from 'shared/reducers/helpLink';

describe('shared/reducers/helpLink', () => {
  const getInitialState = () => fromJS({
    data: {}
  });

  it('Return the expected initial state', () => {
    const state = reducers(undefined, {});
    expect(is(getInitialState(), state)).toBe(true);
  });

  it('fetch helpLink success', () => {
    const action = {
      type: 'FETCH_HELP_SUCCESS',
      payload: {
        body: {
          help: {
            help_context_id: '1691',
            html_file_url: 'https://help-vip.qa.aw.dev.activenetwork.com/ActiveNet/17.4/en_US/ActiveNetHelp.htm',
            is_debug_on: false
          }
        }
      }
    };
    const state = reducers(getInitialState(), action);
    expect(state.get('data').help_context_id).toBe('1691');
    expect(state.get('data').is_debug_on).toBe(false);
  });
});
