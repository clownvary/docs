import { gaService } from 'shared/services';
import GAService from 'shared/services/google/GAService';
import GUAService from 'shared/services/google/GUAService';
import GTMService from 'shared/services/google/GTMService';
import serviceBase from 'shared/services/google/serviceBase';


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
  const mockScript = document.createElement('script');
  document.documentElement.appendChild(mockScript);
  const config = Object.assign({}, initConfig, _config);
  gaService.initialize(config);

}
describe('shared/services/google/analyticsService', () => {
  it('should initialize service correctly', () => {
     setup();
     const service = gaService.getInstance();
     expect(service instanceof GAService).toBeTruthy();

     setup({ga_analytics_type:1});
     const service2 = gaService.getInstance();
     expect(service2 instanceof GUAService).toBeTruthy();

     setup({ga_analytics_type:2});
     const service3 = gaService.getInstance();
     expect(service3 instanceof GTMService).toBeTruthy();

     setup({ga_analytics_type:null});
     const service4 = gaService.getInstance();
     expect(service4 instanceof serviceBase).toBeTruthy();
  });

  it('shuld return AnalyticsServiceBase when instanceServie is null', () => {
    gaService.instanceService = null;
    const service = gaService.getInstance();
    expect(service instanceof serviceBase).toBeTruthy();
  });
  it('shuld return null when useGoogleAnalytics is fasle', () => {
    setup({use_google_analytics:false});
    const service = gaService.getInstance();
    expect(service.serviceId).toEqual(null);
  });
});
