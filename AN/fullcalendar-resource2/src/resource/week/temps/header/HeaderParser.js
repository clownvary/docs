"use strict";

import Header from "./Header.html";
import {htmlEscape} from "resource/FC";
import TempParser from "resource/tools/TempParser";
import DayHeaderParser from "resource/day/temps/header/HeaderParser";

export default class HeaderParser extends DayHeaderParser{

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
    this.limitColWidthAttr = this.getLimitColWidthAttr();
    this.totalColIterator = new Array(this.view.calendar.getResourcesCount());
  }

  /**
   * Parse Header.html
   * @override
   * @return {String} HTML
   */
  parse() {
    return Header(this);
  }

  getLimitColWidthAttr() {
    let limitColWidth = this.view.opt("limitHeaderWidth");
    return limitColWidth ? "width=" + limitColWidth : "";
  }

  getAllowedResources() {
    let returnResources = [],
        resources = this.view.calendar.getResources();
    const {closeAble, closeIconReturn, renderCell} = this.view.opt("extendedHeaderProps") || {};
    resources.forEach((rs) => {
      returnResources.push({
        resource: rs,
        render: renderCell,
        isAllowed: this.view.calendar.isAllowedResource(rs),
        renderClose: closeIconReturn,
        closeAble: closeAble
      });
    });

    if(this.isRTL){
      returnResources = returnResources.reverse();
    }
    return returnResources;
  }

}
