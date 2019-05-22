import { createRouteCreator } from 'shared/utils/configRoute';
import { PageNotFound } from 'index/components';

const _404RouteCreator = createRouteCreator(() =>
  ([{
    path: '*',
    component: PageNotFound,
    status: 404
  }])
);

export default _404RouteCreator;
