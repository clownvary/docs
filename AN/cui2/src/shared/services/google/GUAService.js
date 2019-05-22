import { SERVICE_TYPE } from './constType';
import AnalyticsServiceBase, { trackLinkEvent, lazyRunFunc } from './serviceBase';

export default class GUAService extends AnalyticsServiceBase {
  constructor(id,basicTracking,crossDomain,universalCrossDomains,ecommerceTracing) {
    super(id);
    this.serviceName = SERVICE_TYPE.GUA;
    this.basicTracking = basicTracking;
    this.crossDomain = crossDomain;
    this.universalCrossDomains=universalCrossDomains;
    this.ecommerceTracing = ecommerceTracing;
  }

  addTransactionCmd(data) {
    if (this.ecommerceTracing) {
      const { body: { order_id, affiliation, revenue_total, tax, shipping, city, state, country, transactions } } = data;
      window.ga('remove');
      if (this.crossDomain) {
        window.ga('create', this.serviceId, 'auto', { 'allowLinker': true });
      } else {
        window.ga('create', this.serviceId, 'auto');
      }
      window.ga('require', 'ecommerce');
      window.ga('ecommerce:addTransaction', {
        'id': order_id,
        'affiliation': affiliation,
        'revenue': revenue_total,
        'tax': tax,
        'shipping': '0',
      });
      transactions.forEach((item) => {
        window.ga('ecommerce:addItem', {
          'id': order_id,
          'sku': item.sku,
          'name': item.name,
          'category': item.category,
          'price': item.price,
          'quantity': item.quantity
        });
      });
      window.ga('ecommerce:send');
    }
  }

  initPageCmd() {
     window.ga('remove');
    if (this.crossDomain) {
      window.ga('create', this.serviceId, 'auto', { 'allowLinker': true });
      window.ga('require', 'linker');
      window.ga('linker:autoLink', this.universalCrossDomains.replace(/\s+/g, '').split(','));
      window.ga(trackLinkEvent(SERVICE_TYPE.GUA));
    }else {
      window.ga('create',this.serviceId, 'auto');
    }

    if (this.basicTracking) {
      window.ga('set', 'page', window.location.pathname+window.location.search);
      window.ga('send', 'pageview');
    }
  }

  initPage() {
    lazyRunFunc(() => { this.initPageCmd() }, { globalVariable: 'ga', count: 0 });
  }

  addTransaction(data) {
    lazyRunFunc(() => { this.addTransactionCmd(data) }, { globalVariable: 'ga', count: 0 });
  }

  /* istanbul ignore next */
  initialize() {
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  }
}
