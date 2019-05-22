import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/components/Modals/PinPad/actions/pinpadModal';

describe('index -> Payment -> components -> Modals -> PinPad -> actions -> pinpadModal', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('updateModalTitle should works well', () => {
    const { UPDATE_MODAL_TITLE, updateModalTitle } = actions;
    const param = 'Process Transaction';
    let action = null;

    store.dispatch(updateModalTitle(param));
    action = store.getActions()[0];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(UPDATE_MODAL_TITLE);
    expect(action.payload).toEqual({
      title: param
    });
  });

  it('showModal should works well', () => {
    const { OPEN_OR_HIDE_MODAL, showModal } = actions;
    const param = true;
    let action = null;

    store.dispatch(showModal(param));
    action = store.getActions()[0];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(OPEN_OR_HIDE_MODAL);
    expect(action.payload).toEqual({
      shown: param
    });
  });

  it('setApdInterfaceApplet should works well', () => {
    const { SET_APD_INTERFACE_APPLET, setApdInterfaceApplet } = actions;
    const param = {};
    let action = null;

    store.dispatch(setApdInterfaceApplet(param));
    action = store.getActions()[0];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_APD_INTERFACE_APPLET);
    expect(action.payload).toEqual({
      value: param
    });
  });
});
