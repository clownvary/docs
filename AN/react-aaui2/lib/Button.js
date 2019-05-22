'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(_ref) {
  var _classNames;

  var noSubmit = _ref.noSubmit,
      loading = _ref.loading,
      type = _ref.type,
      size = _ref.size,
      children = _ref.children,
      className = _ref.className,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['noSubmit', 'loading', 'type', 'size', 'children', 'className']);

  var classes = (0, _classnames2.default)((_classNames = {
    btn: true
  }, _classNames['btn-' + type] = type, _classNames['btn--' + size] = size, _classNames['btn--loading'] = loading, _classNames), className);

  return _react2.default.createElement(
    'button',
    (0, _extends3.default)({}, rest, { type: noSubmit ? 'button' : 'submit', className: classes }),
    loading && _react2.default.createElement('i', { className: 'icon-spinner icon--loading' }),
    _react2.default.createElement(
      'span',
      null,
      children
    )
  );
};

exports.default = Button;


Button.displayName = 'AUIButton';
Button.propTypes = {
  noSubmit: _propTypes.bool,
  loading: _propTypes.bool,
  type: _propTypes.string,
  size: _propTypes.string,
  className: _propTypes.string,
  children: _propTypes.node
};

Button.defaultProps = {
  noSubmit: false,
  loading: false,
  type: 'secondary'
};
module.exports = exports['default'];