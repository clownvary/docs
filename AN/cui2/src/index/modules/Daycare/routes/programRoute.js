import * as Daycare from 'index/modules/Daycare';
import { createRouteCreator } from 'shared/utils/configRoute';

const programRouteCreator = createRouteCreator(
  () =>
    ({
      path: 'daycare/program/:programId',
      component: Daycare.default,
      indexRoute: {
        component: Daycare.Program,
        breadcrumbOptions: {
          hideIndex: [0, 1, 2]
        }
      },
      breadcrumbOptions: {
        name: ''
      },
      pageHeaderOptions: {
        title: '',
        specificContentId: 'page_newcuidaycareprogram_header'
      }
    })
);

export default programRouteCreator;
