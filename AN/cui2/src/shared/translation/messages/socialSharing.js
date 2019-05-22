import {defineMessages} from "react-intl";

export const PREFIX = "app.socailSharing";

/**
 * Common part for error pages.
 */
export default defineMessages({
  facebookAriaLabelText: {
    id: `${PREFIX}.facebookAriaLabelText`,
    defaultMessage: "Facebook"
  },
  twitterAriaLabelText: {
    id: `${PREFIX}.twitterAriaLabelText`,
    defaultMessage: "Twitter"
  },
  twitterTooltip: {
    id: `${PREFIX}.twitterTip`,
    defaultMessage: "Share on Twitter"
  },
  facebookTooltip: {
    id: `${PREFIX}.facebookTooltip`,
    defaultMessage: "Share on Facebook"
  }
});