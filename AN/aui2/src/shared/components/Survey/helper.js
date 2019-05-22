import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import toString from 'lodash/toString';
import find from 'lodash/find';
import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import once from 'lodash/once';
import { count } from 'react-base-ui/lib/utils/dataAccess';

import Globalize from 'react-base-ui/lib/services/i18n';
import { Validation } from 'react-base-ui/lib/services/validation/';
import { QuestionType, InputType } from 'react-base-ui/lib/components/Survey';
import customRule from './rules';

import { APIQuestionType, APIQuestionFormat, ErrorMessage } from './consts';

/**
 * [apiQuestion] means the question format defined by API
 * [componentQuestion] means the question format defined
 *    by react-base-ui/lib/components/Survey
 */

const defaultDeleteIcon = 'icon-trash';

let globalSystemConfig = {};

/**
 * determine whether question is a valid question
 * @param {object} apiQuestion
 */
const isValid = apiQuestion =>
  apiQuestion && apiQuestion.customquestionIndex && apiQuestion.customquestionID;

/**
 * determine whether current object is a question group or a question.
 * @param {object} apiQuestion
 */
const isGroup = apiQuestion =>
  apiQuestion && apiQuestion.groupID && isArray(apiQuestion.questions);

const cleanHTML = (content) => {
  if (!content) {
    return '';
  }

  let tmp = content;

  /* istanbul ignore if */
  if (!isString(tmp)) {
    tmp = toString(tmp);
  }

  return tmp.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/**
 * get the question's value
 * @param {*} apiQuestion
 */
const getQuestionAnswer = (apiQuestion) => {
  if (isValid(apiQuestion)) {
    switch (apiQuestion.answerType) {
      case APIQuestionType.INPUT:
        return `${(apiQuestion.answer === undefined || apiQuestion.answer == null) ? '' : apiQuestion.answer}`;
      case APIQuestionType.SINGLEDROPDOWN:
      case APIQuestionType.RADIO:
        /* istanbul ignore else */
        if (isArray(apiQuestion.answers)) {
          const selectedAnswer = find(apiQuestion.answers, answer => answer.selected);
          /* istanbul ignore else */
          if (selectedAnswer) {
            return `${selectedAnswer.answerID}`;
          }
        }
        return '';
      case APIQuestionType.CHECKBOX:
      case APIQuestionType.MULTIPLEDROPDOWN:
      /* istanbul ignore else */
        if (isArray(apiQuestion.answers)) {
          return apiQuestion.answers
            .filter(answer => answer.selected)
            .map(answer => `${answer.answerID}`);
        }
        return [];
    }
  }

  return null;
};

/**
 * update the answer for the question
 * @param {API question } apiQuestion
 * @param {the new answer} answer
 */
const setQuestionAnswer = (apiQuestion, answer) => {
  /* istanbul ignore else */
  if (isValid(apiQuestion)) {
    let tempAnswer = answer;
    switch (apiQuestion.answerType) {
      case APIQuestionType.INPUT:
        apiQuestion.answer = tempAnswer;
        break;
      case APIQuestionType.SINGLEDROPDOWN:
      case APIQuestionType.RADIO:
        /* istanbul ignore else */
        if (isArray(apiQuestion.answers)) {
          apiQuestion.answers = apiQuestion.answers.map(ans => ({
            ...ans,
            selected: `${ans.answerID}` === `${tempAnswer}`
          }));
        }
        break;
      case APIQuestionType.CHECKBOX:
      case APIQuestionType.MULTIPLEDROPDOWN:
        if (!isArray(tempAnswer)) {
          tempAnswer = [];
        }
        if (isArray(apiQuestion.answers) && isArray(tempAnswer)) {
          apiQuestion.answers = apiQuestion.answers.map(ans => ({
            ...ans,
            selected: tempAnswer.some(ts => `${ts}` === `${ans.answerID}`)
          }));
        }
        break;
    }
  }

  return apiQuestion;
};

/**
 * This is a temp function to match backend function. (will be deleted after backend fix.)
 * @param {Object} apiQuestion
 * @param {*} oldAnswer
 * @param {*} newAnswer
 * @param {Array} affected sub questions
 * @param {Boolean} force force to clean the sub question's answer
 */
const cleanSubQuestionAnswer = (
  apiQuestion,
  newAnswer,
  affectedSubQuestions = []
) => {
  /* istanbul ignore else */
  if (isValid(apiQuestion) && isArray(apiQuestion.answers)) {
    const arrNewAnswers = isArray(newAnswer) ? newAnswer : [newAnswer];

    if (arrNewAnswers.length > 0) {
      const questionAnswers = apiQuestion.answers.filter(answer =>
        arrNewAnswers.some(ans => `${ans}` === `${answer.answerID}`) && isValid(answer.subQuestion));
      questionAnswers.forEach((answer) => {
        answer.subQuestion.errorMsg = '';
        affectedSubQuestions.push(answer.subQuestion);
        cleanSubQuestionAnswer(answer.subQuestion, '', affectedSubQuestions);
        setQuestionAnswer(answer.subQuestion, '');
      });
    }
  }

  return affectedSubQuestions;
};

/* Adapter between api question and react-base-ui question */
const getQuestionFormat = (apiQuestion) => {
  if (isValid(apiQuestion)) {
    if (apiQuestion.answerType === APIQuestionType.INPUT) {
      switch (apiQuestion.answerFormat) {
        case APIQuestionFormat.FREE:
          return InputType.FREE;
        case APIQuestionFormat.ALPHA:
          return InputType.ALPHA;
        case APIQuestionFormat.DATE:
          return InputType.DATE;
        case APIQuestionFormat.DURATION:
          return InputType.DURATION;
        case APIQuestionFormat.NUMBER:
          return InputType.NUMBER;
        case APIQuestionFormat.PHONE:
          return InputType.PHONE;
        case APIQuestionFormat.POSTAL:
          return InputType.POSTAL;
        case APIQuestionFormat.TIME:
          return InputType.TIME;
        case APIQuestionFormat.LOWERCASE:
          return InputType.LOWERCASE;
        case APIQuestionFormat.UPPERCASE:
          return InputType.UPPERCASE;
        case APIQuestionFormat.SSNTB:
          return InputType.SSNTB;
      }
    }
  }

  return InputType.FREE;
};

const getQuestionType = (apiQuestion) => {
  if (isValid(apiQuestion)) {
    switch (apiQuestion.answerType) {
      case APIQuestionType.INPUT:
        return QuestionType.INPUT;
      case APIQuestionType.SINGLEDROPDOWN:
        return QuestionType.SINGLEDROPDOWN;
      case APIQuestionType.RADIO:
        return QuestionType.RADIO;
      case APIQuestionType.CHECKBOX:
        return QuestionType.CHECKBOX;
      case APIQuestionType.MULTIPLEDROPDOWN:
        return QuestionType.MULTIPLEDROPDOWN;
    }
  }

  return QuestionType.INPUT;
};

const getQuestionPlaceHolder = (apiQuestion) => {
  let placeHolder = '';

  if (isValid(apiQuestion)) {
    switch (apiQuestion.answerType) {
      case APIQuestionType.INPUT:
        switch (apiQuestion.answerFormat) {
          case APIQuestionFormat.FREE:
          case APIQuestionFormat.ALPHA:
          case APIQuestionFormat.NUMBER:
          case APIQuestionFormat.LOWERCASE:
          case APIQuestionFormat.UPPERCASE:
            if (apiQuestion.answerMaxLength !== 100) {
              placeHolder = `No more than ${apiQuestion.answerMaxLength} characters`;
            }
            break;
          case APIQuestionFormat.DATE:
            placeHolder = Globalize.ANDateFormat
              .replace(/MMM/g, 'MM')
              .replace(/,/g, '')
              .split(' ')
              .join('/');
            break;
        }
        break;
      case APIQuestionType.MULTIPLEDROPDOWN:
        placeHolder = 'Select answers';
        break;
    }
  }

  return placeHolder;
};

const getQuestionValidationRule = (apiQuestion) => {
  const rules = [];
  /* istanbul ignore else */
  if (isValid(apiQuestion)) {
    const defaultMaxLength = 100;
    if (apiQuestion.answerRequired) {
      rules.push('required');
    }
    switch (apiQuestion.answerType) {
      case APIQuestionType.INPUT:
        switch (apiQuestion.answerFormat) {
          case APIQuestionFormat.FREE:
          case APIQuestionFormat.LOWERCASE:
          case APIQuestionFormat.UPPERCASE:
          case APIQuestionFormat.ALPHA:
            if (apiQuestion.answerMaxLength !== defaultMaxLength) {
              rules.push(`maxLength:${apiQuestion.answerMaxLength}`);
            }
            if (apiQuestion.answerFormat === APIQuestionFormat.ALPHA) {
              rules.push('alpha');
            }
            break;
          case APIQuestionFormat.DATE:
            rules.push('date');
            break;
          case APIQuestionFormat.DURATION:
            // duration only validate required that the value shall not be equals '00:00:00'
            apiQuestion.answerRequired && rules.push('duration');
            break;
          case APIQuestionFormat.NUMBER:
            rules.push('digits');
            break;
          case APIQuestionFormat.PHONE:
            rules.push('phone');
            break;
          case APIQuestionFormat.POSTAL:
            rules.push('zipcode');
            break;
          case APIQuestionFormat.TIME:
            rules.push('time');
            break;
          case APIQuestionFormat.SSNTB:
            rules.push('ssn');
            break;
          default:
            break;
        }
        break;
      case APIQuestionType.SINGLEDROPDOWN:
      case APIQuestionType.RADIO:
      case APIQuestionType.CHECKBOX:
      case APIQuestionType.MULTIPLEDROPDOWN:
      default:
        break;
    }
  }

  return rules;
};

const formatString = (template, options) => {
  /* istanbul ignore else */
  if (isString(template)) {
    return template.replace(/{([^}]+)}/g, (match, key) => {
      /* istanbul ignore else */
      if (typeof options[key] !== 'undefined') {
        return options[key];
      }
      return match;
    });
  }

  return '';
};

