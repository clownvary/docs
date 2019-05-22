'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ListItemPropTypes = {
  item: _propTypes2.default.object,
  index: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  showTips: _propTypes2.default.bool,
  selected: _propTypes2.default.bool,
  focused: _propTypes2.default.bool,
  onFocus: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onRender: _propTypes2.default.func,
  columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    field: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.string.isRequired,
    onRender: _propTypes2.default.func })) };



var ListItemProps = {
  item: {},
  index: 0,
  focused: false,
  selected: false,
  disabled: false,
  showTips: false,
  onFocus: _identity2.default,
  onClick: _identity2.default,
  onRender: null,
  columns: [] };var


ListItem = function (_React$PureComponent) {(0, _inherits3.default)(ListItem, _React$PureComponent);function ListItem() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, ListItem);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ListItem.__proto__ || (0, _getPrototypeOf2.default)(ListItem)).call.apply(_ref, [this].concat(args))), _this), _this.




    onFocus = function (e) {var _this$props =
      _this.props,index = _this$props.index,focused = _this$props.focused,onFocus = _this$props.onFocus;
      focused || onFocus(e, { index: index });
    }, _this.

    onClick = function (e) {var _this$props2 =
      _this.props,item = _this$props2.item,index = _this$props2.index,onClick = _this$props2.onClick;
      onClick(e, { item: item, index: index });
    }, _this.

    renderItem = function (item, itemProps, context) {return (
        context.columns.map(function (column, columnIndex) {
          var value = item[column.field];
          var props = {
            key: columnIndex,
            disabled: itemProps.disabled,
            className: (0, _classnames2.default)('item-column', column.className) };

          context.column = column;
          context.columnIndex = columnIndex;
          return column.render(value, props, context);
        }));}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(ListItem, [{ key: 'render', value: function render()

    {var _props =









      this.props,item = _props.item,index = _props.index,columns = _props.columns,showTips = _props.showTips,focused = _props.focused,selected = _props.selected,disabled = _props.disabled,onRender = _props.onRender;

      var itemProps = { disabled: disabled };
      var context = { item: item, index: index, columns: columns };

      return (
        _react2.default.createElement('li', {
            role: 'option',
            tabIndex: 0,
            onClick: this.onClick,
            onFocus: this.onFocus,
            'aria-selected': selected,
            title: showTips ? item.text : null,
            className: (0, _classnames2.default)('item', item.className, {
              disabled: disabled,
              selected: selected,
              focused: focused }) },



          (0, _isFunction2.default)(onRender) ?
          onRender(item, itemProps, context) :
          this.renderItem(item, itemProps, context)));



    } }]);return ListItem;}(_react2.default.PureComponent);ListItem.displayName = 'ListItem';ListItem.propTypes = ListItemPropTypes;ListItem.defaultProps = ListItemProps;exports.default = ListItem;module.exports = exports['default'];