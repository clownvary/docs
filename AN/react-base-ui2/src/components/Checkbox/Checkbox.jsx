import React, { Component } from 'react';
import { bool, string, object, func, node, any } from 'prop-types';
import identity from 'lodash/identity';

import CheckboxComponent from './CheckboxComponent';

/**
 * Default PropTypes of Checkbox.
*/
const CheckboxPropTypes = {
  /**
   * Determines enable/disable state.
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
   * Child nodes.
   */
  children: node,
  /**
   * Fires when value change.
  */
  onChange: func,
  /**
   * Checkbox value.
   */
  value: any // eslint-disable-line
};

const CheckboxProps = {
  onChange: identity
};

/** UI component of Checkbox */
class Checkbox extends Component {
  static displayName = 'Checkbox'
  static propTypes = CheckboxPropTypes;
  static defaultProps = CheckboxProps;

  static contextTypes = {
    auiCheckboxGroup: object
  }

  // Support legacy API for `this.refs.checkbox.checked`
  // It's not recommended because it breaks component encapsulation and
  // it violates the unidirectional data flow for React
  componentDidMount() {
    Object.defineProperties(this, {
      checked: {
        get() {
          return this.checkboxComponent.checked;
        },
        set(v) {
          this.checkboxComponent.checked = !!v;
        }
      }
    });
  }

  render() {
    const { children, ...rest } = this.props;
    const { auiCheckboxGroup } = this.context;

    // Proxy `onChange`, `checked` and `disabled` to `auiCheckboxGroup`
    if (auiCheckboxGroup) {
      rest.onChange = auiCheckboxGroup.onChange;
      rest.checked =
        auiCheckboxGroup.value &&
        auiCheckboxGroup.value.indexOf(this.props.value) !== -1;
      rest.disabled = this.props.disabled || auiCheckboxGroup.disabled;
      rest.size = this.props.size || auiCheckboxGroup.size;
      rest.name = this.props.name || auiCheckboxGroup.name;
    }

    return (
      <CheckboxComponent
        ref={(c) => { this.checkboxComponent = c; }}
        {...rest}
      >
        {children}
      </CheckboxComponent>
    );
  }
}

export default Checkbox;
