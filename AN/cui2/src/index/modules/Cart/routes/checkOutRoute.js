import * as Cart from 'index/modules/Cart';
import { createRouteCreator } from 'shared/utils/configRoute';
import routeMessages from 'shared/translation/messages/route';

import confirmationRouteCreator from './confirmationRoute';
import accessCheckout from './controls/accessCheckout';
import updateGlobalStates from './controls/updateGlobalStates';


const checkOutRouteCreator = createRouteCreator(
  ({ intl: { messages }, store }) => {
    const {
      [routeMessages.checkout.id]: checkoutI18nMsg
    } = messages;

    return {
      path: 'checkout',
      indexRoute: {
        component: Cart.Checkout,
        onLeave: () => updateGlobalStates(store),
        onEnter: (nextState, replace, callback) => accessCheckout(replace, callback, store)
      },
      breadcrumbOptions: {
        name: checkoutI18nMsg
      },
      pageHeaderOptions: {
        title: checkoutI18nMsg,
        specificContentId: 'page_newcuicheckout_header'
      },
      childRoutes: [
        confirmationRouteCreator()
      ]
    };
  }
);

export default checkOutRouteCreator;
