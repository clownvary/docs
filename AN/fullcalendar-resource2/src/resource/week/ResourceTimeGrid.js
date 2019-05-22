"use strict";

import TimeGrid from "resource/day/ResourceTimeGrid";
import HeaderParser from "./temps/header/HeaderParser";

export default class ResourceTimeGrid extends TimeGrid {
  /**
   * Render the header parts.
   * @override
   * @return {String} Header Html.
   */
  renderHeadHtml() {
    let parser = new HeaderParser(this);
    return this.headerGrid = $(parser.parse());
  }

  updateWidth() {
    let headerOutPutEl = this.view.headerOutPutEl;
    let rsTable = headerOutPutEl.find(".fc-scroll-bars table");
    rsTable.parent().width(rsTable.width());
    this.view.el.find(".fc-scollbar-actor-output").width(rsTable.width());

    let bgWidth = this.el.parent(".fc-scroll-bars").width() - 21;
    this.el.width(bgWidth);
    this.view.headerOutPutEl.width(bgWidth);
    headerOutPutEl.find(".fc-header-split-dates table").width(bgWidth);
    return bgWidth;
  }

}
