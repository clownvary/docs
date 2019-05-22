'use strict';

exports.__esModule = true;

var _findTabbable = require('./findTabbable');

var _findTabbable2 = _interopRequireDefault(_findTabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (node) {
  var tabbable = (0, _findTabbable2.default)(node);
  return function (event) {
    // jsdom can not calculate offsetWidth, so in test environment tabbable.length is always 0
    /* istanbul ignore else */
    if (!tabbable.length) {
      event.preventDefault();
    } else {
      var finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
      var leavingFinalTabbable = finalTabbable === document.activeElement ||
      // handle immediate shift+tab after opening with mouse
      node === document.activeElement;
      if (!leavingFinalTabbable) return;

      event.preventDefault();
      var target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
      target.focus();
    }
  };
};

module.exports = exports['default'];