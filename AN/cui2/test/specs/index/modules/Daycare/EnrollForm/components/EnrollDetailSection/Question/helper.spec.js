import { QuestionType, InputType } from 'react-base-ui/lib/components/Survey';
import helper
  from 'index/modules/Daycare/EnrollForm/components/EnrollDetailSection/Question/utils/helper';
import {
  APIQuestionFormat,
  APIQuestionType
} from 'index/modules/Daycare/EnrollForm/components/EnrollDetailSection/Question/consts';

describe('index/modules/Daycare/EnrollForm/components/EnrollDetailSection/Question/utils/helper', () => {
  it('isValid works fine', () => {
    const validity = helper.isValid({ customquestionIndex: 12, customquestionID: 182 });
    expect(validity).toBeTruthy();
  });

  it('isGroup works fine', () => {
    const group = helper.isGroup({ groupID: 1, questions: [] });
    expect(group).toBeTruthy();
  });

  it('cleanHTML works fine', () => {
    let cleaned = helper.cleanHTML('');
    expect(cleaned).toEqual('');

    cleaned = helper.cleanHTML([1, 2, 3]);
    expect(cleaned).toEqual('1,2,3');

    cleaned = helper.cleanHTML('<i class="icon" />');
    expect(cleaned).toEqual('&lt;i class="icon" /&gt;');
  });

  it('getQuestionAnswer works fine', () => {
    const invalidQuestionAnswer = helper.getQuestionAnswer({});
    expect(invalidQuestionAnswer).toBeNull();

    const inputQuestion1 = {
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answer: 0
    };
    const inputAnswer1 = helper.getQuestionAnswer(inputQuestion1);
    expect(inputAnswer1).toEqual('0');

    const inputQuestion2 = {
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answer: ''
    };
    const inputAnswer2 = helper.getQuestionAnswer(inputQuestion2);
    expect(inputAnswer2).toEqual('');

    const singleDropdownQuestion = {
      answerType: 'singleSelectionDropdown',
      customquestionIndex: 12,
      customquestionID: 12,
      answers: [
        { answerID: 'option1', selected: false },
        { answerID: 'option2', selected: false }
      ]
    };
    const dropdownAnswer = helper.getQuestionAnswer(singleDropdownQuestion);
    expect(dropdownAnswer).toEqual('');

    const radioQuestion = {
      answerType: 'singleSelectionRadio',
      customquestionIndex: 12,
      customquestionID: 12,
      answers: [
        { answerID: 'radio1', selected: false },
        { answerID: 'radio2', selected: true }
      ]
    };
    const radioAnswer = helper.getQuestionAnswer(radioQuestion);
    expect(radioAnswer).toEqual('radio2');

    const checkboxQuestion = {
      answerType: 'multiSelectionCheckbox',
      customquestionIndex: 12,
      customquestionID: 12,
      answers: [
        { answerID: 'checkbox1', selected: true },
        { answerID: 'checkbox2', selected: true },
        { answerID: 'checkbox3', selected: false }
      ]
    };
    const checkboxAnswer = helper.getQuestionAnswer(checkboxQuestion);
    expect(checkboxAnswer).toEqual(['checkbox1', 'checkbox2']);

    const multiDropdownQuestion = {
      answerType: 'multiSelectionListbox',
      customquestionIndex: 12,
      customquestionID: 12,
      answers: [
        { answerID: 'option1', selected: true },
        { answerID: 'option2', selected: true },
        { answerID: 'option3', selected: false }
      ]
    };
    const optionAnswer = helper.getQuestionAnswer(multiDropdownQuestion);
    expect(optionAnswer).toEqual(['option1', 'option2']);


    const invalidRadioQuestion = {
      answerType: 'singleSelectionRadio',
      customquestionIndex: 12,
      customquestionID: 12
    };
    const invalidRadioAnswer = helper.getQuestionAnswer(invalidRadioQuestion);
    expect(invalidRadioAnswer).toEqual('');


    const invalidCheckboxQuestion = {
      answerType: 'multiSelectionCheckbox',
      customquestionIndex: 12,
      customquestionID: 12
    };
    const invalidCheckboxAnswer = helper.getQuestionAnswer(invalidCheckboxQuestion);
    expect(invalidCheckboxAnswer).toEqual([]);

    const invalidQuestion = {
      customquestionIndex: 12,
      customquestionID: 12
    };
    const invalidAnswer = helper.getQuestionAnswer(invalidQuestion);
    expect(invalidAnswer).toBeNull();
  });

  it('setQuestionAnswer works fine', () => {
    expect(helper.setQuestionAnswer({}).answer).toBeUndefined();

    const inputQuestion = {
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answer: 0
    };
    helper.setQuestionAnswer(inputQuestion, 'value123...');
    expect(inputQuestion.answer).toEqual('value123...');

    const singleDropdownQuestion = {
      answerType: 'singleSelectionDropdown',
      customquestionIndex: 12,
      customquestionID: 12,
      answers: [
        { answerID: 'option1', selected: false },
        { answerID: 'option2', selected: false }
      ]
    };
    helper.setQuestionAnswer(singleDropdownQuestion, 'option1');
    expect(singleDropdownQuestion.answers[0].selected).toBeTruthy();

    const radioQuestion = {
      answerType: 'singleSelectionRadio',
      customquestionIndex: 12,
      customquestionID: 12,
      answers: [
        { answerID: 'radio1', selected: false },
        { answerID: 'radio2', selected: false }
      ]
    };
    helper.setQuestionAnswer(radioQuestion, 'radio2');
    expect(radioQuestion.answers[1].selected).toBeTruthy();

    const checkboxQuestion = {
      answerType: 'multiSelectionCheckbox',
      customquestionIndex: 12,
      customquestionID: 12,
      answers: [
        { answerID: 'checkbox1', selected: false },
        { answerID: 'checkbox2', selected: false },
        { answerID: 'checkbox3', selected: false }
      ]
    };
    helper.setQuestionAnswer(checkboxQuestion, ['checkbox1', 'checkbox2']);
    expect(checkboxQuestion.answers[0].selected).toBeTruthy();
    expect(checkboxQuestion.answers[1].selected).toBeTruthy();

    const multiDropdownQuestion = {
      answerType: 'multiSelectionListbox',
      customquestionIndex: 12,
      customquestionID: 12,
      answers: [
        { answerID: 'option1', selected: true },
        { answerID: 'option2', selected: false },
        { answerID: 'option3', selected: false }
      ]
    };
    helper.setQuestionAnswer(multiDropdownQuestion, null);
    expect(multiDropdownQuestion.answers[0].selected).toBeFalsy();

    const invalidRadioQuestion = {
      answerType: 'singleSelectionRadio',
      customquestionIndex: 12,
      customquestionID: 12
    };
    helper.setQuestionAnswer(invalidRadioQuestion, '123');
    expect(invalidRadioQuestion.answer).not.toEqual('123');

    const invalidQuestion = {
      customquestionIndex: 12,
      customquestionID: 12
    };
    helper.setQuestionAnswer(invalidQuestion, '123');
    expect(invalidQuestion.answer).not.toEqual('123');
  });

  it('cleanSubQuestionAnswer works fine', () => {
    const invalidResult = helper.cleanSubQuestionAnswer({});
    expect(invalidResult).toEqual([]);

    const radioQuestion = {
      answerType: 'singleSelectionRadio',
      customquestionIndex: 12,
      customquestionID: 12,
      answers: [
        {
          answerID: 'radio1',
          selected: false,
          subQuestion: { customquestionIndex: 121, customquestionID: 121 }
        },
        {
          answerID: 'radio2',
          selected: false,
          subQuestion: { customquestionIndex: 122, customquestionID: 122 }
        }
      ]
    };
    const noAffected = helper.cleanSubQuestionAnswer(radioQuestion, []);
    expect(noAffected).toHaveLength(0);

    const affected = helper.cleanSubQuestionAnswer(radioQuestion, 'radio1');
    expect(affected).toHaveLength(1);
  });

  it('getQuestionFormat works fine', () => {
    let result = helper.getQuestionFormat({});
    expect(result).toEqual(InputType.FREE);

    result = helper.getQuestionFormat({
      answerType: 'singleSelectionRadio',
      customquestionIndex: 12,
      customquestionID: 12
    });
    expect(result).toEqual(InputType.FREE);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'freeForm'
    });
    expect(result).toEqual(InputType.FREE);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'alphaOnly'
    });
    expect(result).toEqual(InputType.ALPHA);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'date'
    });
    expect(result).toEqual(InputType.DATE);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'duration'
    });
    expect(result).toEqual(InputType.DURATION);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'numbersOnly'
    });
    expect(result).toEqual(InputType.NUMBER);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'postalCode'
    });
    expect(result).toEqual(InputType.POSTAL);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'time'
    });
    expect(result).toEqual(InputType.TIME);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'SSNTB'
    });
    expect(result).toEqual(InputType.SSNTB);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'phoneNumber'
    });
    expect(result).toEqual(InputType.PHONE);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'lowerCaseAlpha'
    });
    expect(result).toEqual(InputType.LOWERCASE);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'upperCaseAlpha'
    });
    expect(result).toEqual(InputType.UPPERCASE);

    result = helper.getQuestionFormat({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'invalidFormat'
    });
    expect(result).toBeNull();
  });

  it('getQuestionType works fine', () => {
    let result = helper.getQuestionType({});
    expect(result).toEqual(QuestionType.INPUT);

    result = helper.getQuestionType({
      answerType: 'invalidAnswerType',
      customquestionIndex: 12,
      customquestionID: 12
    });
    expect(result).toBeNull();

    result = helper.getQuestionType({
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'freeForm'
    });
    expect(result).toEqual(QuestionType.INPUT);

    result = helper.getQuestionType({
      answerType: 'singleSelectionDropdown',
      customquestionIndex: 12,
      customquestionID: 12
    });
    expect(result).toEqual(QuestionType.SINGLEDROPDOWN);

    result = helper.getQuestionType({
      answerType: 'singleSelectionRadio',
      customquestionIndex: 12,
      customquestionID: 12
    });
    expect(result).toEqual(QuestionType.RADIO);

    result = helper.getQuestionType({
      answerType: 'multiSelectionCheckbox',
      customquestionIndex: 12,
      customquestionID: 12
    });
    expect(result).toEqual(QuestionType.CHECKBOX);

    result = helper.getQuestionType({
      answerType: 'multiSelectionListbox',
      customquestionIndex: 12,
      customquestionID: 12
    });
    expect(result).toEqual(QuestionType.MULTIPLEDROPDOWN);
  });

  it('getQuestionPlaceHolder works fine', () => {
    let placeholder = helper.getQuestionPlaceHolder({});
    expect(placeholder).toEqual('');

    placeholder = helper.getQuestionPlaceHolder({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'freeForm',
      answerMaxLength: 30
    });
    expect(placeholder).toEqual('No more than 30 characters');

    placeholder = helper.getQuestionPlaceHolder({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'upperCaseAlpha',
      answerMaxLength: 100
    });
    expect(placeholder).toEqual('');

    placeholder = helper.getQuestionPlaceHolder({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'date',
      answerMaxLength: 100
    });
    expect(placeholder).toEqual('DD/MM/YYYY');

    placeholder = helper.getQuestionPlaceHolder({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'invalidFormat',
      answerMaxLength: 100
    });
    expect(placeholder).toEqual('');

    placeholder = helper.getQuestionPlaceHolder({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'multiSelectionListbox'
    });
    expect(placeholder).toEqual('Select answers');

    placeholder = helper.getQuestionPlaceHolder({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'invalidAnswerType'
    });
    expect(placeholder).toEqual('');
  });

  it('getQuestionValidationRule works fine', () => {
    let rules = helper.getQuestionValidationRule({});
    expect(rules).toHaveLength(0);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'alphaOnly',
      answerMaxLength: 100,
      answerRequired: true
    });
    expect(rules).toHaveLength(2);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'freeForm',
      answerRequired: false,
      answerMaxLength: 30
    });
    expect(rules).toHaveLength(1);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'date'
    });
    expect(rules).toHaveLength(1);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'duration',
      answerRequired: true
    });
    expect(rules).toHaveLength(2);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerMaxLength: 100,
      answerFormat: 'numbersOnly'
    });
    expect(rules).toHaveLength(1);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'phoneNumber'
    });
    expect(rules).toHaveLength(1);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'postalCode'
    });
    expect(rules).toHaveLength(1);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'time'
    });
    expect(rules).toHaveLength(1);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'SSNTB'
    });
    expect(rules).toHaveLength(1);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'userEntry',
      answerFormat: 'invalidFormat'
    });
    expect(rules).toHaveLength(0);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'singleSelectionDropdown'
    });
    expect(rules).toHaveLength(0);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'singleSelectionRadio'
    });
    expect(rules).toHaveLength(0);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'multiSelectionCheckbox'
    });
    expect(rules).toHaveLength(0);

    rules = helper.getQuestionValidationRule({
      customquestionIndex: 12,
      customquestionID: 12,
      answerType: 'multiSelectionListbox'
    });
    expect(rules).toHaveLength(0);
  });

  it('formatString works fine', () => {
    let string = helper.formatString();
    expect(string).toEqual('');

    string = helper.formatString('Mr.{name} likes {hobby}.', { name: 'Morgan' });
    expect(string).toEqual('Mr.Morgan likes {hobby}.');
  });

  it('getErrorMessageByCode works fine', () => {
    let result = helper.getErrorMessageByCode('');
    expect(result.message).toEqual('');

    result = helper.getErrorMessageByCode('phone_must_7');
    expect(result.message).toEqual('Must be 7 digits.');
  });

  it('getPureQuestion works fine', () => {
    let pure = helper.getPureQuestion({});
    expect(pure).toEqual({});

    pure = helper.getPureQuestion({
      answers: [{ answerID: 1, subQuestion: [] }]
    });
    expect(pure.answers[0].subQuestion).toBeNull();
  });

  it('getSelectedSubQuestion works fine', () => {
    const questionWithSub = {
      answers: [
        {
          selected: true,
          subQuestion: { customquestionIndex: 121, customquestionID: 121 }
        }
      ]
    };
    const questions = helper.getSelectedSubQuestion(questionWithSub);
    expect(questions).toHaveLength(2);

    const questionWithoutSub = {
      answers: [
        {
          selected: false,
          subQuestion: { customquestionIndex: 121, customquestionID: 121 }
        }
      ]
    };
    const questionsNoSub = helper.getSelectedSubQuestion(questionWithoutSub);
    expect(questionsNoSub).toHaveLength(1);
  });

  it('getShownQuestions works fine', () => {
    const noQuestions = helper.getShownQuestions();
    expect(noQuestions).toHaveLength(0);

    const questions = helper.getShownQuestions([
      {
        answers: [
          {
            selected: true,
            subQuestion: { customquestionIndex: 121, customquestionID: 121 }
          }
        ]
      },
      {
        groupID: 1,
        questions: [
          {
            answers: [
              {
                selected: false,
                subQuestion: { customquestionIndex: 817, customquestionID: 817 }
              }
            ]
          }
        ]
      }
    ]);
    expect(questions).toHaveLength(3);
  });

  it('setQuestionPath works fine', () => {
    const groupQuestion = {
      groupID: 1,
      path: [1],
      questions: [
        {
          answers: [
            {
              selected: false,
              subQuestion: { customquestionIndex: 817, customquestionID: 817 }
            }
          ]
        }
      ]
    };
    helper.setQuestionPath(groupQuestion, groupQuestion.path);
    expect(groupQuestion.path).toEqual([1]);
    expect(groupQuestion.questions[0].path).toEqual([1, 'questions', 0]);

    const questionWithSub = {
      customquestionIndex: 120,
      customquestionID: 120,
      path: [2],
      answers: [
        {
          selected: true,
          subQuestion: { customquestionIndex: 121, customquestionID: 121 }
        }
      ]
    };
    helper.setQuestionPath(questionWithSub, questionWithSub.path);
    expect(questionWithSub.path).toEqual([2]);
    expect(questionWithSub.answers[0].subQuestion.path).toEqual([2, 'answers', 0, 'subQuestion']);
  });

  it('generateQuestionPathAndParent works fine', () => {
    const noQuestions = helper.generateQuestionPathAndParent([]);
    expect(noQuestions).toEqual([]);

    const questions = [{
      customquestionIndex: 120,
      customquestionID: 120,
      path: [],
      answers: [
        {
          selected: true,
          subQuestion: { customquestionIndex: 121, customquestionID: 121 }
        }
      ]
    }];
    const proceedQuestions = helper.generateQuestionPathAndParent(questions);
    expect(proceedQuestions[0].answers[0].subQuestion.path)
      .toEqual([0, 'answers', 0, 'subQuestion']);
  });

  it('validateQuestion works fine', () => {
    const invalidQuestion = {};
    const invalidQuestionResult = helper.validateQuestion(invalidQuestion);
    expect(invalidQuestionResult).toBeNull();

    const freeFormQuestion = {
      question: 'freeform',
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'freeForm',
      answerMaxLength: 100,
      answerRequired: false
    };
    const freeFormResult = helper.validateQuestion(freeFormQuestion);
    expect(freeFormResult).toBeNull();

    const requiredQuestion = {
      question: 'freeform',
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'freeForm',
      answerMaxLength: 100,
      answerRequired: true
    };
    const missRequiredResult = helper.validateQuestion(requiredQuestion);
    expect(missRequiredResult.message).toEqual('Required');

    const validRequiredQuestion = {
      question: 'freeform',
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'freeForm',
      answerRequired: true,
      answerMaxLength: 100
    };
    const validRequiredResult = helper.validateQuestion(validRequiredQuestion, '123');
    expect(validRequiredResult).toBeNull();

    const maxLengthQuestion = {
      question: 'freeform',
      answerType: 'userEntry',
      customquestionIndex: 12,
      customquestionID: 12,
      answerFormat: 'freeForm',
      answerMaxLength: 10,
      answerRequired: true
    };
    const overMaxLengthResult = helper.validateQuestion(maxLengthQuestion, '12345678901');
    expect(overMaxLengthResult.message).toEqual('Must not exceed 10 characters in length.');
  });

  it('findQuestionByPath works fine', () => {
    const questions = [{
      customquestionIndex: 120,
      customquestionID: 120,
      path: [0],
      answers: []
    }];
    expect(helper.findQuestionByPath(questions, [0])).toEqual(questions[0]);
  });

  it('buildAnswers works fine', () => {
    const invalidAnswers = helper.buildAnswers({});
    expect(invalidAnswers).toBeNull();

    const useCodeQuestion = {
      answers: [
        { answer: '1', code: 1, answerID: 1 },
        { answer: '2', code: 2, answerID: 2 },
        { answer: '11', code: 11, answerID: 11 }
      ],
      useAnswerCode: true
    };
    const answersUseCode = helper.buildAnswers(useCodeQuestion);
    expect(answersUseCode[1]).toEqual({ text: '02 : 2', value: 2 });

    const singleDropdownQuestion = {
      answers: [
        { answer: '1', code: 1, answerID: 1 },
        { answer: '2', code: 2, answerID: 2 },
        { answer: '11', code: 11, answerID: 11 }
      ],
      useAnswerCode: false,
      answerType: 'singleSelectionDropdown'
    };
    const singleDropdownAnswers = helper.buildAnswers(singleDropdownQuestion);
    expect(singleDropdownAnswers).toHaveLength(4);
    expect(singleDropdownAnswers[3]).toEqual({ text: '11', value: 11 });
  });

  it('buildComponentQuestion works fine', () => {
    const dateQuestion = {
      customquestionIndex: 11,
      customquestionID: 7131,
      question: 'question text...',
      path: [11],
      hit: '',
      answerRequired: true,
      answerMaxLength: 100,
      answerType: APIQuestionType.INPUT,
      answerFormat: APIQuestionFormat.DATE
    };
    const noop = () => {
    };
    const builtDateQuestion = helper.buildComponentQuestion({
      question: dateQuestion,
      readonly: true,
      onChange: noop,
      onDelete: noop,
      isMobile: true
    });
    expect(builtDateQuestion.path).toEqual([11]);
    expect(builtDateQuestion.required).toBeTruthy();
    expect(builtDateQuestion.readonly).toBeTruthy();
    expect(builtDateQuestion.flexibleCalendar).toBeTruthy();
  });

  it('buildComponentQuestion of multiple dropdown question works fine', () => {
    const singleDropdownQuestion = {
      customquestionIndex: 11,
      customquestionID: 7131,
      question: 'question text...',
      path: [11],
      hit: '',
      answerRequired: false,
      answerMaxLength: 100,
      answerType: APIQuestionType.MULTIPLEDROPDOWN
    };
    const noop = () => {
    };
    const builtDateQuestion = helper.buildComponentQuestion({
      question: singleDropdownQuestion,
      readonly: false,
      onChange: noop,
      onDelete: noop
    });
    expect(builtDateQuestion.path).toEqual([11]);
    expect(builtDateQuestion.required).toBeFalsy();
    expect(builtDateQuestion.readonly).toBeFalsy();
    expect(builtDateQuestion.flexibleMenu).toBeTruthy();
  });

  it('transformQuestions works fine', () => {
    const apiQuestions = [
      {
        customquestionIndex: 0,
        question: 'question text...',
        errorMsg: 'error'
      },
      {
        question: 'question text...',
        groupID: 1,
        path: [1],
        questions: [
          {
            answers: [
              {
                selected: false,
                subQuestion: { customquestionIndex: 817, customquestionID: 817 }
              }
            ]
          }
        ]
      }
    ];
    const transformedQuestions = helper.transformQuestions({ apiQuestions });
    expect(transformedQuestions).toHaveLength(2);
  });

  it('updateQuestionAnswerByPath works fine', () => {
    const questions = [
      {
        customquestionIndex: 1,
        customquestionID: 1,
        answerType: 'userEntry',
        path: [0],
        questions: [
          {
            customquestionIndex: 11,
            customquestionID: 11,
            answerType: 'userEntry',
            path: [0, 'questions', 0]
          },
          {
            customquestionIndex: 12,
            customquestionID: 12,
            answerType: 'userEntry',
            path: [0, 'questions', 1]
          }
        ]
      }
    ];
    helper.updateQuestionAnswerByPath(questions, [0, 'questions', 1], {
      answer: 'answer',
      errorMsg: 'msg'
    });
    expect(questions[0].questions[1].answer).toEqual('answer');
    expect(questions[0].questions[1].errorMsg).toEqual('msg');

    helper.updateQuestionAnswerByPath(questions, [0], { answer: 'aaa' });
    expect(questions[0].answer).toEqual('aaa');

    helper.updateQuestionAnswerByPath(questions, [], {});
    helper.updateQuestionAnswerByPath(questions, [1], {});
  });

  it('validateQuestions works fine', () => {
    const questions = [
      {
        customquestionIndex: 0,
        customquestionID: 0,
        question: 'question#1',
        answerType: 'singleSelectionDropdown'
      },
      {
        customquestionIndex: 1,
        customquestionID: 1,
        answerType: 'singleSelectionDropdown',
        question: 'question#2',
        groupID: 1,
        path: [1],
        questions: [
          {
            answers: [
              {
                selected: false,
                subQuestion: {
                  answerType: 'singleSelectionDropdown',
                  question: 'question#3',
                  customquestionIndex: 817,
                  customquestionID: 817
                }
              }
            ]
          }
        ]
      }
    ];
    expect(helper.validateQuestions(questions)).toEqual([]);
  });

  it('registerCustomRules works fine', () => {
    helper.registerCustomRules({});
  });
});
