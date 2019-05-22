import isNumber from 'lodash/isNumber';
import isBoolean from 'lodash/isBoolean';
import isArray from 'lodash/isArray';
import entries from 'lodash/entries';
import TealiumPages from './consts/pages';

export default class Tealium {
  initialize(store) {
    this.store = store;
    window.utag_cfg_ovrd = { noview: true };
    window.utag_data = {};
  }

  /**
   * Pick out common elements:
   *  'activenet_site', 'registration_platform', 'version_build'.etc.
   * @param  {Object} elements set.
   */
  getCommonElements() {
    const {
      organization_name: activenet_site
    } = this.store.getState().configurations.toJS();
    const {
      user: { customerid : enterprise_person_id}
    } = this.store.getState().systemSettings.toJS();

    return {
      activenet_site,
      enterprise_person_id,
      registration_platform: "activenet",
      version_build: window.__version || ""
    };
  }

  convertData(data) {
    const convertValue = (value) => {
      if(isNumber(value) || isBoolean(value)) {
        return value.toString();
      }
      if(isArray(value)) {
        return value.map(v => convertValue(v));
      }
      return value;
    };
    return entries(data).map(item => {
      const value = convertValue(item[1]);
      return [item[0], value];
    }).reduce((res, item) => {
      res[item[0]] = item[1] || '';
      return res;
    }, {});
  }

  /**
   * Format data by the requirement of tealium doc and
   * then Call utag.view() to send data.
   */
  sendView(pageName) {
    const { modules: {
      Cart: {
      ShoppingCart,
      Checkout,
      Confirmation,
      Balance
    } } } = this.store.getState();
    const spctOrderSummary = ShoppingCart.ordersummary.get('data').toJS();
    let newUtagData = { ...this.getCommonElements() };

    switch (pageName) {
      case TealiumPages.SHOPPINGCART:

        newUtagData = {
          ...newUtagData,
          activenet_asset_id: spctOrderSummary['activenet_asset_id'],
          activenet_asset_price: spctOrderSummary['activenet_asset_price'],
          activenet_asset_qty: spctOrderSummary['activenet_asset_qty'],
          activenet_asset_type: spctOrderSummary['activenet_asset_type'],
          event_tracking: "review and payment"
        };
        break;
      case TealiumPages.CHECKOUT:
        const ctOrderSummary = Checkout.orderSummary.get('data').toJS();

        newUtagData = {
          ...newUtagData,
          activenet_asset_id: ctOrderSummary['activenet_asset_id'],
          activenet_asset_price: ctOrderSummary['activenet_asset_price'],
          activenet_asset_qty: ctOrderSummary['activenet_asset_qty'],
          activenet_asset_type: ctOrderSummary['activenet_asset_type'],
          event_tracking: "checkout"
        };
        break;
      case TealiumPages.CONFIRMATION:
        const confOrderSummary = Confirmation.receiptSummary.get('orderSummary').toJS();
        const confPaymentType = Confirmation.receiptSummary.get('paymentType');
        const confPaymentMethod = Confirmation.receiptSummary.get('paymentMethod');
        const confReceiptNumber = Confirmation.receiptSummary.get('receiptNumber');

        newUtagData = {
          ...newUtagData,
          activenet_asset_id: confOrderSummary['activenet_asset_id'],
          activenet_asset_price: confOrderSummary['activenet_asset_price'],
          activenet_asset_qty: confOrderSummary['activenet_asset_qty'],
          activenet_asset_type: confOrderSummary['activenet_asset_type'],
          gift_certificate: confOrderSummary['gift_card_amount'],
          taxes: confOrderSummary['taxes'],
          fees: confOrderSummary['processing_fee'],
          subtotal: confOrderSummary['sub_total'],
          total: confOrderSummary['due_now'],
          order_id: confReceiptNumber,
          payment_type: confPaymentType,
          payment_method: confPaymentMethod,
          currency: "USD",
          page_name: "Confirmation",
          event_tracking: "order confirmation"
        };
        break;
      case TealiumPages.BALANCE:
        newUtagData = {
          ...newUtagData,
          activenet_asset_id: spctOrderSummary['activenet_asset_id'],
          activenet_asset_price: spctOrderSummary['activenet_asset_price'],
          activenet_asset_qty: spctOrderSummary['activenet_asset_qty'],
          activenet_asset_type: spctOrderSummary['activenet_asset_type'],
          event_tracking: "edit outstanding balances"
        };
        break;
    }
    /* istanbul ignore next */
    window.utag && window.utag.view && window.utag.view(this.convertData(newUtagData));
  }
}
