import {defineMessages} from "react-intl";

export const PREFIX = "app.errorPage";

/**
 * Common part for error pages.
 */
export default defineMessages({
  siteNotFound_title: {
    id: `${PREFIX}.siteNotFound_title`,
    defaultMessage: "Site Not Found"
  },
  siteNotFound_description: {
    id: `${PREFIX}.siteNotFound_description`,
    defaultMessage: "We are sorry, this site is not found."
  },
  siteUnavailable_title: {
    id: `${PREFIX}.siteUnavailable_title`,
    defaultMessage: "Site Unavailable"
  },
  siteUnavailable_description: {
    id: `${PREFIX}.siteUnavailable_description`,
    defaultMessage: "We are sorry, this page is temporarily unavailable. Please try again later."
  },
  pageNotFound_title: {
    id: `${PREFIX}.pageNotFound_title`,
    defaultMessage: "Page Not Found"
  },
  pageNotFound_description: {
    id: `${PREFIX}.pageNotFound_description`,
    defaultMessage: "We are sorry, this page is not found."
  }
});
