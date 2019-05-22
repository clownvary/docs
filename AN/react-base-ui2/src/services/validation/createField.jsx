import React, { PureComponent } from 'react';
import classNames from 'classnames';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import uniq from 'lodash/uniq';
import isFunction from 'lodash/isFunction';
import concat from 'lodash/concat';
import * as FieldLayout from './consts/FieldLayout';
import * as ErrorAlignment from './consts/ErrorAlignment';
import { Dock, Effect } from '../../consts';
import Tooltip from '../../components/Tooltip';
import buildErrorMessage from './utils/buildErrorMessage';
import Validation from './Validation';
import ErrorList from './components/ErrorList';


const createField = WrappedComponent => class extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      validationError: '',
      customMessages: []
    };

    this.dirty = false;
  }

  componentDidMount() {
    const {
      rules = '',
      validationMessages
    } = this.props;

    this.validator = Validation.createValidator(rules, validationMessages);
  }

  componentWillReceiveProps(nextProps) {
    const nextCustomMessages = nextProps.customMessages;
    const curCustomMessages = this.props.customMessages;

    if (curCustomMessages !== nextCustomMessages) {
      this.onError(nextCustomMessages);
    }
  }

  onValidate = (value) => {
    const {
      fieldName = 'Entry',
      onValidated
    } = this.props;

    const result = this.validator.validate(fieldName, value);
    this.setState({
      validationError: result.message
    });

    if (isFunction(onValidated)) {
      onValidated(result);
    }
  }

  buildTooltipContent = (rules) => {
    if (!rules || rules.length === 0) return '';

    const { fieldName } = this.props;
    const ruleSet = this.validator.getRuleSet();
    return (
      <div className="an-validation-tooltip">
        {
          ruleSet.map((rule, i) =>
            <div key={i}>
              <span>{buildErrorMessage(rule.message, fieldName, rule.param)}</span>
            </div>
          )
        }
      </div>
    );
  }

  onEnter = (target) => {
    const {
      showValidationTip = false
    } = this.props;

    if (showValidationTip) {
      const options = {
        content: this.buildTooltipContent(),
        dockStyle: Dock.TOP_LEFT,
        effect: Effect.FADE,
        distance: 4,
        showShadow: true,
        autoClose: 3000
      };

      Tooltip.open(target, options);
    }
  }

  onLeave = (value) => {
    const onLeave = this.props.onLeave;

    if (isFunction(onLeave)) {
      onLeave(value);
    }

    this.dirty && this.onValidate(value);
    this.dirty = false;
    Tooltip.close();
  }

  onValueChange = () => {
    this.dirty = true;
    const { validationError } = this.state;
    if (validationError) {
      this.setState({
        validationError: ''
      });
    }
  }

  onError = (messages) => {
    let customMessages = [];
    if (isString(messages) && messages !== '') {
      customMessages.push(messages);
    } else if (isArray(messages)) {
      customMessages = messages;
    }

    this.setState({
      customMessages
    });
  }

  render() {
    const { validationError = '', customMessages = [] } = this.state;
    const errorMessages = concat([], validationError || [], customMessages);
    const {
      fieldLayout = FieldLayout.ROW,
      fieldLabel = '',
      showLabel = false,
      showError = false,
      errorAlignment = ErrorAlignment.BOTTOM
     } = this.props;

    const clsFieldLayout = `an-field-layout-${fieldLayout}`;
    const clsErrorLayout = `an-error-layout-${errorAlignment}`;
    return (
      <div className={classNames('an-validation-field', clsErrorLayout)}>
        <div className={classNames('an-validation-field__wrap', clsFieldLayout)}>
          {showLabel && <span className="an-validation-field__label">{fieldLabel}</span>}
          <div className={classNames('an-validation-field__content')} >
            <WrappedComponent
              ref={(c) => { this.wrappedComponent = c; }}
              onEnter={({ target }) => this.onEnter(target)}
              onLeave={({ value }) => this.onLeave(value)}
              onValueChange={({ value }) => this.onValueChange(value)}
              onError={({ messages }) => this.onError(messages)}
            />
          </div>
        </div>
        {showError && <ErrorList className="an-validation-field__error" messages={uniq(errorMessages)} />}
      </div>
    );
  }
};

export default createField;
