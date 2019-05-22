import {defineMessages} from "react-intl";

export const PREFIX = "app.wording";

/**
 * Common part for button text.
 */
export default defineMessages({
  add: {
    id: `${PREFIX}.item`,
    defaultMessage: "item"
  },
  delete: {
    id: `${PREFIX}.items`,
    defaultMessage: "items"
  }
});
