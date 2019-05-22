import React from 'react';
import classNames from 'classnames';
import Survey from 'react-base-ui/lib/components/Survey';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import Collapse from 'react-base-ui/lib/components/Collapse';
import * as helper from './helper';
import { APIQuestionFormat, APIQuestionType } from './consts';

import './index.less';

class AUISurvey extends React.PureComponent {
  addQuestion = () => {
    const { addQuestion, addQuestionList, disabledAddQuestions } = this.props;
    if (!count(addQuestionList) || disabledAddQuestions) {
      return;
    }
    addQuestion();
  }

  render() {
    const {
      questions,
      changeQuestion,
      deleteQuestion,
      isQuestionsChanged,
      showQuestions,
      containerClassName,
      readOnly,
      canDelete,
      addableQuestionsLoaded,
      addQuestionList,
      permitID,
      disabledAddQuestions
    } = this.props;

    let addQuestionsLength = 0;
    const isReservationDetail = permitID > 0;
    if (isReservationDetail && addQuestionList) {
      addQuestionsLength = count(addQuestionList);
    }

    let data = helper.transformQuestions(
      helper.getShownQuestions(questions), canDelete, readOnly);

    if (addableQuestionsLoaded) {
      data = helper.transformAddQuestions(addQuestionList, data, canDelete, readOnly);
    }

    const panelHeader = (
      <span>
        <span>Custom Question</span>
        {isQuestionsChanged && <span className="update-changed-label">UPDATED</span>}
      </span>
    );

    return (
      <div>
        {
          showQuestions &&
            (<div className={classNames('survey-container', containerClassName)}>
              <Collapse activeKey="survey">
                <Collapse.Panel Header={panelHeader} key="survey">
                  <div className="header-section">
                    <span>QUESTION DESCRIPTION</span>
                    {
                      isReservationDetail && !addableQuestionsLoaded &&
                      (
                        <span
                          className={classNames('header-section__add-link', { 'is-disabled': (disabledAddQuestions || !addQuestionsLength) })}
                          onClick={this.addQuestion}
                        >
                          <i className="icon icon-plus-circle" />
                          Add custom question
                        </span>
                      )
                    }
                  </div>
                  <Survey
                    questionLabelClass="afx-xl-3-12"
                    questionContainerClass="afx-xl-5-12"
                    data={data}
                    onChange={({ path, value }) =>
                      changeQuestion({ questionPath: path, answer: value })
                    }
                    onIconClick={({ path }) => deleteQuestion({ questionPath: path })}
                  />
                </Collapse.Panel>
              </Collapse>
            </div>)
        }
      </div>
    );
  }
}

export default AUISurvey;

export {
  AUISurvey,
  helper,
  APIQuestionFormat,
  APIQuestionType
};
