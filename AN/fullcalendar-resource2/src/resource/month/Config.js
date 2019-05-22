"use strict";

import ResourceMonthView from "./ResourceMonthView";

/**
 * Configuration of resource week view.
 */
export default {
  "class": ResourceMonthView,
  "defaults": {
    "limitHeaderWidth": 190,
    "defaultResourcesIndex": 0,
    "fixedAxisWidth": 50,
    "fixedWeekCount": true,
    "buttonText": "rsmonth"
  },
  "duration": {
    "months": 1
  }
}
