'use strict';

exports.__esModule = true;

var _createFieldLayout = require('./createFieldLayout');

var _createFieldLayout2 = _interopRequireDefault(_createFieldLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlexFormFieldLayout = (0, _createFieldLayout2.default)({
  sm: [3, 6, 3],
  align: 'center',
  className: 'form__group--flex'
});

exports.default = FlexFormFieldLayout;
module.exports = exports['default'];