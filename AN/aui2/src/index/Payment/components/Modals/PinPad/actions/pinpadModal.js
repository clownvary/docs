export const UPDATE_MODAL_TITLE = 'UPDATE_MODAL_TITLE';
export const OPEN_OR_HIDE_MODAL = 'OPEN_OR_HIDE_MODAL';
export const SET_APD_INTERFACE_APPLET = 'SET_APD_INTERFACE_APPLET';

export function updateModalTitle(title) {
  return {
    type: UPDATE_MODAL_TITLE,
    payload: {
      title
    }
  };
}

export function showModal(flag) {
  window.isInPendingPayment = flag;
  return {
    type: OPEN_OR_HIDE_MODAL,
    payload: {
      shown: flag
    }
  };
}

export function setApdInterfaceApplet(value) {
  return {
    type: SET_APD_INTERFACE_APPLET,
    payload: {
      value
    }
  };
}
