import {defineMessages} from "react-intl";

export const PREFIX = "app.modules.common.CommonMessages";

/**
 * Common part for ShoppingCart and Checkout page.
 */
//&copy 2016 <a style=\"padding-right:0px;\" href=\"#\" onclick=\"http://active.com\"> Active Network, LLC </a> and/or its affiliates and licensors. All rights reserved.
//© 2016 Active Network, LLC and/or its affiliates and licensors.All rights reserved.
export default defineMessages({
  logoTitle: {
    id: `${PREFIX}.logoTitle`,
    defaultMessage: "ACTIVE NET LOGO"
  },
  logoAlt: {
    id: `${PREFIX}.logoAlt`,
    defaultMessage: "ACTIVE LOGO"
  },
  loadingText: {
    id: `${PREFIX}.loadingText`,
    defaultMessage: "Loading..."
  },
  menuText: {
    id: `${PREFIX}.menuText`,
    defaultMessage: "menu"
  },
  emptyText: {
    id: `${PREFIX}.emptyText`,
    defaultMessage: "empty"
  },
  navigationDesc: {
    id: `${PREFIX}.navigationDesc`,
    defaultMessage: " In the mobile site, unlisted modules are not supported."
  },
  navigationMoreInfo: {
    id: `${PREFIX}.navigationMoreInfo`,
    defaultMessage: "For more information, go to the"
  },
  fullSite: {
    id: `${PREFIX}.fullSite`,
    defaultMessage: "full site"
  }
});
