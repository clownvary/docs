"use strict";

import ResourceWeekView from "./ResourceWeekView";

/**
 * Configuration of resource week view.
 */
export default {
  "type": "agenda",
  "class": ResourceWeekView,
  "defaults": {
    "limitHeaderWidth": 190,
    "defaultResourcesIndex": 0,
    "fixedAxisWidth": 50,
    "buttonText": "rsweek"
  },
  "duration": {
    "week": 1
  }
}
