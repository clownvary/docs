'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);

var _Checkbox = require('../Checkbox');var _Checkbox2 = _interopRequireDefault(_Checkbox);
var _consts = require('./consts');
var _consts2 = require('../../consts');
var _utils = require('../../utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// import { SafeText } from '../SafeText';
/* eslint-disable react/no-find-dom-node */
var SingleColumnListPropTypes = {
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    index: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
    text: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
    disabled: _propTypes2.default.bool,
    showTips: _propTypes2.default.bool,
    icon: _propTypes2.default.string,
    renderer: _propTypes2.default.func })).
  isRequired,

  config: _propTypes2.default.shape({
    display: _propTypes2.default.bool,
    selectionMode: _propTypes2.default.oneOf(
    [_consts2.SelectionMode.SINGLE, _consts2.SelectionMode.MULTIPLE]),
    listType: _propTypes2.default.oneOf(
    [_consts.ListType.SINGLE, _consts.ListType.MULTIPLE]),
    disabled: _propTypes2.default.bool,
    maxHeight: _propTypes2.default.string,
    showTips: _propTypes2.default.bool, // determine whether show the tips when mouse hover the list item.
    showIcon: _propTypes2.default.bool, // determine whether show the icon after the list item
    checkable: _propTypes2.default.bool, // determine whether show the checkbox before list item
    sortable: _propTypes2.default.bool, // can be sorted
    filterable: _propTypes2.default.bool, // can be filter by inputted value
    asyncable: _propTypes2.default.bool, // determine whether the data can be loaded asyncable.
    isFuzzy: _propTypes2.default.bool,
    sortField: _propTypes2.default.string,
    filterField: _propTypes2.default.string,
    WCAG: _propTypes2.default.bool }).
  isRequired,

  onChange: _propTypes2.default.func.isRequired };var


SingleColumnList = function (_React$PureComponent) {(0, _inherits3.default)(SingleColumnList, _React$PureComponent);function SingleColumnList() {(0, _classCallCheck3.default)(this, SingleColumnList);return (0, _possibleConstructorReturn3.default)(this, (SingleColumnList.__proto__ || (0, _getPrototypeOf2.default)(SingleColumnList)).apply(this, arguments));}(0, _createClass3.default)(SingleColumnList, [{ key: 'click', value: function click(_ref)



    {var item = _ref.item,event = _ref.event;
      event.preventDefault();
      event.stopPropagation();

      if (item.disabled) {
        return null;
      }

      /* istanbul ignore else */
      if ((0, _isFunction2.default)(this.props.onChange)) {
        return this.props.onChange({ item: item });
      }

      return console.warn('no onChange function', item);
    } }, { key: 'renderRow', value: function renderRow(

    rowData, rowIndex) {var _this2 = this;var _props =
      this.props,config = _props.config,renderer = _props.renderer,selectedIndex = _props.selectedIndex,activeIndex = _props.activeIndex;var

      prefix =




      config.prefix,globalDisabled = config.disabled,globalShowTips = config.showTips,globalIcon = config.icon,WCAG = config.WCAG;

      rowData.index = rowData.index || rowIndex;var

      index =





      rowData.index,text = rowData.text,disabled = rowData.disabled,_rowData$showTips = rowData.showTips,showTips = _rowData$showTips === undefined ? globalShowTips : _rowData$showTips,_rowData$className = rowData.className,className = _rowData$className === undefined ? '' : _rowData$className,_rowData$icon = rowData.icon,icon = _rowData$icon === undefined ? globalIcon : _rowData$icon;

      var isSelected = selectedIndex.some(function (idx) {return '' + idx === '' + index;});

      var newData = (0, _extends3.default)({},
      rowData, {
        disabled: globalDisabled || disabled,
        showTips: showTips,
        selected: isSelected,
        icon: icon,
        focused: index === activeIndex });


      var tabIndex = void 0;
      if (WCAG) {
        tabIndex = newData.disabled ? -1 : 0;
      }

      return (
        _react2.default.createElement('li', {
            role: 'option',
            className: (0, _classnames2.default)(prefix + 'list__body-single-row',
            className,
            { disabled: newData.disabled },
            { selected: newData.selected },
            { focus: newData.focused }),

            key: 'li_' + index,
            title: showTips ? text : '',
            onClick: function onClick(event) {return _this2.click({ item: newData, event: event });},
            'aria-selected': isSelected,
            tabIndex: tabIndex },


          (0, _isFunction2.default)(renderer) ?
          renderer.call(this, { config: config, item: newData }) :
          this.renderCell({ config: config, item: newData })));



    } }, { key: 'renderCell', value: function renderCell(_ref2)

    {var _this3 = this;var config = _ref2.config,item = _ref2.item;var
      checkable = config.checkable,showIcon = config.showIcon;var


      text =



      item.text,icon = item.icon,disabled = item.disabled,selected = item.selected;
      return (
        _react2.default.createElement('div', { className: 'rowcontainer' },
          checkable &&
          _react2.default.createElement(_Checkbox2.default, {
            disabled: disabled,
            checked: selected,
            onClick: function onClick(event) {return _this3.click({ item: item, event: event });} }),

          (0, _utils.decodeHtmlStr)(text),

          showIcon && icon && _react2.default.createElement('span', { className: (0, _classnames2.default)('row-icon', (0, _defineProperty3.default)({}, icon, showIcon)) })));


    } }, { key: 'render', value: function render()

    {var _this4 = this;var _props2 =
      this.props,data = _props2.data,prefix = _props2.config.prefix;

      return (
        _react2.default.createElement('ul', {
            ref: function ref(ul) {_this4.ul = ul;},
            className: prefix + 'list__body-single',
            role: 'group' },


          data.map(function (rowData, rowIndex) {return _this4.renderRow(rowData, rowIndex);})));



    } }]);return SingleColumnList;}(_react2.default.PureComponent);SingleColumnList.displayName = 'SingleColumnList';SingleColumnList.propsType = SingleColumnListPropTypes;exports.default =


SingleColumnList;module.exports = exports['default'];