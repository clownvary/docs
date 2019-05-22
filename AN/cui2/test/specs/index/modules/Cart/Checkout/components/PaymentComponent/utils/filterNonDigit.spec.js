import { filterNonDigit } from 'index/modules/Cart/Checkout/components/PaymentComponent/utils/filterNonDigit';

describe('index/modules/Cart/Checkout/components/PaymentComponent/utils/filterNonDigit', () => {
  it('filterNonDigit function should run correctly', () => {

    const eventObj = {
      target: {
        value: 'test'
      }
    };
    filterNonDigit(eventObj);
    expect(eventObj.target.value).toEqual('');

    const eventObj2 = {
      target: {
        value: '1234'
      }
    };
    filterNonDigit(eventObj2);
    expect(eventObj2).toMatchObject(eventObj2);
  });
});
