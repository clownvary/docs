"use strict";

import {View, createProtoMixinObject} from "resource/FC";
import SyncScrollers from "resource/tools/SyncScrollers";

export default class BaseResourceView extends View{

  /**
   * Fetch resources before rendering view.
   * @override
   * @param  {Moment} date
   * @return {Object}  Return Jquery Deferred Object for fullcalendar
   */
  displayView(date) {
    let dfd = $.Deferred();
    super.displayView(date);

    let fetchingStatus = this.rsManager.fetchingStatus;
    if (!fetchingStatus.done && !fetchingStatus.doing) {
      fetchingStatus.promise.then((resources) => {
        this.renderResources(resources);
        this.redisplay();
        dfd.resolve();
      });
      this.rsManager.fetch();
    }

    if (fetchingStatus.done) {
      this.renderResources(this.calendar.getResources());
      this.redisplay();
      dfd.resolve();
    }
    return dfd;
  }

  /**
   * Call super.displayEvents after fetching resources.
   * @override
   * @param  {Array} events
   */
  displayEvents(events) {
    let {fetchingStatus} = this.rsManager;
    fetchingStatus.promise.then(() => {
      super.displayEvents(events);
      if(this.timeGrid && this.timeGrid.updateNowTimeLine) {
        this.timeGrid.updateNowTimeLine();
      }
    });
  }

  addResourceListener() {
    this.calendar.rsManager.on('add', this.addResourceSuccessful.bind(this));
    this.calendar.rsManager.on('delete', this.deleteResourceSuccessful.bind(this));
    this.calendar.rsManager.on('setAll', this.setAllResourcesSuccessful.bind(this));
  }

  addResourceSuccessful(resource) {
    this.redisplay(true);
  }

  deleteResourceSuccessful(resource) {
    this.redisplay(true);
  }

  setAllResourcesSuccessful(resources) {
    this.redisplay(true);
  }

  keepHoldFocus() {
    const targetFocusedElement = this.headerEl ? this.headerEl : this.el.find(".fc-header");
    if(targetFocusedElement.get(0) !== document.activeElement) {
      targetFocusedElement.focus();
    }
  }

  trigger(...params) {
    super.trigger(...params);
    if(params[0] === "dayClick" || params[0] === "select") {
      this.keepHoldFocus();
    }
  }

  renderBusinessHours() {
    super.renderBusinessHours();
    this.addHeaderEvent();
  }

  addHeaderEvent() {
    let headerEl = this.el.find(".fc-header");
    headerEl.find(".fc-rs-header-axis").on("click.axisTriggerClick", (e) => {
      const {axisTriggerClick} = this.opt("extendedHeaderProps") || {};
      if($.isFunction(axisTriggerClick)){
        axisTriggerClick(e, this);
      }
    });
    if(this.type !== "resourceDay"){
      let headerGrid = this.timeGrid.headerGrid,
          rsCells = headerGrid.find(".fc-rs-cell");
      rsCells.on("click.headerRsClick", this.onAllowResource.bind(this));
    }
    headerEl.find(".fc-rs-header-close").on("click.closeTriggerBefore", this.onCloseResource.bind(this));
  }

  onAllowResource(evt) {
    let rsCellEl = $(evt.currentTarget),
        rsId = rsCellEl.attr("rs-cell-id");
    this.calendar.toggleAllowResourceById(rsId);
    this.redisplay(true);
  }

  onCloseResource(evt) {
    let rsCellEl = $(evt.currentTarget),
        rsId = rsCellEl.parent(".fc-rs-cell").attr("rs-cell-id");
    const {closeTriggerBefore} = this.opt("extendedHeaderProps") || {};

    let closeAble = true;
    if($.isFunction(closeTriggerBefore)) {
      let resource = this.calendar.getResourceById(rsId);
      closeAble = closeTriggerBefore(resource);
    }
    if(closeAble && rsId) {
      this.calendar.removeResourceById(rsId);
    }
  }

  rerender() {
    this.redisplay(true);
  }

  redisplay(remainScrollPosition) {
    let position;
    if(this !== this.calendar.view){
      return;
    }
    if(remainScrollPosition && this.timeGrid && this.timeGrid.el){
      let scrollBar = this.timeGrid.el.parent(".fc-scroll-bars");
      position = SyncScrollers.getScrollPosition(scrollBar);
    }
    if (this.isSkeletonRendered) {
      let wasEventsRendered = this.isEventsRendered;
      this.clearEvents();
      this.clearView();
      if(this.timeGrid && this.timeGrid.processOptions){
        this.timeGrid.processOptions();
      }
      this.renderResources();
      super.displayView();
      if (wasEventsRendered) {
        let events = this.calendar.clientEvents();
        this.displayEvents(events);
      }
    }
    if(remainScrollPosition && this.timeGrid && this.timeGrid.el){
      let scrollBar = this.timeGrid.el.parent(".fc-scroll-bars");
      SyncScrollers.scrollToPosition(scrollBar, position);
    }
    return position;
  }

  /**
   * Add argument resource to this.trigger call.
   * @override
   * @param  {Moment} span
   * @param  {Object} event
   */
  triggerSelect(segs, ev) {
    if(this.timeGrid && this.timeGrid.hideWireFrame){
      this.timeGrid.hideWireFrame();
    }
    this.trigger(
      'select',
      null,
      segs,
      ev
    );
  }

  destroy() {
    if(this.dayGrid && this.dayGrid.destroy){
      this.dayGrid.destroy();
    }
    if(this.timeGrid && this.timeGrid.destroy){
      this.timeGrid.destroy();
    }
    let headerEl = this.el.find(".fc-head");
    headerEl.find(".fc-rs-header-close").off("click.closeTriggerBefore");
    headerEl.find(".fc-rs-header-axis *").addBack().off("click.axisTriggerClick");
    if(this.type !== "resourceDay"){
      headerEl.find(".fc-rs-cell").off("click.headerRsClick");
    }
  }
}

export let BaseResourceViewMixin = createProtoMixinObject(BaseResourceView.prototype, [
  "displayView",
  "displayEvents",
  "addResourceListener",
  "addResourceSuccessful",
  "deleteResourceSuccessful",
  "setAllResourcesSuccessful",
  "keepHoldFocus",
  "trigger",
  "renderBusinessHours",
  "addHeaderEvent",
  "onAllowResource",
  "onCloseResource",
  "rerender",
  "redisplay",
  "triggerSelect",
  "destroy"
]);
