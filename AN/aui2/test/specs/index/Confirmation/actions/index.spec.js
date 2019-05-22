import configurateStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Confirmation/actions';

describe('index/Confirmation/actions/index', () => {
  it('Should resize method work fine', () => {
    const mockStore = configurateStore(middlewares);
    const store = mockStore({});

    const bodyHeight = 800;
    store.dispatch(actions.resize(bodyHeight));
    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type === actions.WINDOW_RESIZE));
    expect(storeActions[0].payload.value).toBe(bodyHeight);
  });
});
