import { createRouteCreator } from 'shared/utils/configRoute';
import Reload from '../Reload';
import Version from '../Version';
import Configuration from '../Configuration';


const devAdminRouteCreator = createRouteCreator(
  () =>
    ([
      {
        path: 'reload(/:siteIds)',
        component: Reload
      },
      {
        path: 'configuration(/:siteIds)',
        component: Configuration
      },
      {
        path: 'version',
        component: Version
      }
    ])
);

export default devAdminRouteCreator;
