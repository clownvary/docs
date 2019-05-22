import PropTypes from 'prop-types';
import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import './index.less';

class Skylogix extends UIComponent {
  static propTypes = {
    getValue: PropTypes.func,
    editDefaultValue: PropTypes.string,
    disabled: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.bind(['handleChange']);
  }

  handleChange(e) {
    const { getValue } = this.props;
    /* istanbul ignore else */
    if (getValue) {
      getValue({ is_lighting_PIN_required: e.target.checked.toString() });
    }
  }

  render() {
    let defaultValue = true;
    const { editDefaultValue, disabled } = this.props;
    if (editDefaultValue && editDefaultValue === 'false') {
      defaultValue = false;
    }
    return (
      <div className="light-form">
        <Checkbox
          ref={(input) => { this.checkbox = input; }}
          checked={defaultValue}
          value={defaultValue}
          onChange={this.handleChange}
          disabled={disabled}
        >
          Lighting PIN required
        </Checkbox>
      </div>
    );
  }
}

export default Skylogix;
