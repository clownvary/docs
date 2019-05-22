export const REDIRECT = 'LOCATION_REDIRECT';
export const RELOAD = 'LOCATION_RELOAD';

export function redirect(url, win, useReplace) {
  return {
    type: REDIRECT,
    payload: {
      url,
      win,
      useReplace
    }
  };
}

export function reload() {
  return {
    type: RELOAD
  };
}
