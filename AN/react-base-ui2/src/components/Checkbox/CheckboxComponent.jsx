import React, { PureComponent } from 'react';
import { bool, string, object, func, node, any } from 'prop-types';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import identity from 'lodash/identity';

export default class Checkbox extends PureComponent {
  static displayName = 'CheckboxComponent'

  static propTypes = {
    disabled: bool,
    checked: bool,
    defaultChecked: bool,
    toggle: bool,
    size: string,
    className: string,
    style: object, // eslint-disable-line
    onChange: func,
    children: node,
    value: any, // eslint-disable-line
  }

  static defaultProps = {
    onChange: identity
  }

  constructor(props) {
    super(props);

    const checked = 'checked' in props ? props.checked : props.defaultChecked;

    this.state = {
      checked: !!checked
    };
  }

  componentDidMount() {
    Object.defineProperties(this, {
      checked: {
        get() {
          return this.input.checked;
        },
        set(v) {
          this.input.checked = !!v;
          this.setState({
            checked: !!v
          });
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }

  setWrappedComponentInstance = (input) => {
    this.input = input;
  }

  triggerOnChange = (e) => {
    const { onChange } = this.props;
    const checked = e.target.checked;

    if (!('checked' in this.props)) {
      this.setState({
        checked
      });
    }

    // If you want to access the event properties in an asynchronous way,
    // you should call `event.persist()`` on the event,
    // which will remove the synthetic event from the pool
    // and allow references to the event to be retained by user code.
    e.persist && e.persist();

    // The `value` prop is consumed by `CheckboxGroup`
    onChange(e, { value: this.props.value });
  }

  handleChange = (e) => {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    this.triggerOnChange(e);
  }

  render() {
    const {
      id,
      toggle,
      size,
      children,
      className,
      style,
      disabled,
      ...rest
    } = this.props;

    const { checked } = this.state;
    const checkboxWrapperClasses = classNames(
      {
        'checkbox-wrapper': true,
        toggle,
        'toggle--empty': !children && toggle
      },
      className,
    );
    const checkboxClasses = classNames({
      checkbox: !toggle,
      'checkbox--checked': !toggle && checked,
      'checkbox--disabled': !toggle && disabled,
      [`checkbox--${size}`]: size
    });

    let idValue = id;
    if (!id) {
      idValue = uniqueId('checkbox_attr_for_');
    }

    return (
      <label
        className={checkboxWrapperClasses}
        style={style}
        htmlFor={idValue}
        aria-disabled={disabled}
      >
        <span className={checkboxClasses}>
          <input
            role="checkbox"
            aria-checked={checked}
            id={idValue}
            ref={this.setWrappedComponentInstance}
            className="checkbox__input"
            disabled={disabled}
            type="checkbox"
            {...rest}
            checked={checked}
            onChange={this.handleChange}
          />
          {toggle ? (
            <span className="toggle__text" />
          ) : (
            <span className="checkbox__inner" />
          )}
          {children && <span className="checkbox__text">{children}</span>}
        </span>
      </label>
    );
  }
}
