"use strict";

import {htmlEscape} from "resource/FC";
import TimeGrid from "./TimeGrid.html";
import TempParser from "resource/tools/TempParser";

export default class TimeGridParser extends TempParser {

  /**
   * Us this.ds to organize parse data.
   * @constructor
   * @override
   * @param  {Object?Class}
   */
  constructor(rsGridContext) {
    super(rsGridContext);
    this.view = this.ds.view;
    this.widgetContentClass = this.view.widgetContentClass;
    this.bgCellsIterator = this.getBgCells();
    this.slatCellsIterator = this.ds.getSlatCells();
    this.limitColWidthAttr = this.ds.getLimitColWidthAttr();
    this.totalColIterator = new Array(this.ds.getTotalColCount());
    const {showNowTimeLine} = this.view.opt("extendedGridProps") || {};
    this.showNowTimeLine = showNowTimeLine;
  }

  /**
   * Parse Header.html
   * @override
   * @return {String} HTML
   */
  parse() {
    return TimeGrid(this);
  }

  getBgCells() {
    let colCnt = this.ds.colCnt,
      bgCells = [];

    for (let col = 0; col < colCnt; col++) {
      let date = this.ds.getCellDate(0, col);
      let classes = this.ds.getDayClasses(date);
      classes.unshift("fc-day", this.view.widgetContentClass);
      bgCells.push({
        date: date,
        classes: classes.join(" ")
      });
    }
    return bgCells;
  }

  getSlatDateFormate() {
    return htmlEscape(this.date.format(this.labelFormat));
  }

  getFormatDate() {
    return this.date.format('YYYY-MM-DD');
  }

}
