import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import bookingAssignments from '../consts/bookingAssignments';
import reservationColorType from '../consts/reservationColorType';

const {
  reservationColorType: colorType,
  NoPermitColorTypes,
  defaultEventTypeStyle,
  eventTypeColorList
} = window.__resourceCalender__.__initialState__;

const NoPermitColorTypesObj = convertCasingPropObj(NoPermitColorTypes);
const defaultEventTypeStyleObj = convertCasingPropObj(defaultEventTypeStyle);
const eventTypeColorListObj = convertCasingPropObj(eventTypeColorList);

const prefix = 'event_type';

const getEventTypeColorMap = () => {
  const map = {};
  eventTypeColorListObj.forEach((eventTypeColor) => {
    map[`${prefix}_${eventTypeColor.id}`] = {
      backgroundColor: eventTypeColor.style.backgroundColor,
      textColor: eventTypeColor.style.textColor
    };
  });

  return map;
};

const eventTypeColorMap = getEventTypeColorMap();

export const getEventTypeStyle = (eventTypeID, bookingAssignment) => {
  let style = null;
  switch (bookingAssignment) {
    case bookingAssignments.LEAGUE:
      style = NoPermitColorTypesObj.league;
      break;
    case bookingAssignments.ACTIVITY:
      style = NoPermitColorTypesObj.activity;
      break;
    case bookingAssignments.PRIVATE_LESSON:
      style = NoPermitColorTypesObj.privateLesson;
      break;
    case bookingAssignments.DAYCARE_SESSION:
      style = NoPermitColorTypesObj.daycareSession;
      break;
    default:
      style = null;
      break;
  }

  if (reservationColorType.EVENT_TYPE === colorType && style === null) {
    if (eventTypeID && eventTypeColorMap[`${prefix}_${eventTypeID}`]) {
      style = eventTypeColorMap[`${prefix}_${eventTypeID}`];
    } else {
      style = defaultEventTypeStyleObj;
    }
  }

  return style;
};
