import { Globalize } from '../../services/i18n';
import * as CharType from './consts/CharType';
import * as charValidator from '../../utils/charValidator';
import CharDescriptor from './CharDescriptor';
import InputResult from '../InputBase/InputResult';
import ITextProvider from '../InputBase/ITextProvider';
import * as Hint from '../InputBase/consts/Hint';

/* eslint no-continue: 0 */
/* eslint default-case: 0 */
/* eslint no-bitwise: 0 */
/* eslint no-throw-literal: 0 */

class MaskedTextProvider extends ITextProvider {

  constructor(props) {
    super(props);

    const {
      mask = '',
      promptChar = '_',
      passwordChar = '*',
      allowPromptAsInput = false,
      asciiOnly = false,
      currency = 'USD'
    } = props;

    this.mask = mask;
    this.promptChar = promptChar;
    this.passwordChar = passwordChar;
    this.allowPromptAsInput = allowPromptAsInput;
    this.asciiOnly = asciiOnly;
    this.descriptors = [];
    this.noMask = (!this.mask || this.mask.length <= 0);
    this.testString = '';
    this.assignedCharCount = 0;
    this.setCurrency(currency);
    this.build();
  }

  setCurrency(currency = 'USD') {
    this.currency = currency;
    /* istanbul ignore next */
    this.currencySymbol = Globalize.getCurrencySymbol(this.currency) || '$';
  }

  insertAt(input, pos, rh) {
    if (input === undefined) { throw 'InsertAt: input'; }

    rh = rh || new InputResult();
    if (input.length === 0) {
      rh.hint = Hint.NO_EFFECT;
      rh.testPosition = pos;
      return true;
    }

    if (pos < 0 || pos >= this.testString.length) {
      rh.hint = Hint.POSITION_OUT_OF_RANGE;
      rh.testPosition = pos;
      return false;
    }

    if (this.noMask) {
      this.testString = this.testString.substring(0, pos) +
        input + this.testString.substring(pos, this.testString.length);

      rh.hint = Hint.SUCCESS;
      rh.testPosition = (pos + input.length) - 1;
      return true;
    }

    return this.internalInsertAt(input, pos, rh, false);
  }

  remove(start, end, rh) {
    end = end || start;
    rh = rh || new InputResult();

    if (end >= this.testString.length) {
      rh.testPosition = end;
      rh.hint = Hint.POSITION_OUT_OF_RANGE;
      return false;
    }

    if ((start >= 0) && (start <= end)) {
      return this.internalRemoveAt(start, end, rh, false);
    }

    rh.testPosition = start;
    rh.hint = Hint.POSITION_OUT_OF_RANGE;
    return false;
  }

  increment() {
    return !this.noMask;
  }

  decrement() {
    return !this.noMask;
  }

  setValue() {
    return false;
  }

  getValue() {
    return null;
  }

  setText(text) {
    const rh = new InputResult();
    if (!text || !text.length) {
      this.clear(rh);
      return true;
    }
    if (this.noMask) {
      this.testString = text;
      return true;
    }
    if (!this.testSetString(text, 0, rh)) {
      return false;
    }
    const n = this.findAssignedEditPositionFrom(1, true);
    if (n !== -1) {
      this.resetString(n, this.testString.length - 1);
    }
    return true;
  }

  getText(options = {
    includePrompt: false,
    includeLiterals: false,
    passwordMode: false
  },
    start = 0,
    len = this.testString.length
  ) {
    start = Math.max(0, start);
    if (start >= this.testString.length) return '';
    len = Math.max(0, len);
    len = Math.min(this.testString.length - start, len);
    if (len === 0) return '';
    const end = start + len;

    let s = '';
    if (this.noMask) {
      if (options.passwordMode) {
        for (let i = 0; i < this.testString.length; i += 1) {
          s += this.passwordChar;
        }
        return s.substring(start, end);
      }
      return this.testString.substring(start, end);
    }

    if (
      !options.passwordMode &&
      options.includePrompt &&
      options.includeLiterals
    ) {
      return this.testString.substring(start, end);
    }

    for (let i = start; i < end; i += 1) {
      const ch = this.testString.charAt(i);
      const cd = this.descriptors[i];
      switch (cd.charType) {
        case CharType.OPTIONAL:
        case CharType.REQUIRED:
          if (!cd.isAssigned) {
            break;
          }
          s += options.passwordMode ? this.passwordChar : ch;
          continue;
        case (CharType.REQUIRED | CharType.OPTIONAL):
          s += ch;
          continue;
        case CharType.SEPARATOR:
        case CharType.LITERAL:
          if (options.includeLiterals) {
            s += ch;
          }
          continue;
        default:
          s += ch;
          continue;
      }
      /* istanbul ignore if */
      if (options.includePrompt) {
        s += ch;
        continue;
      }
      s += ' ';
      continue;
    }

    return s;
  }

