
import { bool } from 'prop-types';
import { InputMoment, InputMomentProps } from '../InputMoment';
import { DefaultCSSPrefix } from '../../consts';

/** Default PropTypes of InputDate.
 * @memberof InputDate
 * @augments InputMoment
*/
const InputDatePropTypes = {
  /** Whether to show trigger icon.
   * @type {boolean}
  */
  showTrigger: bool,
  /** Whether to show clear icon.
   * @type {boolean}
  */
  showClear: bool
};

/** Default Props for InputDate */
export const InputDateProps = {
  ...InputMomentProps,
  showTrigger: true,
  showClear: true
};

/** UI component of InputDate.*/
class InputDate extends InputMoment {
  static displayName = 'InputDate';
  static defaultProps = InputDateProps;
  static propTypes = InputDatePropTypes;

  getContainerClassName() {
    return `${DefaultCSSPrefix}-input-date`;
  }
}

/**
 * @react-component
 */
export default InputDate;
