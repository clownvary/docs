'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.responsivePropTypes = exports.withResponsiveProvider = undefined;var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _index = require('../../index');var _index2 = _interopRequireDefault(_index);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var withResponsiveProvider = exports.withResponsiveProvider = function withResponsiveProvider(WrappedComponent) {var _class, _temp;return _temp = _class = function (_Component) {(0, _inherits3.default)(_class, _Component);



    function _class(props, context) {(0, _classCallCheck3.default)(this, _class);var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this,
      props, context));
      _this.state = (0, _extends3.default)({},
      _index2.default._getState());return _this;

    }(0, _createClass3.default)(_class, [{ key: 'componentDidMount', value: function componentDidMount()

      {
        _index2.default.addEventListener('resize', this.onChange, this);
        _index2.default.addEventListener('orientationchange', this.onChange, this);
      } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

      {
        _index2.default.removeEventListener('resize', this.onChange, this);
        _index2.default.removeEventListener('orientationchange', this.onChange, this);
      } }, { key: 'onChange', value: function onChange(

      state) {
        this.setState((0, _extends3.default)({},
        state));

      } }, { key: 'render', value: function render()

      {
        return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, this.props, { responsive: (0, _extends3.default)({}, this.state) }));
      } }]);return _class;}(_react.Component), _class.displayName = 'ResponsiveProvider', _temp;};


var responsivePropTypes = exports.responsivePropTypes = _propTypes2.default.shape({
  orientation: _propTypes2.default.string,
  rangeName: _propTypes2.default.string,
  screenWidth: _propTypes2.default.number,
  isLg: _propTypes2.default.bool,
  isMd: _propTypes2.default.bool,
  isSm: _propTypes2.default.bool });exports.default =


withResponsiveProvider;