'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _StepItem = require('./StepItem');var _StepItem2 = _interopRequireDefault(_StepItem);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var propTypes = {
  prefixCls: _propTypes2.default.string,
  /**
                                          * className to apply
                                          */
  className: _propTypes2.default.string,
  /**
                                          * to specify the direction of the step bar, horizontal or vertical
                                          */
  direction: _propTypes2.default.string,
  /**
                                          * place title and description with horizontal or vertical direction
                                          */
  labelPlacement: _propTypes2.default.oneOf(['horizontal', 'vertical']).isRequired,
  /**
                                                                                    * to specify the status of current step, can be set to one of
                                                                                    * the following values, wait process finish error
                                                                                    */
  currentStatus: _propTypes2.default.oneOf(['wait', 'process', 'finish', 'error']).isRequired,
  style: _propTypes2.default.object,
  /**
                                     * to set the current step, counting from 1. You can overwrite this state by using status of Step
                                     */
  current: _propTypes2.default.number,
  /**
                                        * Data record array to be displayed
                                        */
  dataSource: _propTypes2.default.oneOfType([
  _propTypes2.default.arrayOf(_propTypes2.default.shape({
    text: _propTypes2.default.oneOfType([
    _propTypes2.default.string,
    _propTypes2.default.number,
    _propTypes2.default.node]),

    style: _propTypes2.default.object,
    icon: _propTypes2.default.oneOfType([
    _propTypes2.default.string,
    _propTypes2.default.number,
    _propTypes2.default.node]),

    status: _propTypes2.default.string,
    description: _propTypes2.default.oneOfType([
    _propTypes2.default.string,
    _propTypes2.default.number,
    _propTypes2.default.node]),

    className: _propTypes2.default.string }))]) };var




Steps = function (_React$Component) {(0, _inherits3.default)(Steps, _React$Component);function Steps() {(0, _classCallCheck3.default)(this, Steps);return (0, _possibleConstructorReturn3.default)(this, (Steps.__proto__ || (0, _getPrototypeOf2.default)(Steps)).apply(this, arguments));}(0, _createClass3.default)(Steps, [{ key: 'getSetpItemClassName', value: function getSetpItemClassName(












    className, index) {var _props =
      this.props,prefixCls = _props.prefixCls,dataSource = _props.dataSource,children = _props.children;
      var nextItem = void 0;
      if (children) {
        var nextChilren = children[index + 1] || {};
        nextItem = nextChilren.props || {};
      } else {
        nextItem = dataSource[index + 1] || {};
      }

      return (0, _classnames2.default)(className, (0, _defineProperty3.default)({},
      prefixCls + '__item-next--' + nextItem.status, nextItem.status));

    } }, { key: 'getSetpStatus', value: function getSetpStatus(

    item, index) {var _props2 =
      this.props,currentStatus = _props2.currentStatus,current = _props2.current;
      var status = void 0;
      if (item.status) {
        status = item.status;
      } else if (index + 1 === current) {
        status = currentStatus;
      } else if (index + 1 < current) {
        status = 'finish';
      } else {
        status = 'wait';
      }
      return status;
    } }, { key: 'renderItems', value: function renderItems()

    {var _this2 = this;var _props3 =
      this.props,prefixCls = _props3.prefixCls,dataSource = _props3.dataSource,children = _props3.children;

      if (children) {
        var newChildren = [];
        _react2.default.Children.forEach(children, function (child, index) {
          var childProps = {
            prefixCls: prefixCls,
            key: index,
            currentIndex: index + 1,
            className: _this2.getSetpItemClassName(child.className, index),
            status: _this2.getSetpStatus(child.props, index) };

          newChildren.push(_react2.default.cloneElement(child, childProps));
        });
        return newChildren;
      }

      return dataSource.map(function (item, index) {
        if (!item) {
          return null;
        }
        return (
          _react2.default.createElement(_StepItem2.default, {
            key: index,
            currentIndex: index + 1,
            style: item.style,
            className: _this2.getSetpItemClassName(item.className, index),
            prefixCls: prefixCls,
            title: item.title,
            icon: item.icon,
            status: _this2.getSetpStatus(item, index),
            description: item.description }));


      });
    } }, { key: 'render', value: function render()

    {var _props4 =

      this.props,prefixCls = _props4.prefixCls,style = _props4.style,className = _props4.className,direction = _props4.direction,labelPlacement = _props4.labelPlacement,dataSource = _props4.dataSource,children = _props4.children;

      if (!dataSource.length && !children) {
        return null;
      }
      var classString = (0, _classnames2.default)(
      prefixCls,
      prefixCls + '--' + direction,
      prefixCls + '-label--' + labelPlacement,
      className);


      return (
        _react2.default.createElement('div', { className: classString, style: style },
          this.renderItems()));


    } }]);return Steps;}(_react2.default.Component);Steps.propTypes = propTypes;Steps.StepItem = _StepItem2.default;Steps.defaultProps = { prefixCls: _consts.DefaultCSSPrefix + '-steps', dataSource: [], direction: 'horizontal', labelPlacement: 'horizontal', style: {}, current: 1, currentStatus: 'process' };exports.default = Steps;module.exports = exports['default'];