import * as reactRouterRedux from 'react-router-redux';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';

import getRoutPathWithOrg from 'shared/utils/getRoutPathWithOrg';

const updateLocation = method => (...args) =>
  reactRouterRedux[method](...args.map((item, index) => {
    if (item && index === 0 && isString(item)) {
      return getRoutPathWithOrg(item);
    }

    // istanbul ignore else
    if (item && index === 0 && isPlainObject(item) && item.pathname) {
      item.pathname = getRoutPathWithOrg(item.pathname);
    }

    return item;
  }));

export const push = updateLocation('push');
export const replace = updateLocation('replace');
export const go = updateLocation('go');
export const goBack = updateLocation('goBack');
export const goForward = updateLocation('goForward');

export const routerActions = { push, replace, go, goBack, goForward };
