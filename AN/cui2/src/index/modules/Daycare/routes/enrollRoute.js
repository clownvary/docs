import * as Daycare from 'index/modules/Daycare';
import { createRouteCreator } from 'shared/utils/configRoute';

const enrollRouteCreator = createRouteCreator(
  () =>
    ({
      path: 'daycare/program/enroll/:programId',
      component: Daycare.default,
      indexRoute: {
        component: Daycare.EnrollForm,
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

export default enrollRouteCreator;
