"use strict";

import {AgendaView} from "resource/FC";
import {BaseResourceViewMixin} from "./BaseResourceView";
import ObjectAssign from "object-assign";
import SyncScrollers from "resource/tools/SyncScrollers";

export default class BaseResourceAgendaView extends AgendaView{

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
    // debugger;
    this.el.addClass("fc-resource-view");
  }

  // Sets the view's scroll state. Will accept the same format computeInitialScroll and queryScroll produce.
  setScroll(top) {
    if(top && this.timeGrid){
      let position;
      let scrollBar = this.timeGrid.el.parent(".fc-scroll-bars");

      position = SyncScrollers.getScrollPosition(scrollBar);
      position.top = top;
      SyncScrollers.scrollToPosition(scrollBar, position);
    }
  }

}
ObjectAssign(BaseResourceAgendaView.prototype, BaseResourceViewMixin);
