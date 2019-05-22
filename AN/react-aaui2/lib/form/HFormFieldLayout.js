'use strict';

exports.__esModule = true;

var _createFieldLayout = require('./createFieldLayout');

var _createFieldLayout2 = _interopRequireDefault(_createFieldLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HFormFieldLayout = (0, _createFieldLayout2.default)({
  span: [3, 6, 3],
  fluid: false,
  align: 'center',
  className: 'form__group--horizontal'
});

exports.default = HFormFieldLayout;
module.exports = exports['default'];