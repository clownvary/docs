'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _SelectOptionMenuItem = require('./SelectOptionMenuItem');var _SelectOptionMenuItem2 = _interopRequireDefault(_SelectOptionMenuItem);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var SelectOptionMenuPropTypes = {
  prefixCls: _propTypes2.default.string,
  /**
                                          * select option object array to render as option item list by default
                                          */
  optionData: _propTypes2.default.array,
  /**
                                          * determine which option is displaying as selected state
                                          */
  selectedValues: _propTypes2.default.array,
  /**
                                              * determine which option is displaying as active state
                                              */
  activeValue: _propTypes2.default.string,
  /**
                                            * determine the menu hidden state
                                            */
  hidden: _propTypes2.default.bool,
  /**
                                     * option menu's css style width
                                     */
  style: _propTypes2.default.object,
  /**
                                      * option menu's css style maxHeight
                                      */
  menuOptionsMaxHeight: _propTypes2.default.number,
  /**
                                                     * function to customize rendering the footer section below all option item
                                                     */
  optionFooterRenderer: _propTypes2.default.func,
  /**
                                                   * function to customize rendering a single option item
                                                   */
  optionItemRenderer: _propTypes2.default.func,
  /**
                                                 * onClick callback function triggered by user click on an option item
                                                 */
  onOptionItemClick: _propTypes2.default.func,
  /**
                                                * onClick callback function triggered by user select an option
                                                */
  onOptionItemSelect: _propTypes2.default.func,
  /**
                                                 * onClick callback function triggered by user deselect an option
                                                 */
  onOptionItemDeselect: _propTypes2.default.func };


var unsetActiveValue = '_unset';

var SelectOptionMenuDefaultProps = {
  selectedValues: [],
  menuOptionsMaxHeight: 300 };var


