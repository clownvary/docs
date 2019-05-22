'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/** Default PropTypes for LoadingBar
                                                                                                                                     * @memberof LoadingBar
                                                                                                                                    */
var LoadingBarPropTypes = {
  /** Determines whether the loading status is displayed for global scope.
                             * @type {boolean}
                             */
  fullScreen: _propTypes2.default.bool,
  /** The indicating text.
                                         * @type {string}
                                         */
  text: _propTypes2.default.string,
  /** Determines whether showing the mask background.
                                     * @type {boolean}
                                     */
  showMask: _propTypes2.default.bool,
  /** The spin size.
                                       * Only sm/md/lg are supported.
                                       * @type {Size}
                                       */
  spinSize: _propTypes2.default.string };


var LoadingBarProps = {
  fullScreen: false,
  text: '',
  showMasK: true,
  spinSize: _consts.Size3.SMALL };


/** UI Component that displays loading or waiting status. */var
LoadingBar = function (_PureComponent) {(0, _inherits3.default)(LoadingBar, _PureComponent);function LoadingBar() {(0, _classCallCheck3.default)(this, LoadingBar);return (0, _possibleConstructorReturn3.default)(this, (LoadingBar.__proto__ || (0, _getPrototypeOf2.default)(LoadingBar)).apply(this, arguments));}(0, _createClass3.default)(LoadingBar, [{ key: 'render', value: function render()




    {var _props =
      this.props,_props$fullScreen = _props.fullScreen,fullScreen = _props$fullScreen === undefined ? false : _props$fullScreen,_props$text = _props.text,text = _props$text === undefined ? '' : _props$text,className = _props.className,_props$showMask = _props.showMask,showMask = _props$showMask === undefined ? true : _props$showMask,_props$spinSize = _props.spinSize,spinSize = _props$spinSize === undefined ? _consts.Size3.SMALL : _props$spinSize;

      return (
        _react2.default.createElement('div', { className: (0, _classnames2.default)(fullScreen ? 'loading-bar fullscreen' : 'loading-bar ' + spinSize, className) },

          showMask && _react2.default.createElement('div', { className: 'loading-bar__mask' }),

          _react2.default.createElement('div', { className: 'loading-bar__outer-box' },
            _react2.default.createElement('div', { className: 'loading-bar__icon' },
              _react2.default.createElement('i', { className: 'icon icon-loading-m icon-spin' }),
              _react2.default.createElement('div', { className: 'loading-bar__text' }, text)))));




    } }]);return LoadingBar;}(_react.PureComponent);LoadingBar.displayName = 'LoadingBar';LoadingBar.propTypes = LoadingBarPropTypes;LoadingBar.defaultProps = LoadingBarProps;exports.default =


LoadingBar;module.exports = exports['default'];