import { fixScroll } from 'index/modules/Cart/Checkout/components/OrderSummary/fixStyle';

describe('index/modules/Cart/Checkout/components/OrderSummary/fixStyle', () => {
  it('should not trigger focus function', () => {
    const span = document.createElement('span');
    const scrollSpy = jest.spyOn(window, 'scrollBy');
    span.className = 'input-group giftcard-combobox';
    document.body.appendChild(span);
    fixScroll();
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it('should trigger focus function', () => {
    document.body.removeChild(document.getElementsByClassName('input-group giftcard-combobox')[0]);
    const div = document.createElement('div');
    const input = document.createElement('input');
    const scrollSpy = jest.spyOn(window, 'scrollBy');
    input.type = 'text';
    div.className = 'input-group giftcard-combobox';
    div.appendChild(input);
    document.body.appendChild(div);

    fixScroll();
    input.focus();
    expect(scrollSpy).toHaveBeenCalledWith(0, -2);
    expect(scrollSpy).toHaveBeenCalledWith(0, 2);
  });
});
