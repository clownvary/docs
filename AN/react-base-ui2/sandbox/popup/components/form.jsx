import React from 'react';
import Button from '../../../src/components//Button';

import './form.less';

class Form extends React.PureComponent {
  onCancelClicked() {
    const { onCancel } = this.props;
    if (onCancel && typeof onCancel === 'function') {
      onCancel();
    }
  }

  onOKClicked() {
    const { onOK } = this.props;
    if (onOK && typeof onOK === 'function') {
      onOK(this.sigInput.value);
    }
  }

  render() {
    const { inputValue = '' } = this.props;
    return (
      <div className="demo_form" >
        <div className="demo_form_header" >
          <div className="demo_form_header_content">
          This is a sample.
          </div>
        </div>
        <div className="demo_form_content" >
          <div className="row"><b>Agreement:</b></div>
          <div className="row">{inputValue}</div>
          <div className="row">
            <div className="sigPane">
              <span><b>Signature: </b></span><input className="sigInput" ref={(el) => { this.sigInput = el; }} />
            </div>
          </div>
        </div>
        <div className="demo_form_footer">
          <Button type="primary" size="sm" onClick={() => this.onCancelClicked()}>Cancel</Button>
          <Button type="primary" size="sm" onClick={() => this.onOKClicked()}>OK</Button>
        </div>
      </div>
    );
  }
}

export default Form;
