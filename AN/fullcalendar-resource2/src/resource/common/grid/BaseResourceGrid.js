"use strict";

import {Grid, DayTableMixin, htmlEscape,createProtoMixinObject} from "resource/FC";
import MouseFollower from '../MouseFollower';
import HitDragListener from '../HitDragListener';
import HeadIntro from "./temps/HeadIntro.html";
import NumberIntro from "./temps/NumberIntro.html";
import BgIntro from "./temps/BgIntro.html";
import Intro from "./temps/Intro.html";


// Returns the mouse cursor to its original look
function enableCursor() {
	$('body').removeClass('fc-not-allowed');
}

/* Extract common methods between ResourceDayGrid and ResourceTimeGrid */
export default class BaseResourceGrid extends Grid{

  renderHeadIntroHtml() {
    let view = this.view;
    return view.weekNumbersVisible ? HeadIntro({
      widgetHeaderClass: view.widgetHeaderClass,
      weekNumberStyleAttr: view.weekNumberStyleAttr(),
      weekNumberTitle: () => {
        htmlEscape(view.opt('weekNumberTitle'))
      }
    }) : "";
  }

  renderNumberIntroHtml(row) {
    let view = this.view;
    return view.weekNumbersVisible ? NumberIntro({
      weekNumberStyleAttr: view.weekNumberStyleAttr(),
      getCellDate: this.getCellDate(row, 0).format('w')
    }) : "";
  }

  renderBgIntroHtml() {
    let view = this.view;
    return view.weekNumbersVisible ? BgIntro({
      widgetContentClass: view.widgetContentClass,
      weekNumberStyleAttr: view.weekNumberStyleAttr()
    }) : "";
  }

  renderIntroHtml() {
    let view = this.view;
    return view.weekNumbersVisible ? Intro({
      weekNumberStyleAttr: view.weekNumberStyleAttr()
    }) : "";
  }

  /**
   * Render resources by call DayTableMixin.updateDayTableCols.
   * For rendering Grid columns by resources.
   * Call it after fetch resources.
   */
  renderResources() {
    DayTableMixin.updateDayTableCols.call(this);
  }

  /**
   * Get resources.
   * @return {Array} resources
   */
  getAllowedResources() {
    let calendar = this.view.calendar;
    return calendar.getAllowedResources();
  }

  /**
   * Get resources count.
   * @return {Number}
   */
  getAllowedResourcesCount() {
    let resources = this.getAllowedResources();
    return resources.length;
  }

  getAllowedResourcesColCount() {
    return this.view.type !== "resourceDay" ? 1 : this.getAllowedResourcesCount();
  }

  /**
   * Add resource id to the span(Moment).
   * @override Grid.events
   * @param  {Moment} span  Instance of Moment
   * @param  {Object} event
   * @return {Class}
   */
  transformEventSpan(span, event) {
    return span.resourceId = event['resourceId'] || event['resourceID'];
  }

  /**
   * Get resource by column number.
   * @param  {Number} col
   * @return {Object} resource
   */
  getResourceByCol(col) {
    let resources = this.getAllowedResources();
    return resources[this.getResourceIndexByCol(col)];
  }

  /**
   * Get resource index by col and daysPerRow(duration configuration).
   * {this.colCnt} is from DayTableMixin.
   * @param  {Number} col
   * @return {Number}
   */
  getResourceIndexByCol(col) {
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    return Math.floor(col / this.daysPerRow);
  }

  getResourceIndexById(id) {
    let index,
        resources = this.getAllowedResources();
    resources.forEach((rs, i) => {
      if(rs.id === id){
        index = i;
      }
    });
    return index;
  }

  /**
   * Get grid column num by resource index and day index.
   * @param  {Number} resourceIndex
   * @param  {Number} dayIndex
   * @return {Number}
   */
  getColByRsAndDayIndex(resourceIndex, dayIndex) {
    var col;
    col = resourceIndex * this.daysPerRow + dayIndex;
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    return col;
  }

