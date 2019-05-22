import { InputBase, InputBaseProps } from '../InputBase';
/* eslint-disable  react/no-unused-prop-types */
/* eslint-disable  react/forbid-prop-types */
/* eslint-disable  no-nested-ternary */
/**
 *  Default Props of ComboBox
 * @name ComboBoxProps
 * @const
 */
export const ComboBoxProps = {
  ...InputBaseProps,
  showTrigger: true
};

/**
  * ComboBox Component
  * @react-component
  */
class ComboBox extends InputBase {
  static displayName = 'ComboBox';
  static defaultProps = ComboBoxProps;
}
export default ComboBox;
