"use strict";

import "./week.less";

import ResourceDayView from "resource/day/ResourceDayView";
import ResourceTimeGrid from "./ResourceTimeGrid";
import ResourceDayGrid from "./ResourceDayGrid";
import SkeletonParser from "./temps/skeleton/SkeletonParser";
import SyncScrollers from "resource/tools/SyncScrollers";

export default class ResourceWeekView extends ResourceDayView {

  /**
   * @constructor
   * @param  {*} ...args [calendar, type, options, intervalDuration]
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @override
   * @return {Class} Instance of ResourceTimeGrid.
   */
  instantiateTimeGrid() {
    return new ResourceTimeGrid(this);
  }

  /**
   * @override
   * @return {Class} Instance of ResourceDayGrid.
   */
  instantiateDayGrid() {
    return new ResourceDayGrid(this);
  }

  renderDates() {
    super.renderDates(true);
    this.el.addClass("fc-resource-week-view");
  }

  renderSkeletonHtml() {
    let skeletonParser = new SkeletonParser(this);
    return skeletonParser.parse()
  }

  syncScroll() {
    super.syncScroll();
    let headerScrollEl = this.headerOutPutEl.find(".fc-scroll-bars");
    if(SyncScrollers.hasScrollbar(headerScrollEl[0], "x")){
      let actorScrollEl = this.el.find(".fc-scollbar-actor .fc-scroll-bars");
      let _syncScrollersX = new SyncScrollers("x", [headerScrollEl, actorScrollEl]);
    }
  }

  redisplay(remainScrollPosition) {
    let position;
    if(remainScrollPosition){
      let scrollBar = this.el.find(".fc-scollbar-actor .fc-scroll-bars");
      position = SyncScrollers.getScrollPosition(scrollBar);
    }
    super.redisplay(remainScrollPosition);
    if(remainScrollPosition){
      let scrollBar = this.el.find(".fc-scollbar-actor .fc-scroll-bars");
      SyncScrollers.scrollToPosition(scrollBar, position);
    }
  }

  /**
   * Render resources after fetching data from rsManager.
   * @override
   * @param  {Array} resources [description]
   */
  renderResources(resources) {
    this.insertFirstAllowedResources(resources);
    this.timeGrid.renderResources();
    if (this.dayGrid) {
      this.dayGrid.renderResources();
    }
  }

  setAllResourcesSuccessful(resources) {
    this.insertFirstAllowedResources(resources);
    this.redisplay(true);
  }

  insertFirstAllowedResources(resources) {
    if(resources){
      let index = this.opt("defaultResourcesIndex");
      let resource = resources[index] ? resources[index] : resources[0];
      this.calendar.setAllowedResources(resource ? [resource] : []);
    }
  }

}
