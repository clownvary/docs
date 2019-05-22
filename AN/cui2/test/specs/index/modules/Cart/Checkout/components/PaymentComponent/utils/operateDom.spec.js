import operateDom from 'index/modules/Cart/Checkout/components/PaymentComponent/utils/operateDom';
import PaymentModules from 'index/modules/Cart/Checkout/consts/paymentModules';

function initNode(className) {
  const nod = document.createElement('div');
  nod.classList.add(className);
  document.body.appendChild(nod);
  window.scrollTo = jest.fn().mockImplementationOnce((x, y) => {
    return y;
  });
};

describe('index/modules/Cart/Checkout/components/PaymentComponent/utils/filterNonDigit', () => {
  it('scrollByModule should be called correctly(1)', () => {
    initNode('test');
    operateDom.scrollByModule('test');
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
  it('scrollByModule should be called correctly(2)', () => {
    initNode('secondary-payment');
    operateDom.scrollByModule(PaymentModules.SECONDARY);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });
  it('scrollByModule should be called correctly(3)', () => {
    initNode('primary-payment');
    operateDom.scrollByModule(PaymentModules.PRIMARY);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });
  it('scrollByClass should be called correctly', () => {
    initNode('testClass');
    operateDom.scrollByClass('testClass');
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

});
