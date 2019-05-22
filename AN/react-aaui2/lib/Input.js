'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperties = require('babel-runtime/core-js/object/define-properties');

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = function (_PureComponent) {
  (0, _inherits3.default)(Input, _PureComponent);

  function Input() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.setWrappedComponentInstance = function (input) {
      _this.input = input;

      _this.props.inputRef(input);
    }, _this.handleChange = function (e) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange;


      if (disabled) {
        return;
      }

      // If you want to access the event properties in an asynchronous way,
      // you should call `event.persist()`` on the event,
      // which will remove the synthetic event from the pool
      // and allow references to the event to be retained by user code.
      e.persist && e.persist();

      onChange(e);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Input.prototype.componentDidMount = function componentDidMount() {
    (0, _defineProperties2.default)(this, {
      value: {
        get: function get() {
          return this.input.value;
        },
        set: function set(v) {
          if (this.props.value === undefined) {
            this.input.value = v;
          }
        }
      }
    });
  };

  // If user doesn't pass in `value` and only use `defaultValue` as init value or not, then
  // saving it to state


  Input.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        type = _props.type,
        size = _props.size,
        preIcon = _props.preIcon,
        preText = _props.preText,
        postIcon = _props.postIcon,
        postText = _props.postText,
        errored = _props.errored,
        disabled = _props.disabled,
        icon = _props.icon,
        className = _props.className,
        style = _props.style,
        PreComponent = _props.PreComponent,
        PostComponent = _props.PostComponent,
        rest = (0, _objectWithoutProperties3.default)(_props, ['type', 'size', 'preIcon', 'preText', 'postIcon', 'postText', 'errored', 'disabled', 'icon', 'className', 'style', 'PreComponent', 'PostComponent']);

    var inputClassName = (0, _classnames2.default)((_classNames = {
      'input-group': true
    }, _classNames['input-group--' + size] = true, _classNames['input-group--icon'] = icon, _classNames['input-group--error'] = errored, _classNames['input-group--disabled'] = disabled, _classNames), className);

    return _react2.default.createElement(
      'div',
      { className: inputClassName, style: style },
      PreComponent && _react2.default.createElement(PreComponent, { className: 'input-group__item' }),
      (preIcon || preText) && _react2.default.createElement(
        'span',
        { className: 'input-group__item' },
        preIcon && _react2.default.createElement('i', { className: 'icon ' + preIcon }),
        preText
      ),
      _react2.default.createElement('input', (0, _extends3.default)({
        // the event handler for `onChange` not firing properly in React 15.2.0 + IE11
        // when paste text into textarea: https://github.com/facebook/react/issues/7211
        // will be removed when react fixed this issue
        onInput: this.handleChange
      }, (0, _utils.omit)(rest, ['inputRef']), {
        type: type,
        disabled: disabled,
        className: 'input input-group__field',
        ref: this.setWrappedComponentInstance,
        onChange: this.handleChange
      })),
      (postIcon || postText) && _react2.default.createElement(
        'span',
        { className: 'input-group__item' },
        postIcon && _react2.default.createElement('i', { className: '' + postIcon }),
        postText
      ),
      PostComponent && _react2.default.createElement(PostComponent, { className: 'input-group__item' })
    );
  };

  return Input;
}(_react.PureComponent);

Input.displayName = 'AUIInput';
Input.propTypes = {
  value: _propTypes.string,
  defaultValue: _propTypes.string,
  type: _propTypes.string.isRequired,
  size: (0, _propTypes.oneOf)(['sm', 'm', 'lg']).isRequired,
  preIcon: _propTypes.string,
  preText: _propTypes.string,
  postIcon: _propTypes.string,
  postText: _propTypes.string,
  errored: _propTypes.bool,
  icon: _propTypes.bool, // Represent `icon-input`
  disabled: _propTypes.bool,
  className: _propTypes.string,
  style: _propTypes.object, // eslint-disable-line
  onChange: _propTypes.func,
  PreComponent: (0, _propTypes.oneOfType)([_propTypes.func, _propTypes.element]),
  PostComponent: (0, _propTypes.oneOfType)([_propTypes.func, _propTypes.element]),
  inputRef: _propTypes.func,
  children: _propTypes.node
};
Input.defaultProps = {
  type: 'text',
  size: 'm',
  icon: false,
  onChange: _utils.identity,
  inputRef: _utils.identity
};
exports.default = Input;
module.exports = exports['default'];