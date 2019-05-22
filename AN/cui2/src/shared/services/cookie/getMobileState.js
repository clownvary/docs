import getCookie from './getCookie';

const getMobileState = () => {
    const currentSite = window.__reduxInitialState.currentSite;
    let key = '{0}_FullPageView';
    key = currentSite ? key.replace('{0}', currentSite.replace('/', '')) : key;
     /* istanbul ignore next */
    if (document.cookie.length > 0) {
      return getCookie(key);
    }
    return false;
  }

export default getMobileState;
