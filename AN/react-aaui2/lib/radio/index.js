'use strict';

exports.__esModule = true;
exports.RadioGroup = exports.Radio = undefined;

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _RadioGroup = require('./RadioGroup');

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Radio2.default.Group = _RadioGroup2.default;

exports.Radio = _Radio2.default;
exports.RadioGroup = _RadioGroup2.default;
exports.default = _Radio2.default;