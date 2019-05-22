'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _toString = require('lodash/toString');var _toString2 = _interopRequireDefault(_toString);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* The mostly concerned characters are
                                                                                                                                                                                                &amp; -> '&'
                                                                                                                                                                                                &lt; -> '<'
                                                                                                                                                                                                &gt; -> '>'
                                                                                                                                                                                                &nbsp; -> ' '
                                                                                                                                                                                                &#39; -> '\''
                                                                                                                                                                                                &quot; -> '\"'
                                                                                                                                                                                                &#126; -> '~'
                                                                                                                                                                                                &#096; -> '`'
                                                                                                                                                                                            */exports.default =


function () {var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (!str) {
    return '';
  }
  if (!(0, _isString2.default)(str)) {
    str = (0, _toString2.default)(str);
  }
  str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  var span = document.createElement('span');
  span.innerHTML = str;
  return span.textContent;
};module.exports = exports['default'];