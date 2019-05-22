"use strict";

import Skeleton from "./Skeleton.html";
import DaySkeletonParser from "resource/day/temps/skeleton/SkeletonParser";

export default class SkeletonParser extends DaySkeletonParser{

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
      axisStyle: this.ds.axisStyleAttr()
    });
  }

}
