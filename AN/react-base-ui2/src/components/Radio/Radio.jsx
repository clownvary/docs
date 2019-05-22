import React, { Component } from 'react';
import { bool, number, string, object, func, node, oneOfType } from 'prop-types';
import identity from 'lodash/identity';

import RadioComponent from './RadioComponent';

/** Default PropTypes of Radio.
 * @memberof Radio
*/
const RadioPropTypes = {
  /** Radio value.
   * @type {string|number}
   */
  value: oneOfType([string, number]),
  /** Determines enable/disable state.
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
  /** Child nodes.
   * @type {node}
   */
  children: node,
  /**  Fires when value change.
   * @event
   * @type {func}
  */
  onChange: func
};

const RadioProps = {
  onChange: identity
};

/** UI component of Radio */
class Radio extends Component {
  static displayName = 'Radio'
  static propTypes = RadioPropTypes;
  static defaultProps = RadioProps;

  static contextTypes = {
    auiRadioGroup: object
  }

  // Support legacy API for `this.refs.checkbox.checked`
  // It's not recommended because it breaks component encapsulation and
  // it violates the unidirectional data flow for React
  componentDidMount() {
    Object.defineProperties(this, {
      checked: {
        get() {
          return this.radioComponent.checked;
        },
        set(v) {
          this.radioComponent.checked = !!v;
        }
      }
    });
  }

  setRef = (radioComponent) => {
    this.radioComponent = radioComponent;
  }

  render() {
    const { children, ...rest } = this.props;
    const { auiRadioGroup } = this.context;

    // Proxy `onChange`, `checked` and `disabled` to `auiRadioGroup`
    if (auiRadioGroup) {
      rest.onChange = auiRadioGroup.onChange;
      rest.checked = this.props.value === auiRadioGroup.value;
      rest.disabled = this.props.disabled || auiRadioGroup.disabled;
      rest.size = this.props.size || auiRadioGroup.size;
      rest.name = this.props.name || auiRadioGroup.name;
    }

    return (
      <RadioComponent ref={this.setRef} {...rest}>
        {children}
      </RadioComponent>
    );
  }
}

export default Radio;
