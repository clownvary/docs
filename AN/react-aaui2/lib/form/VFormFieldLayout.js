'use strict';

exports.__esModule = true;

var _createFieldLayout = require('./createFieldLayout');

var _createFieldLayout2 = _interopRequireDefault(_createFieldLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VFormFieldLayout = (0, _createFieldLayout2.default)({
  sm: [12, 12, 12],
  className: 'form__group--vertical'
});

exports.default = VFormFieldLayout;
module.exports = exports['default'];