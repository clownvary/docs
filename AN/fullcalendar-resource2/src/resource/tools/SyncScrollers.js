"use strict";

import {Emitter} from "resource/FC";

export default class SyncScrollers {

  constructor(type, elements) {
    this.type = type;
    this.init(elements);
  }

  static hasScrollbar(el, direction) {
    if (direction === "y") {
      return el.scrollHeight > el.clientHeight;
    } else if (direction === "x") {
      return el.scrollWidth > el.clientWidth;
    } else {
      return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
    }
  }

  static getScrollPosition(el) {
    return {
      left: el.scrollLeft(),
      top: el.scrollTop()
    }
  }

  static scrollToPosition(el, position) {
    el.scrollTop(position.top);
    el.scrollLeft(position.left);
  }

  init(elements) {
    this.scrollers = [];
    elements.forEach((el) => {
      let _scroller = new Scroller(el);
      this.scrollers.push(_scroller);
      _scroller.on("scroll", this.onScroll.bind(this));
      _scroller.on("emitMaster", (scroller) => {
        this.masterScroller = scroller;
      });
      _scroller.on("cleanMaster", (scroller) => {
        this.masterScroller = null;
      });
    });
  }

  onScroll(scroller, scrollTop, scrollLeft) {
    this.scrollers.forEach((scr) => {
      if (scr !== scroller && scr !== this.masterScroller) {
        switch (this.type) {
          case "x":
            scr.scrollLeft(scrollLeft);
            break;
          case "y":
            scr.scrollTop(scrollTop);
            break;
        }
      }
    });
  }

}

class Scroller extends Emitter {

  constructor(el) {
    super(el);
    this.el = el;
    this.addEvents();
  }

  addEvents() {
    this.el.on("scroll", this.onScroll.bind(this));
    this.el.on("mousewheel", () => this.trigger("emitMaster", this));
    this.el.on("selectstart", () => this.trigger("emitMaster", this));
    this.el.on("mousedown", () => this.trigger("cleanMaster", this));
  }

  onScroll(event) {
    let scrollTop = this.el.scrollTop(),
      scrollLeft = this.el.scrollLeft();
    this.trigger("scroll", this, scrollTop, scrollLeft);
  }

  scrollTop(top) {
    this.el.scrollTop(top);
  }

  scrollLeft(left) {
    this.el.scrollLeft(left);
  }

}
