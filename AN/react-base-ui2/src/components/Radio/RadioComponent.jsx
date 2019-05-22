import React, { PureComponent } from 'react';
import { bool, string, object, func, node, oneOf, any } from 'prop-types';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import identity from 'lodash/identity';
import { Size3 } from '../../consts';

const RadioComponentPropTypes = {
  disabled: bool,
  checked: bool,
  defaultChecked: bool,
  className: string,
  style: object, // eslint-disable-line
  onChange: func,
  children: node,
  size: oneOf(['sm', 'md', 'lg']),
  value: any, // eslint-disable-line
  ariaLabel: string
};

const RadioComponentProps = {
  size: Size3.MEDIUM,
  defaultChecked: false,
  onChange: identity
};

class RadioComponent extends PureComponent {
  static displayName = 'RadioComponent';
  static propTypes = RadioComponentPropTypes;
  static defaultProps = RadioComponentProps;

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
    ('checked' in nextProps) && this.setState({
      checked: !!nextProps.checked
    });
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

    onChange(e);
  }

  handleChange = (e) => {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    this.triggerOnChange(e);
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      id,
      size,
      children,
      className,
      style,
      disabled,
      defaultChecked,
      ariaLabel,
      ...rest
    } = this.props;
    const { checked } = this.state;
    const radioWrapperClasses = classNames(
      {
        'radio-wrapper': true
      },
      className,
    );
    const radioClasses = classNames({
      radio: true,
      'radio--checked': checked,
      'radio--disabled': disabled,
      [`radio--${size}`]: size
    });

    let idValue = id;
    if (!id) {
      idValue = uniqueId('radio_attr_for_');
    }

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <label
        className={radioWrapperClasses}
        style={style}
        role="radio"
        aria-checked={checked}
        aria-disabled={disabled}
        htmlFor={idValue}
      >
        <span className={radioClasses}>
          <input
            id={idValue}
            ref={this.setWrappedComponentInstance}
            className="radio__input"
            disabled={disabled}
            type="radio"
            {...rest}
            checked={checked}
            onChange={this.handleChange}
          />
          <span
            className="radio__inner"
          />
          <span>{children}</span>
        </span>
      </label>
    );
  }
}

export default RadioComponent;
