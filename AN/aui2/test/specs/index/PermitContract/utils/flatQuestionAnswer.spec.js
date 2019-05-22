import flatQuestionAnswers from 'index/PermitContract/utils/flatQuestionAnswers';

const questionAnswers = [{
  "answers": ["03: C - Answer C"],
  "customquestionID": 297,
  "question": "Parent question with answer A, B, C",
  "subQuestions": [{
    "answers": ["C - Sub A"],
    "customquestionID": 301,
    "question": "Sub-A - with answer A, B, C",
    "subQuestions": [{
      "answers": [],
      "customquestionID": 299,
      "question": "Sub-A-C - with no answer",
      "subQuestions": []
    }]
  }]
}];

const expectResult = [{
  "answers": ["03: C - Answer C"],
  "customQuestionID": 297,
  "parentQuestionIDs": [],
  "question": "Parent question with answer A, B, C",
  "subQuestions": [{
    "answers": ["C - Sub A"],
    "customQuestionID": 301,
    "parentQuestionIDs": [297],
    "question": "Sub-A - with answer A, B, C"
  }, {
    "answers": [],
    "customQuestionID": 299,
    "parentQuestionIDs": [297, 301],
    "question": "Sub-A-C - with no answer"
  }]
}];

it('method flatQuestionAnswers works fine', () => {
  const result = flatQuestionAnswers(questionAnswers);
  expect(result).toEqual(expectResult);
});
