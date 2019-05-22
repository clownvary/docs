"use strict";

export {
  Class,
  Emitter,
  Calendar,
  Grid,
  DayGrid,
  TimeGrid,
  DayTableMixin,
  View,
  views,
  AgendaView,
  MonthView,
  htmlEscape,
  moment,
  isInt,
  divideDurationByDuration,
  CoordCache,
  DragListener,
  getOuterRect,
  intersectRects
} from "fullcalendar";

export function matchCellWidths(els) {
  var maxInnerWidth = 0;
  els.find('> *').each(function(i, innerEl) {
    var innerWidth = $(innerEl).outerWidth();
    if (innerWidth > maxInnerWidth) {
      maxInnerWidth = innerWidth;
    }
  });
  maxInnerWidth++;
  els.width(maxInnerWidth);
  return maxInnerWidth;
}
export function createProtoMixinObject(protoObject, protos) {
  let movedObject = {};
  protos.forEach((pro) => {
    if(protoObject[pro]){
      movedObject[pro] = protoObject[pro];
    }
  });
  return movedObject;
}
