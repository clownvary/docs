"use strict";

import ResourceDayView from "./ResourceDayView";

/**
 * Configuration of resource day view.
 */
export default {
  "type": "agenda",
  "class": ResourceDayView,
  "defaults": {
    "fixedAxisWidth": 50,
    "limitColWidth": 190,
    "buttonText": "rsday"
  },
  duration: {
    "days": 1
  }
}
