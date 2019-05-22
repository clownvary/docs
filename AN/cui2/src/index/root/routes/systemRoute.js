import { createRouteCreator } from 'shared/utils/configRoute';
import { SiteNotFound, SiteUnavailable } from 'index/components';


const systemRouteCreator = createRouteCreator(() =>
  ([
    {
      path: 'system/sitenotfound',
      component: SiteNotFound,
      status: 404
    },
    {
      path: 'system/siteunavailable',
      component: SiteUnavailable,
      status: 503
    }
  ])
);

export default systemRouteCreator;
