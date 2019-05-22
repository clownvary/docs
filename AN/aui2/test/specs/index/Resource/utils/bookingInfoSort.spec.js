import { fromJS } from 'immutable';
import {
  getDateTime,
  sortResource,
  getSortDetails
} from 'index/Resource/utils/bookingInfoSort';
import reservationPeriodUnit from 'index/Resource/consts/reservationPeriodUnit';

describe('index -> Resource -> utils -> bookingInfoSort', () => {
  const verifyFormat = 'YYYY-MM-DD HH:mm:ss';

  it('method getDateTime returns date-time object for date-time type resource', () => {
    const item = fromJS({
      startEventDate: '2017 Sep 10',
      startEventTime: '07:00 am',
      endEventDate: '2017 Sep 10',
      endEventTime: '11:00 am'
    });
    const resource = fromJS({
      reservationPeriodUnit: reservationPeriodUnit.MINUTE
    });

    const datetimeObject = getDateTime(item, resource);

    expect(datetimeObject.startDate.format(verifyFormat)).toEqual('2017-09-10 07:00:00');
    expect(datetimeObject.endDate.format(verifyFormat)).toEqual('2017-09-10 11:00:00');
  });

  it('method getDateTime returns date-time object for date range type resource', () => {
    const item = fromJS({
      dateRangeID: 147
    });
    const resource = fromJS({
      reservationPeriodUnit: reservationPeriodUnit.DEFINED_DATE_RANGE,
      definedDateRange: [
        {
          id: 147,
          name: '2017 Sep 10 07:00 am to 2017 Sep 11 11:00 am'
        }
      ]
    });

    const datetimeObject = getDateTime(item, resource);

    expect(datetimeObject.startDate.format(verifyFormat)).toEqual('2017-09-10 07:00:00');
    expect(datetimeObject.endDate.format(verifyFormat)).toEqual('2017-09-11 11:00:00');
  });

  it('method getDateTime returns null for date range type resource which does not exist', () => {
    const item = fromJS({
      dateRangeID: 146
    });
    const resource = fromJS({
      reservationPeriodUnit: reservationPeriodUnit.DEFINED_DATE_RANGE,
      definedDateRange: [
        {
          id: 147,
          name: '2017 Sep 10 07:00 am to 2017 Sep 10 11:00 am'
        }
      ]
    });

    const datetimeObject = getDateTime(item, resource);

    expect(datetimeObject).toBeNull();
  });

  it('method getDateTime returns date-time object for rental block type resource', () => {
    const item = fromJS({
      startEventDate: '2017 Sep 10',
      rentalBlockID: 147
    });
    const resource = fromJS({
      reservationPeriodUnit: reservationPeriodUnit.RENTAL_BLOCK,
      rentalBlock: [
        {
          id: 147,
          name: '07:00 am to 11:00 am'
        }
      ]
    });

    const datetimeObject = getDateTime(item, resource);

    expect(datetimeObject.startDate.format(verifyFormat)).toEqual('2017-09-10 07:00:00');
    expect(datetimeObject.endDate.format(verifyFormat)).toEqual('2017-09-10 11:00:00');
  });

  it('method getDateTime returns null for rental block type resource which does not exist', () => {
    const item = fromJS({
      startEventDate: '2017 Sep 10',
      rentalBlockID: 146
    });
    const resource = fromJS({
      reservationPeriodUnit: reservationPeriodUnit.RENTAL_BLOCK,
      rentalBlock: [
        {
          id: 147,
          name: '07:00 am to 11:00 am'
        }
      ]
    });

    const datetimeObject = getDateTime(item, resource);

    expect(datetimeObject).toBeNull();
  });

  it('method sortResource return sorted resources', () => {
    const resources = [
      fromJS({
        resourceName: 'CCC facility',
        bookingDetail: [
          {
            startEventDate: '2017 Sep 10',
            startEventTime: '05:00 am',
            endEventDate: '2017 Sep 10',
            endEventTime: '08:00 am'
          }
        ]
      }),
      fromJS({
        resourceName: 'BBB facility',
        bookingDetail: [
          {
            startEventDate: '2017 Sep 10',
            startEventTime: '05:00 am',
            endEventDate: '2017 Sep 10',
            endEventTime: '08:00 am'
          }
        ]
      }),
      fromJS({
        resourceName: 'AAA facility',
        bookingDetail: [
          {
            startEventDate: '2017 Sep 10',
            startEventTime: '01:00 am',
            endEventDate: '2017 Sep 10',
            endEventTime: '04:00 am'
          }
        ]
      }),
      fromJS({
        resourceName: 'DDD facility',
        bookingDetail: [
          {
            startEventDate: '2017 Sep 10',
            startEventTime: '09:00 am',
            endEventDate: '2017 Sep 10',
            endEventTime: '11:00 am'
          }
        ]
      }),
    ];

    const sortedResources = resources.sort(sortResource);

    expect(sortedResources[0].get('resourceName')).toEqual('AAA facility');
    expect(sortedResources[1].get('resourceName')).toEqual('BBB facility');
    expect(sortedResources[2].get('resourceName')).toEqual('CCC facility');
    expect(sortedResources[3].get('resourceName')).toEqual('DDD facility');
  });

  it('method sortDetails return sorted resources', () => {
    const resource = fromJS({
      bookingDetail: [
        {
          startEventDate: '2017 Sep 10',
          startEventTime: '09:00 am',
          endEventDate: '2017 Sep 10',
          endEventTime: '11:00 am'
        },
        {
          startEventDate: '2017 Sep 10',
          startEventTime: '05:00 am',
          endEventDate: '2017 Sep 10',
          endEventTime: '08:00 am'
        },
        {
          startEventDate: '2017 Sep 10',
          startEventTime: '01:00 am',
          endEventDate: '2017 Sep 10',
          endEventTime: '04:00 am'
        }
      ],
    });

    const sortedResource = getSortDetails(resource);

    expect(sortedResource.getIn(['bookingDetail', 0, 'startEventTime'])).toEqual('01:00 am');
    expect(sortedResource.getIn(['bookingDetail', 1, 'startEventTime'])).toEqual('05:00 am');
    expect(sortedResource.getIn(['bookingDetail', 2, 'startEventTime'])).toEqual('09:00 am');
  });

  it('method sortDetails return sorted resources with date range type', () => {
    const resource = fromJS({
      reservationPeriodUnit: reservationPeriodUnit.DEFINED_DATE_RANGE,
      definedDateRange: [
        {
          id: 146,
          name: '2017 Sep 10 07:00 am to 2017 Sep 10 11:00 am'
        },
        {
          id: 147,
          name: '2017 Sep 11 07:00 am to 2017 Sep 11 11:00 am'
        },
        {
          id: 148,
          name: '2017 Sep 12 07:00 am to 2017 Sep 12 11:00 am'
        },
      ],
      bookingDetail: [
        {
          dateRangeID: 147
        },
        {
          dateRangeID: 148
        },
        {
          dateRangeID: 146
        },
        {
          dateRangeID: 149
        }
      ]
    });

    const sortedResource = getSortDetails(resource);

    expect(sortedResource.getIn(['bookingDetail', 0, 'dateRangeID'])).toEqual(146);
    expect(sortedResource.getIn(['bookingDetail', 1, 'dateRangeID'])).toEqual(147);
    expect(sortedResource.getIn(['bookingDetail', 2, 'dateRangeID'])).toEqual(148);
  });
});
