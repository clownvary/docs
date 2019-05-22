export default function feesOrderByRecurring(list) {
  let facilities = [];

  if (list.length) {
    facilities = list.map((facility) => {
      if (facility.scheduleFees.length) {
        // if (masterFacilityScheduleId > 0), the schedule is a recurring-schedule;
        // if (masterFacilityScheduleId === 0), the schedule is a normal-schedule;
        const normalScheduleFees = facility.scheduleFees
                                     .filter(schedule => !schedule.masterFacilityScheduleID);
        const recurringScheduleFees = facility.scheduleFees
                                        .filter(schedule => schedule.masterFacilityScheduleID);

        const scheduleFees = normalScheduleFees.map(normal => ({
          ...normal,
          recurringScheduleFees: recurringScheduleFees.filter(item =>
            item.masterFacilityScheduleID === normal.facilityScheduleID
          )
        }));

        return { ...facility, scheduleFees };
      }

      return facility;
    });
  }

  return facilities;
}
