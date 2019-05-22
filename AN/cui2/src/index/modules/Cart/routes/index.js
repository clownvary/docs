import { createRouteCreator } from 'shared/utils/configRoute';
import newCartRouteCreator from './newCartRoute';

const cartRouteCreator = createRouteCreator(
  () => ([
    newCartRouteCreator()
  ])
);

export default cartRouteCreator;
