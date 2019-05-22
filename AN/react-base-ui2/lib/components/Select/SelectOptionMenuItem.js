'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var PickupOptionMenuItemPropTypes = {
  prefixCls: _propTypes2.default.string,
  className: _propTypes2.default.string,
  /**
                                          * option item data to render as an menu item
                                          */
  option: _propTypes2.default.object,
  /**
                                       * determine the active state of current option
                                       */
  active: _propTypes2.default.bool,
  /**
                                     * determine the selected state of current option
                                     */
  selected: _propTypes2.default.bool,
  /**
                                       * function which required current component as parameter
                                       */
  saveItemRef: _propTypes2.default.func,
  /**
                                          * callback function trigger by user press keyboard button down
                                          */
  onKeyDown: _propTypes2.default.func,
  /**
                                        * callback function triggered by user hover on current option
                                        */
  onItemHover: _propTypes2.default.func,
  /**
                                          * callback function triggered by user click current option
                                          */
  onItemClick: _propTypes2.default.func,
  /**
                                          * callback function triggered by user select current option
                                          */
  onItemSelect: _propTypes2.default.func,
  /**
                                           * callback function triggered by user deselect on current option
                                           */
  onItemDeselect: _propTypes2.default.func,
  /**
                                             * function to customize rendering current option
                                             */
  optionItemRenderer: _propTypes2.default.func };


var PickupOptionMenuItemDefaultProps = {};var

SelectOptionMenuItem = function (_Component) {(0, _inherits3.default)(SelectOptionMenuItem, _Component);function SelectOptionMenuItem() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, SelectOptionMenuItem);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SelectOptionMenuItem.__proto__ || (0, _getPrototypeOf2.default)(SelectOptionMenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.











    onItemMouseLeave = function () {var _this$props =
      _this.props,option = _this$props.option,onItemHover = _this$props.onItemHover;var
      value = option.value;
      onItemHover && onItemHover({ value: value, hover: false });
    }, _this.

    onItemMouseEnter = function () {var _this$props2 =
      _this.props,option = _this$props2.option,onItemHover = _this$props2.onItemHover;var
      value = option.value;
      onItemHover && onItemHover({ value: value, hover: true });
    }, _this.

    onItemClick = function (e) {
      e.preventDefault();var _this$props3 =
      _this.props,selected = _this$props3.selected,option = _this$props3.option,onItemClick = _this$props3.onItemClick,onItemSelect = _this$props3.onItemSelect,onItemDeselect = _this$props3.onItemDeselect;var
      value = option.value;

      if (selected) {
        onItemDeselect && onItemDeselect(e, value);
      } else {
        onItemSelect && onItemSelect(e, value);
      }
      onItemClick && onItemClick(e, { value: value, selected: selected });
    }, _this.

    onKeyDown = function (e, _ref2) {var emptyMenu = _ref2.emptyMenu;var _this$props4 =
      _this.props,selected = _this$props4.selected,option = _this$props4.option,onKeyDown = _this$props4.onKeyDown,onItemSelect = _this$props4.onItemSelect,onItemDeselect = _this$props4.onItemDeselect;var
      value = option.value;

      if (!emptyMenu) {
        var keyCode = e.keyCode;
        if (keyCode === _consts.KeyCode.SPACE || keyCode === _consts.KeyCode.ENTER) {
          if (selected) {
            onItemDeselect && onItemDeselect(e, value);
          } else {
            onItemSelect && onItemSelect(e, value);
          }
          onKeyDown && onKeyDown(e, { value: value, selected: selected });
          return true;
        }
      }

      if (onKeyDown) {
        onKeyDown(e, { value: value, selected: selected });
        return true;
      }
      return false;
    }, _this.

    getOptionItemPrefixCls = function () {return _this.props.prefixCls + '-option-item';}, _this.

    getOptionItemRef = function () {return _this._optionItemRef;}, _this.

    callSaveInstanceRef = function () {var _this$props5 =
      _this.props,value = _this$props5.option.value,saveItemRef = _this$props5.saveItemRef;
      saveItemRef && saveItemRef(value, _this);
    }, _this.

    saveOptionItemRef = function (node) {
      _this._optionItemRef = node;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(SelectOptionMenuItem, [{ key: 'componentDidMount', value: function componentDidMount() {this.callSaveInstanceRef();} }, { key: 'componentDidUpdate', value: function componentDidUpdate() {this.callSaveInstanceRef();} }, { key: 'render', value: function render()

    {var _classNames;var _props =
      this.props,className = _props.className,option = _props.option,active = _props.active,selected = _props.selected,optionItemRenderer = _props.optionItemRenderer;
      var optionItemPrefixCls = this.getOptionItemPrefixCls();
      var mouseEvents = option.disabled ? {} : {
        onMouseEnter: this.onItemMouseEnter,
        onMouseLeave: this.onItemMouseLeave,
        onMouseDown: this.onItemClick };


      if (optionItemRenderer) {
        var itemProps = (0, _extends3.default)({},
        this.props, {
          optionItemPrefixCls: optionItemPrefixCls,
          mouseEvents: mouseEvents });

        return (
          _react2.default.createElement('li', { ref: this.saveOptionItemRef },
            optionItemRenderer(itemProps)));


      }

      var itemClassName = (0, _classnames2.default)('' + optionItemPrefixCls, className, (_classNames = {}, (0, _defineProperty3.default)(_classNames,
      optionItemPrefixCls + '__active', !option.disabled && active), (0, _defineProperty3.default)(_classNames,
      optionItemPrefixCls + '__selected', selected), (0, _defineProperty3.default)(_classNames,
      optionItemPrefixCls + '__disabled', option.disabled), _classNames));

      return (
        _react2.default.createElement('li', {
            ref: this.saveOptionItemRef },

          _react2.default.createElement('div', (0, _extends3.default)({
              className: itemClassName },
            mouseEvents),

            option.text)));



    } }]);return SelectOptionMenuItem;}(_react.Component);SelectOptionMenuItem.propTypes = PickupOptionMenuItemPropTypes;SelectOptionMenuItem.defaultProps = PickupOptionMenuItemDefaultProps;exports.default =


SelectOptionMenuItem;module.exports = exports['default'];