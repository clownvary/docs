"use strict";

import Header from "./Header.html";
import {htmlEscape} from "resource/FC";
import TempParser from "resource/tools/TempParser";

export default class HeaderParser extends TempParser{

  /**
   * Us this.ds to organize parse data.
   * @constructor
   * @override
   * @param  {Object?Class}
   */
  constructor(rsGridContext) {
    super(rsGridContext);
    this.view = this.ds.view;
    this.daysMoment = this.ds.dayDates;
    this.resources = this.getAllowedResources();
    this.widgetHeaderClass = this.view.widgetHeaderClass;
    this.rsEmptyArray = new Array(this.ds.getAllowedResourcesColCount());
    this.limitColWidthAttr = this.ds.getLimitColWidthAttr();
    this.totalColIterator = new Array(this.ds.getTotalColCount());
  }

  /**
   * Parse Header.html
   * @override
   * @return {String} HTML
   */
  parse() {
    return Header(this, {
      colspan: this.getColspan()
    });
  }

  hasDayRow() {
    return this.ds.daysPerRow > 1 || !this.hasResources();
  }

  hasResources() {
    return this.ds.getAllowedResourcesCount() > 0;
  }

  getResourceHtml() {
    let resourceHtml = this.resource.title;
    if($.isFunction(this.render)){
      let retrunHtml = this.render(this.resource, this.isAllowed);
      resourceHtml = retrunHtml ? retrunHtml : resourceHtml;
    }

    let closeContainer = [
      "<span class='fc-rs-header-close' style='display:",
        this.closeAble ? "inline-block" : "none" ,
      "'>"
    ];
    if($.isFunction(this.renderClose)) {
      let closeHtml = this.renderClose();
      closeContainer.push(closeHtml || "x");
    }else{
      closeContainer.push("x");
    }
    closeContainer.push("</span>");
    return resourceHtml + closeContainer.join("");
  }

  getAllowedResources() {
    let returnResources = [],
        resources = this.view.calendar.getResources();
    const {closeAble, closeIconReturn, renderCell} = this.view.opt("extendedHeaderProps") || {};
    resources.forEach((rs) => {
      returnResources.push({
        resource: rs,
        isAllowed: true,
        render: renderCell,
        renderClose: closeIconReturn,
        closeAble: closeAble
      });
    });

    if(this.isRTL){
      returnResources = returnResources.reverse();
    }
    return returnResources;
  }

  getColspan() {
    let daysPerRow = this.ds.daysPerRow;
    return daysPerRow > 1 ? "colspan='" + daysPerRow + "'" : "";
  }

  dateFormat() {
    return htmlEscape(this.format("ddd"));
  }

  getTextWidthNoResource() {
    let {emptyHintText} = this.view.opt("extendedHeaderProps") || {};
    return emptyHintText ? emptyHintText : "No resource."
  }

}
