import * as Cart from 'index/modules/Cart';
import { createRouteCreator } from 'shared/utils/configRoute';

import balanceRouteCreator from './balanceRoute';
import checkOutRouteCreator from './checkOutRoute';
import updateGlobalStates from './controls/updateGlobalStates';
import redirectToLogin from './controls/redirectToLogin';


const newCartRouteCreator = createRouteCreator(
  ({ store, systemSettings, getWording }) =>
    ({
      path: 'newcart',
      component: Cart.default,
      indexRoute: {
        component: Cart.ShoppingCart,
        onLeave: () => updateGlobalStates(store),
        onEnter: (nextState, replace, callback) =>
          redirectToLogin(callback, systemSettings)
      },
      breadcrumbOptions: {
        name: getWording('shopping_cart_label')
      },
      pageHeaderOptions: {
        title: getWording('shopping_cart_label'),
        specificContentId: 'page_newcuishoppingcart_header'
      },
      childRoutes: [
        checkOutRouteCreator(),
        balanceRouteCreator()
      ]
    })
);

export default newCartRouteCreator;
