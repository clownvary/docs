import GUAService from 'shared/services/google/GUAService';
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
    return new GUAService(config.ga_account, config.tracking_basic_page, config.tracking_cross_domain,config.ga_universal_cross_domains, config.tracking_ecommerce);
  }
}
function setupGa () {
  document.domain = 'test';
  window._gaq= [];
  window.ga = (a,b,c,d) => {return null};
  window.__reduxInitialState = {
    configurations: {
      secure_recnet: false
    }
  }
}
describe('shared/services/google/GUAService', () => {
  it('should run initPage func correctly', () => {
     setupGa();
     const gaSpy = jest.spyOn(window,'ga');
     const service = setup();
     service.initPage();
     expect(window.ga.mock.calls).toMatchObject(
       [['remove'],
       ["create", "UA-107858076-1", "auto", {"allowLinker": true}],
       ['require', 'linker'],
       ['linker:autoLink', ['example.com', 'baidu.com']],
       [undefined],
       ["set", "page", "blank"],
       ['send', 'pageview'],
      ]);
  });
  it('should run initPage func correctly when tracking_basic_page is false and tracking_cross_domain is false', () => {
    setupGa();
    const gaSpy = jest.spyOn(window,'ga');
    const service = setup({tracking_basic_page:false,tracking_cross_domain:false});
    service.initPage();
    expect(gaSpy.mock.calls).toMatchObject([["remove"],["create", initConfig.ga_account,"auto"]]);
 });

  it('should run addTransaction func correctly', () => {
    setupGa();
    const gaSpy = jest.spyOn(window,'ga');
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
    expectObj.push(["remove"]);
    if(initConfig.tracking_cross_domain) {
      expectObj.push(['create', initConfig.ga_account, 'auto', { 'allowLinker': true }]);
    }else {
      expectObj.push(['create', initConfig.ga_account, 'auto']);
    }
    transactions.forEach((item) => {
      items.push(['ecommerce:addItem',
        {
          'id': order_id,
          'sku': item.sku,
          'name': item.name,
          'category': item.category,
          'price': item.price,
          'quantity': item.quantity
        }
      ]);
    });
    expectObj.push(['require', 'ecommerce']);
    expectObj.push(['ecommerce:addTransaction',
      {
        'id': order_id,
        'affiliation': affiliation,
        'revenue': revenue_total,
        'tax': tax,
        'shipping': '0'
      }
    ]);
    items.forEach((item) => {
      expectObj.push(item);
    });
    expectObj.push(['ecommerce:send']);

    expect(gaSpy.mock.calls).toMatchObject(expectObj);
  });
  it('should run addTransaction func correctly when tracking_cross_domain is false ', () => {
    setupGa();
    const gaSpy = jest.spyOn(window,'ga');
    const service = setup({tracking_cross_domain:false});
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
    expectObj.push(["remove"]);
    expectObj.push(['create', initConfig.ga_account, 'auto']);
    transactions.forEach((item) => {
      items.push(['ecommerce:addItem',
        {
          'id': order_id,
          'sku': item.sku,
          'name': item.name,
          'category': item.category,
          'price': item.price,
          'quantity': item.quantity
        }
      ]);
    });
    expectObj.push(['require', 'ecommerce']);
    expectObj.push(['ecommerce:addTransaction',
      {
        'id': order_id,
        'affiliation': affiliation,
        'revenue': revenue_total,
        'tax': tax,
        'shipping': '0'
      }
    ]);
    items.forEach((item) => {
      expectObj.push(item);
    });
    expectObj.push(['ecommerce:send']);

    expect(gaSpy.mock.calls).toMatchObject(expectObj);
  });
  it('should run addTransaction func correctly when tracking_ecommerce is false ', () => {
    setupGa();
    const gaSpy = jest.spyOn(window,'ga');
    const service = setup({tracking_ecommerce:false});
    service.addTransaction();
    expect(gaSpy.mock.calls).toEqual([]);
  });
});
