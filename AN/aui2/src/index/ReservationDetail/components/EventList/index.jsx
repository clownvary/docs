import PropTypes from 'prop-types';
import React from 'react';
import { fromJS } from 'immutable';
import find from 'lodash/find';
import isArray from 'lodash/isArray';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import { confirm } from 'react-base-ui/lib/services/dialog';
import formatCharge from 'shared/utils/formatCharge';
import { Authority } from 'shared/authorities';
import EventDetail from './EventDetail';
import { wrapEventIndex } from '../../utils/eventKeymanager';
import { isCancelled, isDenied } from '../../utils/permitStatus';

import './index.less';

export class EventList extends UIComponent {
  constructor(props) {
    super(props);
    this.cache = {};
  }

  static propTypes = {
    changeQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    facility: PropTypes.func.isRequired,
    changeWaiverByEventID: PropTypes.func.isRequired,
    saveWaiver: PropTypes.func.isRequired,
    saveNotes: PropTypes.func.isRequired,
    permitDetailsChanged: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { eventList } = this.props;
    if (eventList && eventList.count() === 1) {
      this.onExpendEventDetail(eventList.get(0).toJS());
    }
  }
  openConfirm() {
    const option = {
      title: 'Delete Event',
      cancelText: 'No',
      confirmText: 'Yes',
      showCancel: true
    };
    return confirm('Are you sure you want to delete this event?', option)
    .then(() => this.onConfirmDelete())
    .catch(() => this.onCancelDelete());
  }

  render() {
    const {
      initialData,
      eventDetail,
      waiverList,
      noteList,
      facility,
      eventActionInformation: eai,
      changeWaiverByEventID,
      saveWaiver,
      saveNotes,
      setWaiverErrorMessage,
      showUpdated,
      permitDetailsChanged,
      fetchReservationFeeThenUpdate,
      updateFee,
      batchID,
      receiptID,
      permitID,
      deleteReservationFeeDetail,
      removeWaiverConfirmChangeError,
      permitStatus: { value: permitStatusValue },
      survey,
      deleteQuestion,
      changeQuestion,
      confirmChangeError,
      resetFeeAsyncAction
    } = this.props;
    const isShow = eventDetail.get('isShow');
    const isUpdated = eventDetail.get('isUpdated');
    const allEventConfig = eventDetail.get('allEventConfig');
    const events = eventDetail.get('eventList').toJS();

    const disabledEditEvent = Authority.isDisabled(eai.editEvent.systemBehaviorID) ||
      Authority.isHidden(eai.editEvent.systemBehaviorID);
    const disabledDeleteEvent = Authority.isDisabled(eai.deleteEvent.systemBehaviorID) ||
      Authority.isHidden(eai.deleteEvent.systemBehaviorID);

    return (
      <div className="eventList">
        <div>
          {
            events.map((item) => {
              const { eventID, eventIndex, newEntryID } = item;

              const eventQuestion = survey.has(eventIndex) ? survey.get(eventIndex).toJS() : {};
              const { addQuestionData = {} } = eventQuestion;
              const { addableQuestionsLoaded, list: addQuestionList = [] } = addQuestionData;

              const errorHighlight = (isArray(eventQuestion.errors)
                && eventQuestion.errors.length > 0)
                || confirmChangeError.get('waiverErrors').some(error => error.get('eventIndex') === eventIndex);

              return (<div key={eventIndex} className="event">
                {
                  (isUpdated.get(wrapEventIndex(eventIndex)) || item.isEventUpdated) && <div className="event-update-label">
                    UPDATED
                  </div>
                }
                {eventID <= 0 && <div className="added">ADDED</div>}
                <div className={`event-summary aaui-flex afx-xl-mg-12 ${errorHighlight ? 'content-error-header' : ''}`}>
                  <div className="eventName afx-col afx-xl-6-12">
                    <span>{decodeHtmlStr(item.eventName)}</span>
                    {!(isCancelled(permitStatusValue) ||
                      isDenied(permitStatusValue)
                    ) &&
                      <i
                        className={`icon ${isShow.get(wrapEventIndex(eventIndex)) ? 'icon-chevron-up' : 'icon-chevron-down'}`}
                        onClick={() => { this.onExpendEventDetail(item); }}
                      />
                    }
                  </div>
                  {!(isCancelled(permitStatusValue) ||
                    isDenied(permitStatusValue)
                  ) &&
                    <div className="afx-col afx-xl-5-12 others">
                      <div className="resource">
                        <span>{item.resourceCount}</span>
                        Resource(s)
                        </div>
                      <div className="bookings">
                        <span>{item.bookingCount}</span>
                        Booking(s)
                        </div>
                      <div className="fee">
                        <span>{formatCharge(item.totalAmount)}</span>
                      </div>
                    </div>
                  }
                  {!(isCancelled(permitStatusValue) ||
                    isDenied(permitStatusValue)
                  ) &&
                    <div className="action afx-col afx-xl-1-12">
                      {
                        !disabledEditEvent &&
                        <i
                          className="icon icon-sign-m"
                          title="Modify or Add bookings"
                          onClick={() => { this.editEvent(eventID, newEntryID); }}
                        />
                      }
                      {
                        !disabledDeleteEvent &&
                        <i
                          className="icon icon-trash"
                          title="Delete event"
                          onClick={() => this.deleteEvent({
                            eventID,
                            eventIndex,
                            newEntryID,
                            batchID,
                            receiptID
                          })}
                        />
                      }
                    </div>
                  }
                </div>
                {!(isCancelled(permitStatusValue) ||
                  isDenied(permitStatusValue)
                ) &&
                  <EventDetail
                    initialData={initialData}
                    eventID={eventID}
                    newEntryID={newEntryID}
                    eventIndex={eventIndex}
                    eventActionInformation={eai}
                    setEventValidStatus={() => { this.setEventValidStatus(eventIndex); }}
                    allEventConfig={
                      allEventConfig.get(wrapEventIndex(eventIndex))
                      || fromJS({})
                    }
                    {...{
                      eventDetail,
                      waiverList,
                      noteList,
                      facility,
                      errorHighlight,
                      changeWaiverByEventID,
                      saveWaiver,
                      saveNotes,
                      showUpdated,
                      permitDetailsChanged,
                      setWaiverErrorMessage,
                      fetchReservationFeeThenUpdate,
                      updateFee,
                      batchID,
                      receiptID,
                      permitID,
                      deleteReservationFeeDetail,
                      removeWaiverConfirmChangeError,

                      questions: isArray(eventQuestion.questions) ? eventQuestion.questions : [],
                      hasRequiredQuestion: eventQuestion.hasRequiredQuestion,
                      addableQuestionsLoaded,
                      addQuestionList,
                      deleteQuestion,
                      changeQuestion,
                      resetFeeAsyncAction
                    }}
                    loadAddableWaivers={this.props.loadAddableWaivers}
                    addQuestion={this.props.addQuestion}
                    pagination={this.props.pagination}
                    showMore={this.props.showMore}
                    applyToAll={this.props.applyToAll}
                    detectSameCharge={this.props.detectSameCharge}
                  />
                }
              </div>);
            })
          }
        </div>
      </div>
    );
  }

