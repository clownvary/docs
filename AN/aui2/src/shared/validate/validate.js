import ssn from './ssn';
import phone from './phone';
import time from './time';
import date from './date';
import lowerCaseAlpha from './lowerCaseAlpha';
import upperCaseAlpha from './upperCaseAlpha';
import postalCode from './postalCode';


const errMsgs = {
  required: '%s is required.',
  matches: '%s does not match %s.',
  default: '%s is still set to default, please change.',
  valid_email: '%s must contain a valid email address.',
  valid_emails: '%s must contain all valid email addresses.',
  min_length: '%s  must be at least %s characters in length.',
  max_length: '%s must not exceed %s characters in length.',
  exact_length: '%s must be exactly %s characters in length.',
  greater_than: '%s must contain a number greater than %s.',
  less_than: '%s must contain a number less than %s.',
  alpha: '%s must only contain alphabetical characters.',
  alpha_upperCase: '%s must only contain alpha-upperCase characters.',
  alpha_lowerCase: '%s must only contain alpha-lowerCase characters.',
  alpha_numeric: '%s must only contain alpha-numeric characters.',
  alpha_dash: '%s must only contain alpha-numeric characters, underscores, and dashes.',
  numeric: '%s must contain only numbers.',
  integer: '%s must contain an integer.',
  decimal: '%s must contain a decimal number.',
  is_natural: '%s must contain only positive numbers.',
  is_natural_no_zero: '%s must contain a number greater than zero.',
  valid_ip: '%s must contain a valid IP.',
  valid_base64: '%s must contain a base64 string.',
  valid_url: '%s must contain a valid URL.',
  greater_than_date: '%s must contain a more recent date than %s.',
  less_than_date: '%s must contain an older date than %s.',
  greater_than_or_equal_date: '%s must contain a date that\'s at least as recent as %s.',
  less_than_or_equal_date: '%s must contain a date that\'s %s or older.',
  phone: '%s must be a phone.',
  time: '%s must be a time.',
  ssn: '%s must be a ssn.'
};

