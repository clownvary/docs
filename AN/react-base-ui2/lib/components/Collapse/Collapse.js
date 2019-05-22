'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _reactDom = require('react-dom');
var _difference = require('lodash/difference');var _difference2 = _interopRequireDefault(_difference);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _dom = require('../../utils/dom');
var _Panel = require('./Panel');var _Panel2 = _interopRequireDefault(_Panel);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                     * Default PropTypes for Collapse
                                                                                                                                     */

var collapsePropTypes = {
  prefixCls: _propTypes2.default.string,
  /**
                                          * Key of the active panel
                                          */
  activeKey: _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.arrayOf(_propTypes2.default.string)]),

  /**
                                                              * Data record array to be displayed
                                                              */

  dataSource: _propTypes2.default.oneOfType([
  _propTypes2.default.arrayOf(_propTypes2.default.shape({
    disabled: _propTypes2.default.bool,
    header: _propTypes2.default.oneOfType([
    _propTypes2.default.string,
    _propTypes2.default.number,
    _propTypes2.default.node]),

    className: _propTypes2.default.string,
    content: _propTypes2.default.oneOfType([
    _propTypes2.default.string,
    _propTypes2.default.number,
    _propTypes2.default.node]) }))]),



  /**
                                       * Callback function executed when active panel is changed
                                       */
  onChange: _propTypes2.default.func,
  /**
                                       * multiple mode, default is null, is collapse mode
                                       */
  multiple: _propTypes2.default.bool,
  /**
                                       * className to apply
                                       */
  className: _propTypes2.default.string,

  /**
                                          * The inline style for collapse container element.
                                          */
  style: _propTypes2.default.object,
  /**
                                      * Whether the panel header can been focused
                                      */
  isPanelHeaderFocusable: _propTypes2.default.bool };


function toArray() {var activeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return !(0, _isArray2.default)(activeKey) ? [activeKey] : activeKey;
}var

