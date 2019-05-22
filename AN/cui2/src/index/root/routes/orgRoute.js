import { Master } from 'index/components';
import { createRouteCreator } from 'shared/utils/configRoute';
import routeMessages from 'shared/translation/messages/route';


const orgRouteCreator = createRouteCreator(
  ({
    orgPath,
    systemSettings,
    intl: {
      messages: { [routeMessages.home.id]: i18nMessage_home }
    }
  }) => ({
    path: orgPath,
    component: Master,
    breadcrumbOptions: {
      name: i18nMessage_home,
      href: `${systemSettings.get('original_base_url')}/Home`
    }
  })
);


export default orgRouteCreator;
