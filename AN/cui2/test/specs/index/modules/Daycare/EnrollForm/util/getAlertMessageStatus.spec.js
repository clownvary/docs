import getAlertMessageStatus from 'index/modules/Daycare/EnrollForm/util/getAlertMessageStatus';

describe('index/modules/Daycare/EnrollForm/util/getAlertMessageStatus', () => {
  it('getAlertMessageStatus', () => {
    expect(getAlertMessageStatus(0, 0, 0)).toEqual(false);
    expect(getAlertMessageStatus(0, 0, 3)).toEqual(true);
    expect(getAlertMessageStatus(1, 0, 1)).toEqual(false);
    expect(getAlertMessageStatus(3, 0, 1)).toEqual(false);
    expect(getAlertMessageStatus(3, 3, 15)).toEqual(true);
  });
});
