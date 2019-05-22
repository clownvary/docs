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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Label = function (_PureComponent) {
  (0, _inherits3.default)(Label, _PureComponent);

  function Label() {
    (0, _classCallCheck3.default)(this, Label);
    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
  }

  Label.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        style = _props.style,
        type = _props.type,
        children = _props.children,
        rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'style', 'type', 'children']);


    return _react2.default.createElement(
      'span',
      (0, _extends3.default)({}, rest, {
        className: 'label label-' + type + ' ' + (className || ''),
        style: style
      }),
      children
    );
  };

  return Label;
}(_react.PureComponent);

Label.displayName = 'AUILabel';
Label.propTypes = {
  className: _propTypes.string,
  style: _propTypes.object, // eslint-disable-line
  type: (0, _propTypes.oneOf)(['success', 'warning', 'danger', 'info']).isRequired,
  children: _propTypes.node
};
Label.defaultProps = {
  type: 'info'
};
exports.default = Label;
module.exports = exports['default'];