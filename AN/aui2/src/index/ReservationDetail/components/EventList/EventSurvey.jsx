import React, { PropTypes } from 'react';
import isFunction from 'lodash/isFunction';
import confirm from 'react-base-ui/lib/services/dialog/confirm';
import Survey from 'shared/components/Survey';
import UIComponent from 'shared/components/UIComponent';


export default class EventSurvey extends UIComponent {
  static propTypes = {
    eventID: PropTypes.string.isRequired,
    eventIndex: PropTypes.string.isRequired,
    changeQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    showUpdated: PropTypes.bool.isRequired,
    readOnly: PropTypes.bool.isRequired,
    canDelete: PropTypes.bool.isRequired,
    /* eslint-disable */
    questions: PropTypes.array.isRequired
    /* eslint-enable */
  };

  render() {
    const {
      eventID,
      eventIndex,
      newEntryID,
      questions,
      showUpdated,
      readOnly,
      changeQuestion,
      deleteQuestion,
      hideCustomQuestionsSection,
      hasRequiredQuestion,
      canDelete,
      addQuestion,
      addableQuestionsLoaded,
      addQuestionList = [],
      permitID,
      disabledAddQuestions
    } = this.props;

    const showQuestions = (questions.length > 0 || addQuestionList.length > 0) &&
      (!hideCustomQuestionsSection || hasRequiredQuestion);

    return (
      <Survey
        eventID={eventID}
        newEntryID={newEntryID}
        permitID={permitID}
        showUpdated={showUpdated}
        questions={questions}
        showQuestions={showQuestions}
        readOnly={readOnly}
        addQuestion={addQuestion}
        addableQuestionsLoaded={addableQuestionsLoaded}
        addQuestionList={addQuestionList}
        canDelete={!readOnly && eventID !== -1 && canDelete}
        disabledAddQuestions={disabledAddQuestions}
        changeQuestion={params =>
          isFunction(changeQuestion) &&
          changeQuestion({ ...params, eventID, eventIndex, newEntryID },
            (questionExist, isUpdatedFee, feeUpdatedEventList) =>
              confirm(<div className="action-message">
                <div className={/* istanbul ignore next */questionExist ? '' : 'u-hidden'}>
                  <span className="dot" />Changing the answer will apply to all the events on this permit.
                </div>
                <div className={/* istanbul ignore next */isUpdatedFee ? '' : 'u-hidden'}>
                  <span className="dot" />{`Changing the answer will automatically update fees for ${(feeUpdatedEventList || []).join(',')}.`}
                </div>
                <div>Are you sure you want to continue?</div>
              </div>, { showCancel: true, cancelText: 'No', confirmText: 'Yes', title: 'Change Answer' }))}
        deleteQuestion={params =>
          isFunction(deleteQuestion) &&
          deleteQuestion({ ...params, eventID, eventIndex, newEntryID },
            () => confirm('Are you sure you want to delete this question?',
              { showCancel: true, cancelText: 'No', confirmText: 'Yes', title: 'Delete Question' }))}
      />
    );
  }
}
