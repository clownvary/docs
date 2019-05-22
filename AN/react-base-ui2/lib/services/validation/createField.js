'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _uniq = require('lodash/uniq');var _uniq2 = _interopRequireDefault(_uniq);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _concat = require('lodash/concat');var _concat2 = _interopRequireDefault(_concat);
var _FieldLayout = require('./consts/FieldLayout');var FieldLayout = _interopRequireWildcard(_FieldLayout);
var _ErrorAlignment = require('./consts/ErrorAlignment');var ErrorAlignment = _interopRequireWildcard(_ErrorAlignment);
var _consts = require('../../consts');
var _Tooltip = require('../../components/Tooltip');var _Tooltip2 = _interopRequireDefault(_Tooltip);
var _buildErrorMessage = require('./utils/buildErrorMessage');var _buildErrorMessage2 = _interopRequireDefault(_buildErrorMessage);
var _Validation = require('./Validation');var _Validation2 = _interopRequireDefault(_Validation);
var _ErrorList = require('./components/ErrorList');var _ErrorList2 = _interopRequireDefault(_ErrorList);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var createField = function createField(WrappedComponent) {return function (_PureComponent) {(0, _inherits3.default)(_class2, _PureComponent);

    function _class2(props) {(0, _classCallCheck3.default)(this, _class2);var _this = (0, _possibleConstructorReturn3.default)(this, (_class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call(this,
      props));_this.



























      onValidate = function (value) {var _this$props =



        _this.props,_this$props$fieldName = _this$props.fieldName,fieldName = _this$props$fieldName === undefined ? 'Entry' : _this$props$fieldName,onValidated = _this$props.onValidated;

        var result = _this.validator.validate(fieldName, value);
        _this.setState({
          validationError: result.message });


        if ((0, _isFunction2.default)(onValidated)) {
          onValidated(result);
        }
      };_this.

      buildTooltipContent = function (rules) {
        if (!rules || rules.length === 0) return '';var

        fieldName = _this.props.fieldName;
        var ruleSet = _this.validator.getRuleSet();
        return (
          _react2.default.createElement('div', { className: 'an-validation-tooltip' },

            ruleSet.map(function (rule, i) {return (
                _react2.default.createElement('div', { key: i },
                  _react2.default.createElement('span', null, (0, _buildErrorMessage2.default)(rule.message, fieldName, rule.param))));})));





      };_this.

      onEnter = function (target) {var _this$props$showValid =


        _this.props.showValidationTip,showValidationTip = _this$props$showValid === undefined ? false : _this$props$showValid;

        if (showValidationTip) {
          var options = {
            content: _this.buildTooltipContent(),
            dockStyle: _consts.Dock.TOP_LEFT,
            effect: _consts.Effect.FADE,
            distance: 4,
            showShadow: true,
            autoClose: 3000 };


          _Tooltip2.default.open(target, options);
        }
      };_this.

      onLeave = function (value) {
        var onLeave = _this.props.onLeave;

        if ((0, _isFunction2.default)(onLeave)) {
          onLeave(value);
        }

        _this.dirty && _this.onValidate(value);
        _this.dirty = false;
        _Tooltip2.default.close();
      };_this.

      onValueChange = function () {
        _this.dirty = true;var
        validationError = _this.state.validationError;
        if (validationError) {
          _this.setState({
            validationError: '' });

        }
      };_this.

      onError = function (messages) {
        var customMessages = [];
        if ((0, _isString2.default)(messages) && messages !== '') {
          customMessages.push(messages);
        } else if ((0, _isArray2.default)(messages)) {
          customMessages = messages;
        }

        _this.setState({
          customMessages: customMessages });

      };_this.state = { validationError: '', customMessages: [] };_this.dirty = false;return _this;}(0, _createClass3.default)(_class2, [{ key: 'componentDidMount', value: function componentDidMount() {var _props = this.props,_props$rules = _props.rules,rules = _props$rules === undefined ? '' : _props$rules,validationMessages = _props.validationMessages;this.validator = _Validation2.default.createValidator(rules, validationMessages);} }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(nextProps) {var nextCustomMessages = nextProps.customMessages;var curCustomMessages = this.props.customMessages;if (curCustomMessages !== nextCustomMessages) {this.onError(nextCustomMessages);}} }, { key: 'render', value: function render()

      {var _this2 = this;var _state =
        this.state,_state$validationErro = _state.validationError,validationError = _state$validationErro === undefined ? '' : _state$validationErro,_state$customMessages = _state.customMessages,customMessages = _state$customMessages === undefined ? [] : _state$customMessages;
        var errorMessages = (0, _concat2.default)([], validationError || [], customMessages);var _props2 =






        this.props,_props2$fieldLayout = _props2.fieldLayout,fieldLayout = _props2$fieldLayout === undefined ? FieldLayout.ROW : _props2$fieldLayout,_props2$fieldLabel = _props2.fieldLabel,fieldLabel = _props2$fieldLabel === undefined ? '' : _props2$fieldLabel,_props2$showLabel = _props2.showLabel,showLabel = _props2$showLabel === undefined ? false : _props2$showLabel,_props2$showError = _props2.showError,showError = _props2$showError === undefined ? false : _props2$showError,_props2$errorAlignmen = _props2.errorAlignment,errorAlignment = _props2$errorAlignmen === undefined ? ErrorAlignment.BOTTOM : _props2$errorAlignmen;

        var clsFieldLayout = 'an-field-layout-' + fieldLayout;
        var clsErrorLayout = 'an-error-layout-' + errorAlignment;
        return (
          _react2.default.createElement('div', { className: (0, _classnames2.default)('an-validation-field', clsErrorLayout) },
            _react2.default.createElement('div', { className: (0, _classnames2.default)('an-validation-field__wrap', clsFieldLayout) },
              showLabel && _react2.default.createElement('span', { className: 'an-validation-field__label' }, fieldLabel),
              _react2.default.createElement('div', { className: (0, _classnames2.default)('an-validation-field__content') },
                _react2.default.createElement(WrappedComponent, {
                  ref: function ref(c) {_this2.wrappedComponent = c;},
                  onEnter: function onEnter(_ref) {var target = _ref.target;return _this2.onEnter(target);},
                  onLeave: function onLeave(_ref2) {var value = _ref2.value;return _this2.onLeave(value);},
                  onValueChange: function onValueChange(_ref3) {var value = _ref3.value;return _this2.onValueChange(value);},
                  onError: function onError(_ref4) {var messages = _ref4.messages;return _this2.onError(messages);} }))),



            showError && _react2.default.createElement(_ErrorList2.default, { className: 'an-validation-field__error', messages: (0, _uniq2.default)(errorMessages) })));


      } }]);return _class2;}(_react.PureComponent);};exports.default =


createField;module.exports = exports['default'];