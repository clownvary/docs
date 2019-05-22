import ITextProvider from 'src/components/InputBase/ITextProvider';
import InputResult from 'src/components/InputBase/InputResult';

describe('src/components/InputBase', () => {
  it('ITextProvider.js should works fine', () => {
    const ITextProviderInterface = new ITextProvider();
    ITextProviderInterface.insertAt();
    ITextProviderInterface.remove();
    ITextProviderInterface.increment();
    ITextProviderInterface.decrement();
    ITextProviderInterface.getValue();
    ITextProviderInterface.setValue();
    ITextProviderInterface.getText();
    ITextProviderInterface.setText();
    ITextProviderInterface.setCurrency();
  });

  it('InputResult should works fine', () => {
    const InputResultInterface = new InputResult();

    expect(InputResultInterface.isSuccess()).toEqual(true);
    expect(InputResultInterface.clone()).toEqual({ hint: 0, testPosition: -1 });
  });
});
