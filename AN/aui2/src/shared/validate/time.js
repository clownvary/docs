import Globalize from 'react-base-ui/lib/services/i18n';
import DateTimeFormat from 'shared/utils/DateTimeFormat';

function is24HR() {
  return Globalize.ANTimeFormat.toLowerCase().indexOf('a') >= 0;
}

export function timeFormat(value) {
  return DateTimeFormat.formatTime(value);
}

export default function validTime(value, msg, ampmFieldVal = null) {
  if (value === '') return '';
  const is24hr = is24HR();
  const ampmField = ampmFieldVal;
  let cleanString = '';
  let suffix = '';
  let endDigits = false;
  for (let i = 0; i < value.length; i += 1) {
    const ch = value.charAt(i);
    if (ch === ' ') {
      endDigits = cleanString.length > 0;
    } else if (!endDigits && (ch === ':' || ((ch >= '0') && (ch <= '9')))) {
      cleanString += ch;
    } else {
      endDigits = true;
      suffix += ch;
    }
  }
  if (suffix.length > 0) {
    suffix = suffix.toLowerCase();
    if ('am'.indexOf(suffix) === 0) suffix = 'am';
    else if ('pm'.indexOf(suffix) === 0) suffix = 'pm';
    else {
      return `${msg} is invalid. The am/pm portion of the time is unrecognizable.`;
    }
  } else if (ampmField !== null) {
    if (ampmField[0].checked)suffix = ampmField[0].value;
    else if (ampmField[1].checked)suffix = ampmField[1].value;
  }
  let hours = 0;
  let minutes = 0;
  const colonIndex = cleanString.indexOf(':');
  if (colonIndex >= 0) {
    if (colonIndex > 0)hours = parseInt(cleanString.substring(0, colonIndex), 10);
    minutes = parseInt(cleanString.substring(colonIndex + 1, cleanString.length), 10);
    if (isNaN(hours) || isNaN(minutes)) {
      return `${msg} is invalid. Please use a value of the form 'HH:MM AM/PM'.`;
    }
  } else {
    const x = parseInt(cleanString, 10);
    if (isNaN(x)) {
      return `${msg} is invalid. Please use a value of the form 'HH:MM AM/PM'.`;
    }
    hours = Math.floor(x / 100);
    minutes = x - (hours * 100);
    if (hours === 0 && minutes < 24) {
      hours = minutes;
      minutes = 0;
    }
  }
  if (hours === 0 && !is24hr) {
    hours = 12;
    if (suffix.length === 0)suffix = 'am';
  }
  if (hours === 12 && suffix.length === 0) {
        // When use 12hr format, am/pm is necessary
        // When use 24hr format, 0 for 12am and 12 for 12pm
    if (!is24hr) {
      return `${msg} is invalid. Please specify am/pm.`;
    }
    suffix = 'pm';
  }
  if (hours > 12) {
    if (suffix.length > 0) {
      return `${msg} is invalid. Military time does not need am/pm.`;
    }
    hours -= 12;
    suffix = 'pm';
  }
  if (suffix.length === 0) suffix = 'am';
    // ANE-1112, should not convert any number bigger than 23 to 12:XX am for time input
  if (minutes > 59) {
    return `${msg} is invalid. Please use a value of the form 'HH:MM AM/PM'.`;
  }
    /** *******
     * Using 24hr time format
     * No matter which format user input,
     * will change it to 24hr format.
     * Here treat 12 as 12 pm, 0 as 12 am.
     **/
  if (is24hr && ampmField === null) {
    if (suffix === 'pm' && hours < 12) {
      hours += 12;
    }
    if (suffix === 'am' && hours === 12) {
      hours = 0;
    }
    suffix = '';
  }
  let s = `${hours.toString()}:`;

  if (minutes < 10)s += '0';
  s += minutes.toString();
  const d = new Date(`January 1, 1999 ${s} ${suffix}`);

  if (isNaN(d)) {
    return `${msg} is invalid. Please use a value of the form 'HH:MM AM/PM'.`;
  }

  if (ampmField) {
    if (ampmField[0].value.toLowerCase() === suffix) {
      if (!ampmField[0].checked) {
        ampmField[1].checked = false;
        ampmField[0].checked = true;
      }
    } else if (!ampmField[1].checked) {
      ampmField[0].checked = false;
      ampmField[1].checked = true;
    }
  }
  return '';
}
