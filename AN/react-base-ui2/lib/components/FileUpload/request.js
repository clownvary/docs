'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);exports.default =


upload;var _getError = require('./getError');var _getError2 = _interopRequireDefault(_getError);var _getBody = require('./getBody');var _getBody2 = _interopRequireDefault(_getBody);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function upload(option) {
  var xhr = new XMLHttpRequest();

  /* istanbul ignore else */
  if (option.onProgress && xhr.upload) {
    /* istanbul ignore next */
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }

  var formData = new FormData();var
  data = option.data;

  if (data) {
    (0, _keys2.default)(data).forEach(function (key) {
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
      option.onError((0, _getError2.default)(option, xhr), (0, _getBody2.default)(xhr));
    }

    option.onSuccess((0, _getBody2.default)(xhr), xhr);
  };

  xhr.open('post', option.action, true);

  /* istanbul ignore else */
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }


  var headers = option.headers || {};

  /* istanbul ignore else */
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  /* istanbul ignore next */
  (0, _keys2.default)(headers).forEach(function (key) {
    xhr.setRequestHeader(key, headers[key]);
  });

  xhr.send(formData);

  return {
    abort: function abort() {
      xhr.abort();
    } };

}module.exports = exports['default'];