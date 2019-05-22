import PropTypes from 'prop-types';
import React from 'react';
import { fromJS } from 'immutable';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import UIComponent from 'shared/components/UIComponent';
import Waiver from 'shared/components/Waiver';
import Notes from 'shared/components/Notes';
import FeeSection from 'shared/components/PermitFee/FeeSection';
import feesOrderByRecurring from 'shared/utils/feesOrderByRecurring';
import { Authority } from 'shared/authorities';
import EventSurvey from './EventSurvey';
import { wrapEventIndex } from '../../utils/eventKeymanager';
import './index.less';

export default class EventDetail extends UIComponent {

  static propTypes = {
    eventID: PropTypes.string.isRequired,
    eventIndex: PropTypes.string.isRequired,
    changeQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    changeWaiverByEventID: PropTypes.func.isRequired,
    saveWaiver: PropTypes.func.isRequired,
    saveNotes: PropTypes.func.isRequired,
    permitDetailsChanged: PropTypes.func.isRequired
  };

  loadAddableWaivers = () => {
    const { batchID, receiptID, eventID, eventIndex } = this.props;
    this.props.loadAddableWaivers({
      batchID,
      receiptID,
      permitEventId: eventID,
      eventIndex
    });
  }

  addQuestion = () => {
    const { permitID, batchID, receiptID, eventID, eventIndex, newEntryID } = this.props;
    this.props.addQuestion(
      eventIndex,
      {
        permitID,
        batchID,
        receiptID,
        permitEventId: eventID,
        newEntryID
      }
    );
  }

