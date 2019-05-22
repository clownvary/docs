import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import toString from 'lodash/toString';
import find from 'lodash/find';
import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import once from 'lodash/once';

import Globalize from 'react-base-ui/lib/services/i18n';
import { Validation } from 'react-base-ui/lib/services/validation/';
import { QuestionType, InputType } from 'react-base-ui/lib/components/Survey';
import customRule from '../rules';

import { APIQuestionType, APIQuestionFormat, ErrorMessage } from '../consts';

let globalSystemConfig = {};

const isValid = apiQuestion =>
  apiQuestion && apiQuestion.customquestionIndex && apiQuestion.customquestionID;

const isGroup = apiQuestion =>
  apiQuestion && apiQuestion.groupID && isArray(apiQuestion.questions);

const cleanHTML = (content) => {
  if (!content) {
    return '';
  }

  let tmp = content;

  if (!isString(tmp)) {
    tmp = toString(tmp);
  }

  return tmp.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const getQuestionAnswer = (apiQuestion) => {
  if (isValid(apiQuestion)) {
    switch (apiQuestion.answerType) {
      case APIQuestionType.INPUT:
        return apiQuestion.answer || apiQuestion.answer === 0 ? `${apiQuestion.answer}` : '';
      case APIQuestionType.SINGLEDROPDOWN:
      case APIQuestionType.RADIO:
        if (isArray(apiQuestion.answers)) {
          const selectedAnswer = find(apiQuestion.answers, answer => answer.selected);
          if (selectedAnswer) {
            return `${selectedAnswer.answerID}`;
          }
        }
        return '';
      case APIQuestionType.CHECKBOX:
      case APIQuestionType.MULTIPLEDROPDOWN:
        if (isArray(apiQuestion.answers)) {
          return apiQuestion.answers.filter(answer => answer.selected)
            .map(answer => `${answer.answerID}`);
        }
        return [];
      default:
        break;
    }
  }
  return null;
};

const setQuestionAnswer = (apiQuestion, answer) => {
  if (isValid(apiQuestion)) {
    let tempAnswer = answer;
    switch (apiQuestion.answerType) {
      case APIQuestionType.INPUT:
        apiQuestion.answer = tempAnswer;
        break;
      case APIQuestionType.SINGLEDROPDOWN:
      case APIQuestionType.RADIO:
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
      default:
        break;
    }
  }
  return apiQuestion;
};

const cleanSubQuestionAnswer = (apiQuestion, newAnswer, affectedSubQuestions = []) => {
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
        default:
          return null;
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
      default:
        return null;
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
          default:
            break;
        }
        break;
      case APIQuestionType.MULTIPLEDROPDOWN:
        placeHolder = 'Select answers';
        break;
      default:
        break;
    }
  }

  return placeHolder;
};

const getQuestionValidationRule = (apiQuestion) => {
  const rules = [];
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
  if (isString(template)) {
    return template.replace(/{([^}]+)}/g, (match, key) => {
      if (typeof options[key] !== 'undefined') {
        return options[key];
      }
      return match;
    });
  }

  return '';
};

const getErrorMessageByCode = (errorCode, options) => {
  const customErrorKey = ErrorMessage.CustomErrorKey;
  if (
    errorCode &&
    Object.keys(customErrorKey).some(key => customErrorKey[key] === errorCode)) {
    const opts = { ...globalSystemConfig, ...options };
    return {
      message: formatString(ErrorMessage.ErrorMessage[errorCode], opts),
      shortMessage: formatString(ErrorMessage.ShortErrorMessage[errorCode], opts)
    };
  }

  return { message: errorCode, shortMessage: errorCode };
};

const getPureQuestion = (apiQuestion) => {
  if (isArray(apiQuestion.answers)) {
    apiQuestion.answers = apiQuestion.answers.map(answer => ({
      ...answer,
      subQuestion: null
    }));
  }

  return apiQuestion;
};

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

const getShownQuestions = (apiQuestions) => {
  if (isArray(apiQuestions) && apiQuestions.length > 0) {
    let arrStandardQuestions = [];

    apiQuestions.forEach((question) => {
      if (isGroup(question)) {
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
        isValid(answer.subQuestion) && setQuestionPath(answer.subQuestion, path.slice()
          .concat(['answers', answerIndex, 'subQuestion']), apiQuestion);
      });
    }
  }
};

const generateQuestionPathAndParent = (apiQuestions) => {
  if (isArray(apiQuestions) && apiQuestions.length > 0) {
    const cloneQuestions = cloneDeep(apiQuestions);

    cloneQuestions.forEach((apiQuestion, apiQuestionIndex) => {
      setQuestionPath(apiQuestion, [apiQuestionIndex]);
    });

    return cloneQuestions;
  }

  return apiQuestions;
};

