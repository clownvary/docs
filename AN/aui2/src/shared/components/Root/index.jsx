import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import Tooltip from 'react-base-ui/lib/components/Tooltip';
import Globalize from 'react-base-ui/lib/services/i18n';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import { Authority } from 'shared/authorities';

import {
  getParentFrameHeight,
  setIFrameHeight,
  setIFrameWidth,
  getParentFrameWidth,
  isInIframe,
  minFrameWidth,
  scrollbarHeight,
  minHeight
} from 'shared/utils/iframe';

import 'shared/style/index.less';
import Public from './public';

let minHeightOfPage = minHeight;
let minWidthOfPage = minFrameWidth;
let lastPageWidth = 0;

export function initServices(initialData) {
  // init Tooltip Service
  Tooltip.option({ showShadow: true, effect: 'fade', stick: false });

  // init Globalize Service
  const formats = DateTimeFormat.getSystemDateTimeFormats(initialData);
  Globalize.ANDateFormat = formats.systemDateFormat;
  Globalize.ANTimeFormat = formats.systemTimeFormat;
  Globalize.ANTimeZoneOffset = formats.systemTimeZoneOffset;

  // init Authority service
  Authority.init(initialData.authority);
}

export default function (store, Module, isNoMinSet) {
  const { initialData } = store.getState();
  minHeightOfPage = isNoMinSet ? 0 : minHeightOfPage;
  minWidthOfPage = isNoMinSet ? 0 : minWidthOfPage;

  initServices(initialData);

  ReactDOM.render(
    <Provider store={store}>
      <Public>
        <Module />
      </Public>
    </Provider>, document.getElementById('app-root')
  );
}

function getBottomScrollHeight(isConsiderScrollbarBellow) {
  const parentFrameWidth = getParentFrameWidth();
  let diffHeight = scrollbarHeight;
  if (parentFrameWidth > minWidthOfPage || !isConsiderScrollbarBellow) {
    diffHeight = 0;
  }
  return diffHeight;
}

export function caculateIframeHeight(isConsiderScrollbarBellow) {
  const parentFrameHeight = getParentFrameHeight();

  return Math.max(minHeightOfPage, parentFrameHeight) -
    getBottomScrollHeight(isConsiderScrollbarBellow);
}

export function caculateIframeWidth() {
  const parentFrameWidth = getParentFrameWidth();
  return Math.max(minWidthOfPage, parentFrameWidth);
}

function setIframeParentMinWidth(width) {
  if (parent && parent.name === 'sdi_main') {
    parent.document.body.style.minWidth = width;
  }
}

const resetFrameHeight = throttle((callList) => {
  const width = caculateIframeWidth();

  if (lastPageWidth !== width) {
    setIFrameWidth(width);
    setIframeParentMinWidth(width);
  }

  const height = window.forcedSetIFrameHeight || caculateIframeHeight(width < lastPageWidth);
  setIFrameHeight(height);
  lastPageWidth = width;

  callList.forEach((callback) => {
    typeof callback === 'function' && callback(height);
  });
}, 300);

const resizeCallbackList = [];
export function registerResize(resizeCallback) {
  if (!isInIframe) {
    return false;
  }

  if (resizeCallback && typeof resizeCallback === 'function') {
    resizeCallbackList.push(resizeCallback);
  }

  parent.onresize = () => {
    resetFrameHeight(resizeCallbackList);
  };

  return false;
}

window.onload = () => {
  const iframeWidth = caculateIframeWidth();

  setIFrameHeight(window.forcedSetIFrameHeight || caculateIframeHeight());
  setIFrameWidth(iframeWidth);
  lastPageWidth = iframeWidth;
  setIframeParentMinWidth(iframeWidth);

  window.focus();
};
