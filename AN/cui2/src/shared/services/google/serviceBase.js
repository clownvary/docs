import { SERVICE_TYPE, MAX_COUNT } from './constType';

export default class AnalyticsServiceBase {
  constructor (serviceId) {
    this.serviceId = serviceId;
  }
  initialize() { }
  initPage() { }
  addTransaction() { }
}

export const trackLinkEvent = (type = SERVICE_TYPE.GA) => {
  const allLinks = Array.from(document.getElementsByTagName('a'));
  const protocol = window.__reduxInitialState.configurations.secure_recnet ? 'https' : 'http';
  const regUrl = `${protocol}://${document.domain}`;
  try {
    allLinks.forEach((link) => {
      if (link.href.indexOf(regUrl) === -1) {
        if (type === SERVICE_TYPE.GA) {
          link.removeEventListener('click', _handleGaClick, false);
          link.addEventListener('click', _handleGaClick, false);
        } else if (type === SERVICE_TYPE.GUA) {
          link.removeEventListener('click', _handleGuaClick, false);
          link.addEventListener('click', _handleGuaClick, false);
        }
      }
    });
  } catch (error) {
  }
}

export const lazyRunFunc = (func, option = { globalVariable: '_gaq',count:0}) => {
  if ( typeof func === 'function' ){
    try {
      if (window[option.globalVariable]) {
        func();
        option.count = 0;
      } else {
        if (option.count < MAX_COUNT) {
          setTimeout(() => {
            lazyRunFunc(func, {...option, count: option.count + 1});
          }, 500);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function _handleGaClick() {
  window._gaq.push(['_trackEvent', 'Outbound Links', document.domain]);
}
function _handleGuaClick() {
  window.ga('send', 'event', 'Outbound Links', document.domain);
}


