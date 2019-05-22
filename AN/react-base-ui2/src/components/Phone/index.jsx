import React from 'react';
import {
  bool,
  string,
  func
} from 'prop-types';
import isFunction from 'lodash/isFunction';
import { DefaultCSSPrefix } from '../../consts';
import Input from '../Input';

/** Default PropTypes of Phone.
 * @memberof Phone
*/
const PhonePropTypes = {
  /** The phone number and the format is 'areaCode-mainCode-extendCode'.
   * @type {string}
  */
  value: string, // areaCode-mainCode-extendCode
  /** Whether the phone field is disabled.
   * @type {boolean}
  */
  disabled: bool,
  /** The callback function that is triggered when phone field changes.
   * @type {func}
  */
  onChange: func
};

/** UI component of Phone Number.*/
class Phone extends React.PureComponent {
  static displayName = 'Phone';
  static propTypes = PhonePropTypes;

  constructor(props) {
    super(props);
    const [areaCode, mainCode, extendCode] = props.value.split('-');
    this.state = {
      areaCode,
      mainCode,
      extendCode
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      const { areaCode, mainCode, extendCode } = this.getCodes(nextProps.value);

      this.setState({
        areaCode, mainCode, extendCode
      });

      this.areaCode.value = areaCode;
      this.mainCode.value = mainCode;
      this.extendCode.value = extendCode;
    }
  }

  onBlur = () => {
    setTimeout(() => {
      const activeElement = document.activeElement;
      const isStayPhone = [this.areaCode, this.mainCode, this.extendCode]
        .some(v => v && v.input === activeElement);
      if (!isStayPhone) {
        const { onChange } = this.props;
        let phone = `${this.areaCode.value}-${this.mainCode.value}-${this.extendCode.value}`;
        if (phone === '--') {
          phone = '';
        }
        isFunction(onChange) && onChange(phone);
      }
    }, 0);
  }

  getCodes = (codes) => {
    const result = {
      areaCode: '',
      mainCode: '',
      extendCode: ''
    };
    if (codes) {
      const splitCodes = `${codes}`.split('-');
      if (splitCodes.length > 0) result.areaCode = splitCodes[0];
      if (splitCodes.length > 1) result.mainCode = splitCodes[1];
      if (splitCodes.length > 2) result.extendCode = splitCodes[2];
    }

    return result;
  }

  render() {
    const { disabled, ariaLabel } = this.props;
    const { areaCode, mainCode, extendCode } = this.getCodes(this.props.value);
    return (
      <div className={`${DefaultCSSPrefix}-phone`}>
        <span className="leftParenthese">(</span>
        <Input
          ref={(c) => { this.areaCode = c; }}
          maxLength={3}
          className="areacode"
          ariaLabel={`${ariaLabel} area code current value is`}
          defaultValue={areaCode}
          formula={/\d/}
          disabled={disabled}
          onChange={(evt) => {
            this.setState({ areaCode: evt.target.value });
          }}
          onBlur={() => this.onBlur()}
        />

        <span className="rightParenthese">)</span>
        <Input
          ref={(c) => { this.mainCode = c; }}
          maxLength={7}
          className="mainCode"
          ariaLabel={`${ariaLabel} phone number current value is`}
          defaultValue={mainCode}
          formula={/\d/}
          disabled={disabled}
          onChange={(evt) => {
            this.setState({ mainCode: evt.target.value });
          }}
          onBlur={() => this.onBlur()}
        />
        <span className="ext">Ext</span>
        <Input
          ref={(c) => { this.extendCode = c; }}
          maxLength={6}
          className="extendCode"
          ariaLabel={`${ariaLabel} extension number current value is`}
          defaultValue={extendCode}
          formula={/\d/}
          disabled={disabled}
          onChange={(evt) => {
            this.setState({ extendCode: evt.target.value });
          }}
          onBlur={() => this.onBlur()}
        />
      </div>
    );
  }

}

export default Phone;