  build() {
    if (this.noMask) { return; }

    this.testString = '';
    this.assignedCharCount = 0;
    this.descriptors = [];
    let caseType = '';
    let escape = false;
    let charType = CharType.LITERAL;
    let fieldText = '';
    const culture = Globalize.culture;

    for (let i = 0; i < this.mask.length; i += 1) {
      let needDesc = false;
      const ch = this.mask.charAt(i);
      const m = ch;
      if (escape) {
        escape = false;
        needDesc = true;
      }
      if (!needDesc) {
        switch (m) {
          case '#':
          case '?':
          case 'a':
          case '9':
          case 'l':
            fieldText = this.promptChar;
            charType = CharType.OPTIONAL;
            needDesc = true;
            break;
          case 'A':
          case '0':
          case 'L':
            fieldText = this.promptChar;
            charType = CharType.REQUIRED;
            needDesc = true;
            break;
          case '$':
            fieldText = this.currencySymbol;
            charType = CharType.SEPARATOR;
            needDesc = true;
            break;
          case ',':
            fieldText = culture.numberFormat[','];
            charType = CharType.SEPARATOR;
            needDesc = true;
            break;
          case '.':
            fieldText = culture.numberFormat['.'];
            charType = CharType.SEPARATOR;
            needDesc = true;
            break;
          case '/':
            fieldText = culture.calendars.standard['/'];
            charType = CharType.SEPARATOR;
            needDesc = true;
            break;
          case ':':
            fieldText = culture.calendars.standard[':'];
            charType = CharType.SEPARATOR;
            needDesc = true;
            break;
          case '<':
            caseType = 'lower';
            continue;
          case '>':
            caseType = 'upper';
            continue;
          case '|':
            caseType = '';
            continue;
          case '\\':
            escape = true;
            charType = CharType.LITERAL;
            continue;
          default:
            fieldText = ch;
            charType = CharType.LITERAL;
            needDesc = true;
            break;
        }
      }
      /* istanbul ignore else */
      if (needDesc) {
        const cd = new CharDescriptor(i, charType);
        if (this.isEditDesc(cd)) {
          cd.caseType = caseType;
        }
        for (let j = 0; j < fieldText.length; j += 1) {
          const c = fieldText.charAt(j);
          this.testString = this.testString + c;
          this.descriptors.push(cd);
        }
      }
    }
  }

  setPromptChar(promptChar) {
    if (this.noMask) { return; }

    promptChar = promptChar || ' ';
    this.promptChar = promptChar;
    this.descriptors.forEach((cd, i) => {
      if (
        (cd.charType === CharType.OPTIONAL ||
          cd.charType === CharType.REQUIRED) &&
        !cd.isAssigned
      ) {
        this.testString = charValidator.setChar(this.testString, promptChar, i);
      }
    });
  }

  isEditDesc(desc) {
    if (this.noMask || !desc) { return true; }
    return desc.charType === CharType.REQUIRED || desc.charType === CharType.OPTIONAL;
  }

  isEditPos(pos) {
    if (this.noMask) { return true; }
    if ((pos < 0) || (pos >= this.testString.length)) { return false; }

    const cd = this.descriptors[pos];
    return this.isEditDesc(cd);
  }

  isLiteralDesc(desc) {
    if (!desc) { return false; }
    return desc.charType === CharType.LITERAL || desc.charType === CharType.SEPARATOR;
  }

  isLiteralChar(input, pos, desc) {
    pos = Math.max(0, pos);
    desc = desc || this.descriptors[pos];
    if (this.isLiteralDesc(desc)) {
      return (input === this.testString.charAt(pos));
    }
    return false;
  }

  updatePromptChar() {
    if (this.noMask) { return; }

    let i;
    for (i = 0; i < this.descriptors.length; i += 1) {
      const cd = this.descriptors[i];
      if (cd.charType === CharType.OPTIONAL || cd.charType === CharType.REQUIRED) {
        if (!cd.isAssigned) {
          this.testString = charValidator.setChar(this.testString, this.promptChar, i);
        }
      }
    }
  }

