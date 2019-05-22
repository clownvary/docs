import moment from 'moment';
import Globalize from 'react-base-ui/lib/services/i18n';
import frequencyTypes from 'index/Payment/consts/frequencyTypes';
import genSchedules, { genModifiedSchedules } from 'index/Payment/utils/paymentScheduleGeneration';

function getSystemDateFormat(y, m, d) {
  return moment(new Date(y, m, d)).format(Globalize.ANDateFormat);
}

describe('index/Payment/utils/paymentScheduleGeneration', () => {
  describe('New', () => {
    it('frequencys == 1 (weekly) should work fine', (done) => {
      const result = genSchedules({
        paymentPlanAmount: 10,
        firstPaymentDate: '2017-01-24',
        frequencys: frequencyTypes.WEEKLY,
        numOfPayments: 3
      });

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(3);
      expect(result).toEqual([{
        dueDate: getSystemDateFormat(2017, 0, 24),
        amount: 3.33
      }, {
        dueDate: getSystemDateFormat(2017, 0, 31),
        amount: 3.33
      }, {
        dueDate: getSystemDateFormat(2017, 1, 7),
        amount: 3.34
      }]);
      done();
    });

    it('frequencys == 2 (every other week) should work fine', (done) => {
      const result = genSchedules({
        paymentPlanAmount: 531,
        firstPaymentDate: '2017-01-24',
        frequencys: frequencyTypes.EVERY_OTHER_WEEK,
        numOfPayments: 10
      });

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(10);
      expect(result[result.length - 1]).toEqual({
        amount: 53.1,
        dueDate: getSystemDateFormat(2017, 4, 30)
      });
      done();
    });

    it('frequencys == 3 (twice a month) should work fine', (done) => {
      const result = genSchedules({
        paymentPlanAmount: 53.67,
        firstPaymentDate: new Date(2017, 0, 31),
        frequencys: frequencyTypes.TWICE_A_MONTH,
        numOfPayments: 5
      });

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(5);
      expect(result[result.length - 1]).toEqual({
        dueDate: getSystemDateFormat(2017, 3, 1),
        amount: 10.75
      });
      done();
    });

    it('frequencys == 4 (monthly) should work fine', (done) => {
      const result = genSchedules({
        paymentPlanAmount: 53.67,
        firstPaymentDate: new Date(2017, 0, 31),
        frequencys: frequencyTypes.MONTHLY,
        numOfPayments: 7
      });

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(7);
      expect(result[result.length - 1]).toEqual({
        dueDate: getSystemDateFormat(2017, 6, 31),
        amount: 7.65
      });
      done();
    });

    it('frequencys == 5 (quarterly) should work fine', (done) => {
      const result = genSchedules({
        paymentPlanAmount: 53.67,
        firstPaymentDate: new Date(2017, 1, 28),
        frequencys: frequencyTypes.QUARTERLY,
        numOfPayments: 4
      });

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(4);
      expect(result[result.length - 1]).toEqual({
        dueDate: getSystemDateFormat(2017, 10, 28),
        amount: 13.41
      });
      done();
    });
    it('frequencys == 6 (every four weeks) should work fine', (done) => {
      const result = genSchedules({
        paymentPlanAmount: 53.67,
        firstPaymentDate: new Date(1900, 0, 28),
        frequencys: frequencyTypes.EVERY_FOUR_WEEKS,
        numOfPayments: 47
      });

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(47);
      expect(result[result.length - 1].amount).toBe(1.23);
      expect(result[result.length - 1].dueDate).toBe(getSystemDateFormat(1903, 7, 9));
      done();
    });
  });
  describe('Modify with paid', () => {
    it('paid result should work fine', (done) => {
      const result = genSchedules({
        paymentPlanAmount: 10,
        firstPaymentDate: new Date(2017, 0, 24),
        frequencys: frequencyTypes.WEEKLY,
        numOfPayments: 3,
        paid: 5
      });

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(3);
      expect(result).toEqual([{
        dueDate: getSystemDateFormat(2017, 0, 24),
        amount: 3.33,
        paid: 3.33
      }, {
        dueDate: getSystemDateFormat(2017, 0, 31),
        amount: 3.33,
        paid: 1.67
      }, {
        dueDate: getSystemDateFormat(2017, 1, 7),
        amount: 3.34,
        paid: 0
      }]);
      done();
    });
  });

  describe('method genModifiedSchedules', () => {
    it('genModifiedSchedules method should work fine', () => {
      const schedules = [{ amount: 200 }, { amount: 300 }, { amount: 400 }];
      expect(genModifiedSchedules(schedules, 400)).toEqual([
        { amount: 200, paid: 200 },
        { amount: 300, paid: 200 },
        { amount: 400, paid: 0 }
      ]);
    });
  });
});
