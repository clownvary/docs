"use strict";Object.defineProperty(exports, "__esModule", { value: true }); /** Hint
                                                                             * @enum {number}
                                                                             * @memberof InputBase
                                                                            */
var Hint = {
  UNKNOWN: 0,
  ESCAPED: 1,
  NO_EFFECT: 2,
  SIDE_EFFECT: 3,
  SUCCESS: 4,
  ASCII_EXPECTED: -1,
  LETTER_EXPECTED: -2,
  ALPHA_NUMERIC_EXPECTED: -3,
  DIGIT_EXPECTED: -4,
  SIGNED_DIGIT_EXPECTED: -5,
  INVALID_INPUT: -6,
  NONE_EDITABLE: -7,
  POSITION_OUT_OF_RANGE: -8,
  PROMPT_NOT_ALLOWED: -9,
  POSITON_EXCEEDED: -10 };exports.default =


Hint;module.exports = exports['default'];