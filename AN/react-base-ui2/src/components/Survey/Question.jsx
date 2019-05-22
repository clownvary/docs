import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
import isInteger from 'lodash/isInteger';
import isFunction from 'lodash/isFunction';
import uniqueId from 'lodash/uniqueId';

import Dropdown from '../Dropdown';
import { SafeText } from '../SafeText';
import Checkbox, { CheckboxGroup } from '../Checkbox';
import Input from '../Input';
import Radio, { RadioGroup } from '../Radio';
import InputDate from '../InputDate';
import InputTime from '../InputTime';
import Duration from '../Duration';
import Phone from '../Phone';
import Globalize from '../../services/i18n';

import { QuestionType, InputType } from './consts';

export const QuestionPropTypes = {
  /**
   * The unique key of question.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * The path of question.
   */
  path: PropTypes.array.isRequired,
  /**
   * The text description of question.
   */
  text: PropTypes.string.isRequired,
  /**
   * The hint text of question.
   */
  hint: PropTypes.string.isRequired,
  /**
   * Determines the readonly of question.
   */
  readonly: PropTypes.bool,
  /**
   * Determines the question require an answer.
   */
  required: PropTypes.bool,
  /**
   * Determines the question is not hidden.
   */
  isShown: PropTypes.bool.isRequired,
  /**
   * The error message for the question answer validation.
   */
  errorMsgs: PropTypes.array,
  /**
   * The post icon for question.
   */
  icon: PropTypes.string,
  /**
   * The max length limit for the question answer. Available for question of
   * INPUT type with formats: UPPERCASE, LOWERCASE, NUMBER, ALPHA and FREE.
   */
  maxLength: PropTypes.number,
  /**
   * Determines the width of popup calender will auto resize as input date's width.
   * The property will only work for question whose format is InputType.DATE.
   * The property will only work for the question whose format is InputType.DATE.
   */
  flexibleCalendar: PropTypes.bool,
  /**
   * Determines the width of popup menu will auto resize as parent select width.
   * The property will only work for the question whose type is QuestionType
   * SINGLEDROPDOWN or QuestionType.MULTIPLEDROPDOWN.
   */
  flexibleMenu: PropTypes.bool,
  /**
   * The placeholder for the question answer. Available for question MULTIPLEDROPDOWN type
   * and INPUT type with formats: MULTIPLEDROPDOWN, UPPERCASE, LOWERCASE, NUMBER, ALPHA and FREE.
   */
  placeHolder: PropTypes.string,
  /**
   * The answer value of question.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
    PropTypes.instanceOf(Date)]),
  // postalCodeType: PropTypes.number,
  /**
   * Determines the render method of question answer section.
   */
  type: PropTypes.oneOf([
    QuestionType.INPUT,
    QuestionType.RADIO,
    QuestionType.SINGLEDROPDOWN,
    QuestionType.CHECKBOX,
    QuestionType.MULTIPLEDROPDOWN
  ]),
  /**
   * Determines the format of INPUT type question.
   */
  format: PropTypes.oneOf([
    InputType.FREE,
    InputType.PHONE,
    InputType.DATE,
    InputType.TIME,
    InputType.SSNTB,
    InputType.POSTAL,
    InputType.UPPERCASE,
    InputType.LOWERCASE,
    InputType.NUMBER,
    InputType.ALPHA,
    InputType.DURATION
  ]),
  /**
   * The preset answers that only available for question types: RADIO,
   * SINGLEDROPDOWN, CHECKBOX and MULTIPLEDROPDOWN.
   */
  answers: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The display text of answer option.
     */
    text: PropTypes.string.isRequired,
    /**
     * The value of answer option.
     */
    value: PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.string.isRequired])
  })),
  /**
   * The callback function that is triggered when changes the answer value.
   */
  onChange: PropTypes.func,
  /**
   * The callback function that is triggered when clicks the post question icon.
   */
  onIconClick: PropTypes.func
};

