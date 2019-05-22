import React, { PureComponent } from 'react';
import {
  bool,
  string,
  func,
  object,
  node,
  array,
  arrayOf,
  shape,
  any
} from 'prop-types';
import classNames from 'classnames';
import identity from 'lodash/identity';

import Checkbox from './Checkbox';

/** Default PropTypes of  CheckboxGroup.
 * @memberof CheckboxGroup
*/
const CheckboxGroupPropTypes = {
  /**
   * Determines the enable/disable state.
   */
  disabled: bool,
  /**
   * Determines the Checkbox size.
   */
  size: string,
  /**
   * Field name.
   */
  name: string,
  /**
   * Customize CSS class name.
   */
  className: string,
  /**
   * Fires when value change.
   */
  onChange: func,
  /**
   * Array of child items. Each item is a text/value pair.
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
  /**
   * Array of checked value.
   */
  value: array, // eslint-disable-line
  /**
   * Array of checked value in default state.
   */
  defaultValue: array, // eslint-disable-line
};

const CheckboxGroupProps = {
  onChange: identity
};

/** UI component that displays a group of Checkbox. */
class CheckboxGroup extends PureComponent {
  static displayName = 'CheckboxGroup'
  static propTypes = CheckboxGroupPropTypes
  static defaultProps = CheckboxGroupProps;

  static childContextTypes = {
    auiCheckboxGroup: object
  }

  constructor(props) {
    super(props);

    let value = [];
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
      auiCheckboxGroup: {
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

  onChange = (e, { value: optionValue }) => {
    // Should construct one new array for re-rendering
    const value = [...this.state.value];
    const { onChange } = this.props;
    const index = value.indexOf(optionValue);

    if (index === -1) {
      // If NOT found, then add it
      value.push(optionValue);
    } else {
      // If found, then delete it
      value.splice(index, 1);
    }

    if (!('value' in this.props)) {
      this.setState({
        value
      });
    }

    onChange(value);
  }

  render() {
    const { className, data } = this.props;
    const classes = classNames('checkbox-group', className);
    let children = this.props.children;

    if (data) {
      children = data.map(({ text, value, ...rest }, index) => (
        <Checkbox key={index} value={value} {...rest}>
          {text}
        </Checkbox>
      ));
    }

    return <div className={classes}>{children}</div>;
  }
}

export default CheckboxGroup;
