export const LOADING_BAR_SHOW = 'LOADING_BAR_SHOW';
export const LOADING_BAR_HIDE = 'LOADING_BAR_HIDE';

export function showLoadingbar(payload) {
  return {
    type: LOADING_BAR_SHOW,
    payload
  };
}

export function hideLoadingbar(payload) {
  return {
    type: LOADING_BAR_HIDE,
    payload
  };
}