const getErrorMessageByCode = (errorCode, options) => {
  /* istanbul ignore else */
  if (errorCode) {
    /* istanbul ignore else */
    if (Object.keys(ErrorMessage.CustomErrorKey)
      .some(key => ErrorMessage.CustomErrorKey[key] === errorCode)) {
      const opts = { ...globalSystemConfig, ...options };
      return {
        message: formatString(ErrorMessage.ErrorMessage[errorCode], opts),
        shortMessage: formatString(ErrorMessage.ShortErrorMessage[errorCode], opts)
      };
    }
  }

  return { message: errorCode, shortMessage: errorCode };
};

/**
 * remove the sub questions.
 * @param {object} apiQuestion
 */
const getPureQuestion = (apiQuestion) => {
  if (isArray(apiQuestion.answers)) {
    apiQuestion.answers = apiQuestion.answers.map(answer => ({
      ...answer,
      subQuestion: null
    }));
  }

  return apiQuestion;
};

/**
 * get all the display questions,
 *  and also change the tree structure to flat
 *  and returned the question without subquestion
 * @param {object} apiQuestions
 */
const getShownQuestions = (apiQuestions) => {
  if (isArray(apiQuestions) && apiQuestions.length > 0) {
    const getSelectedSubQuestion = (apiQuestion) => {
      let newQuestionList = [];

      newQuestionList.push(apiQuestion);
      if (isArray(apiQuestion.answers) && apiQuestion.answers.length > 0) {
        const subQuestions = apiQuestion.answers
          .filter(answer => answer.selected && answer.subQuestion)
          .map(answer => answer.subQuestion);

        if (subQuestions.length > 0) {
          subQuestions.forEach((subQuestion) => {
            newQuestionList = newQuestionList.concat(getSelectedSubQuestion(subQuestion));
          });
        }
      }
      return newQuestionList;
    };

    let arrStandardQuestions = [];

    apiQuestions.forEach((question) => {
      if (isGroup(question)) { // group Question
        const group = {
          ...question,
          questions: []
        };

        question.questions.forEach((groupQuestion) => {
          group.questions = group.questions.concat(getSelectedSubQuestion(groupQuestion));
        });
        arrStandardQuestions.push(group);
      } else {
        arrStandardQuestions = arrStandardQuestions.concat(getSelectedSubQuestion(question));
      }
    });

    return cloneDeep(arrStandardQuestions).map(question => getPureQuestion(question));
  }

  return [];
};

