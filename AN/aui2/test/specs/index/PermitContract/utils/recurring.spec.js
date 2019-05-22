import { buildSummary } from 'index/PermitContract/utils/recurring';

it('method buildSummary should work fine', () => {
  const startDate = '01/09/2017';
  const startTime = '2:00 AM';
  const endDate = '01/09/2017';
  const endTime = '5:00 AM';
  let type = 1;
  let frequency = 0;
  const selectedDates = ['01/09/2017', '02/09/2017'];
  let isDayOfMonth = false;

  let result = buildSummary({
    startDate,
    startTime,
    endDate,
    endTime,
    type,
    frequency,
    selectedDates,
    isDayOfMonth
  });
  expect(result).toEqual('Occurs every day effective 01/09/2017 until 01/09/2017 from 2:00 AM to 5:00 AM');

  result = buildSummary({
    startDate,
    startTime,
    endDate,
    endTime,
    type,
    frequency: 2,
    selectedDates,
    isDayOfMonth
  });
  expect(result).toEqual('Occurs every 2 days effective 01/09/2017 until 01/09/2017 from 2:00 AM to 5:00 AM');

  result = buildSummary({
    startDate,
    startTime,
    endDate,
    endTime,
    type: 2,
    frequency,
    selectedDates,
    isDayOfMonth
  });
  expect(result).toEqual('Occurs every Monday effective 01/09/2017 until 01/09/2017 from 2:00 AM to 5:00 AM');

  result = buildSummary({
    startDate,
    startTime,
    endDate,
    endTime,
    type: 2,
    frequency: 2,
    selectedDates,
    isDayOfMonth
  });
  expect(result).toEqual('Occurs every 2 weeks on Monday effective 01/09/2017 until 01/09/2017 from 2:00 AM to 5:00 AM');

  result = buildSummary({
    startDate,
    startTime,
    endDate,
    endTime,
    type: 3,
    frequency,
    selectedDates
  });
  expect(result).toEqual('Occurs the second Monday of every 0 month(s) effective 01/09/2017 until 01/09/2017 from 2:00 AM to 5:00 AM');

  result = buildSummary({
    startDate,
    startTime,
    endDate,
    endTime,
    type: 3,
    frequency: 3,
    selectedDates,
    isDayOfMonth: true
  });
  expect(result).toEqual('Occurs day 9 of every 3 month(s) effective 01/09/2017 until 01/09/2017 from 2:00 AM to 5:00 AM');

  result = buildSummary({
    startDate,
    startTime,
    endDate,
    endTime,
    type: 4,
    frequency,
    selectedDates,
    isDayOfMonth
  });
  expect(result).toEqual('Occurs on selected dates: 01/09/2017, 02/09/2017');

  result = buildSummary({
    startDate,
    startTime,
    endDate,
    endTime,
    type: 4,
    frequency: 2,
    selectedDates,
    isDayOfMonth
  });
  expect(result).toEqual('Occurs on selected dates: 01/09/2017, 02/09/2017');

  result = buildSummary({
    startDate,
    startTime,
    endDate,
    endTime,
    type: -1,
    frequency,
    selectedDates,
    isDayOfMonth
  });
  expect(result).toEqual(undefined);
});
