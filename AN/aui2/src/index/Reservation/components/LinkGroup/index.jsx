import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import Button from 'react-base-ui/lib/components/Button';
import RunningCart from 'shared/components/RunningCart';
import { redirect } from 'shared/actions/route';
import { pages } from 'shared/consts';
import { raiseUnrecognizedAuthCode } from 'shared/actions/Authority';
import { Authority, AuthorityID, AuthorityType } from 'shared/authorities';
import storeShape from 'shared/utils/storeShape';

class LinkGroup extends UIComponent {
  constructor(props, context) {
    super(props, context);

    this.store = props.store || context.store;
  }

  render() {
    const { batchID, receiptID, receiptEntryID } = this.props.initialData;
    const isHide = Authority.isHidden(AuthorityID.BUTTON_TO_CALENDAR_PAGE);

    return (
      <div className="action-icons">
        {
          !isHide &&
          <Button
            size="sm"
            title="View Resource Calendar"
            onClick={() => this.onCalendarClick()}
          >
            <i className="icon icon-calendar-m" />
          </Button>
        }
        {
          !isHide &&
          <RunningCart
            batchID={batchID}
            receiptID={receiptID}
            receiptEntryID={receiptEntryID}
            runningCart={this.props.runningCart}
            className="reservation-running-cart"
          />
        }
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.store;
    const types = [AuthorityType.HIDDEN, AuthorityType.ENABLED];

    if (Authority.typeNotIn(AuthorityID.BUTTON_TO_CALENDAR_PAGE, types)) {
      dispatch(raiseUnrecognizedAuthCode(AuthorityID.BUTTON_TO_CALENDAR_PAGE));
    }
  }

  onCalendarClick = () => {
    this.props.redirect(pages.buildUrl(pages.calendarPage, {
      permit_id: 0
    }), null, false);
  };
}

LinkGroup.contextTypes = {
  store: storeShape
};

LinkGroup.propTypes = {
  store: storeShape
};

export default connect(
  null,
  {
    redirect
  }
)(LinkGroup);