/**
 * In this function, we will build a Path for question tree for the searching
 *    the Path will follow the absolute postion of the question,
 *       and you can use get/set of lodash to retrieve/update the question with the PATH.
 *     for example:
 *       [0, 'questions', 1, 'answers', 1, 'subquestion']
 *                0: mean the first question of the questions array.
 *      'questions': mean the question is a group, there is a property 'questions' of group
 *                1: mean the second array item of questions
 *        'answers': mean the property 'answers' of question
 *                1: mean the second answer of answers
 *    'subquestion': mean the property 'subquestion' of the answer.
 * and also, will add parent question flag: parentQuestionID and parentQuestionIndex.
 * @param {*} apiQuestions question array which will stored in state.
 */
const generateQuestionPathAndParent = (apiQuestions) => {
  if (isArray(apiQuestions) && apiQuestions.length > 0) {
    const cloneQuestions = cloneDeep(apiQuestions);
    const setQuestionPath = (apiQuestion, questionPath, parentQuestion) => {
      const path = [].concat(questionPath);
      if (isGroup(apiQuestion)) {
        path.push('questions');

        apiQuestion.questions.forEach((groupQuestion, groupIndex) => {
          setQuestionPath(groupQuestion, path.slice().concat(groupIndex), apiQuestion);
        });
      } else {
        apiQuestion.path = path;
        apiQuestion.parentQuestionID = 0;
        apiQuestion.parentQuestionIndex = 0;
        apiQuestion.isMainQuestion = true;
        if (isValid(parentQuestion)) {
          apiQuestion.parentQuestionID = parentQuestion.customquestionID;
          apiQuestion.parentQuestionIndex = parentQuestion.customquestionIndex;
          apiQuestion.isMainQuestion = false;
        }

        if (isArray(apiQuestion.answers) && apiQuestion.answers.length > 0) {
          apiQuestion.answers.forEach((answer, answerIndex) => {
            if (isValid(answer.subQuestion)) {
              setQuestionPath(answer.subQuestion, path.slice().concat(['answers', answerIndex, 'subQuestion']),
                apiQuestion);
            }
          });
        }
      }
    };

    cloneQuestions.forEach((apiQuestion, apiQuestionIndex) => {
      setQuestionPath(apiQuestion, [apiQuestionIndex]);
    });

    return cloneQuestions;
  }

  return apiQuestions;
};

