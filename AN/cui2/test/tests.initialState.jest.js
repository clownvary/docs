import $ from 'jquery';
import { XMLHttpRequest } from 'xmlhttprequest';
import { mockAPI, cleanMock } from 'react-base-ui/lib/common/restClient';
import { configurations, systemSettings } from 'utils/context';

global.XMLHttpRequest = XMLHttpRequest;
global.$ = $;
global.mockAPI = mockAPI;
global.cleanMock = cleanMock;
global.__reduxInitialState = { configurations, systemSettings, currentSite: '/jettytest11' };
document.domain = 'int-cart.apm.activecommunities.com';
