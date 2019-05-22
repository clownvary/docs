import { createRouteCreator } from 'shared/utils/configRoute';
import routeMessages from 'shared/translation/messages/route';

import AAOffer from '../index';

const aaofferRouteCreator = createRouteCreator(
  ({ intl: { messages } }) => {
    const {
      [routeMessages.aaoffer.id]: aaofferI18nMsg
    } = messages;

    return [
      {
        path: 'aaoffer',
        component: AAOffer,
        breadcrumbOptions: {
          name: aaofferI18nMsg
        },
        pageHeaderOptions: { title: aaofferI18nMsg }
      }
    ];
  }
);

export default aaofferRouteCreator;
