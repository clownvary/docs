import getError from './getError';
import getBody from './getBody';

export default function upload(option) {
  const xhr = new XMLHttpRequest();

   /* istanbul ignore else */
  if (option.onProgress && xhr.upload) {
    /* istanbul ignore next */
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100;
      }
      option.onProgress(e);
    };
  }

  const formData = new FormData();
  const { data } = option;

  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  }
  formData.append(option.filename, option.file);

  xhr.onerror = function error(e) {
    option.onError(e);
  };
  /* istanbul ignore next */
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      option.onError(getError(option, xhr), getBody(xhr));
    }

    option.onSuccess(getBody(xhr), xhr);
  };

  xhr.open('post', option.action, true);

  /* istanbul ignore else */
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }


  const headers = option.headers || {};

   /* istanbul ignore else */
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  /* istanbul ignore next */
  Object.keys(headers).forEach((key) => {
    xhr.setRequestHeader(key, headers[key]);
  });

  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    }
  };
}
