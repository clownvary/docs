"use strict";

import {MonthView} from "resource/FC";
import {BaseResourceViewMixin} from "./BaseResourceView";
import ObjectAssign from "object-assign";

export default class BaseResourceMonthView extends MonthView{

  /**
   * Gain rsManager instance from Calendar.
   * @constructor
   * @param  {*} ...args [calendar, type, options, intervalDuration]
   */
  constructor(...args) {
    super(...args);
    this.rsManager = this.calendar.rsManager;
    this.addResourceListener();
  }

  renderDates() {
    super.renderDates();
    this.el.addClass("fc-resource-view");
  }

}

ObjectAssign(BaseResourceMonthView.prototype, BaseResourceViewMixin);
