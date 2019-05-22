'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _Tag = require('../Tag');var _Tag2 = _interopRequireDefault(_Tag);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var SelectChoicePropTypes = {
  prefixCls: _propTypes2.default.string,
  /**
                                          * current choice item value
                                          */
  value: _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.number]),

  /**
                                 * determine the choice is the last one
                                 */
  last: _propTypes2.default.bool,
  /**
                                   * callback function triggered by user click choice remove icon
                                   */
  onChoiceRemove: _propTypes2.default.func,
  /**
                                             * function to customize the choice item
                                             */
  choiceRenderer: _propTypes2.default.func };


var SelectChoiceDefaultProps = {
  removeIcon: true,
  choiceRenderer: function choiceRenderer(props) {var
    choicePrefixCls = props.choicePrefixCls,text = props.text;
    return _react2.default.createElement('span', { className: choicePrefixCls + '__content' }, text);
  } };var


SelectChoice = function (_Component) {(0, _inherits3.default)(SelectChoice, _Component);function SelectChoice() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, SelectChoice);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SelectChoice.__proto__ || (0, _getPrototypeOf2.default)(SelectChoice)).call.apply(_ref, [this].concat(args))), _this), _this.



    onChoiceRemove = function (e) {var _this$props =
      _this.props,value = _this$props.value,onChoiceRemove = _this$props.onChoiceRemove;
      e.preventDefault();
      e.stopPropagation();
      return onChoiceRemove && onChoiceRemove(value);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(SelectChoice, [{ key: 'render', value: function render()

    {var _props =
      this.props,prefixCls = _props.prefixCls,last = _props.last,choiceRenderer = _props.choiceRenderer;
      var choicePrefixCls = prefixCls + '-selection-choice';
      var choiceNode = choiceRenderer((0, _extends3.default)({}, this.props, { choicePrefixCls: choicePrefixCls }));
      return (
        _react2.default.createElement('li', {
            className: (0, _classnames2.default)(choicePrefixCls, (0, _defineProperty3.default)({},
            choicePrefixCls + '__last', last)) },


          _react2.default.createElement(_Tag2.default, {
              className: choicePrefixCls + '__tag',
              closable: true,
              onClose: this.onChoiceRemove },

            choiceNode)));



    } }]);return SelectChoice;}(_react.Component);SelectChoice.propTypes = SelectChoicePropTypes;SelectChoice.defaultProps = SelectChoiceDefaultProps;exports.default =


SelectChoice;module.exports = exports['default'];