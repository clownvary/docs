'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _reactDom = require('react-dom');var _reactDom2 = _interopRequireDefault(_reactDom);
var _isUndefined = require('lodash/isUndefined');var _isUndefined2 = _interopRequireDefault(_isUndefined);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _uniqueId = require('lodash/uniqueId');var _uniqueId2 = _interopRequireDefault(_uniqueId);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _Toast = require('./Toast');var _Toast2 = _interopRequireDefault(_Toast);
var _Position = require('./Position');var _Position2 = _interopRequireDefault(_Position);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var defaultToastsPropTypes = {
  prefixCls: _propTypes.string,
  maxCount: _propTypes.number,
  closeIcon: _propTypes.node,
  className: _propTypes.string,
  position: _propTypes.string,
  zIndex: _propTypes.number };


var defaultToastsProps = {
  prefixCls: 'an',
  position: _Position2.default.TOP };var


Toasts = function (_Component) {(0, _inherits3.default)(Toasts, _Component);function Toasts() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, Toasts);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Toasts.__proto__ || (0, _getPrototypeOf2.default)(Toasts)).call.apply(_ref, [this].concat(args))), _this), _this.






































    state = {
      notices: [] }, _this.


    getPositionClasses = function () {var _this$props =
      _this.props,position = _this$props.position,prefixCls = _this$props.prefixCls;
      var positions = position.split('-');

      return positions.map(function (p) {return prefixCls + '-toast-wrapper--' + p.toLowerCase();});
    }, _this.

    add = function (notice) {
      var key = notice.key = notice.key || (0, _uniqueId2.default)();var
      maxCount = _this.props.maxCount;
      _this.setState(function (previousState) {
        var notices = previousState.notices;
        var noticeIndex = notices.map(function (v) {return v.key;}).indexOf(key);
        var updatedNotices = notices.concat();
        if (noticeIndex !== -1) {
          updatedNotices.splice(noticeIndex, 1, notice);
        } else {
          if (maxCount && notices.length >= maxCount) {
            // XXX, use key of first item to update new added (let React to move exsiting
            // instead of remove and mount). Same key was used before for both a) external
            // manual control and b) internal react 'key' prop , which is not that good.
            notice.updateKey = updatedNotices[0].updateKey || updatedNotices[0].key;
            updatedNotices.shift();
          }
          updatedNotices.push(notice);
        }
        return {
          notices: updatedNotices };

      });
    }, _this.

    remove = function (key) {
      _this.setState(
      function (previousState) {return {
          notices: previousState.notices.filter(function (notice) {return notice.key !== key;}) };});


    }, _this.

    onClose = function (notice) {
      _this.remove(notice.key);
      (0, _isFunction2.default)(notice.onClose) && notice.onClose();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(Toasts, [{ key: 'render', value: function render()

    {var _this2 = this;var _props =
      this.props,className = _props.className,prefixCls = _props.prefixCls,style = _props.style,closeIcon = _props.closeIcon,position = _props.position,zIndex = _props.zIndex,children = _props.children;var
      notices = this.state.notices;
      var toasts = children || notices.map(function (notice, index) {
        var update = Boolean(index === notices.length - 1 && notice.updateKey);
        var key = notice.updateKey ? notice.updateKey : notice.key;


        return _react2.default.createElement(_Toast2.default, (0, _extends3.default)({
            prefixCls: prefixCls,
            key: key,
            update: update,
            onClose: function onClose() {return _this2.onClose(notice);},
            onClick: notice.onClick,
            closeIcon: closeIcon },
          notice),

          notice.content);

      });
      var toastsClassName = (0, _classnames2.default)(
      prefixCls + '-toast-wrapper',
      className,
      this.getPositionClasses(position));


      if (!(0, _isUndefined2.default)(zIndex)) {
        style.zIndex = zIndex;
      }

      return (
        _react2.default.createElement('div', { className: toastsClassName, style: style },
          toasts));


    } }]);return Toasts;}(_react.Component);Toasts.displayName = 'Toasts';Toasts.propTypes = defaultToastsPropTypes;Toasts.defaultProps = defaultToastsProps;Toasts.create = function (properties) {var container = properties.container,props = (0, _objectWithoutProperties3.default)(properties, ['container']);var div = document.createElement('div');container.appendChild(div);var called = false;return new _promise2.default(function (resolve) {function ref(toaster) {if (called) {return;}called = true;resolve({ show: function show() {var noticeProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};toaster.add(noticeProps);}, hide: function hide(key) {toaster.remove(key);}, component: toaster, clear: function clear() {_reactDom2.default.unmountComponentAtNode(div);div.parentNode.removeChild(div);} });}var toastsProps = (0, _extends3.default)({}, defaultToastsProps, props);_reactDom2.default.render(_react2.default.createElement(Toasts, (0, _extends3.default)({}, toastsProps, { ref: ref })), div);});};exports.default =


Toasts;module.exports = exports['default'];