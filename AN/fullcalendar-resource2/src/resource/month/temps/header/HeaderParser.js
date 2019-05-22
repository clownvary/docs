"use strict";

import Header from "./Header.html";
import {htmlEscape} from "resource/FC";
import TempParser from "resource/tools/TempParser";
import WeekHeaderParser from "resource/week/temps/header/HeaderParser";

export default class HeaderParser extends WeekHeaderParser{

  /**
   * Us this.ds to organize parse data.
   * @constructor
   * @override
   * @param  {Object?Class}
   */
  constructor(monthView) {
    super(monthView.dayGrid);
  }

  /**
   * Parse Header.html
   * @override
   * @return {String} HTML
   */
  parse() {
    return Header(this);
  }

}
