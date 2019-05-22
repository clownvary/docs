'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _take = require('lodash/take');var _take2 = _interopRequireDefault(_take);
var _takeRight = require('lodash/takeRight');var _takeRight2 = _interopRequireDefault(_takeRight);
var _sortBy = require('lodash/sortBy');var _sortBy2 = _interopRequireDefault(_sortBy);
var _reverse = require('lodash/reverse');var _reverse2 = _interopRequireDefault(_reverse);
var _remove = require('lodash/remove');var _remove2 = _interopRequireDefault(_remove);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

CharDescriptor =
function CharDescriptor(char) {(0, _classCallCheck3.default)(this, CharDescriptor);
  this.char = char;
  this.isPicked = false; // Indicate this character has been picked out.
  this.isRejected = false; // Indicate this character cannot meet the mask rule.
};var


MaskFormatter = function () {
  function MaskFormatter(_ref) {var _ref$mask = _ref.mask,mask = _ref$mask === undefined ? [] : _ref$mask,_ref$promptChar = _ref.promptChar,promptChar = _ref$promptChar === undefined ? '_' : _ref$promptChar,_ref$showPrompt = _ref.showPrompt,showPrompt = _ref$showPrompt === undefined ? false : _ref$showPrompt,_ref$keepPosition = _ref.keepPosition,keepPosition = _ref$keepPosition === undefined ? false : _ref$keepPosition;(0, _classCallCheck3.default)(this, MaskFormatter);
    this.mask = mask;
    this.promptChar = promptChar;
    this.showPrompt = showPrompt;
    this.keepPosition = keepPosition;
    this.template = this.getTemplate();
  }(0, _createClass3.default)(MaskFormatter, [{ key: 'getTemplate', value: function getTemplate()

    {var
      mask = this.mask,promptChar = this.promptChar;
      return mask.map(function (char) {return char instanceof RegExp ? promptChar : char;}).join('') || '';
    } }, { key: 'createDescriptorList', value: function createDescriptorList(

    value) {var _this = this;var preValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';var caretPosition = arguments[2];var
      mask = this.mask,promptChar = this.promptChar,showPrompt = this.showPrompt,keepPosition = this.keepPosition,template = this.template;
      var distance = value.length - preValue.length;
      var caretPositionBeforeChange = caretPosition + (
      distance > 0 ? -distance : Math.abs(distance));
      var positionRange = (0, _sortBy2.default)([caretPosition, caretPositionBeforeChange]);

      if (keepPosition && showPrompt && value !== preValue) {
        value = preValue ? value : value + template;
        var charsList = value.split('');
        if (distance <= 0) {
          var backfillChars = (0, _take2.default)(charsList, caretPosition);
          value = this.template.split('').map(function (char, i) {
            if (i >= positionRange[1]) {
              return charsList[i - Math.abs(distance)];
            }
            if (char === promptChar) {
              var stopRemove = false;
              var backfillChar = (0, _remove2.default)(backfillChars, function (c) {
                if (!stopRemove && (mask[i].test(c) || c === promptChar)) {
                  stopRemove = true;
                  return true;
                }
                return false;
              })[0];
              return backfillChar !== undefined ? backfillChar : promptChar;
            }
            return char;
          }).join('');
        } else {
          var comparedCharsList = value.split('');
          var enteredChars = comparedCharsList.splice(positionRange[0], distance);

          value = [].concat(
          (0, _take2.default)(comparedCharsList, positionRange[0]).
          map(function (char, i) {
            if (mask[i].test && !mask[i].test(char)) {
              return promptChar;
            }
            return char;
          }),
          (0, _takeRight2.default)(comparedCharsList, comparedCharsList.length - positionRange[0]).
          map(function (char, i) {
            if (!mask[positionRange[0] + i].test) {
              return char;
            }

            var isPromptChar = enteredChars.length && char === promptChar;
            var isMeetMaskRule = mask[positionRange[0] + i].test(enteredChars[0]);

            // If the entered char cannot match the mask RegExp with corresponding index,
            // give up this char.
            if (isPromptChar && !isMeetMaskRule) {
              enteredChars.shift();
            }

            // If the entered char can meet the mask RegExp with corresponding index,
            // using the entered char to replace placehoder position('_')
            if (isPromptChar && isMeetMaskRule) {
              return enteredChars.shift();
            }

            // If char already is specific input char, clean entered chars.
            if (char !== promptChar) {
              enteredChars = [];
            }

            return char;
          })).
          join('');
        }
      }

      return value.split('').map(function (char) {return (
          new CharDescriptor(char));}).
      filter(function (charDescriptor, i) {
        var char = charDescriptor.char;

        if (char !== promptChar) {
          var shouldOffset = i >= positionRange[0] && preValue.length === mask.length;
          return char !== _this.template[shouldOffset ? i - distance : i];
        }
        return true;
      });
    } }, { key: 'execute', value: function execute()

    {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var preValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';var caretPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var
      mask = this.mask,promptChar = this.promptChar,showPrompt = this.showPrompt,template = this.template;
      var CharDescriptorList = this.createDescriptorList(value, preValue, caretPosition);

      var nextValue = template.split('').reduce(function (returnString, templateChar, i) {
        if (templateChar === promptChar) {
          var noMatchedChar = CharDescriptorList.every(function (charDescriptor) {var
            char = charDescriptor.char,isPicked = charDescriptor.isPicked,isRejected = charDescriptor.isRejected;

            if (isPicked || isRejected) {
              return true;
            }

            if (char === promptChar && showPrompt) {
              returnString += promptChar;
              charDescriptor.isPicked = true;
              return false;
            } else if (mask[i].test(char)) {
              returnString += char;
              charDescriptor.isPicked = true;
              return false;
            }

            charDescriptor.isRejected = true;

            return true;
          });

          if (showPrompt && noMatchedChar) {
            returnString += templateChar;
          }

          return returnString;
        }

        var isParseCharDescriptorDone =
        CharDescriptorList.every(
        function (charDescriptor) {return charDescriptor.isPicked || charDescriptor.isRejected;});


        if (isParseCharDescriptorDone && !showPrompt) {
          return returnString;
        }

        returnString += templateChar;

        return returnString;
      }, '');

      return {
        value: nextValue,
        caretPosition: this.getCaretPosition(value, preValue, nextValue, caretPosition) };

    } }, { key: 'getCaretPosition', value: function getCaretPosition()

    {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var preValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';var nextValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var caretPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;var
      mask = this.mask,promptChar = this.promptChar,showPrompt = this.showPrompt,template = this.template;

      var inputCharsList = value.split('');
      var nextCharsList = nextValue.split('');
      var distance = value.length - preValue.length;

      if (distance > 0 && nextValue === preValue) {
        return caretPosition - distance;
      }

      var leftChars = [];
      if (distance < 0 && caretPosition === value.length && !showPrompt) {
        leftChars = nextCharsList;
      } else {
        leftChars = (0, _take2.default)(inputCharsList, caretPosition).
        filter(function (char) {return nextValue.indexOf(char) !== -1;});
      }
      var targetChar = leftChars[leftChars.length - 1];

      var countForTargetChar = [].concat(
      leftChars.filter(function (char) {return char === targetChar;}),
      (0, _take2.default)(mask, template.indexOf(promptChar)).
      filter(
      function (char, i) {return char === targetChar && inputCharsList[i] !== char;})).

      length;

      var nextCaretPosition = 0;

      nextCharsList.every(function (char, i) {
        if (!countForTargetChar) {
          return false;
        }
        if (char === targetChar) {
          countForTargetChar -= 1;
          nextCaretPosition = i + 1;
        }
        return true;
      });

      if (distance > 0) {
        (0, _takeRight2.default)(mask, mask.length - nextCaretPosition).every(function (m, i) {
          if (m.test) {
            nextCaretPosition += i;
            return false;
          }
          return true;
        });
      }

      if (distance < 0) {
        (0, _reverse2.default)((0, _take2.default)(mask, nextCaretPosition)).every(function (m, i) {
          if (m.test) {
            nextCaretPosition -= i;
            return false;
          }
          return true;
        });
      }

      return nextCaretPosition;
    } }]);return MaskFormatter;}();exports.default = MaskFormatter;module.exports = exports['default'];