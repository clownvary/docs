import React from 'react';
import Modal from 'react-base-ui/lib/components/Modal';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import Button from 'react-base-ui/lib/components/Button';
import UIComponent from 'shared/components/UIComponent';

import './authorizationDetails.less';

export default class AuthorizationDetails extends UIComponent {
  constructor(props) {
    super(props);
    this.state = {
      shown: true,
      disabledContinue: true
    };
  }

  agreementContiune = () => {
    this.setState({
      disabledContinue: !this._refs.echeckAgreement.checked
    });
  };

  showACHModel = () => {
    this.props.cancelShowAuthorizationDetails(true);
    this.setState({
      shown: false
    });
  };

  closeACHModel = () => {
    this.props.cancelShowAuthorizationDetails(false);
  };

  render() {
    return (
      <div className="authorization-details">
        <Modal
          title="Authorization Details"
          shown={this.state.shown}
          className="new-eCheck-modal"
          onClose={this.closeACHModel}
        >
          <div className="modal-body">
            <div className="form-group" dangerouslySetInnerHTML={{ __html: this.props.content }} />
            <div className="ach-agreement">
              ENTIRE ACH AGREEMENT MUST BE READ THROUGH BEFORE COMPLETING YOUR ORDER
              <div className="ach-agreement-check">
                <Checkbox
                  size="m"
                  ref={(obj) => { this._refs.echeckAgreement = obj; }}
                  defaultChecked={false}
                  onChange={this.agreementContiune}
                >
                  {/* eslint-disable max-len */}
                  I ACKNOWLEDGE THAT I HAVE CAREFULLY REVIEWED AND CONSENT TO THE AGREEMENT SET FORTH ABOVE.
                  {/* eslint-enable */}
                </Checkbox>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Button disabled={this.state.disabledContinue} type="strong" onClick={this.showACHModel}>continue</Button>
          </div>
        </Modal>
      </div>
    );
  }
}
