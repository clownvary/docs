'use strict';

exports.__esModule = true;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _grid = require('../grid');

var _L10nMessage = require('../shared/L10nMessage');

var _L10nMessage2 = _interopRequireDefault(_L10nMessage);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = (0, _extends3.default)({}, _types.FormFieldPropTypes);
var defaultProps = {
  l10nMessageValues: {}
};

exports.default = function (_ref) {
  var _ref$sm = _ref.sm,
      sm = _ref$sm === undefined ? [] : _ref$sm,
      _ref$span = _ref.span,
      span = _ref$span === undefined ? [] : _ref$span,
      _ref$fluid = _ref.fluid,
      fluid = _ref$fluid === undefined ? true : _ref$fluid,
      _ref$gutter = _ref.gutter,
      gutter = _ref$gutter === undefined ? true : _ref$gutter,
      align = _ref.align,
      className = _ref.className;

  var FormFieldLayout = function FormFieldLayout(_ref2) {
    var label = _ref2.label,
        errMsg = _ref2.errMsg,
        required = _ref2.required,
        children = _ref2.children,
        l10nMessageValues = _ref2.l10nMessageValues,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['label', 'errMsg', 'required', 'children', 'l10nMessageValues']);

    var rowClasses = (0, _classnames2.default)({
      form__group: true,
      'form__group--error': errMsg
    }, className);
    var labelClasses = (0, _classnames2.default)({
      form__label: true,
      'form__label--require': required
    });
    var controlClasses = (0, _classnames2.default)({
      form__control: true,
      'form__control--static': rest.static
    });
    var validateClasses = (0, _classnames2.default)('form__validate');

    var smLabel = sm[0],
        smControl = sm[1],
        smValidate = sm[2];
    var spanLabel = span[0],
        spanControl = span[1],
        spanValidate = span[2];


    return _react2.default.createElement(
      _grid.Row,
      { fluid: fluid, gutter: gutter, align: align, className: rowClasses },
      _react2.default.createElement(
        _grid.Col,
        { sm: smLabel, span: spanLabel, className: labelClasses },
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement(_L10nMessage2.default, { id: label })
        )
      ),
      _react2.default.createElement(
        _grid.Col,
        { sm: smControl, span: spanControl, className: controlClasses },
        children
      ),
      !!errMsg && _react2.default.createElement(
        _grid.Col,
        { sm: smValidate, span: spanValidate, className: validateClasses },
        _react2.default.createElement('i', { className: 'icon-times-circle' }),
        _react2.default.createElement(_L10nMessage2.default, { id: errMsg, values: l10nMessageValues })
      )
    );
  };

  FormFieldLayout.propTypes = propTypes;
  FormFieldLayout.defaultProps = defaultProps;

  return FormFieldLayout;
};

module.exports = exports['default'];