/**
 * register custom validation rule.
 * can only be executed once!
 */
const registerCustomRules = once((systemConfig = {}) => {
  globalSystemConfig = { ...globalSystemConfig, ...systemConfig };

  const {
    systemAreaCode,
    systemCountryCode,
    ssnNumericOnly,
    ssnValidLength,
    zipCodeType
  } = globalSystemConfig;

  Object.keys(customRule).forEach((customRuleKey) => {
    switch (customRuleKey) {
      case 'phone':
        Validation.registerRule(customRuleKey, (value) => {
          const [areaVal, phoneVal, extVal] = (value || '').split('-');
          return customRule[customRuleKey](areaVal, phoneVal, extVal,
            systemCountryCode, systemAreaCode);
        }, '', true);
        break;
      case 'ssn':
        Validation.registerRule(customRuleKey, ssn =>
          customRule[customRuleKey](ssn, ssnNumericOnly, ssnValidLength),
          '',
          true
        );
        break;
      case 'zipcode':
        Validation.registerRule(customRuleKey, zipCode =>
          customRule[customRuleKey](zipCode, zipCodeType, systemCountryCode),
          '',
          true
        );
        break;
      default:
        Validation.registerRule(customRuleKey, customRule[customRuleKey]);
        break;
    }
  });
});

/**
 * validate question.
 * @param {object} apiQuestion the question object
 * @param {string|array} answer optional. if undefined, then will use apiQuestion's answer.
 */
const validateQuestion = (apiQuestion, answer) => {
  /* istanbul ignore else */
  if (isValid(apiQuestion)) {
    const questionAnswer = answer === undefined ? getQuestionAnswer(apiQuestion) : answer;

    const rules = getQuestionValidationRule(apiQuestion);
    if (isArray(rules) && rules.length > 0) {
      const validator = Validation.createValidator(rules.join('|'));
      const result = validator.validate(apiQuestion.question, questionAnswer);

      if (!result.isValid) {
        const objErrorMsg = getErrorMessageByCode(result.errorCode, { name: apiQuestion.question });
        return objErrorMsg;
      }
    }
  }

  return null;
};

const findQuestionByPath = (apiQuestions, questionPath) =>
  get(apiQuestions, questionPath);

/**
 * will get the answers
 *  if useAnswerCode is true, then apply answerCode rule
 *  for single dropdown, add an empty answer at the top
 * @param {object} apiQuestion
 */
const buildAnswers = (apiQuestion) => {
  if (isArray(apiQuestion.answers)) {
    let answers = cloneDeep(apiQuestion.answers);

    // apply answer code rule
    if (apiQuestion.useAnswerCode) {
      answers = answers.map(questionAnswer => ({
        ...questionAnswer,
        answer: /* istanbul ignore next */`${questionAnswer.code < 10 ? '0' : ''}${questionAnswer.code} : ${questionAnswer.answer}`
      }));
    }

    answers = answers.map(answer => ({ text: answer.answer, value: answer.answerID }));

    if (apiQuestion.answerType === APIQuestionType.SINGLEDROPDOWN) {
      answers.unshift({ text: '&nbsp;', value: '' });
    }

    return answers;
  }

  return null;
};

