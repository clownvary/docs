import MaskTextProvider from 'src/components/InputBankCard/utils/MaskFormatter';

describe('components/InputBankCard/utils/MaskFormatter.js', () => {
  it('initialize and basic obj', () => {
    const maskFormatter = new MaskTextProvider({});
    expect(maskFormatter.mask).toEqual([]);
    expect(maskFormatter.keepPosition).toEqual(false);
    expect(maskFormatter.showPrompt).toEqual(false);
    expect(maskFormatter.promptChar).toEqual('_');
  });

  it('createDescriptorList and getCaretPosition should works fine', () => {
    let maskFormatter = new MaskTextProvider({});
    maskFormatter.createDescriptorList('test mask');
    maskFormatter = new MaskTextProvider({
      keepPosition: true,
      showPrompt: true,
      mask: [new RegExp('a')]
    });
    maskFormatter.createDescriptorList('test mask', 'preValue');

    maskFormatter = new MaskTextProvider({
      keepPosition: true,
      showPrompt: true,
      promptChar: 'e',
      mask: [new RegExp('e')]
    });
    maskFormatter.createDescriptorList('test mask', 'preValue');
    maskFormatter.createDescriptorList('343434', '9999999');
    maskFormatter.template = '333';
    maskFormatter.createDescriptorList('343434', '9999999', 1);
    expect(maskFormatter.createDescriptorList('343434', '9999999', 1)).toEqual(
      [{ char: '4', isPicked: false, isRejected: false }]
    );
    maskFormatter.execute();

    maskFormatter.getCaretPosition();
    maskFormatter = new MaskTextProvider({
      keepPosition: true,
      showPrompt: true,
      promptChar: 'e',
      mask: [new RegExp('e'), 'test']
    });
    maskFormatter.showPrompt = false;
    maskFormatter.promptChar = 's';
    maskFormatter.getCaretPosition('23', '2323', '32', 2);

    expect(maskFormatter.getCaretPosition('23', '2323', '32', 2)).toEqual(1);
  });
});
