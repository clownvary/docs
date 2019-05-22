import React from 'react';
import Modal from 'src/components/Modal';
import Checkbox from 'src/components/Checkbox';
import Button from 'src/components/Button';
import ModalMd from 'doc/api/components/Modal/Modal.md';
import Form from '../../App/components/Form';
import DemoPage from '../../App/components/DemoPage';

export default class Page extends DemoPage {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, { shown: false, checked: false });
  }

  static meta = {
    name: 'Modal',
    icon: 'icon-open-in-new',
    documents: [ModalMd],
    description: 'This example demonstrates the features of Modal.'
  };

  handleChange = (e) => {
    const { checked } = e.target;
    this.setState({
      checked,
      shown: checked
    });
    this.log(`Modal is ${checked ? 'open' : 'closed'}.`);
  };

  handleClose() {
    this.setState({
      shown: false,
      checked: false
    });
    this.log('Modal is closed.');
  }

  renderContent() {
    const { checked, shown } = this.state;
    return (
      <div>
        <Form title="Modal">
          <Checkbox
            checked={checked}
            onChange={this.handleChange}
          >
            Show Modal
          </Checkbox>
        </Form>
        <Modal
          title="System Message"
          onClose={() => this.handleClose()}
          shown={shown}
        >
          <div className="modal-body">
            <div>
              <p>
                Your session has timed out or server error. You must log-in again.
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <Button type="strong" onClick={() => this.handleClose()}>OK</Button>
          </div>
        </Modal>
      </div>
    );
  }
}
