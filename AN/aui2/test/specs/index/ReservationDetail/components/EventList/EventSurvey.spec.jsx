import React from 'react';

import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';

import EventSurvey from 'index/ReservationDetail/components/EventList/EventSurvey';
import Survey from 'shared/components/Survey';


describe('index -> ReservationDetail -> components -> EventSurvey', () => {
  const setup = (overrideProps) => {
    const defaultProps = {
      eventID: 1,
      eventIndex: 1,
      newEntryID: 1,
      questions: [],
      showUpdated: true,
      readOnly: false,
      changeQuestion: jest.fn(),
      deleteQuestion: jest.fn(),
      hideCustomQuestionsSection: true,
      hasRequiredQuestion: true,
      addQuestionList: []
    };

    const props = { ...defaultProps, ...overrideProps };

    const component = mount(<EventSurvey {...props} />)

    return {
      component,
      props
    }
  };

  it('render component correctly without questions', () => {
    const { component } = setup();
    expect(component.find(Survey).length).toEqual(1);
    expect(component.find('.question').length).toEqual(0);
  });

  it('render component correctly with questions', () => {
    const questions = [
      {
        permitQuestion: true,
        parentQuestionIndex: 0,
        readOnly: false,
        path: [0],
        question: 'numbersOnly',
        hint: '',
        isMainQuestion: true,
        parentQuestionID: 0,
        answerMaxLength: 100,
        customquestionID: 524,
        useAnswerCode: false,
        answers: [],
        answerFormat: 'numbersOnly',
        answerType: 'userEntry',
        title: 'numbersOnly',
        customquestionIndex: '184',
        answerRequired: false,
        defaultAnswer: ''
      }
    ];
    const { component } = setup({ questions });

    expect(component.find(Survey).length).toEqual(1);
    expect(component.find('.question').length).toEqual(questions.length);
  });

  it('render component props correctly when hasRequiredQuestion = true, questions is not empty and hideCustomQuestionsSection is true ', () => {
    let { component, props } = setup({
      questions: [
        {
          permitQuestion: true,
          parentQuestionIndex: 0,
          readOnly: false,
          path: [0],
          question: 'numbersOnly',
          hint: '',
          isMainQuestion: true,
          parentQuestionID: 0,
          answerMaxLength: 100,
          customquestionID: 524,
          useAnswerCode: false,
          answers: [],
          answerFormat: 'numbersOnly',
          answerType: 'userEntry',
          title: 'numbersOnly',
          customquestionIndex: '184',
          answerRequired: false,
          defaultAnswer: ''
        }
      ],
      changeQuestion: jest.fn((params, funcConfirm) => {
        funcConfirm(true, true);
      }),
      deleteQuestion: jest.fn((params, funcConfirm) => {
        funcConfirm();
      }),
      hasRequiredQuestion: true,
      hideCustomQuestionsSection: true,
      canDelete: true
    });

    const surveyProps = component.find(Survey).props();
    expect(surveyProps.eventID).toEqual(props.eventID);

    // expect(surveyProps.eventIndex).toEqual(props.eventIndex);
    expect(surveyProps.newEntryID).toEqual(props.newEntryID);
    expect(surveyProps.showUpdated).toEqual(props.showUpdated);
    expect(surveyProps.questions).toEqual(props.questions);
    expect(surveyProps.readOnly).toEqual(props.readOnly);

    expect(surveyProps.canDelete).toBeTruthy();
    expect(surveyProps.showQuestions).toBeTruthy();

    component.find(Survey).props().changeQuestion();
    expect(props.changeQuestion).toBeCalled();

    component.find(Survey).props().deleteQuestion();
    expect(props.deleteQuestion).toBeCalled()
  });


  it('render component props correctly when hasRequiredQuestion = false, questions is not empty and hideCustomQuestionsSection is true ', () => {
    const { component, props } = setup({
      questions: [
        {
          permitQuestion: true,
          parentQuestionIndex: 0,
          readOnly: false,
          path: [0],
          question: 'numbersOnly',
          hint: '',
          isMainQuestion: true,
          parentQuestionID: 0,
          answerMaxLength: 100,
          customquestionID: 524,
          useAnswerCode: false,
          answers: [],
          answerFormat: 'numbersOnly',
          answerType: 'userEntry',
          title: 'numbersOnly',
          customquestionIndex: '184',
          answerRequired: false,
          defaultAnswer: ''
        }
      ],
      readonly: true,
      changeQuestion: jest.fn((params, funcConfirm) => {
        funcConfirm(false, false);
      }),
      deleteQuestion: jest.fn((params, funcConfirm) => {
        funcConfirm();
      }),
      hasRequiredQuestion: false,
      hideCustomQuestionsSection: true,
      canDelete: true
    });

    const surveyProps = component.find(Survey).props();
    expect(surveyProps.eventID).toEqual(props.eventID);
    // expect(surveyProps.eventIndex).toEqual(props.eventIndex);
    expect(surveyProps.newEntryID).toEqual(props.newEntryID);
    expect(surveyProps.showUpdated).toEqual(props.showUpdated);
    expect(surveyProps.questions).toEqual(props.questions);
    expect(surveyProps.readOnly).toEqual(props.readOnly);

    expect(surveyProps.canDelete).toBeTruthy();
    expect(surveyProps.showQuestions).toBeFalsy();

    component.find(Survey).props().changeQuestion();
    expect(props.changeQuestion).toBeCalled();

    component.find(Survey).props().deleteQuestion();
    expect(props.deleteQuestion).toBeCalled()
  });
});
