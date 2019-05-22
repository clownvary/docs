'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pills = function Pills(_ref) {
  var _classNames;

  var className = _ref.className,
      style = _ref.style,
      size = _ref.size,
      children = _ref.children;

  var classes = (0, _classnames2.default)((_classNames = {
    'btn-group': true
  }, _classNames['btn-group-' + size] = size, _classNames), className);

  return _react2.default.createElement(
    'div',
    { className: classes, style: style },
    children
  );
};

Pills.displayName = 'AUIPills';
Pills.propTypes = {
  className: _propTypes.string,
  style: _propTypes.object, // eslint-disable-line
  size: (0, _propTypes.oneOf)(['xs', 'sm', 'lg', 'xl']),
  children: _propTypes.node
};

exports.default = Pills;
module.exports = exports['default'];