import { createRouteCreator } from 'shared/utils/configRoute';
import programRouteCreator from './programRoute';
import enrollRouteCreator from './enrollRoute';

const daycareRouteCreator = createRouteCreator(
  () =>
    ([
      programRouteCreator(),
      enrollRouteCreator()
    ])
);

export default daycareRouteCreator;