SelectOptionMenu = function (_Component) {(0, _inherits3.default)(SelectOptionMenu, _Component);





  function SelectOptionMenu(props) {(0, _classCallCheck3.default)(this, SelectOptionMenu);var _this = (0, _possibleConstructorReturn3.default)(this, (SelectOptionMenu.__proto__ || (0, _getPrototypeOf2.default)(SelectOptionMenu)).call(this,
    props));_initialiseProps.call(_this);var _props$activeValue =

    props.activeValue,activeValue = _props$activeValue === undefined ? unsetActiveValue : _props$activeValue;

    _this.state = {
      activeValue: activeValue };


    _this._itemInstances = {};return _this;
  }(0, _createClass3.default)(SelectOptionMenu, [{ key: 'componentDidMount', value: function componentDidMount()

    {
      this.forceAlign();
    } }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {var
      nextActiveValue = nextProps.activeValue;var
      activeValue = this.state.activeValue;
      if (nextActiveValue && nextActiveValue !== activeValue) {
        this.setActiveValue(nextActiveValue);
      }
    } }, { key: 'componentDidUpdate', value: function componentDidUpdate()

    {
      this.forceAlign();

      var activeItemInstance = this.getActiveItemInstances();
      if (activeItemInstance && activeItemInstance.getOptionItemRef()) {
        var activeItem = activeItemInstance.getOptionItemRef();
        var itemMenuHeight = this._optionMenuRef.offsetHeight;
        var itemMenuScrollTop = this._optionMenuRef.scrollTop;
        var activeItemTop = activeItem.offsetTop;
        var activeItemHeight = activeItem.offsetHeight;
        /* eslint no-mixed-operators: 0 */
        /* istanbul ignore next */
        if (activeItemTop + activeItemHeight - itemMenuHeight - itemMenuScrollTop > 0) {
          this._optionMenuRef.scrollTop = activeItemTop + activeItemHeight - itemMenuHeight;
        } else if (activeItemTop < itemMenuScrollTop) {
          this._optionMenuRef.scrollTop = activeItemTop;
        }
      }
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      this._itemInstances = null;
    } }, { key: 'render', value: function render()







































































































































    {var _props =




      this.props,prefixCls = _props.prefixCls,hidden = _props.hidden,style = _props.style,optionData = _props.optionData,optionFooterRenderer = _props.optionFooterRenderer,menuOptionsMaxHeight = _props.menuOptionsMaxHeight;
      var menuItems = this.renderMenuItems();
      var menuFooter = optionFooterRenderer && optionFooterRenderer(this.props);
      var menuHidden = hidden || (!optionData || optionData.length === 0) && !menuFooter;
      return (
        _react2.default.createElement('div', {
            ref: this.saveOptionMenuRootRef,
            className: (0, _classnames2.default)(prefixCls + '-option', { 'u-hidden': menuHidden }),
            style: (0, _extends3.default)({}, style) },

          _react2.default.createElement('div', {
              className: prefixCls + '-option-list',
              style: { maxHeight: menuOptionsMaxHeight + 'px' },
              onKeyDown: this.onKeyDown,
              ref: this.saveOptionMenuRef },

            _react2.default.createElement('ul', null,
              menuItems)),


          menuFooter));


    } }]);return SelectOptionMenu;}(_react.Component);SelectOptionMenu.propTypes = SelectOptionMenuPropTypes;SelectOptionMenu.defaultProps = SelectOptionMenuDefaultProps;SelectOptionMenu.unsetActiveValue = unsetActiveValue;var _initialiseProps = function _initialiseProps() {var _this2 = this;this.onItemSelect = function (e, value) {var _props2 = _this2.props,selectedValues = _props2.selectedValues,onOptionItemSelect = _props2.onOptionItemSelect;var nextSelectedValues = selectedValues.filter(function (selectedValue) {return selectedValue !== value;});nextSelectedValues.length === selectedValues.length && nextSelectedValues.push(value);onOptionItemSelect && onOptionItemSelect(e, value, nextSelectedValues);};this.onItemDeselect = function (e, value) {var _props3 = _this2.props,selectedValues = _props3.selectedValues,onOptionItemDeselect = _props3.onOptionItemDeselect;var nextSelectedValues = selectedValues.filter(function (selectedValue) {return selectedValue !== value;});onOptionItemDeselect && onOptionItemDeselect(e, value, nextSelectedValues);};this.onItemHover = function (_ref) {var value = _ref.value,hover = _ref.hover;var activeValue = _this2.state.activeValue;var nextActiveValue = hover ? value : unsetActiveValue;activeValue !== nextActiveValue && _this2.setActiveValue(nextActiveValue);};this.onKeyDown = function (e) {var keyCode = e.keyCode;var optionData = _this2.props.optionData;var emptyMenu = !optionData || optionData.length === 0;var handledByItem = false;(0, _keys2.default)(_this2._itemInstances).forEach(function (key) {var itemInstance = _this2._itemInstances[key];if (itemInstance && itemInstance.props.active && itemInstance.onKeyDown) {handledByItem = itemInstance.onKeyDown(e, { emptyMenu: emptyMenu });}});if (handledByItem) {return true;}if (keyCode === _consts.KeyCode.UP || keyCode === _consts.KeyCode.DOWN) {var direction = keyCode === _consts.KeyCode.UP ? -1 : 1;var nextActiveValue = _this2.findNextActiveValueByDirection(direction);var activeValue = _this2.state.activeValue;activeValue !== nextActiveValue && _this2.setActiveValue(nextActiveValue);return true;}return false;};this.getActiveItemInstances = function () {var activeValue = _this2.state.activeValue;var activeItemKeys = (0, _keys2.default)(_this2._itemInstances).filter(function (key) {return key === activeValue;});if (activeItemKeys.length) {return _this2._itemInstances[activeItemKeys[0]];}return null;};this.setActiveValue = function (activeValue) {_this2.setState({ activeValue: activeValue });};this.saveOptionMenuRootRef = function (node) {_this2._optionMenuRootRef = node;};this.saveOptionMenuRef = function (node) {_this2._optionMenuRef = node;};this.saveItemInstanceRef = function (key, node) {/* istanbul ignore next */if (key && node) {_this2._itemInstances[key] = node;}};this.forceAlign = function () {var calculateOptionMenuPosition = _this2.props.calculateOptionMenuPosition;if (calculateOptionMenuPosition) {var positionStyle = calculateOptionMenuPosition();_this2._optionMenuRootRef.style.top = positionStyle.top;_this2._optionMenuRootRef.style.left = positionStyle.left;}};this.findNextActiveValueByDirection = function (direction) {var activeValue = _this2.state.activeValue;var optionData = _this2.props.optionData;var activeItemIndex = 0;if (optionData.length === 0) {return unsetActiveValue;}if (activeValue === unsetActiveValue) {return optionData[activeItemIndex].value;}optionData.every(function (option, index) {if (option.value === activeValue) {activeItemIndex = index;return false;}return true;});activeItemIndex += direction;if (activeItemIndex < 0) {activeItemIndex = optionData.length - 1;}if (activeItemIndex >= optionData.length) {activeItemIndex = 0;}return optionData[activeItemIndex].value;};this.renderMenuItems = function () {var _props4 = _this2.props,prefixCls = _props4.prefixCls,optionData = _props4.optionData,selectedValues = _props4.selectedValues,optionItemRenderer = _props4.optionItemRenderer,onOptionItemClick = _props4.onOptionItemClick;var activeValue = _this2.state.activeValue;return optionData.map(function (option) {var selected = selectedValues.indexOf(option.value) >= 0;var active = activeValue === option.value;return _react2.default.createElement(_SelectOptionMenuItem2.default, { key: 'menu-option-item__' + option.value, prefixCls: prefixCls, selected: selected, active: active, option: option, saveItemRef: _this2.saveItemInstanceRef, optionItemRenderer: optionItemRenderer, onItemClick: onOptionItemClick, onItemHover: _this2.onItemHover, onItemSelect: _this2.onItemSelect, onItemDeselect: _this2.onItemDeselect });});};};exports.default =


SelectOptionMenu;module.exports = exports['default'];