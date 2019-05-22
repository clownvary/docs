import {defineMessages} from "react-intl";

export const PREFIX = "app.validation";

/**
 * Common part for error pages.
 */
export default defineMessages({
  required: {
    id: `${PREFIX}.required`,
    defaultMessage: "Required"
  },
  requiredMark: {
    id: `${PREFIX}.requiredMark`,
    defaultMessage: '(Required)'
  }
});
