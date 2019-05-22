import React from 'react';
import moment from 'moment';
import uniqueId from 'lodash/uniqueId';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import random from 'lodash/random';
import findKey from 'lodash/findKey';
import repeat from 'lodash/repeat';

import { Question, QuestionGroup, QuestionType, InputType } from '../../src/components/Survey';
import Button from '../../src/components/Button';
import { Sticky, StickyContainer } from '../../src/components/Sticky';

import '../base.less';
import '../layout.less';
import './app.less';

const enumBoolean = {
  RANDOM: 2,
  TRUE: 1,
  FALSE: 0
};

const defaultConfig = {
  readonly: enumBoolean.RANDOM,
  required: enumBoolean.RANDOM,
  isShown: enumBoolean.TRUE,
  showIcon: enumBoolean.TRUE,

  maxLength: 100,
  defaultAnswer: '',
  placeHoder: '',

  onChange: e => console.log('onChange', e),
  onIconClick: e => console.log('onIconClick', e)
};

const customConfig = {
  showHint: true
};

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
  const name = generateName('answer', id);
  return ({
    name,
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

  const name = generateName('question', `${id}`);

  const question = {
    id,
    name,
    readonly: random(1, 100) % 3 === 0,
    required: random(1, 100) % 2 === 0,

    type,
    format,
    defaultAnswer: '',
    answers: type === QuestionType.INPUT ? [] : generateAnswers(random(4, 10))
  };

  let value = '';
  switch (type) {
    case QuestionType.RADIO:
      value = question.answers[random(0, question.answers.length - 1)].value;
      break;
    case QuestionType.SINGLEDROPDOWN:
      value = question.answers[random(0, question.answers.length - 1)].value;
      question.answers = [{ name: '&nbsp;', value: '' }, ...question.answers];
      console.log(question.answers);
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

const getConfig = (config) => {
  const newConfig = {
    ...config,

    readonly: getBooleanValue(config.readonly),
    required: getBooleanValue(config.required),
    isShown: getBooleanValue(config.isShown),
    showIcon: getBooleanValue(config.showIcon),

    maxLength: config.maxLength,
    placeHoder: config.placeHoder
  };

  return newConfig;
};

class App extends React.PureComponent {
  constructor() {
    super();

    this.state = { config: { ...defaultConfig, ...customConfig }, questions: generateQuestions() };
  }

  changeConfig(configName, configValue, callBack) {
    this.setState({
      config: { ...this.state.config, [configName]: configValue },
      questions: this.state.questions.map((question) => {
        const newAttr = {};
        switch (configName) {
          case 'readonly':
          case 'required':
          case 'isShown':
          case 'showIcon':
            newAttr[configName] = getBooleanValue(configValue);
            break;
          case 'maxLength':
            newAttr[configName] = parseInt(configValue, 10);
            break;
          case 'showHint':
            question.hint = configValue ? generateHint(question) : '';
            break;
          case 'defaultAnswer':
          case 'placeHoder':
          default:
            newAttr[configName] = configValue;
            break;
        }

        return { ...question, ...newAttr };
      })
    },
      () => {
        console.log('changeConfig', { configName, configValue }, this.state);
        isFunction(callBack) && callBack();
      });
  }

  changeState(stateName, stateValue) {
    this.setState({ ...this.state, [stateName]: stateValue },
      () => console.log('changeState', { stateName, stateValue }));
  }

  refreshQuestion() {
    const questions = generateQuestions();
    this.setState({ questions });
  }

  resetConfig() {
    this.setState({ config: { ...defaultConfig, ...customConfig } },
      () => console.log('resetConfig', this.state));
  }

  render() {
    const { config, questions } = this.state;
    return (
      <div>
        <div className="sample-content">
          <StickyContainer>
            <Sticky>
              <div className="side-bar">
                <div className="options">
                  <div className="row">
                    <span className="label">readonly</span>
                    <select value={config.readonly} onChange={e => this.changeConfig('readonly', e.target.value)}>
                      {
                        Object.keys(enumBoolean).map((key, index) => (
                          <option
                            key={index}
                            value={enumBoolean[key]}
                          >
                            {key}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="row">
                    <span className="label">required</span>
                    <select value={config.required} onChange={e => this.changeConfig('required', e.target.value)}>
                      {
                        Object.keys(enumBoolean).map((key, index) => (
                          <option
                            key={index}
                            value={enumBoolean[key]}
                          >
                            {key}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="row">
                    <span className="label">isShown</span>
                    <select value={config.isShown} onChange={e => this.changeConfig('isShown', e.target.value)}>
                      {
                        Object.keys(enumBoolean).map((key, index) => (
                          <option
                            key={index}
                            value={enumBoolean[key]}
                          >
                            {key}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="row">
                    <span className="label">showIcon</span>
                    <select value={config.showIcon} onChange={e => this.changeConfig('showIcon', e.target.value)}>
                      {
                        Object.keys(enumBoolean).map((key, index) => (
                          <option
                            key={index}
                            value={enumBoolean[key]}
                          >
                            {key}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="row">
                    <span className="label">Max Length </span>
                    <input onBlur={e => this.changeConfig('maxLength', parseInt(e.target.value, 10))} defaultValue={config.maxLength} />
                  </div>

                  <div className="row">
                    <span className="label">Place Holder </span>
                    <input onBlur={e => this.changeConfig('placeHolder', e.target.value)} defaultValue={config.placeHolder} />
                  </div>

                  <div className="row">
                    <span className="label">Show Hint </span>
                    <input type="checkbox" onChange={e => this.changeConfig('showHint', e.target.checked)} checked={config.showHint} />
                  </div>
                </div>

                <Button type="primary" size="sm" onClick={() => { this.refreshQuestion(); }}>Refresh Question</Button>

                <Button type="primary" size="sm" onClick={() => { this.resetConfig(); }}>Reset Config</Button>
              </div>
            </Sticky>
            <div className="sample-form">
              <h3>
                In ANet, we use simple survey:
            </h3>
              <div className="row">
                <div className="field">
                  {
                    map(questions, question =>
                      (<Question
                        key={question.id}
                        {...question}
                        {...getConfig(config)}
                      />)
                    )
                  }

                  <QuestionGroup
                    questions={questions.map(question => ({ ...question, ...getConfig(config) }))}
                    groupId={1}
                    groupName="My Question Group"
                  />

                </div>
              </div>
            </div>
          </StickyContainer>

        </div>


      </div>

    );
  }
}


export default App;