  deleteEvent(params) {
    this.openConfirm();
    this.cache.deleteParams = params;
  }

  onConfirmDelete(closeAlert) {
    typeof closeAlert === 'function' && closeAlert();

    this.props.deleteEvent(this.cache.deleteParams).then(() => {
      delete this.cache.deleteParams;
    });
  }

  onCancelDelete() {
    delete this.cache.deleteParams;
  }

  onExpendEventDetail(item) {
    const { eventID, eventIndex, newEntryID } = item;
    if (this.props.eventDetail.get('hasFetchedDetail').get(wrapEventIndex(eventIndex))) {
      this.props.showDetail(eventIndex);
    } else {
      const batchID = this.props.batchID;
      const receiptID = this.props.receiptID;
      this.setEventValidStatus(eventIndex);
      this.props.fetchEventDetail({
        batchID,
        receiptID,
        eventID,
        newEntryID,
        eventIndex,
        onlySetFacilty: false
      });
    }
  }

  setEventValidStatus(eventIndex) {
    this.props.setEventValidStatus(eventIndex);
  }

  editEvent(eventID, newEntryID) {
    const { batchID, receiptID, permitID } = this.props;
    const pages = this.props.pages;
    this.props.redirect(pages.buildUrl(pages.calendarPage, {
      batch_id: batchID,
      receipt_id: receiptID,
      event_id: eventID,
      new_entry_id: newEntryID,
      permit_id: permitID
    }));
  }

  componentDidMount() {
    const { eventDetail, lastOperation } = this.props;
    const events = eventDetail.get('eventList').toJS();
    this.props.configEvent(events);
    // mark as updated if permit has new event
    if (events.some(event => (event.eventID <= 0 || event.isBookingUpdated))) {
      this.props.permitDetailsChanged();
    }
    // expand the first event if last operation is adding event success
    if (lastOperation === 'added' || lastOperation === 'edited') {
      const { batchID, receiptID } = this.props;
      const { eventID, newEntryID, eventIndex } = find(events, 'isLastModified');
      this.props.fetchEventDetail({ batchID, receiptID, eventID, newEntryID, eventIndex });
    }
  }
}

export default EventList;
