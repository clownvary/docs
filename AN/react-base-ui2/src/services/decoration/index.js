import Clearable from './clearable';
import Selectable from './selectable';


export const enableService = (el, options, Service) => {
  el[Service.tag] = el[Service.tag] || new Service(el, { ...options, enabled: true });
  return el[Service.tag];
};

export const disableService = (el, Service) => {
  if (el[Service.tag]) {
    const s = el[Service.tag];
    s.disable();

    delete el[Service.tag];
  }
};

export const enableClearable = (el, options) => enableService(el, options, Clearable);
export const disableClearable = (el) => {
  disableService(el, Clearable);
};

export const enableSelectable = (el, options) => enableService(el, options, Selectable);
export const disableSelectable = (el) => {
  disableService(el, Selectable);
};

export const disableAll = (el) => {
  disableClearable(el);
  disableSelectable(el);
};

