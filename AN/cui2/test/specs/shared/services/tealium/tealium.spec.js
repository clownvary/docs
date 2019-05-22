import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import { tealiumService } from 'shared/services';
import TealiumPages from 'shared/services/tealium/consts/pages';

let store = null;
let initialState = {
  configurations: fromJS({
    activenet_site: 'ActiveNet',
    organization_name: 'istg',
    version_build: '18.3.1'
  }),
  systemSettings: fromJS({
    user: {
      customerid: 123
    }
  }),
  modules: {
    Cart: {
      ShoppingCart: {
        ordersummary: fromJS({
          data: {
            "activenet_asset_id": [123, 124, 125],
            "activenet_asset_type": ["Package"],
            "activenet_asset_qty": [1, 1, 1],
            "activenet_asset_price": [123.00, 99.99, 23.00]
          }
        })
      },
      Checkout: {
        orderSummary: fromJS({
          data: {
            "activenet_asset_id": [123, 124, 125],
            "activenet_asset_type": ["Package"],
            "activenet_asset_qty": [1, 1, 1],
            "activenet_asset_price": [123.00, 99.99, 23.00]
          }
        })
      },
      Confirmation: {
        receiptSummary: fromJS({
          orderSummary: {
            "activenet_asset_id": [123, 124, 125],
            "activenet_asset_type": ["Package"],
            "activenet_asset_qty": [1, 1, 1],
            "activenet_asset_price": [123.00, 99.99, 23.00],
            "sub_total": 100,
            "taxes": 0,
            "processing_fee": 0,
            "due_now": 100,
            "gift_card_amount": 11
          },
          paymentType: "multipay",
          paymentMethod: ["credit card", "electronic check"],
          receiptNumber: 1001038.006
        })
      }
    }
  }
};

describe('shared/config/tealiumService', () => {
  beforeAll(() => {
    const mockStore = configureStore();
    store = mockStore(initialState);
    tealiumService.initialize(store);
    Object.defineProperties(window, {
      onload: {
        set: (v) => v,
        configurable: true
      }});
  });

  it('should set utag_cfg_ovrd and utag_data with correct value.', () => {
    expect(window.utag_cfg_ovrd).toEqual({ noview: true });
    expect(window.utag_data).toEqual({});
  });

  it('should get correct common value from configurations.', () => {
    expect(tealiumService.getCommonElements()).toEqual({
      activenet_site: 'istg',
      registration_platform: 'activenet',
      enterprise_person_id: 123,
      version_build: ''
    });
  });

  it('should send shoppig cart view sucessfully.', () => {
    tealiumService.sendView(TealiumPages.SHOPPINGCART);
    // expect(window.utag_data).toEqual({});
  });

  it('should send balance view sucessfully.', () => {
    tealiumService.sendView(TealiumPages.BALANCE);
    // expect(window.utag_data).toEqual({});
  });

  it('should send checkout view sucessfully.', () => {
    const viewFunc= jest.fn();
    window.utag = { view: viewFunc};
    tealiumService.sendView(TealiumPages.CHECKOUT);
    // expect(window.utag_data).toEqual({});
    expect(viewFunc).toHaveBeenCalled();
  });

  it('should send confirmation view sucessfully.', () => {
    tealiumService.sendView(TealiumPages.CONFIRMATION);
    // expect(window.utag_data).toEqual({});
  });
});
