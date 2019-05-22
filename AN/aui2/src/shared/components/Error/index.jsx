import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-base-ui/lib/components/Button';
import Modal from 'react-base-ui/lib/components/Modal';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import { clearError } from 'shared/actions/Error';
import { redirect, reload as locationReload } from 'shared/actions/route';
import UIComponent from 'shared/components/UIComponent';
import { isInIframe } from 'shared/utils/iframe';

import './index.less';

export class Error extends UIComponent {
  constructor(props, context) {
    super(props, context);
    this.bind('onClick', 'gotoLogin', 'reload');
  }

  displayError() {
    const { error } = this.props;
    const errorList = da.get(error, 'list');
    return !!errorList.size;
  }

  sessionTimeoutError() {
    const { error } = this.props;
    const errorList = da.get(error, 'list');
    return !!errorList.find(item => item && item.code === '0002');
  }

  render() {
    const { title = 'System Message', reload = false } = this.props;
    const display = this.displayError();

    return (
      <Modal shown={display} title={title} className="error-bar" onClose={this.onClick}>
        <div className="error-bar-body u-clearfix">
          {this.renderErrorAlert()}
          <Button size="sm" type="strong" className="error-bar-button" onClick={this.onClick}>
            {reload ? 'Reload Page' : 'OK'}
          </Button>
        </div>
      </Modal>
    );
  }

  renderErrorAlert() {
    const { error } = this.props;
    const errorList = da.get(error, 'list');
    return (
      <div className="error-content">
        <ul>
          {errorList.map((item, k) => <li key={k}>{item.message}</li>)}
        </ul>
      </div>
    );
  }

  reload() {
    /* istanbul ignore next */
    if (isInIframe) {
      this.props.locationReload(window.frameElement.contentWindow);
    } else {
      this.props.locationReload();
    }
  }

  gotoLogin() {
    /* istanbul ignore next */
    if (!__STATIC__) {
      const homeUrl = `${window.__environment__.ROOT_URL}/servlet/adminlogin.sdi?sessiontimeout=Checked`;
      this.props.redirect(homeUrl);
    } else {
      this.reload();
    }
  }

  onClick() {
    const { reload } = this.props;
    this.props.clearError();
    if (this.sessionTimeoutError()) {
      this.gotoLogin();
    } else if (reload) {
      this.reload();
    }
  }
}

export default connect(
  null,
  {
    clearError,
    redirect,
    locationReload
  }
)(Error);
