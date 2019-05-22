import React from 'react';
import find from 'lodash/find';
import take from 'lodash/take';
import map from 'lodash/map';
import debounce from 'lodash/debounce';

import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import showAndHideAnimation from '../../utils/showAndHideAnimation';
import FacilityItem from './FacilityItem';

export default class FacilityList extends UIComponent {
  constructor(props) {
    super(props);
    this.bind('showAndHideHandler');
  }

  showAndHideHandler(e, facilityIndex) {
    const control = this._refs[`${this.props.facilityKey}-${facilityIndex}`];
    /* istanbul ignore else */
    if (control) {
      showAndHideAnimation(e, control);
    }
  }

  showMore = debounce((recurringId) => {
    const { pagination } = this.props;
    const paginations = pagination.get('paginations');
    const currentPagination = find(paginations.toJS(), p => p.paginationId === recurringId);
    this.props.showMore(currentPagination.paginationId, currentPagination.current + 1);
  }, 400);

  renderShowMore(recurringId) {
    const { pagination } = this.props;
    const paginations = pagination.get('paginations');
    const currentPagination = find(paginations.toJS(), p => p.paginationId === recurringId);
    if (currentPagination) {
      const { isLastPage, pageCount, remaining } = currentPagination;
      const linkString = remaining >= pageCount ? `Show next ${pageCount} bookings` : 'Show all bookings';
      return !isLastPage ?
        <div className="recurring-fees__show-more">
          <p onClick={() => this.showMore(recurringId)}>{linkString} <i className="icon icon-chevron-down" /></p>
        </div>
        : null;
    }
    return null;
  }

  render() {
    const { facility, feeActionStatus, newEntryID, eventID, eventIndex, pagination } = this.props;
    const paginations = pagination.get('paginations');
    const facilityID = facility.facilityID;
    const transactionID = facility.transactionID;
    const scheduleFees = facility.scheduleFees;
    const additionalFee = facility.additionalFees;

    return (
      <div className="list-wrapper">
        <div className="aaui-flex afx-xl-mg-12 facility-list">
          <div className="afx-col afx-xl-3-12 afx-col-name">
            {decodeHtmlStr(facility.facilityName)}
            {
              facility.centerName ? <p>{decodeHtmlStr(facility.centerName)}</p> : null
            }
          </div>
          <div className="afx-col afx-xl-9-12">
            {
              scheduleFees.map((scheduleFee, index) => {
                const recurringScheduleFees = scheduleFee.recurringScheduleFees;
                const scheduleKey = `facility_${facilityID}_schedule_${index}`;
                const recurringScheduleFeesLength = (
                  recurringScheduleFees && recurringScheduleFees.length);

                /* istanbul ignore else */
                if (scheduleFees.length) {
                  return (
                    <div className="schedule-list">
                      <FacilityItem
                        key={scheduleKey}
                        facilityKey={scheduleKey}
                        facilityID={facilityID}
                        transactionID={transactionID}
                        scheduleFee={scheduleFee}
                        feeActionStatus={feeActionStatus}
                        fetchPermitFee={this.props.fetchPermitFee}
                        permitDetailsChanged={this.props.permitDetailsChanged}
                        showWaringAlert={this.props.showWaringAlert}
                        applyToAll={this.props.applyToAll}
                        newEntryID={newEntryID}
                        eventID={eventID}
                        eventIndex={eventIndex}
                      />
                      {
                        recurringScheduleFeesLength ?
                          <div className="recurring-fees">
                            <div className="recurring-title">
                              <span onClick={() => this.showAndHideHandler({ target: this._refs[`recurring-expand-${this.props.facilityKey}-${index}`] }, index)}>
                                {recurringScheduleFeesLength} instance(s) of recurring
                              </span>
                              <i
                                className="icon icon-chevron-down"
                                ref={(i) => { this._refs[`recurring-expand-${this.props.facilityKey}-${index}`] = i; }}
                                onClick={e => this.showAndHideHandler(e, index)}
                              />
                            </div>

                            <div
                              className="schedule-fee"
                              ref={(el) => { this._refs[`${this.props.facilityKey}-${index}`] = el; }}
                            >
                              {
                                paginations.map((p) => {
                                  const recurringId = recurringScheduleFees[0] ?
                                  recurringScheduleFees[0].masterFacilityScheduleID : null;
                                  let needShowFees = [];
                                  if (p.get('paginationId') === recurringId) {
                                    const pageCount = p.get('pageCount');
                                    const current = p.get('current');
                                    needShowFees = take(recurringScheduleFees, pageCount * current);
                                  }
                                  return map(needShowFees,
                                    (recurringFee, recurringIndex) => {
                                      const recurringKey = `facility_${facilityID}_recurring_${recurringIndex}`;
                                      return (
                                        <FacilityItem
                                          key={recurringKey}
                                          facilityKey={recurringKey}
                                          facilityID={facilityID}
                                          transactionID={transactionID}
                                          scheduleFee={recurringFee}
                                          feeActionStatus={feeActionStatus}
                                          fetchPermitFee={this.props.fetchPermitFee}
                                          permitDetailsChanged={this.props.permitDetailsChanged}
                                          showWaringAlert={this.props.showWaringAlert}
                                          applyToAll={this.props.applyToAll}
                                          newEntryID={newEntryID}
                                          eventID={eventID}
                                          eventIndex={eventIndex}
                                        />
                                      );
                                    });
                                })
                              }
                              {
                                this.renderShowMore(
                                  recurringScheduleFees[0].masterFacilityScheduleID)
                              }
                            </div>

                          </div> : ''
                      }
                    </div>
                  );
                }
                return '';
              })
            }

            <div className="schedule-list">
              <FacilityItem
                key={`facility_${facilityID}_additional`}
                facilityKey={`facility_${facilityID}_additional`}
                facilityID={facilityID}
                transactionID={transactionID}
                additionalFee={additionalFee}
                feeActionStatus={feeActionStatus}
                fetchPermitFee={this.props.fetchPermitFee}
                permitDetailsChanged={this.props.permitDetailsChanged}
                showWaringAlert={this.props.showWaringAlert}
                newEntryID={newEntryID}
                eventID={eventID}
                eventIndex={eventIndex}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