Collapse = function (_React$Component) {(0, _inherits3.default)(Collapse, _React$Component);











  function Collapse(props) {(0, _classCallCheck3.default)(this, Collapse);var _this = (0, _possibleConstructorReturn3.default)(this, (Collapse.__proto__ || (0, _getPrototypeOf2.default)(Collapse)).call(this,
    props));_this.




















    setCollapseWrapper = function (wrapper) {
      _this.collapseWrapper = wrapper;
    };_this.
























    onPanelHeaderKeyDown = function (e, keyCode) {
      var target = e.target;var _this$props =
      _this.props,prefixCls = _this$props.prefixCls,onPanelHeaderKeyDown = _this$props.onPanelHeaderKeyDown;
      var headerClass = prefixCls + '-item__header';
      var collapseWrapper = (0, _reactDom.findDOMNode)(_this.collapseWrapper);
      var panelHeaders = Array.prototype.slice.call(collapseWrapper.querySelectorAll('.' + headerClass));
      var panelLength = panelHeaders.length;
      var targetIndex = panelHeaders.indexOf(target);

      // If the focus is not in the header then do nothing
      if ((0, _dom.hasClass)(target, headerClass)) {
        switch (keyCode) {
          case _consts.KeyCode.HOME:{
              e.preventDefault();
              panelHeaders[0].focus();
              break;
            }
          case _consts.KeyCode.END:{
              e.preventDefault();
              panelHeaders[panelLength - 1].focus();
              break;
            }
          case _consts.KeyCode.LEFT:
          case _consts.KeyCode.UP:{
              e.preventDefault();
              var direction = -1;
              var newIndex = (targetIndex + panelLength + direction) % panelLength;
              panelHeaders[newIndex].focus();
              break;
            }
          case _consts.KeyCode.RIGHT:
          case _consts.KeyCode.DOWN:{
              e.preventDefault();
              var _direction = 1;
              var _newIndex = (targetIndex + panelLength + _direction) % panelLength;
              panelHeaders[_newIndex].focus();
              break;
            }
          default:{
              break;
            }}

      }

      return (0, _isFunction2.default)(onPanelHeaderKeyDown) && onPanelHeaderKeyDown(e);
    };var activeKey = _this.props.activeKey;_this.state = { activeKey: toArray(activeKey) };return _this;}(0, _createClass3.default)(Collapse, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(_ref) {var activeKey = _ref.activeKey;var nextActiveKey = toArray(activeKey);var nowActiveKey = toArray(this.props.activeKey);if ((0, _difference2.default)(nextActiveKey, nowActiveKey).length || (0, _difference2.default)(nowActiveKey, nextActiveKey).length) {this.setState({ activeKey: nextActiveKey });}} }, { key: 'onClickItem', value: function onClickItem(key, disabled) {if (disabled) {return;}var activeKey = this.state.activeKey;if (!this.props.multiple) {activeKey = activeKey[0] === key ? [] : [key];} else {var index = activeKey.indexOf(key);var isActive = index > -1;if (isActive) {activeKey.splice(index, 1);} else {activeKey.push(key);}}this.setState({ activeKey: activeKey });this.props.onChange(activeKey);} }, { key: 'renderItems', value: function renderItems()

    {var _this2 = this;var
      activeKey = this.state.activeKey;var _props =
      this.props,prefixCls = _props.prefixCls,multiple = _props.multiple,dataSource = _props.dataSource,children = _props.children,isPanelHeaderFocusable = _props.isPanelHeaderFocusable;

      var getIsActive = function getIsActive(key) {
        if (!multiple) {
          return activeKey[0] === key;
        }
        return activeKey.indexOf(key) > -1;
      };

      if (children) {
        var newChildren = [];
        _react2.default.Children.forEach(children, function (child, index) {
          var key = '' + (child.key || index);var
          disabled = child.props.disabled;
          var isActive = getIsActive(key);

          var props = {
            key: key,
            isActive: isActive,
            prefixCls: prefixCls,
            isPanelHeaderFocusable: isPanelHeaderFocusable,
            onItemClick: function onItemClick() {_this2.onClickItem(key, disabled);},
            onPanelHeaderKeyDown: _this2.onPanelHeaderKeyDown };


          newChildren.push(_react2.default.cloneElement(child, props));
        });

        return newChildren;
      }

      return dataSource.map(function (item, index) {
        var key = '' + (item.key || index);
        var isActive = getIsActive(key);
        return (
          _react2.default.createElement(_Panel2.default, {
            prefixCls: prefixCls,
            key: key,
            isActive: isActive,
            onItemClick: function onItemClick() {_this2.onClickItem(key, item.disabled);},
            onPanelHeaderKeyDown: _this2.onPanelHeaderKeyDown,
            disabled: item.disabled,
            className: item.className,
            Header: item.Header,
            content: item.content,
            ariaLableExpand: item.ariaLableExpand,
            ariaLableCollapse: item.ariaLableCollapse,
            isPanelHeaderFocusable: isPanelHeaderFocusable }));


      });
    } }, { key: 'render', value: function render()

    {var _props2 =
      this.props,prefixCls = _props2.prefixCls,className = _props2.className,style = _props2.style,dataSource = _props2.dataSource,children = _props2.children;
      var cls = (0, _classnames2.default)(prefixCls, className);
      if (!dataSource.length && !children) {
        return null;
      }

      return (
        _react2.default.createElement('div', { className: cls, style: style, ref: this.setCollapseWrapper },
          this.renderItems()));


    } }]);return Collapse;}(_react2.default.Component);Collapse.Panel = _Panel2.default;Collapse.propTypes = collapsePropTypes;Collapse.defaultProps = { prefixCls: _consts.DefaultCSSPrefix + '-collapse', onChange: function onChange() {}, dataSource: [], multiple: true, isPanelHeaderFocusable: false };exports.default =


Collapse;module.exports = exports['default'];