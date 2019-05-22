import get from 'lodash/get';
import {
  isValid,
  isGroup,

  getQuestionAnswer,
  setQuestionAnswer,

  getShownQuestions,
  transformQuestions,

  deleteQuestionByIndex,

  validateQuestion,
  validateQuestions,

  updateQuestionValidationErrors,
  updateQuestionAnswerByPath,
  updateQuestionByPath,
  findQuestionByPath,
  cleanSubQuestionAnswer,

  generateQuestionPathAndParent,
  registerCustomRules,
  getQuestionValidationRule
} from 'shared/components/Survey/helper';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import { Validation } from 'react-base-ui/lib/services/validation/';
import questionsJson from 'json/PermitDetail/questions.json';
import questions1Json from 'json/PermitDetail/questions1.json';
import questions2Json from 'json/PermitDetail/questions2.json';

const questions = convertCasingPropObj(questionsJson.body.questions);
const questions1 = convertCasingPropObj(questions1Json.body.questions);
const questions2 = convertCasingPropObj(questions2Json.body.questions);

describe('shared/utils/questionHelper', () => {
  it('isValid should work well', () => {
    expect(isValid({})).toBeFalsy();
    expect(isValid({
      permitQuestion: true,
      readOnly: false,
      question: 'numbersOnly',
      hint: '',
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
    })).toBeTruthy();
    expect(isValid({
      permitQuestion: true,
      readOnly: false,
      question: 'numbersOnly',
      hint: '',
      answerMaxLength: 100,
      customquestionID: 524,
      useAnswerCode: false,
      answers: [],
      answerFormat: 'numbersOnly',
      answerType: 'userEntry',
      title: 'numbersOnly',
      // customquestionIndex: '184',
      answerRequired: false,
      defaultAnswer: ''
    })).toBeFalsy();
    expect(isValid({
      permitQuestion: true,
      readOnly: false,
      question: 'numbersOnly',
      hint: '',
      answerMaxLength: 100,
      // customquestionID: 524,
      useAnswerCode: false,
      answers: [],
      answerFormat: 'numbersOnly',
      answerType: 'userEntry',
      title: 'numbersOnly',
      customquestionIndex: '184',
      answerRequired: false,
      defaultAnswer: ''
    })).toBeFalsy();
  })

  it('isGroup should work well', () => {
    expect(isGroup({  })).toBeFalsy();
    expect(isGroup(questions2.filter(q => q.groupID)[0])).toBeTruthy();
  })

  it('getQuestionAnswer should work well', () => {
    expect(getQuestionAnswer(convertCasingPropObj({
      "title": "Date",
      "question": "Date",
      "hint": "",
      "answers": [],
      "customquestion_index": "2",
      "customquestion_id": 48,
      "use_answer_code": false,
      "answer_type": "userEntry",
      "answer_required": false,
      "answer_format": "date",
      "answer_max_length": 100,
      "default_answer": "",
      "answer": "",
      "permit_question": true,
      "read_only": false
    }))).toEqual('');
    expect(getQuestionAnswer(convertCasingPropObj({
      "title": "Date",
      "question": "Date",
      "hint": "",
      "answers": [],
      "customquestion_index": "2",
      "customquestion_id": 48,
      "use_answer_code": false,
      "answer_type": "userEntry",
      "answer_required": false,
      "answer_format": "date",
      "answer_max_length": 100,
      "answer": "12 Dec 2016",
      "default_answer": "12 Dec 2016",
      "permit_question": true,
      "read_only": false
    }))).toEqual('12 Dec 2016');

    expect(getQuestionAnswer(convertCasingPropObj({
      "title": "whyy-test-longtext-tadio",
      "question": "whyy-test-longtext-tadio",
      "hint": "whyy-test-longtext-tadio",
      "answers": [{
          "answer": "fdasfdsafdsafdsafdsafdsafdsafdsafdsadfsafdsafdsafd",
          "code": 0,
          "selected": true,
          "disabled": false,
          "answer_id": 502,
          "sub_question": null
        },
        {
          "answer": "fdsafdsfdsafdswqrewfdsfdsfdssewfvscxfdsfdsafdsafds",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 503,
          "sub_question": null
        },
        {
          "answer": "fdsafdsafdsafdsafdsfdsfdsfdfdddddddddddddddddddddd",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 504,
          "sub_question": null
        },
        {
          "answer": "fdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 505,
          "sub_question": null
        },
        {
          "answer": "cccccccccccccccccccccccccccccccccccccccccccccccccc",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 506,
          "sub_question": null
        }
      ],
      "customquestion_index": "12",
      "customquestion_id": 77,
      "use_answer_code": false,
      "answer_type": "singleSelectionRadio",
      "answer_required": false,
      "answer_format": "freeForm",
      "answer_max_length": 100,
      "default_answer": "",
      "postal_code_type": 0,
      "permit_question": false,
      "read_only": false
    }))).toEqual('502');


    expect(getQuestionAnswer(convertCasingPropObj({
      "title": "whyy-test-longtext-tadio",
      "question": "whyy-test-longtext-tadio",
      "hint": "whyy-test-longtext-tadio",
      "answers": [{
          "answer": "fdasfdsafdsafdsafdsafdsafdsafdsafdsadfsafdsafdsafd",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 502,
          "sub_question": null
        },
        {
          "answer": "fdsafdsfdsafdswqrewfdsfdsfdssewfvscxfdsfdsafdsafds",
          "code": 0,
          "selected": true,
          "disabled": false,
          "answer_id": 503,
          "sub_question": null
        },
        {
          "answer": "fdsafdsafdsafdsafdsfdsfdsfdfdddddddddddddddddddddd",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 504,
          "sub_question": null
        },
        {
          "answer": "fdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 505,
          "sub_question": null
        },
        {
          "answer": "cccccccccccccccccccccccccccccccccccccccccccccccccc",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 506,
          "sub_question": null
        }
      ],
      "customquestion_index": "12",
      "customquestion_id": 77,
      "use_answer_code": false,
      "answer_type": "singleSelectionDropdown",
      "answer_required": false,
      "answer_format": "freeForm",
      "answer_max_length": 100,
      "default_answer": "",
      "postal_code_type": 0,
      "permit_question": false,
      "read_only": false
    }))).toEqual('503');expect(getQuestionAnswer(convertCasingPropObj({
      "title": "whyy-test-longtext-tadio",
      "question": "whyy-test-longtext-tadio",
      "hint": "whyy-test-longtext-tadio",
      "answers": [{
          "answer": "fdasfdsafdsafdsafdsafdsafdsafdsafdsadfsafdsafdsafd",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 502,
          "sub_question": null
        },
        {
          "answer": "fdsafdsfdsafdswqrewfdsfdsfdssewfvscxfdsfdsafdsafds",
          "code": 0,
          "selected": true,
          "disabled": false,
          "answer_id": 503,
          "sub_question": null
        },
        {
          "answer": "fdsafdsafdsafdsafdsfdsfdsfdfdddddddddddddddddddddd",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 504,
          "sub_question": null
        },
        {
          "answer": "fdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 505,
          "sub_question": null
        },
        {
          "answer": "cccccccccccccccccccccccccccccccccccccccccccccccccc",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 506,
          "sub_question": null
        }
      ],
      "customquestion_index": "12",
      "customquestion_id": 77,
      "use_answer_code": false,
      "answer_type": "singleSelectionDropdown",
      "answer_required": false,
      "answer_format": "freeForm",
      "answer_max_length": 100,
      "default_answer": "",
      "postal_code_type": 0,
      "permit_question": false,
      "read_only": false
    }))).toEqual('503');

    expect(getQuestionAnswer(convertCasingPropObj({
      "title": "whyy-test-longtext-tadio",
      "question": "whyy-test-longtext-tadio",
      "hint": "whyy-test-longtext-tadio",
      "answers": [{
          "answer": "fdasfdsafdsafdsafdsafdsafdsafdsafdsadfsafdsafdsafd",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 502,
          "sub_question": null
        },
        {
          "answer": "fdsafdsfdsafdswqrewfdsfdsfdssewfvscxfdsfdsafdsafds",
          "code": 0,
          "selected": true,
          "disabled": false,
          "answer_id": 503,
          "sub_question": null
        },
        {
          "answer": "fdsafdsafdsafdsafdsfdsfdsfdfdddddddddddddddddddddd",
          "code": 0,
          "selected": false,
          "disabled": false,
          "answer_id": 504,
          "sub_question": null
        },
        {
          "answer": "fdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "code": 0,
          "selected": true,
          "disabled": false,
          "answer_id": 505,
          "sub_question": null
        },
        {
          "answer": "cccccccccccccccccccccccccccccccccccccccccccccccccc",
          "code": 0,
          "selected": true,
          "disabled": false,
          "answer_id": 506,
          "sub_question": null
        }
      ],
      "customquestion_index": "12",
      "customquestion_id": 77,
      "use_answer_code": false,
      "answer_type": "multiSelectionCheckbox",
      "answer_required": false,
      "answer_format": "freeForm",
      "answer_max_length": 100,
      "default_answer": "",
      "postal_code_type": 0,
      "permit_question": false,
      "read_only": false
    }))).toEqual(['503', '505', '506']);

    expect(getQuestionAnswer(convertCasingPropObj({
      "title": "whyy-test-longtext-tadio",
      "question": "whyy-test-longtext-tadio",
      "hint": "whyy-test-longtext-tadio",
      "customquestion_index": "12",
      "customquestion_id": 77,
      "use_answer_code": false,
      "answer_type": "multiSelectionCheckbox",
      "answer_required": false,
      "answer_format": "freeForm",
      "answer_max_length": 100,
      "default_answer": "",
      "postal_code_type": 0,
      "permit_question": false,
      "read_only": false
    }))).toEqual([]);
  })

  it('getShownQuestions should work well', () => {
    let shownQuestions = getShownQuestions(questions);

    // console.log(shownQuestions);

    expect(shownQuestions).toBeInstanceOf(Array);
    expect(shownQuestions.length).toBe(16);

    shownQuestions = getShownQuestions(questions1);
    expect(shownQuestions).toBeInstanceOf(Array);
    expect(shownQuestions.length).toBe(2);

    shownQuestions = getShownQuestions(questions2);

    expect(shownQuestions).toBeInstanceOf(Array);
    expect(shownQuestions.length).toBe(17);
    expect(shownQuestions.filter(q => q.groupID).length).toBe(2);
  });

  it('transformQuestions should work well', () => {
    let shownQuestions = transformQuestions(getShownQuestions([questions2[questions2.length - 1]]));

    expect(shownQuestions).toBeInstanceOf(Array);
    expect(shownQuestions.length).toBe(1);

    shownQuestions = transformQuestions(getShownQuestions(questions1));
    expect(shownQuestions).toBeInstanceOf(Array);
    expect(shownQuestions.length).toBe(2);

    shownQuestions = transformQuestions(getShownQuestions(questions2));

    expect(shownQuestions).toBeInstanceOf(Array);
    expect(shownQuestions.length).toBe(17);
    expect(shownQuestions.filter(q => q.groupName || q.groupName === '').length).toBe(2);
  });

  it('generateQuestionPathAndParent should work well for group question', () => {

    const allQuestions = [questions, questions1, questions2]

    allQuestions.forEach((testQuestions) => {
      const newQuestions = generateQuestionPathAndParent(testQuestions);

      if (newQuestions.some(question => isGroup(question))) {
        const groupQuestions = newQuestions.filter(question => isGroup(question));

        groupQuestions.forEach(groupQuestion => {
          groupQuestion.questions.forEach(question => {
            expect(question).toEqual(get(newQuestions, question.path));

            if (Array.isArray(question.answers) && question.answers.some(answer => answer.subQuestion)) {
              question.answers
                .filter(answer => answer.subQuestion)
                .forEach((answer) => {
                  expect(answer.subQuestion).toEqual(get(newQuestions, answer.subQuestion.path))
                });
            }
          });
        });
      }
    })
  });

  it('generateQuestionPathAndParent should work well for the question with subquestion', () => {

    const allQuestions = [questions, questions1, questions2]

    allQuestions.forEach((testQuestions) => {
      const newQuestions = generateQuestionPathAndParent(testQuestions);

      if (newQuestions.some(question => !isGroup(question))) {
        const questionsWithSubQuestion = newQuestions
          .filter(question => !isGroup(question) &&
            Array.isArray(question.answers) &&
            question.answers.some(answer => answer.subQuestion));

        questionsWithSubQuestion.forEach((question) => {
          question.answers
            .filter(answer => answer.subQuestion)
            .forEach(answer => {
              expect(answer.subQuestion).toEqual(get(newQuestions, answer.subQuestion.path));

              if (Array.isArray(answer.subQuestion.answers) && answer.subQuestion.answers.some(
                  answer2 => answer2.subQuestion)) {
                answer.subQuestion.answers
                  .filter(answer2 => answer2.subQuestion)
                  .forEach((answer2) => {
                    expect(answer2.subQuestion).toEqual(get(newQuestions, answer2.subQuestion.path))
                  });
              }
            });
        });

      }
    })
  });

  it('updateQuestionAnswerByPath should work well', () => {
    expect(updateQuestionAnswerByPath([], [0], { answer: '', errorMsg: '' })).toEqual([]);

    const newQuestions = updateQuestionAnswerByPath(generateQuestionPathAndParent(convertCasingPropObj([{
      "title": "Date",
      "question": "Date",
      "hint": "",
      "answers": [],
      "customquestion_index": "2",
      "customquestion_id": 48,
      "use_answer_code": false,
      "answer_type": "userEntry",
      "answer_required": false,
      "answer_format": "date",
      "answer_max_length": 100,
      "default_answer": "",
      "permit_question": true,
      "read_only": false
    },
    {
      "title": "Date",
      "question": "Date",
      "hint": "",
      "answers": [],
      "customquestion_index": "3",
      "customquestion_id": 48,
      "use_answer_code": false,
      "answer_type": "userEntry",
      "answer_required": false,
      "answer_format": "date",
      "answer_max_length": 100,
      "default_answer": "",
      "permit_question": true,
      "read_only": false
    }])), [0], { answer: '2018 Dec 10', errorMsg: 'this is a test' });
    expect(newQuestions[0].answer).toEqual('2018 Dec 10');
    expect(newQuestions[0].errorMsg).toEqual('this is a test');
  });

  it('deleteQuestionByIndex should work well', () => {
    const questions = generateQuestionPathAndParent(convertCasingPropObj([{
      "title": "Date",
      "question": "Date",
      "hint": "",
      "answers": [],
      "customquestion_index": "2",
      "customquestion_id": 48,
      "use_answer_code": false,
      "answer_type": "userEntry",
      "answer_required": false,
      "answer_format": "date",
      "answer_max_length": 100,
      "default_answer": "",
      "permit_question": true,
      "read_only": false
    },
    {
      "title": "Date",
      "question": "Date",
      "hint": "",
      "answers": [],
      "customquestion_index": "3",
      "customquestion_id": 48,
      "use_answer_code": false,
      "answer_type": "userEntry",
      "answer_required": false,
      "answer_format": "date",
      "answer_max_length": 100,
      "default_answer": "",
      "permit_question": true,
      "read_only": false
    }]));

    expect(deleteQuestionByIndex(questions, '2').length).toEqual(1);

    const groupQuestion = generateQuestionPathAndParent(convertCasingPropObj([{
      "questions": [{
          "title": "Activities: Can you help volunteer?",
          "question": "May we contact you with regarding opportunities to volunteer?",
          "hint": "",
          "answers": [{
              "answer": "Yes, I would like to learn more about volunteering",
              "code": 11,
              "selected": false,
              "disabled": false,
              "answer_id": 417,
              "sub_question": null
            },
            {
              "answer": "No, I am not able to help at this time",
              "code": 12,
              "selected": false,
              "disabled": false,
              "answer_id": 418,
              "sub_question": null
            },
            {
              "answer": "maybe",
              "code": 13,
              "selected": false,
              "disabled": false,
              "answer_id": 419,
              "sub_question": null
            }
          ],
          "customquestion_index": "13",
          "customquestion_id": 5,
          "use_answer_code": true,
          "answer_type": "singleSelectionDropdown",
          "answer_required": true,
          "answer_format": "freeForm",
          "answer_max_length": 100,
          "default_answer": "",
          "permit_question": true,
          "read_only": false
        },
        {
          "title": "Activities: What is your shirt size?",
          "question": "What is your shirt size?",
          "hint": "",
          "answers": [{
              "answer": "Youth Small",
              "code": 0,
              "selected": false,
              "disabled": false,
              "answer_id": 420,
              "sub_question": {
                "title": "answer code",
                "question": "test",
                "hint": "",
                "answers": [{
                  "answer": "123",
                  "code": 12,
                  "selected": true,
                  "disabled": false,
                  "answer_id": 432,
                  "sub_question": null
                }],
                "customquestion_index": "14d1",
                "customquestion_id": 15,
                "use_answer_code": true,
                "answer_type": "multiSelectionCheckbox",
                "answer_required": false,
                "answer_format": "freeForm",
                "answer_max_length": 100,
                "default_answer": "",
                "permit_question": true,
                "read_only": false
              }
            },
            {
              "answer": "Youth Medium",
              "code": 0,
              "selected": false,
              "disabled": false,
              "answer_id": 421,
              "sub_question": null
            },
            {
              "answer": "Youth Large",
              "code": 0,
              "selected": false,
              "disabled": false,
              "answer_id": 422,
              "sub_question": null
            },
            {
              "answer": "Adult Small",
              "code": 0,
              "selected": false,
              "disabled": false,
              "answer_id": 423,
              "sub_question": null
            },
            {
              "answer": "Adult Medium",
              "code": 0,
              "selected": false,
              "disabled": false,
              "answer_id": 424,
              "sub_question": null
            },
            {
              "answer": "Adult Large",
              "code": 0,
              "selected": false,
              "disabled": false,
              "answer_id": 425,
              "sub_question": null
            },
            {
              "answer": "Adult X-Large",
              "code": 0,
              "selected": false,
              "disabled": false,
              "answer_id": 426,
              "sub_question": null
            },
            {
              "answer": "Adult XX-Large",
              "code": 0,
              "selected": false,
              "disabled": false,
              "answer_id": 427,
              "sub_question": null
            }
          ],
          "customquestion_index": "14",
          "customquestion_id": 1,
          "use_answer_code": false,
          "answer_type": "singleSelectionDropdown",
          "answer_required": false,
          "answer_format": "freeForm",
          "answer_max_length": 100,
          "default_answer": "",
          "permit_question": true,
          "read_only": false
        },
        {
          "title": "General: Do you have special needs?",
          "question": "Do you have any special needs or medical concerns/limitations that we need to be aware of?",
          "hint": "",
          "answers": [{
              "answer": "Yes",
              "code": 0,
              "selected": false,
              "disabled": false,
              "answer_id": 290,
              "sub_question": {
                "title": "SUB: General: Needs Specification",
                "question": "Please explain:",
                "hint": "",
                "answers": [],
                "customquestion_index": "15d1",
                "customquestion_id": 3,
                "use_answer_code": false,
                "answer_type": "userEntry",
                "answer_required": true,
                "answer_format": "freeForm",
                "answer_max_length": 100,
                "default_answer": "",
                "permit_question": true,
                "read_only": false
              }
            },
            {
              "answer": "No",
              "code": 0,
              "selected": false,
              "disabled": false,
              "answer_id": 291,
              "sub_question": null
            },
            {
              "answer": "May Be",
              "code": 0,
              "selected": false,
              "disabled": false,
              "answer_id": 292,
              "sub_question": {
                "title": "Activities: What is your shirt size?",
                "question": "What is your shirt size?",
                "hint": "",
                "answers": [{
                    "answer": "Youth Small",
                    "code": 0,
                    "selected": false,
                    "disabled": false,
                    "answer_id": 420,
                    "sub_question": {
                      "title": "answer code",
                      "question": "test",
                      "hint": "",
                      "answers": [{
                        "answer": "123",
                        "code": 12,
                        "selected": true,
                        "disabled": false,
                        "answer_id": 432,
                        "sub_question": null
                      }],
                      "customquestion_index": "15d2d1",
                      "customquestion_id": 15,
                      "use_answer_code": true,
                      "answer_type": "multiSelectionCheckbox",
                      "answer_required": false,
                      "answer_format": "freeForm",
                      "answer_max_length": 100,
                      "default_answer": "",
                      "permit_question": true,
                      "read_only": false
                    }
                  },
                  {
                    "answer": "Youth Medium",
                    "code": 0,
                    "selected": false,
                    "disabled": false,
                    "answer_id": 421,
                    "sub_question": null
                  },
                  {
                    "answer": "Youth Large",
                    "code": 0,
                    "selected": false,
                    "disabled": false,
                    "answer_id": 422,
                    "sub_question": null
                  },
                  {
                    "answer": "Adult Small",
                    "code": 0,
                    "selected": false,
                    "disabled": false,
                    "answer_id": 423,
                    "sub_question": null
                  },
                  {
                    "answer": "Adult Medium",
                    "code": 0,
                    "selected": false,
                    "disabled": false,
                    "answer_id": 424,
                    "sub_question": null
                  },
                  {
                    "answer": "Adult Large",
                    "code": 0,
                    "selected": false,
                    "disabled": false,
                    "answer_id": 425,
                    "sub_question": null
                  },
                  {
                    "answer": "Adult X-Large",
                    "code": 0,
                    "selected": false,
                    "disabled": false,
                    "answer_id": 426,
                    "sub_question": null
                  },
                  {
                    "answer": "Adult XX-Large",
                    "code": 0,
                    "selected": false,
                    "disabled": false,
                    "answer_id": 427,
                    "sub_question": null
                  }
                ],
                "customquestion_index": "15d2",
                "customquestion_id": 1,
                "use_answer_code": false,
                "answer_type": "singleSelectionDropdown",
                "answer_required": false,
                "answer_format": "freeForm",
                "answer_max_length": 100,
                "default_answer": "",
                "permit_question": true,
                "read_only": false
              }
            }
          ],
          "customquestion_index": "15",
          "customquestion_id": 2,
          "use_answer_code": false,
          "answer_type": "singleSelectionDropdown",
          "answer_required": true,
          "answer_format": "freeForm",
          "answer_max_length": 100,
          "default_answer": "",
          "permit_question": true,
          "read_only": false
        }
      ],
      "group_id": 1,
      "group_order": 1,
      "group_header": "",
      "customquestion_index": null
    }]));

    expect(deleteQuestionByIndex(groupQuestion, '13')[0].questions.length).toEqual(2);

    expect(deleteQuestionByIndex([], '1')).toEqual([]);

  })

  it('getQuestionValidationRule meet duration question should work well', () => {
      const durationQuestion = {
        answer: "00:00:00",
        answerFormat: "duration",
        answerMaxLength: 100,
        answerRequired: false,
        answerType: "userEntry",
        customquestionID: 327,
        customquestionIndex: "1",
        defaultAnswer: "",
        permitQuestion: false,
        postalCodeType: 0,
        question: "How long the hot day will last?",
        readOnly: false,
        title: "80027-duration",
        useAnswerCode: false
      };

      const emptyRules = getQuestionValidationRule(durationQuestion);
      expect(emptyRules).toHaveLength(0);

      durationQuestion.answerRequired = true;
      const rules = getQuestionValidationRule(durationQuestion);
      expect(rules).toHaveLength(2);
      expect(rules).toEqual(expect.arrayContaining(['required', 'duration']));
  });

  it('getQuestionValidationRule meet alpha only question should work well', () => {
    const alphaOnlyQuestion = {
      answer: "00:00:00",
      answerFormat: "alphaOnly",
      answerMaxLength: 100,
      answerRequired: false,
      answerType: "userEntry",
      customquestionID: 327,
      customquestionIndex: "1",
      defaultAnswer: "",
      permitQuestion: false,
      postalCodeType: 0,
      question: "What's your team name?",
      readOnly: false,
      title: "80285-AlphaOnly",
      useAnswerCode: false
    };

    const rules = getQuestionValidationRule(alphaOnlyQuestion);
    expect(rules).toHaveLength(1);
    expect(rules).toEqual(expect.arrayContaining(['alpha']));
  });

  it('cleanSubQuestionAnswer should work well', () => {
    expect(cleanSubQuestionAnswer({
      customquestionIndex: 1,
      customquestionID: 1
    }).length).toBe(0);

    expect(cleanSubQuestionAnswer({
      customquestionIndex: 1,
      customquestionID: 1,
      answers: [{ answerID: 1 }]
    },[]).length).toBe(0);

    expect(cleanSubQuestionAnswer({
      customquestionIndex: 1,
      customquestionID: 1,
      answers: [{
        answerID: 1,
        subQuestion: {
          customquestionIndex: 2,
          customquestionID: 2,
        }
      }]
    }, 1).length).toBe(1);
  })

  it('setQuestionAnswer should work well when question type is multiple dropdown', () => {
    const question = convertCasingPropObj({
      "answer_format": "freeForm",
      "answer_type": "multiSelectionListbox",
      "answers": [
        {
          "answer": "option A",
          "answer_id": 1570,
          "disabled": false,
          "selected": false,
        },
        {
          "answer": "option B",
          "answer_id": 1571,
          "disabled": false,
          "selected": false,
        }
      ],
      "customquestion_id": 78,
      "customquestion_index": "13",
      "question": "checkbox to choose answer",
    });

    const selectedAnswerQuestion = setQuestionAnswer(question, [1570]);
    expect(selectedAnswerQuestion.answers[0].selected).toBeTruthy();
    expect(selectedAnswerQuestion.answers[1].selected).toBeFalsy();

    const cleanAnswerQuestion = setQuestionAnswer(question, '');
    expect(cleanAnswerQuestion.answers[0].selected).toBeFalsy();
    expect(cleanAnswerQuestion.answers[1].selected).toBeFalsy();
  });

  it('setQuestionAnswer should work well when question type is checkbox', () => {
    const question = convertCasingPropObj({
      "answer_format": "freeForm",
      "answer_type": "multiSelectionCheckbox",
      "answers": [
        {
          "answer": "option A",
          "answer_id": 1570,
          "disabled": false,
          "selected": false,
        },
        {
          "answer": "option B",
          "answer_id": 1571,
          "disabled": false,
          "selected": false,
        }
      ],
      "customquestion_id": 78,
      "customquestion_index": "13",
      "question": "checkbox to choose answer",
    });

    const selectedAnswerQuestion = setQuestionAnswer(question, [1570, 1571]);
    expect(selectedAnswerQuestion.answers[0].selected).toBeTruthy();
    expect(selectedAnswerQuestion.answers[1].selected).toBeTruthy();

    const cleanAnswerQuestion = setQuestionAnswer(question, '');
    expect(cleanAnswerQuestion.answers[0].selected).toBeFalsy();
    expect(cleanAnswerQuestion.answers[1].selected).toBeFalsy();

    question.answers = null;
    const invalidFormatQuestion = setQuestionAnswer(question, [1570]);
    expect(invalidFormatQuestion).toBeTruthy();
  });

  it('registerCustomRules should work well', () => {
    registerCustomRules({
      ssnNumericOnly: true
    });

    const phoneValidator = Validation.createValidator('phone');
    const emptyPhoneResult = phoneValidator.validate('phone question', null);
    expect(emptyPhoneResult.errorCode).toEqual('unknown');
    const phoneResult = phoneValidator.validate('phone question', '5526');
    expect(phoneResult.errorCode).toEqual('phone_areacode_3');


    const ssnValidator = Validation.createValidator('ssn');
    const ssnResult = ssnValidator.validate('ssn question', '123-');
    expect(ssnResult.errorCode).toEqual('ssn_invalid_characters');

    const zipValidator = Validation.createValidator('zipcode');
    const zipResult = zipValidator.validate('zip question', '8823');
    expect(zipResult.errorCode).toEqual('zipcode_us_incorrectnumber');
  });
});
