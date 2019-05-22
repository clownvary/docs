"use strict";

import DayGrid from "./DayGrid.html";
import TempParser from "resource/tools/TempParser";

export default class DayGridParser extends TempParser{

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
    this.limitColWidthAttr = this.ds.getLimitColWidthAttr();
    this.totalColIterator = new Array(this.ds.getTotalColCount());
  }

  /**
   * Parse Header.html
   * @override
   * @return {String} HTML
   */
  parse() {
    return DayGrid(this);
  }

  getBgCells() {
    let colCnt = this.ds.colCnt,
        bgCells = [];

    for(let col = 0; col < colCnt; col++){
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

  getFormatDate() {
    return this.date.format('YYYY-MM-DD');
  }

}
