'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _consts = require('../../consts');
var _menu = require('../../services/menu');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

DropdownMenu = function (_React$Component) {(0, _inherits3.default)(DropdownMenu, _React$Component);function DropdownMenu() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, DropdownMenu);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DropdownMenu.__proto__ || (0, _getPrototypeOf2.default)(DropdownMenu)).call.apply(_ref, [this].concat(args))), _this), _this.






























    onMenuSelected = function (_ref2) {var value = _ref2.value;
      if (value === 'Download') {
        _this.props.download(_this.props.item);
      } else {
        _this.props.deleteFile(_this.props.fileIndex);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(DropdownMenu, [{ key: 'componentDidMount', value: function componentDidMount() {var readonly = this.props.readonly;var items = [{ text: 'Download', value: 'Download' }];if (!readonly) {items.push({ text: 'Delete', value: 'Delete' });}var menuOptions = { data: items, onSelected: this.onMenuSelected };var popupOptions = { dockStyle: _consts.Dock.TOP_LEFT, className: this.props.prefix + '-menu', target: this.toggleIcon };(0, _menu.attachPopupMenu)('', menuOptions, popupOptions);} }, { key: 'componentWillUnmount', value: function componentWillUnmount() {(0, _menu.clearPopupMenu)(this.toggleIcon);} }, { key: 'render', value: function render()

    {var _this2 = this;
      return (
        _react2.default.createElement('span', { className: this.props.prefix + '-item-menu' },
          _react2.default.createElement('i', {
            className: 'icon icon-chevron-down',
            ref: function ref(c) {_this2.toggleIcon = c;} })));



    } }]);return DropdownMenu;}(_react2.default.Component);exports.default = DropdownMenu;module.exports = exports['default'];