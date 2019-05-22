import React, { PureComponent } from 'react';
import {
  bool,
  string,
  func,
  object,
  node,
  arrayOf,
  shape,
  any
} from 'prop-types';
import classNames from 'classnames';
import identity from 'lodash/identity';

import Radio from './Radio';

/** Default PropTypes of  RadioGroup.
 * @memberof RadioGroup
*/
const RadioGroupPropTypes = {
  /** Determines the enable/disable state.
   * @type {boolean}
   */
  disabled: bool,
  /** Determines the Radio size.
   * @type {Size}
   */
  size: string,
  /** Field name.
   * @type {string}
   */
  name: string,
  /** Customize CSS class name.
   * @type {string}
   */
  className: string,
  /**  Fires when value change.
   * @event
   * @type {func}
  */
  onChange: func,
  /** Array of child items. Each item is a text/value pair.
   * @type {object}
   */
  data: arrayOf(
    shape({
      text: string.isRequired,
      value: any.isRequired, // eslint-disable-line
    }),
  ),
  /** Child node
   * @type {node}
   */
  children: node,
  /** Value of radio group.
   * @type {any}
   */
  value: any, // eslint-disable-line
  /** Radio group value in default state.
   * @type {any}
   */
  defaultValue: any, // eslint-disable-line
};

const RadioGroupProps = {
  onChange: identity
};

/** UI component that displays a group of Radio. */
class RadioGroup extends PureComponent {
  static displayName = 'RadioGroup'
  static propTypes = RadioGroupPropTypes;
  static defaultProps = RadioGroupProps;

  static childContextTypes = {
    auiRadioGroup: object
  }

  constructor(props) {
    super(props);

    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    }

    this.state = {
      value
    };
  }

  getChildContext() {
    return {
      auiRadioGroup: {
        onChange: this.onChange,
        value: this.state.value,
        disabled: this.props.disabled,
        size: this.props.size,
        name: this.props.name
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  onChange = (e) => {
    const value = e.target.value;
    const { onChange } = this.props;

    if (!('value' in this.props)) {
      this.setState({
        value
      });
    }

    onChange(e);
  }

  render() {
    const { className, data } = this.props;
    const classes = classNames('radio-group', className);
    let children = this.props.children;

    if (data) {
      children = data.map(({ text, value, ...rest }, index) => (
        <Radio key={`${value}_${index}`} value={value} {...rest}>
          {text}
        </Radio>
      ));
    }

    return <div className={classes}>{children}</div>;
  }
}

export default RadioGroup;