  resetChar(pos) {
    const cd = this.descriptors[pos];
    if (this.isEditPos(pos) && cd.isAssigned) {
      cd.isAssigned = false;
      this.testString = charValidator.setChar(this.testString, this.promptChar, pos);
      this.assignedCharCount -= 1;
    }
  }

  getAdjustedPos(pos) {
    if (this.noMask) {
      if (pos >= this.testString.length) {
        pos = this.testString.length - 1;
      }
    } else if (pos >= this.descriptors.length) {
      pos -= 1;
    }

    return Math.max(0, pos);
  }

  findEditPositionFrom(pos, direction = true) {
    const start = direction ? pos : 0;
    const end = direction ? this.testString.length - 1 : pos;
    return this.findEditPosition(start, end, direction);
  }

  findEditPosition(start, end, direction) {
    return this.findPosition(start, end, direction, CharType.REQUIRED | CharType.OPTIONAL);
  }

  findPosition(start, end, direction, charType, assignedOnly = false) {
    start = Math.max(0, start);
    end = Math.min(end, this.testString.length - 1);

    while (start <= end) {
      const pos = (direction) ? start : end;
      const cd = this.descriptors[pos];
      if (!assignedOnly || (assignedOnly && cd.isAssigned)) {
        if ((cd.charType & charType) === cd.charType) {
          return pos;
        }
      }

      if (direction) {
        start += 1;
      } else {
        end -= 1;
      }
    }

    return -1;
  }

  findAssignedEditPositionFrom(pos, direction) {
    const start = direction ? pos : 0;
    const end = direction ? this.testString.length - 1 : pos;
    return this.findAssignedEditPosition(start, end, direction);
  }

  findAssignedEditPosition(start, end, direction) {
    if (this.assignedCharCount === 0) { return -1; }

    return this.findPosition(start, end, direction, CharType.REQUIRED | CharType.OPTIONAL, true);
  }

  setChar(input, pos, desc) {
    pos = pos < 0 ? 0 : pos;
    if (!desc) {
      desc = this.descriptors[pos];
    }
    if (this.isLiteralChar(input, pos, desc)) {
      this.resetChar(pos);
    } else {
      if (charValidator.isLetter(input)) {
        if (charValidator.isUpper(input)) {
          if (desc.caseType === 'lower') {
            input = input.toLowerCase();
          }
        } else if (desc.caseType === 'upper') {
          input = input.toUpperCase();
        }
      }
      this.testString = charValidator.setChar(this.testString, input, pos);
      if (!desc.isAssigned) {
        desc.isAssigned = true;
        this.assignedCharCount += 1;
      }
    }
  }

  internalInsertAt(input, pos, rh, testOnly) {
    if (!this._testString(input, pos, rh)) {
      return false;
    }

    if (!testOnly) {
      const nextPos = this.setString(input, rh.testPosition);
      rh.testPosition = this.findEditPositionFrom(nextPos);
    }
    return true;
  }

  clear(rh) {
    if (this.noMask) {
      this.testString = '';
      rh.hint = Hint.SUCCESS;
      return;
    }

    if (this.assignedCharCount === 0) {
      rh.hint = Hint.NO_EFFECT;
    } else {
      rh.hint = Hint.SUCCESS;
      for (let i = 0; i < this.testString.length; i += 1) {
        this.resetChar(i);
      }
    }
  }

