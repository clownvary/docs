import AnalyticsServiceBase, { trackLinkEvent, lazyRunFunc } from './serviceBase';
import { GTM_CUSTOM_EVENT } from './constType';

export default class GTMService extends AnalyticsServiceBase {
  constructor(id) {
    super(id);
  }

  _addTransactionCmd(data) {
    const {
      body:
    {
      order_id,
      affiliation,
      revenue_total,
      tax,
      shipping,
      city,
      state,
      country,
      transactions
      }
    } = data;
    const transactionProducts = [];
    /* istanbul ignore next */
    window.dataLayer = window.dataLayer || [];

    transactions.forEach((item) => {
      transactionProducts.push(
        {
          'sku': item.sku,
          'name': item.name,
          'category': item.category,
          'price': item.price,
          'quantity': item.quantity
        }
      );
    });

    dataLayer.push({
      'event':GTM_CUSTOM_EVENT,
      'transactionId': order_id,
      'transactionAffiliation': affiliation,
      'transactionTotal': revenue_total,
      'transactionTax': tax,
      'transactionShipping': shipping,
      'transactionProducts': transactionProducts
    });
  }

  addTransaction(data) {
    lazyRunFunc(() => { this._addTransactionCmd(data) }, { globalVariable: 'dataLayer', count: 0 });
  }

  initialize() {
    /* istanbul ignore next */
    (function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({
      'gtm.start':
      new Date().getTime(), event: 'gtm.js'
    }); var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', this.serviceId);

    const frame =`<iframe src="https://www.googletagmanager.com/ns.html?id=${this.serviceId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    const node = document.createElement('noscript');
    node.innerHTML = frame;
    document.body.insertBefore(node, document.body.firstElementChild);
  }
}
