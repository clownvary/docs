import { createRouteCreator } from 'shared/utils/configRoute';

const unmatchedRouteCreator = createRouteCreator(() =>
  ([
    {
      path: '*',
      onEnter: (nextState, replace) => replace('/system/sitenotfound')
    }
  ])
);

export default unmatchedRouteCreator;
