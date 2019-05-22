import { fromJS } from 'immutable';

export const isArray = Array.isArray;

export const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

export const isString = str => typeof str === 'string';

export function compareArr(a, b) {
  return a.every(val => b.indexOf(val) > -1);
}

export function isArrEqual(a, b) {
  if (a.length === b.length) {
    if (compareArr(a, b)) {
      return true;
    }
  }
  return false;
}

export function deepMerge(target, ...sources) {
  if (target && typeof target === 'object') {
    let targetImmutable = fromJS(target);

    sources.forEach((source) => {
      if (source && typeof source === 'object') {
        const sourceImmutable = fromJS(source);
        targetImmutable = targetImmutable.mergeDeep(sourceImmutable);
      }
    });

    return targetImmutable.toJS();
  }

  return null;
}

export function deleteCharactorInStr(str) {
  const reg = /[^\d]+/g;
  return str.replace(reg, '');
}

export function allowMoneyAcountOnly(str) {
  const reg = /[^\d.]+/g;
  const reg1 = /\.{2,}/g;
  return str.replace(reg, '').replace(reg1, '.');
}

/*
  description:
    1. Fix the bug ANE-50593
    2. Do nothing if the amount only contain number or decimal point
    3. Reset the amount to the right format when amount contains not
       only the number or decimal point.
*/
export function validateThenResetAmountOfPayment(e) {
  const input = e.target;
  const originVal = input.value;
  const handledVal = allowMoneyAcountOnly(originVal);
  if (handledVal !== originVal) {
    input.value = handledVal;
  }
}

// Javascript code to generate a UUID (RFC4122 version 4 compliant)
export function randomUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    /* eslint-disable */
    const r = (d + (Math.random() * 16)) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    /* eslint-enable */
  });
  return uuid;
}

export function deserializeJson(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

export function newWindow(url, windowName = 'ReceiptWindow') {
  window.open(url, windowName, 'menubar=yes,toolbar=yes,scrollbars=yes,resizable');
}

export function getUrlParam(param) {
  const reg = new RegExp(`(^|&)${param}=([^&]*)(&|$)`, 'i');
  const valueArray = window.location.search.replace(/\?/g, '&').substr(1).match(reg);
  if (valueArray != null) {
    return (valueArray[2]);
  }
  return null;
}

export function filterBy(obj, prefix) {
  return Object.keys(obj).filter(key => key.indexOf(prefix) === 0)
	.reduce((res, key) => ({ ...res, [key]: obj[key] }), {});
}

// Tag function for class template strings.
export function cls(template, ...expressions) {
  return template.reduce((accumulator, part, i) => accumulator + expressions[i - 1] + part)
  .replace(/\s+/g, ' ')
  .trim();
}

export function scrollTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

export const isContainNumberOnly = str => !!(`${str}`.match(/^\d+$/));
