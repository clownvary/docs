import * as Cart from 'index/modules/Cart';
import { createRouteCreator } from 'shared/utils/configRoute';
import routeMessages from 'shared/translation/messages/route';

import accessBalance from './controls/accessBalance';


const balanceRouteCreator = createRouteCreator(
  ({ intl: { messages }, store }) => {
    const {
      [routeMessages.balance.id]: balanceI18nMsg
    } = messages;

    return {
      path: 'balance',
      component: Cart.Balance,
      breadcrumbOptions: {
        name: balanceI18nMsg
      },
      pageHeaderOptions: {
        title: balanceI18nMsg,
        specificContentId: 'page_onlinepayonaccount_header'
      },
      onEnter: (nextState, replace, callback) => accessBalance(replace, callback, store)
    };
  }
);

export default balanceRouteCreator;
