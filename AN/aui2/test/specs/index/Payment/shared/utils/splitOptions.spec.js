import {
  resetPaymentOptions,
  splitOptions,
  deleteOption,
  changeOption,
  createAvailableOptions,
  getAvailableOptionIds,
  deleteGiftCardId,
  pushGiftCardId,
  getFormatAmount,
  filterOptions
} from 'index/Payment/utils/splitOptions';
import { paymentTypes } from 'index/Payment/consts';

describe('index/Payment/utils/splitOptions', () => {
  it('resetPaymentOptions method should work fine', () => {
    const options = [
      { id: 661, selected: false },
      { id: 662, selected: false }
    ];
    resetPaymentOptions(options);
  });

  it('splitOptions method should work fine if no default id', () => {
    const options = [
      { id: 7713, selected: false },
      { id: 7714, selected: false },
      { id: 7715, selected: true }
    ];
    resetPaymentOptions(options);
    const result = splitOptions();
    expect(result.defaultId).toEqual(7715);
  });

  it('splitOptions method should work fine', () => {
    const options = [
      { id: 5513, selected: false },
      { id: 5514, selected: false },
      { id: paymentTypes.GIFTCARD, selected: false }
    ];
    resetPaymentOptions(options)
    const result = splitOptions(paymentTypes.GIFTCARD);
    expect(result.defaultId).toEqual(paymentTypes.GIFTCARD);
  });

  it('deleteOption method should work fine', () => {
    deleteOption(paymentTypes.CHECK);
    deleteOption(paymentTypes.GIFTCARD);
  });

  it('createAvailableOptions method should work fine', () => {
    expect(createAvailableOptions(5513).some(option => option.id === 5513 && option.selected)).toBeTruthy();
    expect(createAvailableOptions(5555).some(option => option.id === 5555 && option.selected)).toBeFalsy();
  });

  it('changeOption method should work fine', () => {
    changeOption(paymentTypes.GIFTCARD, paymentTypes.GIFTCARD);
    changeOption(5555, 5555);
  });

  it('getAvailableOptionIds method should work fine', () => {
    const options = [
      { id: 661, selected: false },
      { id: 662, selected: false }
    ];
    resetPaymentOptions(options);
    expect(getAvailableOptionIds(options)).toEqual([661, 662]);
  });

  it('deleteGiftCardId method should work fine', () => {
    deleteGiftCardId(660);
  });

  it('pushGiftCardId method should work fine', () => {
    pushGiftCardId(660);
    pushGiftCardId(661);
  });

  it('filterOptions method should work fine', () => {
    expect(filterOptions()).toEqual([]);
    expect(filterOptions([{ amount: 100 }, { amount: 0 }])).toEqual([{ amount: 100, indexInOrgArr: 0 }]);
  });

  it('getFormatAmount method should work fine', () => {
    expect(getFormatAmount({ amount: 200 }, paymentTypes.PAYMENTPLAN)).toEqual(200);
    expect(getFormatAmount({ amount: 200 }, paymentTypes.DEBITCARD)).toEqual(200);
    expect(getFormatAmount({ amount: 200 }, paymentTypes.REFUND_DEBITCARD)).toEqual(200);
    expect(getFormatAmount({}, 99)).toEqual(0);
  });
});
