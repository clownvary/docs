'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isRegExp = require('lodash/isRegExp');var _isRegExp2 = _interopRequireDefault(_isRegExp);
var _isPlainObject = require('lodash/isPlainObject');var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
var _has = require('lodash/has');var _has2 = _interopRequireDefault(_has);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var CaretPosition = {
  KEEP: 'keep',
  START: 'start',
  END: 'end' };



/**
                 *
                 * @module CaretUtils
                 * @description Utility functions to set or get text selection and caret position of Input element.
                 */


/**
                     * Get caret status of the selection
                     *
                     * @param   {Element}   element         target DOM element
                     * @return  {Object}    return
                     * @return  {String}    return.text     selected text
                     * @return  {Number}    return.start    start position of the selection
                     * @return  {Number}    return.end      end position of the selection
                     * @memberof CaretUtils
                     */
var getCaret = function getCaret(element) {
  var res = {
    text: '',
    start: 0,
    end: 0 };


  if (!element.value) {
    return res;
  }

  try {
    if (window.getSelection) {
      /* None IE */
      res.start = element.selectionStart;
      res.end = element.selectionEnd;
      res.text = element.value.slice(res.start, res.end);
    } else if (document.selection) {
      /* IE */
      element.focus();

      var range = document.selection.createRange();
      var range2 = document.body.createTextRange();

      res.text = range.text;

      try {
        range2.moveToElementText(element);
        range2.setEndPoint('StartToStart', range);
      } catch (e) {
        range2 = element.createTextRange();
        range2.setEndPoint('StartToStart', range);
      }

      res.start = element.value.length - range2.text.length;
      res.end = res.start + range.text.length;
    }
  } catch (e) {
    /* give up */
  }

  return res;
};

/**
    * set caret position
    *
    * @param   {Element}   element         target element
    * @param   {Object}    range           selection range
    * @param   {Number}    range.start     start position for the selection
    * @param   {Number}    range.end       end position for the selection
    * @param   {String}    caretMod        caret position
    * @memberof CaretUtils
    */
var setCaret = function setCaret(element, range) {var caretPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : CaretPosition.KEEP;
  if (caretPos === CaretPosition.START) {
    range.end = range.start;
  } else if (caretPos === CaretPosition.END) {
    range.start = range.end;
  }

  element.focus();
  try {
    if (document.selection) {
      var tr = element.createTextRange();

      range.start = element.value.substr(0, range.start).replace(/\r/g, '').length;
      range.end = element.value.substr(0, range.end).replace(/\r/g, '').length;

      tr.collapse(true);
      tr.moveStart('character', range.start);
      tr.moveEnd('character', range.end - range.start);
      tr.select();
    } else if (element.setSelectionRange) {
      element.setSelectionRange(range.start, range.end);
    }
  } catch (e) {
    // do nothing
  }
};

/**
    * Select the text with the specified range
    *
    * @param   {Element}   element        target element
    * @param   {Object}    range          selection range
    * @param   {Number}    range.start    start position for the selection
    * @param   {Number}    range.end      end position for the selection
    * @param   {String}    caretPos       set caret to position after the selecting
    * @memberof CaretUtils
    */
var select = function select(element, range, caretPos) {
  var val = element.value;
  var s = 0;
  var e = val.length;

  if ((0, _isPlainObject2.default)(range) && (0, _has2.default)(range, 'start') && (0, _has2.default)(range, 'end')) {
    s = range.start;
    e = range.end;
  } else if ((0, _isString2.default)(range)) {
    var pos = val.indexOf(range);
    if (pos > -1) {
      s = pos;
      e = pos + val.length;
    }
  } else if ((0, _isRegExp2.default)(range)) {
    var re = range.exec(val);
    if (re != null) {
      s = re.index;
      e = s + re[0].length;
    }
  }

  setCaret(element, { start: s, end: e }, caretPos);
};

/**
    * replace selected text
    *
    * @param   {Element}   element        target element
    * @param   {String}    text           replacement text
    * @param   {String}    caretPos       caret position
    * @memberof CaretUtils
    */
var replace = function replace(element, text, caretPos) {
  var cp = getCaret(element);
  var t = element.value;
  var range = { start: cp.start, end: cp.start + text.length };

  element.value = t.substr(0, cp.start) + text + t.substr(cp.end);

  setCaret(element, range, caretPos);
};

/**
    * insert before the selected text
    *
    * @param   {Element}   element         target element
    * @param   {String}    text            insertion text
    * @param   {String}    caretPos       caret position
    * @memberof CaretUtils
    */
var insertBefore = function insertBefore(element, text, caretPos) {
  var cp = getCaret(element);
  var t = element.value;
  var range = { start: cp.start + text.length, end: cp.end + text.length };
  element.value = t.substr(0, cp.start) + text + t.substr(cp.start);

  setCaret(element, range, caretPos);
};

/**
    * insert after the selected text
    *
    * @param   {Element}   element         target element
    * @param   {String}    text            insertion text
    * @param   {String}    caretPos       caret position
    * @memberof CaretUtils
    */
var insertAfter = function insertAfter(element, text, caretPos) {
  var cp = getCaret(element);
  var t = element.value;
  var range = { start: cp.start, end: cp.end };
  element.value = t.substr(0, cp.end) + text + t.substr(cp.end);

  setCaret(element, range, caretPos);
};exports.default =


{
  getCaret: getCaret,
  setCaret: setCaret,
  select: select,
  replace: replace,
  insertBefore: insertBefore,
  insertAfter: insertAfter,
  CaretPosition: CaretPosition };module.exports = exports['default'];