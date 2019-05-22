"use strict";

import "./day.less";

import {matchCellWidths} from "resource/FC";
import BaseResourceAgendaView from "resource/common/view/BaseResourceAgendaView";
import ResourceTimeGrid from "./ResourceTimeGrid";
import ResourceDayGrid from "./ResourceDayGrid";
import SkeletonParser from "./temps/skeleton/SkeletonParser";
import SyncScrollers from "resource/tools/SyncScrollers";

export default class ResourceDayView extends BaseResourceAgendaView {

  /**
   * @constructor
   * @param  {*} ...args [calendar, type, options, intervalDuration]
   */
  constructor(...args) {
    super(...args);
  }

  renderSkeletonHtml() {
    let skeletonParser = new SkeletonParser(this);
    return skeletonParser.parse()
  }

  renderDates(emitFromChildView) {
    super.renderDates();
    if(!emitFromChildView){
      this.el.addClass("fc-resource-day-view");
    }
    this.el.html(this.renderSkeletonHtml());
    this.renderHead();
    this.setGridElement();
    this.timeGrid.renderDates();
    if (this.dayGrid) {
      this.dayGrid.renderDates();
    }
  }

  renderHead() {
    this.headerEl = this.el.find(".fc-header");
    this.headerOutPutEl =
      this.headerEl.find(".fc-header-output")
      .append(this.timeGrid.renderHeadHtml());
    this.headRowEl = this.headerOutPutEl.find(".fc-row");
  }

  unrenderDates() {
    this.timeGrid.unrenderDates();
  }

  setGridElement() {
    this.timeGrid.setElement(this.el.find('tbody .fc-time-grid-output'));
    this.timeGrid.setSlatsLabelEl(this.el.find('tbody .fc-slats-labels-container'));
    if (this.dayGrid) {
      this.dayGrid.setElement(this.el.find('tbody .fc-day-grid-output'));
    }
  }

  axisStyleAttr() {
    const axisWidth = this.opt("fixedAxisWidth") ? this.opt("fixedAxisWidth") : this.axisWidth;
    return axisWidth ? `style="width: ${axisWidth}px;flex: 0 0 ${axisWidth}px"` : "";
  }

  updateSize(isResize) {
    super.updateSize(isResize);
    let timeGridScrollEl = this.timeGrid.el.parent(".fc-scroll-bars");
    let timeGridHasScrollBar = SyncScrollers.hasScrollbar(timeGridScrollEl[0], "y");
    this.el[timeGridHasScrollBar ? "addClass" : "removeClass"]("time-grid-has-scrollbar");
    this.syncScroll();
  }

  updateWidth() {
    super.updateWidth();
    let width = this.timeGrid.updateWidth();
    if (this.dayGrid) {
      this.dayGrid.updateWidth(width);
    }

    const headerScrollEl   = this.headerOutPutEl.parent('.fc-scroll-bars')
    const headerScrollWidth = this.el.find('.fc-time-grid-container').outerWidth();
    headerScrollEl.width(headerScrollWidth);
  }

  setHeight(totalHeight, isAuto) {
    this.timeGrid.setHeight(totalHeight, isAuto);
    if (this.dayGrid) {
      // this.dayGrid.setHeight(totalHeight, isAuto);
    }
  }

  updateHeight(...args) {
    super.updateHeight(...args);
    this.trigger('windowResize');
  }

  syncScroll() {
    const timeGridScrollEl = this.timeGrid.el.parent(".fc-scroll-bars");
    const hasScrollbarX = SyncScrollers.hasScrollbar(timeGridScrollEl[0], "x");
    const hasScrollbarY = SyncScrollers.hasScrollbar(timeGridScrollEl[0], "y");

    if(hasScrollbarX){
      const headerScrollEl = this.headerOutPutEl.parent(".fc-scroll-bars")
      const scrollersX = [timeGridScrollEl, headerScrollEl];
      if(this.dayGrid){
        const dayGridScrollEl = this.dayGrid.el.parent(".fc-scroll-bars");
        scrollersX.push(dayGridScrollEl);
      }
      const _syncScrollersX = new SyncScrollers("x", scrollersX);
    }

    if(hasScrollbarY){
      const slatsLabelScrollEl = this.timeGrid.slatsLabelEl.find(".fc-scroll-bars");
      const _syncScrollersY = new SyncScrollers("y", [timeGridScrollEl, slatsLabelScrollEl]);
    }
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

  /**
   * Render resources after fetching data from rsManager.
   * @override
   * @param  {Array} resources [description]
   */
  renderResources(resources) {
    if(resources){
      this.calendar.setAllowedResources(resources);
    }
    this.timeGrid.renderResources();
    if (this.dayGrid) {
      this.dayGrid.renderResources();
    }
  }

  addResourceSuccessful(resource) {
    if(resource){
      this.calendar.addAllowedResource(resource);
    }
    super.addResourceSuccessful();
  }

  deleteResourceSuccessful(resource) {
    if(resource){
      this.calendar.removeAllowedResource(resource);
    }
    super.deleteResourceSuccessful();
  }

  setAllResourcesSuccessful(resources) {
    if(resources){
      this.calendar.setAllowedResources(resources);
    }
    super.setAllResourcesSuccessful();
  }

}