  testInputChar(c, pos, rh) {
    if (!charValidator.isPrintableChar(c)) {
      rh.hint = Hint.INVALID_INPUT;
      return false;
    }
    const cd = this.descriptors[pos];
    if (!cd) { return false; }

    if (this.isLiteralDesc(cd)) {
      if (c === this.testString.charAt(pos)) {
        rh.hint = Hint.ESCAPED;
        return true;
      }
      rh.hint = Hint.NONE_EDITABLE;
      return false;
    }

    if (c === this.promptChar && !this.allowPromptAsInput) {
      rh.hint = Hint.PROMPT_NOT_ALLOWED;
      return false;
    }

    switch (this.mask.charAt(cd.maskPosition)) {
      case 'L':
        if (this.asciiOnly && !charValidator.isAsciiLetter(c)) {
          rh.hint = Hint.ASCII_EXPECTED;
          return false;
        }

        if (!charValidator.isLetter(c)) {
          rh.hint = Hint.LETTER_EXPECTED;
          return false;
        }
        break;

      case 'a':
        if (this.asciiOnly && !charValidator.isAciiAlphanumeric(c)) {
          rh.hint = Hint.ASCII_EXPECTED;
          return false;
        }

        if (!charValidator.isAlphanumeric(c) && (c !== ' ')) {
          rh.hint = Hint.ALPHA_NUMERIC_EXPECTED;
          return false;
        }

        break;

      case 'A':
        if (!charValidator.isAlphanumeric(c)) {
          rh.hint = Hint.ALPHA_NUMERIC_EXPECTED;
          return false;
        }
        /* istanbul ignore else */
        if (charValidator.isAciiAlphanumeric(c) || !this.asciiOnly) {
          break;
        }
        rh.hint = Hint.ASCII_EXPECTED;
        return false;

      case '?':
        if (!charValidator.isLetter(c) && (c !== ' ')) {
          rh.hint = Hint.LETTER_EXPECTED;
          return false;
        }
        if (!this.asciiOnly || charValidator.isAsciiLetter(c)) {
          break;
        }
        rh.hint = Hint.ASCII_EXPECTED;
        return false;

      case '#':
        if ((!charValidator.isDigit(c) && (c !== '-')) && ((c !== '+') && (c !== ' '))) {
          rh.hint = Hint.DIGIT_EXPECTED;
          return false;
        }
        break;

      case '0':
        if (!charValidator.isDigit(c)) {
          rh.hint = Hint.DIGIT_EXPECTED;
          return false;
        }
        break;

      case '9':
        if (!charValidator.isDigit(c) && (c !== ' ')) {
          rh.hint = Hint.DIGIT_EXPECTED;
          return false;
        }
        break;
    }
    if ((c === this.testString.charAt(pos)) && cd.isAssigned) {
      rh.hint = Hint.NO_EFFECT;
    } else {
      rh.hint = Hint.SUCCESS;
    }
    return true;
  }

  _testString(input, pos, rh) {
    rh.hint = Hint.UNKNOWN;
    rh.testPosition = pos;
    if (input && input.length) {
      for (let i = 0; i < input.length; i += 1) {
        const ch = input.charAt(i);
        if (pos >= this.testString.length) {
          rh.hint = Hint.POSITON_EXCEEDED;
          return (i !== 0);
        }

        if (!this.isLiteralChar(ch, pos)) {
          pos = this.findEditPositionFrom(pos, true);
          if (pos === -1) {
            rh.testPosition = this.testString.length;
            rh.hint = Hint.POSITON_EXCEEDED;
            return false;
          }
        }

        if (!this.testInputChar(ch, pos, rh)) {
          return false;
        }

        if (pos === this.testString.length) {
          break;
        }
        pos += 1;
      }
    }
    return true;
  }

  resetString(start, end) {
    if (this.noMask) {
      this.testString = '';
      return;
    }
    start = this.findAssignedEditPositionFrom(start, true);
    if (start !== -1) {
      end = this.findAssignedEditPositionFrom(end, false);
      while (start <= end) {
        start = this.findAssignedEditPositionFrom(start, true);
        this.resetChar(start);
        start += 1;
      }
    }
  }

  setString(input, pos) {
    for (let i = 0; i < input.length; i += 1) {
      const ch = input.charAt(i);
      if (!this.isLiteralChar(ch, pos)) {
        pos = this.findEditPositionFrom(pos, true);
      }

      if (pos < 0 || pos >= this.testString.length) { return this.testString.length; }
      this.setChar(ch, pos);
      pos += 1;
    }

    return pos;
  }

  testSetString(input, pos, rh) {
    if (input.length > this.testString.length) {
      input = input.substring(0, this.testString.length);
    }

    if (this._testString(input, pos, rh)) {
      this.setString(input, pos);
      return true;
    }
    return false;
  }

  internalRemoveAt(start, end, rh) {
    if (this.noMask) {
      try {
        this.testString = this.testString.substring(0, start) +
          this.testString.substring(end + 1, this.testString.length);
        rh.testPosition = start;
      } catch (e) {
        // do nothing
      }
      return true;
    }

    const exist = this.findAssignedEditPosition(start, end, true) !== -1;
    if (!exist) {
      rh.hint = Hint.NO_EFFECT;
      rh.testPosition = start;
      return true;
    }

    rh.testPosition = start;
    rh.hint = Hint.SUCCESS;

    if (start <= end) {
      this.resetString(start, end);
    }
    return true;
  }
}

export default MaskedTextProvider;
