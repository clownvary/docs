import GAService from './GAService';
import GUAService from './GUAService';
import GTMService from './GTMService';
import AnalyticsServiceBase from './serviceBase';

class AnalyticsService {
  constructor() {
    this.instanceService = null;
  }
  initialize(config) {
    const {
      ga_account: gaAccount,
      ga_container: gaContainer,
      ga_analytics_type: gaAnalyticsType,
      tracking_ecommerce: trackingEcommerce,
      tracking_cross_domain: trackingCrossDomain,
      tracking_basic_page: trackingBasicPage,
      use_google_analytics: useGoogleAnalytics,
      ga_universal_cross_domains: gaUniversalCrossDomains
    } = config;

    if (useGoogleAnalytics) {
      let service;
      switch (gaAnalyticsType) {
        case 0:
          {
            service = new GAService(gaAccount, trackingBasicPage, trackingCrossDomain, trackingEcommerce);
          }
          break;
        case 1:
          {
            service = new GUAService(gaAccount, trackingBasicPage, trackingCrossDomain, gaUniversalCrossDomains, trackingEcommerce);
          }
          break;
        case 2:
          {
            service = new GTMService(gaContainer);
          }
          break;
        default:
             {
              service = new AnalyticsServiceBase(null);
             }
          break;
      }
      this.instanceService = service;
      service.initialize();
    }
  }

  getInstance() {
    try {
      if (!this.instanceService) {
        this.instanceService = new AnalyticsServiceBase(null);
      }
      return this.instanceService;
    } catch (error) {
      /* istanbul ignore next */
      console.log(error);
    }
  };
}
export default AnalyticsService;
