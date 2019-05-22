import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$defineProperties from 'babel-runtime/core-js/object/define-properties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, string, func, object, node, oneOfType, oneOf, element } from 'prop-types';
import classNames from 'classnames';

import { identity, omit } from './shared/utils';

var Input = function (_PureComponent) {
  _inherits(Input, _PureComponent);

  function Input() {
    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.setWrappedComponentInstance = function (input) {
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Input.prototype.componentDidMount = function componentDidMount() {
    _Object$defineProperties(this, {
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
        rest = _objectWithoutProperties(_props, ['type', 'size', 'preIcon', 'preText', 'postIcon', 'postText', 'errored', 'disabled', 'icon', 'className', 'style', 'PreComponent', 'PostComponent']);

    var inputClassName = classNames((_classNames = {
      'input-group': true
    }, _classNames['input-group--' + size] = true, _classNames['input-group--icon'] = icon, _classNames['input-group--error'] = errored, _classNames['input-group--disabled'] = disabled, _classNames), className);

    return React.createElement(
      'div',
      { className: inputClassName, style: style },
      PreComponent && React.createElement(PreComponent, { className: 'input-group__item' }),
      (preIcon || preText) && React.createElement(
        'span',
        { className: 'input-group__item' },
        preIcon && React.createElement('i', { className: 'icon ' + preIcon }),
        preText
      ),
      React.createElement('input', _extends({
        // the event handler for `onChange` not firing properly in React 15.2.0 + IE11
        // when paste text into textarea: https://github.com/facebook/react/issues/7211
        // will be removed when react fixed this issue
        onInput: this.handleChange
      }, omit(rest, ['inputRef']), {
        type: type,
        disabled: disabled,
        className: 'input input-group__field',
        ref: this.setWrappedComponentInstance,
        onChange: this.handleChange
      })),
      (postIcon || postText) && React.createElement(
        'span',
        { className: 'input-group__item' },
        postIcon && React.createElement('i', { className: '' + postIcon }),
        postText
      ),
      PostComponent && React.createElement(PostComponent, { className: 'input-group__item' })
    );
  };

  return Input;
}(PureComponent);

Input.displayName = 'AUIInput';
Input.propTypes = {
  value: string,
  defaultValue: string,
  type: string.isRequired,
  size: oneOf(['sm', 'm', 'lg']).isRequired,
  preIcon: string,
  preText: string,
  postIcon: string,
  postText: string,
  errored: bool,
  icon: bool, // Represent `icon-input`
  disabled: bool,
  className: string,
  style: object, // eslint-disable-line
  onChange: func,
  PreComponent: oneOfType([func, element]),
  PostComponent: oneOfType([func, element]),
  inputRef: func,
  children: node
};
Input.defaultProps = {
  type: 'text',
  size: 'm',
  icon: false,
  onChange: identity,
  inputRef: identity
};
export default Input;