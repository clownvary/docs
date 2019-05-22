import processHeaders from './processHeaders';
import * as HttpContentType from './consts/HttpContentType';
import * as HttpMethod from './consts/HttpMethod';
import toQueryString from '../../utils/toQueryString';

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

export default function syncAjax(options) {
  const { type = HttpMethod.GET, success, error, withCredentials = false } = options;
  let { body, headers, url } = options;
  const xhr = new XMLHttpRequest();

  headers = processHeaders(type, headers);

  let params = body;
  if (headers['Content-Type'] !== HttpContentType.JSON) {
    params = toQueryString(body);
  }

  if (type !== HttpMethod.GET && type !== HttpMethod.DELETE) {
    body = JSON.stringify(params);
  } else {
    const paramsString = params ? `${params}&` : '';
    url = `${url}${url.indexOf('?') !== -1 ? '&' : '?'}${paramsString}ui_random=${new Date().getTime()}`;
  }

  xhr.open(type, url, false);
  Object.keys(headers).forEach((name) => {
    (headers[name] && xhr.setRequestHeader(name, headers[name]));
  });

  if (withCredentials) {
    xhr.withCredentials = true;
  }

  xhr.onload = onloadHandler(xhr, success, error);

  xhr.onerror = onerrorHandler(xhr, error);
  // Note: You may not use a timeout for synchronous requests with an owning window.
  // (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
  if (type !== HttpMethod.GET && type !== HttpMethod.DELETE) {
    xhr.send(body);
  } else {
    xhr.send();
  }
}