  /**
   * get day index by grid column num.
   * @param  {Number} col
   * @return {Number}
   */
  getDayIndexByCol(col) {
    if (this.isRTL) {
      col = this.colCnt - 1 - col;
    }
    return col % this.daysPerRow;
  }

  /**
   * @override DayTableMixin.getColDayIndex.
   * @param  {Number} col
   * @return {Number}
   */
  getColDayIndex(col) {
    return this.getDayIndexByCol(col);
  }

  getDayIndexBySpan(span) {
    let dayIndex = 0;
    this.dayDates.forEach((dayDate, index) => {
      if(span.start >= dayDate.clone().time(this.minTime) && span.start <= dayDate.clone().time(this.maxTime)){
        dayIndex = index;
      }
    });
    return dayIndex;
  }

  /**
   * Compute actual rendered grid column count by rousources
   * and daysPerRow(duration configuration).
   * @override DayTableMixin.computeColCnt
   * @return {Number}
   */
  getRenderedColCount(){
    let rsCount = this.getAllowedResourcesColCount();
    return (rsCount || 1) * this.daysPerRow;
  }

  /**
   * Compute the allowed selection span on grid.
   * Don't allow selecting span accross resources.
   * @override Grid.prototype.computeSelectionSpan
   * @param  {Object} startSpan
   * @param  {Object} endSpan
   * @return {Object}
   */
  computeSelectionSpan(startSpan, endSpan) {
    var selectionSpan;

    selectionSpan = super.computeSelectionSpan(startSpan, endSpan);
    if (selectionSpan) {
      selectionSpan.resourceId = startSpan.resourceId;
    }
    return selectionSpan;
  }

  /**
   * @override
   * @return {Array} Segs
   */
  renderFgEvents(events) {
    let calendar = this.view.calendar;

    let rsEvents = [];
    events.forEach((evt) => {
      let rsId = evt['resourceId'] || evt['resourceID'];
      if (rsId && calendar.getAllowedResourceById(rsId)) {
        rsEvents.push(evt);
      }
    });

    return super.renderFgEvents(rsEvents);
  }

  /**
   * Compute actual rendered grid column count.
   * @override DayTableMixin.computeColCnt
   * @return {Number}
   */
  computeColCnt() {
    return this.getRenderedColCount();
  }

  bookendCells(){}

  getTotalColCount() {
    let resourceCount = this.getAllowedResourcesColCount(),
        daysCount = this.dayDates.length;
    return resourceCount ? resourceCount * daysCount: daysCount;
  }

  getLimitColWidthAttr() {
    let limitColWidth = this.view.opt("limitColWidth");
    return limitColWidth ? "width=" + limitColWidth : "";
  }

