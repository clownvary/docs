import cookie from './cookie';
import { GoogleAnalytics } from './google';
import { Tealium } from './tealium';

export default {
    cookieService: cookie,
    gaService: new GoogleAnalytics(),
    tealiumService: new Tealium()
};
