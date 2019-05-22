import { createRouteCreator } from 'shared/utils/configRoute';

import orgRouteCreator from './orgRoute';
import _404RouteCreator from './_404Route';
import systemRouteCreator from './systemRoute';
import unmatchedRouteCreator from './unmatchedRoute';

import devAdminRouteCreator from '../../dev-admin/routes';
import cartRouteCreator from '../../modules/Cart/routes';
import daycareRouteCreator from '../../modules/Daycare/routes';
import aaofferRouteCreator from '../../modules/AAOffer/routes';


const routesCreator = createRouteCreator(
  ({ orgPath }) => {
    const systemRoutes = systemRouteCreator();
    const unmatchedRoutes = unmatchedRouteCreator();

    const globalRoutes = [
      ...systemRoutes,
      ...unmatchedRoutes
    ];

    return (orgPath && orgPath !== '/' ? [
      {
        ...orgRouteCreator(),
        childRoutes: [
          ...devAdminRouteCreator(),
          ...cartRouteCreator(),
          ...daycareRouteCreator(),
          ...aaofferRouteCreator(),
          ..._404RouteCreator()
        ]
      },
      ...globalRoutes
    ] : globalRoutes);
  }
);

export default routesCreator;
