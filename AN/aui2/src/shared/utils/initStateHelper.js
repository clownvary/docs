export function getCurrentInitState() {
  const screen = window.__permitDetail__ || window.__reservationDetail__ || {};
  return screen.__initialState__;
}
