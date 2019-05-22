import isNumber from 'lodash/isNumber';

export const isInIframe = window.location !== window.parent.location;
export const layHeightExceptBody = 420;
export const minFrameWidth = 1000;
export const scrollbarHeight = 20;
export const minHeight = 560;

const iframeElement = isInIframe && /* istanbul ignore next */window.frameElement;

/* istanbul ignore if */
if (iframeElement) {
  iframeElement.className = 'iframe_noresize';
}

export function getParentFrameHeight(iframe = iframeElement) {
  /* istanbul ignore if */
  if (isInIframe) {
    return iframe.contentWindow.parent.innerHeight || 0;
  }

  return 0;
}

export function getParentFrameWidth(iframe = iframeElement) {
  /* istanbul ignore if */
  if (isInIframe) {
    return iframe.contentWindow.parent.innerWidth || 0;
  }

  return 0;
}

export function setIFrameHeight(iframe, height) {
  const params = { iframe, height };

  if (iframe === '100%' || isNumber(iframe)) {
    params.height = iframe;
    params.iframe = iframeElement;
  }

  if (params.height && params.iframe) {
    setTimeout(() => {
      params.iframe.height = params.height;
    }, 500);
  }
}

export function setIFrameWidth(iframe, width) {
  const params = { iframe, width };

  if (isNumber(iframe)) {
    params.width = iframe;
    params.iframe = iframeElement;
  }

  if (params.width && params.iframe) {
    setTimeout(() => {
      params.iframe.style.minWidth = params.width;
    }, 500);
  }
}


export function getOffsetTop(elem) {
  const box = elem.getBoundingClientRect();

  return (box.top + window.pageYOffset) - document.documentElement.clientTop;
}


export function getWindowSizeOfIframe() {
  return {
    height: window.parent.innerHeight,
    width: window.parent.innerWidth
  };
}
