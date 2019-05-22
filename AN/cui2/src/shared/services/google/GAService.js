import { SERVICE_TYPE } from './constType';
import AnalyticsServiceBase, { trackLinkEvent, lazyRunFunc } from './serviceBase';

export default class GAService extends AnalyticsServiceBase {
  constructor(id, basicTracking, crossDomain, ecommerceTracing) {
    super(id);
    this.serviceName = SERVICE_TYPE.GA;
    this.basicTracking = basicTracking;
    this.crossDomain = crossDomain;
    this.ecommerceTracing = ecommerceTracing;
  }

  addTransactionCmd(data) {
    if (this.ecommerceTracing) {
      const {
       body: {
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
      window._gaq.push(['_setAccount', this.serviceId]);
      window._gaq.push(['_addTrans',
        order_id,
        affiliation,
        revenue_total,
        tax,
        shipping,
        city,
        state,
        country
      ]);
      transactions.forEach((item) => {
        window._gaq.push(['_addItem',
          order_id,
          item.sku,
          item.name,
          item.category,
          item.price,
          item.quantity
        ]);
      });
      window._gaq.push(['_trackTrans']);
    }
  }

  initPageCmd() {
    window._gaq.push(['_setAccount', this.serviceId]);
    if (this.basicTracking) {
      window._gaq.push(['_trackPageview']);
    }
    if (this.crossDomain) {
      window._gaq.push(['_setDomainName', 'none']);
      window._gaq.push(['_setAllowLinker', true]);
      window._gaq.push(trackLinkEvent(SERVICE_TYPE.GA));
    }
  }

  initPage() {
    lazyRunFunc(() => { this.initPageCmd() }, { globalVariable: '_gaq', count: 0 });
  }

  addTransaction(data) {
    lazyRunFunc(() => { this.addTransactionCmd(data) }, { globalVariable: '_gaq', count: 0 });
  }
  
  /* istanbul ignore next */
  initialize() {
    (function () {
      var ga = document.createElement('script');
      ga.type = 'text/javascript';
      ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(ga, s);
    })();
  }
}