  render() {
    const { eventDetail: detail,
      batchID,
      receiptID,
      eventID,
      newEntryID,
      permitID,
      eventIndex,
      waiverList,
      noteList,
      facility,
      allEventConfig,
      eventActionInformation: eai,
      errorHighlight,
      changeWaiverByEventID,
      saveWaiver,
      saveNotes,
      setEventValidStatus,
      setWaiverErrorMessage,
      showUpdated,
      permitDetailsChanged,
      removeWaiverConfirmChangeError,
      questions,
      hasRequiredQuestion,
      deleteQuestion,
      changeQuestion,
      initialData,
      addableQuestionsLoaded,
      addQuestionList
    } = this.props;
    const { permitLabel: permitWording } = initialData;
    const isShow = detail.get('isShow');
    const generatedID = wrapEventIndex(eventIndex);
    const currentWaiver = waiverList.get('allWaivers').get(generatedID) || {};
    const currentNotes = fromJS(noteList.get('allNotes').get(generatedID) || {});
    const currentFacilityFees = facility.get('allFacilities').get(generatedID) || [];

    const facilityFees = currentFacilityFees.size ?
      currentFacilityFees.get('eventFee').toJS().facilityFees || [] : [];
    const finalFacilityFees = feesOrderByRecurring(facilityFees);

    const allowResetFees = currentFacilityFees.getIn && currentFacilityFees.getIn(['eventSummary', 'allowResetFees']);
    const disabledEditQuestion = Authority.isDisabled(eai.editQuestion.systemBehaviorID) ||
      Authority.isHidden(eai.editQuestion.systemBehaviorID);
    const disabledDeleteQuestion = Authority.isDisabled(eai.deleteQuestion.systemBehaviorID) ||
      Authority.isHidden(eai.deleteQuestion.systemBehaviorID);
    const disabledEditWaiver = Authority.isDisabled(eai.editWaiver.systemBehaviorID) ||
      Authority.isHidden(eai.editWaiver.systemBehaviorID);
    const disabledEditNote = Authority.isDisabled(eai.editNote.systemBehaviorID) ||
      Authority.isHidden(eai.editNote.systemBehaviorID);
    const disabledAddQuestions = Authority.isDisabled(eai.addQuestions.systemBehaviorID) ||
      Authority.isHidden(eai.addQuestions.systemBehaviorID);
    const disabledAddWaivers = Authority.isDisabled(eai.addWaivers.systemBehaviorID) ||
      Authority.isHidden(eai.addWaivers.systemBehaviorID);
    const disabledResetFee = Authority.isDisabled(eai.resetFees.systemBehaviorID) ||
    Authority.isHidden(eai.resetFees.systemBehaviorID);

    const hideAddCharge = !Authority.isHidden(eai.addCharge.systemBehaviorID);
    const hideDeleteCharge = !Authority.isHidden(eai.deleteCharge.systemBehaviorID);
    const hideEditCharge = !Authority.isHidden(eai.editCharge.systemBehaviorID);

    return (
      <div className={`event-detail ${isShow.get(generatedID) ? 'reservation-fee' : 'u-hidden'} ${errorHighlight ? 'content-error' : ''}`}>
        {
          allEventConfig.get('hideReservationCharges') ?
          '' :
          <div className="permit-fee">
            <div className="reservation-fee">
              <FeeSection
                batchID={batchID}
                receiptID={receiptID}
                newEntryID={newEntryID}
                eventID={eventID}
                eventIndex={eventIndex}
                facilityFees={finalFacilityFees}
                fetchPermitFee={params => this.props.fetchReservationFeeThenUpdate(params)}
                permitDetailsChanged={permitDetailsChanged}
                feeActionStatus={{
                  allowAddFee: hideAddCharge,
                  allowDeleteFee: hideDeleteCharge,
                  allowEditFee: hideEditCharge
                }}
                allowResetFees={allowResetFees}
                disabledResetFee={disabledResetFee}
                deleteReservationFeeDetail={this.props.deleteReservationFeeDetail}
                resetFeeAsyncAction={this.props.resetFeeAsyncAction}
                pagination={this.props.pagination}
                showMore={this.props.showMore}
                applyToAll={this.props.applyToAll}
                detectSameCharge={this.props.detectSameCharge}
              />
            </div>
          </div>
        }
        <div className="event-detail__question leftMargin">
          <EventSurvey
            eventID={eventID}
            eventIndex={eventIndex}
            newEntryID={newEntryID}
            permitID={permitID}
            showUpdated={showUpdated}
            questions={questions}
            hideCustomQuestionsSection={allEventConfig.get('hideCustomQuestionsSection')}
            hasRequiredQuestion={hasRequiredQuestion}
            readOnly={disabledEditQuestion}
            canDelete={!disabledDeleteQuestion}
            changeQuestion={changeQuestion}
            deleteQuestion={deleteQuestion}
            addQuestion={this.addQuestion}
            addableQuestionsLoaded={addableQuestionsLoaded}
            addQuestionList={addQuestionList}
            disabledAddQuestions={disabledAddQuestions}
          />
        </div>
        {
          allEventConfig.get('hideChecklistItemsSection') ?
          '' :
          <div className="event-detail__waiver leftMargin">
            <Waiver
              permitWording={permitWording}
              waiver={waiverList}
              data={da.get(currentWaiver, 'data')}
              hasNew={da.get(currentWaiver, 'hasNew')}
              addableWaivers={da.get(currentWaiver, 'addableWaivers')}
              addableWaiversLoaded={da.get(currentWaiver, 'addableWaiversLoaded')}
              eventID={eventID}
              eventIndex={eventIndex}
              eventDetail={detail}
              readOnly={disabledEditWaiver}
              changeWaiverByEventID={changeWaiverByEventID}
              saveWaiver={saveWaiver}
              permitDetailsChanged={permitDetailsChanged}
              setEventValidStatus={setEventValidStatus}
              setWaiverErrorMessage={setWaiverErrorMessage}
              newEntryID={newEntryID}
              showUpdated={showUpdated}
              afterAgreeWaiver={removeWaiverConfirmChangeError}
              loadAddableWaivers={this.loadAddableWaivers}
              disabledAddWaivers={disabledAddWaivers}
            />
          </div>
        }
        {
          allEventConfig.get('hideNotesSection') ?
            '' :
            <div className="event-detail__notes leftMargin">
              <Notes
                {...{
                  eventID,
                  eventIndex,
                  newEntryID,
                  saveNotes,
                  showUpdated,
                  permitDetailsChanged
                }}
                immediate
                notes={currentNotes}
                readOnly={disabledEditNote}
              />
            </div>
        }
      </div>
    );
  }
}