// const ruleRegex = /^(.+?)\[(.+)\]$/;
const numericRegex = /^[0-9]+$/;
const integerRegex = /^-?[0-9]+$/;
const decimalRegex = /^-?[0-9]*.?[0-9]+$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const alphaRegex = /^[a-z]+$/i;
const alphaUpperCaseRegex = /^[A-Z]+$/;
const alphaLowerCaseRegex = /^[a-z]+$/;
const alphaNumericRegex = /^[a-z0-9]+$/i;
const alphaDashRegex = /^[a-z0-9_-]+$/i;
const naturalRegex = /^[0-9]+$/i;
const naturalNoZeroRegex = /^[1-9][0-9]*$/i;
const ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2}).){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i;
const base64Regex = /[^a-zA-Z0-9+=]/i;
// const numericDashRegex = /^[\d\-\s]+$/;
const urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?$/;
const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;
// const phoneRegex = /^\d{3}-\d{7}-\d{0,6}$/;

function resolveData(data) {
  let selected = '';
  if (!data) return selected;
  const length = data.length;
  const list = new Array(length);
  for (let i = 0; i < length; i += 1) {
    list[i] = { text: data[i].answer, value: `${data[i].answer}` };
    if (data[i].selected) {
      selected = `${data[i].answer}`;
    }
  }
  return selected;
}

function getValueOfDuration(value) {
  const { hours, minutes, seconds } = value;
  return `${resolveData(hours)}:${resolveData(minutes)}:${resolveData(seconds)}`;
}

/**
 * function getValidDate: helper function to convert a string date to a Date object
 * @param date (String) must be in format yyyy-mm-dd or use keyword: today
 * @returns {Date} returns false if invalid
 */
function getValidDate(dateVal) {
  let value = dateVal;
  if (Object.prototype.toString.call(value) !== '[object String]') {
    value = value.toLocaleDateString();
  }

  if (!value.match('today') && !value.match(dateRegex)) {
    return false;
  }

  const validDate = new Date();
  let validDateArray;

  if (!value.match('today')) {
    validDateArray = value.split('/');
    validDate.setFullYear(validDateArray[0]);
    validDate.setMonth(validDateArray[1] - 1);
    validDate.setDate(validDateArray[2]);
  }
  return validDate;
}

const validation = {
  required(value) {
    if (value && value.hours && value.minutes && value.seconds) {
      const val = getValueOfDuration(value);
      return val !== '00:00:00';
    } else if (Object.prototype.toString.call(value) === '[object Array]') {
      return value.length > 0;
    } else if (value.length > 0) {
      return value.trim().length;
    }

    return !!value;
  },


  valid_email(value) {
    if (!value) return true;
    return emailRegex.test(value);
  },


  min_length(value, length) {
    if (!value) return true;
    if (!numericRegex.test(length)) {
      return false;
    }

    return (value.length >= parseInt(length, 10));
  },

  max_length(value, length) {
    if (!value) return true;
    if (!numericRegex.test(length)) {
      return false;
    }

    return (value.length <= parseInt(length, 10));
  },

  exact_length(value, length) {
    if (!numericRegex.test(length)) {
      return false;
    }

    return (value.length === parseInt(length, 10));
  },

  greater_than(value, param) {
    if (!decimalRegex.test(value)) {
      return false;
    }

    return (parseFloat(value) > parseFloat(param));
  },

  less_than(value, param) {
    if (!decimalRegex.test(value)) {
      return false;
    }

    return (parseFloat(value) < parseFloat(param));
  },

  alpha(value) {
    if (!value) return true;
    return (alphaRegex.test(value));
  },

  alpha_upperCase(value) {
    if (!value) return true;
    return (alphaUpperCaseRegex.test(value));
  },

  alpha_lowerCase(value) {
    if (!value) return true;
    return (alphaLowerCaseRegex.test(value));
  },

  alpha_numeric(value) {
    if (!value) return true;
    return (alphaNumericRegex.test(value));
  },

  alpha_dash(value) {
    return (alphaDashRegex.test(value));
  },

  numeric(value) {
    if (!value) return true;
    return (numericRegex.test(value));
  },

  integer(value) {
    return (integerRegex.test(value));
  },

  decimal(value) {
    return (decimalRegex.test(value));
  },

  is_natural(value) {
    return (naturalRegex.test(value));
  },

  is_natural_no_zero(value) {
    return (naturalNoZeroRegex.test(value));
  },

  valid_ip(value) {
    return (ipRegex.test(value));
  },

  valid_base64(value) {
    return (base64Regex.test(value));
  },

  valid_url(value) {
    return (urlRegex.test(value));
  },

  greater_than_date(field, dateVal) {
    const enteredDate = getValidDate(field);
    const validDate = getValidDate(dateVal);

    if (!validDate || !enteredDate) {
      return false;
    }

    return enteredDate > validDate;
  },

  less_than_date(field, dateVal) {
    const enteredDate = getValidDate(field);
    const validDate = getValidDate(dateVal);

    if (!validDate || !enteredDate) {
      return false;
    }

    return enteredDate < validDate;
  },

  greater_than_or_equal_date(field, dateVal) {
    const enteredDate = getValidDate(field);
    const validDate = getValidDate(dateVal);

    if (!validDate || !enteredDate) {
      return false;
    }

    return enteredDate >= validDate;
  },

  less_than_or_equal_date(field, dateVal) {
    const enteredDate = getValidDate(field);
    const validDate = getValidDate(dateVal);

    if (!validDate || !enteredDate) {
      return false;
    }

    return enteredDate <= validDate;
  },

  phone(value, msg) {
    if (!value || value === '--') return false;
    const nums = value.split('-');
    return phone(nums[0], nums[1], nums[2], msg);
  },

  ssn(value, msg) {
    if (!value || value === '') return false;
    return ssn(value, msg);
  },

  time(value, msg) {
    if (!value || value === '') return false;
    return time(value, msg);
  },

  date(value, msg) {
    if (!value || value === '') return false;
    return date(value, msg);
  },

  lowerCaseAlpha(value, msg) {
    if (!value || value === '') return false;
    return lowerCaseAlpha(value, msg);
  },

  upperCaseAlpha(value, msg) {
    if (!value || value === '') return false;
    return upperCaseAlpha(value, msg);
  },

  postalCode(value, msg) {
    if (!value || value === '') return false;
    return postalCode(value, msg);
  }
};

const moreParamsRules = ['min_length', 'max_length', 'exact_length', 'less_than', 'greater_than',
  'greater_than_date', 'less_than_date', 'greater_than_or_equal_date', 'less_than_or_equal_date'];

function execRules(rule, filed, value) {
  if (filed.params && filed.params[rule]) {
    return !validation[rule](value, filed.params[rule]);
  }

  if (['ssn', 'time', 'phone', 'date', 'upperCaseAlpha', 'lowerCaseAlpha', 'postalCode'].indexOf(rule) > -1) {
    const result = validation[rule](value, `"${filed.msg}" answer`);
    if (Object.prototype.toString.call(result) === '[object String]') {
      errMsgs[rule] = result;
      return true;
    }
    return false;
  }

  return !validation[rule](value);
}

function getError(filed, value) {
  let rule;
  let error = '';
  if (Object.prototype.toString.call(filed.rules) === '[object String]') {
    if (execRules(filed.rules, filed, value)) {
      error = errMsgs[filed.rules].replace('%s', `"${filed.msg}" answer`);
    }
  } else {
    for (let j = 0, len = filed.rules.length; j < len; j += 1) {
      rule = filed.rules[j];
      if (moreParamsRules.indexOf(rule) > -1) {
        if (execRules(rule, filed, value)) {
          error = errMsgs[rule].replace('%s', `"${filed.msg}" answer`);
          break;
        }
      } else if (execRules(rule, filed, value)) {
        error = errMsgs[rule].replace('%s', `"${filed.msg}" answer`);
        break;
      }
    }
  }

  if (filed.params && filed.params[rule]) {
    error = error.replace('%s', filed.params[rule]);
  }

  return error;
}

function validate(fileds = [], values) {
  let filed;
  const errors = {};

  for (let i = 0, len = fileds.length; i < len; i += 1) {
    filed = fileds[i];
    errors[filed.name] = getError(filed, values[filed.name]);
  }

  return errors;
}

export function validateItem(filed, value) {
  return getError(filed, value);
}

export default validate;
