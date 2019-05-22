import * as Validator from 'src/utils/charValidator';

describe('utils/charValidator', () => {
  it('isDigit should work fine', () => {
    expect(Validator.isDigit(3)).toBeTruthy();
    expect(Validator.isDigit('3')).toBeTruthy();
    expect(Validator.isDigit(0)).toBeTruthy();
    expect(Validator.isDigit('9')).toBeTruthy();
    expect(Validator.isDigit('-3')).toBeFalsy();
    expect(Validator.isDigit(-4)).toBeFalsy();
    expect(Validator.isDigit(13)).toBeFalsy();
  });

  it('isLetter should work fine', () => {
    expect(Validator.isLetter('a')).toBeTruthy();
    expect(Validator.isLetter('vs')).toBeTruthy();
    expect(Validator.isLetter(0)).toBeFalsy();
    expect(Validator.isLetter('9')).toBeFalsy();
    expect(Validator.isLetter('@')).toBeFalsy();
    expect(Validator.isLetter('+')).toBeFalsy();
  });

  it('isLetterOrDigit should work fine', () => {
    expect(Validator.isLetterOrDigit('a')).toBeTruthy();
    expect(Validator.isLetterOrDigit('vs')).toBeTruthy();
    expect(Validator.isLetterOrDigit(0)).toBeTruthy();
    expect(Validator.isLetterOrDigit('9')).toBeTruthy();
    expect(Validator.isLetterOrDigit('@')).toBeFalsy();
    expect(Validator.isLetterOrDigit('+')).toBeFalsy();
  });

  it('isSymbol should work fine', () => {
    expect(Validator.isSymbol('a')).toBeFalsy();
    expect(Validator.isSymbol('vs')).toBeFalsy();
    expect(Validator.isSymbol(0)).toBeFalsy();
    expect(Validator.isSymbol('9')).toBeFalsy();
    expect(Validator.isSymbol('$')).toBeTruthy();
    expect(Validator.isSymbol('+')).toBeTruthy();
    expect(Validator.isSymbol('<')).toBeTruthy();
  });

  it('isPunctuation should work fine', () => {
    expect(Validator.isPunctuation('a')).toBeFalsy();
    expect(Validator.isPunctuation('vs')).toBeFalsy();
    expect(Validator.isPunctuation(0)).toBeFalsy();
    expect(Validator.isPunctuation('9')).toBeFalsy();
    expect(Validator.isPunctuation(',')).toBeTruthy();
    expect(Validator.isPunctuation('.')).toBeTruthy();
    expect(Validator.isPunctuation('!')).toBeTruthy();
  });
  describe('Method isPrintableChar:', () => {
    it('isPrintableChar should work fine when isLetterOrDigit return true or false', () => {
      Validator.isLetterOrDigit = jest.fn().mockReturnValue(true);
      expect(Validator.isPrintableChar('\n')).toBeFalsy();
      expect(Validator.isPrintableChar('')).toBeTruthy();

      Validator.isLetterOrDigit = jest.fn().mockReturnValue(false);
      expect(Validator.isPrintableChar('&')).toBeTruthy();
      expect(Validator.isPrintableChar('')).toBeTruthy();
    });
    it('isPrintableChar should work fine when isPunctuation return true or false', () => {
      Validator.isPunctuation = jest.fn().mockReturnValue(true);
      expect(Validator.isPrintableChar('\n')).toBeFalsy();
      expect(Validator.isPrintableChar('')).toBeTruthy();

      Validator.isPunctuation = jest.fn().mockReturnValue(false);
      expect(Validator.isPrintableChar('&')).toBeTruthy();
      expect(Validator.isPrintableChar('')).toBeTruthy();
    });
    it('isPrintableChar should work fine when isSymbol return true or false', () => {
      Validator.isSymbol = jest.fn().mockReturnValue(false);
      expect(Validator.isPrintableChar('\n')).toBeFalsy();
      expect(Validator.isPrintableChar('')).toBeTruthy();

      Validator.isSymbol = jest.fn().mockReturnValue(false);
      expect(Validator.isPrintableChar('&')).toBeTruthy();
      expect(Validator.isPrintableChar('')).toBeTruthy();
    });
  });

  it('isAscii should work fine', () => {
    expect(Validator.isAscii('\n')).toBeFalsy();
    expect(Validator.isAscii('&')).toBeTruthy();
    expect(Validator.isAscii('!')).toBeTruthy();
    expect(Validator.isAscii('~')).toBeTruthy();
    expect(Validator.isAscii('e')).toBeTruthy();
    expect(Validator.isAscii('1')).toBeTruthy();
    expect(Validator.isAscii(',')).toBeTruthy();
  });

  it('isAsciiLetter should work fine', () => {
    expect(Validator.isAsciiLetter('\n')).toBeFalsy();
    expect(Validator.isAsciiLetter('&')).toBeFalsy();
    expect(Validator.isAsciiLetter('!')).toBeFalsy();
    expect(Validator.isAsciiLetter('~')).toBeFalsy();
    expect(Validator.isAsciiLetter('e')).toBeTruthy();
    expect(Validator.isAsciiLetter('1')).toBeFalsy();
    expect(Validator.isAsciiLetter(',')).toBeFalsy();
    expect(Validator.isAsciiLetter('Z')).toBeTruthy();
  });

  it('isUpper should work fine', () => {
    expect(Validator.isUpper('Z')).toBeTruthy();
    expect(Validator.isUpper('a')).toBeFalsy();
    expect(Validator.isUpper('1')).toBeTruthy();
    expect(Validator.isUpper(',')).toBeTruthy();
  });

  it('isLower should work fine', () => {
    expect(Validator.isLower('Z')).toBeFalsy();
    expect(Validator.isLower('a')).toBeTruthy();
    expect(Validator.isLower('1')).toBeTruthy();
    expect(Validator.isLower(',')).toBeTruthy();
  });

  it('isAlphanumeric should work fine', () => {
    expect(Validator.isAlphanumeric('a')).toBeTruthy();
    expect(Validator.isAlphanumeric('vs')).toBeTruthy();
    expect(Validator.isAlphanumeric(0)).toBeTruthy();
    expect(Validator.isAlphanumeric('9')).toBeTruthy();
    expect(Validator.isAlphanumeric('@')).toBeFalsy();
    expect(Validator.isAlphanumeric('+')).toBeFalsy();
  });

  it('isAciiAlphanumeric should work fine', () => {
    expect(Validator.isAciiAlphanumeric('a')).toBeTruthy();
    expect(Validator.isAciiAlphanumeric('vs')).toBeTruthy();
    expect(Validator.isAciiAlphanumeric(0)).toBeTruthy();
    expect(Validator.isAciiAlphanumeric('9')).toBeTruthy();
    expect(Validator.isAciiAlphanumeric('@')).toBeFalsy();
    expect(Validator.isAciiAlphanumeric('+')).toBeFalsy();
  });

  it('setChar should work fine', () => {
    expect(Validator.setChar('test', 'x', 1)).toEqual('txst');
    expect(Validator.setChar('test', 'x', 5)).toEqual('test');
    expect(Validator.setChar('test', 'x', 4)).toEqual('test');
    expect(Validator.setChar('test', 'x', 0)).toEqual('xest');
    expect(Validator.setChar('test', 'x', -1)).toEqual('test');
  });
});
