import {
  getECheckList,
  getECheckLabel,
  formatECheckOption
} from 'index/Payment/utils/eCheckHelper';
import { newOptions } from 'index/Payment/consts';

describe('index/Payment/utils/eCheckHelper', () => {
  it('getECheckLabel method should work fine', () => {
    expect(getECheckLabel()).toEqual('Electronic Checkcc');

    const paymentOptions = window.__payment__.__initialState__.paymentOptions;
    window.__payment__.__initialState__.paymentOptions = [];
    expect(getECheckLabel()).toEqual('Electronic Check');
    window.__payment__.__initialState__.paymentOptions = paymentOptions;
  });

  it('getECheckList method should work fine', () => {
    const paymentOptions = [{ name: 'Electronic Checkcc', selected: true, echeck_id: 5 }];
    const eCheckList = getECheckList(paymentOptions);
    expect(eCheckList.selected).toEqual([5]);
    expect(eCheckList.data).toHaveLength(2);
    expect(eCheckList.data[0].selected).toBeTruthy();
  });

  it('formatECheckOption method should work fine', () => {
    const echeck1 = { value: newOptions.NEW_OPTION_VALUE };
    expect(formatECheckOption(echeck1, 0)).toEqual(echeck1);

    const echck2 = { value: 281, eft_account_number: '772', eft_account_type_name: 'checking' };
    const option2 = formatECheckOption(echck2, 2);
    expect(option2.name).toEqual('checking ends in 772');
    expect(option2.echeck_id).toEqual('newECheck_2');

    const echck3 = { value: 281, echeck_id: 281, eft_account_number: '6228361652331', eft_account_type_name: 'checking' };
    const option3 = formatECheckOption(echck3, 3);
    expect(option3.name).toEqual('checking ends in 2331');
    expect(option3.echeck_id).toEqual(281);
  });
});
