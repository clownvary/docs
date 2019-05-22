'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');










var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);
var _isRegExp = require('lodash/isRegExp');var _isRegExp2 = _interopRequireDefault(_isRegExp);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _omit = require('lodash/omit');var _omit2 = _interopRequireDefault(_omit);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/** Default PropTypes of Input.
                                                                                                                                                                             * @memberof Input
                                                                                                                                                                            */
var InputPropTypes = {
  /** Sets the value of the Input.
                        * @type {string|number}
                       */
  value: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number]),
  /** Sets the default value of the Input.
                                                                             * @type {string|number}
                                                                            */
  defaultValue: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number]),
  /** Sets the type of the Input and can be 'text', 'password', 'button' etc.
                                                                                    * @type {string}
                                                                                   */
  type: _propTypes.string.isRequired,
  /** Determines the Input size.
                                       * @type {Size}
                                      */
  size: (0, _propTypes.oneOf)(['sm', 'md', 'lg']).isRequired,
  /** The label icon displayed before (on the left side of) the input field.
                                                               * @type {string}
                                                              */
  preIcon: _propTypes.string,
  /** The label text displayed before (on the left side of) the input field.
                               * @type {string}
                              */
  preText: _propTypes.string,
  /** The label icon displayed after (on the right side of) the input field.
                               * @type {string}
                              */
  postIcon: _propTypes.string,
  /** The label text displayed after (on the right side of) the input field.
                                * @type {string}
                               */
  postText: _propTypes.string,
  /** Determines if the input has errors.
                                * @type {boolean}
                               */
  errored: _propTypes.bool,
  /** Whether add 'input-group--icon' class for the input wrapper.
                             * @type {boolean}
                            */
  icon: _propTypes.bool, // Represent `icon-input`
  /** Whether the input is disabled.
   * @type {boolean}
  */
  disabled: _propTypes.bool,
  /** Customize class name for the input wrapper.
                              * @type {string}
                             */
  className: _propTypes.string,
  /** Determines the style of the input wrapper.
                                 * @type {object}
                                */
  style: _propTypes.object, // eslint-disable-line
  /** The callback function that is triggered when input value changes.
   * @type {func}
  */
  onChange: _propTypes.func,
  /** The component displayed after (on the right side of) the input field.
                              * @type {func|element}
                             */
  PreComponent: (0, _propTypes.oneOfType)([_propTypes.func, _propTypes.element]),
  /** The component displayed before (on the left side of) the input field.
                                                                                   * @type {func|element}
                                                                                  */
  PostComponent: (0, _propTypes.oneOfType)([_propTypes.func, _propTypes.element]),
  /** Gets the instance of the Input Component.
                                                                                    * @type {func}
                                                                                    * @param { domNode } input
                                                                                   */
  inputRef: _propTypes.func,
  /** Child Node
                              * @type {node}
                             */
  children: _propTypes.node,
  /** The content for aria-label
                              * @type {string}
                             */
  ariaLabel: _propTypes.string };


/** Default Props for Input */
var InputProps = {
  type: 'text',
  size: 'md',
  icon: false,
  onChange: _identity2.default,
  inputRef: _identity2.default,
  ariaLabel: 'Input box' };


