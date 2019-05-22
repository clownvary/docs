const flatSubQuestionAnswers = (questionAnswers, parentQuestionIDs = []) => {
  let flattedQuestionAnswers = [];
  if (questionAnswers && questionAnswers.length > 0) {
    questionAnswers.forEach((qa) => {
      flattedQuestionAnswers.push({
        question: qa.question,
        answers: qa.answers,
        customQuestionID: qa.customquestionID,
        parentQuestionIDs
      });
      if (qa.subQuestions && qa.subQuestions.length > 0) {
        flattedQuestionAnswers = flattedQuestionAnswers.concat(
          flatSubQuestionAnswers(
            qa.subQuestions, parentQuestionIDs.concat([qa.customquestionID])));
      }
    });
  }
  return flattedQuestionAnswers;
};

const flatQuestionAnswers = questionAnswers =>
  questionAnswers.map(qa => ({
    question: qa.question,
    answers: qa.answers,
    customQuestionID: qa.customquestionID,
    parentQuestionIDs: [],
    subQuestions: flatSubQuestionAnswers(qa.subQuestions, [qa.customquestionID])
  }));

export default flatQuestionAnswers;
