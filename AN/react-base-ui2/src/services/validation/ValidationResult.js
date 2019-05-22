import isNil from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import mapValues from 'lodash/mapValues';
import buildErrorMessage from './utils/buildErrorMessage';

export const ErrorMessageMap = {};
export class ValidationResult {
  constructor(fieldName, value = '', errorCode = '', errorRule) {
    if (!fieldName) {
      throw new Error('Name should not be empty!');
    }

    this.fieldName = fieldName;
    this.value = value;
    this.errorCode = errorCode || (!isNil(errorRule) ? errorRule.name : 'unknown');
    this.messageDef = ErrorMessageMap[this.errorCode] || (!isNil(errorRule) ? errorRule.message : '');
    this.errorRule = errorRule;

    Object.defineProperties(this, {
      isValid: {
        get() {
          return isNil(this.errorRule);
        }
      }
    });

    Object.defineProperties(this, {
      message: {
        get() {
          if (!this.messageDef) return '';

          let result = '';
          if (isString(this.messageDef)) {
            result = buildErrorMessage(this.messageDef, this.fieldName, this.errorRule.param);
          } else if (isPlainObject(this.messageDef)) {
            result = mapValues(this.messageDef,
              s => (isString(s) ? buildErrorMessage(s, this.fieldName, this.errorRule.param) : s));
          }

          return result;
        }
      }
    });
  }
}

export default ValidationResult;
