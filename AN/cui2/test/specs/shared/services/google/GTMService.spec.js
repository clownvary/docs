import GTMService from 'shared/services/google/GTMService';
import transactionJson from 'Cart/Confirmation/get_transactions_ga.json'
const initConfig = {
  ga_account: 'UA-107858076-1',
  ga_container: 'GTM-NG5W53V',
  ga_analytics_type: 0,
  tracking_ecommerce: true,
  tracking_cross_domain: true,
  tracking_basic_page: true,
  use_google_analytics: true,
  ga_universal_cross_domains: 'example.com,baidu.com'
};

function setup(_config = initConfig) {
  {
    const mockScript = document.createElement('script');
    document.documentElement.appendChild(mockScript);
    const config = Object.assign({}, initConfig, _config);
    return new GTMService(config.ga_account);
  }
}
function setupGa () {
  document.domain = 'test';
  window.dataLayer = [];
}
describe('shared/services/google/GTMService', () => {
  it('should run addTransaction func correctly', () => {
    setupGa();
    const service = setup();
    service.addTransaction(transactionJson);
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
    } = transactionJson;
    const [expectObj,items]=[[],[]];
    transactions.forEach((item) => {
      items.push({
        'sku': item.sku,
        'name': item.name,
        'category': item.category,
        'price': item.price,
        'quantity': item.quantity
      });
    });
    expectObj.push(
      {
        'event':'payOrder',
        'transactionId': order_id,
        'transactionAffiliation': affiliation,
        'transactionTotal': revenue_total,
        'transactionTax': tax,
        'transactionShipping': shipping,
        'transactionProducts': transactions
      }
    );
    expect(window.dataLayer).toMatchObject(expectObj);
  });
});
