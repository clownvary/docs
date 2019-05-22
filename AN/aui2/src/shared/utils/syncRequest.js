import processHeaders from 'shared/api/headersService';
import serializeData from './serialize';

function setHeaders(xhr, headers = {}) {
  const hds = processHeaders(headers);
  Object.keys(hds).forEach((name) => {
    (hds[name] && xhr.setRequestHeader(name, hds[name]));
  });
}

function parseResponse(xhr) {
  let result;
  try {
    result = JSON.parse(xhr.statusText);
  } catch (e) {
    result = xhr.statusText;
  }
  return [xhr, result];
}

function onloadHandler(xhr, onsuccess, onerror) {
  return () => {
    const statusCode = xhr.status;

    /* istanbul ignore else */
    if (statusCode >= 200 && statusCode < 300) {
      /* istanbul ignore else */
      if (typeof onsuccess === 'function') {
        onsuccess.apply(xhr, parseResponse(xhr));
      }
    } else if (typeof onerror === 'function') {
      onerror.apply(xhr, parseResponse(xhr));
    }
  };
}

function onerrorHandler(xhr, onerror) {
  return () => {
    if (typeof onerror === 'function') {
      onerror.apply(xhr, parseResponse(xhr));
    } else {
      console.log(new TypeError('Network request failed'));
    }
  };
}

export default function syncAjax(options = {}) {
  const { type = 'GET', url, headers, body = {}, success, error, withCredentials = false } = options;
  const xhr = new XMLHttpRequest();

  xhr.open(type, url, false);
  setHeaders(xhr, headers);

  if (withCredentials) {
    xhr.withCredentials = true;
  }

  xhr.onload = onloadHandler(xhr, success, error);

  xhr.onerror = onerrorHandler(xhr, error);
  // Note: You may not use a timeout for synchronous requests with an owning window.
  // (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
  xhr.send(serializeData(body));
}
