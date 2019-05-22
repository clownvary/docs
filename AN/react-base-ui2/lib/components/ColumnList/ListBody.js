'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _throttle = require('lodash/throttle');var _throttle2 = _interopRequireDefault(_throttle);
var _ListItem = require('./ListItem');var _ListItem2 = _interopRequireDefault(_ListItem);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ListBodyPropTypes = {
  WCAG: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  showTips: _propTypes2.default.bool,
  shouldRenderCheckAll: _propTypes2.default.bool,
  activeIndex: _propTypes2.default.number,
  keyField: _propTypes2.default.string,
  maxHeight: _propTypes2.default.string,
  data: _propTypes2.default.array,
  columns: _propTypes2.default.array,
  selectedKeys: _propTypes2.default.array,
  onBlur: _propTypes2.default.func,
  onItemClick: _propTypes2.default.func,
  onItemRender: _propTypes2.default.func,
  onEndReached: _propTypes2.default.func };


var ListBodyProps = {
  WCAG: false,
  disabled: false,
  showTips: false,
  shouldRenderCheckAll: false,
  activeIndex: 0,
  keyField: 'id',
  maxHeight: '',
  data: [],
  columns: [],
  selectedKeys: [],
  onBlur: null,
  onItemClick: null,
  onItemRender: null,
  onEndReached: null };var


ListBody = function (_React$PureComponent) {(0, _inherits3.default)(ListBody, _React$PureComponent);function ListBody() {(0, _classCallCheck3.default)(this, ListBody);return (0, _possibleConstructorReturn3.default)(this, (ListBody.__proto__ || (0, _getPrototypeOf2.default)(ListBody)).apply(this, arguments));}(0, _createClass3.default)(ListBody, [{ key: 'componentDidMount', value: function componentDidMount()




    {var
      onEndReached = this.props.onEndReached;
      this.addOnScrollListener(onEndReached);
    } }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {
      if (nextProps.onEndReached && nextProps.onEndReached !== this.props.onEndReached) {
        this.addOnScrollListener(nextProps.onEndReached);
      }
    } }, { key: 'addOnScrollListener', value: function addOnScrollListener(

    onEndReached) {var _this2 = this;
      if ((0, _isFunction2.default)(onEndReached)) {
        this.body.onscroll = (0, _throttle2.default)(function () {var _body =
          _this2.body,clientHeight = _body.clientHeight,scrollHeight = _body.scrollHeight,scrollTop = _body.scrollTop;
          scrollHeight - clientHeight - scrollTop <= 50 && onEndReached();
        }, 300);
      } else {
        this.body.onscroll = null;
      }
    } }, { key: 'renderCheckAll', value: function renderCheckAll()

    {var _props =








      this.props,columns = _props.columns,showTips = _props.showTips,disabled = _props.disabled,activeIndex = _props.activeIndex,allChecked = _props.allChecked,onItemFocus = _props.onItemFocus,onCheckAllChange = _props.onCheckAllChange;

      var key = 'all';
      var index = -1;
      var focused = index === activeIndex;
      var itemAll = {
        text: 'All',
        checked: allChecked };


      return _react2.default.createElement(_ListItem2.default, {
        key: key,
        item: itemAll,
        index: index,
        columns: columns,
        showTips: showTips,
        focused: focused,
        disabled: disabled,
        selected: allChecked,
        onClick: onCheckAllChange,
        onFocus: function onFocus(e) {onItemFocus(e, { index: index });} });

    } }, { key: 'render', value: function render()

    {var _this3 = this;var _props2 =














      this.props,data = _props2.data,onBlur = _props2.onBlur,columns = _props2.columns,keyField = _props2.keyField,showTips = _props2.showTips,maxHeight = _props2.maxHeight,activeIndex = _props2.activeIndex,selectedKeys = _props2.selectedKeys,showCheckAll = _props2.showCheckAll,onItemClick = _props2.onItemClick,onItemFocus = _props2.onItemFocus,onItemRender = _props2.onItemRender,globalDisabled = _props2.disabled;

      return (
        _react2.default.createElement('div', {
            ref: function ref(body) {_this3.body = body;},
            className: 'an-columnlist__body',
            style: { maxHeight: maxHeight },
            onBlur: onBlur },

          _react2.default.createElement('ul', { role: 'list' },
            showCheckAll && this.renderCheckAll(),
            data.map(function (item, index) {
              var disabled = globalDisabled || item.disabled;
              var focused = index === activeIndex;
              var selected = selectedKeys.indexOf(item[keyField]) > -1;

              return _react2.default.createElement(_ListItem2.default, {
                key: item[keyField],
                item: item,
                index: index,
                columns: columns,
                showTips: showTips,
                disabled: disabled,
                focused: focused,
                selected: selected,
                onClick: onItemClick,
                onFocus: onItemFocus,
                onRender: onItemRender });

            }))));



    } }]);return ListBody;}(_react2.default.PureComponent);ListBody.displayName = 'ListBody';ListBody.propsType = ListBodyPropTypes;ListBody.defaultProps = ListBodyProps;exports.default =


ListBody;module.exports = exports['default'];