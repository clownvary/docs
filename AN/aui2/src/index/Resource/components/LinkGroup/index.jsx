/* global promptWhenLeavePage */

import React from 'react';
import Button from 'react-base-ui/lib/components/Button';
import UIComponent from 'shared/components/UIComponent';
import RunningCart from 'shared/components/RunningCart';
import { raiseUnrecognizedAuthCode } from 'shared/actions/Authority';
import { Authority, AuthorityID, AuthorityType, AuthorityUIType } from 'shared/authorities';
import storeShape from 'shared/utils/storeShape';
import { pages } from 'shared/consts';

import './index.less';

export default class LinkGroup extends UIComponent {
  constructor(props, context) {
    super(props);
    this.store = props.store || context.store;
  }

  render() {
    const {
      permitID,
      batchID,
      receiptID,
      receiptEntryID
    } = this.props.initialData;
    let bookingIconClass = '';

    if (Authority.isHidden(AuthorityID.BUTTON_TO_RESERVATIONS_PAGE) || permitID > 0) {
      bookingIconClass = AuthorityUIType.CLASS_HIDDEN;
    } else if (Authority.isDisabled(AuthorityID.BUTTON_TO_RESERVATIONS_PAGE)) {
      bookingIconClass = AuthorityUIType.CLASS_DISABLED;
    }

    return (
      <div className="booking-resources__link-group">
        <Button size="sm" title="View Reservations" onClick={this.viewBookingClick} className={bookingIconClass}>
          <i className="icon icon-list-m" />
        </Button>

        <RunningCart
          className={`${this.props.showIntro ? 'intro-step-2' : ''} ${permitID > 0 ? 'u-hidden' : ''}`}
          batchID={batchID}
          receiptID={receiptID}
          receiptEntryID={receiptEntryID}
          runningCart={this.props.runningCart}
          disabled={this.props.disableRunningCart}
        />
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.store;
    const types = [AuthorityType.HIDDEN, AuthorityType.DISABLED, AuthorityType.ENABLED];

    if (Authority.typeNotIn(AuthorityID.BUTTON_TO_RESERVATIONS_PAGE, types)) {
      dispatch(raiseUnrecognizedAuthCode(AuthorityID.BUTTON_TO_RESERVATIONS_PAGE));
    }
  }

  viewBookingClick = () => {
    if (window.promptWhenLeavePage && typeof window.promptWhenLeavePage === 'function') {
      if (window.promptWhenLeavePage()) {
        this.props.redirect(pages.buildUrl(pages.reservationsPage));
      }
    } else {
      this.props.redirect(pages.buildUrl(pages.reservationsPage));
    }
  };
}

LinkGroup.contextTypes = {
  store: storeShape
};

LinkGroup.propTypes = {
  store: storeShape
};
