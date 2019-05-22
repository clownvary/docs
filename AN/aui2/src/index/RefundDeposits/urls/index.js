import * as prod from './url_prod';
import * as dev from './url_dev';

export default Object.assign({}, __STATIC__ ? dev : prod);
