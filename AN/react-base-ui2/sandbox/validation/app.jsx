import React from 'react';

import { InputField } from '../../src/components/Input';
import { InputNumericField } from '../../src/components/InputNumeric';

import '../base.less';
import '../layout.less';
import './app.less';


class App extends React.PureComponent {
  onValidated(result) {
    if (result && !result.isValid) {
    }
  }

  render() {
    return (
      <div>
        <div className="sample-content">
          <div className="sample-form">
            <h3>
              3 types of numeric inputs are available:
            </h3>
            <div className="row">
              <InputField
                rules="required|minLength:6|maxLength:12"
                fieldName="Name"
                fieldLabel="Name:"
                showLabel
                showError
                onValidated={e => this.onValidated(e)}
              />
            </div>
            <div className="row">
              <InputNumericField
                type="currency"
                rules="required|min:5|max:10"
                fieldName="Age"
                fieldLabel="Age:"
                showLabel
                showError
                showValidationTip
                onValidated={e => this.onValidated(e)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
