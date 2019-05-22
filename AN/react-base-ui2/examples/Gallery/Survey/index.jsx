
import React from 'react';
import moment from 'moment';
import uniqueId from 'lodash/uniqueId';
import map from 'lodash/map';
import random from 'lodash/random';
import findKey from 'lodash/findKey';
import repeat from 'lodash/repeat';
import cloneDeep from 'lodash/cloneDeep';

import { Survey, QuestionType, InputType } from 'src/components/Survey';
import SurveyMd from 'doc/api/components/Survey/Survey.md';
import QuestionMd from 'doc/api/components/Survey/Question.md';
import QuestionGroupMd from 'doc/api/components/Survey/QuestionGroup.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings, { enumBoolean } from './initSettings';

const generateName = (prefix, suffix) => `${repeat(`${prefix} `, random(1, 10))} ${suffix}`;

const getKeyByValue = (enumObj, enumValue) => {
  if (enumObj) {
    return findKey(enumObj, value => value === enumValue).toLocaleLowerCase();
  }

  return '';
};

const generateHint = question =>
  (`hint ${question.id} <br />
  [readonly: ${question.readonly}]
  [required: ${question.required}] <br />
  [QuestionType: ${getKeyByValue(QuestionType, question.type)}]
  [InputType: ${getKeyByValue(InputType, question.format)}] <br />
  [answers: ${JSON.stringify(question.answers).replace('},{', '<br />')}] <br />
  [value: ${question.value}]
  `);


const generateAnswer = (id) => {
  const text = generateName('answer', id);
  return ({
    text,
    value: id
  });
};

const generateAnswers = (count) => {
  let id = 0;
  const answers = map(Array(count), () => { id += 1; return generateAnswer(id); });
  answers[random(0, count - 1)].selected = true;
  return answers;
};

const generateQuestion = (type, format = InputType.FREE) => {
  const id = uniqueId();

  const text = generateName('question', `${id}`);

  const question = {
    id,
    text,
    readonly: random(1, 100) % 3 === 0,
    required: random(1, 100) % 2 === 0,

    type,
    format,
    defaultAnswer: '',
    answers: type === QuestionType.INPUT ? [] : generateAnswers(random(4, 10))
  };
  if (format === InputType.DATE) {
    question.flexibleCalendar = true;
  }
  if (type === QuestionType.MULTIPLEDROPDOWN || type === QuestionType.SINGLEDROPDOWN) {
    question.flexibleMenu = true;
  }

  let value = '';
  switch (type) {
    case QuestionType.RADIO:
      value = question.answers[random(0, question.answers.length - 1)].value;
      break;
    case QuestionType.SINGLEDROPDOWN:
      value = question.answers[random(0, question.answers.length - 1)].value;
      question.answers = [{ name: '&nbsp;', value: '' }, ...question.answers];
      break;
    case QuestionType.CHECKBOX:
    case QuestionType.MULTIPLEDROPDOWN:
      value = question.answers.filter(() => random(0, 10) % 3 === 0).map(q => q.value);
      break;
    case QuestionType.INPUT:
    default:
      switch (format) {
        case InputType.PHONE:
          value = `${random(0, 999)}-${random(1111111, 9999999)}-${random(0, 999)}`;
          break;
        case InputType.DATE:
          value = moment().format('MM/DD/YYYY');
          break;
        case InputType.TIME:
          value = moment().format('MM/DD/YYYY HH:mm:ss');
          break;
        case InputType.SSNTB:
          value = '';
          break;
        case InputType.POSTAL:
          value = '';
          break;
        case InputType.UPPERCASE:
          value = '';
          break;
        case InputType.LOWERCASE:
          value = '';
          break;
        case InputType.NUMBER:
          value = random(0, 9999999999);
          break;
        case InputType.ALPHA:
          value = '';
          break;
        case InputType.DURATION:
          value = `${random(0, 24)}:${random(0, 59)}:${random(0, 59)}`;
          break;
        case InputType.FREE:
        default:
          value = 'FREE';
          break;
      }
      break;
  }

  question.value = value;

  question.hint = generateHint(question);

  return question;
};

