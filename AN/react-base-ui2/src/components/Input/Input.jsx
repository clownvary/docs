import React, { PureComponent } from 'react';
import {
  bool,
  string,
  func,
  object,
  node,
  oneOfType,
  oneOf,
  number,
  element
} from 'prop-types';
import classNames from 'classnames';
import identity from 'lodash/identity';
import isRegExp from 'lodash/isRegExp';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';

/** Default PropTypes of Input.
 * @memberof Input
*/
const InputPropTypes = {
  /** Sets the value of the Input.
   * @type {string|number}
  */
  value: oneOfType([string, number]),
  /** Sets the default value of the Input.
   * @type {string|number}
  */
  defaultValue: oneOfType([string, number]),
  /** Sets the type of the Input and can be 'text', 'password', 'button' etc.
   * @type {string}
  */
  type: string.isRequired,
  /** Determines the Input size.
   * @type {Size}
  */
  size: oneOf(['sm', 'md', 'lg']).isRequired,
  /** The label icon displayed before (on the left side of) the input field.
   * @type {string}
  */
  preIcon: string,
  /** The label text displayed before (on the left side of) the input field.
   * @type {string}
  */
  preText: string,
  /** The label icon displayed after (on the right side of) the input field.
   * @type {string}
  */
  postIcon: string,
  /** The label text displayed after (on the right side of) the input field.
   * @type {string}
  */
  postText: string,
  /** Determines if the input has errors.
   * @type {boolean}
  */
  errored: bool,
  /** Whether add 'input-group--icon' class for the input wrapper.
   * @type {boolean}
  */
  icon: bool, // Represent `icon-input`
  /** Whether the input is disabled.
   * @type {boolean}
  */
  disabled: bool,
  /** Customize class name for the input wrapper.
   * @type {string}
  */
  className: string,
  /** Determines the style of the input wrapper.
   * @type {object}
  */
  style: object, // eslint-disable-line
  /** The callback function that is triggered when input value changes.
   * @type {func}
  */
  onChange: func,
  /** The component displayed after (on the right side of) the input field.
   * @type {func|element}
  */
  PreComponent: oneOfType([func, element]),
  /** The component displayed before (on the left side of) the input field.
   * @type {func|element}
  */
  PostComponent: oneOfType([func, element]),
  /** Gets the instance of the Input Component.
   * @type {func}
   * @param { domNode } input
  */
  inputRef: func,
  /** Child Node
   * @type {node}
  */
  children: node,
  /** The content for aria-label
   * @type {string}
  */
  ariaLabel: string
};

/** Default Props for Input */
const InputProps = {
  type: 'text',
  size: 'md',
  icon: false,
  onChange: identity,
  inputRef: identity,
  ariaLabel: 'Input box'
};

/** UI component of Input */
class Input extends PureComponent {
  static displayName = 'Input'
  static propTypes = InputPropTypes;
  static defaultProps = InputProps;

  componentDidMount() {
    Object.defineProperties(this, {
      value: {
        get() {
          return this.input.value;
        },
        set(v) {
          if (this.props.value === undefined) {
            this.input.value = v;
          }
        }
      }
    });
  }

  setWrappedComponentInstance = (input) => {
    this.input = input;

    this.props.inputRef(input);
  }

  handleBlur = (e) => {
    const { onBlur, onLeave } = this.props;

    if (isFunction(onBlur)) {
      onBlur(e);
    }

    if (isFunction(onLeave)) {
      onLeave({ value: e.target.value });
    }
  }

  // If user doesn't pass in `value` and only use `defaultValue` as init value or not, then
  // saving it to state
  handleChange = (e) => {
    const { disabled, onChange, onValueChange } = this.props;

    if (disabled) {
      return;
    }

    // If you want to access the event properties in an asynchronous way,
    // you should call `event.persist()`` on the event,
    // which will remove the synthetic event from the pool
    // and allow references to the event to be retained by user code.
    e.persist && e.persist();

    onChange(e);

    if (isFunction(onValueChange)) {
      onValueChange({ value: e.target.value });
    }
  }

  handleKeyPress = (e) => {
    const { disabled, formula } = this.props;

    if (disabled || !isRegExp(formula)) {
      return;
    }

    const nativeEvent = e.nativeEvent || e;

    if ((nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey)) { return; }

    /*
      nativeEvent.char  - IE11
      nativeEvent.key   - Chrome， Safari, FF
      nativeEvent.data  - Safari (IME)
    */
    const ch = nativeEvent.char || nativeEvent.key || nativeEvent.data || e.key || e.data;
    if (ch && !formula.test(ch)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  handlePaste = (e) => {
    const { formula } = this.props;
    if (isRegExp(formula)) {
      const clipboardData = e.clipboardData || window.clipboardData;
      const text = clipboardData.getData('Text');
      if (text && !formula.test(text)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }

  render() {
    const {
      type,
      size,
      preIcon,
      preText,
      postIcon,
      postText,
      errored,
      disabled,
      icon,
      className,
      style,
      PreComponent,
      PostComponent,
      ariaLabel,
      ...rest
    } = this.props;
    const inputClassName = classNames(
      {
        'input-group': true,
        [`input-group--${size}`]: true,
        'input-group--icon': icon,
        'input-group--error': errored,
        'input-group--disabled': disabled
      },
      className,
    );

    return (
      <div className={inputClassName} style={style}>
        {PreComponent && <PreComponent className="input-group__item" />}
        {(preIcon || preText) && (
          <span className="input-group__item">
            {preIcon && <i className={`icon ${preIcon}`} />}
            {preText}
          </span>
        )}
        <input
          // the event handler for `onChange` not firing properly in React 15.2.0 + IE11
          // when paste text into textarea: https://github.com/facebook/react/issues/7211
          // will be removed when react fixed this issue
          onInput={this.handleChange}
          {...omit(rest, ['inputRef', 'formula', 'onValueChange', 'onEnter', 'onLeave'])}
          type={type}
          disabled={disabled}
          className="input input-group__field input__field"
          ref={this.setWrappedComponentInstance}
          aria-label={ariaLabel}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onPaste={this.handlePaste}
        />
        {(postIcon || postText) && (
          <span className="input-group__item">
            {postIcon && <i className={`icon ${postIcon}`} />}
            {postText}
          </span>
        )}
        {PostComponent && <PostComponent className="input-group__item" />}
      </div>
    );
  }
}

export default Input;