	segDragMousedown(seg, ev) {
		const _this = this;
		const view = this.view;
		const calendar = view.calendar;
		const el = seg.el;
		const event = seg.event;
		let dropLocation; // zoned event date properties

		// A clone of the original element that will move with the mouse
		const mouseFollower = new MouseFollower(seg.el, {
			parentEl: view.el,
			opacity: view.opt('dragOpacity'),
			revertDuration: view.opt('dragRevertDuration'),
			zIndex: 2 // one above the .fc-view
		});

		// Tracks mouse movement over the *view's* coordinate map. Allows dragging and dropping between subcomponents
		// of the view.
		const dragListener = new HitDragListener(view, {
			distance: 5,
			scroll: view.opt('dragScroll'),
			subjectEl: el,
			subjectCenter: true,
			listenStart: function(ev) {
				mouseFollower.hide(); // don't show until we know this is a real drag
				mouseFollower.start(ev);
			},
			dragStart: function(ev) {
				_this.triggerSegMouseout(seg, ev); // ensure a mouseout on the manipulated event has been reported
				_this.segDragStart(seg, ev);
				view.hideEvent(event); // hide all event segments. our mouseFollower will take over
			},
			hitOver: function(hit, isOrig, origHit) {

				// starting hit could be forced (DayGrid.limit)
				if (seg.hit) {
					origHit = seg.hit;
				}

				// since we are querying the parent view, might not belong to this grid
				dropLocation = _this.computeEventDrop(
					origHit.component.getHitSpan(origHit),
					hit.component.getHitSpan(hit),
					event
				);

				if (dropLocation &&!calendar.isEventSpanAllowed(_this.eventToSpan(dropLocation), event)) {
					disableCursor();
					dropLocation = null;
				}

				// if a valid drop location, have the subclass render a visual indication
				if (dropLocation && view.renderDrag(dropLocation, seg)) {
					mouseFollower.hide(); // if the subclass is already using a mock event "helper", hide our own
				}
				else {
					mouseFollower.show(); // otherwise, have the helper follow the mouse (no snapping)
				}

				if (isOrig) {
					dropLocation = null; // needs to have moved hits to be a valid drop
				}
			},
			hitOut: function() { // called before mouse moves to a different hit OR moved out of all hits
				view.unrenderDrag(); // unrender whatever was done in renderDrag
				mouseFollower.show(); // show in case we are moving out of all hits
				dropLocation = null;
			},
			hitDone: function() { // Called after a hitOut OR before a dragStop
				enableCursor();
			},
			dragStop: function(ev) {
				// do revert animation if hasn't changed. calls a callback when finished (whether animation or not)
				mouseFollower.stop(!dropLocation, () => {
          view.unrenderDrag();
          if (!dropLocation) {
            view.showEvent(event);
          }
					_this.segDragStop(seg, ev);

					if (dropLocation) {
						view.reportEventDrop(event, dropLocation, this.largeUnit, el, ev);
					}
				});
			},
			listenStop: function() {
				mouseFollower.stop(); // put in listenStop in case there was a mousedown but the drag never started
			}
		});

		dragListener.mousedown(ev); // start listening, which will eventually lead to a dragStart
  }

  bindSegHandlers() {
		let _this = this;
		let view = this.view;

		$.each(
			{
				mouseenter: function(seg, ev) {
					_this.triggerSegMouseover(seg, ev);
				},
				mouseleave: function(seg, ev) {
					_this.triggerSegMouseout(seg, ev);
				},
				click: function(seg, ev) {
					return view.trigger('eventClick', this, seg.event, ev); // can return `false` to cancel
				},
				mousedown: function(seg, ev) {
					if ($(ev.target).is('.fc-resizer') && view.isEventResizable(seg.event)) {
						_this.segResizeMousedown(seg, ev, $(ev.target).is('.fc-start-resizer'));
					} else if ($(ev.currentTarget).is('.observe-resize')) {
            ev.preventDefault()
          } else if (view.isEventDraggable(seg.event)) {
						_this.segDragMousedown(seg, ev);
					}
				}
			},
			function(name, func) {
				// attach the handler to the container element and only listen for real event elements via bubbling
				_this.el.on(name, '.fc-event-container > *', function(ev) {
					let seg = $(this).data('fc-seg'); // grab segment data. put there by View::renderEvents

					// only call the handlers if there is not a drag/resize in progress
					if (seg && !_this.isDraggingSeg && !_this.isResizingSeg) {
						return func.call(this, seg, ev); // `this` will be the event element
					}
				});
			}
		);
	}
}

export let BaseResourceGridMixin = createProtoMixinObject(BaseResourceGrid.prototype, [
    "renderHeadIntroHtml",
    "renderNumberIntroHtml",
    "renderBgIntroHtml",
    "renderIntroHtml",
    "renderResources",
    "getAllowedResources",
    "getAllowedResourcesCount",
    "getAllowedResourcesColCount",
    "transformEventSpan",
    "getResourceByCol",
    "getResourceIndexByCol",
    "getResourceIndexById",
    "getColByRsAndDayIndex",
    "getDayIndexByCol",
    "getColDayIndex",
    "getDayIndexBySpan",
    "getRenderedColCount",
    "computeSelectionSpan",
    "renderFgEvents",
    "computeColCnt",
    "bookendCells",
    "getTotalColCount",
    "getLimitColWidthAttr",
    "segDragMousedown",
    "bindSegHandlers"
]);