/** UI component of Input */var
Input = function (_PureComponent) {(0, _inherits3.default)(Input, _PureComponent);function Input() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, Input);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Input.__proto__ || (0, _getPrototypeOf2.default)(Input)).call.apply(_ref, [this].concat(args))), _this), _this.



















    setWrappedComponentInstance = function (input) {
      _this.input = input;

      _this.props.inputRef(input);
    }, _this.

    handleBlur = function (e) {var _this$props =
      _this.props,onBlur = _this$props.onBlur,onLeave = _this$props.onLeave;

      if ((0, _isFunction2.default)(onBlur)) {
        onBlur(e);
      }

      if ((0, _isFunction2.default)(onLeave)) {
        onLeave({ value: e.target.value });
      }
    }, _this.



    handleChange = function (e) {var _this$props2 =
      _this.props,disabled = _this$props2.disabled,onChange = _this$props2.onChange,onValueChange = _this$props2.onValueChange;

      if (disabled) {
        return;
      }

      // If you want to access the event properties in an asynchronous way,
      // you should call `event.persist()`` on the event,
      // which will remove the synthetic event from the pool
      // and allow references to the event to be retained by user code.
      e.persist && e.persist();

      onChange(e);

      if ((0, _isFunction2.default)(onValueChange)) {
        onValueChange({ value: e.target.value });
      }
    }, _this.

    handleKeyPress = function (e) {var _this$props3 =
      _this.props,disabled = _this$props3.disabled,formula = _this$props3.formula;

      if (disabled || !(0, _isRegExp2.default)(formula)) {
        return;
      }

      var nativeEvent = e.nativeEvent || e;

      if (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) {return;}

      /*
                                                                                        nativeEvent.char  - IE11
                                                                                        nativeEvent.key   - Chrome， Safari, FF
                                                                                        nativeEvent.data  - Safari (IME)
                                                                                      */
      var ch = nativeEvent.char || nativeEvent.key || nativeEvent.data || e.key || e.data;
      if (ch && !formula.test(ch)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }, _this.

    handlePaste = function (e) {var
      formula = _this.props.formula;
      if ((0, _isRegExp2.default)(formula)) {
        var clipboardData = e.clipboardData || window.clipboardData;
        var text = clipboardData.getData('Text');
        if (text && !formula.test(text)) {
          e.stopPropagation();
          e.preventDefault();
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(Input, [{ key: 'componentDidMount', value: function componentDidMount() {(0, _defineProperties2.default)(this, { value: { get: function get() {return this.input.value;}, set: function set(v) {if (this.props.value === undefined) {this.input.value = v;}} } });} // If user doesn't pass in `value` and only use `defaultValue` as init value or not, then
    // saving it to state
  }, { key: 'render', value: function render() {var _classNames;var _props =
















      this.props,type = _props.type,size = _props.size,preIcon = _props.preIcon,preText = _props.preText,postIcon = _props.postIcon,postText = _props.postText,errored = _props.errored,disabled = _props.disabled,icon = _props.icon,className = _props.className,style = _props.style,PreComponent = _props.PreComponent,PostComponent = _props.PostComponent,ariaLabel = _props.ariaLabel,rest = (0, _objectWithoutProperties3.default)(_props, ['type', 'size', 'preIcon', 'preText', 'postIcon', 'postText', 'errored', 'disabled', 'icon', 'className', 'style', 'PreComponent', 'PostComponent', 'ariaLabel']);
      var inputClassName = (0, _classnames2.default)((_classNames = {

        'input-group': true }, (0, _defineProperty3.default)(_classNames, 'input-group--' +
      size, true), (0, _defineProperty3.default)(_classNames,
      'input-group--icon', icon), (0, _defineProperty3.default)(_classNames,
      'input-group--error', errored), (0, _defineProperty3.default)(_classNames,
      'input-group--disabled', disabled), _classNames),

      className);


      return (
        _react2.default.createElement('div', { className: inputClassName, style: style },
          PreComponent && _react2.default.createElement(PreComponent, { className: 'input-group__item' }),
          (preIcon || preText) &&
          _react2.default.createElement('span', { className: 'input-group__item' },
            preIcon && _react2.default.createElement('i', { className: 'icon ' + preIcon }),
            preText),


          _react2.default.createElement('input', (0, _extends3.default)({
            // the event handler for `onChange` not firing properly in React 15.2.0 + IE11
            // when paste text into textarea: https://github.com/facebook/react/issues/7211
            // will be removed when react fixed this issue
            onInput: this.handleChange },
          (0, _omit2.default)(rest, ['inputRef', 'formula', 'onValueChange', 'onEnter', 'onLeave']), {
            type: type,
            disabled: disabled,
            className: 'input input-group__field input__field',
            ref: this.setWrappedComponentInstance,
            'aria-label': ariaLabel,
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            onKeyPress: this.handleKeyPress,
            onPaste: this.handlePaste })),

          (postIcon || postText) &&
          _react2.default.createElement('span', { className: 'input-group__item' },
            postIcon && _react2.default.createElement('i', { className: 'icon ' + postIcon }),
            postText),


          PostComponent && _react2.default.createElement(PostComponent, { className: 'input-group__item' })));


    } }]);return Input;}(_react.PureComponent);Input.displayName = 'Input';Input.propTypes = InputPropTypes;Input.defaultProps = InputProps;exports.default =


Input;module.exports = exports['default'];