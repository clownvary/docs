import moment from 'moment';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import frequencyTypes from 'index/Payment/consts/frequencyTypes';

function bumpDateDuration({ paymentDate, frequencys, initDayOfmonthly, duration }) {
  const resultDate = moment(paymentDate);
  let increase;
  let date = resultDate.date();

  switch (frequencys) {
    case frequencyTypes.WEEKLY:
      resultDate.add({ days: 7 * duration }); break; // weekly
    case frequencyTypes.EVERY_OTHER_WEEK:
      resultDate.add({ days: 14 * duration }); break; // every other week
    case frequencyTypes.TWICE_A_MONTH:
      resultDate.add({ days: 15 * duration }); break; // twice a month
    case frequencyTypes.EVERY_FOUR_WEEKS:
      resultDate.add({ days: 28 * duration }); break; // every four weeks
    default:  // monthly & quarterly
      increase = frequencys === frequencyTypes.MONTHLY ? 1 : 3;
      resultDate.add({ months: increase * duration });
      /* istanbul ignore else */
      if (initDayOfmonthly) {
        date = initDayOfmonthly;
        if (date > resultDate.daysInMonth()) {
          date = resultDate.daysInMonth();
        }
        resultDate.date(date);
      }
  }
  return resultDate.toDate();
}

function bumpDate(data) {
  return bumpDateDuration({ ...data, duration: 1 });
}

export default function genSchedules(
  { paymentPlanAmount = 0, firstPaymentDate, numOfPayments, frequencys, paid = 0 }
) {
  const schedule = [];
  let avg;
  let initDayOfmonthly;
  let paymentDate;
  let amount;
  let subPaid = 0;
  let totalPaid = paid;
  /* istanbul ignore else */
  if (paymentPlanAmount && firstPaymentDate && numOfPayments && frequencys) {
    avg = Math.round((paymentPlanAmount / numOfPayments) * 100) / 100;

    const firstPaymentDateObj = DateTimeFormat.parseDate(firstPaymentDate).toDate();
    initDayOfmonthly = firstPaymentDateObj.getDate();
    paymentDate = firstPaymentDateObj;
    amount = paymentPlanAmount;
    for (let i = 0; i < numOfPayments; i += 1) {
      if (i + 1 === numOfPayments) avg = Math.round(amount * 100) / 100;
      amount -= avg;
      if (totalPaid > 0) {
        subPaid = Math.min(totalPaid, avg);
        totalPaid -= subPaid;
      } else {
        subPaid = 0;
      }
      schedule.push(Object.assign({
        amount: parseFloat(avg.toFixed(2)),
        dueDate: DateTimeFormat.formatDate(paymentDate)
      }, paid ? { paid: parseFloat(subPaid.toFixed(2)) } : {}));
      paymentDate = bumpDate({ paymentDate, frequencys, initDayOfmonthly });
    }
  }
  return schedule;
}

export const genModifiedSchedules = (schedules, paid) => {
  let subPaid = 0;
  let totalPaid = paid;

  return schedules.map((schedule) => {
    const amount = schedule.amount;

    if (totalPaid > 0) {
      subPaid = Math.min(totalPaid, amount);
      totalPaid -= subPaid;
    } else {
      subPaid = 0;
    }

    return {
      ...schedule,
      paid: parseFloat(subPaid.toFixed(2)) || 0
    };
  });
};
