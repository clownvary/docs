"use strict";

import {DayGrid} from "resource/FC";
import ObjectAssign from "object-assign";

export default class BaseResourceDayGrid extends DayGrid{

  /**
   * @override
   * @param  {Object} Span
   * @return {Array} Segs
   */
  spanToSegs(span) {
    let segs = this.sliceRangeByRow(span);
    segs.forEach((sg) => {
      sg.leftCol = this.isRTL ? seg.lastRowDayIndex : sg.firstRowDayIndex;
      sg.rightCol = this.isRTL ? seg.firstRowDayIndex : sg.lastRowDayIndex;
    });
    return segs;
  }

  /**
   * Add resourse id to Span.
   * @override
   * @param  {Object} hit
   * @return {Object} Span
   */
  getHitSpan(hit) {
    let span = super.getHitSpan(hit);
    if (this.getAllowedResourcesCount()) {
      span.resourceId = this.getResourceByCol(hit.col).id;
    }
    ObjectAssign(span, hit);
    return span;
  }

  computeSelection(startSpan, endSpan) {
    let startCol = Math.min(startSpan.col, endSpan.col),
        endCol = Math.max(startSpan.col, endSpan.col);
    let segs = [];
    for(let col = startCol; col <= endCol; col++){
      let dayIndex = this.getDayIndexByCol(col),
          dayDate = this.dayDates[dayIndex];
      segs.push({
        col: col,
        isStart: true,
        isEnd: true,
        row: 0,
        firstRowDayIndex: 0,
        lastRowDayIndex: 0,
        leftCol: col,
        rightCol: col,
        start: dayDate.clone(),
        end: dayDate.clone().add(1, "day"),
        resource: this.getResourceByCol(col)
      });
    }
    return segs;
  }

  renderSelection(segs) {
    this.renderHighlight(segs);
    return segs;
  }

  renderHighlight(segs) {
    this.renderFill('highlight', segs);
  }

}
