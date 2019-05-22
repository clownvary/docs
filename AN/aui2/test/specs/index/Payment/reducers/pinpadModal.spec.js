import { is, fromJS } from 'immutable';
import getPinpadReducer, { pinpadModal as pinpadModalReducer } from 'index/Payment/components/Modals/PinPad/reducers/pinpadModal';
import * as actions from 'index/Payment/components/Modals/PinPad/actions/pinpadModal';

const expectedInitialState = fromJS({
  shown: false,
  title: 'Processing Transaction'
});

const pinpadReducer = getPinpadReducer(__payment__.__initialState__);

describe('index -> Payment -> components -> Modals -> PinPad -> reducers -> pinpadModal', () => {
  it('Should return the expected initial state', () => {
    const pinpadState = pinpadReducer(undefined, {});
    expect(pinpadState.pinpadModal.toJS()).toEqual({
      title: "Processing Transaction",
      shown: false
    });
    expect(pinpadState.pinpadFail.toJS()).toEqual({
      shown: false
    })
    expect(pinpadState.payment.toJS()).toEqual({
      receiptHeaderId: -1,
      agentId: -1,
      isRefund: false,
      currentPayIndex: -1,
      promptMessage: "",
      isNewCard: false,
      webStartServicehelpURL: "/Install_the_ACTIVENet_Workstation_Service.htm",
      cardHolderInfo: "",
      pays: [],
      communicating: false,
      debitCardId: -1,
      companyId: -1,
      customerId: -1,
      apdAppletInfo: null,
      errorMessage: "",
      apdPaymentInfo: null
    })
    expect(is(expectedInitialState, pinpadModalReducer(undefined, {}))).toBe(true);
  });

  it('Should update the pinpad modal status correctly', () => {
    const { OPEN_OR_HIDE_MODAL } = actions;

    const state = pinpadModalReducer(undefined, {
      type: OPEN_OR_HIDE_MODAL,
      payload: {
        shown: true
      }
    });

    expect(state.get('shown')).toBe(true);
  });

  it('Should update the pinpad modal title correctly', () => {
    const { UPDATE_MODAL_TITLE } = actions;
    const title = 'Transaction Fail';
    const state = pinpadModalReducer(undefined, {
      type: UPDATE_MODAL_TITLE,
      payload: {
        title
      }
    });

    expect(state.get('title')).toBe(title);
  });

  it('Should save the device object correctly', () => {
    const { SET_APD_INTERFACE_APPLET } = actions;
    const deviceObject = {
      APDInputStart: jest.fn(),
      APDInputEnd: jest.fn(),
      init: jest.fn()
    };

    const state = pinpadModalReducer(undefined, {
      type: SET_APD_INTERFACE_APPLET,
      payload: {
        value: deviceObject
      }
    });

    expect(state.get('apdInterfaceApplet')).toEqual(deviceObject);
  });
});
