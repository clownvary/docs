import GAService from 'shared/services/google/GAService';
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
    return new GAService(config.ga_account, config.tracking_basic_page, config.tracking_cross_domain, config.tracking_ecommerce);
  }
}
function setupGa () {
  window._gaq= [];
  window.ga = (a,b,c,d) => {return null};
  window.__reduxInitialState = {
    configurations: {
      secure_recnet: false
    }
  }
}
describe('shared/services/google/GAService', () => {
  it('should run initPage func correctly', () => {
     setupGa();
     window._gaq = [];
     const service = setup();
     service.initPage();
     expect(window._gaq).toMatchObject(
       [['_setAccount', initConfig.ga_account],
       ['_trackPageview'],
       ['_setDomainName', 'none'],
       ['_setAllowLinker', true],
         undefined]);
  });
  it('should run initPage func correctly when tracking_basic_page is false and tracking_cross_domain is false', () => {
    setupGa();
    window._gaq = [];
    const service = setup({tracking_basic_page:false,tracking_cross_domain:false});
    service.initPage();
    expect(window._gaq).toMatchObject([["_setAccount", initConfig.ga_account]]);
 });

  it('should run addTransaction func correctly', () => {
    setupGa();
    window._gaq = [];
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
    expectObj.push(["_setAccount", initConfig.ga_account]);
    transactions.forEach((item) => {
      items.push(['_addItem',
        order_id,
        item.sku,
        item.name,
        item.category,
        item.price,
        item.quantity
      ]);
    });
    expectObj.push(['_addTrans',
      order_id,
      affiliation,
      revenue_total,
      tax,
      shipping,
      city,
      state,
      country
    ]);
    items.forEach((item) => {
      expectObj.push(item);
    });
    expectObj.push(['_trackTrans']);

    expect(window._gaq).toMatchObject(expectObj);
  });
  it('should run addTransaction func correctly when tracking_ecommerce is false ', () => {
    setupGa();
    window._gaq = [];
    const service = setup({tracking_ecommerce:false});
    service.addTransaction();
    expect(window._gaq).toEqual([]);
  });
});
