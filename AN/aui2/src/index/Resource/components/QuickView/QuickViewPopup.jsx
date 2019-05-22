import React from 'react';
import Radio from 'react-base-ui/lib/components/Radio';
import UIComponent from 'shared/components/UIComponent';
import Modal from 'shared/components/Alert';
import { Authority } from 'shared/authorities';
import Input from 'react-base-ui/lib/components/Input';
import Tooltip from 'react-base-ui/lib/components/Tooltip';
import { Dock } from 'react-base-ui/lib/consts';
import quickViewType from '../../consts/quickViewType';

import './QuickViewPopup.less';

export default class QuickViewPopup extends UIComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      quickViewName: ''
    };
  }

  componentDidMount() {
    setTimeout(() => { this._refs.nameInput.input.focus(); }, 200);
  }

  onNameChange(e) {
    const val = e.target.value;
    this.setState({ quickViewName: val });
    const errorMessage = this.props.errorMessage;
    if (errorMessage) {
      this.props.saveQuickViewErrorAction('');
    }
  }

  componentDidUpdate() {
    const { showModal, errorMessage } = this.props;
    if (showModal && errorMessage) {
      setTimeout(() => { this._refs.nameInput.input.focus(); }, 200);
    }
  }

  onCancel = () => {
    this.setState({ quickViewName: '' });
    this.props.showQuickViewModelAction(false);
  }

  onConfirm = () => {
    this.props.saveQuickViewAsyncAction(this.state.quickViewName);
  }

  onChangeQuickViewType = (e) => {
    const curType = parseInt(e.target.value, 10);
    const prevType = this.props.selectedViewType;
    curType !== prevType && this.props.changeQuickViewTypeAction(curType);
  }

  onMouseOver = (e, message) => {
    const tooltipOptions = {
      dockStyle: Dock.TOP_CENTER,
      stick: true,
      content: <span>{message}</span>
    };

    Tooltip.open(e.target, tooltipOptions);
  }

  onMouseOut = () => {
    Tooltip.close();
  }

  render() {
    const { showModal, errorMessage, selectedViewType } = this.props;
    const hasGlobalQuickViewAuth = Authority.isEnabled('addGlobalQuickView');
    const { LOCAL_VIEW, GLOBAL_VIEW } = quickViewType;
    const isLocalView = selectedViewType === LOCAL_VIEW;

    return (
      <div>
        <Modal
          title="Create a New Quick View"
          shown={showModal}
          className="new-quickview-modal"
          onClose={this.onCancel}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          confirmText="Save"
          disableConfirm={errorMessage || !this.state.quickViewName}
        >
          <div>
            <div className="desc">
              Save the current resource calendar view as a custom &#39;Quick View&#39;.
            </div>
            <div>
              <label className="quick-view-label" htmlFor="quickViewName">
                Please enter a name
              </label>
              <div>
                <Input
                  id="quickViewName"
                  type="text"
                  errored={!!errorMessage}
                  ref={(input) => { this._refs.nameInput = input; }}
                  value={this.state.quickViewName}
                  onChange={(e) => { this.onNameChange(e); }}
                  maxLength={50}
                />
              </div>
            </div>
            <div className="error-message">{errorMessage}</div>
            <div className="quick-view-type__wrapper">
              <div>
                <Radio
                  name="quick-view-type"
                  value={LOCAL_VIEW}
                  checked={isLocalView}
                  onChange={this.onChangeQuickViewType}
                >
                  <span className="radio-label">Local</span>
                </Radio>
                <i
                  className="icon icon-info-circle"
                  onMouseOver={e => this.onMouseOver(e, 'Available to you only')}
                  onMouseOut={() => this.onMouseOut()}
                />
              </div>
              <div>
                <Radio
                  name="quick-view-type"
                  value={GLOBAL_VIEW}
                  disabled={!hasGlobalQuickViewAuth}
                  checked={!isLocalView}
                  onChange={this.onChangeQuickViewType}
                >
                  <span className="radio-label">Global</span>
                </Radio>
                <i
                  className="icon icon-info-circle"
                  onMouseOver={e => this.onMouseOver(e, 'Available to all staff members')}
                  onMouseOut={() => this.onMouseOut()}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
