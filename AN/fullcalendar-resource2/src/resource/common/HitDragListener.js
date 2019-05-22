import { DragListener, getOuterRect, intersectRects } from '../FC';

// Returns a new point that will have been moved to reside within the given rectangle
function constrainPoint(point, rect) {
	return {
		left: Math.min(Math.max(point.left, rect.left), rect.right),
		top: Math.min(Math.max(point.top, rect.top), rect.bottom)
	};
}

// Returns a point that is the center of the given rectangle
function getRectCenter(rect) {
	return {
		left: (rect.left + rect.right) / 2,
		top: (rect.top + rect.bottom) / 2
	};
}

// Subtracts point2's coordinates from point1's coordinates, returning a delta
function diffPoints(point1, point2) {
	return {
		left: point1.left - point2.left,
		top: point1.top - point2.top
	};
}

/* Tracks mouse movements over a component and raises events about which hit the mouse is over.
------------------------------------------------------------------------------------------------------------------------
options:
- subjectEl
- subjectCenter
*/

class HitDragListener extends DragListener {
  
    component = null // converts coordinates to hits
      // methods: prepareHits, releaseHits, queryHit
  
    origHit = null // the hit the mouse was over when listening started
    hit = null // the hit the mouse is over
    coordAdjust = null // delta that will be added to the mouse coordinates when computing collisions
  
  
    constructor(component, options) {
      super(options); // call the super-constructor
  
      this.component = component;
    }
  
  
    // Called when drag listening starts (but a real drag has not necessarily began).
    // ev might be undefined if dragging was started manually.
    listenStart(ev) {
      const subjectEl = this.subjectEl;
      let subjectRect;
      let origPoint;
      let point;
  
      super.listenStart.apply(this, arguments); // call the super-method
  
      this.computeCoords();
  
      if (ev) {
        origPoint = { left: ev.pageX, top: ev.pageY };
        point = origPoint;
  
        // constrain the point to bounds of the element being dragged
        if (subjectEl) {
          subjectRect = getOuterRect(subjectEl); // used for centering as well
          point = constrainPoint(point, subjectRect);
        }
  
        this.origHit = this.queryHit(point.left, point.top);
  
        // treat the center of the subject as the collision point?
        if (subjectEl && this.options.subjectCenter) {
  
          // only consider the area the subject overlaps the hit. best for large subjects.
          // TODO: skip this if hit didn't supply left/right/top/bottom
          if (this.origHit) {
            subjectRect = intersectRects(this.origHit, subjectRect) ||
              subjectRect; // in case there is no intersection
          }
  
          point = getRectCenter(subjectRect);
        }
  
        this.coordAdjust = diffPoints(point, origPoint); // point - origPoint
      }
      else {
        this.origHit = null;
        this.coordAdjust = null;
      }
    }
  
  
    // Recomputes the drag-critical positions of elements
    computeCoords() {
      this.component.prepareHits();
      this.computeScrollBounds(); // why is this here???
    }
  
  
    // Called when the actual drag has started
    dragStart(ev) {
      let hit;
  
      super.dragStart.apply(this, arguments); // call the super-method
  
      // might be different from this.origHit if the min-distance is large
      hit = this.queryHit(ev.pageX, ev.pageY);
  
      // report the initial hit the mouse is over
      // especially important if no min-distance and drag starts immediately
      if (hit) {
        this.hitOver(hit);
      }
    }
  
  
    // Called when the drag moves
    drag(dx, dy, ev) {
      let hit;
  
      super.drag.apply(this, arguments); // call the super-method
  
      hit = this.queryHit(ev.pageX, ev.pageY);
  
      if (!isHitsEqual(hit, this.hit)) { // a different hit than before?
        if (this.hit) {
          this.hitOut();
        }
        if (hit) {
          this.hitOver(hit);
        }
      }
    }
  
  
    // Called when dragging has been stopped
    dragStop() {
      this.hitDone();
      super.dragStop.apply(this, arguments); // call the super-method
    }
  
  
    // Called when a the mouse has just moved over a new hit
    hitOver(hit) {
      const isOrig = isHitsEqual(hit, this.origHit);
  
      this.hit = hit;
  
      this.trigger('hitOver', this.hit, isOrig, this.origHit);
    }
  
  
    // Called when the mouse has just moved out of a hit
    hitOut() {
      if (this.hit) {
        this.trigger('hitOut', this.hit);
        this.hitDone();
        this.hit = null;
      }
    }
  
  
    // Called after a hitOut. Also called before a dragStop
    hitDone() {
      if (this.hit) {
        this.trigger('hitDone', this.hit);
      }
    }
  
  
    // Called when drag listening has stopped
    listenStop() {
      super.listenStop.apply(this, arguments); // call the super-method
  
      this.origHit = null;
      this.hit = null;
  
      this.component.releaseHits();
    }
  
  
    // Called when scrolling has stopped, whether through auto scroll, or the user scrolling
    scrollStop() {
      super.scrollStop.apply(this, arguments); // call the super-method
  
      this.computeCoords(); // hits' absolute positions will be in new places. recompute
    }
  
  
    // Gets the hit underneath the coordinates for the given mouse event
    queryHit(left, top) {
  
      if (this.coordAdjust) {
        left += this.coordAdjust.left;
        top += this.coordAdjust.top;
      }
  
      return this.component.queryHit(left, top);
    }
  }
  
  // Returns `true` if the hits are identically equal. `false` otherwise. Must be from the same component.
  // Two null values will be considered equal, as two "out of the component" states are the same.
  function isHitsEqual(hit0, hit1) {
  
    if (!hit0 && !hit1) {
      return true;
    }
  
    if (hit0 && hit1) {
      return hit0.component === hit1.component &&
        isHitPropsWithin(hit0, hit1) &&
        isHitPropsWithin(hit1, hit0); // ensures all props are identical
    }
  
    return false;
  }
  
  
  // Returns true if all of subHit's non-standard properties are within superHit
  function isHitPropsWithin(subHit, superHit) {
    for (const propName in subHit) {
      if (!/^(component|left|right|top|bottom)$/.test(propName)) {
        if (subHit[propName] !== superHit[propName]) {
          return false;
        }
      }
    }
    return true;
  }

  export default HitDragListener;
  