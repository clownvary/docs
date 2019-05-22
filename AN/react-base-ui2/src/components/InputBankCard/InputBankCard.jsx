import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fill from 'lodash/fill';
import isInteger from 'lodash/isInteger';
import flatten from 'lodash/flatten';

import Input from '../Input';
import MaskFormatter from './utils/MaskFormatter';
import getPureNumber from './utils/getPureNumber';

/**
 * Default PropTypes for InputBankCard
 */
const InputBankCardPropTypes = {
  /**
   * A list of class names to pass along to the container element of component.
   * Default value is "".
   */
  className: PropTypes.string,
  /**
   * Externally exposed value.
   * Default value is null.
   */
  value: PropTypes.string,
  /**
   * Set the length of a group's numbers.
   * Default value is 4.
   */
  group: PropTypes.number,
  /**
   * Set the length of numbers that are allowed to enter.
   * Default is 16.
   */
  maxLength: PropTypes.number,
  /**
   * Determines the delimiter between each group.
   */
  gapChar: PropTypes.string,
  /**
   * Determines the prompt character displaying.
   */
  showPrompt: PropTypes.bool,
  /**
   * Determines the number only can be inserted at empty position.
   */
  keepPosition: PropTypes.bool,
  /**
   * The callback function that is triggered when changes the number.
   */
  onInput: PropTypes.func
};

const InputBankCardProps = {
  className: '',
  group: 4,
  maxLength: 16,
  gapChar: ' ',
  showPrompt: false,
  keepPosition: false,
  value: ''
};

/**
 * @description
 * The module includes the blow points:
 *
 * 1. Automatic recognition some types of credit-card:
 *    Visa, MasterCard, American Express, Diners Club, Discover, JCB.
 * 2. Automatic formatting the card number,
 * 3. Default set 4 digits number as a group, the user can set the number'length of the group,
 * 4. Groups are separated by spaces.
 *
 * @class
 */
export default class InputBankCard extends React.Component {
  static displayName = 'InputBankCard';
  static propTypes = InputBankCardPropTypes;
  static defaultProps = InputBankCardProps;

  constructor(props) {
    super(props);

    this.preValue = '';
  }

  componentDidMount() {
    this.maskFormatter = this.getMaskFormatter();
    this.update();
  }

  componentWillReceiveProps(nextProps) {
    let needUpdate = false;

    if (
      nextProps.maxLength !== this.props.maxLength ||
      nextProps.group !== this.props.group ||
      nextProps.gapChar !== this.props.gapChar
    ) {
      const mask = this.getMask(nextProps.group, nextProps.maxLength, nextProps.gapChar);
      this.maskFormatter.mask = mask;
      needUpdate = true;
    }

    if (nextProps.showPrompt !== this.props.showPrompt) {
      this.maskFormatter.showPrompt = nextProps.showPrompt;
      needUpdate = true;
    }

    if (nextProps.keepPosition !== this.props.keepPosition) {
      this.maskFormatter.keepPosition = nextProps.keepPosition;
      needUpdate = true;
    }

    // istanbul ignore else
    if (needUpdate) {
      this.maskFormatter.template = this.maskFormatter.getTemplate();
      this.update(this.preValue);
    }
  }

  getMaskFormatter() {
    // istanbul ignore else
    if (!this.maskFormatter) {
      this.maskFormatter = this.createMaskFormatter();
    }

    return this.maskFormatter;
  }

  getMask(
    group = this.props.group,
    maxLength = this.props.maxLength,
    gapChar = this.props.gapChar
  ) {
    group = group || 0;

    if (!maxLength) {
      return [];
    }

    if (!group || !gapChar) {
      return fill(Array(maxLength), /\d/);
    }

    const average = maxLength / group;
    const averageInteger = parseInt(average, 10);

    const gapCount = average > averageInteger ? averageInteger : averageInteger - 1;

    return flatten(fill(Array(maxLength + gapCount), /\d/)
               .map((item, i) => (isInteger((i + 1) / (group + 1)) ? gapChar.split('') : item)));
  }

  update(value) {
    value = value === undefined ? this.props.value : value;
    const {
      value: _value
    } = this.maskFormatter.execute(value, this.preValue, value.length);

    this.preValue = _value;
    this.input.input.value = _value;
  }

  createMaskFormatter() {
    const { showPrompt, keepPosition } = this.props;
    const mask = this.getMask();

    return new MaskFormatter({ mask, showPrompt, keepPosition });
  }

  handleChange = (e) => {
    const input = e.target;
    const { onChange, onInput } = this.props;
    const {
      value, caretPosition
    } = this.maskFormatter.execute(input.value, this.preValue, input.selectionStart);

    this.preValue = value;
    input.value = value;

    // istanbul ignore if
    if (input.setSelectionRange) {
      input.setSelectionRange(caretPosition, caretPosition);
    }

    const pureValue = getPureNumber(value);

    onChange && onChange(e, value, pureValue);
    onInput && onInput(e, value, pureValue);
  }

  render() {
    const {
      className,
      ...rest
    } = this.props;

    // Delete the default attribute maxLength of the Input,
    // The maxLength of the InputBankCard is controlled by function `formatCardNumber`
    delete rest.value;
    delete rest.group;
    delete rest.gapChar;
    delete rest.maxLength;
    delete rest.showPrompt;
    delete rest.keepPosition;

    return (
      <div className={classNames('input-bank-card-base', className)}>
        <Input
          {...rest}
          className={className}
          type="text"
          ref={ref => (this.input = ref)}
          value={this.preValue}
          onInput={e => this.handleChange(e)}
        />
      </div>
    );
  }
}
