'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _Button = require('../Button');var _Button2 = _interopRequireDefault(_Button);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                 * Default PropTypes of ButtonBar.
                                                                                                                                                                                 */
var ButtonBarPropTypes = {
  /**
                            * ButtonBar data list.
                            */
  data: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
    id: _propTypes.string.isRequired,
    text: _propTypes.string,
    size: _propTypes.string,
    type: _propTypes.string,
    loading: _propTypes.bool,
    icon: '',
    disabled: _propTypes.bool,
    menuData: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
      text: _propTypes.string.isRequired,
      value: (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]).isRequired })),

    onMenuSelected: _propTypes.func })),

  /**
                                          * Whether or not to disable buttonbar.
                                          */
  disabled: _propTypes.bool,
  /**
                              * ButtonBar class name.
                              */
  className: _propTypes.string,

  /**
                                 * Triger the functtion when click button.
                                 */
  onButtonClick: _propTypes.func,

  /**
                                   * Triger the function when hover button.
                                   */
  onButtonMouseHover: _propTypes.func,

  /**
                                        * Triger the function when enter button.
                                        */
  onButtonMouseEnter: _propTypes.func,

  /**
                                        * Triger the function when leave button.
                                        */
  onButtonMouseLeave: _propTypes.func,

  /**
                                        * Triger the functtion when select menu item of the button.
                                        */
  onButtonMenuSelect: _propTypes.func };


/** Default Props for ButtonBar */
var ButtonBarProps = {
  data: [],
  disabled: false };


/** UI component that displays ButtonBar with variant settings.*/var
ButtonBar = function (_React$PureComponent) {(0, _inherits3.default)(ButtonBar, _React$PureComponent);function ButtonBar() {(0, _classCallCheck3.default)(this, ButtonBar);return (0, _possibleConstructorReturn3.default)(this, (ButtonBar.__proto__ || (0, _getPrototypeOf2.default)(ButtonBar)).apply(this, arguments));}(0, _createClass3.default)(ButtonBar, [{ key: 'render', value: function render()




    {var _props =









      this.props,data = _props.data,disabledBar = _props.disabled,className = _props.className,onButtonClick = _props.onButtonClick,onButtonMouseHover = _props.onButtonMouseHover,onButtonMouseEnter = _props.onButtonMouseEnter,onButtonMouseLeave = _props.onButtonMouseLeave,onButtonMenuSelect = _props.onButtonMenuSelect;

      return (
        _react2.default.createElement('div', { className: 'button-bar ' + className },

          data.map(function (_ref) {var text = _ref.text,icon = _ref.icon,disabled = _ref.disabled,id = _ref.id,rest = (0, _objectWithoutProperties3.default)(_ref, ['text', 'icon', 'disabled', 'id']);return (
              _react2.default.createElement(_Button2.default, (0, _extends3.default)({
                  key: id,
                  id: id,
                  disabled: disabled || disabledBar,
                  onClick: onButtonClick,
                  onMouseHover: onButtonMouseHover,
                  onMouseEnter: onButtonMouseEnter,
                  onMouseLeave: onButtonMouseLeave,
                  onMenuSelect: onButtonMenuSelect },
                rest),

                text || (icon ? _react2.default.createElement('i', { className: 'icon ' + icon }) : null)));})));





    } }]);return ButtonBar;}(_react2.default.PureComponent);ButtonBar.displayName = 'ButtonBar';ButtonBar.defaultProps = ButtonBarProps;ButtonBar.propTypes = ButtonBarPropTypes;exports.default =


ButtonBar;module.exports = exports['default'];