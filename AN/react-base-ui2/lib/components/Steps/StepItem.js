'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var propTypes = {
  className: _propTypes2.default.string,
  prefixCls: _propTypes2.default.string,
  style: _propTypes2.default.object,
  /**
                                      * to specify the status. It will be automatically set by current of Steps if
                                      * not configured. Optional values are, wait, process, finish, error, other
                                      */
  status: _propTypes2.default.string,
  /**
                                       * icon of the step, optional property
                                       */
  icon: _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.number,
  _propTypes2.default.node]),

  /**
                               * description of the step, optional property
                               */
  description: _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.number,
  _propTypes2.default.node]),

  /**
                               * title of the step
                               */
  title: _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.number,
  _propTypes2.default.node]) };var



StepItem = function (_React$Component) {(0, _inherits3.default)(StepItem, _React$Component);function StepItem() {(0, _classCallCheck3.default)(this, StepItem);return (0, _possibleConstructorReturn3.default)(this, (StepItem.__proto__ || (0, _getPrototypeOf2.default)(StepItem)).apply(this, arguments));}(0, _createClass3.default)(StepItem, [{ key: 'render', value: function render()


    {var _classNames;var _props =

      this.props,className = _props.className,prefixCls = _props.prefixCls,style = _props.style,status = _props.status,icon = _props.icon,description = _props.description,title = _props.title,currentIndex = _props.currentIndex;
      var stepItemCls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames,
      prefixCls + '__item', true), (0, _defineProperty3.default)(_classNames,
      prefixCls + '__item--' + status, true), (0, _defineProperty3.default)(_classNames,
      prefixCls + '__item--one', currentIndex === 1), _classNames),
      className);

      var iconTypeCls = (0, _classnames2.default)('icon', {
        'icon-check-thin': status === 'finish',
        'icon-close': status === 'error' });


      return (
        _react2.default.createElement('div', {
            className: stepItemCls,
            style: style },

          _react2.default.createElement('div', { className: prefixCls + '__item-tail' }),
          _react2.default.createElement('div', { className: prefixCls + '__item-icon' },

            icon ||
            _react2.default.createElement('div', { className: 'icon-box' },
              _react2.default.createElement('span', null, currentIndex),

              (status === 'finish' || status === 'error') &&
              _react2.default.createElement('div', { className: 'finish-icon' },
                _react2.default.createElement('i', { className: iconTypeCls })))),






          _react2.default.createElement('div', { className: prefixCls + '__item-content' },
            _react2.default.createElement('div', { className: prefixCls + '__item-content-box' },
              _react2.default.createElement('div', { className: prefixCls + '__item-title' },
                title),

              description && _react2.default.createElement('div', { className: prefixCls + '__item-description' }, description)))));




    } }]);return StepItem;}(_react2.default.Component);StepItem.propTypes = propTypes;exports.default = StepItem;module.exports = exports['default'];