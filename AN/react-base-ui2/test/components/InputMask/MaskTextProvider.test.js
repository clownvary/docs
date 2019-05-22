import MaskTextProvider from 'src/components/InputMask/MaskTextProvider';
import * as CharType from 'src/components/InputMask/consts/CharType';

describe('components/InputMask/MaskTextProvider.js', () => {

  test('initialize and basic APIs', () => {
    let p = new MaskTextProvider({});
    expect(p.mask).toBe('');

    p.setCurrency();
    expect(p.currency).toBe('USD');

    p.setCurrency('None');
    expect(p.currencySymbol).toBe('$');

    p = new MaskTextProvider({ mask: '|#A$,./:<>1\\E' });
    expect(p.testString).toBe('__$,./:11');

    expect(p.increment()).toBe(true);
    expect(p.decrement()).toBe(true);
    expect(p.setValue()).toBe(false);
    expect(p.getValue()).toBe(null);

    p.setPromptChar('x');
    expect(p.promptChar).toBe('x');

    p.setPromptChar();
    expect(p.promptChar).toBe(' ');

    p.noMask = true;
    expect(p.setPromptChar()).toBeUndefined();

    expect(p.isEditDesc()).toBe(true);
    p.noMask = false;
    expect(p.isEditDesc({ charType: CharType.REQUIRED }));

    p.noMask = true;
    expect(p.isEditPos()).toBe(true);
    p.noMask = false;
    expect(p.isEditPos(-1)).toBe(false);

    expect(p.isLiteralDesc()).toBe(false);

    jest.spyOn(p, 'isLiteralDesc').mockImplementationOnce(() => true);
    expect(p.isLiteralChar()).toBe(false);

    p.descriptors.push({ charType: CharType.REQUIRED, isAssigned: true });
    p.updatePromptChar();
    p.noMask = true;
    expect(p.updatePromptChar()).toBeUndefined();

    p.noMask = false;
    jest.spyOn(p, 'isEditPos').mockImplementationOnce(() => false);
    const assignedCharCount = p.assignedCharCount;
    p.resetChar(0);
    expect(p.assignedCharCount).toBe(assignedCharCount);

    expect(p.getAdjustedPos(10)).toBe(9);
    expect(p.getAdjustedPos(1)).toBe(1);
    p.noMask = true;
    expect(p.getAdjustedPos(1)).toBe(1);
    expect(p.getAdjustedPos(10)).toBe(8);
    p.noMask = false;

    expect(p.findEditPositionFrom(1, false)).toBe(1);

    expect(p.findPosition(2, 1)).toBe(-1);

    expect(p.findPosition(1, 5)).toBe(-1);
    expect(p.findPosition(1, 5, true)).toBe(-1);

    p.descriptors.pop();
    p.descriptors.push({ charType: CharType.REQUIRED });
    expect(p.findPosition(1, 10, false, CharType.REQUIRED, true)).toBe(-1);

    p.assignedCharCount = 0
    expect(p.findAssignedEditPosition()).toBe(-1);
  });


  test('char operations', () => {
    const p = new MaskTextProvider({ mask: '|#A$,./:<>1\\E' });
    p.setChar('a', -1);
    expect(p.getText()).toBe('a ');

    jest.spyOn(p, 'isLiteralChar').mockImplementationOnce(() => true);
    p.setChar('a', 1, {});
    expect(p.getText()).toBe('a ');

    p.setChar('A', 2, { caseType: 'lower' });
    expect(p.getText()).toBe('a ');

    p.setChar('A', 2, { caseType: 'upper' });
    expect(p.getText()).toBe('a ');

    p.setChar('a', 3, { caseType: 'upper', isAssigned: true });
    expect(p.getText()).toBe('a ');

    p.noMask = true;
    p.clear({});
    expect(p.testString).toBe('');

    p.noMask = false;
    p.assignedCharCount = 0;
    p.clear({});
    expect(p.getText()).toBe('');

    p.assignedCharCount = 1;
    p.testString = '__';
    p.clear({});
    expect(p.getText()).toBe('  ');

    expect(p.testInputChar('\b', 0, {})).toBe(false);
    expect(p.testInputChar('a', 10, {})).toBe(false);

    const originalTestString = p.testString;
    p.testString = 'a';
    jest.spyOn(p, 'isLiteralDesc').mockImplementationOnce(() => true);
    expect(p.testInputChar('a', 0, {})).toBe(true);

    p.testString = originalTestString;
    jest.spyOn(p, 'isLiteralDesc').mockImplementationOnce(() => true);
    expect(p.testInputChar('a', 0, {})).toBe(false);

    p.allowPromptAsInput = false;
    p.promptChar = 'x';
    expect(p.testInputChar('x', 0, {})).toBe(false);

    p.descriptors[0] = { maskPosition: 0 };
    p.mask = 'L';
    expect(p.testInputChar('a', 0, {})).toBe(true);
    expect(p.testInputChar('1', 0, {})).toBe(false);
    p.asciiOnly = true;
    expect(p.testInputChar('1', 0, {})).toBe(false);

    p.mask = 'a';
    expect(p.testInputChar('!', 0, {})).toBe(false);
    p.asciiOnly = false;
    expect(p.testInputChar('!', 0, {})).toBe(false);
    expect(p.testInputChar('1', 0, {})).toBe(true);

    p.mask = 'A';
    expect(p.testInputChar('!', 0, {})).toBe(false);
    expect(p.testInputChar('1', 0, {})).toBe(true);

    p.mask = '?';
    expect(p.testInputChar('1', 0, {})).toBe(false);
    p.asciiOnly = true;
    expect(p.testInputChar(' ', 0, {})).toBe(false);
    expect(p.testInputChar('a', 0, {})).toBe(true);

    p.mask = '#';
    expect(p.testInputChar('a', 0, {})).toBe(false);
    expect(p.testInputChar('1', 0, {})).toBe(true);

    p.mask = '0';
    expect(p.testInputChar('1', 0, {})).toBe(true);
    expect(p.testInputChar('a', 0, {})).toBe(false);

    p.mask = '9';
    expect(p.testInputChar('1', 0, {})).toBe(true);
    expect(p.testInputChar('a', 0, {})).toBe(false);

    p.descriptors[0].isAssigned = true;
    p.testString = '1_';
    expect(p.testInputChar('1', 0, {})).toBe(true);
  });

  test('insert/remove', () => {
    const p = new MaskTextProvider({ mask: '000000' });

    try {
      p.insertAt();
    } catch (e) {
      expect(e).toBe('InsertAt: input');
    }

    expect(p.insertAt('', 0)).toBe(true);
    expect(p.getText()).toBe('      ');

    expect(p.insertAt('1', 0)).toBe(true);
    expect(p.getText()).toBe('1     ');

    expect(p.insertAt('1', -1)).toBe(false);
    expect(p.getText()).toBe('1     ');

    expect(p.insertAt('a', 0)).toBe(false);
    expect(p.getText()).toBe('1     ');


    expect(p.insertAt('2', 1)).toBe(true);
    expect(p.getText()).toBe('12    ');

    p.remove(0, 0);
    expect(p.getText()).toBe(' 2    ');

    expect(p.remove(0, 7)).toBe(false);
    expect(p.remove(4, 1)).toBe(false);

    p.noMask = true;
    const rh = {};
    expect(p.insertAt('a', 0, rh)).toBe(true);
    expect(p.getText()).toBe('a_2____');

    jest.spyOn(p, '_testString').mockImplementationOnce(() => true);
    expect(p.internalInsertAt('a', 1, {}, true)).toBe(true);

    p.noMask = true;
    expect(p.internalRemoveAt(0, 3, {})).toBe(true);

    p.noMask = false;
    jest.spyOn(p, 'findAssignedEditPosition').mockImplementationOnce(() => -1);
    expect(p.internalRemoveAt(0, 3, {})).toBe(true);

    jest.spyOn(p, 'findAssignedEditPosition').mockImplementationOnce(() => 1);
    expect(p.internalRemoveAt(4, 3, {})).toBe(true);
  });

  test('setText/getText', () => {
    const p = new MaskTextProvider({});

    expect(p.setText({})).toBe(true);

    p.noMask = true;
    p.setText('test');
    expect(p.getText()).toBe('test');

    p.noMask = false;
    p.mask = '000';
    p.build();
    expect(p.setText('a')).toBe(false);
    expect(p.setText('1')).toBe(true);
    jest.spyOn(p, 'findAssignedEditPositionFrom').mockImplementationOnce(() => 0);
    expect(p.setText('2')).toBe(true);

    expect(p.getText({}, 0, 0)).toBe('');
    p.noMask = true;
    expect(p.getText({ passwordMode: true }, 0, 1)).toBe('*');

    p.noMask = false;
    expect(p.getText({ includePrompt: true, includeLiterals: true }, 0, 1)).toBe('_');

    p.descriptors[0].isAssigned = true;
    expect(p.getText({ passwordMode: true }, 0, 1)).toBe('*');

    p.descriptors.pop();
    p.descriptors.push({ charType: 3 }); // (CharType.REQUIRED | CharType.OPTIONAL) === 3
    expect(p.getText({ passwordMode: true }, 0, 3)).toBe('* _');

    p.descriptors.pop();
    p.descriptors.push({ charType: CharType.SEPARATOR });
    expect(p.getText({ includeLiterals: true }, 0, 3)).toBe('_ _');

    p.descriptors.pop();
    p.descriptors.push({ charType: 6 });
    expect(p.getText({ includeLiterals: true }, 0, 3)).toBe('_ _');
  });

  test('misc', () => {
    const p = new MaskTextProvider({});
    expect(p._testString('', 0, {})).toBe(true);

    expect(p._testString('a', 0, {})).toBe(false);

    jest.spyOn(p, 'findEditPositionFrom').mockImplementationOnce(() => -1);
    p.testString = '000';
    expect(p._testString('a', 0, {})).toBe(false);

    jest.spyOn(p, 'isLiteralChar').mockImplementationOnce(() => true);
    expect(p._testString('a', 0, {})).toBe(false);

    jest.spyOn(p, 'isLiteralChar').mockImplementationOnce(() => false);
    jest.spyOn(p, 'testInputChar').mockImplementationOnce(() => true);
    jest.spyOn(p, 'findEditPositionFrom').mockImplementationOnce(() => 3);
    expect(p._testString('a', 2, {})).toBe(true);
    console.log('---------- begin');

    p.noMask = true;
    p.resetString(0, 5);
    expect(p.getText()).toBe('');
    p.noMask = false;
    p.resetString(-1, 5);
    expect(p.getText()).toBe('');

    expect(p.setString('a', 0)).toBe(0);
    jest.spyOn(p, 'isLiteralChar').mockImplementationOnce(() => true);
    expect(p.setString('a', 0)).toBe(0);

    p.testString = '0';
    p.descriptors.push({})
    expect(p.testSetString('12', 0, {})).toBe(false);

  });
});
