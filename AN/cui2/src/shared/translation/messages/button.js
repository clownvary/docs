import {defineMessages} from "react-intl";

export const PREFIX = "app.buttons";

/**
 * Common part for button text.
 */
export default defineMessages({
  add: {
    id: `${PREFIX}.add`,
    defaultMessage: "Add"
  },
  delete: {
    id: `${PREFIX}.delete`,
    defaultMessage: "Delete"
  },
  checkout: {
    id: `${PREFIX}.checkout`,
    defaultMessage: "Check Out"
  },
  finish: {
    id: `${PREFIX}.finish`,
    defaultMessage: "Finish"
  },
  donate: {
    id: `${PREFIX}.donate`,
    defaultMessage: "Donate"
  },
  ok: {
    id: `${PREFIX}.ok`,
    defaultMessage: "OK"
  },
  pay: {
    id: `${PREFIX}.pay`,
    defaultMessage: "Pay"
  },
  continue: {
    id: `${PREFIX}.continue`,
    defaultMessage: "Continue"
  },
  next: {
    id: `${PREFIX}.next`,
    defaultMessage: "Next"
  },
  apply: {
    id: `${PREFIX}.apply`,
    defaultMessage: "Apply"
  }
});
