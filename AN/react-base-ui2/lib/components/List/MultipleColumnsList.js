'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _Table = require('../Table');var _Table2 = _interopRequireDefault(_Table);

var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var MultipleColumnsListPropTypes = {
  data: _propTypes2.default.arrayOf({
    index: _propTypes2.default.oneOf([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
    value: _propTypes2.default.object.isRequired,
    disabled: _propTypes2.default.bool,
    showTips: _propTypes2.default.bool,
    onClick: _propTypes2.default.func.isRequired }).
  isRequired,
  columns: _propTypes2.default.arrayOf({
    title: _propTypes2.default.string,
    value: _propTypes2.default.string.isRequired,
    class: _propTypes2.default.string,
    render: _propTypes2.default.func }).
  isRequired,
  config: _propTypes2.default.shape({
    selectionMode: _propTypes2.default.instanceOf(_consts.ListType),
    disabled: _propTypes2.default.bool,
    maxHeight: _propTypes2.default.string,
    showTips: _propTypes2.default.bool }) };var



MultipleColumnsList = function (_React$PureComponent) {(0, _inherits3.default)(MultipleColumnsList, _React$PureComponent);function MultipleColumnsList() {(0, _classCallCheck3.default)(this, MultipleColumnsList);return (0, _possibleConstructorReturn3.default)(this, (MultipleColumnsList.__proto__ || (0, _getPrototypeOf2.default)(MultipleColumnsList)).apply(this, arguments));}(0, _createClass3.default)(MultipleColumnsList, [{ key: 'render', value: function render()



    {var _props =




      this.props,data = _props.data,columns = _props.columns,config = _props.config;

      return (
        _react2.default.createElement(_Table2.default, (0, _extends3.default)({}, config, { rows: data, columns: columns })));

    } }]);return MultipleColumnsList;}(_react2.default.PureComponent);MultipleColumnsList.displayName = 'MultipleColumnsList';MultipleColumnsList.propsType = MultipleColumnsListPropTypes;exports.default =


MultipleColumnsList;module.exports = exports['default'];