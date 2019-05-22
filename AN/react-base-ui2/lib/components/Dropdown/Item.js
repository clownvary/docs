'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _Checkbox = require('../Checkbox');var _Checkbox2 = _interopRequireDefault(_Checkbox);
var _utils = require('../../utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                   * Default PropTypes of Dropdown item.
                                                                                                                                   */
var ItemPropTypes = {
  /**
                       * Item data list.
                       */
  data: (0, _propTypes.shape)({ text: _propTypes.string, value: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number]) }),
  /**
                                                                                                                                       * Whether or not to show text tip when hovering the item.
                                                                                                                                       */
  showTextTip: _propTypes.bool,
  /**
                                 * Custom class name..
                                 */
  ccs: _propTypes.string.isRequired,
  /**
                                      * Click event handler.
                                      */
  click: _propTypes.func.isRequired,
  key: _propTypes.number };



/** Default Props for Dropdown */
var ItemProps = {
  data: [],
  showTextTip: true };


/** UI component that displays Dropdown Item with variant settings.*/var
Item = function (_React$PureComponent) {(0, _inherits3.default)(Item, _React$PureComponent);




  function Item(props) {(0, _classCallCheck3.default)(this, Item);var _this = (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).call(this,
    props));var

    isCheck = props.isCheck;
    _this.state = {
      isCheck: isCheck };return _this;

  }(0, _createClass3.default)(Item, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {
      this.setState({ isCheck: nextProps.isCheck });
    } }, { key: 'render', value: function render()

    {var _props =
      this.props,data = _props.data,showTextTip = _props.showTextTip,ccs = _props.ccs,click = _props.click,errorInfo = _props.errorInfo,key = _props.key;
      var text = (0, _utils.decodeHtmlStr)(_utils.DataAccess.get(data, 'text'));
      return (
        _react2.default.createElement('li', {
            key: key || _utils.DataAccess.get(data, 'value'),
            title: showTextTip && text,
            className: ccs + ' aaui-flexbox',
            onClick: function onClick() {click(_utils.DataAccess.get(data, 'value'));} },

          _react2.default.createElement(_Checkbox2.default, {
              checked: this.state.isCheck,
              value: false,
              disabled: !this.state.isCheck && errorInfo.length > 0 },

            _react2.default.createElement('span', { className: 'dropdown-item__label' }, text))));



    } }]);return Item;}(_react2.default.PureComponent);Item.displayName = 'Dropdown-item';Item.defaultProps = ItemProps;Item.propTypes = ItemPropTypes;exports.default =


Item;module.exports = exports['default'];