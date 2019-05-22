import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import Question
  from 'index/modules/Daycare/EnrollForm/components/EnrollDetailSection/Question';

describe('index/modules/Daycare/EnrollForm/components/EnrollDetailSection/Question', () => {
  const survey = fromJS({
    questions: [{
      title: 'Customer Phone',
      question: 'Customer Phone',
      path: [0],
      customquestionIndex: '12',
      customquestionID: 423,
      useAnswerCode: false,
      answerType: 'userEntry',
      answerRequired: true,
      answerFormat: 'freeForm',
      answer: '',
      readOnly: false
    }, {
      title: 'Customer Gender',
      question: 'Customer Gender',
      path: [1],
      customquestionIndex: '13',
      customquestionID: 424,
      useAnswerCode: false,
      answerType: 'singleSelectionRadio',
      answerRequired: true,
      answerFormat: 'freeForm',
      answer: null,
      readOnly: false,
      answers: [{
        answer: 'Male',
        code: 0,
        selected: false,
        disabled: false,
        answer_id: 3882,
        sub_question: null
      }, {
        answer: 'Female',
        code: 1,
        selected: false,
        disabled: false,
        answer_id: 3883,
        sub_question: null
      }
      ]
    }],
    errors: []
  });

  it('component renders fine', () => {
    const changeQuestionAnswer = jest.fn();
    const component = mountWithIntl(
      <Question survey={survey} changeQuestionAnswer={changeQuestionAnswer} />,
      { context, childContextTypes }
    );

    expect(component.find('.enroll-question')).toHaveLength(1);
    expect(component.find('.enroll-question-label')).toHaveLength(2);
    expect(component.find('.enroll-question-answer')).toHaveLength(2);

    const answer1 = component.find('input').at(0);
    answer1.simulate('blur', { target: { value: 'test-value' } });
    expect(changeQuestionAnswer).toHaveBeenCalled();
  });
});
