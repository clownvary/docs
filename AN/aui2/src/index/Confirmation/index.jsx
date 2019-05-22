import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import Error from 'shared/components/Error';
import { caculateIframeHeight } from 'shared/components/Root';
import { isInIframe } from 'shared/utils/iframe';
import BreadCrumb from 'shared/components/BreadCrumb';

import PermitConfirmation from './components/PermitConfirmation';

class Confirmation extends UIComponent {
  render() {
    const { winResize, permitConfirmation, error, breadCrumb, initialData } = this.props;
    const bodyHeight = isInIframe && (winResize.get('resize') || caculateIframeHeight());

    return (
      <div className="page-wrapper confirmation-page" style={{ height: bodyHeight }}>
        {__STATIC__ ?
          undefined :
          <BreadCrumb
            isPromptUser={false}
            breadCrumb={breadCrumb}
          />
        }
        <div className="an-page">
          <PermitConfirmation data={permitConfirmation} initialData={initialData} />
          <Error error={error} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    winResize: state.winResize,
    permitConfirmation: state.permitConfirmation,
    error: state.error,
    breadCrumb: state.breadCrumb,
    initialData: state.initialData
  })
)(Confirmation);
