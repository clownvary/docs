"use strict";

import {DayGrid, htmlEscape} from "resource/FC";
import {BaseResourceGridMixin} from "resource/common/grid/BaseResourceGrid";
import BaseResourceDayGrid from "resource/common/grid/BaseResourceDayGrid";
import DayGridParser from "./temps/daygrid/DayGridParser";
import EventSkeleton from "resource/common/temps/EventSkeleton.html";
import ObjectAssign from "object-assign";

export default class ResourceDayGrid extends BaseResourceDayGrid {

  /**
   * @override
   * @param  {Number}  row
   * @param  {Boolean} isRigid
   * @return {String} HTML string.
   */
  renderDayRowHtml(row, isRigid) {
    let parser = new DayGridParser(this);
    return parser.parse();
  }

  updateWidth(width) {
    //let bgWidth = this.el.find(".fc-bg > table").outerWidth();
    this.el.width(width);
  }

  renderFillRow(type, seg, className) {
    let colCnt = this.colCnt;
    let startCol = seg.leftCol;
    let endCol = seg.rightCol + 1;

    className = className || type.toLowerCase();

    let skeletonEl = $(EventSkeleton({
      className: className,
      limitColWidthAttr: this.getLimitColWidthAttr(),
      totalColIterator: new Array(this.getTotalColCount())
    }));

    let trEl = $("<tr>");

    if (startCol > 0) {
      trEl.append('<td colspan="' + startCol + '"/>');
    }
    trEl.append(
      seg.el.attr('colspan', endCol - startCol)
    );
    if (endCol < colCnt) {
      trEl.append('<td colspan="' + (colCnt - endCol) + '"/>');
    }
    skeletonEl.find("tbody").append(trEl);;

    return skeletonEl;
  }

  /**
   * @override
   * @param  {Object} Span
   * @return {Array} Segs
   */
  spanToSegs(span) {
    let rsCount = this.getAllowedResourcesColCount();
    let segs = this.sliceRangeByRow(span);

    let rsSegs = [];
    if (rsCount && this.view.type === "resourceDay") {
      segs.forEach((sg) => {
        let resources = this.getAllowedResources();
        resources.forEach((rs, i) => {
          if (!span.resourceId || span.resourceId === rs.id) {
            let newSeg = ObjectAssign({}, sg);
            newSeg.leftCol = this.getColByRsAndDayIndex(i, this.isRTL ? seg.lastRowDayIndex : sg.firstRowDayIndex);
            newSeg.rightCol = this.getColByRsAndDayIndex(i, this.isRTL ? seg.firstRowDayIndex : sg.lastRowDayIndex);
            rsSegs.push(newSeg);
          }
        });
      });
    }else{
      rsSegs = super.spanToSegs(span);
    }
    return rsSegs;
  }

}
ObjectAssign(ResourceDayGrid.prototype, BaseResourceGridMixin);
