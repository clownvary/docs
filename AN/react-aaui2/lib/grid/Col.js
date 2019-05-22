'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = Col;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.string,
  children: _propTypes.node,
  span: _propTypes.number,
  sm: _propTypes.number,
  md: _propTypes.number,
  lg: _propTypes.number
};
var defaultProps = {
  span: 12
};

function Col(_ref) {
  var _classnames;

  var children = _ref.children,
      span = _ref.span,
      sm = _ref.sm,
      md = _ref.md,
      lg = _ref.lg,
      className = _ref.className,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'span', 'sm', 'md', 'lg', 'className']);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({
      className: (0, _classnames3.default)('col', (_classnames = {}, _classnames['col-' + span] = span, _classnames['col-sm-' + sm] = sm, _classnames['col-md-' + md] = md, _classnames['col-lg-' + lg] = lg, _classnames), className)
    }, rest),
    children
  );
}

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;
module.exports = exports['default'];