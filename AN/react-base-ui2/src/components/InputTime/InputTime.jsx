import { bool, string } from 'prop-types';
import { InputMoment, InputMomentProps } from '../InputMoment';
import { DefaultCSSPrefix } from '../../consts';

/** Default PropTypes of InputTime.
 * @memberof InputTime
 * @augments InputMoment
*/
const InputTimePropTypes = {
  /** Icon class name for the 2nd trigger button.
   * @type {boolean}
  */
  showTrigger2: bool,
  /** The format pattern to display the date value.
   * {@link InputMoment.InputMomentPropTypes.format}
   * @type {string}
  */
  format: string
};

const InputTimeProps = {
  ...InputMomentProps,
  showTrigger2: true,
  format: 't'
};

/** InputTime Component */
class InputTime extends InputMoment {
  static displayName = 'InputTime';
  static defaultProps = InputTimeProps;
  static propTypes = InputTimePropTypes;

  getContainerClassName() {
    return `${DefaultCSSPrefix}-input-time`;
  }
}

export {
  InputTimeProps,
  InputTime
};

/**
 * @react-component
 */
export default InputTime;