const buildComponenetQuestion = (question, showDeleteIcon, readonly, onChange, onDelete) => ({
  id: question.customquestionIndex,
  text: cleanHTML(question.question),
  path: question.path,
  hint: cleanHTML(question.hint),
  readonly,
  required: question.answerRequired,
  isShown: true,
  errorMsgs: /* istanbul ignore next */question.errorMsg ? [question.errorMsg] : [],
  icon: showDeleteIcon && question.isMainQuestion ? defaultDeleteIcon : '',
  maxLength: question.answerMaxLength,
  placeHolder: getQuestionPlaceHolder(question),
  value: getQuestionAnswer(question),
  type: getQuestionType(question),
  format: getQuestionFormat(question),
  answers: buildAnswers(question),
  onChange: /* istanbul ignore next */isFunction(onChange) ? onChange : identity,
  onIconClick: /* istanbul ignore next */isFunction(onDelete) ? onDelete : identity
});

const transformQuestions = (apiQuestions, showDeleteIcon, readOnly, onChange, onDelete) =>
  apiQuestions.map((question) => {
    if (isGroup(question)) {
      const group = {
        groupId: question.groupID,
        groupOrder: question.groupOrder,
        groupName: question.groupHeader,
        questions: []
      };
      group.questions = question.questions.map(
        q => buildComponenetQuestion(q, showDeleteIcon, readOnly, onChange, onDelete));
      return group;
    }
    return buildComponenetQuestion(question, showDeleteIcon, readOnly, onChange, onDelete);
  });
/** this function is used to update api questions with some changes.
 * apiQuestions: the api question data from API
 * questionPath: the custom path, which type is array,
 *                will store the parent question index by order.
 */
const updateQuestionAnswerByPath = (apiQuestions, questionPath, { answer, errorMsg }) => {
  /* istanbul ignore else */
  if (isArray(apiQuestions) &&
    apiQuestions.length > 0 &&
    isArray(questionPath) &&
    questionPath.length > 0) {
    let foundQuestion = findQuestionByPath(apiQuestions, questionPath);

    /* istanbul ignore else */
    if (foundQuestion) {
      if (errorMsg !== undefined) {
        foundQuestion.errorMsg = errorMsg;
      }

      foundQuestion = setQuestionAnswer(foundQuestion, answer);
    }
  }

  return apiQuestions;
};

/**
 * only the top level question can be deleted.
 * @param {Array} questions Questions List
 * @param {string} questionIndex Question unique index
 */
const deleteQuestionByIndex = (questions, questionIndex) => {
  if (!isArray(questions) || questions.length === 0) {
    return questions;
  }

  const newQuestions = [];

  forEach(questions, (question) => {
    if (isGroup(question)) {
      if (question.questions.some(qu => qu.customquestionIndex === questionIndex)) {
        question.questions = question.questions.filter(
          qu => qu.customquestionIndex !== questionIndex);
      }
      newQuestions.push(question);
    } else if (question.customquestionIndex !== questionIndex) {
      newQuestions.push(question);
    }
  });

  return newQuestions;
};

const validateQuestions = (questions) => {
  const shownQuestions = getShownQuestions(questions);
  const validateErrors = [];
  shownQuestions.forEach((question) => {
    if (isGroup(question)) {
      question.questions.forEach(groupQuestion =>
        validateErrors.push({
          question: groupQuestion,
          objErrorMsg: validateQuestion(groupQuestion)
        }));
    } else {
      validateErrors.push({
        question,
        objErrorMsg: validateQuestion(question)
      });
    }
  });

  return validateErrors.filter(ve => ve.objErrorMsg != null);
};

const transformAddQuestions = (addQuestionList, questions, canDelete, readOnly) => {
  const addQuestionsData = transformQuestions(
        getShownQuestions(addQuestionList), canDelete, readOnly);

  const addQuestionsLength = count(addQuestionsData);
  questions[addQuestionsLength - 1].isBoldBorder = true;

  for (let i = 0; i < addQuestionsLength; i += 1) {
    if (questions[i].icon) {
      questions[i].icon = '';
    }
    if (questions[i].groupId) {
      questions[i].questions.forEach((question) => {
        question.icon = '';
      });
    }
  }
  return questions;
};

export default {
  isValid,
  isGroup,

  getQuestionAnswer,
  setQuestionAnswer,

  getShownQuestions,
  transformQuestions,

  deleteQuestionByIndex,

  validateQuestion,
  validateQuestions,

  updateQuestionAnswerByPath,
  findQuestionByPath,
  cleanSubQuestionAnswer,

  generateQuestionPathAndParent,
  registerCustomRules,
  transformAddQuestions,
  getQuestionValidationRule
};
