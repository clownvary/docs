import { fromJS } from 'immutable';
import feesOrderByRecurring from 'shared/utils/feesOrderByRecurring';

describe('shared/utils/feesOrderByRecurring', () => {
  test('feesOrderByRecurring method should work fine', () => {
    const list = [{
      scheduleFees: [{
        facilityScheduleID: 1
      }, {
        masterFacilityScheduleID: 1
      }]
    }];
    const result = feesOrderByRecurring(list);

    expect(result).toEqual([{
      scheduleFees:
        [{
          facilityScheduleID: 1,
          recurringScheduleFees: [{ masterFacilityScheduleID: 1 }]
        }]
    }]);
  });

  test('feesOrderByRecurring method should work fine, if the lenght of list is 0', () => {
    const list = [];
    const result = feesOrderByRecurring(list);
    expect(result).toEqual(list);
  });

  test('feesOrderByRecurring method should work fine, if the length of scheduleFees is 0', () => {
    const list = [{
      scheduleFees: []
    }];
    const result = feesOrderByRecurring(list);
    expect(result).toEqual(list);
  });
});
