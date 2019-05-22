'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = Row;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propsTypes = {
  className: _propTypes.string,
  fluid: _propTypes.bool,
  gutter: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number, _propTypes.bool]),
  align: (0, _propTypes.oneOf)(['start', 'center', 'end', 'stretch']),
  justify: (0, _propTypes.oneOf)(['start', 'center', 'end', 'between', 'around']),
  style: _propTypes.object,
  children: _propTypes.node
};

var defaultProps = {
  fluid: false,
  gutter: true,
  align: 'start',
  justify: 'start',
  style: {}
};

function Row(props) {
  var _classNames;

  var fluid = props.fluid,
      justify = props.justify,
      align = props.align,
      className = props.className,
      gutter = props.gutter,
      style = props.style,
      children = props.children,
      rest = (0, _objectWithoutProperties3.default)(props, ['fluid', 'justify', 'align', 'className', 'gutter', 'style', 'children']);

  var justifyPrefix = justify === 'between' || justify === 'around' ? 'space-' + justify : justify;

  var boolGutter = typeof gutter === 'boolean';
  var classes = (0, _classnames2.default)((_classNames = {
    row: !fluid,
    'row-fluid': fluid,
    'row-gutter': boolGutter && !!gutter
  }, _classNames['row-align-' + align] = align, _classNames['row-justify-' + justifyPrefix] = justify, _classNames), className);

  // prettier-ignore
  var rowStyle = !boolGutter && gutter > 0 ? (0, _extends3.default)({
    marginLeft: gutter / -2,
    marginRight: gutter / -2
  }, style) : style;
  var cols = _react2.default.Children.map(children, function (col) {
    if (!boolGutter && col && col.props && gutter > 0) {
      return _react2.default.cloneElement(col, {
        style: (0, _extends3.default)({
          paddingLeft: gutter / 2,
          paddingRight: gutter / 2
        }, col.props.style)
      });
    }
    return col;
  });

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: classes, style: rowStyle }, rest),
    cols
  );
}

Row.propTypes = propsTypes;
Row.defaultProps = defaultProps;
module.exports = exports['default'];