const validateQuestion = (apiQuestion, answer) => {
  if (isValid(apiQuestion)) {
    const questionAnswer = answer === undefined ? getQuestionAnswer(apiQuestion) : answer;

    const rules = getQuestionValidationRule(apiQuestion);
    if (isArray(rules) && rules.length > 0) {
      const validator = Validation.createValidator(rules.join('|'));
      const result = validator.validate(apiQuestion.question, questionAnswer);

      if (!result.isValid) {
        const objErrorMsg = getErrorMessageByCode(result.errorCode, {
          name: apiQuestion.question,
          maxLength: apiQuestion.answerMaxLength
        });
        return objErrorMsg;
      }
    }
  }

  return null;
};

const findQuestionByPath = (apiQuestions, questionPath) =>
  get(apiQuestions, questionPath);

const buildAnswers = (apiQuestion) => {
  if (isArray(apiQuestion.answers)) {
    let answers = cloneDeep(apiQuestion.answers);

    // apply answer code rule
    if (apiQuestion.useAnswerCode) {
      answers = answers.map(questionAnswer => ({
        ...questionAnswer,
        answer: `${questionAnswer.code < 10 ? '0' : ''}${questionAnswer.code} : ${questionAnswer.answer}`
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

const buildComponentQuestion = ({ question, readonly, onChange, onDelete, isMobile }) => {
  const built = {
    id: question.customquestionIndex,
    text: cleanHTML(question.question),
    path: question.path,
    hint: cleanHTML(question.hint),
    readonly,
    required: question.answerRequired,
    isShown: true,
    errorMsgs: question.errorMsg ? [question.errorMsg] : [],
    icon: '',
    maxLength: question.answerMaxLength,
    placeHolder: getQuestionPlaceHolder(question),
    value: getQuestionAnswer(question),
    type: getQuestionType(question),
    format: getQuestionFormat(question),
    answers: buildAnswers(question),
    onChange: isFunction(onChange) ? onChange : identity,
    onIconClick: isFunction(onDelete) ? onDelete : identity
  };
  if (built.type === QuestionType.INPUT && built.format === InputType.DATE) {
    built.flexibleCalendar = isMobile;
  }
  if (built.type === QuestionType.SINGLEDROPDOWN || built.type === QuestionType.MULTIPLEDROPDOWN) {
    built.flexibleMenu = true;
  }
  return built;
};

const transformQuestions = ({ apiQuestions, ...rest }) =>
  apiQuestions.map((question) => {
    if (isGroup(question)) {
      const group = {
        groupId: question.groupID,
        groupOrder: question.groupOrder,
        groupName: question.groupHeader,
        questions: []
      };
      group.questions = question.questions.map(item =>
        buildComponentQuestion({ question: item, ...rest }));
      return group;
    }
    return buildComponentQuestion({ question, ...rest });
  });

const updateQuestionAnswerByPath = (apiQuestions, questionPath, { answer, errorMsg }) => {
  if (isArray(apiQuestions) &&
    apiQuestions.length > 0 &&
    isArray(questionPath) &&
    questionPath.length > 0) {
    let foundQuestion = findQuestionByPath(apiQuestions, questionPath);
    if (foundQuestion) {
      if (errorMsg !== undefined) {
        foundQuestion.errorMsg = errorMsg;
      }
      foundQuestion = setQuestionAnswer(foundQuestion, answer);
    }
  }

  return apiQuestions;
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

const registerCustomRules = once((systemConfig) => {
  globalSystemConfig = { ...globalSystemConfig, ...systemConfig };
  const {
    systemAreaCode,
    systemCountryCode,
    ssnNumericOnly,
    ssnValidLength
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
        Validation.registerRule(customRuleKey, ssn => customRule[customRuleKey](ssn, ssnNumericOnly, ssnValidLength), '', true);
        break;
      case 'zipcode':
        Validation.registerRule(customRuleKey, zipCode => customRule[customRuleKey](zipCode, systemCountryCode, systemCountryCode), '', true);
        break;
      default:
        Validation.registerRule(customRuleKey, customRule[customRuleKey]);
        break;
    }
  });
});

export default {
  isValid,
  isGroup,
  cleanHTML,
  getQuestionFormat,
  getQuestionType,
  getQuestionAnswer,
  setQuestionAnswer,
  getQuestionPlaceHolder,
  getPureQuestion,
  getSelectedSubQuestion,
  getShownQuestions,
  setQuestionPath,
  buildAnswers,
  buildComponentQuestion,
  transformQuestions,
  formatString,
  validateQuestion,
  validateQuestions,
  getErrorMessageByCode,
  updateQuestionAnswerByPath,
  findQuestionByPath,
  cleanSubQuestionAnswer,

  generateQuestionPathAndParent,
  registerCustomRules,
  getQuestionValidationRule
};
