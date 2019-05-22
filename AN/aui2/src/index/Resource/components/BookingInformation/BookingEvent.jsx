import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Input from 'react-base-ui/lib/components/Input';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import UIComponent from 'shared/components/UIComponent';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import AMIds from '../../automationIds';
import {
  bookingPanelUpdateEventAction
} from '../../actions/bookingPanel';
import {
  bookingPanelClearErrAction
} from '../../actions/bookingPanelValidation';

export class BookingEvent extends UIComponent {
  static propTypes = {
    eventName: PropTypes.string,
    scheduleTypes: PropTypes.shape({
      toJS: PropTypes.func
    }),
    scheduleTypeID: PropTypes.number
  };

  constructor() {
    super();

    this._refs = {};
  }

  componentDidUpdate({ display }) {
    if (this.props.display && display !== this.props.display) {
      /* istanbul ignore next */
      setTimeout(() => {
        document.querySelector('#eventName').focus();
      }, 100);
    }
  }

  changeEventName = (e) => {
    const value = e.target.value.substr(0, 100);
    this.props.bookingPanelUpdateEventAction({ eventName: value });
    this.props.bookingPanelClearErrAction({
      errorKey: 'eventName'
    });
  };

  changeScheduleType = ({ oldVal }, { value }) => {
    if (oldVal !== value) {
      const text = this._refs.scheduleType.findTextByValue(value);
      this.props.bookingPanelUpdateEventAction(
        { scheduleTypeID: value, scheduleType: text }
      );
      this.props.bookingPanelClearErrAction({
        errorKey: 'scheduleTypeID'
      });
    }
  };

  render() {
    const {
      eventNameErrs, scheduleTypeIDErrs, eventName, scheduleTypes, scheduleTypeID
    } = this.props;
    const hasEventNameErr = eventNameErrs;
    const hasScheduleTypeErr = scheduleTypeIDErrs;

    return (
      <section className="section-event">
        <div className="form-group">
          <label htmlFor="eventName" className="form-group__label">Event Name</label>
          <div className="value">
            <Input
              id="eventName"
              data-qa-id={AMIds.information.eventName}
              className={`${hasEventNameErr ? 'error-field' : ''}`}
              value={decodeHtmlStr(eventName)} maxLength="100"
              onChange={this.changeEventName}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="scheduleTypeID" className="form-group__label">Schedule Type</label>
          <div className="value">
            <Dropdown
              id="scheduleTypeID"
              autoOpen
              data-qa-id={AMIds.information.scheduleType}
              className={`schedule-type ${hasScheduleTypeErr ? 'error-field' : ''}`}
              data={scheduleTypes.toJS()}
              value={scheduleTypeID}
              ref={e => (this._refs.scheduleType = e)}
              placeholder="Choose schedule type"
              onChange={e => this.changeScheduleType({ oldVal: scheduleTypeID }, e)}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default connect(
  null,
  {
    bookingPanelUpdateEventAction,
    bookingPanelClearErrAction
  }
)(BookingEvent);
