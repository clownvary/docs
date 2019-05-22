import {defineMessages} from "react-intl";

export const PREFIX = "app.modules.daycare.common.sessionCard";

/**
 * Common part for Program and Enrollment page.
 */
export default defineMessages({
  exceptionDates: {
    id: `${PREFIX}.exceptionDates`,
    defaultMessage: "Exception Date(s): "
  },
  extraDates: {
    id: `${PREFIX}.extraDates`,
    defaultMessage: "Include Extra Date(s): "
  },
  includeFullDates: {
    id: `${PREFIX}.includeFullDates`,
    defaultMessage: "Include full date(s):"
  },
  enrolledWaitlistedDates: {
    id: `${PREFIX}.enrolledWaitlistedDates`,
    defaultMessage: "Except {datesType} dates: "
  },
  exceptFullDates: {
    id: `${PREFIX}.exceptFullDates:`,
    defaultMessage: "Except full dates: "
  },
  enrolled: {
    id: `${PREFIX}.enrolled`,
    defaultMessage: "enrolled"
  },
  waitlisted: {
    id: `${PREFIX}.waitlisted`,
    defaultMessage: "waitlisted"
  },
  full: {
    id: `${PREFIX}.full`,
    defaultMessage: "Full"
  },
  partiallyFull: {
    id: `${PREFIX}.partiallyFull`,
    defaultMessage: "Partially Full"
  },
  waitingList: {
    id: `${PREFIX}.waitingList`,
    defaultMessage: "Waiting list"
  },

});
