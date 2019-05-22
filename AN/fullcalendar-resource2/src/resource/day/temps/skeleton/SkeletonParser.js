"use strict";

import Skeleton from "./Skeleton.html";
import DayIntro from "./DayIntro.html";
import TimeIntro from "./TimeIntro.html";
import HeaderIntro from "./HeaderIntro.html";
import TempParser from "resource/tools/TempParser";

export default class SkeletonParser extends TempParser{

  /**
   * Us this.ds to organize parse data.
   * @constructor
   * @override
   * @param  {Object?Class}
   */
  constructor(rsGridContext) {
    super(rsGridContext);
    this.isRTL = this.ds.isRTL;
    this.widgetHeaderClass = this.ds.widgetHeaderClass;
    this.widgetContentClass = this.ds.widgetContentClass;
    this.hideAllDaySlot = !this.ds.opt("allDaySlot");
  }

  /**
   * Parse Header.html
   * @override
   * @return {String} HTML
   */
  parse() {
    return Skeleton(this, {
      headerIntor: this.getHeaderIntro(),
      dayIntro: this.getDayIntro(),
      timeIntro: this.getTimeIntro(),
      axisStyle: this.ds.axisStyleAttr(),
      hideAllDaySlot: this.hideAllDaySlot
    });
  }

  getHeaderIntro() {
    return HeaderIntro({
      getHeaderAxisContent: function (){
        const {axisReturn} = this.ds.opt("extendedHeaderProps") || {};
        return $.isFunction(axisReturn) ? axisReturn(this.ds) : "";
      }.bind(this),
      axisStyle: this.ds.axisStyleAttr(),
      widgetHeaderClass: this.widgetHeaderClass
    });
  }

  getDayIntro() {
    return DayIntro({
      axisStyle: this.ds.axisStyleAttr(),
      widgetContentClass: this.widgetContentClass
    });
  }

  getTimeIntro() {
    return TimeIntro({
      axisStyle: this.ds.axisStyleAttr(),
      widgetContentClass: this.widgetContentClass
    });
  }

  getBgCells() {
    let colCnt = this.ds.colCnt,
        bgCells = [];

    for(let col = 0; col < colCnt; col++){
      let date = this.ds.getCellDate(0, col);
      let classes = this.ds.getDayClasses(date);
      classes.unshift("fc-day", this.widgetContentClass);
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
