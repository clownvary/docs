import React from 'react';
import { connect } from 'react-redux';
import Iframe from 'shared/components/Iframe';
import getRoutPathWithOrg from 'shared/utils/getRoutPathWithOrg';
// import { pageLoading } from 'react-base-ui/lib/services/loading';

import ACTIONS from './const/actionTypes';
import { acceptAAOfferAsyncAction, redirectToConfirmAction } from './actions/aaoffer';

export class AAOffer extends React.PureComponent {
  componentDidMount() {
    // if (this.iframe && this.iframe.iframe) {
    //   pageLoading.show();
    //   this.iframe.iframe.addEventListener('load', this.onIframeLoaded);
    // }
    window.addEventListener('message', this.reciveMessageFromIframe);
  }

  componentWillUnmount() {
    // if (this.iframe && this.iframe.iframe) {
    //   this.iframe.iframe.removeEventListener('load', this.onIframeLoaded);
    // }
    window.removeEventListener('message', this.reciveMessageFromIframe);
  }

  // onIframeLoaded = () => {
  //   pageLoading.hide();
  // }

  onIframeRef = (ref) => {
    this.iframe = ref;
  }

  reciveMessageFromIframe = (event) => {
    const { data: { action, height } } = event;
    if (action) {
      switch (action) {
        case ACTIONS.SUBMIT:
          this.props.acceptAAOfferAsyncAction();
          break;
        case ACTIONS.DECLINE:
          this.props.redirectToConfirmAction();
          break;
        case ACTIONS.SETHEIGHT:
          this.iframe.iframe.height = height;
          break;
        default:
          break;
      }
    }
  }

  render() {
    const pageUrl = getRoutPathWithOrg('getaaofferhtml');

    return (
      <div className="an-module-container module-aaoffer">
        <Iframe
          style={{ width: '100%' }}
          scrolling="auto"
          src={pageUrl}
          ref={this.onIframeRef}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {
    acceptAAOfferAsyncAction,
    redirectToConfirmAction
  }
)(AAOffer);
