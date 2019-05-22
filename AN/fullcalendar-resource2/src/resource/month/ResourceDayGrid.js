"use strict";

import {DayGrid} from "resource/FC";
import {BaseResourceGridMixin} from "resource/common/grid/BaseResourceGrid";
import ObjectAssign from "object-assign";

export default class ResourceDayGrid extends DayGrid {

}

ObjectAssign(ResourceDayGrid.prototype, BaseResourceGridMixin);
