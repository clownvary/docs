const groupDatesById = (dates, datesKey, idKey) =>
  dates.filter(item => item[datesKey] && item[datesKey].length > 0)
    .reduce((acc, cur) => {
      const id = cur[idKey];
      const dateArray = cur[datesKey];
      acc[id] = dateArray.join(' / ');
      return acc;
    }, {});

export default groupDatesById;
