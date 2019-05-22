'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableCell = function (_PureComponent) {
  (0, _inherits3.default)(TableCell, _PureComponent);

  function TableCell() {
    (0, _classCallCheck3.default)(this, TableCell);
    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
  }

  TableCell.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        Tag = _props.tagName,
        children = _props.children,
        onClick = _props.onClick,
        rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'tagName', 'children', 'onClick']);


    return _react2.default.createElement(
      Tag,
      (0, _extends3.default)({ className: className }, rest, { onClick: onClick }),
      children
    );
  };

  return TableCell;
}(_react.PureComponent);

TableCell.propTypes = {
  className: _propTypes.string,
  children: _propTypes.node,
  tagName: _propTypes.string,
  onClick: _propTypes.func
};
TableCell.defaultProps = {
  className: '',
  tagName: 'td',
  onClick: _utils.noop
};
exports.default = TableCell;
module.exports = exports['default'];