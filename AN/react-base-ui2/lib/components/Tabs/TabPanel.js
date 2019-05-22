'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.generateTabPanelId = undefined;var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _propTypes = require('prop-types');

var _consts = require('./consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var TabPanelPropTypes = {
  /**
                           * Id property for TabPanel container,
                           * if not specified, will generate a unique id automatically.
                           */
  id: _propTypes.string,
  /**
                          * Custom CSS class for TabPanel container.
                          */
  className: _propTypes.string,
  /**
                                 * Child Node.
                                */
  children: _propTypes.node,
  /**
                              * Indicate whether current tabPanel should be display.
                              */
  selected: _propTypes.bool };


var TabPanelProps = {
  selected: false };


var generateTabPanelId = exports.generateTabPanelId = function generateTabPanelId(id) {return id ? id + '_panel' : '';};var

TabPanel = function (_React$Component) {(0, _inherits3.default)(TabPanel, _React$Component);function TabPanel() {(0, _classCallCheck3.default)(this, TabPanel);return (0, _possibleConstructorReturn3.default)(this, (TabPanel.__proto__ || (0, _getPrototypeOf2.default)(TabPanel)).apply(this, arguments));}(0, _createClass3.default)(TabPanel, [{ key: 'render', value: function render()




    {var _props =
      this.props,id = _props.id,className = _props.className,selected = _props.selected,children = _props.children;
      var classes = (0, _classnames2.default)(_consts.TabsClasses.TAB_PANEL, className);
      var ariaAttrs = {
        'aria-hidden': !selected,
        'aria-labelledby': id };


      return (
        _react2.default.createElement('div', (0, _extends3.default)({},
          ariaAttrs, {
            className: classes,
            id: generateTabPanelId(id),
            role: 'tabpanel' }),

          children));


    } }]);return TabPanel;}(_react2.default.Component);TabPanel.displayName = 'TabPanel';TabPanel.propTypes = TabPanelPropTypes;TabPanel.defaultProps = TabPanelProps;exports.default = TabPanel;