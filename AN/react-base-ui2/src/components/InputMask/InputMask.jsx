import InputBase, { defaultProps as baseProps } from '../InputBase';
import MaskTextProvider from './MaskTextProvider';
import { DefaultCSSPrefix } from '../../consts';


/**
 * Default Props for InputMask
 * @name InputMaskProps
 * @const
 */
const InputMaskProps = {
  /**
   * Determines the input mask to use at run time.
   * Mask must be a string composed of one or more of the masking elements.
   *
   * The supported mask characters are:
   *
   * - 0= Digit
   * - 9= Digit or space
   * - #= Digit, sign, or space
   * - L= Letter
   * - l= Letter or space
   * - A= Alphanumeric
   * - a= Alphanumeric or space
   * - .= Localized decimal point
   * - ,= Localized thousand separator
   * - := Localized time separator
   * - /= Localized date separator
   * - $= Localized currency symbol
   * - <= Converts characters that follow to lowercase
   * - \>= Converts characters that follow to uppercase
   * - |= Disables case conversion
   * - \= scapes any character, turning it into a literal
   *
   */
  mask: '',
  /**
   * Determines the character used to represent the absence of user input.
   */
  promptChar: '_',
  /**
   * Determines the character to be substituted for the actual input characters in password mode.
   */
  passwordChar: '*',
  /**
   * Determines whether password char is used.
   */
  passwordMode: false,
  /**
   * Indicates whether the prompt characters in the input mask are hidden
   * when the input loses focus.
   */
  hidePromptOnLeave: false,
  /**
   * Indicates whether promptChar can be entered as valid data by the user.
   */
  allowPromptAsInput: false
};

const defaultProps = { ...baseProps, ...InputMaskProps };

/**
 * @description
 * InputMask component allows you to validate and format user input
 * while typing, this will prevent invalid data been input.
 *
 * To use the InputMask component, set the mask property to a string that specifies
 * the valid character classes for each field.
 *
 * @class
 */
export class InputMask extends InputBase {

  static displayName = 'InputMask';
  /**
   * Default Props of InputMask.
   *
   * Please see InputMaskProps for details.
   *
   * @see InputMaskProps
   */
  static defaultProps = defaultProps;

  createTextProvider() {
    return new MaskTextProvider(this.props);
  }

  getProviderOptions() {
    const { hidePromptOnLeave, passwordMode } = this.props;
    const includePrompt = hidePromptOnLeave ? this.isFocused() : true;
    const includeLiterals = true;
    return {
      includePrompt,
      includeLiterals,
      passwordMode
    };
  }

  getContainerClassName() {
    return `${DefaultCSSPrefix}-input-mask`;
  }

  onInputFocus(e) {
    if (this.textProvider && this.allowEdit()) {
      const { hidePromptOnLeave } = this.props;
      if (hidePromptOnLeave) {
        this.updateText({ start: 0, end: 0 });
      }
    }

    super.onInputFocus(e);
  }

  onInputBlur(e) {
    if (this.textProvider && this.allowEdit()) {
      const { hidePromptOnLeave } = this.props;
      if (hidePromptOnLeave) {
        setTimeout(() => this.updateText(), 1);
      }
    }

    super.onInputBlur(e);
  }

  getTextWithPrompts() {
    return !this.textProvider ? this.input.value :
      this.textProvider.getText({
        includePrompt: true,
        includeLiterals: false
      });
  }

  getTextWithLiterals() {
    return !this.textProvider ? this.input.value :
      this.textProvider.getText({
        includePrompt: false,
        includeLiterals: true
      });
  }

  getTextWithPromptAndLiterals() {
    return !this.textProvider ? this.input.value :
      this.textProvider.getText({
        includePrompt: true,
        includeLiterals: true
      });
  }
}

/**
 * @react-component
 */
export default InputMask;
