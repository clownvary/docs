import {
  hasDateRangeError,
  hasRentalBlockError,
  hasNormalError
} from 'index/Resource/utils/hasBookingItemError';

describe('check error state methods', () => {
  it('hasDateRangeError method shall work fine', () => {
    expect(hasDateRangeError(null)).toBeFalsy();
    expect(hasDateRangeError({ dateRangeID: 1 })).toBeTruthy();
    expect(hasDateRangeError({ datetime: 'server error' })).toBeTruthy();
    expect(hasDateRangeError({ conflict: true })).toBeTruthy();
    expect(hasDateRangeError({ advancedError: true })).toBeTruthy();
    expect(hasDateRangeError({ advancedError: true, isOverrideAdvance: true })).toBeFalsy();
    expect(hasDateRangeError({ timeOverMaximum: 'facility cannot be reserved for longer than 2 days.' })).toBeTruthy();
  });

  it('hasRentalBlockError method shall work fine', () => {
    expect(hasRentalBlockError(null)).toBeFalsy();
    expect(hasRentalBlockError({ rentalBlockID: 1 })).toBeTruthy();
    expect(hasRentalBlockError({ datetime: 'server error' })).toBeTruthy();
    expect(hasRentalBlockError({ conflict: true })).toBeTruthy();
    expect(hasRentalBlockError({ advancedError: true })).toBeTruthy();
    expect(hasRentalBlockError({ advancedError: true, isOverrideAdvance: true })).toBeFalsy();
    expect(hasRentalBlockError({ timeOverMaximum: 'facility cannot be reserved for longer than 2 days.' })).toBeTruthy();
  });

  it('hasNormalError method shall work fine', () => {
    expect(hasNormalError(null)).toBeFalsy();
    expect(hasNormalError({ startDatetimeBigger: true })).toBeTruthy();
    expect(hasNormalError({ datetime: 'server error' })).toBeTruthy();
    expect(hasNormalError({ conflict: true })).toBeTruthy();
    expect(hasNormalError({ advancedError: true })).toBeTruthy();
    expect(hasNormalError({ advancedError: true, isOverrideAdvance: true })).toBeFalsy();
    expect(hasNormalError({ timeOverMaximum: 'facility cannot be reserved for longer than 2 days.' })).toBeTruthy();
  });
});
