import Globalize from './Globalize';


const addLocaleData = (data) => {
  Globalize.addCldr(data);
};

const hookLocaleData = () => {
  /* istanbul ignore else */
  if (global.IntlPolyfill) {
    const origAddLocaleData = global.IntlPolyfill.__addLocaleData;
    if (origAddLocaleData && !origAddLocaleData.__anHooked) {
      global.IntlPolyfill.__addLocaleData = (data, tag) => {
        origAddLocaleData(data, tag);
        addLocaleData(data);
      };
      global.IntlPolyfill.__addLocaleData.__anHooked = true;
    }
  } else if (global.Intl) {
    global.IntlPolyfill = {};
    global.IntlPolyfill.__addLocaleData = (data) => {
      addLocaleData(data);
    };
    global.IntlPolyfill.__addLocaleData.__anHooked = true;
  }
};

export default hookLocaleData;

