import * as Cart from 'index/modules/Cart';
import { createRouteCreator } from 'shared/utils/configRoute';
import routeMessages from 'shared/translation/messages/route';

import accessConfirmation from './controls/accessConfirmation';


const confirmationRouteCreator = createRouteCreator(
  ({ intl: { messages }, store }) => {
    const {
      [routeMessages.confirmation.id]: confirmationI18nMsg
    } = messages;

    return {
      path: 'confirmation',
      component: Cart.Confirmation,
      breadcrumbOptions: {
        name: confirmationI18nMsg,
        hideIndex: [1, 2]
      },
      pageHeaderOptions: { title: confirmationI18nMsg },
      onEnter: (nextState, replace, callback) =>
        accessConfirmation(replace, callback, store)
    };
  }
);

export default confirmationRouteCreator;