const generateQuestions = () => {
  const questions = [];

  questions.push(generateQuestion(QuestionType.RADIO));
  questions.push(generateQuestion(QuestionType.SINGLEDROPDOWN));
  questions.push(generateQuestion(QuestionType.CHECKBOX));
  questions.push(generateQuestion(QuestionType.MULTIPLEDROPDOWN));
  questions.push(generateQuestion(QuestionType.INPUT, InputType.FREE));
  questions.push(generateQuestion(QuestionType.INPUT, InputType.UPPERCASE));
  questions.push(generateQuestion(QuestionType.INPUT, InputType.LOWERCASE));
  questions.push(generateQuestion(QuestionType.INPUT, InputType.NUMBER));
  questions.push(generateQuestion(QuestionType.INPUT, InputType.ALPHA));
  questions.push(generateQuestion(QuestionType.INPUT, InputType.DURATION));
  questions.push(generateQuestion(QuestionType.INPUT, InputType.PHONE));
  questions.push(generateQuestion(QuestionType.INPUT, InputType.DATE));
  questions.push(generateQuestion(QuestionType.INPUT, InputType.TIME));
  questions.push(generateQuestion(QuestionType.INPUT, InputType.SSNTB));
  questions.push(generateQuestion(QuestionType.INPUT, InputType.POSTAL));

  return questions;
};

const generateParentAndSubQuestion = () => {
  const parent = generateQuestion(QuestionType.RADIO);
  const parentId = parent.id;
  const sub1 = generateQuestion(QuestionType.INPUT, InputType.UPPERCASE);
  sub1.path = [parentId, 'answers', 0, 'subQuestion'];
  const sub2 = generateQuestion(QuestionType.INPUT, InputType.LOWERCASE);
  sub2.path = [parentId, 'answers', 1, 'subQuestion'];
  const sub3 = generateQuestion(QuestionType.INPUT, InputType.NUMBER);
  sub3.path = [parentId, 'answers', 2, 'subQuestion'];
  return [parent, sub1, sub2, sub3];
};

const getBooleanValue = (val) => {
  let value;
  switch (val) {
    case `${enumBoolean.TRUE}`:
    case enumBoolean.TRUE:
      value = true;
      break;
    case `${enumBoolean.FALSE}`:
    case enumBoolean.FALSE:
      value = false;
      break;
    case `${enumBoolean.RANDOM}`:
    case enumBoolean.RANDOM:
    default:
      value = random(1, 100) % 3 === 0;
      break;
  }
  return value;
};

const getConfig = (configs, question) => ({
  ...configs,
  readonly: getBooleanValue(configs.readonly),
  required: getBooleanValue(configs.required),
  isShown: getBooleanValue(configs.isShown),
  hint: configs.showHint ? question.hint : '',
  errorMsgs: getBooleanValue(configs.showError) ? ['this is an error'] : [],
  path: question.path ? question.path : [uniqueId()]
});

export default class Page extends DemoPage {

  static meta = {
    name: 'Survey',
    icon: 'icon-question',
    documents: [SurveyMd, QuestionMd, QuestionGroupMd],
    description: 'This example demonstrates the features of Survey.'
  }

  constructor() {
    super();

    this.state = {
      ...this.state,
      questions: generateQuestions(),
      group: {
        groupId: 1,
        groupName: 'Please indicate cabin preferences, if any.',
        questions: generateQuestions()
      },
      parentAndSubs: generateParentAndSubQuestion()
    };
  }

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    const { settings, questions, group, parentAndSubs } = this.state;
    const props = pickProps(settings);
    let cloneQuestions = cloneDeep(questions);
    cloneQuestions.splice(1, 0, {
      type: 'divider',
      className: 'new-question-divider'
    });

    cloneQuestions = cloneQuestions.map(question => ({
      ...question,
      ...getConfig(props, question)
    }));
    const cloneGroup = cloneDeep(group);
    cloneGroup.questions = cloneGroup.questions.map(question => ({
      ...question,
      ...getConfig(props, question)
    }));
    cloneQuestions.push(cloneGroup);
    cloneQuestions[3].isBoldBorder = true;

    let cloneParentAndSubs = cloneDeep(parentAndSubs);
    cloneParentAndSubs = cloneParentAndSubs.map(question => ({
      ...question,
      ...getConfig(props, question)
    }));
    cloneQuestions.push(...cloneParentAndSubs);

    return (
      <Survey
        data={cloneQuestions}
        {...props}
        onChange={(e) => {
          this.log(`[event] onChange: ${JSON.stringify(e)}`);
        }}
        onIconClick={(e) => {
          this.log(`[event] onIconClick: ${JSON.stringify(e)}`);
        }}
      />
    );
  }

}
