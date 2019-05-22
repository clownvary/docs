import {defineMessages} from "react-intl";

export const PREFIX = "app.route";

/**
 * Common part for button text.
 */
export default defineMessages({
  home: {
    id: `${PREFIX}.home`,
    defaultMessage: "Home"
  },
  checkout: {
    id: `${PREFIX}.checkout`,
    defaultMessage: "Check Out"
  },
  confirmation: {
    id: `${PREFIX}.confirmation`,
    defaultMessage: "Confirmation"
  },
  balance: {
    id: `${PREFIX}.balance`,
    defaultMessage: "Outstanding Balances"
  },
  aaoffer: {
    id: `${PREFIX}.aaoffer`,
    defaultMessage: "ACTIVE Advantage Offer"
  }
});
