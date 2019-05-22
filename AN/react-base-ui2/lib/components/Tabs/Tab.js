'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _propTypes = require('prop-types');

var _consts = require('./consts');
var _TabPanel = require('./TabPanel');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var TabPropTypes = {
  /**
                      * Id property for Tab container(button),
                      * if not specified, will generate a unique id automatically.
                      */
  id: _propTypes.string,
  /**
                          * The content dispayed in Tab.
                          */
  title: _propTypes.string,
  /**
                             * Custom CSS class for Tab container.
                             */
  className: _propTypes.string,
  /**
                                 * Indicate whether current tab is selected.
                                 */
  selected: _propTypes.bool,
  /**
                              * Indicate whether current tab is disabled.
                              */
  disabled: _propTypes.bool,
  /**
                              * A callback function called when a tab clicked.
                              */
  onClick: _propTypes.func };


var TabProps = {
  selected: false,
  disabled: false };var


Tab = function (_React$Component) {(0, _inherits3.default)(Tab, _React$Component);function Tab() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, Tab);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tab.__proto__ || (0, _getPrototypeOf2.default)(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.








    onClick = function (e) {var _this$props =
      _this.props,id = _this$props.id,disabled = _this$props.disabled,onClick = _this$props.onClick;
      !disabled && onClick(id, e);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(Tab, [{ key: 'render', value: function render()

    {var _props =
      this.props,id = _props.id,title = _props.title,className = _props.className,disabled = _props.disabled,selected = _props.selected;
      var classes = (0, _classnames2.default)(_consts.TabsClasses.TAB, className, {
        active: selected });

      var ariaAttrs = {
        'aria-disabled': disabled,
        'aria-selected': selected,
        'aria-expanded': selected,
        'aria-controls': (0, _TabPanel.generateTabPanelId)(id) };


      return (
        _react2.default.createElement('button', (0, _extends3.default)({
            role: 'tab' },
          ariaAttrs, {
            className: classes,
            onClick: this.onClick,
            id: id,
            tabIndex: disabled ? undefined : 0,
            disabled: disabled }),

          title));


    } }], [{ key: 'isInstance', value: function isInstance(node) {return node && node.type === Tab;} }]);return Tab;}(_react2.default.Component);Tab.displayName = 'Tab';Tab.propTypes = TabPropTypes;Tab.defaultProps = TabProps;exports.default = Tab;module.exports = exports['default'];