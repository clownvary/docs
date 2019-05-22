export const SETCURRENTLOCALE = 'index/actions/intl/SETCURRENTLOCALE';

export function setCurrentLocale(value) {
  return {
    type: SETCURRENTLOCALE,
    payload: {
      value
    }
  };
}