export default class Question extends React.PureComponent {
  static displayName = 'Question';
  static propTypes = QuestionPropTypes;

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };

    this._uniqueId = uniqueId('an-question-');
    this._labelId = `${this._uniqueId}_label_id`;
  }

  componentDidMount() {
    Object.defineProperties(this, {
      value: {
        get() {
          return this.state.value;
        },
        set(val) {
          this.setState({ value: val });
        }
      }
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.value = nextProps.value;
    }
  }

  onChange(value) {
    const { onChange, id, path } = this.props;
    if (isFunction(onChange)) {
      onChange({ id, path, value });
    }
  }

  onIconClick() {
    const { onIconClick, id, path, required } = this.props;
    if (required) {
      return;
    }
    isFunction(onIconClick) && onIconClick({ id, path });
  }

  formatArrayValue(val) {
    let myValue = isNil(val) ? [] : val;
    myValue = isArray(myValue) ? myValue : [myValue];
    return myValue.map(v => `${v}`);
  }

  renderQuestionItem() {
    const { id,
      readonly,
      format,
      type,
      answers,
      errorMsgs,
      maxLength,
      placeHolder,
      text,
      flexibleCalendar,
      flexibleMenu,
      required,
      hint
    } = this.props;
    const { value } = this.state;
    const isError = isArray(errorMsgs) && errorMsgs.length > 0;
    const maxLen = isInteger(maxLength) ? parseInt(maxLength, 10) : '';
    const ariaLabel = required ? `* ${text} (required) ${hint}` : `${text} ${hint}`;
    switch (type) {
      case QuestionType.RADIO:
        return (<RadioGroup
          className={classNames({ 'question-error': isError })}
          name={uniqueId(`${id}-`)}
          value={`${value}`}
          disabled={readonly}
          onChange={({ target: { value: val } }) => {
            this.setState({ value: val }, () => this.onChange(val));
          }}
        >
          {answers.map((answer, index) =>
            <Radio key={`${id}_${index}`} value={`${answer.value}`}>
              {answer.text}
            </Radio>
          )}
        </RadioGroup>);
      case QuestionType.SINGLEDROPDOWN:
        return (<Dropdown
          data={answers.map(answer => ({ text: answer.text, value: `${answer.value}` }))}
          value={`${value}`}
          flexibleMenu={flexibleMenu}
          disabled={readonly}
          onChange={(obj) => {
            this.setState({ value: obj.value });
            this.onChange(obj.value);
          }}
        />);
      case QuestionType.CHECKBOX:
        return (<CheckboxGroup
          className={classNames({ 'question-error': isError })}
          name={uniqueId(`${id}-`)}
          value={this.formatArrayValue(value)}
          disabled={readonly}
          onChange={(val) => {
            this.setState({ value: val });
            this.onChange(val);
          }}
        >
          {answers.map((answer, index) =>
            <Checkbox key={`${id}_${index}`} className="checkbox-item" value={`${answer.value}`}>
              {answer.text}
            </Checkbox>
          )}
        </CheckboxGroup>);
      case QuestionType.MULTIPLEDROPDOWN:
        return (<Dropdown
          data={answers.map(answer => ({ text: answer.text, value: `${answer.value}` }))}
          value={this.formatArrayValue(value)}
          disabled={readonly}
          flexibleMenu={flexibleMenu}
          placeholder="Select answers"
          showCheckbox
          onChange={(obj) => {
            this.setState({ value: obj.value });
            this.onChange(obj.value);
          }}
        />);
      case QuestionType.INPUT:
      default:
        switch (format) {
          case InputType.PHONE:
            return (<Phone
              value={value}
              disabled={readonly}
              ariaLabel={ariaLabel}
              onChange={(val) => {
                this.setState({ value: val });
                this.onChange(val);
              }}
            />);
          case InputType.DATE:
            return (<InputDate
              disabled={readonly}
              value={value}
              showClear={false}
              flexibleCalendar={flexibleCalendar}
              ariaLabel={`Input date ${text}`}
              onValueChange={(e) => {
                this.setState({ value: e.value && e.value.toDate() });
                this.onChange(Globalize.formatDate(e.value));
              }}
            />);
          case InputType.TIME:
            return (<InputTime
              disabled={readonly}
              value={Globalize.parseTime(value)}
              showClear={false}
              ariaLabel={`Input time ${text}`}
              onValueChange={(e) => {
                this.setState({ value: e.value && e.value.toDate() });
                this.onChange(Globalize.formatTime(e.value));
              }}
            />);
          case InputType.SSNTB:
            return (<Input
              disabled={readonly}
              value={value}
              maxLength={11}
              formula={/\d/}
              ariaLabel={`SSN ${text}`}
              onChange={
                ({ target: { value: val } }) => {
                  this.setState({ value: val });
                }}
              onBlur={({ target: { value: val } }) => this.onChange(val)}
            />);
          case InputType.POSTAL:
            return (<Input
              maxLength={10}
              disabled={readonly}
              value={value}
              ariaLabel={`Postal ${text}`}
              onChange={
                ({ target: { value: val } }) => {
                  this.setState({ value: val });
                }}
              onBlur={({ target: { value: val } }) => this.onChange(val)}
            />);
          case InputType.UPPERCASE:
            return (<Input
              disabled={readonly}
              maxLength={maxLen}
              placeholder={placeHolder}
              value={value}
              ariaLabel={`Input upper case box ${text}`}
              onChange={
                ({ target: { value: val } }) => {
                  this.setState({ value: val.toLocaleUpperCase() });
                }}
              onBlur={
                ({ target: { value: val } }) => {
                  this.onChange(val);
                }}
            />);
          case InputType.LOWERCASE:
            return (<Input
              maxLength={maxLen}
              disabled={readonly}
              placeholder={placeHolder}
              value={value}
              ariaLabel={`Input lower case box ${text}`}
              onChange={
                ({ target: { value: val } }) => {
                  this.setState({ value: val.toLocaleLowerCase() });
                }}
              onBlur={
                ({ target: { value: val } }) => {
                  this.onChange(val);
                }}
            />);
          case InputType.NUMBER:
            return (<Input
              maxLength={maxLen}
              disabled={readonly}
              placeholder={placeHolder}
              value={value}
              formula={/\d/}
              ariaLabel={`Input number case box ${text}`}
              onChange={
                ({ target: { value: val } }) => {
                  this.setState({ value: val });
                }}
              onBlur={
                ({ target: { value: val } }) => {
                  this.onChange(val);
                }}
            />);
          case InputType.ALPHA:
            return (<Input
              maxLength={maxLen}
              disabled={readonly}
              placeholder={placeHolder}
              value={value}
              formula={/[a-zA-Z]/}
              ariaLabel={`Input alpha case box ${text}`}
              onChange={
                ({ target: { value: val } }) => {
                  this.setState({ value: val });
                }}
              onBlur={({ target: { value: val } }) => this.onChange(val)}
            />);
          case InputType.DURATION:
            return (<Duration
              disabled={readonly}
              value={value}
              ariaLabelledbyProvider={ids => `${this._labelId}${ids ? ` ${ids}` : ''}`}
              onChange={
                (duration) => {
                  this.setState({ value: duration });
                  this.onChange(duration);
                }}
            />);
          case InputType.FREE:
          default:
            return (<Input
              maxLength={maxLen}
              disabled={readonly}
              placeholder={placeHolder}
              value={value}
              ariaLabel={`Input box ${text}`}
              onChange={
                ({ target: { value: postalCodeVal } }) => {
                  this.setState({ value: postalCodeVal });
                }}
              onBlur={({ target: { value: val } }) => this.onChange(val)}
            />);
        }
    }
  }

  render() {
    const { isShown, id, required, hint, hightlight,
      errorMsgs, icon, text, isBoldBorder, path,
      questionLabelClass, questionContainerClass } = this.props;
    const subQuestion = path.indexOf('subQuestion') >= 0;
    return (
      <div
        className={classNames('question', 'aaui-flex',
          {
            'u-hidden': !isShown,
            'sub-question': subQuestion,
            'question-error': isArray(errorMsgs) && errorMsgs.length > 0,
            'is-bold-border': isBoldBorder
          }
        )}
        key={`question_${id}`}
      >
        <div className={classNames('afx-col', 'question-label', questionLabelClass || 'afx-xl-6-12')}>
          <div
            id={this._labelId}
            className="question-label__name"
          >
            <span className={`${required ? 'icon icon-asterisk' : 'icon icon-circle'}`} />
            <SafeText
              dangerMode
              className={classNames({
                hightlight: !!hightlight,
                'question-label__name-required': required
              })}
              tagName="span"
              text={text}
            />
          </div>
          <div className="question-label__hint">
            <SafeText dangerMode tagName="span" text={hint} />
          </div>
        </div>
        <div className={classNames('afx-col', 'question-answer-container', questionContainerClass || 'afx-xl-5-12')}>
          <div className="question-answer">
            {this.renderQuestionItem()}
            {isArray(errorMsgs) && errorMsgs.map((errorMsg, i) =>
              <div key={i} className="question-answer__error">
                <span className="icon icon-times-circle" />
                <SafeText dangerMode tagName="span" text={errorMsg} />
              </div>
            )}
          </div>
        </div>
        <div className={classNames('afx-col', 'afx-xl-1-12', 'question-icon')}>
          {
            icon &&
            <span
              className={classNames('icon', icon, 'link', {
                'is-disabled': required
              })}
              onClick={() => this.onIconClick()}
            />
          }
        </div>
      </div>
    );
  }
}
