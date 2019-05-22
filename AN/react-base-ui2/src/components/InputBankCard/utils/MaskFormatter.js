import take from 'lodash/take';
import takeRight from 'lodash/takeRight';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import remove from 'lodash/remove';

class CharDescriptor {
  constructor(char) {
    this.char = char;
    this.isPicked = false; // Indicate this character has been picked out.
    this.isRejected = false; // Indicate this character cannot meet the mask rule.
  }
}

export default class MaskFormatter {
  constructor({ mask = [], promptChar = '_', showPrompt = false, keepPosition = false }) {
    this.mask = mask;
    this.promptChar = promptChar;
    this.showPrompt = showPrompt;
    this.keepPosition = keepPosition;
    this.template = this.getTemplate();
  }

  getTemplate() {
    const { mask, promptChar } = this;
    return mask.map(char => ((char instanceof RegExp) ? promptChar : char)).join('') || '';
  }

  createDescriptorList(value, preValue = '', caretPosition) {
    const { mask, promptChar, showPrompt, keepPosition, template } = this;
    const distance = value.length - preValue.length;
    const caretPositionBeforeChange = caretPosition +
            (distance > 0 ? (-distance) : Math.abs(distance));
    const positionRange = sortBy([caretPosition, caretPositionBeforeChange]);

    if (keepPosition && showPrompt && value !== preValue) {
      value = preValue ? value : value + template;
      const charsList = value.split('');
      if (distance <= 0) {
        const backfillChars = take(charsList, caretPosition);
        value = this.template.split('').map((char, i) => {
          if (i >= positionRange[1]) {
            return charsList[i - Math.abs(distance)];
          }
          if (char === promptChar) {
            let stopRemove = false;
            const backfillChar = remove(backfillChars, (c) => {
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
        const comparedCharsList = value.split('');
        let enteredChars = comparedCharsList.splice(positionRange[0], distance);

        value = [].concat(
          take(comparedCharsList, positionRange[0])
            .map((char, i) => {
              if (mask[i].test && !mask[i].test(char)) {
                return promptChar;
              }
              return char;
            }),
          takeRight(comparedCharsList, (comparedCharsList.length - positionRange[0]))
            .map((char, i) => {
              if (!mask[positionRange[0] + i].test) {
                return char;
              }

              const isPromptChar = enteredChars.length && char === promptChar;
              const isMeetMaskRule = mask[positionRange[0] + i].test(enteredChars[0]);

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
            })
        ).join('');
      }
    }

    return value.split('').map(char =>
        new CharDescriptor(char)
      ).filter((charDescriptor, i) => {
        const char = charDescriptor.char;

        if (char !== promptChar) {
          const shouldOffset = i >= positionRange[0] && preValue.length === mask.length;
          return char !== this.template[(shouldOffset) ? i - distance : i];
        }
        return true;
      });
  }

  execute(value = '', preValue = '', caretPosition = 0) {
    const { mask, promptChar, showPrompt, template } = this;
    const CharDescriptorList = this.createDescriptorList(value, preValue, caretPosition);

    const nextValue = template.split('').reduce((returnString, templateChar, i) => {
      if (templateChar === promptChar) {
        const noMatchedChar = CharDescriptorList.every((charDescriptor) => {
          const { char, isPicked, isRejected } = charDescriptor;

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

      const isParseCharDescriptorDone =
              CharDescriptorList.every(
                charDescriptor => charDescriptor.isPicked || charDescriptor.isRejected
              );

      if (isParseCharDescriptorDone && !showPrompt) {
        return returnString;
      }

      returnString += templateChar;

      return returnString;
    }, '');

    return {
      value: nextValue,
      caretPosition: this.getCaretPosition(value, preValue, nextValue, caretPosition)
    };
  }

  getCaretPosition(value = '', preValue = '', nextValue = '', caretPosition = 0) {
    const { mask, promptChar, showPrompt, template } = this;

    const inputCharsList = value.split('');
    const nextCharsList = nextValue.split('');
    const distance = value.length - preValue.length;

    if (distance > 0 && nextValue === preValue) {
      return caretPosition - distance;
    }

    let leftChars = [];
    if (distance < 0 && caretPosition === value.length && !showPrompt) {
      leftChars = nextCharsList;
    } else {
      leftChars = take(inputCharsList, caretPosition)
                    .filter(char => nextValue.indexOf(char) !== -1);
    }
    const targetChar = leftChars[leftChars.length - 1];

    let countForTargetChar = [].concat(
      leftChars.filter(char => char === targetChar),
      take(mask, template.indexOf(promptChar))
        .filter(
          (char, i) => char === targetChar && inputCharsList[i] !== char
        )
    ).length;

    let nextCaretPosition = 0;

    nextCharsList.every((char, i) => {
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
      takeRight(mask, (mask.length - nextCaretPosition)).every((m, i) => {
        if (m.test) {
          nextCaretPosition += i;
          return false;
        }
        return true;
      });
    }

    if (distance < 0) {
      reverse(take(mask, nextCaretPosition)).every((m, i) => {
        if (m.test) {
          nextCaretPosition -= i;
          return false;
        }
        return true;
      });
    }

    return nextCaretPosition;
  }
}
