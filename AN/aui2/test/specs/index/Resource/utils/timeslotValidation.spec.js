import moment from 'moment';
import validateBookingsByTimeslot, {
  isRangeCovered,
  checkRangeBookingOverlap,
  compareRangeIndexBooking,
  selectAllRangeIndexBooking
} from 'index/Resource/utils/timeslotValidation';
import reservationPeriodUnit from 'index/Resource/consts/reservationPeriodUnit';
describe('index -> Resource -> utils -> timeslotValidation', () => {
  it('method validateBookingsByTimeslot returns validated minute bookings', () => {
    const bookings = [
      {
        start: moment('2017/09/10 05:00 am'),
        end: moment('2017/09/10 05:15 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.MINUTE,
          minimumTime: 30,
          maximumTime: 120
        }
      },
      {
        start: moment('2017/09/10 06:00 am'),
        end: moment('2017/09/10 07:00 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.MINUTE,
          minimumTime: 30,
          maximumTime: 120
        }
      },
      {
        start: moment('2017/09/10 07:00 am'),
        end: moment('2017/09/10 12:00 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.MINUTE,
          minimumTime: 30,
          maximumTime: 120
        }
      }
    ];
    const noop = (bookings) => {
    };
    const finalBookings = validateBookingsByTimeslot(bookings, noop);
    expect(finalBookings[0].endEventTime).toEqual('5:30 AM');
    expect(finalBookings[1].startEventTime).toEqual('6:00 AM');
    expect(finalBookings[1].endEventTime).toEqual('7:00 AM');
    expect(finalBookings[2].endEventTime).toEqual('9:00 AM');
  });
  it('method validateBookingsByTimeslot returns validated hour bookings', () => {
    const bookings = [
      {
        start: moment('2017/09/10 05:00 am'),
        end: moment('2017/09/10 05:00 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.HOUR,
          minimumTime: 1,
          maximumTime: 3
        }
      },
      {
        start: moment('2017/09/10 06:00 am'),
        end: moment('2017/09/10 07:30 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.HOUR,
          minimumTime: 1,
          maximumTime: 3
        }
      },
      {
        start: moment('2017/09/10 08:00 am'),
        end: moment('2017/09/10 12:00 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.HOUR,
          minimumTime: 1,
          maximumTime: 3
        }
      }
    ];
    const finalBookings = validateBookingsByTimeslot(bookings,);
    expect(finalBookings[0].endEventTime).toEqual('6:00 AM');
    expect(finalBookings[1].startEventTime).toEqual('6:00 AM');
    expect(finalBookings[1].endEventTime).toEqual('8:00 AM');
    expect(finalBookings[2].endEventTime).toEqual('11:00 AM');
  });
  it('method validateBookingsByTimeslot returns validated day bookings', () => {
    const bookings = [
      {
        start: moment('2017/09/10'),
        end: moment('2017/09/10'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.DAY,
          minimumTime: 2,
          maximumTime: 3
        }
      },
      {
        start: moment('2017/09/10'),
        end: moment('2017/09/12'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.DAY,
          minimumTime: 2,
          maximumTime: 3
        }
      },
      {
        start: moment('2017/09/10'),
        end: moment('2017/09/15'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.DAY,
          minimumTime: 2,
          maximumTime: 3
        }
      }
    ];
    const finalBookings = validateBookingsByTimeslot(bookings,);
    expect(finalBookings[0].endEventDate).toEqual('2017 Sep 12');
    expect(finalBookings[1].startEventDate).toEqual('2017 Sep 10');
    expect(finalBookings[1].endEventDate).toEqual('2017 Sep 12');
    expect(finalBookings[2].endEventDate).toEqual('2017 Sep 13');
  });
  it('method validateBookingsByTimeslot returns validated week bookings', () => {
    const bookings = [
      {
        start: moment('2017/09/10'),
        end: moment('2017/09/16'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.WEEK,
          minimumTime: 2,
          maximumTime: 3
        }
      },
      {
        start: moment('2017/09/10'),
        end: moment('2017/09/17'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.WEEK,
          minimumTime: 2,
          maximumTime: 3
        }
      },
      {
        start: moment('2017/09/10'),
        end: moment('2017/10/10'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.WEEK,
          minimumTime: 2,
          maximumTime: 3
        }
      }
    ];
    const finalBookings = validateBookingsByTimeslot(bookings,);
    expect(finalBookings[0].endEventDate).toEqual('2017 Sep 24');
    expect(finalBookings[1].startEventDate).toEqual('2017 Sep 10');
    expect(finalBookings[1].endEventDate).toEqual('2017 Sep 24');
    expect(finalBookings[2].endEventDate).toEqual('2017 Oct 01');
  });
  it('method validateBookingsByTimeslot returns validated month bookings', () => {
    const bookings = [
      {
        start: moment('2017/09/01'),
        end: moment('2017/09/17'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.MONTH,
          minimumTime: 2,
          maximumTime: 3
        }
      },
      {
        start: moment('2017/09/01'),
        end: moment('2017/10/17'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.MONTH,
          minimumTime: 2,
          maximumTime: 3
        }
      },
      {
        start: moment('2017/09/01'),
        end: moment('2017/12/17'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.MONTH,
          minimumTime: 2,
          maximumTime: 3
        }
      }
    ];
    const finalBookings = validateBookingsByTimeslot(bookings,);
    expect(finalBookings[0].endEventDate).toEqual('2017 Nov 01');
    expect(finalBookings[1].startEventDate).toEqual('2017 Sep 01');
    expect(finalBookings[1].endEventDate).toEqual('2017 Nov 01');
    expect(finalBookings[2].endEventDate).toEqual('2017 Dec 01');
  });
  it('method validateBookingsByTimeslot returns validated date-range bookings', () => {
    const bookings = [
      {
        start: moment('2017-09-10 05:00 am'),
        end: moment('2017-09-10 06:00 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.DEFINED_DATE_RANGE,
          definedDateRange: [
            {
              id: 166,
              name: "2017 Sep 10 05:00 am to 2017 Sep 10 06:30 am"
            },
            {
              id: 167,
              name: "2017 Sep 09 05:00 am to 2017 Sep 09 06:30 am"
            }
          ]
        }
      },
      {
        start: moment('2017/09/11 05:00 am'),
        end: moment('2017/09/11 06:30 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.DEFINED_DATE_RANGE,
          definedDateRange: [
            {
              id: 166,
              name: "2017 Sep 10 05:00 am to 2017 Sep 10 06:30 am"
            },
            {
              id: 167,
              name: "2017 Sep 09 05:00 am to 2017 Sep 09 06:30 am"
            }
          ]
        }
      }
    ];
    const finalBookings = validateBookingsByTimeslot(bookings);
    expect(finalBookings[0].definedDateRange.some(dr => dr.id === 166 && dr.selected)).toBeTruthy();
    expect(finalBookings[1].definedDateRange.some(dr => dr.id === 166 && dr.selected)).toBeTruthy();
  });
  it('method validateBookingsByTimeslot returns validated date-range bookings when choose the end is the start of the date range', () => {
    const bookings = [
      {
        start: moment('2017-09-08 05:00 am'),
        end: moment('2017-09-11 00:00 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.DEFINED_DATE_RANGE,
          definedDateRange: [
            {
              id: 166,
              name: "2017 Sep 11 00:00 am to 2017 Sep 12 06:30 am"
            },
            {
              id: 167,
              name: "2017 Sep 08 05:00 am to 2017 Sep 09 06:30 am"
            }
          ]
        }
      }
    ];
    const finalBookings = validateBookingsByTimeslot(bookings);
    expect(finalBookings.length).toBe(1);
    expect(finalBookings[0].definedDateRange[1].selected).toBeTruthy();
    expect(finalBookings[0].definedDateRange[0].selected).toBeFalsy();
  });
  
  it('method validateBookingsByTimeslot returns validated rental-block bookings', () => {
    const bookings = [
      {
        start: moment('2017-09-10 04:00 am'),
        end: moment('2017-09-11 10:00 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.RENTAL_BLOCK,
          rentalBlock: [
            {
              id: 1,
              name: "03:00 am to 05:00 am"
            },
            {
              id: 2,
              name: "03:30 am to 06:00 am"
            },
            {
              id: 3,
              name: "03:30 am to 07:00 am"
            },
            {
              id: 4,
              name: "07:00 am to 10:00 am"
            },
            {
              id: 5,
              name: "07:00 am to 09:00 am"
            },
            {
              id: 6,
              name: "07:30 am to 10:00 am"
            },
            {
              id: 7,
              name: "06:00 am to 07:00 am"
            },
          ]
        }
      },
      {
        start: moment('2017/09/11 03:00 am'),
        end: moment('2017/09/11 04:30 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.RENTAL_BLOCK,
          rentalBlock: [
            {
              name: "05:00 am to 06:30 am"
            }
          ]
        }
      }
    ];
    const finalBookings = validateBookingsByTimeslot(bookings);
    expect(finalBookings[0].rentalBlock[6].selected).toBeTruthy();
    expect(finalBookings[1].rentalBlock[3].selected).toBeTruthy();
    expect(finalBookings[2].rentalBlock[0].selected).toBeTruthy();
    expect(finalBookings[3].rentalBlock[0].selected).toBeTruthy();
  });
  it('method validateBookingsByTimeslot returns validated rental-block bookings when create two days bookings in the month view.', () => {
    const bookings = [
      {
        start: moment('2017-09-10 12:00 am'),
        end: moment('2017-09-12 12:00 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.RENTAL_BLOCK,
          rentalBlock: [
            {
              id: 1,
              name: "03:00 am to 05:00 am"
            },
            {
              id: 2,
              name: "03:30 am to 06:00 am"
            },
            {
              id: 3,
              name: "03:30 am to 07:00 am"
            },
            {
              id: 4,
              name: "07:00 am to 10:00 am"
            },
            {
              id: 5,
              name: "07:00 am to 09:00 am"
            },
            {
              id: 6,
              name: "07:30 am to 10:00 am"
            },
            {
              id: 7,
              name: "06:00 am to 07:00 am"
            },
          ]
        }
      }
    ];
    const finalBookings = validateBookingsByTimeslot(bookings);
    expect(finalBookings.length).toBe(6);
    expect(finalBookings[0].rentalBlock[0].selected).toBeTruthy();
    expect(finalBookings[0].startEventDate).toEqual('2017 Sep 10');
    expect(finalBookings[1].rentalBlock[6].selected).toBeTruthy();
    expect(finalBookings[1].startEventDate).toEqual('2017 Sep 10');
    expect(finalBookings[2].rentalBlock[3].selected).toBeTruthy();
    expect(finalBookings[2].startEventDate).toEqual('2017 Sep 10');
    expect(finalBookings[3].rentalBlock[0].selected).toBeTruthy();
    expect(finalBookings[3].startEventDate).toEqual('2017 Sep 11');
    expect(finalBookings[4].rentalBlock[6].selected).toBeTruthy();
    expect(finalBookings[4].startEventDate).toEqual('2017 Sep 11');
    expect(finalBookings[5].rentalBlock[3].selected).toBeTruthy();
    expect(finalBookings[5].startEventDate).toEqual('2017 Sep 11');
  });
  it('method validateBookingsByTimeslot returns validated overnight bookings', () => {
    const bookings = [
      {
        start: moment('2017/09/10 6:00 am'),
        end: moment('2017/09/10 7:00 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.OVER_NIGHT,
          minimumTime: 2,
          maximumTime: 3
        }
      },
      {
        start: moment('2017/09/10 06:00 am'),
        end: moment('2017/09/12 07:00 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.OVER_NIGHT,
          minimumTime: 2,
          maximumTime: 3
        }
      },
      {
        start: moment('2017/09/10 00:00 am'),
        end: moment('2017/09/15 00:00 am'),
        resource: {
          reservationPeriodUnit: reservationPeriodUnit.OVER_NIGHT,
          minimumTime: 2,
          maximumTime: 3
        }
      }
    ];
    const noop = (bookings) => {
    };
    const finalBookings = validateBookingsByTimeslot(bookings, noop);
    expect(finalBookings[0].startEventDate).toEqual('2017 Sep 10');
    expect(finalBookings[0].startEventTime).toEqual('12:00 AM');
    expect(finalBookings[0].endEventDate).toEqual('2017 Sep 12');
    expect(finalBookings[0].endEventTime).toEqual('12:00 AM');
    expect(finalBookings[1].startEventDate).toEqual('2017 Sep 10');
    expect(finalBookings[1].startEventTime).toEqual('12:00 AM');
    expect(finalBookings[1].endEventDate).toEqual('2017 Sep 13');
    expect(finalBookings[1].endEventTime).toEqual('12:00 AM');
    expect(finalBookings[2].startEventDate).toEqual('2017 Sep 10');
    expect(finalBookings[2].startEventTime).toEqual('12:00 AM');
    expect(finalBookings[2].endEventDate).toEqual('2017 Sep 13');
    expect(finalBookings[2].endEventTime).toEqual('12:00 AM');
  });

  it('method isRangeCovered should work fine', () => {
    const a = {
      rangeStartTime: moment('2017/09/10 6:00 am'),
      rangeEndTime: moment('2017/09/10 9:00 am')
    };
    const a1 = {
      rangeStartTime: moment('2017/09/10 5:00 am'),
      rangeEndTime: moment('2017/09/10 9:00 am')
    };
    const a2 = {
      rangeStartTime: moment('2017/09/10 7:00 am'),
      rangeEndTime: moment('2017/09/10 9:00 am')
    };
    const a3 = {
      rangeStartTime: moment('2017/09/10 6:00 am'),
      rangeEndTime: moment('2017/09/10 10:00 am')
    };
    const a4 = {
      rangeStartTime: moment('2017/09/10 6:00 am'),
      rangeEndTime: moment('2017/09/10 8:00 am')
    };
    const a5 = {
      rangeStartTime: moment('2017/09/10 6:00 am'),
      rangeEndTime: moment('2017/09/10 9:00 am')
    };
    const a6 = {
      rangeStartTime: moment('2017/09/10 5:00 am'),
      rangeEndTime: moment('2017/09/10 6:00 am')
    };
    const a7 = {
      rangeStartTime: moment('2017/09/10 9:00 am'),
      rangeEndTime: moment('2017/09/10 10:00 am')
    };
    const a8 = {
      rangeStartTime: moment('2017/09/10 4:00 am'),
      rangeEndTime: moment('2017/09/10 5:00 am')
    };
    const a9 = {
      rangeStartTime: moment('2017/09/10 10:00 am'),
      rangeEndTime: moment('2017/09/10 11:00 am')
    };

    expect(isRangeCovered(a.rangeStartTime, a.rangeEndTime, a1.rangeStartTime, a1.rangeEndTime)).toBeTruthy();
    expect(isRangeCovered(a.rangeStartTime, a.rangeEndTime, a2.rangeStartTime, a2.rangeEndTime)).toBeTruthy();
    expect(isRangeCovered(a.rangeStartTime, a.rangeEndTime, a3.rangeStartTime, a3.rangeEndTime)).toBeTruthy();
    expect(isRangeCovered(a.rangeStartTime, a.rangeEndTime, a4.rangeStartTime, a4.rangeEndTime)).toBeTruthy();
    expect(isRangeCovered(a.rangeStartTime, a.rangeEndTime, a5.rangeStartTime, a5.rangeEndTime)).toBeTruthy();
    expect(isRangeCovered(a.rangeStartTime, a.rangeEndTime, a6.rangeStartTime, a6.rangeEndTime)).toBeTruthy();
    expect(isRangeCovered(a.rangeStartTime, a.rangeEndTime, a7.rangeStartTime, a7.rangeEndTime)).toBeTruthy();
    expect(isRangeCovered(a.rangeStartTime, a.rangeEndTime, a8.rangeStartTime, a8.rangeEndTime)).toBeFalsy();
    expect(isRangeCovered(a.rangeStartTime, a.rangeEndTime, a9.rangeStartTime, a9.rangeEndTime)).toBeFalsy();
  });
  it('method checkRangeBookingOverlap should work fine', () => {
    const a = {
      rangeStartTime: moment('2017/09/10 6:00 am'),
      rangeEndTime: moment('2017/09/10 9:00 am')
    };
    const a1 = {
      rangeStartTime: moment('2017/09/10 5:00 am'),
      rangeEndTime: moment('2017/09/10 9:00 am')
    };
    const a2 = {
      rangeStartTime: moment('2017/09/10 7:00 am'),
      rangeEndTime: moment('2017/09/10 9:00 am')
    };
    const a3 = {
      rangeStartTime: moment('2017/09/10 6:00 am'),
      rangeEndTime: moment('2017/09/10 10:00 am')
    };
    const a4 = {
      rangeStartTime: moment('2017/09/10 6:00 am'),
      rangeEndTime: moment('2017/09/10 8:00 am')
    };
    const a5 = {
      rangeStartTime: moment('2017/09/10 6:00 am'),
      rangeEndTime: moment('2017/09/10 9:00 am')
    };
    const a6 = {
      rangeStartTime: moment('2017/09/10 5:00 am'),
      rangeEndTime: moment('2017/09/10 6:00 am')
    };
    const a7 = {
      rangeStartTime: moment('2017/09/10 9:00 am'),
      rangeEndTime: moment('2017/09/10 10:00 am')
    };
    const a8 = {
      rangeStartTime: moment('2017/09/10 4:00 am'),
      rangeEndTime: moment('2017/09/10 5:00 am')
    };
    const a9 = {
      rangeStartTime: moment('2017/09/10 10:00 am'),
      rangeEndTime: moment('2017/09/10 11:00 am')
    };

    expect(checkRangeBookingOverlap(a, a1)).toBeTruthy();
    expect(checkRangeBookingOverlap(a, a2)).toBeTruthy();
    expect(checkRangeBookingOverlap(a, a3)).toBeTruthy();
    expect(checkRangeBookingOverlap(a, a4)).toBeTruthy();
    expect(checkRangeBookingOverlap(a, a5)).toBeTruthy();
    expect(checkRangeBookingOverlap(a, a6)).toBeFalsy();
    expect(checkRangeBookingOverlap(a, a7)).toBeFalsy();
    expect(checkRangeBookingOverlap(a, a8)).toBeFalsy();
    expect(checkRangeBookingOverlap(a, a9)).toBeFalsy();
  });
  it('method compareRangeIndexBooking should work fine', () => {
    const a = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 6:00 am'),
        rangeDiff: 180
      },
      index: 6
    };
    const b1 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 6:00 am'),
        rangeDiff: 180
      },
      index: 5
    };
    const b2 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 6:00 am'),
        rangeDiff: 180
      },
      index: 7
    };
    const c1 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 6:00 am'),
        rangeDiff: 120
      },
      index: 5
    };
    const c2 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 6:00 am'),
        rangeDiff: 240
      },
      index: 7
    };
    const d1 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 5:00 am'),
        rangeDiff: 120
      },
      index: 5
    };
    const d2 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 7:00 am'),
        rangeDiff: 240
      },
      index: 7
    };

    expect(compareRangeIndexBooking(a, b1)).toEqual(b1);
    expect(compareRangeIndexBooking(a, b2)).toEqual(a);
    expect(compareRangeIndexBooking(a, c1)).toEqual(a);
    expect(compareRangeIndexBooking(a, c2)).toEqual(c2);
    expect(compareRangeIndexBooking(a, d1)).toEqual(d1);
    expect(compareRangeIndexBooking(a, d2)).toEqual(a);
  })
  it('method selectAllRangeIndexBooking should work fine', () => {
    const a = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 6:00 am'),
        rangeEndTime: moment('2017/09/10 9:00 am'),
        rangeDiff: 180
      },
      index: 6
    };
    const b1 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 6:00 am'),
        rangeEndTime: moment('2017/09/10 9:00 am'),
        rangeDiff: 180
      },
      index: 5
    };
    const b2 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 6:00 am'),
        rangeEndTime: moment('2017/09/10 9:00 am'),
        rangeDiff: 180
      },
      index: 7
    };
    const c1 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 6:00 am'),
        rangeEndTime: moment('2017/09/10 8:00 am'),
        rangeDiff: 120
      },
      index: 5
    };
    const c2 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 6:00 am'),
        rangeEndTime: moment('2017/09/10 10:00 am'),
        rangeDiff: 240
      },
      index: 7
    };
    const d1 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 5:00 am'),
        rangeEndTime: moment('2017/09/10 7:00 am'),
        rangeDiff: 120
      },
      index: 5
    };
    const d2 = {
      rangeBooking: {
        rangeStartTime: moment('2017/09/10 7:00 am'),
        rangeEndTime: moment('2017/09/10 11:00 am'),
        rangeDiff: 240
      },
      index: 7
    };

    const result = selectAllRangeIndexBooking([a, b1, b2, c1, c2, d1, d2]);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(d1.rangeBooking);
    expect(result[1]).toEqual(d2.rangeBooking);
  });
});
