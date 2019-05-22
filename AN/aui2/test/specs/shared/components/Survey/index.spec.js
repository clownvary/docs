import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import Survey from 'shared/components/Survey';
import baseSurvey from 'react-base-ui/lib/components/Survey';

describe('shared -> components -> Survey', () => {
  const setup = (overrideProps) => {
    const defaultProps = {
      questions: [{
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
      }],
      readOnly: false,
      changeQuestion: jest.fn(),
      deleteQuestion: jest.fn(),
      isQuestionsChanged: false,
      showQuestions: true,
      containerClassName: '',
      canDelete: true
    };

    const props = { ...defaultProps, ...overrideProps };

    const component = mount(<Survey {...props} />);

    return {
      component,
      props
    };
  };
  const addQuestion = jest.fn();

  const addQuestionList = [{
    title: 'CoreyDropdown',
    question: 'CoreyDropdown',
    hint: '',
    path:[0],
    answers: [{
      answer: '#1',
      code: 0,
      selected: true,
      disabled: false,
      answerID: 1222,
      subQuestion: {
        title: 'CoreyQuestion_UserEntry_PhoneNumber',
        question: 'CoreyQuestion_UserEntry_PhoneNumber',
        hint: '',
        path:[0],
        answers: [],
        customquestionIndex: '(3699_0)_2_1',
        customquestionID: 315,
        useAnswerCode: false,
        answerType: 'userEntry',
        answerRequired: true,
        answerFormat: 'phoneNumber',
        answerMaxLength: 100,
        defaultAnswer: '1111111111',
        postalCodeType: 0,
        answer: '111-1111111-',
        permitQuestion: false,
        readOnly: false
      }
    }, {
      answer: '#2',
      code: 0,
      selected: false,
      disabled: false,
      answerID: 1223,
      subQuestion: null
    }],
    customquestionIndex: '(3699_0)_2',
    customquestionID: 324,
    useAnswerCode: false,
    answerType: 'singleSelectionDropdown',
    answerRequired: false,
    answerFormat: 'freeForm',
    answerMaxLength: 100,
    defaultAnswer: '',
    postalCodeType: 0,
    answer: null,
    permitQuestion: false,
    readOnly: false
  }, {
    questions: [{
      title: 'CoreyQuestion_SingleSelection_Dropdown_2',
      question: 'CoreyQuestion_SingleSelection_Dropdown',
      hint: '',
      path:[0],
      answers: [{
        answer: '1',
        code: 0,
        selected: true,
        disabled: false,
        answerID: 1209,
        subQuestion: {
          title: 'CoreyQuestion_UserEntry_Freeform',
          question: 'CoreyQuestion_UserEntry_Freeform',
          hint: '',
          path:[0],
          answers: [],
          customquestionIndex: '(3699_0)_3_1',
          customquestionID: 321,
          useAnswerCode: false,
          answerType: 'userEntry',
          answerRequired: true,
          answerFormat: 'freeForm',
          answerMaxLength: 100,
          defaultAnswer: 'Free form default answer',
          postalCodeType: 0,
          answer: 'Free form default answer',
          permitQuestion: false,
          readOnly: false
        }
      }, {
        answer: '2',
        code: 0,
        selected: false,
        disabled: false,
        answerID: 1210,
        subQuestion: {
          title: 'CoreyQuestion_MultiSelection-Listbox',
          question: 'CoreyQuestion_MultiSelection-Listbox',
          hint: '',
          path:[0],
          answers: [{
            answer: '1',
            code: 0,
            selected: false,
            disabled: false,
            answerID: 1178,
            subQuestion: null
          }, {
            answer: '2',
            code: 0,
            selected: false,
            disabled: false,
            answerID: 1179,
            subQuestion: null
          }, {
            answer: '3',
            code: 0,
            selected: false,
            disabled: false,
            answerID: 1180,
            subQuestion: null
          }],
          customquestionIndex: '(3699_0)_3_2',
          customquestionID: 312,
          useAnswerCode: false,
          answerType: 'multiSelectionListbox',
          answerRequired: true,
          answerFormat: 'freeForm',
          answerMaxLength: 100,
          defaultAnswer: '',
          postalCodeType: 0,
          answer: null,
          permitQuestion: false,
          readOnly: false
        }
      }],
      customquestionIndex: '(3699_0)_3',
      customquestionID: 317,
      useAnswerCode: false,
      answerType: 'singleSelectionDropdown',
      answerRequired: false,
      answerFormat: 'freeForm',
      answerMaxLength: 100,
      defaultAnswer: '',
      postalCodeType: 0,
      answer: null,
      permitQuestion: false,
      readOnly: false
    }],
    groupID: 26,
    groupOrder: 1,
    groupHeader: 'CoreyGroup',
    customquestionIndex: null,
    postalCodeType: 0,
    answer: null
  }]

  it('render component correctly', () => {
    const { component } = setup();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('render component correctly when questions is empty', () => {
    const { component } = setup({ questions: [] });
    expect(toJson(component)).toMatchSnapshot();
  });

  it('render component correctly when showQuestions is false', () => {
    const { component } = setup({ showQuestions: false });
    expect(toJson(component)).toMatchSnapshot();
  });

  it('render component correctly when isQuestionsChanged is true', () => {
    const { component } = setup({ isQuestionsChanged: true });
    expect(toJson(component)).toMatchSnapshot();
  });

  it('question section can be shown or hidden correctly', () => {
    const { component, props } = setup({ isQuestionsChanged: true });

    expect(component.find(baseSurvey).length).toEqual(1);
    component.find(baseSurvey).props().onChange({ path: [0], value: '1' });
    expect(props.changeQuestion).toBeCalled();

    component.find(baseSurvey).props().onIconClick({ path: [0] });
    expect(props.deleteQuestion).toBeCalled();
  });

  it('when permitID > 0 and addQuestionsList > 0 render component correctly', () => {
    const { component } = setup({
      addableQuestionsLoaded: false,
      permitID: 23,
      questions: [...addQuestionList],
      addQuestionList,
      addQuestion
    });
    component.find('.header-section__add-link').simulate('click');
    expect(addQuestion).toBeCalled();

    component.setProps({ addableQuestionsLoaded: true });
  });

  it('when permitID > 0 and addQuestionsLength = 0 render component correctly', () => {
    const { component } = setup({
      addableQuestionsLoaded: false,
      permitID: 23,
      addQuestionList: [],
      addQuestion
    });
    const addList = component.find('.header-section__add-link');
    addList.simulate('click');
    expect(addList.hasClass('is-disabled')).toBe(true);
  });
});

